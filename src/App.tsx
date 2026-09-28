import React, { useState, useEffect } from 'react';
import type { PageRoute, ServiceCategory } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ResidentialPage } from './pages/ResidentialPage';
import { CommercialPage } from './pages/CommercialPage';
import { PostConstructionPage } from './pages/PostConstructionPage';
import { QuotationPage } from './pages/QuotationPage';
import { BookingPage } from './pages/BookingPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { COMPANY_INFO } from './data/content';
import { Phone, Calculator, ArrowUp } from 'lucide-react';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [quoteService, setQuoteService] = useState<ServiceCategory>('residential');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Sync route with URL hash for Vercel, GitHub, and browser history
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '').toLowerCase();
      if (['home', 'services', 'residential', 'commercial', 'post-construction', 'quote', 'booking', 'about', 'contact'].includes(hash)) {
        setCurrentPage(hash as PageRoute);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page: PageRoute) => {
    setCurrentPage(page);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectQuoteService = (service: ServiceCategory) => {
    setQuoteService(service);
    navigateTo('quote');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc] font-sans text-slate-800 selection:bg-jitto-cyan selection:text-jitto-navy-950">
      
      {/* Top Navbar */}
      <Navbar 
        currentPage={currentPage} 
        onNavigate={navigateTo} 
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage 
            onNavigate={navigateTo} 
            onSelectQuoteService={handleSelectQuoteService} 
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage 
            onNavigate={navigateTo} 
            onSelectQuoteService={handleSelectQuoteService} 
          />
        )}

        {currentPage === 'residential' && (
          <ResidentialPage 
            onNavigate={navigateTo} 
            onSelectQuoteService={handleSelectQuoteService} 
          />
        )}

        {currentPage === 'commercial' && (
          <CommercialPage 
            onNavigate={navigateTo} 
            onSelectQuoteService={handleSelectQuoteService} 
          />
        )}

        {currentPage === 'post-construction' && (
          <PostConstructionPage 
            onNavigate={navigateTo} 
            onSelectQuoteService={handleSelectQuoteService} 
          />
        )}

        {currentPage === 'quote' && (
          <QuotationPage 
            onNavigate={navigateTo} 
            preselectedService={quoteService} 
          />
        )}

        {currentPage === 'booking' && (
          <BookingPage 
            onNavigate={navigateTo} 
          />
        )}

        {currentPage === 'about' && (
          <AboutPage 
            onNavigate={navigateTo} 
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage 
            onNavigate={navigateTo} 
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Discreet Minimalist Floating Pill (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full bg-white text-slate-700 shadow-sm border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all hover:scale-105"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <div className="bg-[#0b1528] text-white p-1 rounded-full shadow-lg border border-slate-700/60 flex items-center gap-1">
          <a
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full hover:text-jitto-cyan transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-jitto-cyan" />
            <span className="hidden sm:inline">(249) 800-0127</span>
            <span className="sm:hidden">24/7 Call</span>
          </a>

          <button
            onClick={() => navigateTo('quote')}
            className="bg-white hover:bg-slate-100 text-slate-900 font-medium text-xs px-3 py-1.5 rounded-full transition-colors"
          >
            Proposal
          </button>
        </div>
      </div>

    </div>
  );
}

export default App;
