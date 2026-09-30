// ============================================================================
//  JITTO CLEANING SERVICES — GOOGLE APPS SCRIPT BACKEND
// ============================================================================
//  Destination Email : kylemheler02@gmail.com (Instant lead alert)
//  Database          : Google Sheets ("Website Inquiries" tab)
//  Supported Forms   : 1. Booking Reservation (BookingPage)
//                      2. Quotation Request (QuotationPage)
//                      3. Contact Message (ContactPage)
//
//  HOW TO DEPLOY IN 60 SECONDS:
//  1. Open script.google.com (or inside your Google Sheet: Extensions ▸ Apps Script)
//  2. Select everything in Code.gs, delete it, and paste this entire code.
//  3. Click Save (Ctrl + S or 💾 icon).
//  4. IMPORTANT — GRANT EMAIL PERMISSIONS:
//     In the toolbar dropdown (next to "Debug"), select "setup" or "testEmail" and click "Run".
//     Google will display: "Authorization required" → Click "Review permissions"
//     → Choose your Google account → Click "Advanced" → Click "Go to Untitled (unsafe)" → Click "Allow".
//     (This one-time approval allows Google to send emails to your inbox!)
//  5. Click Deploy ▸ Manage deployments ▸ click the pencil ✏️ next to your active deployment
//     ▸ Version: choose "New version"
//     ▸ Click "Deploy".
//     (The /exec URL stays the exact same, so the live website connects instantly!)
// ============================================================================

var CONFIG = {
  // Temporary recipient for all lead notifications (Quotation, Booking & Contact)
  OWNER_EMAIL: 'kylemheler02@gmail.com',

  // Google Sheet ID from URL: /spreadsheets/d/<THIS_ID>/edit
  // (If script is opened inside the Sheet via Extensions ▸ Apps Script, it connects automatically!)
  SHEET_ID: '18cvXPcs1AYHieIiadsFmb5L9286omefB_oZHbOYUuQw',

  // Tab names in your Google Sheet
  SHEET_INQUIRIES: 'Website Inquiries',
  SHEET_LOG: 'Activity log',

  // Company Contact Details
  COMPANY_NAME: 'Jitto Cleaning Services',
  OWNER_PHONE: '(249) 800-0127',
  OWNER_PHONE_SECONDARY: '(437) 447-5020',
  WEBSITE_URL: 'https://www.jittogroups.ca',

  // Toggles
  SEND_OWNER_ALERT: true,
  SEND_CUSTOMER_RECEIPT: true
};

var TZ = Session.getScriptTimeZone() || 'America/Toronto';

var HEADERS = [
  'Timestamp',
  'Reference ID',
  'Form Type',
  'Service Category',
  'Customer Name',
  'Company',
  'Email',
  'Phone',
  'Property Address',
  'City',
  'Preferred Date',
  'Preferred Time',
  'Scope / Specifications',
  'Client Notes',
  'Photos Attached',
  'Status'
];

var LOG_HEADERS = ['When', 'Action', 'Reference ID', 'Status', 'Details'];

/* ============================================================
   SETUP & PERMISSION AUTHORIZATION (RUN THIS ONCE IN EDITOR)
   ============================================================ */
function setup() {
  var ss = ss_();
  var logDetails = [];

  if (ss) {
    var inq = tab_(ss, prop_('SHEET_INQUIRIES') || CONFIG.SHEET_INQUIRIES, HEADERS);
    tab_(ss, prop_('SHEET_LOG') || CONFIG.SHEET_LOG, LOG_HEADERS);

    inq.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#0b1528')
      .setFontColor('#ffffff');
    inq.setFrozenRows(1);

    ['A', 'B', 'G', 'H', 'K', 'L'].forEach(function (col) {
      inq.getRange(col + '2:' + col + '1000').setNumberFormat('@');
    });

    logDetails.push('Connected to Sheet: "' + ss.getName() + '"');
  } else {
    logDetails.push('Sheet note: Open this script from inside your Sheet (Extensions ▸ Apps Script) for automatic binding.');
  }

  // Send test email to verify delivery to kylemheler02@gmail.com
  var testResult = testEmail();

  return 'Setup execution complete!\n\n' +
    'Target Owner Email: ' + ownerEmails_().join(', ') + '\n' +
    'Email Test Status: ' + testResult + '\n' +
    logDetails.join('\n') + '\n\n' +
    'Next step: Deploy ▸ Manage deployments ▸ ✏️ Edit ▸ Version: New version ▸ Deploy.';
}

/**
 * 1-CLICK EMAIL TEST: Run from toolbar dropdown to verify kylemheler02@gmail.com delivery
 */
function testEmail() {
  var owners = ownerEmails_();
  if (!owners.length) return 'No recipient email found.';

  try {
    var timestamp = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm:ss');
    MailApp.sendEmail({
      to: owners.join(','),
      subject: '[JITTO TEST] Form Dispatch Connected (' + timestamp + ')',
      name: CONFIG.COMPANY_NAME,
      body: [
        '====================================================',
        '  JITTO CLEANING SERVICES — NOTIFICATION TEST',
        '====================================================',
        '',
        'Congratulations! Email delivery is working 100%.',
        '',
        'Target Inbox:  ' + owners.join(', '),
        'Timestamp:     ' + timestamp + ' (' + TZ + ')',
        '',
        'All 3 forms on the website are now connected:',
        '  ✓ Booking Reservation Form',
        '  ✓ Quotation Request Form',
        '  ✓ Contact Us Form',
        '',
        'When a customer submits an inquiry, an instant alert with all property specs, contact info, and notes will land in this inbox.',
        '',
        'Warm regards,',
        'Jitto Cleaning Services Backend'
      ].join('\n')
    });

    return 'SUCCESS: Test email delivered to ' + owners.join(', ');
  } catch (err) {
    var msg = 'EMAIL ERROR: ' + err.toString();
    Logger.log(msg);
    return msg;
  }
}

/**
 * Diagnostic inspector: Run to view script configuration
 */
function diagnose() {
  var lines = [];
  lines.push('Timezone: ' + TZ);
  lines.push('Owner Email: ' + ownerEmails_().join(', '));
  try {
    var ss = ss_();
    if (ss) {
      lines.push('Spreadsheet: CONNECTED ("' + ss.getName() + '")');
      var names = [];
      var sheets = ss.getSheets();
      for (var i = 0; i < sheets.length; i++) names.push(sheets[i].getName());
      lines.push('Tabs: ' + names.join(', '));
    } else {
      lines.push('Spreadsheet: Standalone mode (emails will send, sheets optional)');
    }
  } catch (e) {
    lines.push('Spreadsheet notice: ' + e.message);
  }
  var out = lines.join('\n');
  Logger.log(out);
  return out;
}

/* ============================================================
   WEBHOOK HTTP ENDPOINT (POST)
   Receives Booking, Quotation, and Contact submissions
   ============================================================ */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
  } catch (err) {}

  try {
    var raw = (e && e.postData && e.postData.contents) || '';
    var data = {};

    if (raw) {
      try {
        data = JSON.parse(raw);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else {
      data = (e && e.parameter) || {};
    }

    // Normalize field names across all 3 forms (Booking, Quote, Contact)
    var fullName = data.fullName || data.name || data.clientName || 'Anonymous';
    var email = data.email || data.clientEmail || '';
    var phone = data.phone || data.contactNumber || data.tel || '';
    var formType = data.formType || (data.action === 'book' ? 'Booking Reservation' : 'Website Inquiry');
    var category = data.serviceCategory || data.category || 'General';
    var address = data.address || data.propertyAddress || '—';
    var city = data.city || 'Barrie / Simcoe County';
    var date = data.preferredDate || data.date || 'Flexible';
    var time = data.preferredTime || data.time || 'Flexible';
    var notes = data.notes || data.specialRequests || data.message || '—';
    var company = data.companyName || data.company || '—';
    var refId = data.referenceId || ('JITTO-' + Utilities.formatDate(new Date(), TZ, 'yyMMdd') + '-' + Math.random().toString(36).slice(2, 6).toUpperCase());
    var timestamp = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm:ss');

    // Format scope summary
    var scopeSummary = 'None';
    if (data.scopeDetails) {
      if (typeof data.scopeDetails === 'object') {
        var items = [];
        for (var k in data.scopeDetails) {
          if (data.scopeDetails.hasOwnProperty(k)) {
            var v = data.scopeDetails[k];
            items.push(k + ': ' + (Array.isArray(v) ? v.join(', ') : v));
          }
        }
        scopeSummary = items.join(' | ');
      } else {
        scopeSummary = String(data.scopeDetails);
      }
    } else if (data.packageOrStage) {
      scopeSummary = 'Package / Stage: ' + data.packageOrStage;
    }

    var emailSent = false;
    var emailError = '';

    // ========================================================
    // 1. SEND OWNER ALERT EMAIL (kylemheler02@gmail.com)
    // Run first in protected try-catch so it ALWAYS sends!
    // ========================================================
    if (CONFIG.SEND_OWNER_ALERT) {
      try {
        sendOwnerAlert_({
          refId: refId,
          formType: formType,
          category: category,
          fullName: fullName,
          phone: phone,
          email: email,
          company: company,
          address: address,
          city: city,
          date: date,
          time: time,
          scopeSummary: scopeSummary,
          notes: notes,
          timestamp: timestamp
        });
        emailSent = true;
      } catch (mErr) {
        emailError = mErr.toString();
        Logger.log('Owner email error: ' + emailError);
      }
    }

    // ========================================================
    // 2. SEND CUSTOMER CONFIRMATION RECEIPT (if email provided)
    // ========================================================
    if (CONFIG.SEND_CUSTOMER_RECEIPT && email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())) {
      try {
        sendCustomerReceipt_({
          refId: refId,
          formType: formType,
          category: category,
          fullName: fullName,
          email: email,
          address: address,
          city: city,
          date: date,
          time: time
        });
      } catch (cErr) {
        Logger.log('Customer receipt error: ' + cErr.toString());
      }
    }

    // ========================================================
    // 3. LOG TO GOOGLE SHEETS (Protected so it never crashes)
    // ========================================================
    var sheetLogged = false;
    try {
      var ss = ss_();
      if (ss) {
        var tabName = prop_('SHEET_INQUIRIES') || CONFIG.SHEET_INQUIRIES;
        var sh = tab_(ss, tabName, HEADERS);
        sh.appendRow([
          timestamp,
          refId,
          formType,
          category,
          fullName,
          company,
          email || '—',
          phoneText_(phone),
          address,
          city,
          date,
          time,
          scopeSummary,
          notes,
          data.photoCount || 0,
          'New Lead'
        ]);
        sheetLogged = true;

        log_(ss, 'INQUIRY', refId, 'Success', formType + ' from ' + fullName);
      }
    } catch (sErr) {
      Logger.log('Sheet logging notice: ' + sErr.toString());
    }

    return json_({
      ok: true,
      status: 'success',
      referenceId: refId,
      emailDelivered: emailSent,
      sheetLogged: sheetLogged,
      emailError: emailError || undefined
    });

  } catch (err) {
    Logger.log('doPost fatal error: ' + err.toString());
    return json_({ ok: false, error: err.toString() });
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}

/**
 * Handle GET requests (ping / health checks)
 */
function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.action === 'diagnose') return ContentService.createTextOutput(diagnose()).setMimeType(ContentService.MimeType.TEXT);
  if (p.action === 'test')     return json_({ ok: true, result: testEmail() });

  return json_({
    ok: true,
    service: CONFIG.COMPANY_NAME + ' Backend Webhook',
    status: 'active',
    ownerEmails: ownerEmails_(),
    timestamp: new Date().toISOString()
  });
}

/* ============================================================
   EMAIL DISPATCHERS
   ============================================================ */

/**
 * Sends detailed lead notification to kylemheler02@gmail.com
 */
function sendOwnerAlert_(lead) {
  var owners = ownerEmails_();
  if (!owners.length) return;

  var tag = lead.formType.toUpperCase().indexOf('BOOKING') !== -1 ? 'NEW BOOKING' :
            lead.formType.toUpperCase().indexOf('QUOTE') !== -1 ? 'NEW QUOTE' : 'NEW MESSAGE';

  var subject = '[' + tag + '] ' + lead.fullName + ' — ' + lead.category + ' (Ref #' + lead.refId + ')';

  var body = [
    '====================================================',
    '  JITTO CLEANING SERVICES — ' + tag,
    '====================================================',
    '',
    'Reference ID:    ' + lead.refId,
    'Form Type:       ' + lead.formType,
    'Timestamp:       ' + lead.timestamp,
    '',
    '---------------- CUSTOMER CONTACT ------------------',
    'Name:            ' + lead.fullName,
    'Phone:           ' + lead.phone,
    'Email:           ' + lead.email,
    'Company:         ' + lead.company,
    'Property Address:' + lead.address,
    'City / Region:   ' + lead.city,
    '',
    '---------------- SERVICE & SCOPE -------------------',
    'Service Category:' + lead.category,
    'Target Date:     ' + lead.date,
    'Time Window:     ' + lead.time,
    'Scope Details:   ' + lead.scopeSummary,
    '',
    '---------------- CLIENT SPECIAL NOTES --------------',
    lead.notes,
    '',
    '====================================================',
    'Hit "Reply" in your email to contact the customer directly at ' + (lead.email || lead.phone) + '.',
    'Website: ' + CONFIG.WEBSITE_URL
  ].join('\n');

  var replyTo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(lead.email || '')) ? String(lead.email).trim() : undefined;

  MailApp.sendEmail({
    to: owners.join(','),
    subject: subject,
    name: CONFIG.COMPANY_NAME + ' Web Portal',
    replyTo: replyTo,
    body: body
  });
}

/**
 * Sends instant confirmation receipt to customer
 */
function sendCustomerReceipt_(lead) {
  var recipient = String(lead.email).trim();
  var firstName = lead.fullName ? String(lead.fullName).split(' ')[0] : 'Valued Client';
  var subject = 'We Received Your ' + lead.formType + ' — Jitto Cleaning Services [Ref #' + lead.refId + ']';

  var body = [
    'Hi ' + firstName + ',',
    '',
    'Thank you for reaching out to Jitto Cleaning Services! We have received your ' + lead.formType.toLowerCase() + ' request.',
    '',
    '---------------- SUMMARY OF YOUR INQUIRY ----------------',
    'Reference ID:     ' + lead.refId,
    'Service Category: ' + String(lead.category).toUpperCase(),
    'Location:         ' + lead.city + (lead.address && lead.address !== '—' ? ' (' + lead.address + ')' : ''),
    (lead.date && lead.date !== 'Flexible' ? 'Target Date:      ' + lead.date : ''),
    (lead.time && lead.time !== 'Flexible' ? 'Preferred Window: ' + lead.time : ''),
    '',
    '---------------- WHAT HAPPENS NEXT -----------------------',
    '1. Leadership Review: Our leadership team personally reviews each property specification to ensure an accurate, customized scope.',
    '2. Swift Confirmation: You will receive your tailored proposal or walkthrough schedule within 2 business hours.',
    '3. Urgent Scheduling: If you require immediate emergency scheduling or handover turnaround, call our team directly at ' + CONFIG.OWNER_PHONE + ' or ' + CONFIG.OWNER_PHONE_SECONDARY + '.',
    '',
    'Warm regards,',
    '',
    'The Jitto Cleaning Services Leadership Team',
    'Barrie & Simcoe County, Ontario',
    'Operations & 24/7 Dispatch: ' + CONFIG.OWNER_PHONE,
    'Client Services Line:        ' + CONFIG.OWNER_PHONE_SECONDARY + ' (Call or Text)',
    'Website: ' + CONFIG.WEBSITE_URL
  ].filter(function (l) { return l !== ''; }).join('\n');

  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    name: CONFIG.COMPANY_NAME,
    replyTo: ownerEmails_()[0] || 'kylemheler02@gmail.com',
    body: body
  });
}

/* ============================================================
   HELPERS & SHEET ACCESS
   ============================================================ */

/**
 * Resolves the Google Spreadsheet instance gracefully
 */
function ss_() {
  // 1. If script is opened from within the sheet, getActive() connects automatically
  try {
    var active = SpreadsheetApp.getActive();
    if (active) return active;
  } catch (e) {}

  // 2. Try explicit SHEET_ID
  var id = prop_('SHEET_ID') || CONFIG.SHEET_ID;
  if (id) {
    try {
      return SpreadsheetApp.openById(String(id).trim());
    } catch (e) {
      Logger.log('Notice: Could not open sheet by ID: ' + id);
    }
  }

  // 3. Try to find by name in Drive
  try {
    var it = DriveApp.getFilesByName('Jitto Website Inquiries');
    if (it.hasNext()) return SpreadsheetApp.openById(it.next().getId());
  } catch (e) {}

  return null;
}

/**
 * Ensures tab exists with headers
 */
function tab_(ss, name, headers) {
  var sh = ss.getSheetByName(name);
  if (!sh) {
    var sheets = ss.getSheets();
    if (sheets.length === 1 && sheets[0].getLastRow() === 0) {
      sh = sheets[0];
      sh.setName(name);
    } else {
      sh = ss.insertSheet(name);
    }
  }

  if (sh.getLastRow() === 0 && headers && headers.length) {
    sh.appendRow(headers);
    sh.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#0b1528')
      .setFontColor('#ffffff');
    sh.setFrozenRows(1);
  }

  return sh;
}

/**
 * Resolves recipient emails from Script Properties or CONFIG
 */
function ownerEmails_() {
  var raw = String(prop_('OWNER_EMAIL') || CONFIG.OWNER_EMAIL || '');
  var list = raw.split(',').map(function (s) {
    return String(s).trim();
  }).filter(function (s) {
    return s && s.indexOf('@') !== -1;
  });

  // Always ensure kylemheler02@gmail.com is present as requested
  if (list.indexOf('kylemheler02@gmail.com') === -1) {
    list.unshift('kylemheler02@gmail.com');
  }

  return list;
}

/**
 * Get property: Script Properties win over CONFIG block
 */
function prop_(k) {
  try {
    var set = PropertiesService.getScriptProperties().getProperty(k);
    if (set) return String(set).trim();
  } catch (e) {}

  var c = (typeof CONFIG !== 'undefined' && CONFIG && CONFIG[k] !== undefined && CONFIG[k] !== '')
    ? String(CONFIG[k]).trim() : '';
  return c || null;
}

/**
 * Format phone values cleanly to prevent scientific notation in Sheets
 */
function phoneText_(v) {
  if (v === '' || v === null || v === undefined) return '—';
  if (typeof v === 'number') {
    var s = String(Math.round(v));
    return (s.length === 10 && s.charAt(0) === '9') ? '0' + s : s;
  }
  return String(v);
}

/**
 * Append entry to Activity Log tab
 */
function log_(ss, action, refId, status, details) {
  try {
    if (!ss) return;
    var sh = tab_(ss, prop_('SHEET_LOG') || CONFIG.SHEET_LOG, LOG_HEADERS);
    sh.appendRow([
      Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm:ss'),
      action,
      refId || '—',
      status || '—',
      details || '—'
    ]);
  } catch (e) {}
}

/**
 * JSON HTTP response
 */
function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
