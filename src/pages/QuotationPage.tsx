import React, { useState } from 'react';
import { PageRoute, ServiceCategory } from '../types';
import { COMPANY_INFO } from '../data/content';
import confetti from 'canvas-confetti';
import { 
  Calculator, 
  Home as HomeIcon, 
  Building2, 
  HardHat, 
  CheckCircle2, 
  Sparkles, 
  Upload, 
  Image as ImageIcon, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Phone, 
  Mail, 
  ArrowRight, 
  RotateCcw, 
  FileText,
  DollarSign,
  AlertCircle
} from 'lucide-react';

interface QuotationPageProps {
  onNavigate: (page: PageRoute) => void;
  preselectedService?: ServiceCategory;
}

export const QuotationPage: React.FC<QuotationPageProps> = ({ 
  onNavigate, 
  preselectedService = 'residential' 
}) => {
  // Step 1: Selected Service
  const [selectedService, setSelectedService] = useState<ServiceCategory>(preselectedService);

  // Residential State
  const [bedrooms, setBedrooms] = useState<string>('3');
  const [bathrooms, setBathrooms] = useState<string>('2');
  const [homeSqFt, setHomeSqFt] = useState<string>('1500-2200');
  const [resFrequency, setResFrequency] = useState<string>('bi-weekly');
  const [resAddons, setResAddons] = useState<string[]>(['baseboards']);

  // Commercial State
  const [businessType, setBusinessType] = useState<string>('Office');
  const [commSqFt, setCommSqFt] = useState<string>('1500-3500');
  const [preferredHours, setPreferredHours] = useState<string>('After Hours (Evenings)');
  const [commFrequency, setCommFrequency] = useState<string>('3x-week');
  const [commAddons, setCommAddons] = useState<string[]>(['restrooms', 'trash']);

  // Post-Construction State
  const [projectType, setProjectType] = useState<string>('Custom Single-Family Home');
  const [projectSqFt, setProjectSqFt] = useState<string>('2500');
  const [constructionStage, setConstructionStage] = useState<string>('Final Detail Clean');
  const [finishDate, setFinishDate] = useState<string>(
    new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0]
  );
  const [dustLevel, setDustLevel] = useState<string>('Moderate Drywall & Sawdust');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    '/images/post-construction-home.jpg'
  ]);

  // Contact Details
  const [contactName, setContactName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [propertyAddress, setPropertyAddress] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('Barrie');
  const [clientNotes, setClientNotes] = useState<string>('');

  // Submission State
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [quoteReference, setQuoteReference] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Toggle addons
  const toggleResAddon = (id: string) => {
    setResAddons(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleCommAddon = (id: string) => {
    setCommAddons(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Simulated Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        newUrls.push(URL.createObjectURL(files[i]));
      }
      setUploadedPhotos(prev => [...prev, ...newUrls]);
    }
  };

  // Estimate Calculation Logic
  const calculateEstimate = () => {
    if (selectedService === 'residential') {
      let base = 135;
      const bedNum = parseInt(bedrooms) || 1;
      const bathNum = parseFloat(bathrooms) || 1;
      base += (bedNum - 1) * 25;
      base += (bathNum - 1) * 35;

      if (homeSqFt === '2200-3200') base += 45;
      if (homeSqFt === '3200+') base += 90;

      // Add-ons
      base += resAddons.length * 35;

      // Frequency discount
      let discount = 1;
      let label = 'per visit';
      if (resFrequency === 'weekly') { discount = 0.80; label = 'per week (20% off)'; }
      else if (resFrequency === 'bi-weekly') { discount = 0.85; label = 'per visit (15% off)'; }
      else if (resFrequency === 'monthly') { discount = 0.90; label = 'per visit (10% off)'; }
      else if (resFrequency === 'move-in-out') { base += 95; label = 'one-time turnover'; }
      else if (resFrequency === 'deep-clean') { base += 75; label = 'one-time deep clean'; }

      const finalLow = Math.round((base * discount) * 0.95);
      const finalHigh = Math.round((base * discount) * 1.15);
      return { low: finalLow, high: finalHigh, unit: label };
    } 
    else if (selectedService === 'commercial') {
      let base = 280;
      if (commSqFt === '1500-3500') base = 420;
      if (commSqFt === '3501-7000') base = 750;
      if (commSqFt === '7001+') base = 1200;

      if (commFrequency === 'daily') base *= 3.8;
      else if (commFrequency === '3x-week') base *= 2.4;
      else if (commFrequency === 'weekly') base *= 1.0;

      const low = Math.round(base * 0.9);
      const high = Math.round(base * 1.2);
      return { low, high, unit: 'per month estimate' };
    } 
    else {
      // Post construction: based on sqft
      const sqft = parseInt(projectSqFt) || 2000;
      let ratePerSqFt = 0.35;
      if (constructionStage === 'Rough Clean') ratePerSqFt = 0.22;
      if (constructionStage === 'Touch-Up Handover') ratePerSqFt = 0.20;
      if (constructionStage === 'Full 3-Phase Package') ratePerSqFt = 0.55;

      const total = Math.round(sqft * ratePerSqFt);
      const low = Math.round(total * 0.9);
      const high = Math.round(total * 1.15);
      return { low, high, unit: 'total project estimate' };
    }
  };

  const estimate = calculateEstimate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const refNum = `JITTO-${Math.floor(100000 + Math.random() * 900000)}`;
      setQuoteReference(refNum);
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 120, behavior: 'smooth' });

      // Celebrate
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00c2cb', '#012d6c', '#38bdf8', '#ffffff']
      });
    }, 600);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-jitto-cyan-50 border border-jitto-cyan-200 text-jitto-navy text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-jitto-cyan-600" />
            Fast & Transparent Pricing
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-serif">
            Get Your Instant Customized Quote
          </h1>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            One smart form that asks the exact questions for your space. No generic guesswork, no hidden fees.
          </p>
        </div>

        {/* SUCCESS STATE */}
        {isSubmitted ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-bold mb-3">
              REFERENCE #{quoteReference}
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 mb-2">
              Thank You, {contactName || 'Valued Client'}!
            </h2>
            <p className="text-slate-600 mb-6">
              We've received your <strong className="capitalize">{selectedService}</strong> quote request. A member of our local Barrie team will review your specifications and confirm your customized rate within <strong>2 hours</strong>.
            </p>

            {/* Estimated range card */}
            <div className="bg-jitto-navy-50 rounded-2xl p-6 border border-jitto-navy-100 text-left mb-8">
              <div className="text-xs font-bold text-jitto-navy uppercase tracking-wider mb-1">
                Estimated Price Guidance
              </div>
              <div className="text-3xl font-extrabold text-jitto-navy font-serif">
                ${estimate.low} - ${estimate.high} <span className="text-sm font-sans font-normal text-slate-600">CAD ({estimate.unit})</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                *Final rate is confirmed by Jitto management based on exact room-by-room checklist and walkthrough details.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => onNavigate('booking')}
                className="bg-jitto-navy hover:bg-jitto-navy-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>Lock In Date on Booking Form</span>
                <ArrowRight className="w-4 h-4 text-jitto-cyan" />
              </button>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3.5 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Calculate Another Quote</span>
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-center gap-2">
              <Phone className="w-3.5 h-3.5 text-jitto-cyan" />
              <span>Need immediate assistance? Call the owners directly at <strong>(249) 800-0127</strong> (24/7).</span>
            </div>
          </div>
        ) : (

          /* MAIN QUOTE FORM CONTAINER */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT / MAIN COLUMN: Form inputs */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
              <form onSubmit={handleSubmit} className="space-y-8">

                {/* STEP 1: SERVICE TYPE SELECTOR */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider">
                      Step 1: Which Service Do You Need?
                    </label>
                    <span className="text-xs text-jitto-cyan-600 font-semibold">Required</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Residential Option */}
                    <button
                      type="button"
                      onClick={() => setSelectedService('residential')}
                      className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                        selectedService === 'residential'
                          ? 'border-jitto-navy bg-jitto-navy-50/50 shadow-sm ring-1 ring-jitto-navy'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-2 rounded-xl ${selectedService === 'residential' ? 'bg-jitto-navy text-white' : 'bg-slate-100 text-slate-600'}`}>
                          <HomeIcon className="w-5 h-5" />
                        </div>
                        {selectedService === 'residential' && (
                          <CheckCircle2 className="w-5 h-5 text-jitto-navy" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-base">Residential</div>
                        <div className="text-xs text-slate-500 mt-0.5">Homes, condos, deep cleans & move-ins</div>
                      </div>
                    </button>

                    {/* Commercial Option */}
                    <button
                      type="button"
                      onClick={() => setSelectedService('commercial')}
                      className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                        selectedService === 'commercial'
                          ? 'border-jitto-navy bg-jitto-navy-50/50 shadow-sm ring-1 ring-jitto-navy'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-2 rounded-xl ${selectedService === 'commercial' ? 'bg-jitto-navy text-white' : 'bg-slate-100 text-slate-600'}`}>
                          <Building2 className="w-5 h-5" />
                        </div>
                        {selectedService === 'commercial' && (
                          <CheckCircle2 className="w-5 h-5 text-jitto-navy" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-base">Commercial</div>
                        <div className="text-xs text-slate-500 mt-0.5">Offices, clinics, retail & facilities</div>
                      </div>
                    </button>

                    {/* Post-Construction Option */}
                    <button
                      type="button"
                      onClick={() => setSelectedService('post-construction')}
                      className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                        selectedService === 'post-construction'
                          ? 'border-jitto-navy bg-jitto-navy-50/50 shadow-sm ring-1 ring-jitto-navy'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-2 rounded-xl ${selectedService === 'post-construction' ? 'bg-jitto-navy text-white' : 'bg-slate-100 text-slate-600'}`}>
                          <HardHat className="w-5 h-5" />
                        </div>
                        {selectedService === 'post-construction' && (
                          <CheckCircle2 className="w-5 h-5 text-jitto-navy" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-base">Post-Construction</div>
                        <div className="text-xs text-slate-500 mt-0.5">Renovations, new builds & handovers</div>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="border-t border-slate-100" />

                {/* STEP 2: DYNAMIC QUESTIONS BASED ON SERVICE */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider">
                      Step 2: Tell Us About Your Space & Requirements
                    </label>
                    <span className="text-xs bg-jitto-cyan-50 text-jitto-navy font-semibold px-2 py-0.5 rounded">
                      Tailored to {selectedService}
                    </span>
                  </div>

                  {/* BRANCH A: RESIDENTIAL QUESTIONS */}
                  {selectedService === 'residential' && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      
                      {/* Bedrooms & Bathrooms */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                            Number of Bedrooms
                          </label>
                          <div className="grid grid-cols-5 gap-1.5">
                            {['1', '2', '3', '4', '5+'].map((num) => (
                              <button
                                key={num}
                                type="button"
                                onClick={() => setBedrooms(num)}
                                className={`py-2 rounded-xl text-sm font-semibold border transition-all ${
                                  bedrooms === num
                                    ? 'bg-jitto-navy text-white border-jitto-navy shadow-sm'
                                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                                }`}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                            Number of Bathrooms
                          </label>
                          <div className="grid grid-cols-5 gap-1.5">
                            {['1', '1.5', '2', '2.5', '3+'].map((num) => (
                              <button
                                key={num}
                                type="button"
                                onClick={() => setBathrooms(num)}
                                className={`py-2 rounded-xl text-sm font-semibold border transition-all ${
                                  bathrooms === num
                                    ? 'bg-jitto-navy text-white border-jitto-navy shadow-sm'
                                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                                }`}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Home Square Footage */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                          Approximate Home Square Footage
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { id: 'under-1000', label: 'Under 1,000 sq ft' },
                            { id: '1000-1500', label: '1,000 - 1,500 sq ft' },
                            { id: '1500-2200', label: '1,500 - 2,200 sq ft' },
                            { id: '2200-3200', label: '2,200 - 3,200 sq ft' },
                          ].map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setHomeSqFt(item.id)}
                              className={`py-2.5 px-3 rounded-xl text-xs font-semibold border text-center transition-all ${
                                homeSqFt === item.id
                                  ? 'bg-jitto-navy-50 border-jitto-navy text-jitto-navy font-bold'
                                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                              }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* How Often / Cadence */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                          How Often Do You Need Cleaning?
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {[
                            { id: 'bi-weekly', title: 'Bi-Weekly', badge: '15% Off • Most Popular', desc: 'Every 2 weeks' },
                            { id: 'weekly', title: 'Weekly', badge: '20% Off • Best Value', desc: 'Always spotless' },
                            { id: 'monthly', title: 'Monthly', badge: '10% Off', desc: 'Monthly upkeep' },
                            { id: 'deep-clean', title: 'One-Time Deep Clean', badge: 'Seasonal Reset', desc: 'Top to bottom' },
                            { id: 'move-in-out', title: 'Move-In / Move-Out', badge: 'Turnover Ready', desc: 'Empty home detail' },
                          ].map((cad) => (
                            <button
                              key={cad.id}
                              type="button"
                              onClick={() => setResFrequency(cad.id)}
                              className={`p-3 rounded-xl border text-left transition-all ${
                                resFrequency === cad.id
                                  ? 'border-jitto-navy bg-jitto-navy-50/50 shadow-sm'
                                  : 'border-slate-200 hover:border-slate-300 bg-white'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-900 text-sm">{cad.title}</span>
                                {resFrequency === cad.id && <CheckCircle2 className="w-4 h-4 text-jitto-navy" />}
                              </div>
                              <span className="inline-block mt-1 text-[10px] font-bold text-jitto-cyan-700 bg-jitto-cyan-50 px-2 py-0.5 rounded">
                                {cad.badge}
                              </span>
                              <div className="text-xs text-slate-500 mt-1">{cad.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Optional Add-Ons */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                          Special Add-Ons (Optional)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {[
                            { id: 'baseboards', name: 'Baseboards Hand-Wash' },
                            { id: 'oven', name: 'Inside Oven Deep Scrub' },
                            { id: 'fridge', name: 'Inside Fridge Sanitization' },
                            { id: 'windows', name: 'Interior Glass Detailing' },
                            { id: 'cabinets', name: 'Inside Kitchen Cabinets' },
                            { id: 'pets', name: 'Pet Fur & Dander Focus' },
                          ].map((item) => {
                            const active = resAddons.includes(item.id);
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => toggleResAddon(item.id)}
                                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs text-left transition-all ${
                                  active
                                    ? 'bg-jitto-cyan-50/60 border-jitto-cyan-300 text-jitto-navy font-semibold'
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                }`}
                              >
                                <div className={`w-4 h-4 rounded flex items-center justify-center border ${active ? 'bg-jitto-cyan text-jitto-navy-950 border-jitto-cyan' : 'border-slate-300'}`}>
                                  {active && <CheckCircle2 className="w-3.5 h-3.5" />}
                                </div>
                                <span>{item.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  )}

                  {/* BRANCH B: COMMERCIAL QUESTIONS */}
                  {selectedService === 'commercial' && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      
                      {/* Business Type */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                          Business Type / Facility
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {[
                            'Corporate Office', 
                            'Medical / Dental Clinic', 
                            'Retail Store / Showroom', 
                            'Daycare / Education', 
                            'Fitness Center / Gym', 
                            'Property Management / Lobby'
                          ].map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setBusinessType(type)}
                              className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                                businessType === type
                                  ? 'bg-jitto-navy-50 border-jitto-navy text-jitto-navy font-bold shadow-sm'
                                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Square Footage */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                          Commercial Square Footage
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { id: 'under-1500', label: 'Under 1,500 sq ft' },
                            { id: '1500-3500', label: '1,500 - 3,500 sq ft' },
                            { id: '3501-7000', label: '3,500 - 7,000 sq ft' },
                            { id: '7001+', label: '7,000+ sq ft (Custom)' },
                          ].map((sq) => (
                            <button
                              key={sq.id}
                              type="button"
                              onClick={() => setCommSqFt(sq.id)}
                              className={`p-2.5 rounded-xl border text-xs text-center transition-all ${
                                commSqFt === sq.id
                                  ? 'bg-jitto-navy-50 border-jitto-navy text-jitto-navy font-bold'
                                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                              }`}
                            >
                              {sq.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Preferred Hours */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                          Preferred Cleaning Hours (24/7 Flexible)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {[
                            { label: 'After Hours (Evenings/Nights)', desc: 'Clean while facility is closed' },
                            { label: 'Daytime Porter', desc: 'During operating hours' },
                            { label: 'Weekends Only', desc: 'Saturday / Sunday deep cleans' },
                          ].map((hr) => (
                            <button
                              key={hr.label}
                              type="button"
                              onClick={() => setPreferredHours(hr.label)}
                              className={`p-3 rounded-xl border text-left transition-all ${
                                preferredHours === hr.label
                                  ? 'bg-jitto-navy-50 border-jitto-navy text-jitto-navy font-bold shadow-sm'
                                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                              }`}
                            >
                              <div className="text-xs font-bold text-slate-900">{hr.label}</div>
                              <div className="text-[11px] text-slate-500 mt-0.5">{hr.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Frequency */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                          Schedule Frequency
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { id: 'daily', label: 'Daily (5-7x/wk)' },
                            { id: '3x-week', label: '3x Per Week' },
                            { id: 'weekly', label: 'Weekly' },
                            { id: 'bi-weekly', label: 'Bi-Weekly' },
                          ].map((fq) => (
                            <button
                              key={fq.id}
                              type="button"
                              onClick={() => setCommFrequency(fq.id)}
                              className={`p-2.5 rounded-xl border text-xs text-center transition-all ${
                                commFrequency === fq.id
                                  ? 'bg-jitto-navy-50 border-jitto-navy text-jitto-navy font-bold'
                                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                              }`}
                            >
                              {fq.label}
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                  {/* BRANCH C: POST-CONSTRUCTION QUESTIONS */}
                  {selectedService === 'post-construction' && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      
                      {/* Project Type */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                          Project Type
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {[
                            'Custom Single-Family Home',
                            'Multi-Unit Townhouse / Condo',
                            'Full Home Renovation',
                            'Kitchen & Bath Remodel',
                            'Commercial Tenant Fit-Out',
                            'Spec Home / Model Suite'
                          ].map((pt) => (
                            <button
                              key={pt}
                              type="button"
                              onClick={() => setProjectType(pt)}
                              className={`p-3 rounded-xl border text-xs text-left transition-all ${
                                projectType === pt
                                  ? 'bg-jitto-navy-50 border-jitto-navy text-jitto-navy font-bold shadow-sm'
                                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                              }`}
                            >
                              {pt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Project Size & Target Finish Date */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                            Total Project Size (Approx. Sq Ft)
                          </label>
                          <input
                            type="number"
                            min="300"
                            step="100"
                            value={projectSqFt}
                            onChange={(e) => setProjectSqFt(e.target.value)}
                            placeholder="e.g. 2800"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-jitto-cyan focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                            Target Finish / Handover Date
                          </label>
                          <input
                            type="date"
                            value={finishDate}
                            onChange={(e) => setFinishDate(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-jitto-cyan focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* Construction Stage */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                          Required Cleaning Phase
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {[
                            { name: 'Phase 1: Rough Clean', desc: 'Debris & drywall splatter sweep' },
                            { name: 'Phase 2: Final Detail Clean', desc: 'HEPA vac, glass & millwork' },
                            { name: 'Full 3-Phase Package', desc: 'Rough, Final & Touch-Up Handover' },
                          ].map((stg) => (
                            <button
                              key={stg.name}
                              type="button"
                              onClick={() => setConstructionStage(stg.name)}
                              className={`p-3 rounded-xl border text-left transition-all ${
                                constructionStage === stg.name
                                  ? 'bg-jitto-navy-50 border-jitto-navy text-jitto-navy font-bold shadow-sm'
                                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                              }`}
                            >
                              <div className="text-xs font-bold text-slate-900">{stg.name}</div>
                              <div className="text-[11px] text-slate-500 mt-1">{stg.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Before-and-After Photo Upload (Requested by user) */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Upload Job Site Photos / Blueprints (Optional)
                        </label>
                        <p className="text-xs text-slate-500 mb-2">
                          Help us assess trade debris levels and glass surface square footage for a razor-accurate quote.
                        </p>

                        <div className="border-2 border-dashed border-slate-300 hover:border-jitto-cyan rounded-2xl p-4 text-center transition-colors bg-slate-50">
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            id="photo-upload"
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
                          <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center justify-center">
                            <Upload className="w-8 h-8 text-jitto-cyan mb-2" />
                            <span className="text-xs font-bold text-jitto-navy hover:underline">
                              Click to select photos or drag and drop
                            </span>
                            <span className="text-[11px] text-slate-400 mt-0.5">PNG, JPG, HEIC up to 25MB</span>
                          </label>
                        </div>

                        {/* Uploaded Thumbnails Preview */}
                        {uploadedPhotos.length > 0 && (
                          <div className="mt-3 flex items-center gap-3 overflow-x-auto pb-2">
                            {uploadedPhotos.map((url, idx) => (
                              <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0 group">
                                <img src={url} alt={`Upload ${idx+1}`} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <span className="text-[9px] text-white font-bold">Uploaded</span>
                                </div>
                              </div>
                            ))}
                            <div className="text-xs text-slate-500 pl-1 font-medium">
                              {uploadedPhotos.length} site photo(s) attached
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100" />

                {/* STEP 3: CONTACT INFORMATION */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider">
                      Step 3: Where Should We Send Your Detailed Proposal?
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Elena Vance"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-jitto-cyan focus:border-transparent"
                      />
                    </div>

                    {selectedService !== 'residential' && (
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Company / Contractor Name
                        </label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. Vance Construction Ltd."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-jitto-cyan focus:border-transparent"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="(249) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-jitto-cyan focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="elena@example.ca"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-jitto-cyan focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Street Address or Job Site
                      </label>
                      <input
                        type="text"
                        value={propertyAddress}
                        onChange={(e) => setPropertyAddress(e.target.value)}
                        placeholder="123 Simcoe St"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-jitto-cyan focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        City / Municipality
                      </label>
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-jitto-cyan focus:border-transparent"
                      >
                        {COMPANY_INFO.serviceAreas.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Special Instructions, Access Notes, or Particular Requests
                    </label>
                    <textarea
                      rows={3}
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      placeholder="e.g. Please focus on hardwood polishing, lockbox code will be sent, need proof photos before 4 PM..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-jitto-cyan focus:border-transparent"
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-jitto-navy hover:bg-jitto-navy-800 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-glow-cyan transition-all text-base flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Generating Your Proposal...
                      </span>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 text-jitto-cyan" />
                        <span>Submit for Guaranteed Price Proposal</span>
                        <ArrowRight className="w-5 h-5 text-jitto-cyan" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-2">
                    🔒 No obligation. No spam. You deal directly with Jitto ownership.
                  </p>
                </div>

              </form>
            </div>

            {/* RIGHT SIDEBAR: Live Quote Summary & Trust Card */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Dynamic Price Estimate Card */}
              <div className="bg-jitto-navy-900 text-white rounded-3xl p-6 shadow-xl border border-jitto-navy-800 sticky top-28">
                <div className="flex items-center justify-between pb-3 border-b border-jitto-navy-800">
                  <div className="text-xs font-bold uppercase tracking-wider text-jitto-cyan flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4" />
                    <span>Instant Price Estimate</span>
                  </div>
                  <span className="text-[10px] bg-jitto-cyan/20 text-jitto-cyan px-2 py-0.5 rounded font-bold capitalize">
                    {selectedService}
                  </span>
                </div>

                <div className="py-5 text-center">
                  <div className="text-xs text-slate-400 font-medium">Estimated Range</div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-serif mt-1">
                    ${estimate.low} - ${estimate.high}
                  </div>
                  <div className="text-xs text-jitto-cyan font-semibold mt-1">
                    CAD ({estimate.unit})
                  </div>
                </div>

                {/* Summary Details */}
                <div className="bg-jitto-navy-950/60 rounded-2xl p-4 space-y-2 text-xs border border-jitto-navy-800/80">
                  <div className="flex justify-between text-slate-300">
                    <span>Service:</span>
                    <strong className="capitalize text-white">{selectedService}</strong>
                  </div>

                  {selectedService === 'residential' && (
                    <>
                      <div className="flex justify-between text-slate-300">
                        <span>Config:</span>
                        <span className="text-white">{bedrooms} Bed • {bathrooms} Bath</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Frequency:</span>
                        <span className="text-white capitalize">{resFrequency.replace('-', ' ')}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Add-ons:</span>
                        <span className="text-white">{resAddons.length} selected</span>
                      </div>
                    </>
                  )}

                  {selectedService === 'commercial' && (
                    <>
                      <div className="flex justify-between text-slate-300">
                        <span>Type:</span>
                        <span className="text-white">{businessType}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Area:</span>
                        <span className="text-white">{commSqFt}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Hours:</span>
                        <span className="text-white">{preferredHours}</span>
                      </div>
                    </>
                  )}

                  {selectedService === 'post-construction' && (
                    <>
                      <div className="flex justify-between text-slate-300">
                        <span>Project:</span>
                        <span className="text-white">{projectType}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Phase:</span>
                        <span className="text-white">{constructionStage}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Target Date:</span>
                        <span className="text-white">{finishDate}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Trust Points */}
                <div className="mt-5 space-y-2 pt-4 border-t border-jitto-navy-800 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-jitto-cyan shrink-0" />
                    <span>Room-by-room verified checklist included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-jitto-cyan shrink-0" />
                    <span>Proof, not promises (Photo verification)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-jitto-cyan shrink-0" />
                    <span>Fully insured & WSIB registered crew</span>
                  </div>
                </div>

                {/* Direct Dial Hotline */}
                <div className="mt-6 pt-4 border-t border-jitto-navy-800 text-center">
                  <div className="text-[11px] text-slate-400">Prefer speaking right now?</div>
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="inline-flex items-center gap-2 text-white font-bold text-sm mt-1 hover:text-jitto-cyan transition-colors"
                  >
                    <Phone className="w-4 h-4 text-jitto-cyan" />
                    <span>Call Owners Directly: (249) 800-0127</span>
                  </a>
                </div>

              </div>

              {/* Coming Soon Teaser */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-xs text-slate-600">
                <div className="font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-jitto-cyan-600" />
                  <span>Looking for HVAC or Junk Removal?</span>
                </div>
                <p className="text-slate-500 mb-2">
                  We are launching dedicated HVAC duct cleaning and renovation debris hauling shortly. You can note these in your message!
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="text-jitto-navy font-bold hover:text-jitto-cyan-600"
                >
                  View Upcoming Services →
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
