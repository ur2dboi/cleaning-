import React from 'react';
import { PageRoute } from '../types';
import { COMPANY_INFO, COMMERCIAL_DETAILS } from '../data/content';
import { 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Briefcase, 
  ArrowRight, 
  Phone, 
  FileCheck2, 
  Lock,
  Stethoscope,
  Store,
  Building
} from 'lucide-react';

interface CommercialPageProps {
  onNavigate: (page: PageRoute) => void;
  onSelectQuoteService: (service: 'commercial') => void;
}

export const CommercialPage: React.FC<CommercialPageProps> = ({ 
  onNavigate,
  onSelectQuoteService 
}) => {
  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Hero Section */}
      <section className="relative bg-jitto-navy-950 text-white overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img 
            src="/images/commercial-hero.jpg" 
            alt="Jitto Commercial Cleaning Team in office" 
            className="w-full h-full object-cover filter blur-sm"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-jitto-navy-950 via-jitto-navy-900/90 to-jitto-navy-950/70" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-jitto-cyan/15 border border-jitto-cyan/30 text-jitto-cyan text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>For Offices, Clinics, Retail & Property Managers</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold font-serif tracking-tight text-white leading-tight">
                Flawless Corporate Presentation. Zero Supervision Needed.
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                Your workplace defines your brand reputation to clients and employees. Jitto delivers dependable, after-hours janitorial programs backed by <strong>full WSIB registration, $5M commercial liability</strong>, and direct owner accountability.
              </p>

              {/* Trust highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-semibold text-slate-200">
                <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <Clock className="w-4 h-4 text-jitto-cyan shrink-0" />
                  <span>24/7 & After-Hours Visits</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-jitto-cyan shrink-0" />
                  <span>Bonded, Insured & WSIB</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <FileCheck2 className="w-4 h-4 text-jitto-cyan shrink-0" />
                  <span>Customized SOW & Contracts</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => {
                    onSelectQuoteService('commercial');
                    onNavigate('quote');
                  }}
                  className="bg-jitto-cyan hover:bg-jitto-cyan-400 text-jitto-navy-950 font-bold px-6 py-3.5 rounded-xl shadow-glow-cyan transition-all flex items-center gap-2 text-sm"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Request Commercial Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all text-sm flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-jitto-cyan" />
                  <span>Call Operations: (249) 800-0127</span>
                </a>
              </div>
            </div>

            {/* Right Card / Branded Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
                <img 
                  src="/images/commercial-hero.jpg" 
                  alt="Jitto uniform cleaners detailing commercial office partition" 
                  className="w-full h-auto object-cover transform hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-jitto-navy-900/90 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-xs text-white">
                  <div className="flex items-center gap-2 font-bold text-jitto-cyan mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Consistent Crews in Official Uniform</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    "Security-cleared, background-checked teams with specialized equipment for commercial glass, carpets, and sanitation."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Commercial Pillars */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-jitto-cyan-700 bg-jitto-cyan-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Commercial Advantages
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif mt-3">
            Why Simcoe County Businesses Choose Jitto
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            We eliminate the hassle of managing cleaning in-house or dealing with unreliable sub-contractors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMMERCIAL_DETAILS.benefits.map((b, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-xl bg-jitto-navy-50 flex items-center justify-center text-jitto-navy mb-4 font-bold">
                0{idx + 1}
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2 font-serif">{b.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities & Spaces We Serve */}
      <section className="bg-white py-16 sm:py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-jitto-cyan-700 bg-jitto-cyan-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Tailored Sector Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 mt-3">
              Specialized Programs For Every Industry
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Each facility receives a customized Scope of Work (SOW) designed for your foot traffic and compliance standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 flex items-start gap-5">
              <div className="p-3.5 rounded-2xl bg-jitto-navy text-white shrink-0">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">Corporate Offices & Tech Hubs</h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  Desks, computer screens, conference boardrooms, executive suites, breakrooms, and glass partitions. Dust-free, streak-free, and always ready for morning clients.
                </p>
                <div className="text-xs font-semibold text-jitto-navy flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-jitto-cyan-600" />
                  <span>Keyboard & high-touch sanitization included</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 flex items-start gap-5">
              <div className="p-3.5 rounded-2xl bg-jitto-navy text-white shrink-0">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">Medical & Dental Clinics</h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  Hospital-grade disinfection for exam rooms, patient waiting lobbies, reception desks, and sanitary facilities. Cross-contamination prevention protocols.
                </p>
                <div className="text-xs font-semibold text-jitto-navy flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-jitto-cyan-600" />
                  <span>Color-coded microfiber & DIN-registered disinfectants</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 flex items-start gap-5">
              <div className="p-3.5 rounded-2xl bg-jitto-navy text-white shrink-0">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">Retail Stores & Showrooms</h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  Pristine entry glass, streak-free mirrors in fitting rooms, high-traffic floor buffing, and dust-free product display shelving.
                </p>
                <div className="text-xs font-semibold text-jitto-navy flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-jitto-cyan-600" />
                  <span>Early morning or late evening scheduling</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 flex items-start gap-5">
              <div className="p-3.5 rounded-2xl bg-jitto-navy text-white shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">Property Management & Common Areas</h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  Condominium and commercial building lobbies, elevators, stairwells, mailrooms, and tenant turnover detailing.
                </p>
                <div className="text-xs font-semibold text-jitto-navy flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-jitto-cyan-600" />
                  <span>Reliable scheduled contracts with monthly billing</span>
                </div>
              </div>
            </div>

          </div>

          {/* CTA Box */}
          <div className="mt-14 text-center">
            <button
              onClick={() => {
                onSelectQuoteService('commercial');
                onNavigate('quote');
              }}
              className="bg-jitto-navy hover:bg-jitto-navy-800 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all text-sm inline-flex items-center gap-2"
            >
              <span>Build A Customized Commercial Quote</span>
              <ArrowRight className="w-4 h-4 text-jitto-cyan" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
