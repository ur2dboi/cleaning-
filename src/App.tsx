import React, { useState, useEffect } from 'react';
import { PageRoute, ServiceCategory } from './types';
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

    // Initial check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Listen for scroll to show scroll-to-top button
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
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 selection:bg-jitto-cyan selection:text-jitto-navy-950">
      
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

      {/* Floating 24/7 Phone & Quote Pill (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        {/* Scroll To Top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-white text-slate-700 shadow-md border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-all hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Floating Quick Action Pill */}
        <div className="bg-jitto-navy-950 text-white p-1.5 rounded-full shadow-2xl border border-jitto-navy-800 flex items-center gap-1.5">
          <a
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="flex items-center gap-2 bg-jitto-cyan text-jitto-navy-950 font-bold text-xs px-3.5 py-2.5 rounded-full hover:bg-jitto-cyan-400 transition-colors shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">24/7 Call: (249) 800-0127</span>
            <span className="sm:hidden">Call 24/7</span>
          </a>

          <button
            onClick={() => navigateTo('quote')}
            className="flex items-center gap-1.5 bg-jitto-navy-800 hover:bg-jitto-navy-700 text-white font-semibold text-xs px-3.5 py-2.5 rounded-full transition-colors border border-jitto-navy-700"
          >
            <Calculator className="w-3.5 h-3.5 text-jitto-cyan" />
            <span>Fast Quote</span>
          </button>
        </div>
      </div>

    </div>
  );
}

export default App;
