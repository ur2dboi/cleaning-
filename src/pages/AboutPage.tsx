import React from 'react';
import type { PageRoute } from '../types';
import { COMPANY_INFO } from '../data/content';
import { 
  ShieldCheck, 
  ArrowRight, 
  UserCheck, 
  MapPin, 
  Check,
  Sparkles,
  Building2,
  CheckCircle2
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#fafbfc] min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimalist Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
            Our Founders & Story
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight mt-2">
            About Jitto Cleaning Services
          </h1>
          <p className="mt-4 text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
            Jitto brings together two founders with very different backgrounds. One has spent over 16 years as a professional housekeeper in private luxury homes, where every detail is noticed. The other is a professional engineer and seasoned real estate investor who has bought, sold, and managed properties for years, and understands what it takes to get a space ready for the next owner or tenant.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-12 border border-slate-200/80 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
                Why We Started Jitto
              </span>
              
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 leading-snug">
                Where Private Estate Detail Meets Engineering & Turnover Precision.
              </h2>

              <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
                Jitto brings together two founders with very different backgrounds. One has spent over 16 years as a professional housekeeper in private luxury homes, where every detail is noticed. The other is a professional engineer and seasoned real estate investor who has bought, sold, and managed properties for years, and understands what it takes to get a space ready for the next owner or tenant.
              </p>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                We started Jitto to solve the common frustration property owners, businesses, and managers experience: having to chase cleaners, inspect behind them, or deal with rotating strangers who miss the details that matter.
              </p>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Whether it's a weekly luxury home clean, an executive office that needs to look its best, or a newly built property requiring flawless handover, we show up on time, communicate clearly, and treat every space like our own.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs text-slate-700">
                <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-jitto-navy" />
                  Fully Insured & Bonded
                </span>
                <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg font-medium">
                  <UserCheck className="w-3.5 h-3.5 text-jitto-navy" />
                  Background-Checked Team
                </span>
                <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg font-medium">
                  <MapPin className="w-3.5 h-3.5 text-jitto-navy" />
                  Barrie & Simcoe County
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-slate-200/80 shadow-sm">
                <img 
                  src="/images/about-housekeeping-heritage.jpg?v=4" 
                  alt="Spotless private residence dining room reflecting 16+ years of housekeeping heritage" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="mt-2 text-center text-[11px] text-slate-400">
                Founded on 16+ years of meticulous luxury housekeeping and engineering property management in Simcoe County.
              </div>
            </div>

          </div>
        </div>

        {/* Two Founders Synergy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          
          {/* Founder 1 */}
          <div className="p-7 rounded-2xl bg-gradient-to-br from-white to-slate-50/60 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold tracking-widest text-jitto-navy uppercase bg-slate-100 px-2.5 py-1 rounded-md">
                FOUNDER 01 / CRAFT & DETAIL
              </span>
              <Sparkles className="w-5 h-5 text-jitto-navy" />
            </div>
            
            <h3 className="font-serif font-bold text-xl text-slate-900">
              16+ Years as a Professional Housekeeper in Private Luxury Homes
            </h3>
            
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Has spent over 16 years as a professional housekeeper in private luxury homes, where every detail is noticed. This background brings an instinctive eye for finish protection, delicate stone and wood care, and the high-touch discretion required in high-end private residences.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-200/60 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-jitto-navy shrink-0" />
                <span>Obsessive attention to micro-details & high-touch surfaces</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-jitto-navy shrink-0" />
                <span>Surface-safe chemistry & specialized finish knowledge</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-jitto-navy shrink-0" />
                <span>Private estate discretion & founder-led crew training</span>
              </div>
            </div>
          </div>

          {/* Founder 2 */}
          <div className="p-7 rounded-2xl bg-gradient-to-br from-white to-slate-50/60 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold tracking-widest text-jitto-navy uppercase bg-slate-100 px-2.5 py-1 rounded-md">
                FOUNDER 02 / SYSTEMS & OPERATIONS
              </span>
              <Building2 className="w-5 h-5 text-jitto-navy" />
            </div>
            
            <h3 className="font-serif font-bold text-xl text-slate-900">
              Professional Engineer & Seasoned Real Estate Investor
            </h3>
            
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              A professional engineer and seasoned real estate investor who has bought, sold, and managed properties for years, and understands what it takes to get a space ready for the next owner or tenant. Applies engineering systems to quality control, turnover schedules, and contractor timelines.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-200/60 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-jitto-navy shrink-0" />
                <span>Investor perspective on property value & tenant turnover</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-jitto-navy shrink-0" />
                <span>Engineering rigor applied to checklists & quality inspection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-jitto-navy shrink-0" />
                <span>Operational reliability & handover readiness for builders</span>
              </div>
            </div>
          </div>

        </div>

        {/* WHY CHOOSE JITTO (The 7 Pillars) */}
        <div className="mb-16">
          <div className="max-w-2xl mb-12">
            <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
              Core Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">
              Why Choose Jitto
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
              <div className="font-mono text-xs font-bold text-slate-400">01 / DIVERSE HERITAGE</div>
              <h3 className="font-serif font-bold text-base text-slate-900">
                16+ Years Luxury Housekeeping & Engineering Precision
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Jitto brings together 16+ years of private luxury housekeeping where every detail is noticed with engineering discipline and real estate property turnover expertise.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
              <div className="font-mono text-xs font-bold text-slate-400">02 / UNIFIED</div>
              <h3 className="font-serif font-bold text-base text-slate-900">
                One Team For Your Home, Business & Renovation
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Whether you need weekly home cleaning, an office program, or a post-construction handover, you work with one company and one point of contact.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
              <div className="font-mono text-xs font-bold text-slate-400">03 / CHECKLISTS</div>
              <h3 className="font-serif font-bold text-base text-slate-900">
                Checklists, Not Guesswork
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Every package follows a room-by-room checklist, so nothing is skipped and you know exactly what you're getting.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
              <div className="font-mono text-xs font-bold text-slate-400">04 / PROOF</div>
              <h3 className="font-serif font-bold text-base text-slate-900">
                Proof, Not Promises
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                For post-construction and listing cleans, we send before-and-after photos and a completed checklist, so you can see the job is done before you arrive.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
              <div className="font-mono text-xs font-bold text-slate-400">05 / FAMILIARITY</div>
              <h3 className="font-serif font-bold text-base text-slate-900">
                The Same Crew Whenever Possible
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Consistent crews learn your space, your preferences, and what matters to you. No new strangers every visit.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
              <div className="font-mono text-xs font-bold text-slate-400">06 / ACCESS</div>
              <h3 className="font-serif font-bold text-base text-slate-900">
                You Can Reach The Owners Directly
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Questions or concerns go straight to the people who run Jitto at (249) 800-0127, not an anonymous call centre.
              </p>
            </div>

          </div>

          <div className="mt-8 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="font-mono text-xs font-bold text-slate-400">07 / ACCOUNTABILITY</div>
              <h4 className="font-serif font-bold text-lg text-slate-900">Local and Accountable Across Simcoe County</h4>
              <p className="text-slate-600 text-xs max-w-2xl mt-0.5">
                Our crews live and work in the communities we serve, and we stand behind every clean.
              </p>
            </div>

            <button
              onClick={() => onNavigate('quote')}
              className="w-full sm:w-auto min-h-[44px] flex items-center justify-center bg-jitto-navy hover:bg-jitto-navy-800 text-white font-medium px-5 py-2.5 rounded-xl text-xs transition-colors shrink-0"
            >
              Request Proposal
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
