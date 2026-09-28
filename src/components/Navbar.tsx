import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { COMPANY_INFO } from '../data/content';
import { PageRoute } from '../types';
import { 
  Phone, 
  Mail, 
  Clock, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  Home as HomeIcon, 
  Building2, 
  HardHat, 
  Wind, 
  Truck, 
  Calculator, 
  Calendar,
  CheckCircle2
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-200 shadow-sm">
      {/* Top Utility Announcement Bar */}
      <div className="bg-jitto-navy-900 text-white text-xs py-2 px-4 border-b border-jitto-navy-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left info badge */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-jitto-cyan text-jitto-navy-950 px-2 py-0.5 rounded-full font-bold text-[11px] tracking-wide animate-pulse">
              <Sparkles className="w-3 h-3" />
              {COMPANY_INFO.status}
            </span>
            <span className="hidden sm:inline text-slate-300">
              Proudly serving Barrie & surrounding areas
            </span>
          </div>

          {/* Right contact pills */}
          <div className="flex items-center gap-4 text-slate-200">
            <div className="flex items-center gap-1.5 text-jitto-cyan-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <Clock className="w-3.5 h-3.5" />
              <span className="font-semibold text-white">24/7 Open</span>
            </div>
            
            <a 
              href={`tel:${COMPANY_INFO.phoneRaw}`} 
              className="flex items-center gap-1 hover:text-jitto-cyan transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-jitto-cyan" />
              <span>{COMPANY_INFO.phone}</span>
            </a>

            <a 
              href={`mailto:${COMPANY_INFO.email}`} 
              className="hidden md:flex items-center gap-1 hover:text-jitto-cyan transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-jitto-cyan" />
              <span>{COMPANY_INFO.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'py-2.5' : 'py-3.5'}`}>
          
          {/* Logo Brand */}
          <Logo 
            variant="transparent" 
            size={scrolled ? 'sm' : 'md'} 
            onClick={() => handleNav('home')} 
          />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-slate-700">
            <button
              onClick={() => handleNav('home')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentPage === 'home' 
                  ? 'text-jitto-navy font-bold bg-slate-100' 
                  : 'hover:text-jitto-navy hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            {/* Services Dropdown */}
            <div className="relative group" onMouseLeave={() => setServicesDropdownOpen(false)}>
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                onMouseEnter={() => setServicesDropdownOpen(true)}
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                  ['services', 'residential', 'commercial', 'post-construction', 'hvac', 'junk-removal'].includes(currentPage)
                    ? 'text-jitto-navy font-bold bg-slate-100'
                    : 'hover:text-jitto-navy hover:bg-slate-50'
                }`}
              >
                <span>Services</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {/* Dropdown Card */}
              {servicesDropdownOpen && (
                <div 
                  className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                >
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5 border-b border-slate-100">
                    Core Specializations
                  </div>

                  <button
                    onClick={() => handleNav('residential')}
                    className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-jitto-cyan-50 text-left transition-colors group/item"
                  >
                    <div className="p-2 rounded-lg bg-jitto-navy-50 text-jitto-navy group-hover/item:bg-jitto-navy group-hover/item:text-white transition-colors">
                      <HomeIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 group-hover/item:text-jitto-navy">Residential Cleaning</div>
                      <div className="text-xs text-slate-500">Regular, deep, & move-in/out for homeowners</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('commercial')}
                    className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-jitto-cyan-50 text-left transition-colors group/item"
                  >
                    <div className="p-2 rounded-lg bg-jitto-navy-50 text-jitto-navy group-hover/item:bg-jitto-navy group-hover/item:text-white transition-colors">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 group-hover/item:text-jitto-navy">Commercial Cleaning</div>
                      <div className="text-xs text-slate-500">Offices, clinics, retail & managed properties</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('post-construction')}
                    className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-jitto-cyan-50 text-left transition-colors group/item"
                  >
                    <div className="p-2 rounded-lg bg-jitto-navy-50 text-jitto-navy group-hover/item:bg-jitto-navy group-hover/item:text-white transition-colors">
                      <HardHat className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 group-hover/item:text-jitto-navy">Post-Construction</div>
                      <div className="text-xs text-slate-500">Dust & debris removal, handover inspection ready</div>
                    </div>
                  </button>

                  <div className="my-1 border-t border-slate-100" />
                  
                  <button
                    onClick={() => handleNav('services')}
                    className="w-full text-center py-2 text-xs font-semibold text-jitto-navy hover:text-jitto-cyan-600 transition-colors"
                  >
                    View All Services & Checklists →
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav('about')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentPage === 'about' 
                  ? 'text-jitto-navy font-bold bg-slate-100' 
                  : 'hover:text-jitto-navy hover:bg-slate-50'
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => handleNav('quote')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                currentPage === 'quote' 
                  ? 'text-jitto-navy font-bold bg-slate-100' 
                  : 'hover:text-jitto-navy hover:bg-slate-50'
              }`}
            >
              <Calculator className="w-4 h-4 text-jitto-cyan-600" />
              <span>Quotation Form</span>
            </button>

            <button
              onClick={() => handleNav('booking')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                currentPage === 'booking' 
                  ? 'text-jitto-navy font-bold bg-slate-100' 
                  : 'hover:text-jitto-navy hover:bg-slate-50'
              }`}
            >
              <Calendar className="w-4 h-4 text-jitto-navy" />
              <span>Booking Form</span>
            </button>

            <button
              onClick={() => handleNav('contact')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentPage === 'contact' 
                  ? 'text-jitto-navy font-bold bg-slate-100' 
                  : 'hover:text-jitto-navy hover:bg-slate-50'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="flex items-center gap-1.5 text-xs font-bold text-jitto-navy px-3 py-2 rounded-lg border border-slate-200 hover:border-jitto-navy/30 hover:bg-slate-50 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-jitto-cyan-600" />
              <span>(249) 800-0127</span>
            </a>

            <button
              onClick={() => handleNav('quote')}
              className="relative group bg-jitto-navy hover:bg-jitto-navy-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm hover:shadow-glow-cyan transition-all duration-200 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-jitto-cyan"></span>
              <span>Get Free Quote</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="p-2 rounded-lg bg-slate-100 text-jitto-navy hover:bg-jitto-cyan-50"
              aria-label="Call Jitto"
            >
              <Phone className="w-5 h-5" />
            </a>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-jitto-navy hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            <button
              onClick={() => handleNav('home')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold ${
                currentPage === 'home' ? 'bg-jitto-navy text-white' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            <div className="pt-2 pb-1 px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Pick Your Cleaning Service
            </div>

            <button
              onClick={() => handleNav('residential')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                currentPage === 'residential' ? 'bg-jitto-navy text-white' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <HomeIcon className="w-4 h-4 text-jitto-cyan" />
              <span>Residential Cleaning (Homeowners)</span>
            </button>

            <button
              onClick={() => handleNav('commercial')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                currentPage === 'commercial' ? 'bg-jitto-navy text-white' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Building2 className="w-4 h-4 text-jitto-cyan" />
              <span>Commercial Cleaning (Offices & Retail)</span>
            </button>

            <button
              onClick={() => handleNav('post-construction')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                currentPage === 'post-construction' ? 'bg-jitto-navy text-white' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <HardHat className="w-4 h-4 text-jitto-cyan" />
              <span>Post-Construction (Contractors)</span>
            </button>

            <button
              onClick={() => handleNav('services')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                currentPage === 'services' ? 'bg-jitto-navy text-white' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-jitto-cyan" />
              <span>All Services & Checklists</span>
            </button>

            <div className="my-2 border-t border-slate-100" />

            <button
              onClick={() => handleNav('quote')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold ${
                currentPage === 'quote' ? 'bg-jitto-navy text-white' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Calculator className="w-4 h-4 text-jitto-cyan-600" />
              <span>Quotation Form (Instant Estimate)</span>
            </button>

            <button
              onClick={() => handleNav('booking')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold ${
                currentPage === 'booking' ? 'bg-jitto-navy text-white' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Calendar className="w-4 h-4 text-jitto-navy" />
              <span>Booking Form (Schedule Clean)</span>
            </button>

            <button
              onClick={() => handleNav('about')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
                currentPage === 'about' ? 'bg-jitto-navy text-white' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              About Us (Our Story & Standards)
            </button>

            <button
              onClick={() => handleNav('contact')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
                currentPage === 'contact' ? 'bg-jitto-navy text-white' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Contact Us & 24/7 Support
            </button>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-200 grid grid-cols-2 gap-2">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-slate-100 text-jitto-navy font-bold text-xs"
            >
              <Phone className="w-4 h-4 text-jitto-cyan-600" />
              <span>Call 24/7</span>
            </a>
            <button
              onClick={() => handleNav('quote')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-jitto-navy text-white font-bold text-xs shadow"
            >
              <span>Instant Quote</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
