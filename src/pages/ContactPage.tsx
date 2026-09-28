import React, { useState } from 'react';
import { PageRoute } from '../types';
import { COMPANY_INFO, FAQS } from '../data/content';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  HelpCircle,
  MessageSquare
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
    <div className="bg-slate-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-jitto-cyan-50 border border-jitto-cyan-200 text-jitto-navy text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-jitto-cyan-600" />
            Direct Founder Access
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-serif">
            Contact Jitto Cleaning Services
          </h1>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Have a question, need an urgent clean, or want to discuss a commercial RFP? Speak directly to our leadership team.
          </p>
        </div>

        {/* 24/7 Hotline Banner */}
        <div className="bg-gradient-to-r from-jitto-navy-900 via-jitto-navy-800 to-jitto-navy-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-jitto-navy-700 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-jitto-cyan/20 border border-jitto-cyan/40 flex items-center justify-center text-jitto-cyan shrink-0">
              <Clock className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                24/7 Active Operations
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif">
                Need An Urgent or Last-Minute Clean?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm">
                Closing date tomorrow? Tenant emergency move-out? Call our direct 24/7 hotline anytime.
              </p>
            </div>
          </div>

          <a
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="bg-jitto-cyan hover:bg-jitto-cyan-400 text-jitto-navy-950 font-bold px-6 py-3.5 rounded-2xl shadow-glow-cyan transition-all flex items-center gap-2 text-sm shrink-0"
          >
            <Phone className="w-4 h-4" />
            <span>(249) 800-0127</span>
          </a>
        </div>

        {/* Main Content: Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          
          {/* LEFT COLUMN: Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold font-serif text-slate-900">
                Company Information
              </h3>

              <div className="space-y-4 text-sm">
                
                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-jitto-cyan-50 text-jitto-cyan-700 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase">Direct Phone Line</div>
                    <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="font-bold text-slate-900 hover:text-jitto-cyan transition-colors text-base">
                      {COMPANY_INFO.phone}
                    </a>
                    <div className="text-xs text-slate-500">Reach the owners directly (No call center)</div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-jitto-cyan-50 text-jitto-cyan-700 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase">Official Email</div>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="font-bold text-slate-900 hover:text-jitto-cyan transition-colors text-base">
                      {COMPANY_INFO.email}
                    </a>
                    <div className="text-xs text-slate-500">Fast replies within 2 hours</div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-jitto-cyan-50 text-jitto-cyan-700 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase">Operating Hours</div>
                    <div className="font-bold text-slate-900 text-sm">24/7 Open & Available</div>
                    <div className="text-xs text-slate-500">After-hours commercial, weekend & emergency scheduling</div>
                  </div>
                </div>

                {/* Region */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-jitto-cyan-50 text-jitto-cyan-700 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase">Service Hub</div>
                    <div className="font-bold text-slate-900 text-sm">Barrie, Ontario & Simcoe County</div>
                    <div className="text-xs text-slate-500">Innisfil, Orillia, Bradford, Collingwood, Wasaga Beach, Alliston</div>
                  </div>
                </div>

              </div>

              {/* Service Areas Pill Box */}
              <div className="pt-4 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-700 uppercase mb-2">Municipalities Served:</div>
                <div className="flex flex-wrap gap-1.5">
                  {COMPANY_INFO.serviceAreas.map(a => (
                    <span key={a} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                      {a}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Trust Signal Card */}
            <div className="bg-jitto-navy-50 rounded-3xl p-6 border border-jitto-navy-100 text-xs text-slate-700 space-y-2">
              <div className="font-bold text-jitto-navy text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-jitto-cyan-700" />
                <span>Our Direct Owner Guarantee</span>
              </div>
              <p className="leading-relaxed">
                When you reach out to Jitto, you are speaking directly to leadership with 16+ years of hands-on cleaning experience. No scripts, no delays.
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold font-serif text-slate-900 mb-2">
              Send Us A Direct Message
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mb-6">
              Fill out the form below and we will get back to you promptly.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-in fade-in duration-300">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="text-xl font-bold text-slate-900 font-serif mb-1">Message Delivered!</h4>
                <p className="text-xs text-slate-600">
                  Thank you for contacting Jitto Cleaning Services. An operations manager will reply to your inquiry shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-jitto-cyan"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="(249) 000-0000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-jitto-cyan"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-jitto-cyan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-jitto-cyan"
                  >
                    <option value="Residential Cleaning Inquiry">Residential Cleaning (Home / Condo / Deep Clean)</option>
                    <option value="Commercial RFP / Janitorial Contract">Commercial RFP / Janitorial Office Contract</option>
                    <option value="Post-Construction Clean / Builder Partnership">Post-Construction / Contractor Handover</option>
                    <option value="HVAC or Junk Removal Upcoming Service">HVAC / Junk Removal Early Inquiry</option>
                    <option value="General Question or Feedback">General Question or Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Tell us about your property, approximate size, timeline, or any specific requirements..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-jitto-cyan"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-jitto-navy hover:bg-jitto-navy-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-jitto-cyan" />
                  <span>Send Direct Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-jitto-cyan-700 bg-jitto-cyan-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Answers & Transparency
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 mt-2">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-slate-900 hover:bg-slate-50 transition-colors text-sm sm:text-base font-serif"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-jitto-cyan shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 ml-2" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
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
