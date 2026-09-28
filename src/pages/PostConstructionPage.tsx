import React from 'react';
import { PageRoute } from '../types';
import { COMPANY_INFO, POST_CONSTRUCTION_DETAILS } from '../data/content';
import { 
  HardHat, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Camera, 
  ArrowRight, 
  Phone, 
  Upload, 
  Layers, 
  Award,
  CheckSquare
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
    <div className="bg-slate-50 min-h-screen">
      
      {/* Hero Section */}
      <section className="relative bg-jitto-navy-950 text-white overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <img 
            src="/images/post-construction-team.jpg" 
            alt="Jitto post-construction team wiping down modern home" 
            className="w-full h-full object-cover filter blur-sm"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-jitto-navy-950 via-jitto-navy-900/90 to-jitto-navy-950/70" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <HardHat className="w-4 h-4" />
                <span>For Builders, General Contractors & Renovators</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold font-serif tracking-tight text-white leading-tight">
                Turn Trade Chaos Into A Turnkey Handover.
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                Fine drywall dust, sticker adhesives, paint splatter, and trade debris ruin first impressions. Jitto provides multi-phase post-construction detailing so your project passes <strong>building inspections and client walkthroughs</strong> without delay.
              </p>

              {/* Contractor trust signals */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-semibold text-slate-200">
                <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <Camera className="w-4 h-4 text-jitto-cyan shrink-0" />
                  <span>Before & After Photo Reports</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <Clock className="w-4 h-4 text-jitto-cyan shrink-0" />
                  <span>Rapid 24/48h Turnaround</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-jitto-cyan shrink-0" />
                  <span>WSIB & Comprehensive Insurance</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => {
                    onSelectQuoteService('post-construction');
                    onNavigate('quote');
                  }}
                  className="bg-jitto-cyan hover:bg-jitto-cyan-400 text-jitto-navy-950 font-bold px-6 py-3.5 rounded-xl shadow-glow-cyan transition-all flex items-center gap-2 text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Get Post-Construction Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all text-sm flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-jitto-cyan" />
                  <span>Urgent Handover Hotline: (249) 800-0127</span>
                </a>
              </div>
            </div>

            {/* Right Card / Branded Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
                <img 
                  src="/images/post-construction-home.jpg" 
                  alt="Post-construction handover ready luxury home with sunlight" 
                  className="w-full h-auto object-cover transform hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-jitto-navy-900/90 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-xs text-white">
                  <div className="flex items-center gap-2 font-bold text-jitto-cyan mb-1">
                    <Award className="w-4 h-4" />
                    <span>Handover & Occupancy Ready</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    "Every surface, track, sill, and luxury millwork detailed with commercial HEPA vacuums and scratch-free methods."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The 3 Construction Phases */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-jitto-cyan-700 bg-jitto-cyan-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Phased Detailing Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif mt-3">
            Engineered For Every Stage of Your Build
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Choose individual phases or book our full turnkey 3-phase handover program.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {POST_CONSTRUCTION_DETAILS.phases.map((ph, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-jitto-navy text-white">
                    Step {idx + 1}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Critical Stage</span>
                </div>

                <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">
                  {ph.phase}
                </h3>

                <div className="text-xs font-bold text-jitto-navy bg-jitto-navy-50 px-2.5 py-1 rounded-lg inline-block mb-4">
                  Timing: {ph.timing}
                </div>

                <p className="text-slate-600 text-xs leading-relaxed mb-6">
                  {ph.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    onSelectQuoteService('post-construction');
                    onNavigate('quote');
                  }}
                  className="w-full bg-slate-100 hover:bg-jitto-navy hover:text-white text-slate-900 font-bold py-2.5 px-4 rounded-xl transition-colors text-xs flex items-center justify-center gap-2"
                >
                  <span>Select {ph.phase.split(':')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Proof, Not Promises Showcase */}
      <section className="bg-white py-16 sm:py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-jitto-cyan-700 bg-jitto-cyan-50 px-3 py-1 rounded-full uppercase tracking-wider">
                Proof, Not Promises
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900">
                Time-Stamped Photo Verification For Every Job
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                As a contractor or project manager, you don't have hours to drive out to site just to verify whether the cleaning was actually completed. Before our crew leaves, we upload high-resolution before-and-after photos and a signed inspection signoff sheet straight to your phone or inbox.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-jitto-cyan-600 shrink-0" />
                  <span>Sticker & adhesive scraping without scratching luxury glass or stainless</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-jitto-cyan-600 shrink-0" />
                  <span>Commercial HEPA backpack vacs that trap micro-silica and drywall dust</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-jitto-cyan-600 shrink-0" />
                  <span>Duct register & vent interior wipe-down to prevent dust recirculating</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    onSelectQuoteService('post-construction');
                    onNavigate('quote');
                  }}
                  className="bg-jitto-navy hover:bg-jitto-navy-800 text-white font-bold py-3.5 px-6 rounded-xl shadow transition-colors text-sm flex items-center gap-2"
                >
                  <Upload className="w-4 h-4 text-jitto-cyan" />
                  <span>Upload Blueprints or Site Photos for Quote</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
                <img 
                  src="/images/post-construction-team.jpg" 
                  alt="Jitto post construction clean in progress" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
