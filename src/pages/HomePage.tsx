import React from 'react';
import { PageRoute, ServiceCategory } from '../types';
import { COMPANY_INFO, TESTIMONIALS } from '../data/content';
import { ServicePathCards } from '../components/ServicePathCards';
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Star, 
  Calendar, 
  ListChecks, 
  Camera, 
  Users, 
  MapPin,
  HeartHandshake
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
    <div className="bg-slate-50 min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative bg-jitto-navy-950 text-white overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
        {/* Subtle background glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-jitto-cyan/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-jitto-navy-700/40 rounded-full blur-2xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Top Pill Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-jitto-cyan text-jitto-navy-950 font-bold text-xs uppercase tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                {COMPANY_INFO.status}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-slate-200 border border-white/15 text-xs font-semibold backdrop-blur-sm">
                <MapPin className="w-3.5 h-3.5 text-jitto-cyan" />
                Barrie & Simcoe County
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                <Clock className="w-3.5 h-3.5" />
                24/7 Available
              </span>
            </div>

            {/* Official Tagline Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-serif tracking-tight text-white leading-tight sm:leading-none">
              A CLEANER SPACE. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-jitto-cyan-300 via-jitto-cyan to-jitto-cyan-400">
                MORE TIME FOR WHAT MATTERS.
              </span>
            </h1>

            {/* Tagline Subtitle from flyer */}
            <div className="text-xs sm:text-sm font-bold tracking-[0.25em] text-jitto-cyan-300 uppercase">
              RESIDENTIAL • COMMERCIAL • POST-CONSTRUCTION
            </div>

            {/* Overview paragraph */}
            <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
              Built on <strong>over 16 years of hands-on housekeeping experience</strong>. One dependable, local team for your home, your workplace, and your next construction project.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('quote')}
                className="bg-jitto-cyan hover:bg-jitto-cyan-400 text-jitto-navy-950 font-bold px-7 py-4 rounded-2xl shadow-glow-cyan transition-all text-sm sm:text-base flex items-center gap-2 group"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get Instant Free Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('booking')}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-4 rounded-2xl border border-white/20 transition-all text-sm sm:text-base flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-jitto-cyan" />
                <span>Book A Cleaning Crew</span>
              </button>

              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white px-4 py-3 rounded-xl transition-colors text-sm font-semibold"
              >
                <Phone className="w-4 h-4 text-jitto-cyan" />
                <span>(249) 800-0127</span>
              </a>
            </div>

            {/* Trust Proof Bar */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-slate-300">
              <div className="flex items-center justify-center gap-2">
                <Award className="w-4 h-4 text-jitto-cyan shrink-0" />
                <span>16+ Years Hands-On Experience</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-jitto-cyan shrink-0" />
                <span>Fully Insured & WSIB Covered</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ListChecks className="w-4 h-4 text-jitto-cyan shrink-0" />
                <span>Checklists, Not Guesswork</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Camera className="w-4 h-4 text-jitto-cyan shrink-0" />
                <span>Proof, Not Promises (Photos)</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* THE THREE BIG BOXES NEAR THE TOP (Explicit User Requirement) */}
      <section className="relative -mt-10 sm:-mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 mb-20">
        <ServicePathCards 
          onNavigate={onNavigate}
          onSelectQuoteService={onSelectQuoteService}
        />
      </section>

      {/* WHY CHOOSE JITTO (The 7 Pillars from user prompt) */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-jitto-cyan-700 bg-jitto-cyan-50 px-3 py-1 rounded-full uppercase tracking-wider">
              The Jitto Standard
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-slate-900 mt-3">
              Why Choose Jitto
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Cleaning should be done right the first time, every time. Here is how we make that standard a reality:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Pillar 1 */}
            <div className="bg-slate-50 rounded-3xl p-7 border border-slate-200/80 hover:border-jitto-navy/30 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-jitto-navy text-white flex items-center justify-center font-bold text-lg mb-5 font-serif shadow-sm">
                1
              </div>
              <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">
                Built on 16 Years of Hands-On Housekeeping
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Jitto was founded by a professional housekeeper with over 16 years of experience in private homes. Our standards come from real experience, not a training manual.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-slate-50 rounded-3xl p-7 border border-slate-200/80 hover:border-jitto-navy/30 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-jitto-navy text-white flex items-center justify-center font-bold text-lg mb-5 font-serif shadow-sm">
                2
              </div>
              <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">
                One Team For Your Home, Business & Renovation
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Whether you need weekly home cleaning, an office program, or a post-construction handover, you work with one company and one point of contact.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-slate-50 rounded-3xl p-7 border border-slate-200/80 hover:border-jitto-navy/30 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-jitto-navy text-white flex items-center justify-center font-bold text-lg mb-5 font-serif shadow-sm">
                3
              </div>
              <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">
                Checklists, Not Guesswork
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Every package follows a room-by-room checklist, so nothing is skipped and you know exactly what you're getting.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-slate-50 rounded-3xl p-7 border border-slate-200/80 hover:border-jitto-navy/30 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-jitto-navy text-white flex items-center justify-center font-bold text-lg mb-5 font-serif shadow-sm">
                4
              </div>
              <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">
                Proof, Not Promises
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                For post-construction and listing cleans, we send before-and-after photos and a completed checklist, so you can see the job is done before you arrive.
              </p>
            </div>

            {/* Pillar 5 */}
            <div className="bg-slate-50 rounded-3xl p-7 border border-slate-200/80 hover:border-jitto-navy/30 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-jitto-navy text-white flex items-center justify-center font-bold text-lg mb-5 font-serif shadow-sm">
                5
              </div>
              <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">
                The Same Crew Whenever Possible
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Consistent crews learn your space, your preferences, and what matters to you. No new strangers every visit.
              </p>
            </div>

            {/* Pillar 6 */}
            <div className="bg-slate-50 rounded-3xl p-7 border border-slate-200/80 hover:border-jitto-navy/30 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-jitto-navy text-white flex items-center justify-center font-bold text-lg mb-5 font-serif shadow-sm">
                6
              </div>
              <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">
                You Can Reach The Owners Directly
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Questions or concerns go straight to the people who run Jitto at (249) 800-0127, not an anonymous call centre.
              </p>
            </div>

          </div>

          {/* Pillar 7 Banner */}
          <div className="mt-8 bg-gradient-to-r from-jitto-navy to-jitto-navy-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-jitto-cyan/20 border border-jitto-cyan/40 flex items-center justify-center text-jitto-cyan shrink-0">
                <HeartHandshake className="w-8 h-8" />
              </div>
              <div>
                <div className="text-xs font-bold text-jitto-cyan uppercase tracking-wider">Pillar 7</div>
                <h4 className="text-2xl font-bold font-serif">Local and Accountable</h4>
                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mt-1">
                  Our crews live and work in the communities we serve across Barrie and Simcoe County, and we proudly stand behind every clean.
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <button
                onClick={() => onNavigate('quote')}
                className="bg-jitto-cyan hover:bg-jitto-cyan-400 text-jitto-navy-950 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-glow-cyan"
              >
                Experience The Jitto Clean
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* REAL UNIFORM & STAFF GALLERY */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold text-jitto-cyan-700 bg-jitto-cyan-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Branded Professionalism
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900">
              You Will Always Recognize Our Team
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every Jitto professional arrives on time in our official dark navy polo uniform with our embroidered cyan chevron emblem. We bring hospital-grade disinfectants, commercial HEPA vacuums, and color-coded microfiber tools to eliminate cross-contamination.
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-jitto-cyan-600" />
                <span>100% Criminal Background Checked & Vetted</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-jitto-cyan-600" />
                <span>Covered by Ontario WSIB & $5M Liability Insurance</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-jitto-cyan-600" />
                <span>Trained in delicate surfaces (marble, quartz, hardwood, commercial glass)</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('about')}
                className="text-jitto-navy font-bold text-xs sm:text-sm flex items-center gap-1.5 hover:text-jitto-cyan-600 transition-colors"
              >
                <span>Read Our Full Story & Background</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md group">
              <img 
                src="/images/residential-hero.jpg" 
                alt="Jitto cleaner in navy polo making bed" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-3 bg-white text-xs font-bold text-slate-800">
                Residential Estate Housekeeping
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md group">
              <img 
                src="/images/commercial-hero.jpg" 
                alt="Jitto cleaners in navy polo cleaning office" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-3 bg-white text-xs font-bold text-slate-800">
                Commercial Office & Glass Detailing
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-slate-100/70 py-16 sm:py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-jitto-cyan-700 bg-jitto-cyan-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Client Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 mt-2">
              Trusted Across Barrie & Simcoe County
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div 
                key={t.id}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 italic">
                    "{t.content}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">{t.author}</div>
                    <div className="text-[11px] text-slate-500">{t.role} • {t.location}</div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-jitto-cyan-50 text-jitto-navy">
                    {t.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL 24/7 CTA BANNER */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-jitto-navy-900 rounded-3xl p-8 sm:p-14 text-white text-center shadow-2xl border border-jitto-navy-800 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-block px-3.5 py-1 rounded-full bg-jitto-cyan text-jitto-navy-950 text-xs font-bold uppercase tracking-wider">
              {COMPANY_INFO.status}
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-serif">
              Ready For A Cleaner Space And More Free Time?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Get an instant customized quote in under 60 seconds, or call our direct hotline to book a walkthrough.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('quote')}
                className="bg-jitto-cyan hover:bg-jitto-cyan-400 text-jitto-navy-950 font-bold px-8 py-4 rounded-xl shadow-glow-cyan transition-all text-sm sm:text-base flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Calculate Your Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-4 rounded-xl border border-white/20 transition-all text-sm sm:text-base flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-jitto-cyan" />
                <span>(249) 800-0127 (24/7)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
