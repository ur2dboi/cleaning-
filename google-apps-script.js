/**
 * ============================================================================
 * JITTO CLEANING SERVICES - GOOGLE APPS SCRIPT WEBHOOK
 * ============================================================================
 * 
 * This script automatically captures Quotation Requests, Booking Reservations,
 * and Contact Inquiries from the website into a Google Sheet and optionally sends
 * an instant email notification.
 * 
 * ----------------------------------------------------------------------------
 * 📋 SETUP INSTRUCTIONS (Takes ~2 minutes):
 * ----------------------------------------------------------------------------
 * 1. Open a new Google Sheet (go to https://sheets.new).
 * 2. Name your sheet "Jitto Cleaning Inquiries".
 * 3. In the top menu, click: Extensions > Apps Script.
 * 4. Delete any code in Code.gs, and paste this ENTIRE file into the editor.
 * 5. (Optional) Change ADMIN_EMAIL below to your preferred notification email.
 * 6. Click the blue "Deploy" button (top right) > "New deployment".
 * 7. Click the gear icon next to "Select type" and choose "Web app".
 * 8. Configure the deployment settings:
 *      - Description: "Jitto Cleaning Form Webhook"
 *      - Execute as: "Me (your-email@gmail.com)"
 *      - Who has access: "Anyone" (CRITICAL: Must be Anyone so the site can submit)
 * 9. Click "Deploy" and click "Authorize access" when prompted.
 * 10. Copy the "Web app URL" (looks like: https://script.google.com/macros/s/AKfycb.../exec).
 * 11. Paste this URL into your .env file or Vercel project environment variables as:
 *      VITE_APPSCRIPT_URL="https://script.google.com/macros/s/.../exec"
 * ============================================================================
 */

// Configuration
var ADMIN_EMAIL = "info@jittogroups.ca"; // Change to your preferred notification email
var SEND_EMAIL_NOTIFICATIONS = true; // Set to false if you only want rows saved to Sheets
var SHEET_NAME = "Website Inquiries";

/**
 * Handle incoming POST requests from the website forms
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var rawContents = e.postData.contents;
    var data = JSON.parse(rawContents);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    // If sheet does not exist, create it with formatted header row
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
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
      
      // Format header row
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#012d6c");
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // Format scope details
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

    // Append new row
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
    for (var i = 1; i <= rowData.length; i++) {
      sheet.autoResizeColumn(i);
    }

    // Send email notification to business owner
    if (SEND_EMAIL_NOTIFICATIONS && ADMIN_EMAIL) {
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
      "View full records in your Google Sheet: 'Jitto Cleaning Inquiries'";

    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: subject,
      body: body,
      replyTo: data.email || undefined
    });
  } catch (emailErr) {
    Logger.log("Email dispatch failed: " + emailErr.toString());
  }
}
