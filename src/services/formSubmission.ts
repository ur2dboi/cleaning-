/**
 * Jitto Cleaning Services - Form Dispatch Service
 * Dual-integration supporting:
 * 1. Web3Forms (Instant email forwarding to inbox)
 * 2. Google Apps Script (Automated rows in Google Sheets & CRM triggers)
 */

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
  scopeDetails?: Record<string, any>;
  notes?: string;
  photoCount?: number;
}

export interface SubmissionResponse {
  success: boolean;
  referenceId: string;
  web3Forms: {
    attempted: boolean;
    success: boolean;
    simulated: boolean;
    message?: string;
  };
  appScript: {
    attempted: boolean;
    success: boolean;
    simulated: boolean;
    message?: string;
  };
  timestamp: string;
}

// Environment keys (with fallback to window / import.meta.env)
export const getWeb3FormsKey = (): string => {
  return (
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WEB3FORMS_ACCESS_KEY) ||
    ''
  ).trim();
};

export const getAppScriptUrl = (): string => {
  return (
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_APPSCRIPT_URL) ||
    ''
  ).trim();
};

/**
 * Format flat key-values for Web3Forms email body
 */
const buildWeb3FormsBody = (payload: LeadSubmissionPayload, accessKey: string) => {
  const scopeSummary = payload.scopeDetails
    ? Object.entries(payload.scopeDetails)
        .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
        .join(' | ')
    : 'N/A';

  return {
    access_key: accessKey,
    subject: `[Jitto Cleaning] New ${payload.formType} - Ref #${payload.referenceId} (${payload.fullName})`,
    from_name: 'Jitto Cleaning Web Portal',
    replyto: payload.email,
    'Reference ID': payload.referenceId,
    'Form Type': payload.formType,
    'Service Category': payload.serviceCategory || 'General',
    'Customer Name': payload.fullName,
    'Company / Organization': payload.companyName || 'N/A',
    'Email Address': payload.email,
    'Phone Number': payload.phone,
    'Property Address': payload.address || 'N/A',
    'City': payload.city || 'Barrie / Simcoe County',
    'Service Frequency': payload.frequency || 'N/A',
    'Preferred Date': payload.preferredDate || 'N/A',
    'Preferred Time Window': payload.preferredTime || 'N/A',
    'Scope Details': scopeSummary,
    'Client Notes / Special Requests': payload.notes || 'None provided',
    'Photos Attached': payload.photoCount ? `${payload.photoCount} files uploaded` : 'None',
    'Submitted At': new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' }),
  };
};

/**
 * Dispatch to Web3Forms API
 */
export const submitToWeb3Forms = async (
  payload: LeadSubmissionPayload
): Promise<{ attempted: boolean; success: boolean; simulated: boolean; message?: string }> => {
  const accessKey = getWeb3FormsKey();

  if (!accessKey) {
    console.info(
      `[Web3Forms] VITE_WEB3FORMS_ACCESS_KEY is not configured. Simulating successful submission for Ref #${payload.referenceId}. To enable live email dispatch, add your key to .env or Vercel Environment Variables.`
    );
    return {
      attempted: false,
      success: true,
      simulated: true,
      message: 'Demo simulation mode (add VITE_WEB3FORMS_ACCESS_KEY for live email dispatch)',
    };
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(buildWeb3FormsBody(payload, accessKey)),
    });

    const data = await response.json();
    if (response.ok && data.success) {
      return {
        attempted: true,
        success: true,
        simulated: false,
        message: 'Dispatched to Web3Forms successfully',
      };
    } else {
      console.warn('[Web3Forms Error]', data);
      return {
        attempted: true,
        success: false,
        simulated: false,
        message: data.message || 'Web3Forms API rejected the request',
      };
    }
  } catch (err: any) {
    console.error('[Web3Forms Network Exception]', err);
    return {
      attempted: true,
      success: false,
      simulated: false,
      message: err.message || 'Network error submitting to Web3Forms',
    };
  }
};

/**
 * Dispatch to Google Apps Script Web App
 */
export const submitToAppScript = async (
  payload: LeadSubmissionPayload
): Promise<{ attempted: boolean; success: boolean; simulated: boolean; message?: string }> => {
  const scriptUrl = getAppScriptUrl();

  if (!scriptUrl) {
    console.info(
      `[Google Apps Script] VITE_APPSCRIPT_URL is not configured. Simulating successful submission for Ref #${payload.referenceId}. To connect Google Sheets, deploy google-apps-script.js and set the URL in .env.`
    );
    return {
      attempted: false,
      success: true,
      simulated: true,
      message: 'Demo simulation mode (add VITE_APPSCRIPT_URL to save to Google Sheets)',
    };
  }

  try {
    // Note: Google Apps Script Web Apps require no-cors mode in browser or standard form post
    await fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        submittedAt: new Date().toISOString(),
      }),
    });

    return {
      attempted: true,
      success: true,
      simulated: false,
      message: 'Dispatched to Google Apps Script',
    };
  } catch (err: any) {
    console.error('[Google Apps Script Exception]', err);
    return {
      attempted: true,
      success: false,
      simulated: false,
      message: err.message || 'Network error submitting to Google Apps Script',
    };
  }
};

/**
 * Unified dispatch handler: submits in parallel to both platforms
 */
export const submitLeadForm = async (
  payload: LeadSubmissionPayload
): Promise<SubmissionResponse> => {
  // Execute both dispatches simultaneously
  const [w3fResult, appScriptResult] = await Promise.all([
    submitToWeb3Forms(payload),
    submitToAppScript(payload),
  ]);

  return {
    success: w3fResult.success || appScriptResult.success,
    referenceId: payload.referenceId,
    web3Forms: w3fResult,
    appScript: appScriptResult,
    timestamp: new Date().toISOString(),
  };
};
