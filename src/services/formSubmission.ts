/** Verified, same-origin form submission. Provider configuration stays on the server. */
export interface LeadAttachment { name: string; mimeType: string; base64: string }
export interface LeadSubmissionPayload {
  formType: 'Quotation Request' | 'Booking Reservation' | 'Contact Message';
  referenceId: string;
  serviceCategory?: string;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  companyName?: string;
  packageOrStage?: string;
  frequency?: string;
  preferredTime?: string;
  preferredDate?: string;
  scopeDetails?: Record<string, string | string[]>;
  notes?: string;
  photoCount?: number;
  attachments?: LeadAttachment[];
}
export interface SubmissionResponse {
  success: boolean;
  referenceId: string;
  stored: boolean;
  ownerNotificationSent: boolean;
  customerReceiptSent: boolean;
  message?: string;
}
export const MAX_PHOTO_BYTES = 500 * 1024;
export async function prepareAttachments(files: File[]): Promise<LeadAttachment[]> {
  if (files.length > 3 || files.reduce((total, f) => total + f.size, 0) > MAX_PHOTO_BYTES) {
    throw new Error('Please select up to 3 photos, no more than 500 KB combined.');
  }
  return Promise.all(files.map(file => new Promise<LeadAttachment>((resolve, reject) => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      reject(new Error('Please use JPG, PNG or WebP photos.')); return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('A photo could not be read. Please select it again.'));
    reader.onload = () => resolve({ name: file.name, mimeType: file.type, base64: String(reader.result).split(',')[1] });
    reader.readAsDataURL(file);
  })));
}
export async function submitLeadForm(payload: LeadSubmissionPayload): Promise<SubmissionResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 65000);
  try {
    const response = await fetch('/api/lead', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload), signal: controller.signal,
    });
    let data;
    try { data = await response.json(); }
    catch { throw new Error('We could not verify your request. Please retry or call us directly.'); }
    if (!response.ok || data.ok !== true || !data.sheetLogged || !data.emailDelivered || data.referenceId !== payload.referenceId) {
      throw new Error(data.message || 'Your request could not be confirmed. Please retry or call us directly.');
    }
    return { success: true, referenceId: data.referenceId, stored: data.sheetLogged,
      ownerNotificationSent: data.emailDelivered, customerReceiptSent: data.customerReceiptSent === true };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Confirmation is taking longer than expected. Your request may have been received. Retry to check it without sending a duplicate, or call us.');
    }
    throw error;
  } finally { clearTimeout(timeout); }
}
