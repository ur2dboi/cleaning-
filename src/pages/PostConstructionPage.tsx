import React from 'react';
import type { PageRoute } from '../types';
import { COMPANY_INFO, POST_CONSTRUCTION_DETAILS } from '../data/content';
import { 
  HardHat, 
  Check, 
  ArrowRight, 
  Camera, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';

interface PostConstructionPageProps {
  onNavigate: (page: PageRoute) => void;
  onSelectQuoteService: (service: 'post-construction') => void;
}

export const PostConstructionPage: React.FC<PostConstructionPageProps> = ({ 
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
                03 / Builders, Contractors & Renovators
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Turn Trade Chaos Into A Turnkey Handover.
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                Fine drywall dust, sticker adhesives, paint overspray, and trade debris ruin walkthroughs. Jitto provides multi-phase post-construction detailing so your project passes <strong>building inspections and client walkthroughs</strong> without delay.
              </p>

              <div className="flex flex-wrap gap-3 pt-2 text-xs text-slate-700">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <Camera className="w-4 h-4 text-jitto-navy" />
                  Before & After Photo Verification
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <Clock className="w-4 h-4 text-jitto-navy" />
                  Rapid Turnaround Deadlines
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-jitto-navy" />
                  Fully Insured Handover
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
                <button
                  onClick={() => {
                    onSelectQuoteService('post-construction');
                    onNavigate('quote');
                  }}
                  className="w-full sm:w-auto min-h-[44px] justify-center bg-jitto-navy hover:bg-jitto-navy-800 text-white font-medium px-6 py-3 rounded-xl transition-all text-xs sm:text-sm flex items-center gap-2"
                >
                  <span>Request Handover Proposal</span>
                  <ArrowRight className="w-4 h-4 text-jitto-cyan" />
                </button>

                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="w-full sm:w-auto min-h-[44px] justify-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium px-5 py-3 rounded-xl transition-colors text-xs sm:text-sm flex items-center"
                >
                  Urgent PM Hotline: (249) 800-0127
                </a>
              </div>
            </div>

            {/* Unique Hero Photo: post-construction-architecture.jpg */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm">
                <img 
                  src="/images/post-construction-architecture.jpg" 
                  alt="Post-construction handover ready luxury modern home" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The 3 Construction Phases */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
            Turnkey Phases
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">
            Engineered For Every Stage Of Your Build
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Book individual stages or our complete 3-phase inspection package.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POST_CONSTRUCTION_DETAILS.phases.map((ph, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="font-mono text-xs font-bold text-slate-400 mb-2">Stage 0{idx + 1}</div>
                <h3 className="text-lg font-serif font-bold text-slate-900 mb-1">{ph.phase}</h3>
                <div className="text-xs text-jitto-navy font-semibold mb-3">{ph.timing}</div>
                <p className="text-slate-600 text-xs leading-relaxed mb-6">{ph.desc}</p>
              </div>

              <button
                onClick={() => {
                  onSelectQuoteService('post-construction');
                  onNavigate('quote');
                }}
                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold py-2.5 px-4 rounded-xl border border-slate-200 text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Select for Proposal</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Unique Images: Team In Action, Handover Proof, Brand New Kitchen */}
      <section className="bg-white py-16 sm:py-24 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          {/* Unique Image 1: post-construction-detail-handover.jpg */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden border border-slate-200/80">
              <img 
                src="/images/post-construction-detail-handover.jpg" 
                alt="Jitto post construction clean in progress with spotless millwork and glass" 
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="space-y-4">
              <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
                Fine Dust Elimination
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                HEPA Backpack Vacs & Delicate Millwork Care
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Standard vacuums blow fine drywall silica back into the air. Our commercial HEPA extraction traps sub-micron particles, ensuring pristine vents, polished light fixtures, and zero residue on custom cabinetry.
              </p>
            </div>
          </div>

          {/* Unique Image 2: post-construction-home.jpg */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 order-2 lg:order-1">
              <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
                Proof, Not Promises
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Time-Stamped Photo Verification For Project Managers
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                You don't need to drive out to site just to check if the cleaners showed up. Before our supervisors leave, we transmit a full digital photo log and signed inspection sheet directly to your phone.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-200/80 order-1 lg:order-2">
              <img 
                src="/images/post-construction-home.jpg" 
                alt="Handover inspection ready sunlit floor" 
                className="w-full h-80 object-cover"
              />
            </div>
          </div>

          {/* Unique Image 3: post-construction-kitchen-new.jpg */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden border border-slate-200/80">
              <img 
                src="/images/post-construction-kitchen-new.jpg" 
                alt="Brand new custom modern kitchen after post-construction cleaning" 
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="space-y-4">
              <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
                Turnkey Detailing
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                New Cabinetry, Stone & Appliance De-Stickering
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Manufacturer protective films, adhesive residue, and fine sawdust extracted from inside every drawer and hinge. Turnkey move-in ready for high-end clients.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
