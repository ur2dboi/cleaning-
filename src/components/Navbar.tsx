import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { COMPANY_INFO } from '../data/content';
import type { PageRoute } from '../types';
import { 
  Phone, 
  Menu, 
  X, 
  ChevronDown, 
  Home as HomeIcon, 
  Building2, 
  HardHat, 
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
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200">
      {/* Sleek Minimalist Top Utility Bar */}
      <div className="bg-[#0b1528] text-slate-300 text-[11px] py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium text-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-jitto-cyan" />
              {COMPANY_INFO.status}
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400">Barrie & Simcoe County</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px]">
            <span className="hidden md:inline text-slate-400">24/7 Operations:</span>
            <a 
              href={`tel:${COMPANY_INFO.phoneRaw}`} 
              className="text-white hover:text-jitto-cyan transition-colors font-semibold flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-jitto-cyan" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href={`tel:${COMPANY_INFO.phoneSecondaryRaw}`} 
              className="text-slate-300 hover:text-jitto-cyan transition-colors font-medium flex items-center gap-1"
            >
              <span>{COMPANY_INFO.phoneSecondary}</span>
              <span className="text-[10px] text-jitto-cyan font-mono">(Client Line)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-200 ${scrolled ? 'py-2.5' : 'py-3.5'}`}>
          
          {/* Official Logo */}
          <Logo 
            variant="transparent" 
            size={scrolled ? 'sm' : 'md'} 
            onClick={() => handleNav('home')} 
          />

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-1 text-xs font-medium text-slate-600">
            <button
              onClick={() => handleNav('home')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentPage === 'home' 
                  ? 'text-slate-900 font-semibold bg-slate-100/70' 
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            {/* Services Dropdown */}
            <div className="relative group" onMouseLeave={() => setServicesDropdownOpen(false)}>
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                onMouseEnter={() => setServicesDropdownOpen(true)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  ['services', 'residential', 'commercial', 'post-construction', 'junk-removal'].includes(currentPage)
                    ? 'text-slate-900 font-semibold bg-slate-100/70'
                    : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-150" />
              </button>

              {servicesDropdownOpen && (
                <div 
                  className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-lg border border-slate-200/80 p-2 z-50 animate-in fade-in duration-100"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                >
                  <button
                    onClick={() => handleNav('residential')}
                    className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-left transition-colors"
                  >
                    <HomeIcon className="w-4 h-4 text-jitto-navy shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900 text-xs">Residential Cleaning</div>
                      <div className="text-[11px] text-slate-500">Regular, deep, & move-in/out</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('commercial')}
                    className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-left transition-colors"
                  >
                    <Building2 className="w-4 h-4 text-jitto-navy shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900 text-xs">Commercial Cleaning</div>
                      <div className="text-[11px] text-slate-500">Offices, clinics, retail & facilities</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('post-construction')}
                    className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-left transition-colors"
                  >
                    <HardHat className="w-4 h-4 text-jitto-navy shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900 text-xs">Post-Construction</div>
                      <div className="text-[11px] text-slate-500">Dust removal, inspection ready</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('junk-removal')}
                    className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-left transition-colors"
                  >
                    <Truck className="w-4 h-4 text-jitto-navy shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900 text-xs">Junk & Debris Removal</div>
                      <div className="text-[11px] text-slate-500">Hauling, estate cleanouts & donation</div>
                    </div>
                  </button>

                  <div className="my-1 border-t border-slate-100" />
                  
                  <button
                    onClick={() => handleNav('services')}
                    className="w-full text-center py-1.5 text-[11px] font-semibold text-jitto-navy hover:text-jitto-cyan-600 transition-colors"
                  >
                    Explore All Services & Programs →
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav('about')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentPage === 'about' 
                  ? 'text-slate-900 font-semibold bg-slate-100/70' 
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => handleNav('quote')}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                currentPage === 'quote' 
                  ? 'text-slate-900 font-semibold bg-slate-100/70' 
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-jitto-navy" />
              <span>Quotation Form</span>
            </button>

            <button
              onClick={() => handleNav('booking')}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                currentPage === 'booking' 
                  ? 'text-slate-900 font-semibold bg-slate-100/70' 
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-jitto-navy" />
              <span>Booking Form</span>
            </button>

            <button
              onClick={() => handleNav('contact')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentPage === 'contact' 
                  ? 'text-slate-900 font-semibold bg-slate-100/70' 
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Desktop Right Action */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="text-right text-xs leading-tight">
              <div>
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="font-bold text-slate-900 hover:text-jitto-navy transition-colors"
                >
                  {COMPANY_INFO.phone}
                </a>
                <span className="text-[10px] text-slate-500 ml-1 font-medium">Ops</span>
              </div>
              <div>
                <a
                  href={`tel:${COMPANY_INFO.phoneSecondaryRaw}`}
                  className="text-slate-600 hover:text-jitto-navy text-[11px] transition-colors"
                >
                  {COMPANY_INFO.phoneSecondary}
                </a>
                <span className="text-[9px] text-slate-500 ml-1 font-medium">Client</span>
              </div>
            </div>

            <button
              onClick={() => handleNav('quote')}
              className="bg-jitto-navy hover:bg-jitto-navy-800 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm"
            >
              Request Proposal
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Call"
            >
              <Phone className="w-4 h-4" />
            </a>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in fade-in duration-150">
          <div className="space-y-1 text-xs font-medium text-slate-700">
            <button
              onClick={() => handleNav('home')}
              className={`w-full text-left px-3 py-2.5 min-h-[44px] flex items-center rounded-lg ${
                currentPage === 'home' ? 'bg-slate-100 font-semibold text-slate-900' : 'hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            <div className="pt-2 pb-1 px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Pathways
            </div>

            <button
              onClick={() => handleNav('residential')}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 min-h-[44px] rounded-lg hover:bg-slate-50 text-slate-800"
            >
              <HomeIcon className="w-4 h-4 text-jitto-navy" />
              <span>Residential Cleaning</span>
            </button>

            <button
              onClick={() => handleNav('commercial')}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 min-h-[44px] rounded-lg hover:bg-slate-50 text-slate-800"
            >
              <Building2 className="w-4 h-4 text-jitto-navy" />
              <span>Commercial Cleaning</span>
            </button>

            <button
              onClick={() => handleNav('post-construction')}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 min-h-[44px] rounded-lg hover:bg-slate-50 text-slate-800"
            >
              <HardHat className="w-4 h-4 text-jitto-navy" />
              <span>Post-Construction Detailing</span>
            </button>

            <button
              onClick={() => handleNav('junk-removal')}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 min-h-[44px] rounded-lg hover:bg-slate-50 text-slate-800"
            >
              <Truck className="w-4 h-4 text-jitto-navy" />
              <span>Junk & Debris Removal</span>
            </button>

            <button
              onClick={() => handleNav('services')}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 min-h-[44px] rounded-lg hover:bg-slate-50 text-slate-800"
            >
              <CheckCircle2 className="w-4 h-4 text-jitto-navy" />
              <span>All Services & Programs</span>
            </button>

            <div className="my-2 border-t border-slate-100" />

            <button
              onClick={() => handleNav('quote')}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 min-h-[44px] rounded-lg hover:bg-slate-50 font-semibold text-jitto-navy"
            >
              <Calculator className="w-4 h-4 text-jitto-navy" />
              <span>Quotation Form</span>
            </button>

            <button
              onClick={() => handleNav('booking')}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 min-h-[44px] rounded-lg hover:bg-slate-50 text-slate-800"
            >
              <Calendar className="w-4 h-4 text-jitto-navy" />
              <span>Booking Form</span>
            </button>

            <button
              onClick={() => handleNav('about')}
              className="w-full text-left px-3 py-2.5 min-h-[44px] flex items-center rounded-lg hover:bg-slate-50 text-slate-800"
            >
              About Us
            </button>

            <button
              onClick={() => handleNav('contact')}
              className="w-full text-left px-3 py-2.5 min-h-[44px] flex items-center rounded-lg hover:bg-slate-50 text-slate-800"
            >
              Contact Us & 24/7 Operations
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="flex-1 text-center py-2.5 min-h-[44px] flex items-center justify-center rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold"
            >
              Call (249) 800-0127 (24/7)
            </a>
            <a
              href={`tel:${COMPANY_INFO.phoneSecondaryRaw}`}
              className="flex-1 text-center py-2.5 min-h-[44px] flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold"
            >
              Call/Text: (437) 447-5020
            </a>
            <button
              onClick={() => handleNav('quote')}
              className="flex-1 py-2.5 min-h-[44px] flex items-center justify-center rounded-lg bg-jitto-navy text-white text-xs font-semibold"
            >
              Request Proposal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
