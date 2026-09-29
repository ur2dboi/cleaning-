import React, { useState } from 'react';
import type { PageRoute, ServiceCategory } from '../types';
import { COMPANY_INFO, TESTIMONIALS } from '../data/content';
import { ServicePathCards } from '../components/ServicePathCards';
import { 
  ArrowRight, 
  Check, 
  Phone, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  MapPin,
  ListChecks,
  Camera,
  Award,
  Layers,
  ChevronRight,
  Star
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  onSelectQuoteService: (service: ServiceCategory) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onNavigate,
  onSelectQuoteService 
}) => {
  const [activeChecklistTab, setActiveChecklistTab] = useState<'kitchen' | 'bath' | 'living' | 'construction'>('kitchen');

  return (
    <div className="bg-[#fafbfc] min-h-screen">
      
      {/* 1. CINEMATIC LUXURY HERO SECTION */}
      <section className="relative bg-gradient-to-b from-[#030c1c] via-[#061633] to-[#030c1c] text-white pt-10 pb-12 sm:pt-14 sm:pb-16 overflow-hidden">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-jitto-cyan/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-jitto-navy-500/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5 text-left">
              
              {/* Status & Location Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-slate-200">
                <span className="w-2 h-2 rounded-full bg-jitto-cyan animate-pulse" />
                <span className="font-semibold text-white">{COMPANY_INFO.status}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-300">Barrie & Simcoe County</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-[1.1]">
                A cleaner space. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-jitto-cyan via-jitto-cyan-300 to-white">
                  More time for what matters.
                </span>
              </h1>

              {/* Sub-Headline */}
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-light">
                Founded on <strong>over 16 years of hands-on housekeeping experience</strong> in private luxury estates. One dedicated team for your home, your commercial facility, and your next construction handover.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                <button
                  onClick={() => onNavigate('quote')}
                  className="w-full sm:w-auto bg-jitto-cyan hover:bg-jitto-cyan-400 text-jitto-navy-950 font-bold px-6 py-3.5 rounded-xl shadow-glow-cyan transition-all text-sm flex items-center justify-center gap-2 group min-h-[44px]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request Custom Proposal</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('booking')}
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3.5 rounded-xl border border-white/20 transition-all text-sm flex items-center justify-center gap-2 backdrop-blur-sm min-h-[44px]"
                >
                  <span>Reserve Appointment Slot</span>
                </button>

                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 text-slate-300 hover:text-white px-3 py-2.5 transition-colors text-xs sm:text-sm font-semibold min-h-[44px]"
                >
                  <Phone className="w-3.5 h-3.5 text-jitto-cyan" />
                  <span>(249) 800-0127 (24/7)</span>
                </a>
              </div>

              {/* Trust Metric Badges */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-medium text-slate-300">
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-jitto-cyan shrink-0" />
                  <span>16+ Yrs Housekeeping</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-jitto-cyan shrink-0" />
                  <span>Fully Insured & Bonded</span>
                </div>
                <div className="flex items-center gap-2">
                  <ListChecks className="w-3.5 h-3.5 text-jitto-cyan shrink-0" />
                  <span>Room-by-Room Checklists</span>
                </div>
                <div className="flex items-center gap-2">
                  <Camera className="w-3.5 h-3.5 text-jitto-cyan shrink-0" />
                  <span>Photo Proof Verification</span>
                </div>
              </div>

            </div>

            {/* Right Visual Floating Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-jitto-navy-900 group">
                <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-slate-900">
                  <img 
                    src="/images/home-hero-showcase.jpg?v=4" 
                    alt="Pristine luxury home living room with double height windows" 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-jitto-navy-950/70 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Sub-card below photo (unobstructed view on all devices) */}
                <div className="p-4 sm:p-5 bg-jitto-navy-900/95 backdrop-blur-md border-t border-white/10 text-xs text-white">
                  <div className="flex items-center gap-2 font-bold text-jitto-cyan mb-1">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-jitto-cyan" />
                    <span>Real Experience, Not a Manual</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed font-normal">
                    "Consistent, dedicated crews who learn your space, your preferences, and what matters to you."
                  </p>
                </div>
              </div>

              {/* Floating 24/7 Badge */}
              <div className="absolute -top-3 -right-3 bg-jitto-navy-900/95 backdrop-blur-md text-white border border-jitto-cyan/40 px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold z-10">
                <Clock className="w-3.5 h-3.5 text-jitto-cyan animate-pulse" />
                <span>24/7 Barrie Operations</span>
              </div>
            </div>

          </div>

        </div>

        {/* Hero Bottom Accent Divider */}
        <div className="mt-12 sm:mt-16 h-px w-full bg-gradient-to-r from-transparent via-jitto-cyan/25 to-transparent" />
      </section>

      {/* 2. THE THREE BIG BOXES (Core Homepage Pathway Selector) */}
      <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServicePathCards 
          onNavigate={onNavigate}
          onSelectQuoteService={onSelectQuoteService}
        />
      </section>

      {/* SECTION DIVIDER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-slate-200/80" />
          <div className="absolute px-3 bg-[#fafbfc]">
            <div className="w-1.5 h-1.5 rotate-45 border border-slate-300 bg-white" />
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE ROOM-BY-ROOM CHECKLIST EXPLORER */}
      <section className="py-10 sm:py-14 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-xs font-bold text-jitto-navy uppercase tracking-widest">
              Checklists, Not Guesswork
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 mt-1.5">
              Explore Our Standardized Quality Inclusions
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Every package follows an uncompromising room-by-room checklist, so nothing is skipped. Select a room to inspect the exact protocol:
            </p>

            {/* Room Tabs */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {[
                { id: 'kitchen', label: '🍳 Kitchen Detailing' },
                { id: 'bath', label: '🚿 Bathroom Sanitization' },
                { id: 'living', label: '🛋️ Living & Bedrooms' },
                { id: 'construction', label: '🏗️ Post-Construction Dust' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveChecklistTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeChecklistTab === tab.id
                      ? 'bg-jitto-navy text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Box */}
          <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-10 border border-slate-200/90 max-w-5xl mx-auto shadow-sm">
            {activeChecklistTab === 'kitchen' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-center animate-in fade-in duration-200">
                <div className="space-y-3">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900">Kitchen Room-by-Room Standard</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    The heart of your home receives meticulous degreasing and polishing with food-safe solutions.
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {[
                      "Countertops, backsplashes, and quartz islands wiped and sanitized",
                      "Exterior and handle degreasing of all stainless appliances",
                      "Microwave cleaned inside and out, turntable disinfected",
                      "Stainless sink scrubbed, descaled, and drain surround polished",
                      "Cabinet exteriors, handles, and trash bin enclosure wiped",
                      "Hardwood and tile washed on hands and knees around baseboards"
                    ].map((task, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-jitto-navy shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                  <img src="/images/residential-kitchen.jpg" alt="Pristine kitchen island" className="w-full h-64 object-cover" />
                </div>
              </div>
            )}

            {activeChecklistTab === 'bath' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-center animate-in fade-in duration-200">
                <div className="space-y-3">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900">Bathroom Clinical Sanitization</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    Complete disinfection from ceiling vents to floor grout lines.
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {[
                      "Bathtubs, shower stalls, and glass doors descaled and shined streak-free",
                      "Toilet sanitized inside bowl, under rim, pedestal, and surrounding floor",
                      "Vanity top, porcelain sink basins, and chrome faucets polished",
                      "Mirrors and medicine cabinets cleaned without streaks or lint",
                      "Tile grout scrubbed, baseboards washed, and trash emptied",
                      "Fresh linen arrangement and amenities neatened"
                    ].map((task, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-jitto-navy shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                  <img src="/images/residential-bathroom-marble.jpg" alt="Sparkling marble bathroom" className="w-full h-64 object-cover" />
                </div>
              </div>
            )}

            {activeChecklistTab === 'living' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-center animate-in fade-in duration-200">
                <div className="space-y-3">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900">Living Areas & Master Suites</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    Restorative cleanliness that enhances your peace of mind.
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {[
                      "Beds made with crisp hotel-grade precision (linen change on request)",
                      "All furniture, lamps, shelving, and frames hand-dusted",
                      "Window sills, interior tracks, and door frames wiped clean",
                      "Upholstery vacuumed and cushions fluffed and neatened",
                      "Carpets edged and HEPA vacuumed; hardwood damp-mopped",
                      "High-touch light switch plates and door hardware disinfected"
                    ].map((task, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-jitto-navy shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                  <img src="/images/residential-living.jpg" alt="Clean sunlit living room" className="w-full h-64 object-cover" />
                </div>
              </div>
            )}

            {activeChecklistTab === 'construction' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-center animate-in fade-in duration-200">
                <div className="space-y-3">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900">Post-Construction Turnkey Protocol</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    Eliminating sub-micron drywall dust and trade debris before inspection walkthroughs.
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {[
                      "Negative air HEPA extraction of fine airborne drywall and silica dust",
                      "Manufacturer protective stickers, tape, and paint overspray scraped safely",
                      "Window glass and sliding door tracks vacuumed and detailed streak-free",
                      "Inside and outside of all new custom cabinetry vacuumed and wiped",
                      "Ceiling and wall register covers, vents, and light fixtures dusted and wiped clean",
                      "Digital photo verification signoff log sent directly to project managers"
                    ].map((task, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-jitto-navy shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                  <img src="/images/post-construction-team.jpg" alt="Post construction dust elimination" className="w-full h-64 object-cover" />
                </div>
              </div>
            )}

            <div className="mt-6 pt-5 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">All supplies, HEPA equipment, and microfiber provided by Jitto.</span>
              <button
                onClick={() => onNavigate('quote')}
                className="bg-jitto-navy hover:bg-jitto-navy-800 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>Request Custom Proposal With This Checklist</span>
                <ArrowRight className="w-3.5 h-3.5 text-jitto-cyan" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-slate-200/80" />
          <div className="absolute px-3 bg-[#fafbfc]">
            <div className="w-1.5 h-1.5 rotate-45 border border-slate-300 bg-white" />
          </div>
        </div>
      </div>

      {/* 4. WHY CHOOSE JITTO (The 7 Pillars — High-End Luxury Dark Section) */}
      <section className="relative bg-[#030c1c] text-white overflow-hidden">
        {/* Top Dark Divider Line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-jitto-cyan/30 to-transparent" />

        <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono font-bold tracking-widest text-jitto-cyan uppercase">
              The Jitto Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1.5">
              Why Choose Jitto
            </h2>
            <p className="mt-2 text-slate-300 text-xs sm:text-sm leading-relaxed">
              Cleaning should be done right the first time, every time. Seven uncompromising commitments we uphold on every visit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 01 */}
            <div className="p-6 rounded-2xl bg-[#071733]/80 border border-slate-800 hover:border-jitto-cyan/40 transition-colors space-y-2.5">
              <div className="text-xs font-mono font-bold text-jitto-cyan">01 / FOUNDING CRAFT</div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                Built on 16 Years of Hands-On Housekeeping
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Jitto was founded by a professional housekeeper with over 16 years of experience in private homes. Our standards come from real experience, not a generic training manual.
              </p>
            </div>

            {/* 02 */}
            <div className="p-6 rounded-2xl bg-[#071733]/80 border border-slate-800 hover:border-jitto-cyan/40 transition-colors space-y-2.5">
              <div className="text-xs font-mono font-bold text-jitto-cyan">02 / UNIFIED SINGLE CREW</div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                One Team For Home, Business & Renovation
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Whether you need weekly home cleaning, an office janitorial program, post-construction handover, or junk removal, you work with one dependable company and one accountable point of contact.
              </p>
            </div>

            {/* 03 */}
            <div className="p-6 rounded-2xl bg-[#071733]/80 border border-slate-800 hover:border-jitto-cyan/40 transition-colors space-y-2.5">
              <div className="text-xs font-mono font-bold text-jitto-cyan">03 / PRECISION SYSTEM</div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                Checklists, Not Guesswork
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Every package follows a room-by-room checklist, so nothing is skipped and you know exactly what you're getting.
              </p>
            </div>

            {/* 04 */}
            <div className="p-6 rounded-2xl bg-[#071733]/80 border border-slate-800 hover:border-jitto-cyan/40 transition-colors space-y-2.5">
              <div className="text-xs font-mono font-bold text-jitto-cyan">04 / PHOTO VERIFICATION</div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                Proof, Not Promises
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                For post-construction and listing cleans, we send before-and-after photos and a completed checklist, so you can see the job is done before you arrive.
              </p>
            </div>

            {/* 05 */}
            <div className="p-6 rounded-2xl bg-[#071733]/80 border border-slate-800 hover:border-jitto-cyan/40 transition-colors space-y-2.5">
              <div className="text-xs font-mono font-bold text-jitto-cyan">05 / CONSISTENT STAFF</div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                The Same Crew Whenever Possible
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Consistent crews learn your space, your preferences, and what matters to you. No new strangers in your home or facility every visit.
              </p>
            </div>

            {/* 06 */}
            <div className="p-6 rounded-2xl bg-[#071733]/80 border border-slate-800 hover:border-jitto-cyan/40 transition-colors space-y-2.5">
              <div className="text-xs font-mono font-bold text-jitto-cyan">06 / DIRECT LEADERSHIP</div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                You Can Reach The Owners Directly
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Questions or concerns go straight to the people who run Jitto at (249) 800-0127, not an outsourced call centre.
              </p>
            </div>

          </div>

          {/* 07 Full Width Card */}
          <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-jitto-navy-800 via-jitto-navy-900 to-[#071733] border border-jitto-cyan/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-xl">
            <div>
              <div className="text-xs font-mono font-bold text-jitto-cyan mb-1">07 / COMMUNITY ACCOUNTABILITY</div>
              <h4 className="font-serif font-bold text-xl sm:text-2xl text-white">Local and Accountable Across Simcoe County</h4>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mt-1">
                Our crews live and work in the communities we serve. We stand behind every clean with comprehensive liability insurance, vetted staff, and personal oversight.
              </p>
            </div>

            <button
              onClick={() => onNavigate('quote')}
              className="bg-jitto-cyan hover:bg-jitto-cyan-400 text-jitto-navy-950 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-glow-cyan shrink-0"
            >
              Request Custom Proposal
            </button>
          </div>

        </div>

        {/* Bottom Dark Divider Line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-jitto-cyan/30 to-transparent" />
      </section>

      {/* 5. PROFESSIONAL STANDARDS & TRUSTED CARE SHOWCASE */}
      <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-bold text-jitto-navy uppercase tracking-widest">
              Professional Standards & Integrity
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900">
              Cleaners You Can Trust In Your Private Space
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
              Every team member is rigorously background-checked, arrives equipped with commercial HEPA vacuums and specialized microfiber supplies, and brings a discreet, respectful presence to your home or facility.
            </p>

            <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-jitto-cyan/15 text-jitto-cyan-700 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>100% Criminal Background Checked & Vetted</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-jitto-cyan/15 text-jitto-cyan-700 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Comprehensive Commercial & Residential Liability Insurance</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-jitto-cyan/15 text-jitto-cyan-700 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Careful treatment of custom cabinetry, luxury stone, and hardwood</span>
              </div>
            </div>

            <div className="pt-1">
              <button
                onClick={() => onNavigate('about')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors inline-flex items-center gap-1.5"
              >
                <span>Read Our Heritage & Background</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Dedicated image 1: home-residential-detail.jpg */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-card bg-white group flex flex-col justify-between">
              <div className="h-64 sm:h-72 overflow-hidden bg-slate-900">
                <img 
                  src="/images/home-residential-detail.jpg?v=4" 
                  alt="Spotless luxury modern residential kitchen detailing" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 border-t border-slate-100 bg-white">
                <div className="text-xs font-bold text-slate-900">Residential Housekeeping Detailing</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Trained in 16+ years of estate housekeeping standards</div>
              </div>
            </div>

            {/* Dedicated image 2: home-commercial-workspace.jpg */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-card bg-white group flex flex-col justify-between">
              <div className="h-64 sm:h-72 overflow-hidden bg-slate-900">
                <img 
                  src="/images/home-commercial-workspace.jpg?v=4" 
                  alt="Pristine corporate office workspace" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 border-t border-slate-100 bg-white">
                <div className="text-xs font-bold text-slate-900">Corporate & Facility Upkeep</div>
                <div className="text-[11px] text-slate-500 mt-0.5">High-touch sanitization and glass shine</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-slate-200/80" />
          <div className="absolute px-3 bg-[#fafbfc]">
            <div className="w-1.5 h-1.5 rotate-45 border border-slate-300 bg-white" />
          </div>
        </div>
      </div>

      {/* 6. VERIFIED TESTIMONIALS */}
      <section className="py-10 sm:py-14 bg-slate-100/70 border-t border-slate-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-2xs text-[11px] font-bold text-slate-700 mb-2.5">
              <span className="text-amber-500 font-bold">★★★★★</span>
              <span>5.0 Star Verified Google Reviews</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 mt-1">
              Trusted Across Barrie & Simcoe County
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1.5">
              Real feedback from local homeowners and families we are proud to serve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div 
                key={t.id}
                className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white shadow-card flex flex-col justify-between space-y-5"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-medium text-slate-400">{t.date}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal italic">
                    "{t.content}"
                  </p>
                </div>

                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{t.author}</div>
                    <div className="text-xs text-slate-600 flex flex-wrap items-center gap-1.5 mt-1">
                      <span className="inline-flex items-center gap-1 font-semibold text-jitto-navy bg-slate-100 border border-slate-200/60 px-2 py-0.5 rounded text-[11px]">
                        <MapPin className="w-3 h-3 text-jitto-cyan-600 shrink-0" />
                        {t.location}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] text-slate-500">{t.role}</span>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 shrink-0">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. MINIMALIST 24/7 FOOTER CTA */}
      <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-jitto-navy via-jitto-navy-900 to-[#030c1c] rounded-2xl p-6 sm:p-12 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <span className="text-xs font-mono tracking-widest text-jitto-cyan uppercase font-bold">
              24/7 Operations • Simcoe County
            </span>

            <h2 className="text-2xl sm:text-4xl font-serif font-bold">
              Ready for a cleaner space?
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
              Request a custom proposal with zero obligation, or speak directly to company leadership today.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 pt-1">
              <button
                onClick={() => onNavigate('quote')}
                className="w-full sm:w-auto min-h-[44px] flex items-center justify-center bg-jitto-cyan hover:bg-jitto-cyan-400 text-jitto-navy-950 font-bold px-7 py-3.5 rounded-xl transition-all text-sm shadow-glow-cyan"
              >
                Request Custom Proposal
              </button>

              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="w-full sm:w-auto min-h-[44px] flex items-center justify-center border border-white/20 hover:border-white/40 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm"
              >
                Call: (249) 800-0127 (24/7)
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
