import React from 'react';
import { PageRoute } from '../types';
import { COMPANY_INFO, RESIDENTIAL_DETAILS } from '../data/content';
import { 
  Home as HomeIcon, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Heart, 
  ArrowRight, 
  Phone, 
  Calendar, 
  ListChecks,
  Smile,
  BadgeCheck
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
    <div className="bg-slate-50 min-h-screen">
      
      {/* Hero Section */}
      <section className="relative bg-jitto-navy-950 text-white overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img 
            src="/images/residential-hero.jpg" 
            alt="Jitto Housekeeper smoothing bed" 
            className="w-full h-full object-cover filter blur-sm"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-jitto-navy-950 via-jitto-navy-900/90 to-jitto-navy-950/70" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-jitto-cyan/15 border border-jitto-cyan/30 text-jitto-cyan text-xs font-bold uppercase tracking-wider">
                <HomeIcon className="w-4 h-4" />
                <span>For Homeowners & Families</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold font-serif tracking-tight text-white leading-tight">
                Warm, Trustworthy Care For Your Sanctuary.
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                Founded on <strong>over 16 years of hands-on housekeeping experience in private homes</strong>. We bring the warmth, discretion, and perfectionism of estate-level housekeeping to your residence in Barrie and Simcoe County.
              </p>

              {/* Trust highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-semibold text-slate-200">
                <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <BadgeCheck className="w-4 h-4 text-jitto-cyan shrink-0" />
                  <span>The Same Crew Each Clean</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-jitto-cyan shrink-0" />
                  <span>Fully Insured & WSIB</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <ListChecks className="w-4 h-4 text-jitto-cyan shrink-0" />
                  <span>Room-by-Room Checklists</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => {
                    onSelectQuoteService('residential');
                    onNavigate('quote');
                  }}
                  className="bg-jitto-cyan hover:bg-jitto-cyan-400 text-jitto-navy-950 font-bold px-6 py-3.5 rounded-xl shadow-glow-cyan transition-all flex items-center gap-2 text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Get Residential Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('booking')}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all text-sm flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-jitto-cyan" />
                  <span>Book Cleaning Schedule</span>
                </button>
              </div>
            </div>

            {/* Right Card / Branded Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
                <img 
                  src="/images/residential-hero.jpg" 
                  alt="Jitto professional cleaner in uniform making bed" 
                  className="w-full h-auto object-cover transform hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-jitto-navy-900/90 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-xs text-white">
                  <div className="flex items-center gap-2 font-bold text-jitto-cyan mb-1">
                    <Heart className="w-4 h-4 fill-jitto-cyan" />
                    <span>Real Experience, Not a Manual</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    "Every surface in your home is treated with the gentle respect of a high-end private residence."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3 Residential Service Offerings */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-jitto-cyan-700 bg-jitto-cyan-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Tailored Housekeeping Programs
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif mt-3">
            Choose The Level of Clean You Need
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            From regular weekly upkeep to deep seasonal renewals and moving turnovers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RESIDENTIAL_DETAILS.services.map((srv, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-jitto-navy text-white">
                    {srv.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{srv.cadence}</span>
                </div>

                <h3 className="text-2xl font-bold font-serif text-slate-900 mb-2">
                  {srv.name}
                </h3>

                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  {srv.description}
                </p>

                <div className="border-t border-slate-100 pt-4 mb-6">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    What's Included:
                  </div>
                  <ul className="space-y-2.5">
                    {srv.includes.map((task, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-jitto-cyan-600 shrink-0 mt-0.5" />
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
                className="w-full bg-slate-100 hover:bg-jitto-navy hover:text-white text-slate-900 font-bold py-3 px-4 rounded-xl transition-colors text-xs flex items-center justify-center gap-2"
              >
                <span>Customize This Clean</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Room-by-Room Checklist Showcase */}
      <section className="bg-white py-16 sm:py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold text-jitto-cyan-700 bg-jitto-cyan-50 px-3 py-1 rounded-full uppercase tracking-wider">
                Checklists, Not Guesswork
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900">
                You Know Exactly What You Are Getting
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                No rushed corners or skipped chores. Our housekeepers follow a comprehensive room-by-room standardized checklist on every appointment. You can request changes or add special instructions at any time.
              </p>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="font-bold text-sm text-slate-900">Why Barrie Homeowners Love Jitto:</div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-jitto-cyan-600 shrink-0" />
                  <span>The same cleaning crew gets assigned to your home whenever possible</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-jitto-cyan-600 shrink-0" />
                  <span>No contracts required — cancel or reschedule with ease</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-jitto-cyan-600 shrink-0" />
                  <span>Speak directly to the owners at (249) 800-0127</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectQuoteService('residential');
                  onNavigate('quote');
                }}
                className="bg-jitto-navy hover:bg-jitto-navy-800 text-white font-bold px-6 py-3.5 rounded-xl shadow transition-colors text-sm flex items-center gap-2"
              >
                <span>Calculate Your Home's Rate</span>
                <ArrowRight className="w-4 h-4 text-jitto-cyan" />
              </button>
            </div>

            {/* Checklist items breakdown */}
            <div className="lg:col-span-7 space-y-4">
              {RESIDENTIAL_DETAILS.checklist.map((col, idx) => (
                <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <h4 className="font-bold font-serif text-slate-900 text-lg mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-jitto-cyan" />
                    <span>{col.category} Checklist</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                    {col.tasks.map((task, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* Real Kitchen Image Feature */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-jitto-navy-900 rounded-3xl overflow-hidden shadow-2xl border border-jitto-navy-800 text-white grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="p-8 sm:p-14 space-y-6">
            <span className="text-xs font-bold text-jitto-cyan uppercase tracking-wider">
              16 Years of Private Housekeeping Experience
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-serif">
              A Cleaner Space. More Time For What Matters.
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Spend your weekends enjoying Lake Simcoe, spending time with family, or simply resting in an immaculate home that smells fresh and sparkles from floor to ceiling.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  onSelectQuoteService('residential');
                  onNavigate('quote');
                }}
                className="bg-jitto-cyan hover:bg-jitto-cyan-400 text-jitto-navy-950 font-bold px-6 py-3.5 rounded-xl shadow-glow-cyan transition-all text-sm flex items-center gap-2"
              >
                <span>Book Your Residential Clean</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="h-80 lg:h-full relative overflow-hidden">
            <img 
              src="/images/residential-kitchen.jpg" 
              alt="Immaculate modern kitchen island" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

    </div>
  );
};
