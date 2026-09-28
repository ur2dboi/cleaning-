import React, { useState } from 'react';
import type { PageRoute } from '../types';
import { COMPANY_INFO, FAQS } from '../data/content';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSubject, setFormSubject] = useState('Residential Cleaning Inquiry');
  const [formMessage, setFormMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormMessage('');
    }, 5000);
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimalist Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
            Direct Communication
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight mt-2">
            Contact Jitto Cleaning Services
          </h1>
          <p className="mt-3 text-slate-500 text-sm sm:text-base leading-relaxed">
            Have a question, need an urgent clean, or want to discuss a commercial RFP? Speak directly to our leadership team.
          </p>
        </div>

        {/* Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          
          {/* Details */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Company Information
              </h3>

              <div className="space-y-4 text-xs">
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-jitto-navy shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Direct Owner Line</div>
                    <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="font-semibold text-slate-900 hover:text-jitto-navy text-sm">
                      {COMPANY_INFO.phone}
                    </a>
                    <div className="text-slate-500 mt-0.5">Reach founders directly (24/7 available)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-jitto-navy shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Official Email</div>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="font-semibold text-slate-900 hover:text-jitto-navy text-sm">
                      {COMPANY_INFO.email}
                    </a>
                    <div className="text-slate-500 mt-0.5">Fast responses within 2 hours</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-jitto-navy shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Operating Hours</div>
                    <div className="font-semibold text-slate-900 text-sm">24/7 Open & Available</div>
                    <div className="text-slate-500 mt-0.5">Emergency, flexible, and after-hours commercial visits</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-jitto-navy shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Service Hub</div>
                    <div className="font-semibold text-slate-900 text-sm">Barrie, Ontario & Simcoe County</div>
                    <div className="text-slate-500 mt-0.5">Innisfil, Orillia, Bradford, Collingwood, Wasaga Beach, Alliston</div>
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="text-[11px] font-medium text-slate-500 mb-2">Municipalities Served:</div>
                <div className="flex flex-wrap gap-1.5">
                  {COMPANY_INFO.serviceAreas.map(a => (
                    <span key={a} className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-600 text-[11px]">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 text-xs text-slate-600 space-y-1">
              <div className="font-semibold text-slate-900">Direct Founder Guarantee</div>
              <p>
                When you call (249) 800-0127, you speak directly to company leadership with 16+ years of private housekeeping experience.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
            <h3 className="font-serif font-bold text-xl text-slate-900 mb-1">
              Send A Direct Message
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Complete the inquiry form and an operations manager will follow up promptly.
            </p>

            {submitted ? (
              <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 text-center animate-in fade-in duration-300">
                <CheckCircle2 className="w-8 h-8 text-jitto-navy mx-auto mb-2" />
                <h4 className="font-serif font-bold text-lg text-slate-900 mb-1">Message Delivered</h4>
                <p className="text-xs text-slate-500">
                  Thank you for reaching out. We will review your message and reply within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-jitto-navy"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="(249) 000-0000"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-jitto-navy"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-jitto-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Subject</label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white text-slate-700 focus:outline-none focus:border-jitto-navy"
                  >
                    <option value="Residential Cleaning Inquiry">Residential Cleaning (Home / Condo / Deep Clean)</option>
                    <option value="Commercial RFP / Janitorial Contract">Commercial RFP / Janitorial Contract</option>
                    <option value="Post-Construction Clean / Builder Partnership">Post-Construction / Handover Inspection</option>
                    <option value="HVAC or Junk Removal Upcoming Service">HVAC / Junk Removal Upcoming Service</option>
                    <option value="General Question or Feedback">General Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Tell us about your space, approximate square footage, timeline, or requirements..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-jitto-navy"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-jitto-navy hover:bg-jitto-navy-800 text-white font-medium py-3 px-6 rounded-xl transition-all text-xs flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Direct Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Minimalist FAQ Accordion */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
          <div className="max-w-xl mb-8">
            <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
              Transparency
            </span>
            <h3 className="font-serif font-bold text-2xl text-slate-900 mt-1">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="max-w-3xl space-y-2">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-xl border border-slate-100 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-serif font-bold text-slate-900 hover:bg-slate-50 transition-colors text-sm"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-50 pt-2 bg-slate-50/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
