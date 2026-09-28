import React from 'react';
import type { PageRoute } from '../types';
import { 
  ArrowRight, 
  Check, 
  Home as HomeIcon, 
  Building2, 
  HardHat,
  Sparkles
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
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-jitto-navy/5 border border-jitto-navy/15 text-jitto-navy text-xs font-semibold tracking-wide mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-jitto-cyan-600" />
          <span>Tailored Pathways</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
          Who Are You Booking For Today?
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto leading-relaxed">
          Dedicated checklists, specialized equipment, and zero guesswork for every environment. Select your path below:
        </p>
      </div>

      {/* The 3 Big Boxes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* BOX 1: RESIDENTIAL */}
        <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-card hover:shadow-card-hover hover:border-jitto-navy/40 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
          <div>
            {/* Image Container with Gradient & Badge */}
            <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-900">
              <img 
                src="/images/residential-hero.jpg?v=3" 
                alt="Jitto Residential Housekeeper in official uniform making bed" 
                className="w-full h-full object-cover object-[25%_center] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-jitto-navy-950/90 via-jitto-navy-950/25 to-transparent pointer-events-none" />
              
              {/* Floating Frosted Pill */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-jitto-navy tracking-wide flex items-center gap-1.5 shadow-sm">
                <HomeIcon className="w-3.5 h-3.5 text-jitto-cyan-600" />
                <span>01 / For Homeowners</span>
              </div>

              {/* Title on Image */}
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <div className="text-[11px] font-mono tracking-widest text-jitto-cyan uppercase mb-1">
                  Private Residences
                </div>
                <h3 className="text-2xl font-serif font-bold">Residential Cleaning</h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-7">
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                Warm, trustworthy care for your private sanctuary. Founded on 16 years of hands-on housekeeping in private homes, we treat every room with discretion and meticulous care.
              </p>

              {/* Checklist Highlights */}
              <div className="space-y-3 text-xs text-slate-700 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-jitto-cyan/15 text-jitto-cyan-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Regular Maintenance:</strong> Weekly, Bi-weekly, Monthly</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-jitto-cyan/15 text-jitto-cyan-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Detailed Deep Cleans:</strong> Baseboards, vents, grout</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-jitto-cyan/15 text-jitto-cyan-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Move-In / Move-Out:</strong> Real estate deposit ready</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-jitto-cyan/15 text-jitto-cyan-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Consistent Crew:</strong> Familiar, trusted faces every visit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="px-7 pb-7 pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              onClick={() => onNavigate('residential')}
              className="flex-1 bg-jitto-navy hover:bg-jitto-navy-800 text-white font-semibold py-3 px-4 rounded-xl transition-all text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Explore Residential</span>
              <ArrowRight className="w-3.5 h-3.5 text-jitto-cyan group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                if (onSelectQuoteService) onSelectQuoteService('residential');
                onNavigate('quote');
              }}
              className="py-3 px-4 rounded-xl border border-slate-200 text-slate-700 hover:border-jitto-navy hover:text-jitto-navy font-semibold text-xs transition-colors"
            >
              Quote
            </button>
          </div>
        </div>

        {/* BOX 2: COMMERCIAL */}
        <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-card hover:shadow-card-hover hover:border-jitto-navy/40 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
          <div>
            {/* Image Container with Gradient & Badge */}
            <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-900">
              <img 
                src="/images/commercial-hero.jpg?v=3" 
                alt="Jitto Commercial Cleaning Team in office uniform" 
                className="w-full h-full object-cover object-[55%_center] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-jitto-navy-950/90 via-jitto-navy-950/25 to-transparent pointer-events-none" />
              
              {/* Floating Frosted Pill */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-jitto-navy tracking-wide flex items-center gap-1.5 shadow-sm">
                <Building2 className="w-3.5 h-3.5 text-jitto-navy" />
                <span>02 / For Businesses & Clinics</span>
              </div>

              {/* Title on Image */}
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <div className="text-[11px] font-mono tracking-widest text-jitto-cyan uppercase mb-1">
                  Workplaces & Facilities
                </div>
                <h3 className="text-2xl font-serif font-bold">Commercial Cleaning</h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-7">
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                Immaculate presentation and hygiene for offices, medical clinics, retail, and managed properties. Flexible after-hours schedules that never disrupt your business.
              </p>

              {/* Checklist Highlights */}
              <div className="space-y-3 text-xs text-slate-700 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-jitto-cyan/15 text-jitto-cyan-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Flexible Hours:</strong> After-hours, daytime porter & weekends</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-jitto-cyan/15 text-jitto-cyan-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Clinical Sanitation:</strong> High-touch surfaces & restrooms</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-jitto-cyan/15 text-jitto-cyan-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Tailored Agreements:</strong> Custom SOW without rigid lock-in</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-jitto-cyan/15 text-jitto-cyan-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Direct Oversight:</strong> Speak to owners directly (24/7)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="px-7 pb-7 pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              onClick={() => onNavigate('commercial')}
              className="flex-1 bg-jitto-navy hover:bg-jitto-navy-800 text-white font-semibold py-3 px-4 rounded-xl transition-all text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Explore Commercial</span>
              <ArrowRight className="w-3.5 h-3.5 text-jitto-cyan group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                if (onSelectQuoteService) onSelectQuoteService('commercial');
                onNavigate('quote');
              }}
              className="py-3 px-4 rounded-xl border border-slate-200 text-slate-700 hover:border-jitto-navy hover:text-jitto-navy font-semibold text-xs transition-colors"
            >
              Proposal
            </button>
          </div>
        </div>

        {/* BOX 3: POST-CONSTRUCTION */}
        <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-card hover:shadow-card-hover hover:border-jitto-navy/40 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
          <div>
            {/* Image Container with Gradient & Badge */}
            <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-900">
              <img 
                src="/images/home-post-construction.jpg?v=3" 
                alt="Post-construction handover ready luxury modern home" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-jitto-navy-950/90 via-jitto-navy-950/25 to-transparent pointer-events-none" />
              
              {/* Floating Frosted Pill */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-jitto-navy tracking-wide flex items-center gap-1.5 shadow-sm">
                <HardHat className="w-3.5 h-3.5 text-amber-600" />
                <span>03 / For Builders & Renovators</span>
              </div>

              {/* Title on Image */}
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <div className="text-[11px] font-mono tracking-widest text-jitto-cyan uppercase mb-1">
                  New Builds & Renovations
                </div>
                <h3 className="text-2xl font-serif font-bold">Post-Construction</h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-7">
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                Fine drywall dust eradication, paint/sticker scraping, and white-glove turnaround. We ensure your new build or renovation passes client walkthroughs and building inspections.
              </p>

              {/* Checklist Highlights */}
              <div className="space-y-3 text-xs text-slate-700 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-jitto-cyan/15 text-jitto-cyan-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Dust Eradication:</strong> HEPA air filtration & duct vents</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-jitto-cyan/15 text-jitto-cyan-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Multi-Stage Scope:</strong> Rough, Final & Touch-Up Handover</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-jitto-cyan/15 text-jitto-cyan-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Proof, Not Promises:</strong> Photos sent directly to PMs</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-jitto-cyan/15 text-jitto-cyan-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Rapid Turnaround:</strong> Meet tight closing deadlines</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="px-7 pb-7 pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              onClick={() => onNavigate('post-construction')}
              className="flex-1 bg-jitto-navy hover:bg-jitto-navy-800 text-white font-semibold py-3 px-4 rounded-xl transition-all text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Explore Construction</span>
              <ArrowRight className="w-3.5 h-3.5 text-jitto-cyan group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                if (onSelectQuoteService) onSelectQuoteService('post-construction');
                onNavigate('quote');
              }}
              className="py-3 px-4 rounded-xl border border-slate-200 text-slate-700 hover:border-jitto-navy hover:text-jitto-navy font-semibold text-xs transition-colors"
            >
              Specs
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
