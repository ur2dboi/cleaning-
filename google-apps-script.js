// ============================================================================
//  JITTO CLEANING SERVICES — GOOGLE APPS SCRIPT BACKEND (READY TO PASTE)
// ============================================================================
//  Database : Google Sheets (Website Inquiries tab)
//  Email    : Instant owner notification to karenrborlongan@gmail.com & customer receipt
//  Cost     : $0 / month — runs on Google's infrastructure
//
//  HOW TO DEPLOY IN 60 SECONDS:
//  1. Open script.google.com (or in your Sheet: Extensions ▸ Apps Script)
//  2. Select everything in Code.gs, delete it, and paste this entire file.
//  3. Click Save (Ctrl + S or 💾 icon).
//  4. IMPORTANT (Email Permissions):
//     In the toolbar dropdown next to "Debug", select "setup" or "testEmail" and click "Run".
//     Google will prompt: "Authorization required" → Click "Review permissions"
//     → Choose your Google account → Click "Advanced" → Click "Go to Untitled (unsafe)" → Click "Allow".
//     (This one-time approval allows Google to send emails on your behalf!)
//  5. Click Deploy ▸ Manage deployments ▸ click the pencil ✏️ next to your active deployment
//     ▸ Version: choose "New version"
//     ▸ Click "Deploy".
//     (The /exec URL stays the exact same, so the live website connects instantly!)
// ============================================================================

/**
 * ────────────────────────────────────────────────────────────
 *  CONFIGURATION
 *  Script properties in Project Settings (if set) always win over this block.
 * ────────────────────────────────────────────────────────────
 */
var CONFIG = {
  // Google Sheet ID: the code from your sheet address bar: /spreadsheets/d/<THIS_ID>/edit
  SHEET_ID: '18cvXPcs1AYHieIiadsFmb5L9286omefB_oZHbOYUuQw',

  // Tab names in your Google Sheet
  SHEET_INQUIRIES: 'Website Inquiries',
  SHEET_LOG: 'Activity log',

  // Where lead notifications land (separate multiple with commas)
  OWNER_EMAIL: 'karenrborlongan@gmail.com, info@jittogroups.ca',

  // Phone numbers shown to customers in email receipts
  OWNER_PHONE: '(249) 800-0127',
  OWNER_PHONE_SECONDARY: '(437) 447-5020',

  // Branding
  COMPANY_NAME: 'Jitto Cleaning Services',
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
   SETUP & PERMISSION AUTHORIZATION (RUN THIS ONCE)
   ============================================================ */
function setup() {
  var ss = ss_();
  var inq = tab_(ss, prop_('SHEET_INQUIRIES') || CONFIG.SHEET_INQUIRIES, HEADERS);
  tab_(ss, prop_('SHEET_LOG') || CONFIG.SHEET_LOG, LOG_HEADERS);

  // Style header row
  inq.getRange(1, 1, 1, HEADERS.length)
    .setFontWeight('bold')
    .setBackground('#0b1528')
    .setFontColor('#ffffff');
  inq.setFrozenRows(1);

  // Set text format for phone, date, reference columns to prevent auto-truncation
  ['A', 'B', 'G', 'H', 'K', 'L'].forEach(function (col) {
    inq.getRange(col + '2:' + col + '1000').setNumberFormat('@');
  });

  log_('setup', 'SYSTEM', 'Success', 'Spreadsheet initialized: ' + ss.getName());

  // Send an instant test alert to verify email delivery
  var testResult = testEmail();

  return 'Setup complete!\n\n' +
    'Spreadsheet: "' + ss.getName() + '" (' + ss.getId() + ')\n' +
    'Notification Recipients: ' + ownerEmails_().join(', ') + '\n' +
    'Email Test: ' + testResult + '\n\n' +
    'Next step: Deploy ▸ Manage deployments ▸ ✏️ Edit ▸ Version: New version ▸ Deploy.';
}

/**
 * Run this directly in the Apps Script editor to test email delivery in 1 click!
 */
function testEmail() {
  var owners = ownerEmails_();
  if (!owners.length) return 'No recipient emails found in OWNER_EMAIL or Script properties.';

  try {
    var timestamp = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm:ss');
    MailApp.sendEmail({
      to: owners.join(','),
      subject: '[Jitto Test] Lead Notification System is Active (' + timestamp + ')',
      name: CONFIG.COMPANY_NAME,
      body: [
        '====================================================',
        '  JITTO CLEANING SERVICES — EMAIL DISPATCH TEST',
        '====================================================',
        '',
        'This is a confirmation test sent from your Google Apps Script backend.',
        '',
        'Status:        ACTIVE & DELIVERING',
        'Timestamp:     ' + timestamp + ' (' + TZ + ')',
        'Recipients:    ' + owners.join(', '),
        'Spreadsheet:   https://docs.google.com/spreadsheets/d/' + (prop_('SHEET_ID') || CONFIG.SHEET_ID) + '/edit',
        '',
        'Your website inquiries (Quotation requests, Booking reservations, and Contact messages) will now trigger instant email alerts to your inbox and auto-confirm with your clients.',
        '',
        'Warm regards,',
        'Jitto Cleaning Services Backend'
      ].join('\n')
    });

    log_('testEmail', 'TEST-001', 'Success', 'Test email sent to ' + owners.join(', '));
    return 'Success! Test email sent to: ' + owners.join(', ');
  } catch (err) {
    var msg = 'Failed to send email: ' + err.toString();
    Logger.log(msg);
    log_('testEmail', 'TEST-ERR', 'Failed', msg);
    return msg;
  }
}

/**
 * Diagnostics helper: run to inspect script properties and sheet connection
 */
function diagnose() {
  var lines = [];
  lines.push('Script Timezone: ' + TZ);
  lines.push('SHEET_ID (Property): ' + (prop_('SHEET_ID') ? 'set (' + prop_('SHEET_ID') + ')' : 'Using CONFIG.SHEET_ID'));
  lines.push('OWNER_EMAIL: ' + ownerEmails_().join(', '));
  try {
    var ss = ss_();
    lines.push('Spreadsheet connection: SUCCESS — "' + ss.getName() + '"');
    var tabs = [];
    var sheets = ss.getSheets();
    for (var i = 0; i < sheets.length; i++) tabs.push(sheets[i].getName());
    lines.push('Existing tabs: ' + tabs.join(', '));
  } catch (e) {
    lines.push('SPREADSHEET ERROR: ' + e.message);
  }
  var out = lines.join('\n');
  Logger.log(out);
  return out;
}

/* ============================================================
   WEBHOOK HTTP ENDPOINTS
   ============================================================ */

/**
 * Handle incoming POST requests from website forms
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
  } catch (err) {
    return json_({ ok: false, error: 'Server busy, please retry in a moment' });
  }

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

    var refId = data.referenceId || ('JITTO-' + Utilities.formatDate(new Date(), TZ, 'yyMMdd') + '-' + Math.random().toString(36).slice(2, 6).toUpperCase());
    var timestamp = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm:ss');

    // 1. Resolve spreadsheet & tab
    var ss = ss_();
    var tabName = prop_('SHEET_INQUIRIES') || CONFIG.SHEET_INQUIRIES;
    var sh = tab_(ss, tabName, HEADERS);

    // 2. Format scope specifications
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
    }

    // 3. Append lead to Google Sheet
    var rowData = [
      timestamp,
      refId,
      data.formType || 'Website Inquiry',
      data.serviceCategory || 'General',
      data.fullName || 'Anonymous',
      data.companyName || '—',
      data.email || '—',
      data.phone ? phoneText_(data.phone) : '—',
      data.address || '—',
      data.city || 'Barrie / Simcoe County',
      data.preferredDate || '—',
      data.preferredTime || '—',
      scopeSummary,
      data.notes || '—',
      data.photoCount || 0,
      'New Lead'
    ];

    sh.appendRow(rowData);

    // 4. Send Owner Notification Email
    var emailStatus = 'Sent';
    if (CONFIG.SEND_OWNER_ALERT) {
      try {
        sendOwnerAlert_(data, refId, timestamp, scopeSummary);
      } catch (mailErr) {
        emailStatus = 'Owner Email Error: ' + mailErr.toString();
        Logger.log(emailStatus);
      }
    }

    // 5. Send Customer Receipt Email (if valid email provided)
    if (CONFIG.SEND_CUSTOMER_RECEIPT && data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email).trim())) {
      try {
        sendCustomerReceipt_(data, refId);
      } catch (custErr) {
        Logger.log('Customer receipt error: ' + custErr.toString());
      }
    }

    log_('inquiry', refId, 'Logged', data.formType + ' from ' + (data.fullName || 'Anonymous') + ' (' + emailStatus + ')');

    return json_({
      ok: true,
      status: 'success',
      referenceId: refId,
      emailStatus: emailStatus
    });

  } catch (err) {
    Logger.log('doPost exception: ' + err.toString());
    log_('inquiry', 'ERROR', 'Failed', err.toString());
    return json_({ ok: false, error: err.toString() });
  } finally {
    lock.releaseLock();
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
    service: CONFIG.COMPANY_NAME + ' Webhook',
    status: 'active',
    ownerEmails: ownerEmails_(),
    timestamp: new Date().toISOString()
  });
}

/* ============================================================
   EMAIL DISPATCHERS
   ============================================================ */

/**
 * 1. OWNER NOTIFICATION EMAIL
 */
function sendOwnerAlert_(data, refId, timestamp, scopeSummary) {
  var owners = ownerEmails_();
  if (!owners.length) return;

  var customerName = data.fullName || 'Customer';
  var formType = data.formType || 'Inquiry';
  var subject = '[JITTO NEW LEAD] ' + formType + ' — Ref #' + refId + ' (' + customerName + ')';

  var body = [
    '====================================================',
    '  NEW LEAD RECEIVED — JITTO CLEANING SERVICES',
    '====================================================',
    '',
    'Reference ID:    ' + refId,
    'Form Type:       ' + formType,
    'Timestamp:       ' + timestamp,
    '',
    '---------------- CUSTOMER DETAILS ------------------',
    'Name:            ' + (data.fullName || 'N/A'),
    'Phone:           ' + (data.phone || 'N/A'),
    'Email:           ' + (data.email || 'N/A'),
    'Company:         ' + (data.companyName || 'N/A'),
    'Property Address:' + (data.address || 'N/A'),
    'City / Area:     ' + (data.city || 'Barrie / Simcoe County'),
    '',
    '---------------- SERVICE & SCOPE -------------------',
    'Category:        ' + (data.serviceCategory || 'General'),
    'Package / Stage: ' + (data.packageOrStage || 'Standard'),
    'Frequency:       ' + (data.frequency || 'One-Time'),
    'Preferred Date:  ' + (data.preferredDate || 'Flexible'),
    'Preferred Time:  ' + (data.preferredTime || 'Flexible'),
    'Scope Details:   ' + scopeSummary,
    '',
    '---------------- CLIENT NOTES ----------------------',
    data.notes || 'No additional notes provided.',
    '',
    '====================================================',
    'View in Google Sheets:',
    'https://docs.google.com/spreadsheets/d/' + (prop_('SHEET_ID') || CONFIG.SHEET_ID) + '/edit',
    '',
    'Reply to this email to contact the customer directly at: ' + (data.email || 'N/A')
  ].join('\n');

  var replyToEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email || '')) ? String(data.email).trim() : undefined;

  MailApp.sendEmail({
    to: owners.join(','),
    subject: subject,
    name: CONFIG.COMPANY_NAME + ' Portal',
    replyTo: replyToEmail,
    body: body
  });
}

/**
 * 2. CUSTOMER CONFIRMATION RECEIPT EMAIL
 */
function sendCustomerReceipt_(data, refId) {
  var recipient = String(data.email).trim();
  var clientName = data.fullName ? String(data.fullName).split(' ')[0] : 'Valued Client';
  var formType = data.formType || 'Inquiry';
  var subject = 'We Received Your ' + formType + ' — Jitto Cleaning Services [Ref #' + refId + ']';

  var primaryEmail = ownerEmails_()[0] || 'info@jittogroups.ca';

  var body = [
    'Hi ' + clientName + ',',
    '',
    'Thank you for reaching out to Jitto Cleaning Services! We have received your ' + formType.toLowerCase() + ' request.',
    '',
    '---------------- SUMMARY OF YOUR REQUEST ----------------',
    'Reference ID:     ' + refId,
    'Service Category: ' + (data.serviceCategory ? String(data.serviceCategory).toUpperCase() : 'CLEANING'),
    'Location:         ' + (data.city || 'Barrie & Simcoe County') + (data.address ? ' (' + data.address + ')' : ''),
    (data.preferredDate ? 'Target Date:      ' + data.preferredDate : ''),
    (data.preferredTime ? 'Preferred Window: ' + data.preferredTime : ''),
    '',
    '---------------- WHAT HAPPENS NEXT -----------------------',
    '1. Leadership Review: Our leadership team reviews each property specification personally to ensure accurate scope.',
    '2. Personalized Scope: You will receive your customized proposal or walkthrough confirmation within 2 hours during business hours.',
    '3. Urgent Scheduling: If you need immediate emergency dispatch or handover cleaning, call our operations lines directly at ' + CONFIG.OWNER_PHONE + ' or ' + CONFIG.OWNER_PHONE_SECONDARY + '.',
    '',
    'Warm regards,',
    '',
    'The Jitto Cleaning Services Team',
    'Barrie & Simcoe County, Ontario',
    'Operations & 24/7 Dispatch: ' + CONFIG.OWNER_PHONE,
    'Client Services Line:        ' + CONFIG.OWNER_PHONE_SECONDARY + ' (Call or Text)',
    'Email: info@jittogroups.ca',
    'Website: ' + CONFIG.WEBSITE_URL
  ].filter(function (line) { return line !== ''; }).join('\n');

  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    name: CONFIG.COMPANY_NAME,
    replyTo: primaryEmail,
    body: body
  });
}

/* ============================================================
   HELPERS & REPOSITORY ACCESS
   ============================================================ */

/**
 * Resolves the Google Spreadsheet instance
 */
function ss_() {
  var id = prop_('SHEET_ID');
  if (id) {
    try {
      return SpreadsheetApp.openById(String(id).trim());
    } catch (err) {
      Logger.log('Could not open sheet by id: ' + id + ', falling back to active sheet');
    }
  }

  var active = SpreadsheetApp.getActive();
  if (active) return active;

  throw new Error('Cannot find spreadsheet with SHEET_ID "' + id + '". Make sure the sheet ID is valid and shared with your Google account.');
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

  try {
    var eff = Session.getEffectiveUser().getEmail();
    if (eff && list.indexOf(eff) === -1) {
      list.push(eff);
    }
  } catch (e) {}

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
function log_(action, refId, status, details) {
  try {
    var ss = ss_();
    var sh = tab_(ss, prop_('SHEET_LOG') || CONFIG.SHEET_LOG, LOG_HEADERS);
    sh.appendRow([
      Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm:ss'),
      action,
      refId || '—',
      status || '—',
      details || '—'
    ]);
  } catch (e) {
    Logger.log('log_ failed: ' + e.toString());
  }
}

/**
 * Helper to return formatted JSON HTTP output
 */
function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
