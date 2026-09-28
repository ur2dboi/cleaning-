import React from 'react';
import { PageRoute } from '../types';
import { COMPANY_INFO } from '../data/content';
import { 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Users, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight,
  Award,
  Layers,
  FileCheck,
  Building,
  UserCheck
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-jitto-cyan-50 border border-jitto-cyan-200 text-jitto-navy text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-jitto-cyan-600" />
            Our Heritage & Standards
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-serif">
            About Jitto Cleaning Services
          </h1>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Built on one simple idea: cleaning should be done right the first time, every time.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200 shadow-sm mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-jitto-cyan-700 bg-jitto-cyan-50 px-3 py-1 rounded-full uppercase tracking-wider">
                Our Story & The Problem We Solve
              </span>
              
              <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-slate-900 leading-snug">
                Founded By A Professional Housekeeper With Over 16 Years Of Experience
              </h2>

              <p className="text-slate-600 text-base leading-relaxed">
                Jitto was founded by a professional housekeeper with over 16 years of hands-on experience in private luxury homes. Our standards come from <strong>real, meticulous experience</strong>, not a corporate training manual.
              </p>

              <p className="text-slate-600 text-sm leading-relaxed">
                We started Jitto to solve the universal frustration homeowners and business managers face: having to chase cleaners, inspect behind them, or constantly deal with rotating strangers who miss the details that matter.
              </p>

              <p className="text-slate-600 text-sm leading-relaxed">
                Whether it's a weekly home clean, an office that needs to look its best, or a new build that needs to be ready for handover, we show up on time, communicate clearly, and treat every space like our own.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-jitto-cyan-600" />
                  Fully Insured & WSIB
                </span>
                <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl">
                  <UserCheck className="w-4 h-4 text-jitto-cyan-600" />
                  Background-Checked Team
                </span>
                <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl">
                  <MapPin className="w-4 h-4 text-jitto-cyan-600" />
                  Proudly Local (Barrie & Simcoe)
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
                <img 
                  src="/images/residential-hero.jpg" 
                  alt="Jitto housekeeper in navy uniform smoothing bed" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="mt-3 text-center text-xs text-slate-500 italic">
                Official Jitto navy uniform with embroidered logo — worn on every visit.
              </div>
            </div>

          </div>
        </div>

        {/* WHY CHOOSE JITTO (The 7 Pillars from user prompt) */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-jitto-cyan-700 bg-jitto-cyan-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 mt-2">
              Why Choose Jitto
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              The seven reasons Barrie homeowners, businesses, and contractors trust us with their keys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-jitto-navy-50 text-jitto-navy flex items-center justify-center font-bold text-base mb-4">
                1
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-2">
                Built on 16 Years of Hands-On Housekeeping
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Jitto was founded by a professional housekeeper with over 16 years of experience in private homes. Our standards come from real experience, not a generic training manual.
              </p>
            </div>

            {/* 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-jitto-navy-50 text-jitto-navy flex items-center justify-center font-bold text-base mb-4">
                2
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-2">
                One Team For Your Home, Business & Renovation
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Whether you need weekly home cleaning, an office janitorial program, or a post-construction handover, you work with one company and one dependable point of contact.
              </p>
            </div>

            {/* 3 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-jitto-navy-50 text-jitto-navy flex items-center justify-center font-bold text-base mb-4">
                3
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-2">
                Checklists, Not Guesswork
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Every package follows a room-by-room checklist, so nothing is skipped and you know exactly what you're getting on every single visit.
              </p>
            </div>

            {/* 4 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-jitto-navy-50 text-jitto-navy flex items-center justify-center font-bold text-base mb-4">
                4
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-2">
                Proof, Not Promises
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                For post-construction and listing cleans, we send before-and-after photos and a completed checklist, so you can see the job is done before you arrive.
              </p>
            </div>

            {/* 5 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-jitto-navy-50 text-jitto-navy flex items-center justify-center font-bold text-base mb-4">
                5
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-2">
                The Same Crew Whenever Possible
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Consistent crews learn your space, your preferences, and what matters to you. No new strangers in your home or facility every visit.
              </p>
            </div>

            {/* 6 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-jitto-navy-50 text-jitto-navy flex items-center justify-center font-bold text-base mb-4">
                6
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900 mb-2">
                You Can Reach The Owners Directly
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Questions or concerns go straight to the people who run Jitto at (249) 800-0127, not an outsourced call centre.
              </p>
            </div>

            {/* 7 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow md:col-span-2 lg:col-span-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-jitto-navy-50 text-jitto-navy flex items-center justify-center font-bold text-base shrink-0">
                    7
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-slate-900 mb-1">
                      Local and Accountable
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed max-w-3xl">
                      Our crews live and work in the Simcoe County communities we serve. We stand behind every clean with our Jitto satisfaction guarantee.
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  <span className="text-xs font-bold text-jitto-cyan-700 bg-jitto-cyan-50 px-3 py-1.5 rounded-lg border border-jitto-cyan-200 inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    24/7 Available For Scheduling
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Commercial Team Photo Callout */}
        <div className="bg-jitto-navy-900 rounded-3xl p-8 sm:p-12 text-white border border-jitto-navy-800 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-jitto-cyan uppercase tracking-wider">
              Uniformed & Professional Team
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif">
              Cleaners You Can Be Proud To Welcome Into Your Space
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Every technician wears the official navy Jitto polo, arrives with state-of-the-art cleaning carts and HEPA filtration equipment, and undergoes rigorous background screening.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('quote')}
                className="bg-jitto-cyan hover:bg-jitto-cyan-400 text-jitto-navy-950 font-bold px-6 py-3 rounded-xl text-xs transition-colors"
              >
                Get Free Custom Quote
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 rounded-xl text-xs border border-white/20 transition-colors"
              >
                Contact Founders Directly
              </button>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/15">
            <img 
              src="/images/commercial-hero.jpg" 
              alt="Jitto team members in official uniform" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
