import React from 'react';
import type { PageRoute } from '../types';
import { COMPANY_INFO, RESIDENTIAL_DETAILS } from '../data/content';
import { 
  Home as HomeIcon, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  BadgeCheck, 
  ListChecks 
} from 'lucide-react';

interface ResidentialPageProps {
  onNavigate: (page: PageRoute) => void;
  onSelectQuoteService: (service: 'residential') => void;
}

export const ResidentialPage: React.FC<ResidentialPageProps> = ({ 
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
                01 / Residential Housekeeping
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Warm, trustworthy care for your private sanctuary.
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                Founded on <strong>over 16 years of hands-on housekeeping in private homes</strong>. We bring the discretion, care, and perfectionism of estate housekeeping to residences across Barrie and Simcoe County.
              </p>

              <div className="flex flex-wrap gap-3 pt-2 text-xs text-slate-700">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <BadgeCheck className="w-4 h-4 text-jitto-navy" />
                  Same Crew Each Visit
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-jitto-navy" />
                  Insured & WSIB Covered
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <ListChecks className="w-4 h-4 text-jitto-navy" />
                  Room-By-Room Checklist
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => {
                    onSelectQuoteService('residential');
                    onNavigate('quote');
                  }}
                  className="bg-jitto-navy hover:bg-jitto-navy-800 text-white font-medium px-6 py-3 rounded-xl transition-all text-xs sm:text-sm flex items-center gap-2"
                >
                  <span>Request Residential Proposal</span>
                  <ArrowRight className="w-4 h-4 text-jitto-cyan" />
                </button>

                <button
                  onClick={() => onNavigate('booking')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium px-5 py-3 rounded-xl transition-colors text-xs sm:text-sm"
                >
                  Reserve Date
                </button>
              </div>
            </div>

            {/* Unique Hero Photo: residential-hero-bedroom.jpg */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm">
                <img 
                  src="/images/residential-hero-bedroom.jpg" 
                  alt="Minimalist luxury bedroom with crisp white linens" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3 Residential Service Packages */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
            Service Levels
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">
            Choose The Level Of Clean You Need
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Tailored programs with standardized room-by-room signoffs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESIDENTIAL_DETAILS.services.map((srv, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {srv.badge}
                  </span>
                  <span className="text-[11px] text-slate-400">{srv.cadence}</span>
                </div>

                <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">
                  {srv.name}
                </h3>

                <p className="text-slate-600 text-xs leading-relaxed mb-6">
                  {srv.description}
                </p>

                <div className="border-t border-slate-100 pt-4 mb-6">
                  <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                    What's Included:
                  </div>
                  <ul className="space-y-2">
                    {srv.includes.map((task, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-jitto-navy shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectQuoteService('residential');
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

      {/* Unique Images: Living Room, Kitchen Detail, Marble Bathroom */}
      <section className="bg-white py-16 sm:py-24 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          {/* Unique Image 1: residential-living-lounge.jpg */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden border border-slate-200/80">
              <img 
                src="/images/residential-living-lounge.jpg" 
                alt="Clean sunlit luxury living room" 
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="space-y-4">
              <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
                Living Spaces
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Pristine Living Areas & Restful Bedrooms
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                We eliminate dust, allergens, and pet dander from upholstery, baseboards, and hardwood. Beds are dressed with crisp precision so your home feels serene from the moment you return.
              </p>
            </div>
          </div>

          {/* Unique Image 2: residential-kitchen-scandi.jpg */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 order-2 lg:order-1">
              <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
                Culinary Spaces
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Sparkling Countertops, Sinks & Kitchen Islands
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Kitchens are the heart of the home. We scrub stainless sinks, polish quartz and marble islands, wipe appliance faces, and eliminate grease residue with food-safe solutions.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-200/80 order-1 lg:order-2">
              <img 
                src="/images/residential-kitchen-scandi.jpg" 
                alt="Immaculate Scandinavian kitchen island" 
                className="w-full h-80 object-cover"
              />
            </div>
          </div>

          {/* Unique Image 3: residential-bathroom-spa.jpg */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden border border-slate-200/80">
              <img 
                src="/images/residential-bathroom-spa.jpg" 
                alt="Sparkling clean spa bathroom vanity and soaking tub" 
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="space-y-4">
              <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
                Sanitary Hygiene
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Spotless Marble Vanities & Frameless Glass
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Streak-free glass enclosures, descaled chrome fixtures, polished stone countertops, and disinfected tile surfaces washed on hands and knees for immaculate cleanliness.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
