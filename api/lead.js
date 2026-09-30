/** Vercel serverless endpoint. Never exposes the webhook URL or shared secret. */
export const config = { maxDuration: 60 };
const FORM_TYPES = ['Quotation Request', 'Booking Reservation', 'Contact Message', 'Gift Card Order'];
export function validateLead(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return 'Invalid request.';
  if (!FORM_TYPES.includes(data.formType)) return 'Please select a valid form.';
  if (typeof data.referenceId !== 'string' || !/^[A-Za-z0-9-]{8,80}$/.test(data.referenceId)) return 'Invalid request reference.';
  for (const key of ['fullName', 'email', 'phone']) {
    if (typeof data[key] !== 'string' || !data[key].trim()) return 'Please provide your name, email and phone number.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()) || /[\r\n]/.test(data.email)) return 'Please enter a valid email address.';
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string' && value.length > (key === 'notes' ? 5000 : 500)) return 'One of your fields is too long.';
  }
  if (data.scopeDetails !== undefined && (typeof data.scopeDetails !== 'object' || data.scopeDetails === null || Array.isArray(data.scopeDetails))) return 'Invalid service details.';
  if (data.scopeDetails && JSON.stringify(data.scopeDetails).length > 10000) return 'Service details are too long.';
  const files = data.attachments || [];
  if (!Array.isArray(files) || files.length > 3) return 'Please select up to 3 photos.';
  let bytes = 0;
  for (const f of files) {
    if (!f || typeof f.name !== 'string' || f.name.length > 200 || !['image/jpeg', 'image/png', 'image/webp'].includes(f.mimeType) || typeof f.base64 !== 'string' || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(f.base64) || !f.base64) return 'Please use valid JPG, PNG or WebP photos.';
    bytes += Buffer.from(f.base64, 'base64').length;
  }
  if (bytes > 500 * 1024) return 'Photos must be no more than 500 KB combined.';
  return null;
}
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false, message: 'Method not allowed.' }); }
  // Browser requests must originate from this website. This is not a replacement for a CAPTCHA.
  if (req.headers.origin) {
    let host;
    try { host = new URL(req.headers.origin).host; } catch { return res.status(403).json({ ok: false, message: 'Invalid origin.' }); }
    if (host !== req.headers.host) return res.status(403).json({ ok: false, message: 'Invalid origin.' });
  }
  let data;
  try { data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
  catch { return res.status(400).json({ ok: false, message: 'Invalid request.' }); }
  const error = validateLead(data);
  if (error) return res.status(422).json({ ok: false, message: error });
  const url = process.env.APPSCRIPT_URL;
  const secret = process.env.APPSCRIPT_SECRET;
  if (!url || !/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(url) || !secret) {
    return res.status(503).json({ ok: false, message: 'Online requests are temporarily unavailable. Please call us directly.' });
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 55000);
  try {
    const upstream = await fetch(url, { method: 'POST', redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...data, email: data.email.trim(), fullName: data.fullName.trim(),
        phone: data.phone.trim(), secret, photoCount: (data.attachments || []).length }), signal: controller.signal });
    let result;
    try { result = await upstream.json(); } catch { throw new Error('Invalid webhook response'); }
    if (!upstream.ok || !result || typeof result.ok !== 'boolean' || (result.ok && result.referenceId !== data.referenceId)) throw new Error('Invalid webhook response');
    if (!result.ok || result.sheetLogged !== true || result.emailDelivered !== true) {
      console.error('Lead processing incomplete', { referenceId: data.referenceId, code: result.code });
      return res.status(result.code === 'REFERENCE_CONFLICT' ? 409 : result.code === 'VALIDATION' ? 422 : 502).json({ ok: false, referenceId: data.referenceId,
        message: result.code === 'REFERENCE_CONFLICT' ? 'This request has changed. Please edit a field and submit again as a new request.' : result.sheetLogged ? 'Your request was saved, but we could not notify our team yet. Please retry or call us with your reference number.' : 'We could not confirm your request. Please retry or call us directly.' });
    }
    return res.status(200).json({ ok: true, referenceId: result.referenceId, sheetLogged: true,
      emailDelivered: true, customerReceiptSent: result.customerReceiptSent === true });
  } catch (err) {
    console.error('Lead confirmation unavailable', { referenceId: data.referenceId, error: err.name });
    return res.status(err.name === 'AbortError' ? 504 : 502).json({ ok: false, referenceId: data.referenceId,
      message: 'We could not verify confirmation. Your request may have been received. Please retry to check it, or call us.' });
  } finally { clearTimeout(timer); }
}
