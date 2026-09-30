// Jitto Cleaning — verified form backend. See FORM-SETUP.md before deployment.
// Script Properties: LEAD_SECRET (same as server APPSCRIPT_SECRET).
// Optional: OWNER_EMAIL and SPREADSHEET_ID override the defaults below.
var DEFAULT_SPREADSHEET_ID = '18cvXPcs1AYHieIiadsFmb5L9286omefB_oZHbOYUuQw';
var DEFAULT_OWNER_EMAIL = 'kylemheler02@gmail.com';
var SHEET_TAB_NAME = 'Website Inquiries';
var TZ = 'America/Toronto';
var HEADERS = ['Timestamp', 'Reference ID', 'Form Type', 'Service Category', 'Customer Name',
  'Company', 'Email', 'Phone', 'Property Address', 'City', 'Preferred Date', 'Preferred Time',
  'Scope / Specifications', 'Client Notes', 'Photos Attached', 'Status', 'Package / Stage',
  'Frequency', 'Photo Names', 'Owner Notification Sent', 'Customer Receipt Sent', 'Last Error', 'Payload Fingerprint'];
function settings_() {
  var p = PropertiesService.getScriptProperties();
  return { secret: p.getProperty('LEAD_SECRET'),
    owner: p.getProperty('OWNER_EMAIL') || DEFAULT_OWNER_EMAIL,
    sheetId: p.getProperty('SPREADSHEET_ID') || DEFAULT_SPREADSHEET_ID };
}
function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
function doGet() {
  // Health only: no public test-email, diagnostic or write endpoints.
  return json_({ ok: true, service: 'Jitto Cleaning', version: 'verified-forms-v2' });
}
function doPost(e) {
  var data;
  try { data = JSON.parse(e.postData.contents); }
  catch (err) { return json_({ ok: false, code: 'VALIDATION' }); }
  var config = settings_();
  if (!config.secret || !data || data.secret !== config.secret) return json_({ ok: false, code: 'UNAUTHORIZED' });
  return json_(handleSubmission_(data));
}
function emailValid_(v) { return typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) && !/[\r\n]/.test(v); }
function cell_(v) {
  var s = v === undefined || v === null ? '' : String(v);
  // Prevent formula injection and preserve phone numbers/leading zeroes.
  return /^[=+@\-]/.test(s) ? "'" + s : s;
}
function scope_(d) {
  var fields = [];
  if (d.packageOrStage) fields.push('Package / Stage: ' + d.packageOrStage);
  if (d.frequency) fields.push('Frequency: ' + d.frequency);
  Object.keys(d.scopeDetails || {}).forEach(function(k) {
    var v = d.scopeDetails[k];
    fields.push(k + ': ' + (Array.isArray(v) ? v.join(', ') : String(v)));
  });
  return fields.join(' | ');
}
function sheet_(id) {
  var ss = SpreadsheetApp.openById(id); // Never silently use a different active spreadsheet.
  var sh = ss.getSheetByName(SHEET_TAB_NAME);
  if (!sh) {
    var sheets = ss.getSheets();
    for (var i = 0; i < sheets.length; i++) {
      if (sheets[i].getSheetId() === 0) { sh = sheets[i]; break; }
    }
  }
  if (!sh) sh = ss.insertSheet(SHEET_TAB_NAME);
  var headers = sh.getLastRow() ? sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(String) : [];
  // Use header names, not fixed column positions. Preserve existing columns/data.
  HEADERS.forEach(function(h) { if (headers.indexOf(h) < 0) headers.push(h); });
  if (sh.getMaxColumns() < headers.length) sh.insertColumnsAfter(sh.getMaxColumns(), headers.length - sh.getMaxColumns());
  sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  sh.setFrozenRows(1);
  return { sheet: sh, headers: headers };
}
function fingerprint_(d) {
  function canonical(v) {
    if (Array.isArray(v)) return v.map(canonical);
    if (v && typeof v === 'object') {
      var result = {};
      Object.keys(v).sort().forEach(function(k) { if (k !== 'secret') result[k] = canonical(v[k]); });
      return result;
    }
    return v;
  }
  var hash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, JSON.stringify(canonical(d)));
  return hash.map(function(b) { return ('0' + ((b + 256) % 256).toString(16)).slice(-2); }).join('');
}
function handleSubmission_(d) {
  if (!d || ['Quotation Request', 'Booking Reservation', 'Contact Message'].indexOf(d.formType) < 0 ||
      typeof d.referenceId !== 'string' || !/^[A-Za-z0-9-]{8,80}$/.test(d.referenceId) ||
      typeof d.fullName !== 'string' || !d.fullName.trim() || !emailValid_(d.email) ||
      typeof d.phone !== 'string' || !d.phone.trim()) return { ok: false, code: 'VALIDATION' };
  var lock = LockService.getScriptLock();
  var locked = false;
  var saved = false, ownerSent = false, customerSent = false;
  try {
    locked = lock.tryLock(20000);
    if (!locked) return { ok: false, code: 'BUSY', referenceId: d.referenceId };
    var cfg = settings_();
    if (!emailValid_(cfg.owner)) throw new Error('Invalid configured owner email');
    var files = d.attachments || [];
    if (!Array.isArray(files) || files.length > 3) throw new Error('Invalid attachments');
    var bytes = 0;
    var blobs = files.map(function(f) {
      if (!f || ['image/jpeg', 'image/png', 'image/webp'].indexOf(f.mimeType) < 0 || typeof f.base64 !== 'string' || typeof f.name !== 'string') throw new Error('Invalid photo');
      var decoded = Utilities.base64Decode(f.base64);
      bytes += decoded.length;
      return Utilities.newBlob(decoded, f.mimeType, f.name);
    });
    if (bytes > 500 * 1024) throw new Error('Photos too large');
    var target = sheet_(cfg.sheetId), sh = target.sheet, h = target.headers;
    var refCol = h.indexOf('Reference ID') + 1;
    var row = 0;
    if (sh.getLastRow() > 1) {
      var match = sh.getRange(2, refCol, sh.getLastRow() - 1, 1).createTextFinder(d.referenceId).matchEntireCell(true).findNext();
      if (match) row = match.getRow();
    }
    var details = scope_(d);
    var fingerprint = fingerprint_(d);
    var record = {
      'Timestamp': Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm:ss'),
      'Reference ID': d.referenceId, 'Form Type': d.formType, 'Service Category': d.serviceCategory || 'General',
      'Customer Name': d.fullName.trim(), 'Company': d.companyName || '', 'Email': d.email.trim(), 'Phone': d.phone.trim(),
      'Property Address': d.address || '', 'City': d.city || '', 'Preferred Date': d.preferredDate || '',
      'Preferred Time': d.preferredTime || '', 'Scope / Specifications': details, 'Client Notes': d.notes || '',
      'Photos Attached': files.length, 'Status': 'Received — notifications pending',
      'Package / Stage': d.packageOrStage || '', 'Frequency': d.frequency || '', 'Photo Names': files.map(function(f) { return f.name; }).join(', '),
      'Owner Notification Sent': '', 'Customer Receipt Sent': '', 'Last Error': '', 'Payload Fingerprint': fingerprint
    };
    if (row) {
      var existing = sh.getRange(row, 1, 1, h.length).getValues()[0];
      if (existing[h.indexOf('Payload Fingerprint')] && existing[h.indexOf('Payload Fingerprint')] !== fingerprint) return { ok: false, code: 'REFERENCE_CONFLICT', referenceId: d.referenceId };
      // A retry must not reassign a reference belonging to a different customer.
      if (String(existing[h.indexOf('Email')]).trim().toLowerCase() !== d.email.trim().toLowerCase()) return { ok: false, code: 'REFERENCE_CONFLICT' };
      // Use the original saved request for email content, never changed retry fields.
      h.forEach(function(key, i) { if (Object.prototype.hasOwnProperty.call(record, key)) record[key] = existing[i]; });
      ownerSent = Boolean(existing[h.indexOf('Owner Notification Sent')]);
      customerSent = Boolean(existing[h.indexOf('Customer Receipt Sent')]);
    } else {
      row = sh.getLastRow() + 1;
      sh.getRange(row, 1, 1, h.length).setNumberFormat('@').setValues([h.map(function(key) { return cell_(record[key]); })]);
      SpreadsheetApp.flush();
    }
    saved = true;
    function update(key, value) { sh.getRange(row, h.indexOf(key) + 1).setValue(cell_(value)); SpreadsheetApp.flush(); }
    var summary = HEADERS.filter(function(key) { return ['Status', 'Owner Notification Sent', 'Customer Receipt Sent', 'Last Error', 'Payload Fingerprint'].indexOf(key) < 0; })
      .map(function(key) { return key + ': ' + record[key]; }).join('\n');
    var errors = [];
    if (!ownerSent) {
      try {
        MailApp.sendEmail({ to: cfg.owner, replyTo: d.email.trim(), name: 'Jitto Cleaning Services',
          subject: '[Jitto] New ' + record['Form Type'] + ' — ' + d.referenceId,
          body: summary, attachments: blobs });
        ownerSent = true;
        update('Owner Notification Sent', new Date().toISOString());
      } catch (err) { errors.push('Owner: ' + err.message); }
    }
    if (!customerSent) {
      try {
        MailApp.sendEmail({ to: d.email.trim(), replyTo: cfg.owner, name: 'Jitto Cleaning Services',
          subject: 'We received your request — Jitto Cleaning Services [' + d.referenceId + ']',
          body: 'Hello ' + record['Customer Name'] + ',\n\nThank you for contacting Jitto Cleaning Services. Your request has been received for review. This is not a confirmed booking.\n\n' + summary +
            '\n\nOur team will contact you to confirm the scope and availability. For urgent assistance, call (249) 800-0127 or (437) 447-5020.\n\nJitto Cleaning Services\nhttps://www.jittogroups.ca' });
        customerSent = true;
        update('Customer Receipt Sent', new Date().toISOString());
      } catch (err) { errors.push('Customer: ' + err.message); }
    }
    update('Last Error', errors.join(' | '));
    update('Status', ownerSent && customerSent ? 'Received — notifications sent' : 'Received — notification retry needed');
    return { ok: saved && ownerSent, referenceId: d.referenceId, sheetLogged: saved,
      emailDelivered: ownerSent, customerReceiptSent: customerSent, code: errors.length ? 'EMAIL_PARTIAL' : undefined };
  } catch (err) {
    console.error('Submission error: ' + err.message);
    return { ok: false, code: 'PROCESSING', referenceId: d.referenceId,
      sheetLogged: saved, emailDelivered: ownerSent, customerReceiptSent: customerSent };
  } finally { if (locked) lock.releaseLock(); }
}
// Run manually as the deployment owner to grant Spreadsheet and Mail permissions.
// No test rows/emails are created. Check logs for remaining daily recipient quota.
function authorizeServices() {
  var cfg = settings_();
  if (!cfg.secret) throw new Error('Set LEAD_SECRET in Script Properties first.');
  Logger.log('Spreadsheet: ' + SpreadsheetApp.openById(cfg.sheetId).getName());
  Logger.log('Remaining email recipients today: ' + MailApp.getRemainingDailyQuota());
  Logger.log('Notification recipient: ' + cfg.owner);
}
