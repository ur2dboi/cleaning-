import React, { useState } from 'react';
import type { PageRoute, ServiceCategory } from '../types';
import { 
  RESIDENTIAL_DETAILS, 
  COMMERCIAL_DETAILS, 
  POST_CONSTRUCTION_DETAILS, 
  COMING_SOON_SERVICES 
} from '../data/content';
import { 
  Home as HomeIcon, 
  Building2, 
  HardHat, 
  Wind, 
  Truck, 
  Check, 
  ArrowRight, 
  ArrowUpRight,
  ShieldCheck, 
  Clock 
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
    <div className="bg-[#fafbfc] min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimalist Page Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
            Service Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight mt-2">
            Cleaning Programs
          </h1>
          <p className="mt-3 text-slate-500 text-sm sm:text-base leading-relaxed">
            Standardized room-by-room checklists, commercial equipment, and 16 years of proven private housekeeping standards applied to every property.
          </p>

          {/* Minimalist Tab Navigation */}
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'residential', label: 'Residential' },
              { id: 'commercial', label: 'Commercial' },
              { id: 'post-construction', label: 'Post-Construction' },
              { id: 'coming-soon', label: 'Upcoming Services' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-jitto-navy text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200/80 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* RESIDENTIAL SECTION */}
        {(activeTab === 'all' || activeTab === 'residential') && (
          <section className="mb-16">
            <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-jitto-navy flex items-center justify-center shrink-0">
                    <HomeIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-jitto-navy uppercase tracking-wider">01 / Residential</span>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">Residential Cleaning</h2>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onNavigate('residential')}
                    className="text-xs font-medium text-slate-600 hover:text-jitto-navy transition-colors"
                  >
                    View Residential Details →
                  </button>
                  <button
                    onClick={() => {
                      onSelectQuoteService('residential');
                      onNavigate('quote');
                    }}
                    className="bg-jitto-navy hover:bg-jitto-navy-800 text-white font-medium px-4 py-2 rounded-lg text-xs transition-colors"
                  >
                    Request Residential Proposal
                  </button>
                </div>
              </div>

              {/* Unique Image Showcase for Residential */}
              <div className="my-8 rounded-xl overflow-hidden border border-slate-100 h-64 sm:h-80">
                <img 
                  src="/images/residential-living.jpg" 
                  alt="Minimalist clean sunlit living room" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Packages */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {RESIDENTIAL_DETAILS.services.map((item, i) => (
                  <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        {item.badge}
                      </div>
                      <h3 className="font-serif font-bold text-base text-slate-900 mb-1.5">{item.name}</h3>
                      <p className="text-xs text-slate-600 mb-4 leading-relaxed">{item.description}</p>
                      <ul className="space-y-2 mb-6">
                        {item.includes.slice(0, 4).map((inc, incIdx) => (
                          <li key={incIdx} className="text-xs text-slate-600 flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-jitto-navy shrink-0 mt-0.5 stroke-[2.5]" />
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
                      className="text-xs font-semibold text-jitto-navy hover:text-jitto-cyan-600 text-left flex items-center gap-1"
                    >
                      <span>Include in proposal</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* COMMERCIAL SECTION */}
        {(activeTab === 'all' || activeTab === 'commercial') && (
          <section className="mb-16">
            <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-jitto-navy flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-jitto-navy uppercase tracking-wider">02 / Commercial</span>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">Commercial & Office Cleaning</h2>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onNavigate('commercial')}
                    className="text-xs font-medium text-slate-600 hover:text-jitto-navy transition-colors"
                  >
                    View Commercial Details →
                  </button>
                  <button
                    onClick={() => {
                      onSelectQuoteService('commercial');
                      onNavigate('quote');
                    }}
                    className="bg-jitto-navy hover:bg-jitto-navy-800 text-white font-medium px-4 py-2 rounded-lg text-xs transition-colors"
                  >
                    Request Commercial RFP
                  </button>
                </div>
              </div>

              {/* Unique Image Showcase for Commercial */}
              <div className="my-8 rounded-xl overflow-hidden border border-slate-100 h-64 sm:h-80">
                <img 
                  src="/images/commercial-boardroom.jpg" 
                  alt="Minimalist executive boardroom" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Spaces */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {COMMERCIAL_DETAILS.spacesServed.map((s, i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                    <h3 className="font-serif font-bold text-sm text-slate-900 mb-1.5">{s.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* POST-CONSTRUCTION SECTION */}
        {(activeTab === 'all' || activeTab === 'post-construction') && (
          <section className="mb-16">
            <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-jitto-navy flex items-center justify-center shrink-0">
                    <HardHat className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-jitto-navy uppercase tracking-wider">03 / Construction</span>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">Post-Construction Detailing</h2>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onNavigate('post-construction')}
                    className="text-xs font-medium text-slate-600 hover:text-jitto-navy transition-colors"
                  >
                    View Post-Construction Details →
                  </button>
                  <button
                    onClick={() => {
                      onSelectQuoteService('post-construction');
                      onNavigate('quote');
                    }}
                    className="bg-jitto-navy hover:bg-jitto-navy-800 text-white font-medium px-4 py-2 rounded-lg text-xs transition-colors"
                  >
                    Upload Specs For Proposal
                  </button>
                </div>
              </div>

              {/* Unique Image Showcase for Post Construction */}
              <div className="my-8 rounded-xl overflow-hidden border border-slate-100 h-64 sm:h-80">
                <img 
                  src="/images/post-construction-architecture.jpg" 
                  alt="Spotless handover-ready architectural interior" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 3 Phases */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {POST_CONSTRUCTION_DETAILS.phases.map((ph, i) => (
                  <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50/50">
                    <div className="text-[11px] font-mono text-slate-400 font-semibold mb-1">Phase 0{i + 1}</div>
                    <h3 className="font-serif font-bold text-base text-slate-900 mb-1">{ph.phase}</h3>
                    <div className="text-[11px] text-jitto-navy font-semibold mb-2">{ph.timing}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{ph.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* COMING SOON: HVAC & JUNK REMOVAL (UNIQUE PHOTOS) */}
        {(activeTab === 'all' || activeTab === 'coming-soon') && (
          <section className="mb-14">
            <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
              <div className="max-w-2xl mb-8">
                <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
                  Service Expansions
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">
                  Upcoming Simcoe County Capabilities
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Expanding our turnkey property solutions with dedicated duct sanitization and eco-friendly hauling.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* HVAC Unique Card */}
                <div className="rounded-xl border border-slate-200/80 overflow-hidden bg-slate-50/40 flex flex-col justify-between">
                  <div>
                    <div className="h-48 overflow-hidden bg-slate-100">
                      <img 
                        src="/images/hvac-cleaning.jpg" 
                        alt="HVAC and Air Duct Cleaning Service" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-jitto-navy uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-slate-200">
                          Coming Soon
                        </span>
                        <span className="text-xs text-slate-400">Launching Soon</span>
                      </div>
                      <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">HVAC & Air Duct Cleaning</h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        Negative-air HEPA duct collection, furnace blower sanitation, and post-renovation allergen extraction to protect indoor air quality.
                      </p>
                      <div className="space-y-1.5 text-xs text-slate-600">
                        {["Negative air pressure extraction", "Mold & construction dust elimination", "Recommended after drywall and renovations"].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-jitto-navy shrink-0 stroke-[2.5]" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2">
                    <span className="text-xs text-slate-400 italic">Early inquiries welcome in quote notes.</span>
                  </div>
                </div>

                {/* JUNK REMOVAL Unique Card */}
                <div className="rounded-xl border border-slate-200/80 overflow-hidden bg-slate-50/40 flex flex-col justify-between">
                  <div>
                    <div className="h-48 overflow-hidden bg-slate-100">
                      <img 
                        src="/images/junk-removal-service.jpg" 
                        alt="Junk & Debris Removal Service truck and team" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-jitto-navy uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-slate-200">
                          Coming Soon
                        </span>
                        <span className="text-xs text-slate-400">Launching Soon</span>
                      </div>
                      <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">Junk & Debris Removal</h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        Clean hauling and responsible recycling for renovation scrap, trade leftovers, estate cleanouts, and bulky commercial waste.
                      </p>
                      <div className="space-y-1.5 text-xs text-slate-600">
                        {["Heavy lifting & labor included", "Eco-friendly donation and recycling priority", "Broom-clean sweep after every haul"].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-jitto-navy shrink-0 stroke-[2.5]" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2">
                    <span className="text-xs text-slate-400 italic">Early inquiries welcome in quote notes.</span>
                  </div>
                </div>

              </div>

              {/* Priority Notification form */}
              <div className="mt-8 pt-6 border-t border-slate-100 max-w-md">
                <div className="text-xs font-semibold text-slate-900 mb-1">Get Notified At Launch</div>
                <div className="text-xs text-slate-500 mb-3">Join our early notification list for inaugural service announcements.</div>
                {waitlistSuccess ? (
                  <div className="text-xs font-medium text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                    ✓ You are on the priority list.
                  </div>
                ) : (
                  <form onSubmit={handleWaitlistSubmit} className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-jitto-navy"
                    />
                    <button
                      type="submit"
                      className="bg-jitto-navy hover:bg-jitto-navy-800 text-white font-medium px-4 py-2 text-xs rounded-lg transition-colors"
                    >
                      Notify Me
                    </button>
                  </form>
                )}
              </div>

            </div>
          </section>
        )}

      </div>
    </div>
  );
};
