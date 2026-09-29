import React from 'react';
import type { PageRoute } from '../types';
import { COMPANY_INFO, JUNK_REMOVAL_DETAILS } from '../data/content';
import { 
  Truck, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Recycle, 
  ShieldCheck, 
  Clock, 
  AlertCircle,
  FileCheck,
  Phone
} from 'lucide-react';

interface JunkRemovalPageProps {
  onNavigate: (page: PageRoute) => void;
  onSelectQuoteService: (service: 'junk-removal') => void;
}

export const JunkRemovalPage: React.FC<JunkRemovalPageProps> = ({ 
  onNavigate,
  onSelectQuoteService 
}) => {
  return (
    <div className="bg-[#fafbfc] min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200/80 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
                04 / Full-Service Hauling & Property Reset
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Clear The Clutter. We Haul It Away & Sweep It Clean.
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                Heavy furniture, renovation debris, estate clearances, or garage overflow. Jitto handles all the heavy lifting, responsible sorting, and eco-friendly diversion across Barrie and Simcoe County—complete with our signature <strong>broom-swept clean guarantee</strong>.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-2.5 pt-2 text-xs text-slate-700">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <Truck className="w-4 h-4 text-jitto-navy" />
                  Heavy Lifting & 2-Person Crew Included
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <Sparkles className="w-4 h-4 text-jitto-navy" />
                  Broom-Swept Finish Guarantee
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <Recycle className="w-4 h-4 text-jitto-navy" />
                  Eco-Friendly Donation & Diversion
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-jitto-navy" />
                  Fully Insured & Protected
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => {
                    onSelectQuoteService('junk-removal');
                    onNavigate('quote');
                  }}
                  className="bg-jitto-navy hover:bg-jitto-navy-800 text-white font-medium px-6 py-3 rounded-xl transition-all text-xs sm:text-sm flex items-center gap-2 shadow-sm"
                >
                  <span>Request Hauling Proposal</span>
                  <ArrowRight className="w-4 h-4 text-jitto-cyan" />
                </button>

                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium px-5 py-3 rounded-xl transition-colors text-xs sm:text-sm flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-jitto-navy" />
                  <span>Direct Hauling Line: (249) 800-0127</span>
                </a>
              </div>
            </div>

            {/* Dedicated Hero Image: junk-removal-service.jpg */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-md">
                <img 
                  src="/images/junk-removal-service.jpg?v=4" 
                  alt="Professional Jitto junk removal team loading clean white commercial truck in driveway" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The 4 Hauling Programs */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
            Turnkey Programs
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">
            Engineered For Residential, Trade & Commercial Hauling
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Whether you need a single bulky item hauled or an entire multi-story estate cleared, we provide upfront volume-based pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {JUNK_REMOVAL_DETAILS.services.map((svc, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-slate-400">0{idx + 1}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-jitto-navy px-2 py-0.5 rounded">
                    {svc.badge}
                  </span>
                </div>
                <h3 className="text-base font-serif font-bold text-slate-900 mb-1">{svc.name}</h3>
                <div className="text-[11px] text-jitto-navy font-semibold mb-3">{svc.timing}</div>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">{svc.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {svc.includes.map((inc, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-jitto-navy shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => {
                  onSelectQuoteService('junk-removal');
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

      {/* What We Take vs. What We Cannot Take */}
      <section className="bg-white py-16 sm:py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
              Transparent Acceptance Guide
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">
              What We Can and Cannot Remove
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              We handle nearly all non-hazardous residential, commercial, and renovation waste across Simcoe County.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* What We Take (8 Cols) */}
            <div className="lg:col-span-8 bg-slate-50/70 rounded-2xl p-6 sm:p-8 border border-slate-200/80">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900">Items We Gladly Haul Away</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {JUNK_REMOVAL_DETAILS.whatWeTake.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-2xs">
                    <div className="font-semibold text-slate-900 text-xs mb-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-jitto-navy" />
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-500 leading-relaxed">{item.items}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* What We Cannot Take (4 Cols) */}
            <div className="lg:col-span-4 bg-rose-50/40 rounded-2xl p-6 sm:p-8 border border-rose-200/70">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-4 h-4 stroke-[2.5]" />
                </div>
                <h3 className="text-base font-serif font-bold text-slate-900">Restricted Materials</h3>
              </div>

              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                By Ontario environmental regulations, we are unable to transport toxic, biological, or pressurized hazardous materials:
              </p>

              <ul className="space-y-2.5 text-xs text-slate-700">
                {JUNK_REMOVAL_DETAILS.whatWeDoNotTake.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold shrink-0">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-rose-200/60 text-[11px] text-slate-500 leading-relaxed">
                Need guidance on municipal toxic disposal? Call our team and we will gladly connect you with Simcoe County household hazardous waste depots.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Deep Dives with Unique Photography */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Deep Dive 1: junk-removal-cleanout.jpg */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm">
            <img 
              src="/images/junk-removal-cleanout.jpg" 
              alt="Impeccably swept and cleared two car garage after full junk removal cleanout" 
              className="w-full h-80 object-cover"
            />
          </div>
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-jitto-navy/5 border border-jitto-navy/15 text-jitto-navy text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-jitto-cyan-600" />
              <span>The Jitto Cleaner Standard</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
              The Broom-Swept Finish: We Don’t Just Haul, We Clean.
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Most hauling companies back up, toss your belongings into a truck, and speed away—leaving nails, sawdust, dirt, and scuffs all over your garage or driveway. 
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Because Jitto is founded on 16 years of professional housekeeping and detailing excellence, our crews bring commercial brooms and HEPA vacuums. When the hauling is finished, we sweep the entire loading area spotless before we hand back your space.
            </p>
          </div>
        </div>

        {/* Deep Dive 2: junk-removal-donation.jpg */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 order-2 lg:order-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-jitto-navy/5 border border-jitto-navy/15 text-jitto-navy text-xs font-semibold">
              <Recycle className="w-3.5 h-3.5 text-jitto-cyan-600" />
              <span>Green Disposal & Stewardship</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
              Simcoe County Eco-Diversion & Charity Donations
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Not everything belongs in a landfill. Before taking items to disposal transfer facilities, our team sorts salvageable wooden furniture, functional appliances, books, and household goods.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              We partner with local Simcoe County charities, community reuse centers, and metal recyclers to divert up to 70% of hauled goods from municipal landfills. You get a clutter-free home while giving usable items a second life.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm order-1 lg:order-2">
            <img 
              src="/images/junk-removal-donation.jpg" 
              alt="Clean eco-friendly staging warehouse with furniture and boxes organized for local charity donation" 
              className="w-full h-80 object-cover"
            />
          </div>
        </div>

      </section>

      {/* Transparent Volume Guide */}
      <section className="bg-white py-16 sm:py-20 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
              Transparent Pricing
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">
              Simple Volume-Based Estimating
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              You only pay for the truck volume your items occupy. All labor, loading, travel, and recycling transfer fees are included upfront.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { volume: 'Single Item', desc: 'Sofa, mattress, fridge, or large appliance', box: '15%' },
              { volume: '1/4 Truckload', desc: '5-8 medium boxes or small room clearout', box: '25%' },
              { volume: '1/2 Truckload', desc: 'Standard bedroom, office or small garage reset', box: '50%' },
              { volume: '3/4 Truckload', desc: 'Large basement cleanout or trade remodel scrap', box: '75%' },
              { volume: 'Full Truckload', desc: 'Whole estate cleanout or multi-room renovation', box: '100%' },
            ].map((v, i) => (
              <div 
                key={i}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 text-center flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-jitto-navy/10 text-jitto-navy font-bold text-xs flex items-center justify-center mx-auto mb-3">
                    {v.box}
                  </div>
                  <div className="font-serif font-bold text-slate-900 text-sm mb-1">{v.volume}</div>
                  <div className="text-[11px] text-slate-500 leading-snug">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => {
                onSelectQuoteService('junk-removal');
                onNavigate('quote');
              }}
              className="bg-jitto-navy hover:bg-jitto-navy-800 text-white font-semibold text-xs px-6 py-3 rounded-xl transition-all shadow-sm"
            >
              Get An Exact Written Proposal (Upload Photos)
            </button>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-gradient-to-r from-[#030c1c] via-[#061633] to-[#030c1c] text-white py-14 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-[10px] font-mono tracking-widest text-jitto-cyan uppercase">
              24/7 Response Across Simcoe County
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold">
              Ready To Reclaim Your Space?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Same-day & scheduled hauling. Direct owner oversight and broom-swept completion.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="px-5 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-white hover:text-jitto-cyan transition-colors"
            >
              (249) 800-0127 (24/7)
            </a>
            <button
              onClick={() => {
                onSelectQuoteService('junk-removal');
                onNavigate('quote');
              }}
              className="px-6 py-3 rounded-xl bg-white text-slate-900 text-xs font-semibold hover:bg-slate-100 transition-colors shadow-sm"
            >
              Request Hauling Proposal
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
