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
  'Frequency', 'Photo Names', 'Owner Notification Sent', 'Customer Receipt Sent',
  'Recipient Name', 'Recipient Email', 'Gift Amount', 'Recipient Notification Sent',
  'Last Error', 'Payload Fingerprint'];
function settings_() {
  var p = PropertiesService.getScriptProperties();
  return { secret: p.getProperty('LEAD_SECRET'),
    owner: p.getProperty('OWNER_EMAIL') || DEFAULT_OWNER_EMAIL,
    sheetId: p.getProperty('SPREADSHEET_ID') || DEFAULT_SPREADSHEET_ID };
}
function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
function hmac_(secret, message) {
  var bytes = Utilities.computeHmacSha256Signature(Utilities.newBlob(message).getBytes(), secret, Utilities.Charset.UTF_8);
  return bytes.map(function(b) { return ('0' + ((b + 256) % 256).toString(16)).slice(-2); }).join('');
}
function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.action === 'notifyRecipient') return notifyRecipient_(p);
  // Health only: no public test-email, diagnostic or write endpoints.
  return json_({ ok: true, service: 'Jitto Cleaning', version: 'verified-forms-v2' });
}
// One-time, token-guarded trigger included in the owner's gift card email.
// The owner clicks it after payment is confirmed; only then is the recipient emailed.
function notifyRecipient_(p) {
  function page(msg, ok) {
    return ContentService.createTextOutput(
      '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
      '<title>Jitto Gift Card Notification</title></head>' +
      '<body style="font-family:system-ui,sans-serif;max-width:480px;margin:64px auto;padding:0 24px;color:#0f172a">' +
      '<div style="border:1px solid #e2e8f0;border-radius:16px;padding:32px">' +
      '<div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:#012d6c">Jitto Cleaning Services</div>' +
      '<p style="margin:16px 0 0;font-size:15px;line-height:1.6;color:' + (ok ? '#0f766e' : '#b91c1c') + ';font-weight:600">' + msg + '</p>' +
      '<p style="margin:16px 0 0;font-size:13px;color:#64748b">You can close this tab.</p>' +
      '</div></body></html>'
    ).setMimeType(ContentService.MimeType.HTML);
  }
  var cfg = settings_();
  var ref = String(p.ref || '');
  var token = String(p.token || '');
  if (!cfg.secret || !/^[A-Za-z0-9-]{8,80}$/.test(ref) || !token || token !== hmac_(cfg.secret, 'notifyRecipient:' + ref)) {
    return page('This link is invalid or has expired.', false);
  }
  var lock = LockService.getScriptLock();
  var locked = false;
  try {
    locked = lock.tryLock(20000);
    if (!locked) return page('The service is busy. Please try this link again in a minute.', false);
    var target = sheet_(cfg.sheetId), sh = target.sheet, h = target.headers;
    var refCol = h.indexOf('Reference ID') + 1;
    var row = 0;
    if (sh.getLastRow() > 1) {
      var match = sh.getRange(2, refCol, sh.getLastRow() - 1, 1).createTextFinder(ref).matchEntireCell(true).findNext();
      if (match) row = match.getRow();
    }
    if (!row) return page('Reference ' + ref + ' was not found.', false);
    var vals = sh.getRange(row, 1, 1, h.length).getValues()[0];
    function col(key) { var i = h.indexOf(key); return i < 0 ? '' : String(vals[i] === null ? '' : vals[i]).trim(); }
    if (col('Recipient Notification Sent')) {
      return page('The recipient was already notified for ' + ref + '. No action is needed.', true);
    }
    if (col('Form Type') !== 'Gift Card Order') return page('This link is only for gift card orders.', false);
    var recipient = col('Recipient Email');
    if (!emailValid_(recipient)) return page('No valid recipient email is stored for ' + ref + '.', false);
    var buyer = (col('Customer Name') || 'A Jitto client').replace(/[\r\n]+/g, ' ');
    var recipientName = (col('Recipient Name') || 'there').replace(/[\r\n]+/g, ' ');
    var amount = col('Gift Amount');
    var message = col('Client Notes');
    var sendDate = col('Preferred Date');
    var subject = 'A gift card from ' + buyer + ' — Jitto Cleaning Services [' + ref + ']';
    var body = 'Hello ' + recipientName + ',\n\n' +
      buyer + ' has gifted you ' + (amount ? amount + ' toward a Jitto Cleaning gift card.' : 'a Jitto Cleaning gift card.') + '\n';
    if (message) body += '\nPersonal message from ' + buyer + ':\n"' + message + '"\n';
    body += '\nGift cards apply toward any Jitto cleaning service and do not expire.' +
      (sendDate ? '\nRequested gift date: ' + sendDate + '.' : '') +
      '\n\nJitto will contact you to introduce the gift and schedule your walkthrough. Simply reply to this email or call (249) 800-0127 or (437) 447-5020.\n\n' +
      'Reference: ' + ref + '\nJitto Cleaning Services\nhttps://www.jittogroups.ca';
    try {
      MailApp.sendEmail({ to: recipient, replyTo: cfg.owner, name: 'Jitto Cleaning Services', subject: subject, body: body });
      sh.getRange(row, h.indexOf('Recipient Notification Sent') + 1).setValue(new Date().toISOString());
      SpreadsheetApp.flush();
    } catch (err) {
      var errCol = h.indexOf('Last Error');
      if (errCol > 0) {
        var prev = String(vals[errCol] || '');
        sh.getRange(row, errCol + 1).setValue((prev ? prev + ' | ' : '') + 'Recipient: ' + err.message);
        SpreadsheetApp.flush();
      }
      return page('Sending to the recipient failed (' + err.message + '). Please try this link again.', false);
    }
    return page('Gift card notification sent to ' + recipient + ' for ' + ref + '.', true);
  } catch (err) {
    return page('Unexpected error: ' + err.message, false);
  } finally {
    if (locked) lock.releaseLock();
  }
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
  if (!d || ['Quotation Request', 'Booking Reservation', 'Contact Message', 'Gift Card Order'].indexOf(d.formType) < 0 ||
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
      'Owner Notification Sent': '', 'Customer Receipt Sent': '',
      'Recipient Name': (d.scopeDetails || {})['Recipient Name'] || '',
      'Recipient Email': (d.scopeDetails || {})['Recipient Email'] || '',
      'Gift Amount': (d.scopeDetails || {})['Gift Amount'] || '',
      'Recipient Notification Sent': '',
      'Last Error': '', 'Payload Fingerprint': fingerprint
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
    var summary = HEADERS.filter(function(key) { return ['Status', 'Owner Notification Sent', 'Customer Receipt Sent', 'Recipient Notification Sent', 'Last Error', 'Payload Fingerprint'].indexOf(key) < 0; })
      .map(function(key) { return key + ': ' + record[key]; }).join('\n');
    var errors = [];
    if (!ownerSent) {
      try {
        var ownerBody = summary;
        if (record['Form Type'] === 'Gift Card Order' && emailValid_(record['Recipient Email'])) {
          ownerBody += '\n\nGIFT CARD — RECIPIENT NOTIFICATION\n' +
            'After payment is confirmed, open this one-time link to email the recipient their gift announcement:\n' +
            ScriptApp.getService().getUrl() + '?action=notifyRecipient&ref=' + d.referenceId +
            '&token=' + hmac_(cfg.secret, 'notifyRecipient:' + d.referenceId);
        }
        MailApp.sendEmail({ to: cfg.owner, replyTo: d.email.trim(), name: 'Jitto Cleaning Services',
          subject: '[Jitto] New ' + record['Form Type'] + ' — ' + d.referenceId,
          body: ownerBody, attachments: blobs });
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
