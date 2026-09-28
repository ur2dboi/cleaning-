import React, { useState } from 'react';
import { PageRoute, ServiceCategory } from '../types';
import { 
  COMPANY_INFO, 
  RESIDENTIAL_DETAILS, 
  COMMERCIAL_DETAILS, 
  POST_CONSTRUCTION_DETAILS, 
  COMING_SOON_SERVICES 
} from '../data/content';
import { 
  Sparkles, 
  Home as HomeIcon, 
  Building2, 
  HardHat, 
  Wind, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  BellRing,
  Check
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageRoute) => void;
  onSelectQuoteService: (service: ServiceCategory) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ 
  onNavigate,
  onSelectQuoteService 
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'residential' | 'commercial' | 'post-construction' | 'coming-soon'>('all');
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    setWaitlistSuccess(true);
    setTimeout(() => {
      setWaitlistSuccess(false);
      setWaitlistEmail('');
    }, 4000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-jitto-cyan-50 border border-jitto-cyan-200 text-jitto-navy text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-jitto-cyan-600" />
            Complete Service Catalog
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-serif">
            Precision Cleaning For Every Property
          </h1>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Whether it's your family home, corporate office, or newly completed build, we apply 16 years of proven housekeeping standards to every square foot.
          </p>

          {/* Tab Filter */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'residential', label: 'Residential' },
              { id: 'commercial', label: 'Commercial' },
              { id: 'post-construction', label: 'Post-Construction' },
              { id: 'coming-soon', label: 'Coming Soon (HVAC & Junk)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-jitto-navy text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 1: RESIDENTIAL */}
        {(activeTab === 'all' || activeTab === 'residential') && (
          <section className="mb-20">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-jitto-navy-50 text-jitto-navy">
                    <HomeIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-jitto-cyan-700 uppercase tracking-wider">Sanctuary & Comfort</span>
                    <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">Residential Cleaning</h2>
                    <p className="text-xs text-slate-500 mt-1">For homeowners, busy families, and condominiums in Barrie & Simcoe County</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => onNavigate('residential')}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    View Residential Details
                  </button>
                  <button
                    onClick={() => {
                      onSelectQuoteService('residential');
                      onNavigate('quote');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-jitto-navy text-white text-xs font-bold hover:bg-jitto-navy-800 shadow-sm"
                  >
                    Get Residential Quote
                  </button>
                </div>
              </div>

              {/* Grid of packages */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {RESIDENTIAL_DETAILS.services.map((item, i) => (
                  <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-jitto-navy bg-white px-2.5 py-1 rounded-md inline-block mb-3 border border-slate-200">
                        {item.badge}
                      </div>
                      <h3 className="font-serif font-bold text-lg text-slate-900 mb-2">{item.name}</h3>
                      <p className="text-xs text-slate-600 mb-4">{item.description}</p>
                      <ul className="space-y-2 mb-6">
                        {item.includes.slice(0, 4).map((inc, incIdx) => (
                          <li key={incIdx} className="text-[11px] text-slate-600 flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-jitto-cyan-600 shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => {
                        onSelectQuoteService('residential');
                        onNavigate('quote');
                      }}
                      className="text-xs font-bold text-jitto-navy hover:text-jitto-cyan-600 text-left flex items-center gap-1"
                    >
                      <span>Quote this package</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 2: COMMERCIAL */}
        {(activeTab === 'all' || activeTab === 'commercial') && (
          <section className="mb-20">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-jitto-navy-50 text-jitto-navy">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-jitto-cyan-700 uppercase tracking-wider">Corporate & Facilities</span>
                    <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">Commercial & Office Cleaning</h2>
                    <p className="text-xs text-slate-500 mt-1">For corporate offices, dental/medical clinics, retail spaces, and property managers</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => onNavigate('commercial')}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    View Commercial Details
                  </button>
                  <button
                    onClick={() => {
                      onSelectQuoteService('commercial');
                      onNavigate('quote');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-jitto-navy text-white text-xs font-bold hover:bg-jitto-navy-800 shadow-sm"
                  >
                    Request Commercial RFP
                  </button>
                </div>
              </div>

              {/* Grid of commercial benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {COMMERCIAL_DETAILS.spacesServed.map((s, i) => (
                  <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80">
                    <h3 className="font-serif font-bold text-base text-slate-900 mb-2">{s.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{s.desc}</p>
                    <div className="text-[11px] font-semibold text-jitto-navy flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-jitto-cyan-600" />
                      <span>24/7 & After-Hours Visits</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: POST-CONSTRUCTION */}
        {(activeTab === 'all' || activeTab === 'post-construction') && (
          <section className="mb-20">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-700">
                    <HardHat className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Builders & Renovators</span>
                    <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">Post-Construction Detailing</h2>
                    <p className="text-xs text-slate-500 mt-1">Multi-stage fine dust eradication, sticker removal, and inspection-ready turnaround</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => onNavigate('post-construction')}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    View Post-Construction Details
                  </button>
                  <button
                    onClick={() => {
                      onSelectQuoteService('post-construction');
                      onNavigate('quote');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-jitto-navy text-white text-xs font-bold hover:bg-jitto-navy-800 shadow-sm"
                  >
                    Upload Specs For Quote
                  </button>
                </div>
              </div>

              {/* Grid of phases */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {POST_CONSTRUCTION_DETAILS.phases.map((ph, i) => (
                  <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80">
                    <div className="text-xs font-bold text-jitto-navy bg-white px-2.5 py-1 rounded-md inline-block mb-3 border border-slate-200">
                      Stage {i + 1}
                    </div>
                    <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">{ph.phase}</h3>
                    <div className="text-[11px] text-jitto-cyan-700 font-bold mb-3">{ph.timing}</div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{ph.desc}</p>
                    <div className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Photo verification signoff</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 4: COMING SOON (HVAC & JUNK REMOVAL) */}
        {(activeTab === 'all' || activeTab === 'coming-soon') && (
          <section className="mb-14">
            <div className="bg-gradient-to-br from-jitto-navy-900 to-jitto-navy-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-jitto-navy-800">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-jitto-cyan/20 border border-jitto-cyan/40 text-jitto-cyan text-xs font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  Upcoming Expansion
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-serif">
                  Expanding Our Simcoe County Capabilities
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm mt-2">
                  To provide our clients with a complete one-stop property solution, Jitto is launching HVAC air duct sanitation and eco-friendly debris hauling.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* HVAC CARD */}
                <div className="bg-jitto-navy-900/80 rounded-2xl p-6 border border-jitto-navy-700 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-jitto-cyan/20 text-jitto-cyan">
                        <Wind className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Coming Soon
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-serif text-white mb-2">
                      HVAC & Air Duct Cleaning
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed mb-4">
                      Negative-air HEPA duct collection, furnace blower sanitation, and allergen removal. Ideal for maintaining indoor air quality and after major home renovations.
                    </p>

                    <div className="space-y-2 mb-6">
                      {["Removes airborne drywall dust & allergens", "Hospital-grade negative pressure suction", "Improves HVAC airflow and furnace lifespan", "Sanitizes trunk lines and registers"].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-jitto-cyan" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-jitto-cyan font-semibold">
                    Launching Soon across Barrie & Simcoe County
                  </div>
                </div>

                {/* JUNK REMOVAL CARD */}
                <div className="bg-jitto-navy-900/80 rounded-2xl p-6 border border-jitto-navy-700 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-jitto-cyan/20 text-jitto-cyan">
                        <Truck className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Coming Soon
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-serif text-white mb-2">
                      Junk & Debris Removal
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed mb-4">
                      Clean hauling and responsible disposal for renovation scrap, old appliances, estate cleanouts, and bulky commercial waste.
                    </p>

                    <div className="space-y-2 mb-6">
                      {["Heavy lifting & labor included", "Eco-friendly recycling & donation priority", "Same-day contractor trade scrap haul", "Broom-clean sweep after every removal"].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-jitto-cyan" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-jitto-cyan font-semibold">
                    Launching Soon across Barrie & Simcoe County
                  </div>
                </div>

              </div>

              {/* Waitlist / Priority signup */}
              <div className="mt-10 p-6 rounded-2xl bg-jitto-navy-950/70 border border-jitto-navy-800 text-center max-w-xl mx-auto">
                <div className="text-xs font-bold text-jitto-cyan uppercase mb-1">
                  Be The First To Know
                </div>
                <div className="text-sm text-slate-200 mb-3">
                  Join our early notification list for special launch discounts on HVAC & Junk services.
                </div>
                
                {waitlistSuccess ? (
                  <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                    ✓ You're on the priority list! We'll notify you as soon as booking opens.
                  </div>
                ) : (
                  <form onSubmit={handleWaitlistSubmit} className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 px-3.5 py-2 rounded-xl text-xs bg-jitto-navy-900 border border-jitto-navy-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-jitto-cyan"
                    />
                    <button
                      type="submit"
                      className="bg-jitto-cyan hover:bg-jitto-cyan-400 text-jitto-navy-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors shrink-0"
                    >
                      Notify Me
                    </button>
                  </form>
                )}
              </div>

            </div>
          </section>
        )}

        {/* COMPARISON TABLE */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm mt-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold text-jitto-cyan-700 bg-jitto-cyan-50 px-3 py-1 rounded-full uppercase tracking-wider">
              The Jitto Difference
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 mt-2">
              Why Homeowners & Contractors Switch To Jitto
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 font-bold">Feature / Standard</th>
                  <th className="py-3 px-4 font-bold text-jitto-navy bg-jitto-navy-50 rounded-t-xl">Jitto Cleaning Services</th>
                  <th className="py-3 px-4 font-bold text-slate-500">Typical Independent Cleaner</th>
                  <th className="py-3 px-4 font-bold text-slate-500">Corporate Cleaning Franchise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">Experience Standard</td>
                  <td className="py-3.5 px-4 font-bold text-jitto-navy bg-jitto-navy-50/50">16+ Years Hands-On Housekeeping</td>
                  <td className="py-3.5 px-4 text-slate-500">Varies (often untrained)</td>
                  <td className="py-3.5 px-4 text-slate-500">Basic 2-day manual training</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">Consistency</td>
                  <td className="py-3.5 px-4 font-bold text-jitto-navy bg-jitto-navy-50/50">The Same Crew Whenever Possible</td>
                  <td className="py-3.5 px-4 text-slate-500">One person (cancels if sick)</td>
                  <td className="py-3.5 px-4 text-slate-500">Rotating strangers every visit</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">Quality Control</td>
                  <td className="py-3.5 px-4 font-bold text-jitto-navy bg-jitto-navy-50/50">Room-By-Room Standardized Checklist</td>
                  <td className="py-3.5 px-4 text-slate-500">Casual guesswork</td>
                  <td className="py-3.5 px-4 text-slate-500">Generic speed-cleaning checklist</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">Handover Proof</td>
                  <td className="py-3.5 px-4 font-bold text-jitto-navy bg-jitto-navy-50/50">Before/After Photo Verification Log</td>
                  <td className="py-3.5 px-4 text-slate-500">None</td>
                  <td className="py-3.5 px-4 text-slate-500">Rarely provided</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">Owner Access</td>
                  <td className="py-3.5 px-4 font-bold text-jitto-navy bg-jitto-navy-50/50">Reach Owners Directly (249) 800-0127</td>
                  <td className="py-3.5 px-4 text-slate-500">Direct phone (can be hard to reach)</td>
                  <td className="py-3.5 px-4 text-slate-500">Anonymous call center ticket</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">Availability</td>
                  <td className="py-3.5 px-4 font-bold text-jitto-navy bg-jitto-navy-50/50">24/7 Open & Flexible Scheduling</td>
                  <td className="py-3.5 px-4 text-slate-500">Limited weekday hours</td>
                  <td className="py-3.5 px-4 text-slate-500">Strict corporate hours</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
};
