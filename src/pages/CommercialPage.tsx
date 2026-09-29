import React from 'react';
import type { PageRoute } from '../types';
import { COMPANY_INFO, COMMERCIAL_DETAILS } from '../data/content';
import { 
  Building2, 
  Check, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  FileCheck2 
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
    <div className="bg-[#fafbfc] min-h-screen">
      
      {/* Minimalist Hero */}
      <section className="bg-white border-b border-slate-200/80 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
                02 / Commercial & Janitorial
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Immaculate Corporate Hygiene. Zero Supervision Needed.
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                Your workplace defines your brand to clients and team members. Jitto delivers dependable, after-hours janitorial programs backed by <strong>comprehensive commercial liability insurance</strong>, vetted specialists, and direct founder accountability.
              </p>

              <div className="flex flex-wrap gap-3 pt-2 text-xs text-slate-700">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <Clock className="w-4 h-4 text-jitto-navy" />
                  24/7 After-Hours Scheduling
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-jitto-navy" />
                  Fully Insured & Protected
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <FileCheck2 className="w-4 h-4 text-jitto-navy" />
                  Customized SOW Agreement
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
                <button
                  onClick={() => {
                    onSelectQuoteService('commercial');
                    onNavigate('quote');
                  }}
                  className="w-full sm:w-auto min-h-[44px] justify-center bg-jitto-navy hover:bg-jitto-navy-800 text-white font-medium px-6 py-3 rounded-xl transition-all text-xs sm:text-sm flex items-center gap-2"
                >
                  <span>Request Commercial Proposal</span>
                  <ArrowRight className="w-4 h-4 text-jitto-cyan" />
                </button>

                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="w-full sm:w-auto min-h-[44px] justify-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium px-5 py-3 rounded-xl transition-colors text-xs sm:text-sm flex items-center"
                >
                  Call: (249) 800-0127 (24/7)
                </a>
              </div>
            </div>

            {/* Unique Hero Photo: facility-executive-lobby.jpg */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm">
                <img 
                  src="/images/facility-executive-lobby.jpg" 
                  alt="Immaculate corporate reception lobby with polished terrazzo and modern architecture" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Commercial Pillars */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
            Corporate Advantages
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">
            Why Simcoe County Businesses Partner With Jitto
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Reliable contracts, transparent room-by-room signoffs, and direct owner access.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMMERCIAL_DETAILS.benefits.map((b, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm"
            >
              <div className="font-mono text-xs font-bold text-slate-400 mb-2">0{idx + 1}</div>
              <h3 className="font-serif font-bold text-base text-slate-900 mb-2">{b.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Unique Images: Boardroom, Workstations, Clinic */}
      <section className="bg-white py-16 sm:py-24 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          {/* Unique Image 1: commercial-boardroom.jpg */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden border border-slate-200/80">
              <img 
                src="/images/commercial-boardroom.jpg" 
                alt="Executive corporate boardroom" 
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="space-y-4">
              <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
                Executive Cleanliness
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Conference Rooms & Glass Partitions
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Streak-free glass walls, sanitized conference tables, detailed upholstery vacuuming, and organized cables. Your leadership spaces always project flawless professionalism.
              </p>
            </div>
          </div>

          {/* Unique Image 2: commercial-office.jpg */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 order-2 lg:order-1">
              <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
                Workplace Well-Being
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Workstations & High-Touch Disinfection
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Daily disinfection of keyboards, door handles, light switches, breakroom appliances, and executive desks to minimize team absenteeism and maintain hygiene standards.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-200/80 order-1 lg:order-2">
              <img 
                src="/images/commercial-office.jpg" 
                alt="Modern workstation office" 
                className="w-full h-80 object-cover"
              />
            </div>
          </div>

          {/* Unique Image 3: commercial-clinic-dental.jpg */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden border border-slate-200/80">
              <img 
                src="/images/commercial-clinic-dental.jpg" 
                alt="Hygienic dental and wellness clinic treatment room" 
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="space-y-4">
              <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
                Healthcare Standards
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Medical & Dental Clinic Sanitization
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Hospital-grade DIN-registered disinfectants, strict cross-contamination protocols, and meticulous care for operatory counters, waiting areas, and patient restrooms.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
