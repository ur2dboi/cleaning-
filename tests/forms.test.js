import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import handler, { validateLead } from '../api/lead.js';
const lead = { formType: 'Contact Message', referenceId: 'JITTO-MSG-test123', fullName: 'Jane', email: 'jane@example.com', phone: '0123456789' };
const res = () => ({ headers: {}, setHeader(k,v) { this.headers[k]=v; }, status(v) { this.code=v; return this; }, json(v) { this.data=v; return this; } });
test('all forms validated', () => { for (const formType of ['Contact Message','Booking Reservation','Quotation Request','Gift Card Order']) assert.equal(validateLead({...lead,formType}),null); });
test('missing email and oversized photos rejected', () => { assert.ok(validateLead({...lead,email:''})); assert.ok(validateLead({...lead,attachments:[{name:'a.png',mimeType:'image/png',base64:Buffer.alloc(512001).toString('base64')}]})); });
test('no configuration cannot simulate success', async () => { delete process.env.APPSCRIPT_URL; delete process.env.APPSCRIPT_SECRET; const r=res(); await handler({method:'POST',headers:{},body:lead},r); assert.equal(r.code,503); assert.equal(r.data.ok,false); });
test('unverified and partial owner failures are not accepted', async () => {
 process.env.APPSCRIPT_URL='https://script.google.com/macros/s/test/exec'; process.env.APPSCRIPT_SECRET='test';
 const original=global.fetch;
 try { for (const result of [{ok:true,referenceId:lead.referenceId,sheetLogged:false,emailDelivered:false},{ok:true,referenceId:'wrong',sheetLogged:true,emailDelivered:true}]) {
 global.fetch=async()=>({ok:true,json:async()=>result}); const r=res(); await handler({method:'POST',headers:{},body:lead},r); assert.equal(r.code,502);
 }} finally { global.fetch=original; }
});
test('customer receipt failure returned honestly after owner notification', async()=>{
 const original=global.fetch;
 try { global.fetch=async()=>({ok:true,json:async()=>({ok:true,referenceId:lead.referenceId,sheetLogged:true,emailDelivered:true,customerReceiptSent:false})}); const r=res();await handler({method:'POST',headers:{},body:lead},r);assert.equal(r.code,200);assert.equal(r.data.customerReceiptSent,false); } finally {global.fetch=original;}
});
test('backend rejects missing secret and invalid data; sheet formula protection and scope mapping',()=>{
 const c={PropertiesService:{getScriptProperties:()=>({getProperty:()=>null})},ContentService:{MimeType:{JSON:'json'},createTextOutput:text=>({setMimeType:()=>JSON.parse(text)})}};
 vm.createContext(c);vm.runInContext(fs.readFileSync('google-apps-script.js','utf8'),c);
 assert.equal(c.doPost({postData:{contents:JSON.stringify(lead)}}).code,'UNAUTHORIZED');
 assert.equal(c.handleSubmission_({...lead,email:''}).code,'VALIDATION');
 assert.equal(c.cell_('=IMPORTXML("bad")'), '\'=IMPORTXML("bad")');
 assert.match(c.scope_({packageOrStage:'Deep Clean',frequency:'Weekly',scopeDetails:{Rooms:['Kitchen','Bath']}}),/Deep Clean.*Weekly.*Kitchen, Bath/);
 const src=fs.readFileSync('google-apps-script.js','utf8');
 assert.match(src,/action === 'notifyRecipient'/);
 assert.match(src,/Recipient Notification Sent/);
 assert.match(src,/hmac_\(cfg\.secret, 'notifyRecipient:/);
});
test('frontend has no direct provider calls or visible provider names',()=>{
 const service=fs.readFileSync('src/services/formSubmission.ts','utf8');assert.ok(!service.includes('no-cors'));assert.ok(service.includes("fetch('/api/lead'"));
 for(const n of ['Booking','Contact','Quotation','GiftCard']){const s=fs.readFileSync(`src/pages/${n}Page.tsx`,'utf8');assert.ok(!/web3forms|apps.?script/i.test(s)); assert.ok(s.includes('role="alert"'));assert.ok(s.includes('customerReceiptSent'));}
});
