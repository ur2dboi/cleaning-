/**
 * ============================================================================
 * JITTO CLEANING SERVICES - GOOGLE APPS SCRIPT WEBHOOK (V2 - FOOLPROOF)
 * ============================================================================
 * 
 * Target Google Sheet:
 * https://docs.google.com/spreadsheets/d/18cvXPcs1AYHieIiadsFmb5L9286omefB_oZHbOYUuQw/edit
 * ============================================================================
 */

// CONFIGURATION
var SPREADSHEET_ID = "18cvXPcs1AYHieIiadsFmb5L9286omefB_oZHbOYUuQw";
var ADMIN_EMAIL = "info@jittogroups.ca"; // Primary business inbox
var SEND_EMAIL_NOTIFICATIONS = true;
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
        .createTextOutput(JSON.stringify({ status: "error", message: "No post data received" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (jsonErr) {
      data = e.parameter || {};
    }

    // 1. Open the spreadsheet by ID or Active fallback
    var ss;
    try {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (openErr) {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    }

    if (!ss) {
      throw new Error("Unable to locate Google Sheet. Please ensure SPREADSHEET_ID is correct.");
    }

    // 2. Find or create the target sheet tab
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      // Check if default Sheet1 is empty, otherwise create new tab
      var firstSheet = ss.getSheets()[0];
      if (firstSheet && firstSheet.getLastRow() === 0) {
        sheet = firstSheet;
        sheet.setName(SHEET_NAME);
      } else {
        sheet = ss.insertSheet(SHEET_NAME);
      }
    }

    // 3. Ensure header row exists
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp",
        "Reference ID",
        "Form Type",
        "Service Category",
        "Customer Name",
        "Company",
        "Email",
        "Phone",
        "Address",
        "City",
        "Preferred Date",
        "Preferred Time",
        "Scope / Specifications",
        "Client Notes",
        "Photos Count",
        "Status"
      ];
      sheet.appendRow(headers);
      
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#012d6c");
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // 4. Format scope details
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

    // 5. Append row to spreadsheet
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

    // 6. Send email notification to owner and Google Account email
    if (SEND_EMAIL_NOTIFICATIONS) {
      sendEmailAlert(data, timestamp, scopeSummary);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: "success", 
        referenceId: data.referenceId,
        message: "Inquiry recorded successfully in Google Sheet" 
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("doPost Error: " + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: "error", 
        message: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

/**
 * Handle GET requests for simple health check
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "active",
      service: "Jitto Cleaning Services - Form Webhook",
      spreadsheetId: SPREADSHEET_ID,
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Format and send an email alert to the business owner
 */
function sendEmailAlert(data, timestamp, scopeSummary) {
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
      "View full records in your Google Sheet:\n" +
      "https://docs.google.com/spreadsheets/d/" + SPREADSHEET_ID + "/edit";

    // Send to both ADMIN_EMAIL and the effective user who deployed the script
    var recipients = [ADMIN_EMAIL];
    try {
      var effectiveEmail = Session.getEffectiveUser().getEmail();
      if (effectiveEmail && recipients.indexOf(effectiveEmail) === -1) {
        recipients.push(effectiveEmail);
      }
    } catch (sessErr) {}

    MailApp.sendEmail({
      to: recipients.join(","),
      subject: subject,
      body: body,
      replyTo: data.email || undefined
    });
  } catch (emailErr) {
    Logger.log("Email dispatch failed: " + emailErr.toString());
  }
}
