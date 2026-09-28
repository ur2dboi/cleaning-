import React from 'react';
import type { PageRoute, ServiceCategory } from '../types';
import { COMPANY_INFO, TESTIMONIALS } from '../data/content';
import { ServicePathCards } from '../components/ServicePathCards';
import { 
  ArrowUpRight, 
  ArrowRight, 
  Check, 
  Phone, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  MapPin
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  onSelectQuoteService: (service: ServiceCategory) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onNavigate,
  onSelectQuoteService 
}) => {
  return (
    <div className="bg-[#fafbfc] min-h-screen">
      
      {/* MINIMALIST EDITORIAL HERO */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-4xl space-y-8">
            
            {/* Minimalist Top Tags */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500">
              <span className="inline-flex items-center gap-1.5 text-jitto-navy font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-jitto-cyan" />
                {COMPANY_INFO.status}
              </span>
              <span>/</span>
              <span>Barrie & Simcoe County</span>
              <span>/</span>
              <span className="text-slate-400">24/7 Operations</span>
            </div>

            {/* Confident Minimalist Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-slate-900 tracking-tight leading-[1.08]">
              A cleaner space. <br />
              <span className="text-jitto-navy">More time for what matters.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
              Founded on <strong>over 16 years of hands-on housekeeping experience</strong>. One dependable, accountable team for your home, your workplace, and your next construction handover.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('quote')}
                className="bg-jitto-navy hover:bg-jitto-navy-800 text-white font-medium px-6 py-3.5 rounded-xl transition-all text-xs sm:text-sm flex items-center gap-2 group shadow-sm"
              >
                <span>Request Custom Proposal</span>
                <ArrowRight className="w-4 h-4 text-jitto-cyan group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('booking')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium px-6 py-3.5 rounded-xl transition-colors text-xs sm:text-sm"
              >
                Reserve Appointment Slot
              </button>

              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-jitto-navy transition-colors px-2 py-3"
              >
                (249) 800-0127 (24/7)
              </a>
            </div>

            {/* Quiet Minimalist Metrics */}
            <div className="pt-8 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-slate-600">
              <div>
                <div className="font-serif font-bold text-lg sm:text-xl text-slate-900">16+ Years</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Private Housekeeping Standards</div>
              </div>
              <div>
                <div className="font-serif font-bold text-lg sm:text-xl text-slate-900">100% Insured</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Commercial & WSIB Coverage</div>
              </div>
              <div>
                <div className="font-serif font-bold text-lg sm:text-xl text-slate-900">Verified Crew</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Same Staff Whenever Possible</div>
              </div>
              <div>
                <div className="font-serif font-bold text-lg sm:text-xl text-slate-900">Photo Proof</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Checklist & Time-Stamped Signoff</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* THE THREE BIG BOXES (Primary Navigation Path) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServicePathCards 
          onNavigate={onNavigate}
          onSelectQuoteService={onSelectQuoteService}
        />
      </section>

      {/* WHY CHOOSE JITTO (Minimalist Editorial Layout) */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-16">
            <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
              The Jitto Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-2">
              Why Choose Jitto
            </h2>
            <p className="mt-3 text-slate-500 text-sm sm:text-base leading-relaxed">
              Cleaning should be done right the first time, every time. Seven uncompromising principles that set our work apart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
            
            {/* 01 */}
            <div className="space-y-2.5">
              <div className="font-mono text-xs font-bold text-slate-400">01 / EXPERIENCE</div>
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Built on 16 Years of Hands-On Housekeeping
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Jitto was founded by a professional housekeeper with over 16 years of experience in private homes. Our standards come from real experience, not a training manual.
              </p>
            </div>

            {/* 02 */}
            <div className="space-y-2.5">
              <div className="font-mono text-xs font-bold text-slate-400">02 / INTEGRATION</div>
              <h3 className="font-serif font-bold text-lg text-slate-900">
                One Team For Your Home, Business & Renovation
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Whether you need weekly home cleaning, an office program, or a post-construction handover, you work with one company and one point of contact.
              </p>
            </div>

            {/* 03 */}
            <div className="space-y-2.5">
              <div className="font-mono text-xs font-bold text-slate-400">03 / PRECISION</div>
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Checklists, Not Guesswork
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Every package follows a room-by-room checklist, so nothing is skipped and you know exactly what you're getting.
              </p>
            </div>

            {/* 04 */}
            <div className="space-y-2.5">
              <div className="font-mono text-xs font-bold text-slate-400">04 / VERIFICATION</div>
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Proof, Not Promises
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                For post-construction and listing cleans, we send before-and-after photos and a completed checklist, so you can see the job is done before you arrive.
              </p>
            </div>

            {/* 05 */}
            <div className="space-y-2.5">
              <div className="font-mono text-xs font-bold text-slate-400">05 / FAMILIARITY</div>
              <h3 className="font-serif font-bold text-lg text-slate-900">
                The Same Crew Whenever Possible
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Consistent crews learn your space, your preferences, and what matters to you. No new strangers every visit.
              </p>
            </div>

            {/* 06 */}
            <div className="space-y-2.5">
              <div className="font-mono text-xs font-bold text-slate-400">06 / ACCOUNTABILITY</div>
              <h3 className="font-serif font-bold text-lg text-slate-900">
                You Can Reach The Owners Directly
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Questions or concerns go straight to the people who run Jitto at (249) 800-0127, not an anonymous call centre.
              </p>
            </div>

          </div>

          {/* 07 Banner */}
          <div className="mt-14 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="font-mono text-xs font-bold text-slate-400 mb-1">07 / COMMUNITY</div>
              <h4 className="font-serif font-bold text-xl text-slate-900">Local and Accountable Across Simcoe County</h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1">
                Our crews live and work in the communities we serve, and we stand behind every clean with full insurance, WSIB, and personal oversight.
              </p>
            </div>

            <button
              onClick={() => onNavigate('quote')}
              className="text-xs font-bold text-jitto-navy hover:text-jitto-cyan-600 transition-colors flex items-center gap-1 shrink-0"
            >
              <span>Request Custom Proposal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* UNIQUE VISUAL SHOWCASE: RESIDENTIAL & COMMERCIAL REAL SPACES */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
              Immaculate Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
              Cleaners You Can Be Proud To Welcome Into Your Space
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Every technician wears our official dark navy polo uniform with embroidered insignia, arrives equipped with commercial HEPA vacuums and color-coded microfiber supplies, and brings a discreet, respectful presence.
            </p>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-jitto-navy shrink-0">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span>100% Criminal Background Checked & Vetted</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-jitto-navy shrink-0">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span>Ontario WSIB & $5M Comprehensive Commercial Liability</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-jitto-navy shrink-0">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span>Careful treatment of custom cabinetry, luxury stone, and hardwood</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('about')}
                className="text-xs font-bold text-jitto-navy hover:text-jitto-cyan-600 transition-colors flex items-center gap-1.5"
              >
                <span>Read Our Heritage & Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Unique image 1: cleaner uniform detail */}
            <div className="rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-sm">
              <img 
                src="/images/cleaner-uniform-detail.jpg" 
                alt="Jitto professional cleaner in dark navy polo uniform" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4 border-t border-slate-100 text-xs font-medium text-slate-800">
                Official Navy Uniform & Vetted Staff
              </div>
            </div>

            {/* Unique image 2: commercial boardroom */}
            <div className="rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-sm">
              <img 
                src="/images/commercial-boardroom.jpg" 
                alt="Immaculate corporate boardroom" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4 border-t border-slate-100 text-xs font-medium text-slate-800">
                Executive Commercial Detailing
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* MINIMALIST TESTIMONIALS */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-12">
            <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
              Client Experiences
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-2">
              Feedback Across Simcoe County
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div 
                key={t.id}
                className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex flex-col justify-between space-y-6"
              >
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  "{t.content}"
                </p>

                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-slate-900">{t.author}</div>
                    <div className="text-[11px] text-slate-500">{t.role} • {t.location}</div>
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                    {t.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* MINIMALIST 24/7 FOOTER CTA */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-jitto-navy rounded-2xl p-8 sm:p-14 text-white text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="text-[11px] font-mono tracking-widest text-jitto-cyan uppercase">
              24/7 Service • Simcoe County
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold">
              Ready for a cleaner space?
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
              Request a custom proposal with zero obligation, or speak directly to company leadership today.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('quote')}
                className="bg-white hover:bg-slate-100 text-jitto-navy font-semibold px-6 py-3 rounded-xl transition-all text-xs sm:text-sm"
              >
                Request Custom Proposal
              </button>

              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="border border-white/20 hover:border-white/40 text-white font-medium px-6 py-3 rounded-xl transition-colors text-xs sm:text-sm"
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
