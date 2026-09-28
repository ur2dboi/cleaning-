import React from 'react';
import type { PageRoute } from '../types';
import { 
  ArrowUpRight, 
  Check, 
  Home as HomeIcon, 
  Building2, 
  HardHat 
} from 'lucide-react';

interface ServicePathCardsProps {
  onNavigate: (page: PageRoute) => void;
  onSelectQuoteService?: (service: 'residential' | 'commercial' | 'post-construction') => void;
}

export const ServicePathCards: React.FC<ServicePathCardsProps> = ({ 
  onNavigate,
  onSelectQuoteService 
}) => {
  return (
    <div className="w-full">
      {/* Section Subhead */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
            Tailored Pathways
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">
            Choose Your Specialized Service
          </h2>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm max-w-md mt-2 md:mt-0">
          Dedicated checklists, specialized equipment, and zero guesswork for every environment.
        </p>
      </div>

      {/* The 3 Big Boxes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* BOX 1: RESIDENTIAL */}
        <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:border-jitto-navy/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <div>
            {/* Image */}
            <div className="relative h-60 overflow-hidden bg-slate-100">
              <img 
                src="/images/residential-hero.jpg" 
                alt="Jitto Residential Housekeeper in official uniform making bed" 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-jitto-navy tracking-wide flex items-center gap-1.5 shadow-sm">
                <HomeIcon className="w-3.5 h-3.5 text-jitto-cyan-600" />
                <span>01 / Homeowners</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-bold font-serif">Residential Cleaning</h3>
                <span className="text-xs text-slate-200 font-light">Sanctuary & Estate Housekeeping</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                Warm, trustworthy care for your private residence. Founded on 16 years of hands-on housekeeping in private homes, we treat every space like our own.
              </p>

              <div className="space-y-2 text-xs text-slate-700 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-jitto-navy shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span><strong>Regular Maintenance:</strong> Weekly, Bi-weekly, Monthly</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-jitto-navy shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span><strong>Detailed Deep Cleans:</strong> Baseboards, vents, grout</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-jitto-navy shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span><strong>Move-In / Move-Out:</strong> Real estate deposit ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-jitto-navy shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span><strong>Consistent Crew:</strong> Familiar, trusted faces each visit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => onNavigate('residential')}
              className="text-xs font-bold text-jitto-navy hover:text-jitto-cyan-600 transition-colors flex items-center gap-1 group/link"
            >
              <span>Explore Residential</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => {
                if (onSelectQuoteService) onSelectQuoteService('residential');
                onNavigate('quote');
              }}
              className="text-xs font-medium text-slate-500 hover:text-jitto-navy transition-colors"
            >
              Request Quote
            </button>
          </div>
        </div>

        {/* BOX 2: COMMERCIAL */}
        <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:border-jitto-navy/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <div>
            {/* Image */}
            <div className="relative h-60 overflow-hidden bg-slate-100">
              <img 
                src="/images/commercial-hero.jpg" 
                alt="Jitto Commercial Cleaning Team in office uniform" 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-jitto-navy tracking-wide flex items-center gap-1.5 shadow-sm">
                <Building2 className="w-3.5 h-3.5 text-jitto-cyan-600" />
                <span>02 / Commercial</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-bold font-serif">Commercial & Offices</h3>
                <span className="text-xs text-slate-200 font-light">Facilities & Janitorial Programs</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                Immaculate presentation and hygiene for offices, medical clinics, retail, and managed properties. Flexible after-hours schedules that never disrupt your business.
              </p>

              <div className="space-y-2 text-xs text-slate-700 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-jitto-navy shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span><strong>Flexible Hours:</strong> After-hours, daytime porter & weekends</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-jitto-navy shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span><strong>Clinical Sanitation:</strong> High-touch surfaces & restrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-jitto-navy shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span><strong>Tailored Agreements:</strong> Custom SOW without rigid lock-in</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-jitto-navy shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span><strong>Direct Oversight:</strong> Speak to owners directly (24/7)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => onNavigate('commercial')}
              className="text-xs font-bold text-jitto-navy hover:text-jitto-cyan-600 transition-colors flex items-center gap-1 group/link"
            >
              <span>Explore Commercial</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => {
                if (onSelectQuoteService) onSelectQuoteService('commercial');
                onNavigate('quote');
              }}
              className="text-xs font-medium text-slate-500 hover:text-jitto-navy transition-colors"
            >
              Request Proposal
            </button>
          </div>
        </div>

        {/* BOX 3: POST-CONSTRUCTION */}
        <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:border-jitto-navy/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <div>
            {/* Image */}
            <div className="relative h-60 overflow-hidden bg-slate-100">
              <img 
                src="/images/post-construction-architecture.jpg" 
                alt="Post-construction handover ready luxury modern home" 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-jitto-navy tracking-wide flex items-center gap-1.5 shadow-sm">
                <HardHat className="w-3.5 h-3.5 text-jitto-cyan-600" />
                <span>03 / Contractors</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-bold font-serif">Post-Construction</h3>
                <span className="text-xs text-slate-200 font-light">Fine Dust & Handover Detailing</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                Fine drywall dust eradication, paint/sticker scraping, and white-glove turnaround. We ensure your new build or renovation passes client walkthroughs and building inspections.
              </p>

              <div className="space-y-2 text-xs text-slate-700 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-jitto-navy shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span><strong>Dust Eradication:</strong> HEPA air filtration & duct vents</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-jitto-navy shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span><strong>Multi-Stage Scope:</strong> Rough, Final & Touch-Up Handover</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-jitto-navy shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span><strong>Proof, Not Promises:</strong> Photos sent directly to PMs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-jitto-navy shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span><strong>Rapid Turnaround:</strong> Meet tight closing deadlines</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => onNavigate('post-construction')}
              className="text-xs font-bold text-jitto-navy hover:text-jitto-cyan-600 transition-colors flex items-center gap-1 group/link"
            >
              <span>Explore Post-Construction</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => {
                if (onSelectQuoteService) onSelectQuoteService('post-construction');
                onNavigate('quote');
              }}
              className="text-xs font-medium text-slate-500 hover:text-jitto-navy transition-colors"
            >
              Upload Specs
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
