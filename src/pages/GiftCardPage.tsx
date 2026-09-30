import React, { useState } from 'react';
import type { PageRoute } from '../types';
import { COMPANY_INFO } from '../data/content';
import { submitLeadForm, type SubmissionResponse } from '../services/formSubmission';
import confetti from 'canvas-confetti';
import {
  Gift,
  Check,
  Loader2,
  ArrowRight,
  ArrowLeft,
  MailCheck,
  CreditCard,
  Info
} from 'lucide-react';

interface GiftCardPageProps {
  onNavigate: (page: PageRoute) => void;
}

// TODO: PLACEHOLDER — replace these three URLs with the real QuickBooks
// payment links ($100 / $200 / $300) as soon as they are provided.
const PAYMENT_LINKS: Record<string, string> = {
  '100': 'https://example.com/quickbooks-gift-card-100',
  '200': 'https://example.com/quickbooks-gift-card-200',
  '300': 'https://example.com/quickbooks-gift-card-300'
};

const CLEANING_TYPES = [
  { value: 'Home', serviceCategory: 'residential' as const, sub: 'House, condo & apartment' },
  { value: 'Business', serviceCategory: 'commercial' as const, sub: 'Office & commercial space' },
  { value: 'Post-construction', serviceCategory: 'post-construction' as const, sub: 'New builds & renos' }
];

const AMOUNTS = ['100', '200', '300'];

const inputClass = 'w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-jitto-navy';

export const GiftCardPage: React.FC<GiftCardPageProps> = ({ onNavigate }) => {
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [recipientCity, setRecipientCity] = useState('Barrie');
  const [cleaningType, setCleaningType] = useState('Home');
  const [amount, setAmount] = useState('100');
  const [personalMessage, setPersonalMessage] = useState('');
  const [sendDate, setSendDate] = useState('');

  const [referenceId, setReferenceId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResponse | null>(null);

  const selectedType = CLEANING_TYPES.find(t => t.value === cleaningType) || CLEANING_TYPES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setSubmissionError('');
    setIsSubmitting(true);

    const refNum = referenceId || `JITTO-GC-${crypto.randomUUID()}`;
    setReferenceId(refNum);

    try {
      const result = await submitLeadForm({
        formType: 'Gift Card Order',
        referenceId: refNum,
        serviceCategory: selectedType.serviceCategory,
        fullName: buyerName.trim(),
        email: buyerEmail.trim(),
        phone: buyerPhone.trim(),
        city: recipientCity,
        preferredDate: sendDate || undefined,
        scopeDetails: {
          'Recipient Name': recipientName.trim(),
          'Recipient Email': recipientEmail.trim(),
          'Recipient Phone': recipientPhone.trim(),
          'Recipient City / Town': recipientCity,
          'Type of Cleaning': cleaningType,
          'Gift Amount': `$${amount}`
        },
        notes: personalMessage.trim() || undefined
      });

      setSubmissionResult(result);
      setIsSubmitted(true);
      window.scrollTo({ top: 80, behavior: 'smooth' });

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#012d6c', '#00c2cb', '#94a3b8']
      });
    } catch (err) {
      setSubmissionError(err instanceof Error ? err.message : 'Your request could not be confirmed. Please try again or call us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayment = () => {
    const link = PAYMENT_LINKS[amount];
    if (link) window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="max-w-2xl mb-10">
          <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
            Gift Cards
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight mt-2">
            Give the Gift of a Clean Home
          </h1>
          <p className="mt-3 text-slate-500 text-sm sm:text-base leading-relaxed">
            Jitto gift cards make a thoughtful gift for birthdays, holidays, new homeowners, and busy families.
          </p>
        </div>

        {/* SUCCESS STATE */}
        {isSubmitted ? (
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200/80 shadow-sm text-left">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-jitto-navy">Gift Card Request Received</span>
                <h2 className="text-2xl font-serif font-bold text-slate-900 mt-1">Thank you, {buyerName || 'Valued Client'}.</h2>
              </div>
              <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {submissionResult?.referenceId || referenceId}
              </span>
            </div>

            <div className="py-6 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                We have received your gift card request for <strong className="text-slate-900">${amount}</strong> toward{' '}
                <strong className="capitalize text-slate-900">{cleaningType.toLowerCase()}</strong> cleaning for{' '}
                <strong className="text-slate-900">{recipientName}</strong> in <strong className="text-slate-900">{recipientCity}</strong>.
              </p>
              <p>
                Jitto will contact the recipient to introduce the gift and schedule their walkthrough. Gift cards apply
                toward any Jitto cleaning service and do not expire.
              </p>
              <p>
                <strong>Next step:</strong> complete your payment — once it's confirmed, we'll email the recipient
                your gift announcement and personal message.
              </p>
              <p role="status" className="text-xs text-slate-600">
                {submissionResult?.customerReceiptSent
                  ? 'A confirmation email has been sent. Please check your inbox and spam folder.'
                  : 'Your request was received, but the confirmation email could not be sent. Please keep your reference number and contact us if needed.'}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium text-[11px]">
                  <MailCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Gift Card Request Received</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 font-medium text-[11px]">
                  <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                  <span>Awaiting Payment</span>
                </span>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 mb-6 space-y-2 text-xs text-slate-700">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Gift Card Summary</div>
              <div className="flex justify-between"><span className="text-slate-500">Amount:</span><span className="font-semibold text-slate-900">${amount}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Recipient:</span><span className="font-semibold text-slate-900">{recipientName} — {recipientCity}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Cleaning Type:</span><span className="font-semibold text-slate-900">{cleaningType}</span></div>
              {sendDate && (
                <div className="flex justify-between"><span className="text-slate-500">Send Date:</span><span className="font-semibold text-slate-900">{sendDate}</span></div>
              )}
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handlePayment}
                className="w-full bg-jitto-cyan hover:bg-jitto-cyan-400 text-jitto-navy-950 font-bold py-3.5 px-6 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shadow-glow-cyan"
              >
                <span>Continue to Payment (${amount})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="w-full border border-slate-200 hover:border-slate-300 text-slate-600 font-semibold py-3 px-6 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>
            </div>
          </div>
        ) : (
          /* GIFT CARD FORM */
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
            <form onChange={() => setReferenceId('')} onSubmit={handleSubmit} className="space-y-8">
              {submissionError && (
                <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                  {submissionError}
                </p>
              )}

              {/* 01 / BUYER */}
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                  01 / Buyer Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={e => setBuyerName(e.target.value)}
                      placeholder="Your full name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={buyerEmail}
                      onChange={e => setBuyerEmail(e.target.value)}
                      placeholder="you@example.ca"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={buyerPhone}
                      onChange={e => setBuyerPhone(e.target.value)}
                      placeholder="(249) 000-0000"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* 02 / RECIPIENT */}
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                  02 / Recipient Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      value={recipientName}
                      onChange={e => setRecipientName(e.target.value)}
                      placeholder="Recipient's full name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={recipientEmail}
                      onChange={e => setRecipientEmail(e.target.value)}
                      placeholder="recipient@example.ca"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={recipientPhone}
                      onChange={e => setRecipientPhone(e.target.value)}
                      placeholder="(249) 000-0000"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">City/Town *</label>
                    <select
                      required
                      value={recipientCity}
                      onChange={e => setRecipientCity(e.target.value)}
                      className={`${inputClass} bg-white text-slate-700`}
                    >
                      {COMPANY_INFO.serviceAreas.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-medium text-slate-600 mb-2">Type of Cleaning *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {CLEANING_TYPES.map(type => {
                      const active = cleaningType === type.value;
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setCleaningType(type.value)}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            active
                              ? 'border-jitto-navy bg-slate-50 ring-1 ring-jitto-navy'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <Gift className={`w-4 h-4 ${active ? 'text-jitto-navy' : 'text-slate-400'}`} />
                            {active && <Check className="w-3.5 h-3.5 text-jitto-navy stroke-[3]" />}
                          </div>
                          <div className="font-semibold text-slate-900 text-sm">{type.value}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{type.sub}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* 03 / GIFT */}
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                  03 / Gift Details
                </label>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-2">Amount *</label>
                  <div className="grid grid-cols-3 gap-3">
                    {AMOUNTS.map(value => {
                      const active = amount === value;
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setAmount(value)}
                          className={`py-4 rounded-xl border text-center transition-all ${
                            active
                              ? 'border-jitto-navy bg-jitto-navy text-white ring-1 ring-jitto-navy'
                              : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                          }`}
                        >
                          <div className="text-lg font-serif font-bold">${value}</div>
                          <div className={`text-[11px] ${active ? 'text-jitto-cyan' : 'text-slate-400'}`}>Gift Card Value</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Personal Message (optional)</label>
                    <textarea
                      rows={3}
                      value={personalMessage}
                      onChange={e => setPersonalMessage(e.target.value)}
                      maxLength={2000}
                      placeholder="Add a note for the recipient..."
                      className={`${inputClass} min-h-[88px]`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Send Date (optional)</label>
                    <input
                      type="date"
                      value={sendDate}
                      onChange={e => setSendDate(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* NOTE */}
              <div className="flex gap-3 rounded-xl border border-jitto-cyan/30 bg-jitto-cyan/5 p-4">
                <Info className="w-4 h-4 text-jitto-cyan shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 leading-relaxed">
                  Jitto will contact the recipient to introduce the gift and schedule their walkthrough. Gift cards apply
                  toward any Jitto cleaning service and do not expire.
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-jitto-navy hover:bg-jitto-navy-800 text-white font-semibold py-3.5 px-6 rounded-xl transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-jitto-cyan" />
                      <span>Sending Gift Card Request...</span>
                    </span>
                  ) : (
                    <>
                      <span>Submit Gift Card Request</span>
                      <ArrowRight className="w-4 h-4 text-jitto-cyan" />
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2">
                  Your request is sent to {COMPANY_INFO.email}. Payment is completed in the next step.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
