import React from 'react';
import { Logo } from './Logo';
import { COMPANY_INFO } from '../data/content';
import { PageRoute } from '../types';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle, 
  ArrowUpRight,
  Sparkles,
  Heart
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: PageRoute) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-jitto-navy-950 text-slate-300 border-t border-jitto-navy-800">
      {/* Top Banner inside Footer */}
      <div className="bg-jitto-navy-900 border-b border-jitto-navy-800/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-jitto-cyan/20 border border-jitto-cyan/40 flex items-center justify-center text-jitto-cyan shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="text-white font-bold text-lg">Fully Insured & WSIB Registered</div>
              <p className="text-slate-400 text-sm">Founded on 16 years of hands-on housekeeping. Proudly serving Barrie & Simcoe County.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="flex items-center gap-2 bg-jitto-navy-800 hover:bg-jitto-navy-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl border border-jitto-navy-700 transition-colors"
            >
              <Phone className="w-4 h-4 text-jitto-cyan" />
              <span>(249) 800-0127</span>
            </a>

            <button
              onClick={() => handleNav('quote')}
              className="flex items-center gap-2 bg-jitto-cyan hover:bg-jitto-cyan-400 text-jitto-navy-950 font-bold text-sm px-5 py-2.5 rounded-xl shadow-glow-cyan transition-all"
            >
              <span>Get Free Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand & Story */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="dark" size="md" onClick={() => handleNav('home')} />
            
            <p className="text-sm text-slate-400 leading-relaxed pr-6 mt-3">
              Jitto was built on one simple idea: cleaning should be done right the first time, every time. Our founders bring over 16 years of hands-on cleaning experience to homes, businesses, and construction sites across Barrie and Simcoe County.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-jitto-cyan/15 text-jitto-cyan border border-jitto-cyan/30">
                <Sparkles className="w-3 h-3" />
                {COMPANY_INFO.status}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                <Clock className="w-3 h-3" />
                24/7 Open & Available
              </span>
            </div>

            {/* Direct Contact */}
            <div className="pt-2 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-jitto-cyan shrink-0" />
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="hover:text-jitto-cyan font-semibold">
                  (249) 800-0127
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-jitto-cyan shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-jitto-cyan">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-jitto-cyan shrink-0" />
                <span>Barrie & Simcoe County, Ontario</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation (6 Core Pages) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-jitto-cyan transition-colors text-left">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-jitto-cyan transition-colors text-left">
                  All Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('quote')} className="hover:text-jitto-cyan transition-colors text-left flex items-center gap-1">
                  <span>Quotation Form</span>
                  <span className="text-[10px] bg-jitto-cyan/20 text-jitto-cyan px-1.5 py-0.5 rounded font-bold">Fast</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('booking')} className="hover:text-jitto-cyan transition-colors text-left">
                  Booking Form
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-jitto-cyan transition-colors text-left">
                  About Us (16 Years)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-jitto-cyan transition-colors text-left">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Dedicated Cleaning Paths */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNav('residential')} className="hover:text-jitto-cyan transition-colors text-left">
                  Residential Cleaning
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('commercial')} className="hover:text-jitto-cyan transition-colors text-left">
                  Commercial & Offices
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('post-construction')} className="hover:text-jitto-cyan transition-colors text-left">
                  Post-Construction Clean
                </button>
              </li>
              <li className="pt-2 text-xs font-semibold text-slate-400">Coming Soon:</li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-jitto-cyan text-slate-400 transition-colors text-left flex items-center gap-1.5">
                  <span>HVAC & Duct Cleaning</span>
                  <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1 py-0.5 rounded">Soon</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-jitto-cyan text-slate-400 transition-colors text-left flex items-center gap-1.5">
                  <span>Junk & Debris Removal</span>
                  <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1 py-0.5 rounded">Soon</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Service Areas */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Service Areas</h4>
            <p className="text-xs text-slate-400">Serving Barrie and surrounding Simcoe County communities:</p>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {COMPANY_INFO.serviceAreas.map((area) => (
                <span key={area} className="px-2 py-1 rounded bg-jitto-navy-900 border border-jitto-navy-800 text-slate-300">
                  {area}
                </span>
              ))}
            </div>
            <div className="pt-2">
              <span className="text-xs text-jitto-cyan">Need service outside this zone? Call to check availability.</span>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="mt-12 pt-8 border-t border-jitto-navy-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>Checklists, Not Guesswork</span>
            <span>•</span>
            <span>Proof, Not Promises</span>
            <span>•</span>
            <span>24/7 Service</span>
          </div>

          <div className="text-slate-400">
            Proudly Built for Vercel, GitHub & Live Preview
          </div>
        </div>
      </div>
    </footer>
  );
};
