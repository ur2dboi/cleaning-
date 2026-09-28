import React from 'react';
import { PageRoute } from '../types';
import { 
  Home as HomeIcon, 
  Building2, 
  HardHat, 
  ArrowRight, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  FileCheck2 
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
      {/* Header introducing the 3 paths */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-jitto-cyan-50 border border-jitto-cyan-200 text-jitto-navy text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-jitto-cyan-600" />
          Choose Your Tailored Cleaning Path
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
          Who Are You Booking For Today?
        </h2>
        <p className="mt-3 text-slate-600 text-base sm:text-lg">
          We speak directly to your unique needs with dedicated checklists, specialized equipment, and zero guesswork. Select your path below:
        </p>
      </div>

      {/* The 3 Big Boxes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* BOX 1: RESIDENTIAL */}
        <div className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col transform hover:-translate-y-1">
          {/* Top Image with Badge */}
          <div className="relative h-64 overflow-hidden bg-slate-100">
            <img 
              src="/images/residential-hero.jpg" 
              alt="Jitto Residential Housekeeper smoothing clean bed" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
            
            {/* Top Pill */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-jitto-navy flex items-center gap-1.5 shadow-sm">
              <HomeIcon className="w-3.5 h-3.5 text-jitto-cyan-600" />
              <span>For Homeowners & Families</span>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs font-bold tracking-wider uppercase text-jitto-cyan">Sanctuary & Comfort</span>
              <h3 className="text-2xl font-bold font-serif leading-tight">Residential Cleaning</h3>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                Warm, trustworthy care for your private sanctuary. Founded on 16 years of hands-on housekeeping in private homes, we treat every space like our own.
              </p>

              {/* Specific features */}
              <div className="space-y-2.5 mb-6">
                <div className="flex items-center gap-2.5 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-jitto-cyan-50 flex items-center justify-center text-jitto-cyan-600 shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Regular Maintenance:</strong> Weekly, Bi-weekly, Monthly</span>
                </div>

                <div className="flex items-center gap-2.5 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-jitto-cyan-50 flex items-center justify-center text-jitto-cyan-600 shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Detailed Deep Cleans:</strong> Baseboards, vents, grout</span>
                </div>

                <div className="flex items-center gap-2.5 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-jitto-cyan-50 flex items-center justify-center text-jitto-cyan-600 shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Move-In / Move-Out:</strong> Guaranteed deposit ready</span>
                </div>

                <div className="flex items-center gap-2.5 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-jitto-cyan-50 flex items-center justify-center text-jitto-cyan-600 shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Consistent Crew:</strong> Familiar, trusted faces every visit</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <button
                onClick={() => onNavigate('residential')}
                className="w-full flex items-center justify-center gap-2 bg-jitto-navy hover:bg-jitto-navy-800 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors text-sm"
              >
                <span>Explore Residential Care</span>
                <ArrowRight className="w-4 h-4 text-jitto-cyan group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => {
                  if (onSelectQuoteService) onSelectQuoteService('residential');
                  onNavigate('quote');
                }}
                className="w-full text-center py-2 text-xs font-semibold text-jitto-navy hover:text-jitto-cyan-600 transition-colors"
              >
                Get Instant Residential Quote →
              </button>
            </div>
          </div>
        </div>

        {/* BOX 2: COMMERCIAL */}
        <div className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col transform hover:-translate-y-1">
          {/* Top Image with Badge */}
          <div className="relative h-64 overflow-hidden bg-slate-100">
            <img 
              src="/images/commercial-hero.jpg" 
              alt="Jitto Commercial Cleaning Team in office" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
            
            {/* Top Pill */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-jitto-navy flex items-center gap-1.5 shadow-sm">
              <Building2 className="w-3.5 h-3.5 text-jitto-navy" />
              <span>For Offices, Clinics & Retail</span>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs font-bold tracking-wider uppercase text-jitto-cyan">Hygiene & Professionalism</span>
              <h3 className="text-2xl font-bold font-serif leading-tight">Commercial Cleaning</h3>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                Flawless corporate presentation and dependable janitorial programs. Flexible hours that never disrupt your business, backed by full WSIB and liability insurance.
              </p>

              {/* Specific features */}
              <div className="space-y-2.5 mb-6">
                <div className="flex items-center gap-2.5 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-jitto-cyan-50 flex items-center justify-center text-jitto-cyan-600 shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Flexible Hours:</strong> After-hours, daytime porter & weekends</span>
                </div>

                <div className="flex items-center gap-2.5 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-jitto-cyan-50 flex items-center justify-center text-jitto-cyan-600 shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span><strong>High-Touch Disinfection:</strong> Desks, clinics, restrooms</span>
                </div>

                <div className="flex items-center gap-2.5 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-jitto-cyan-50 flex items-center justify-center text-jitto-cyan-600 shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Custom Contracts:</strong> Tailored frequency & zero lock-in</span>
                </div>

                <div className="flex items-center gap-2.5 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-jitto-cyan-50 flex items-center justify-center text-jitto-cyan-600 shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Direct Oversight:</strong> Speak to the owners, not a call center</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <button
                onClick={() => onNavigate('commercial')}
                className="w-full flex items-center justify-center gap-2 bg-jitto-navy hover:bg-jitto-navy-800 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors text-sm"
              >
                <span>Explore Commercial Solutions</span>
                <ArrowRight className="w-4 h-4 text-jitto-cyan group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => {
                  if (onSelectQuoteService) onSelectQuoteService('commercial');
                  onNavigate('quote');
                }}
                className="w-full text-center py-2 text-xs font-semibold text-jitto-navy hover:text-jitto-cyan-600 transition-colors"
              >
                Request Commercial Proposal →
              </button>
            </div>
          </div>
        </div>

        {/* BOX 3: POST-CONSTRUCTION */}
        <div className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col transform hover:-translate-y-1">
          {/* Top Image with Badge */}
          <div className="relative h-64 overflow-hidden bg-slate-100">
            <img 
              src="/images/post-construction-home.jpg" 
              alt="Post-construction handover ready luxury room with sunlight" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
            
            {/* Top Pill */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-jitto-navy flex items-center gap-1.5 shadow-sm">
              <HardHat className="w-3.5 h-3.5 text-amber-600" />
              <span>For Builders, Contractors & Renovators</span>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs font-bold tracking-wider uppercase text-jitto-cyan">Handover & Inspection Ready</span>
              <h3 className="text-2xl font-bold font-serif leading-tight">Post-Construction</h3>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                Micro-dust elimination, paint/adhesive scraping, and white-glove turnaround. We ensure your new build or renovation passes client walkthroughs and occupancy inspections.
              </p>

              {/* Specific features */}
              <div className="space-y-2.5 mb-6">
                <div className="flex items-center gap-2.5 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-jitto-cyan-50 flex items-center justify-center text-jitto-cyan-600 shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Dust & Debris Eradication:</strong> HEPA air filtration & ducts</span>
                </div>

                <div className="flex items-center gap-2.5 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-jitto-cyan-50 flex items-center justify-center text-jitto-cyan-600 shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Multi-Stage Cleaning:</strong> Rough, Final & Touch-Up Handover</span>
                </div>

                <div className="flex items-center gap-2.5 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-jitto-cyan-50 flex items-center justify-center text-jitto-cyan-600 shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Proof, Not Promises:</strong> Before/after photos sent to PMs</span>
                </div>

                <div className="flex items-center gap-2.5 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-jitto-cyan-50 flex items-center justify-center text-jitto-cyan-600 shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Rapid Turnaround:</strong> Meet firm closing and occupancy dates</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <button
                onClick={() => onNavigate('post-construction')}
                className="w-full flex items-center justify-center gap-2 bg-jitto-navy hover:bg-jitto-navy-800 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors text-sm"
              >
                <span>Explore Post-Construction</span>
                <ArrowRight className="w-4 h-4 text-jitto-cyan group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => {
                  if (onSelectQuoteService) onSelectQuoteService('post-construction');
                  onNavigate('quote');
                }}
                className="w-full text-center py-2 text-xs font-semibold text-jitto-navy hover:text-jitto-cyan-600 transition-colors"
              >
                Upload Project Specs & Quote →
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
