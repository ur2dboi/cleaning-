import React, { useState } from 'react';
import type { PageRoute, ServiceCategory } from '../types';
import { 
  RESIDENTIAL_DETAILS, 
  COMMERCIAL_DETAILS, 
  POST_CONSTRUCTION_DETAILS,
  JUNK_REMOVAL_DETAILS 
} from '../data/content';
import { 
  Home as HomeIcon, 
  Building2, 
  HardHat, 
  Truck,
  Check, 
  ArrowRight,
  Sparkles,
  Recycle,
  ShieldCheck
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageRoute) => void;
  onSelectQuoteService: (service: ServiceCategory) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ 
  onNavigate,
  onSelectQuoteService 
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'residential' | 'commercial' | 'post-construction' | 'junk-removal'>('all');

  return (
    <div className="bg-[#fafbfc] min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimalist Page Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
            Service Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight mt-2">
            Professional Cleaning & Hauling Programs
          </h1>
          <p className="mt-3 text-slate-500 text-sm sm:text-base leading-relaxed">
            Standardized room-by-room checklists, commercial equipment, and 16 years of proven housekeeping standards applied to every property and project.
          </p>

          {/* Minimalist Tab Navigation */}
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'residential', label: 'Residential' },
              { id: 'commercial', label: 'Commercial' },
              { id: 'post-construction', label: 'Post-Construction' },
              { id: 'junk-removal', label: 'Junk Removal' },
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

              {/* Unique Image Showcase */}
              <div className="my-8 rounded-xl overflow-hidden border border-slate-100 h-64 sm:h-80">
                <img 
                  src="/images/services-residential-home.jpg" 
                  alt="Minimalist clean Scandinavian residential interior" 
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

              {/* Unique Image Showcase */}
              <div className="my-8 rounded-xl overflow-hidden border border-slate-100 h-64 sm:h-80">
                <img 
                  src="/images/services-commercial-lobby.jpg" 
                  alt="Modern executive corporate reception lobby with polished stone floor" 
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

              {/* Unique Image Showcase */}
              <div className="my-8 rounded-xl overflow-hidden border border-slate-100 h-64 sm:h-80">
                <img 
                  src="/images/services-post-construction.jpg" 
                  alt="Spotless handover-ready architectural interior great room" 
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

        {/* JUNK & DEBRIS REMOVAL SECTION (ACTIVE SERVICE) */}
        {(activeTab === 'all' || activeTab === 'junk-removal') && (
          <section className="mb-14">
            <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-jitto-navy flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-jitto-navy uppercase tracking-wider">04 / Hauling & Cleanout</span>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">Junk & Debris Removal</h2>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onNavigate('junk-removal')}
                    className="text-xs font-medium text-slate-600 hover:text-jitto-navy transition-colors"
                  >
                    View Junk Removal Details →
                  </button>
                  <button
                    onClick={() => {
                      onSelectQuoteService('junk-removal');
                      onNavigate('quote');
                    }}
                    className="bg-jitto-navy hover:bg-jitto-navy-800 text-white font-medium px-4 py-2 rounded-lg text-xs transition-colors"
                  >
                    Request Hauling Proposal
                  </button>
                </div>
              </div>

              {/* Unique Image Showcase: junk-removal-service.jpg */}
              <div className="my-8 rounded-xl overflow-hidden border border-slate-100 h-64 sm:h-80">
                <img 
                  src="/images/junk-removal-service.jpg?v=4" 
                  alt="Junk & Debris Removal Service truck and team loading items" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Hauling Programs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {JUNK_REMOVAL_DETAILS.services.map((svc, i) => (
                  <div key={i} className="p-5 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        {svc.badge}
                      </div>
                      <h3 className="font-serif font-bold text-base text-slate-900 mb-1">{svc.name}</h3>
                      <div className="text-[11px] text-jitto-navy font-semibold mb-2">{svc.timing}</div>
                      <p className="text-xs text-slate-600 mb-4 leading-relaxed">{svc.description}</p>
                      <ul className="space-y-2 mb-6">
                        {svc.includes.map((inc, incIdx) => (
                          <li key={incIdx} className="text-xs text-slate-600 flex items-start gap-2">
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
                      className="text-xs font-semibold text-jitto-navy hover:text-jitto-cyan-600 text-left flex items-center gap-1"
                    >
                      <span>Include in proposal</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Feature Highlights Row */}
              <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-jitto-navy shrink-0" />
                  <span><strong>Broom-Swept Finish:</strong> Area cleaned spotless after loading</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Recycle className="w-4 h-4 text-jitto-navy shrink-0" />
                  <span><strong>Eco-Diversion:</strong> Simcoe County donation & recycling priority</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-jitto-navy shrink-0" />
                  <span><strong>Fully Insured & Protected:</strong> Heavy lifting crew included</span>
                </div>
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
