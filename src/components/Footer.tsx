import React from 'react';
import { Logo } from './Logo';
import { COMPANY_INFO } from '../data/content';
import type { PageRoute } from '../types';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowUpRight 
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
    <footer className="bg-[#0b1528] text-slate-400 border-t border-slate-800">
      
      {/* Upper Subtle Footer Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-jitto-cyan uppercase">
            Founded on 16 Years Hands-On Experience
          </span>
          <h3 className="font-serif font-bold text-xl text-white mt-0.5">
            Jitto Cleaning Services
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <a
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="text-xs font-semibold text-white hover:text-jitto-cyan transition-colors px-3 py-2.5 min-h-[44px] flex items-center justify-center rounded-lg bg-slate-800/60 border border-slate-700/60"
          >
            (249) 800-0127 (24/7)
          </a>

          <button
            onClick={() => handleNav('quote')}
            className="bg-white hover:bg-slate-100 text-slate-900 font-medium text-xs px-4 py-2.5 min-h-[44px] rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Request Proposal</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand & Contact */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="dark" size="sm" onClick={() => handleNav('home')} />
            
            <p className="text-xs text-slate-400 leading-relaxed pr-6 mt-2">
              Jitto was built on one simple idea: cleaning should be done right the first time, every time. Founded by a professional housekeeper with over 16 years of hands-on experience in private homes, we serve residences, businesses, and construction sites across Barrie and Simcoe County.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-jitto-cyan shrink-0" />
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="hover:text-jitto-cyan">
                  (249) 800-0127 (24/7 Available)
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-jitto-cyan shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-jitto-cyan">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-jitto-cyan shrink-0" />
                <span>Barrie & Simcoe County, Ontario</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition-colors">
                  All Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('quote')} className="hover:text-white transition-colors">
                  Quotation Form
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('booking')} className="hover:text-white transition-colors">
                  Booking Form
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                  About Us (16 Years)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Specializations */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider">Pathways</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('residential')} className="hover:text-white transition-colors">
                  Residential Housekeeping
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('commercial')} className="hover:text-white transition-colors">
                  Commercial & Offices
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('post-construction')} className="hover:text-white transition-colors">
                  Post-Construction Detailing
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('junk-removal')} className="hover:text-white transition-colors">
                  Junk & Debris Removal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Service Area */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider">Simcoe County</h4>
            <div className="flex flex-wrap gap-1 text-[11px]">
              {COMPANY_INFO.serviceAreas.map((area) => (
                <span key={area} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                  {area}
                </span>
              ))}
            </div>
            <div className="pt-2 text-[11px] text-slate-500">
              Fully insured & bonded across Simcoe County, Ontario.
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All Rights Reserved.
          </div>

          <div className="flex items-center gap-3">
            <span>Checklists, Not Guesswork</span>
            <span>•</span>
            <span>Proof, Not Promises</span>
            <span>•</span>
            <span>24/7 Operations</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
