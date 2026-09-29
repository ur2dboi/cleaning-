/**
 * ============================================================================
 * JITTO CLEANING SERVICES - GOOGLE APPS SCRIPT WEBHOOK (V3 - DUAL NOTIFICATIONS)
 * ============================================================================
 * 
 * 1. Appends all inquiries into Google Sheets
 * 2. Sends INSTANT NOTIFICATION to You (Business Owner)
 * 3. Sends INSTANT CONFIRMATION RECEIPT to the Customer
 * 
 * Target Google Sheet:
 * https://docs.google.com/spreadsheets/d/18cvXPcs1AYHieIiadsFmb5L9286omefB_oZHbOYUuQw/edit
 * ============================================================================
 */

// CONFIGURATION
var SPREADSHEET_ID = "18cvXPcs1AYHieIiadsFmb5L9286omefB_oZHbOYUuQw";
var ADMIN_EMAIL = "info@jittogroups.ca"; // Primary business inbox
var SEND_OWNER_ALERT = true;       // Alert you on new leads
var SEND_CUSTOMER_RECEIPT = true;  // Send auto-confirmation to the customer
var SHEET_NAME = "Website Inquiries";

/**
 * Handle incoming POST requests from the website forms
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: "error", message: "No data received" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      data = e.parameter || {};
    }

    // 1. Open Google Sheet directly by ID
    var ss;
    try {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (openErr) {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    }

    if (!ss) {
      throw new Error("Unable to locate Google Sheet ID: " + SPREADSHEET_ID);
    }

    // 2. Select or create the tab
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      var firstSheet = ss.getSheets()[0];
      if (firstSheet && firstSheet.getLastRow() === 0) {
        sheet = firstSheet;
        sheet.setName(SHEET_NAME);
      } else {
        sheet = ss.insertSheet(SHEET_NAME);
      }
    }

    // 3. Create header row if empty
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp", "Reference ID", "Form Type", "Service Category",
        "Customer Name", "Company", "Email", "Phone", "Address", "City",
        "Preferred Date", "Preferred Time", "Scope / Specifications",
        "Client Notes", "Photos Count", "Status"
      ];
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#012d6c");
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // 4. Format Scope Summary
    var scopeSummary = "N/A";
    if (data.scopeDetails) {
      if (typeof data.scopeDetails === "object") {
        var parts = [];
        for (var key in data.scopeDetails) {
          if (data.scopeDetails.hasOwnProperty(key)) {
            var val = data.scopeDetails[key];
            parts.push(key + ": " + (Array.isArray(val) ? val.join(", ") : val));
          }
        }
        scopeSummary = parts.join(" | ");
      } else {
        scopeSummary = String(data.scopeDetails);
      }
    }

    // 5. Append Row to Sheet
    var timestamp = new Date().toLocaleString("en-CA", { timeZone: "America/Toronto" });
    var rowData = [
      timestamp,
      data.referenceId || "N/A",
      data.formType || "Website Inquiry",
      data.serviceCategory || "General",
      data.fullName || "Anonymous",
      data.companyName || "N/A",
      data.email || "N/A",
      data.phone || "N/A",
      data.address || "N/A",
      data.city || "Barrie / Simcoe County",
      data.preferredDate || "N/A",
      data.preferredTime || "N/A",
      scopeSummary,
      data.notes || "None",
      data.photoCount || 0,
      "New Lead"
    ];

    sheet.appendRow(rowData);

    // Auto-fit column widths
    try {
      for (var i = 1; i <= rowData.length; i++) {
        sheet.autoResizeColumn(i);
      }
    } catch (resizeErr) {}

    // 6A. Send Email Alert to YOU (The Owner)
    if (SEND_OWNER_ALERT) {
      sendOwnerAlert(data, timestamp, scopeSummary);
    }

    // 6B. Send Instant Confirmation Receipt to the CUSTOMER
    if (SEND_CUSTOMER_RECEIPT && data.email && data.email.indexOf("@") !== -1) {
      sendCustomerReceipt(data);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: "success", 
        referenceId: data.referenceId,
        message: "Logged to Google Sheet, notified owner and customer" 
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("doPost Error: " + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: "active", 
      service: "Jitto Cleaning Services - Form Webhook",
      spreadsheetId: SPREADSHEET_ID 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 1. EMAIL NOTIFICATION SENT TO YOU (BUSINESS OWNER)
 */
function sendOwnerAlert(data, timestamp, scopeSummary) {
  try {
    var subject = "[JITTO NEW LEAD] " + (data.formType || "Inquiry") + " - Ref #" + (data.referenceId || "N/A") + " (" + (data.fullName || "Customer") + ")";
    
    var body = 
      "====================================================\n" +
      "  NEW INQUIRY RECEIVED - JITTO CLEANING SERVICES\n" +
      "====================================================\n\n" +
      "Reference ID:    " + (data.referenceId || "N/A") + "\n" +
      "Form Type:       " + (data.formType || "N/A") + "\n" +
      "Timestamp:       " + timestamp + "\n\n" +
      "---------------- CUSTOMER DETAILS ------------------\n" +
      "Name:            " + (data.fullName || "N/A") + "\n" +
      "Company:         " + (data.companyName || "N/A") + "\n" +
      "Email:           " + (data.email || "N/A") + "\n" +
      "Phone:           " + (data.phone || "N/A") + "\n" +
      "Address:         " + (data.address || "N/A") + ", " + (data.city || "Barrie") + "\n\n" +
      "---------------- SERVICE & SCOPE -------------------\n" +
      "Category:        " + (data.serviceCategory || "N/A") + "\n" +
      "Stage / Package: " + (data.packageOrStage || "N/A") + "\n" +
      "Frequency:       " + (data.frequency || "N/A") + "\n" +
      "Preferred Date:  " + (data.preferredDate || "N/A") + "\n" +
      "Preferred Time:  " + (data.preferredTime || "N/A") + "\n" +
      "Scope Details:   " + scopeSummary + "\n\n" +
      "---------------- CLIENT NOTES ----------------------\n" +
      (data.notes || "None provided") + "\n\n" +
      "====================================================\n" +
      "View in your Google Sheet:\n" +
      "https://docs.google.com/spreadsheets/d/" + SPREADSHEET_ID + "/edit";

    var recipients = [ADMIN_EMAIL];
    try {
      var ownerEmail = Session.getEffectiveUser().getEmail();
      if (ownerEmail && recipients.indexOf(ownerEmail) === -1) {
        recipients.push(ownerEmail);
      }
    } catch (e) {}

    MailApp.sendEmail({
      to: recipients.join(","),
      subject: subject,
      body: body,
      replyTo: data.email || undefined
    });
  } catch (err) {
    Logger.log("Owner email error: " + err.toString());
  }
}

/**
 * 2. INSTANT CONFIRMATION EMAIL SENT TO THE CUSTOMER
 */
function sendCustomerReceipt(data) {
  try {
    var subject = "We Received Your " + (data.formType || "Inquiry") + " — Jitto Cleaning Services [Ref #" + (data.referenceId || "N/A") + "]";
    
    var body = 
      "Dear " + (data.fullName || "Valued Client") + ",\n\n" +
      "Thank you for reaching out to Jitto Cleaning Services! We have successfully received your " + (data.formType || "inquiry") + ".\n\n" +
      "---------------- SUMMARY OF YOUR REQUEST ----------------\n" +
      "Reference ID:     " + (data.referenceId || "N/A") + "\n" +
      "Service Category: " + (data.serviceCategory ? data.serviceCategory.toUpperCase() : "CLEANING") + "\n" +
      "Location:         " + (data.city || "Barrie / Simcoe County") + (data.address ? " (" + data.address + ")" : "") + "\n" +
      (data.preferredDate ? "Target Date:      " + data.preferredDate + "\n" : "") +
      (data.preferredTime ? "Preferred Window: " + data.preferredTime + "\n" : "") +
      "\n" +
      "---------------- WHAT HAPPENS NEXT -----------------------\n" +
      "1. Founders Review: Our team reviews each property specification personally to ensure accurate scope.\n" +
      "2. Personalized Proposal: You will receive your customized scope and confirmation within 2 hours during operational hours.\n" +
      "3. 24/7 Operations: If you have an urgent inquiry or need immediate scheduling, call us directly at (249) 800-0127.\n\n" +
      "Warm regards,\n\n" +
      "Jane & The Jitto Cleaning Services Team\n" +
      "Barrie & Simcoe County, Ontario\n" +
      "Direct Line: (249) 800-0127 (24/7 Available)\n" +
      "Email: info@jittogroups.ca\n" +
      "Website: https://www.jittogroups.ca";

    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      body: body,
      replyTo: ADMIN_EMAIL
    });
  } catch (custErr) {
    Logger.log("Customer receipt error: " + custErr.toString());
  }
}
