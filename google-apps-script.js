// ============================================================================
//  JITTO CLEANING SERVICES — OFFICIAL GOOGLE APPS SCRIPT BACKEND
// ============================================================================
//  Target Email : kylemheler02@gmail.com
//  Google Sheet : https://docs.google.com/spreadsheets/d/18cvXPcs1AYHieIiadsFmb5L9286omefB_oZHbOYUuQw/edit
//  Tab Name     : "Website Inquiries"
//  Connected    : 1. Booking Reservation Form (BookingPage)
//                 2. Quotation Request Form (QuotationPage)
//                 3. Contact Message Form (ContactPage)
//
//  ============================================================================
//  HOW TO DEPLOY IN 60 SECONDS:
//  ============================================================================
//  1. Open script.google.com (or in your Sheet: Extensions ▸ Apps Script)
//  2. Select all existing code in Code.gs, delete it, and paste this entire code.
//  3. Press Save (Ctrl + S or 💾 icon).
//  4. ONE-TIME PERMISSION GRANT:
//     In the toolbar dropdown (next to "Debug"), choose "setup" or "testEmail" and click "Run".
//     Google will prompt: "Authorization required" → Click "Review permissions"
//     → Choose your account (kylemheler02@gmail.com) → Click "Advanced"
//     → Click "Go to Untitled (unsafe)" → Click "Allow".
//     (Check your inbox — you will immediately receive a test confirmation email!)
//  5. Deploy as Web App:
//     Click "Deploy" ▸ "Manage deployments" ▸ click the pencil ✏️ next to your active deployment
//     ▸ Under Version: choose "New version"
//     ▸ Click "Deploy".
//     (The /exec URL stays the exact same, so the website connects instantly!)
// ============================================================================

var SPREADSHEET_ID = '18cvXPcs1AYHieIiadsFmb5L9286omefB_oZHbOYUuQw';
var TARGET_OWNER_EMAIL = 'kylemheler02@gmail.com';
var SHEET_TAB_NAME = 'Website Inquiries';
var LOG_TAB_NAME = 'Activity log';

var COMPANY_NAME = 'Jitto Cleaning Services';
var OWNER_PHONE = '(249) 800-0127';
var OWNER_PHONE_SECONDARY = '(437) 447-5020';
var WEBSITE_URL = 'https://www.jittogroups.ca';

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
   SETUP & TEST RUNNERS
   ============================================================ */

/**
 * Run setup() from the editor toolbar once to initialize sheets and authorize permissions
 */
function setup() {
  var ss = ss_();
  var sheetStatus = 'Not found';

  if (ss) {
    var inq = tab_(ss, SHEET_TAB_NAME, HEADERS);
    tab_(ss, LOG_TAB_NAME, LOG_HEADERS);

    inq.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#0b1528')
      .setFontColor('#ffffff');
    inq.setFrozenRows(1);

    ['A', 'B', 'G', 'H', 'K', 'L'].forEach(function (col) {
      inq.getRange(col + '2:' + col + '1000').setNumberFormat('@');
    });

    sheetStatus = 'CONNECTED to Google Sheet: "' + ss.getName() + '"';
    log_(ss, 'SETUP', 'SYS-001', 'Success', 'Spreadsheet initialized');
  } else {
    sheetStatus = 'NOTICE: Could not open sheet by ID ' + SPREADSHEET_ID + '. Make sure the spreadsheet is shared with your account.';
  }

  var testResult = testEmail();

  return '====================================================\n' +
    '  JITTO CLEANING SERVICES — SETUP REPORT\n' +
    '====================================================\n\n' +
    'Owner Notification Email: ' + TARGET_OWNER_EMAIL + '\n' +
    'Target Spreadsheet ID:   ' + SPREADSHEET_ID + '\n' +
    'Spreadsheet Status:      ' + sheetStatus + '\n' +
    'Email Dispatch Test:     ' + testResult + '\n\n' +
    'Next Step: Deploy ▸ Manage deployments ▸ ✏️ Edit ▸ Version: New version ▸ Deploy.';
}

/**
 * 1-Click Email Test: sends a test alert to kylemheler02@gmail.com
 */
function testEmail() {
  try {
    var timestamp = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm:ss');
    MailApp.sendEmail({
      to: TARGET_OWNER_EMAIL,
      subject: '[JITTO TEST] Form Dispatch Connected (' + timestamp + ')',
      name: COMPANY_NAME,
      body: [
        '====================================================',
        '  JITTO CLEANING SERVICES — DISPATCH TEST',
        '====================================================',
        '',
        'Congratulations! Email delivery is 100% active and working.',
        '',
        'Recipient:    ' + TARGET_OWNER_EMAIL,
        'Timestamp:    ' + timestamp + ' (' + TZ + ')',
        'Google Sheet: https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/edit',
        '',
        'Connected Forms:',
        '  ✓ 1. Booking Reservation Form (BookingPage)',
        '  ✓ 2. Quotation Request Form (QuotationPage)',
        '  ✓ 3. Contact Us Form (ContactPage)',
        '',
        'Whenever a client submits any form on www.jittogroups.ca, you will receive an instant notification with full client details, address, scope specs, and special notes.',
        '',
        'Warm regards,',
        'Jitto Cleaning Services Backend'
      ].join('\n')
    });

    return 'SUCCESS: Test email delivered to ' + TARGET_OWNER_EMAIL;
  } catch (err) {
    var msg = 'EMAIL ERROR: ' + err.toString();
    Logger.log(msg);
    return msg;
  }
}

/**
 * Diagnostic inspector
 */
function diagnose() {
  var lines = [];
  lines.push('Timezone: ' + TZ);
  lines.push('Owner Email: ' + TARGET_OWNER_EMAIL);
  lines.push('Target Sheet ID: ' + SPREADSHEET_ID);

  var ss = ss_();
  if (ss) {
    lines.push('Spreadsheet: CONNECTED ("' + ss.getName() + '")');
    var names = [];
    var sheets = ss.getSheets();
    for (var i = 0; i < sheets.length; i++) names.push(sheets[i].getName());
    lines.push('Existing tabs: ' + names.join(', '));
  } else {
    lines.push('Spreadsheet: Cannot open by ID. (Make sure this Google Account has Editor access to the Sheet)');
  }

  var out = lines.join('\n');
  Logger.log(out);
  return out;
}

/* ============================================================
   WEBHOOK HTTP ENDPOINTS
   ============================================================ */

/**
 * POST handler: receives all Booking, Quote, and Contact submissions
 */
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

    // Normalize field names across all 3 forms
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
    // 1. INSTANT EMAIL ALERT TO kylemheler02@gmail.com
    // Runs in its own try/catch so it NEVER fails if Sheets is busy
    // ========================================================
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

    // ========================================================
    // 2. INSTANT CONFIRMATION RECEIPT TO CUSTOMER
    // ========================================================
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())) {
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
    // 3. APPEND TO GOOGLE SHEETS
    // ========================================================
    var sheetLogged = false;
    try {
      var ss = ss_();
      if (ss) {
        var sh = tab_(ss, SHEET_TAB_NAME, HEADERS);
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
      Logger.log('Sheet append note: ' + sErr.toString());
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
 * GET handler: health check & diagnostics
 */
function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.action === 'diagnose') return ContentService.createTextOutput(diagnose()).setMimeType(ContentService.MimeType.TEXT);
  if (p.action === 'test')     return json_({ ok: true, result: testEmail() });

  return json_({
    ok: true,
    service: COMPANY_NAME + ' Webhook',
    status: 'active',
    ownerEmail: TARGET_OWNER_EMAIL,
    sheetId: SPREADSHEET_ID,
    timestamp: new Date().toISOString()
  });
}

/* ============================================================
   EMAIL DISPATCH LOGIC
   ============================================================ */

/**
 * Sends formatted lead alert to kylemheler02@gmail.com
 */
function sendOwnerAlert_(lead) {
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
    'View in Google Sheets:',
    'https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/edit',
    '',
    'Hit "Reply" in your email to contact the customer directly at: ' + (lead.email || lead.phone),
    'Website: ' + WEBSITE_URL
  ].join('\n');

  var replyTo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(lead.email || '')) ? String(lead.email).trim() : undefined;

  MailApp.sendEmail({
    to: TARGET_OWNER_EMAIL,
    subject: subject,
    name: COMPANY_NAME + ' Web Portal',
    replyTo: replyTo,
    body: body
  });
}

/**
 * Sends confirmation receipt to customer
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
    '3. Urgent Scheduling: If you require immediate emergency scheduling or handover turnaround, call our team directly at ' + OWNER_PHONE + ' or ' + OWNER_PHONE_SECONDARY + '.',
    '',
    'Warm regards,',
    '',
    'The Jitto Cleaning Services Leadership Team',
    'Barrie & Simcoe County, Ontario',
    'Operations & 24/7 Dispatch: ' + OWNER_PHONE,
    'Client Services Line:        ' + OWNER_PHONE_SECONDARY + ' (Call or Text)',
    'Website: ' + WEBSITE_URL
  ].filter(function (l) { return l !== ''; }).join('\n');

  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    name: COMPANY_NAME,
    replyTo: TARGET_OWNER_EMAIL,
    body: body
  });
}

/* ============================================================
   GOOGLE SPREADSHEET ACCESS HELPERS
   ============================================================ */

/**
 * Opens Google Sheet by exact SPREADSHEET_ID or Active Sheet
 */
function ss_() {
  if (SPREADSHEET_ID) {
    try {
      return SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (e) {
      Logger.log('Notice: openById failed for ' + SPREADSHEET_ID + ': ' + e.message);
    }
  }

  try {
    var active = SpreadsheetApp.getActive();
    if (active) return active;
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
 * Format phone strings to prevent truncation or exponential formatting
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
 * Logs activity to the Activity Log tab
 */
function log_(ss, action, refId, status, details) {
  try {
    if (!ss) return;
    var sh = tab_(ss, LOG_TAB_NAME, LOG_HEADERS);
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
 * Output JSON helper
 */
function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
