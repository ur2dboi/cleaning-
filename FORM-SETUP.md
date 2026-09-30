# Form fixes — required deployment steps

The local code is fixed; it has NOT been deployed to your Google or Vercel accounts. An editor/debug run uses your permissions and latest code; the public `/exec` endpoint uses its deployed version and deployment identity. Working in debug mode alone does not verify the live endpoint.

## 1. Configure and redeploy Apps Script
1. Open the intended spreadsheet, then Extensions → Apps Script.
2. Replace the old backend code with `google-apps-script.js`. Remove old duplicate `doPost`/`doGet` functions.
3. In Project Settings → Script Properties, add `LEAD_SECRET`: a long random secret (generate locally with `openssl rand -hex 32`). Do not post it in chat.
4. Optional properties: `OWNER_EMAIL` (default `kylemheler02@gmail.com`) and `SPREADSHEET_ID` (default the spreadsheet from the original project). Confirm these are the intended destinations.
5. Save, run `authorizeServices` as the deployment owner, and approve spreadsheet/email permissions. Check the logged daily recipient quota.
6. Deploy → Manage deployments → Edit active web app → New version. Set **Execute as: Me** and **Who has access: Anyone**. Deploy and copy the `/exec` URL, not `/dev`.
7. Opening that URL should return JSON with `version: verified-forms-v2`. The health check does not send mail or write rows.

## 2. Deploy the website and server endpoint together
In Vercel project Environment Variables set:
- `APPSCRIPT_URL`: the deployed `/exec` URL.
- `APPSCRIPT_SECRET`: exactly the same value as `LEAD_SECRET`.

These are SERVER variables, not `VITE_` variables. Remove the obsolete `VITE_APPSCRIPT_URL` and `VITE_WEB3FORMS_ACCESS_KEY`. Deploy the complete project, including `api/lead.js` and `vercel.json`. A static-only host cannot run this endpoint. Do not upload only the built HTML/assets.

Local development: set the two server variables in `.env`, run `npm ci`, then `npm run dev`. The Vite development middleware runs the endpoint. `vite preview` is static-only and is not suitable for live form testing.

## 3. Verify real submissions after deployment
Submit one real test for each form, using an email inbox you control:
- Booking: name, phone, email, selected package, address, city, date/time, access method, notes.
- Quote: test all four service categories; check area, cadence, add-ons/items, stage/date, company, address and notes.
- Contact: subject, name, email, phone, message.

Verify matching reference IDs and values in Google Sheets and BOTH inboxes. Check spam/junk. MailApp accepting a message does not guarantee inbox delivery. Photos are real owner-email attachments (up to 3 JPG/PNG/WebP files, 500 KB combined); Sheets stores names/count, not photo files.

## Behavior and troubleshooting
- Sheet columns are matched by exact header names; missing columns are appended without moving existing data. Default preference is `Website Inquiries`, otherwise gid=0. Existing custom headers are preserved; inspect for redundant differently named columns.
- Leads are saved before sending email. The website shows success only when saving and the owner email send are acknowledged. A failed customer receipt shows an honest warning.
- Retry unchanged data with the same reference to resend only missing notifications and avoid a duplicate row. Editing fields starts a new reference. In rare cases, a process interruption after mail is sent but before its status is saved can still cause a duplicate email.
- Inspect `Status`, `Owner Notification Sent`, `Customer Receipt Sent`, and `Last Error` columns plus Apps Script Executions for failures. A zero MailApp recipient quota requires waiting for quota reset or switching to a production email provider.
- Authorization/login HTML instead of JSON: check access setting and execute-as identity, then redeploy.
- No changes on the live site: redeploy BOTH the script version and website.
- Old Web3Forms dual dispatch was removed to avoid duplicate owner emails and misleading fallback success. Customers do not see provider names.
- Shared webhook secret and browser-origin checks are included. Before high-traffic/public launch, consider CAPTCHA and server-side rate limiting to reduce spam and protect email quota.

## Verification performed locally
Production build succeeds. Automated tests cover form validation, missing configuration, unsuccessful upstream responses, customer-receipt partial failure, script authentication, scope/field protections, and frontend provider wording. Live email delivery requires the deployment steps above and has not been verified here.
