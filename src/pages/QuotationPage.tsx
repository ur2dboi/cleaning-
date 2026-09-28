import React, { useState } from 'react';
import type { PageRoute, ServiceCategory } from '../types';
import { COMPANY_INFO } from '../data/content';
import confetti from 'canvas-confetti';
import { 
  Calculator, 
  Home as HomeIcon, 
  Building2, 
  HardHat, 
  CheckCircle2, 
  Upload, 
  Phone, 
  ArrowRight, 
  RotateCcw, 
  ShieldCheck,
  Check,
  FileCheck
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
  const [businessType, setBusinessType] = useState<string>('Corporate Office');
  const [commSqFt, setCommSqFt] = useState<string>('1500-3500');
  const [preferredHours, setPreferredHours] = useState<string>('After Hours (Evenings)');
  const [commFrequency, setCommFrequency] = useState<string>('3x-week');

  // Post-Construction State
  const [projectType, setProjectType] = useState<string>('Custom Single-Family Home');
  const [projectSqFt, setProjectSqFt] = useState<string>('2500');
  const [constructionStage, setConstructionStage] = useState<string>('Final Detail Clean');
  const [finishDate, setFinishDate] = useState<string>(
    new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0]
  );
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    '/images/post-construction-architecture.jpg'
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const refNum = `JITTO-PR-${Math.floor(100000 + Math.random() * 900000)}`;
      setQuoteReference(refNum);
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 80, behavior: 'smooth' });

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#012d6c', '#00c2cb', '#94a3b8']
      });
    }, 600);
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Minimalist Page Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
            Proposal & Scope Generator
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight mt-2">
            Request A Tailored Proposal
          </h1>
          <p className="mt-3 text-slate-500 text-sm sm:text-base leading-relaxed">
            Every property has distinct architectural finishes and requirements. Complete the scope below to receive a customized room-by-room proposal from our founders.
          </p>
        </div>

        {/* SUCCESS CONFIRMATION STATE */}
        {isSubmitted ? (
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200/80 shadow-sm max-w-2xl mx-auto text-left animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-jitto-navy">Proposal Request Confirmed</span>
                <h2 className="text-2xl font-serif font-bold text-slate-900 mt-1">Thank you, {contactName || 'Valued Client'}.</h2>
              </div>
              <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {quoteReference}
              </span>
            </div>

            <div className="py-6 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                We have received your detailed specifications for <strong className="capitalize text-slate-900">{selectedService}</strong> cleaning in <strong>{selectedCity}</strong>.
              </p>
              <p>
                Our founders review each request personally. You will receive a comprehensive Scope of Work (SOW) and personalized proposal within <strong>2 hours</strong>.
              </p>
            </div>

            {/* Scope Summary Box */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 mb-6 space-y-2 text-xs text-slate-700">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Submitted Scope Summary</div>
              <div className="flex justify-between">
                <span className="text-slate-500">Service:</span>
                <span className="font-semibold text-slate-900 capitalize">{selectedService}</span>
              </div>
              {selectedService === 'residential' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Configuration:</span>
                    <span className="font-semibold text-slate-900">{bedrooms} Bedrooms • {bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Schedule Cadence:</span>
                    <span className="font-semibold text-slate-900 capitalize">{resFrequency.replace('-', ' ')}</span>
                  </div>
                </>
              )}
              {selectedService === 'commercial' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Facility Type:</span>
                    <span className="font-semibold text-slate-900">{businessType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Preferred Hours:</span>
                    <span className="font-semibold text-slate-900">{preferredHours}</span>
                  </div>
                </>
              )}
              {selectedService === 'post-construction' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Project Type:</span>
                    <span className="font-semibold text-slate-900">{projectType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Construction Phase:</span>
                    <span className="font-semibold text-slate-900">{constructionStage}</span>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onNavigate('booking')}
                className="bg-jitto-navy hover:bg-jitto-navy-800 text-white font-semibold py-3 px-6 rounded-xl transition-colors text-xs flex items-center justify-center gap-2"
              >
                <span>Reserve Preferred Appointment Date</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-5 rounded-xl transition-colors text-xs flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Submit Another Inquiry</span>
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400">
              Direct founder line: <strong className="text-slate-700">(249) 800-0127</strong> (24/7 available).
            </div>
          </div>
        ) : (

          /* FORM GRID */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* MAIN FORM */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-8">

                {/* STEP 1: SERVICE TYPE */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    01 / Select Cleaning Category
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'residential', label: 'Residential', icon: HomeIcon, sub: 'Homes & Condos' },
                      { id: 'commercial', label: 'Commercial', icon: Building2, sub: 'Offices & Facilities' },
                      { id: 'post-construction', label: 'Post-Construction', icon: HardHat, sub: 'New Builds & Renos' },
                    ].map((item) => {
                      const Icon = item.icon;
                      const active = selectedService === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedService(item.id as ServiceCategory)}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            active
                              ? 'border-jitto-navy bg-slate-50 ring-1 ring-jitto-navy'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <Icon className={`w-4 h-4 ${active ? 'text-jitto-navy' : 'text-slate-400'}`} />
                            {active && <Check className="w-3.5 h-3.5 text-jitto-navy stroke-[3]" />}
                          </div>
                          <div className="font-semibold text-slate-900 text-xs sm:text-sm">{item.label}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{item.sub}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-slate-100" />

                {/* STEP 2: TAILORED QUESTIONS */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                      02 / Property Specifications
                    </label>
                    <span className="text-[11px] text-slate-400 capitalize">
                      {selectedService} scope
                    </span>
                  </div>

                  {/* RESIDENTIAL QUESTIONS */}
                  {selectedService === 'residential' && (
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1.5">
                            Bedrooms
                          </label>
                          <div className="grid grid-cols-5 gap-1.5">
                            {['1', '2', '3', '4', '5+'].map((num) => (
                              <button
                                key={num}
                                type="button"
                                onClick={() => setBedrooms(num)}
                                className={`py-2 rounded-lg text-xs font-semibold border transition-all ${
                                  bedrooms === num
                                    ? 'bg-jitto-navy text-white border-jitto-navy'
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                }`}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1.5">
                            Bathrooms
                          </label>
                          <div className="grid grid-cols-5 gap-1.5">
                            {['1', '1.5', '2', '2.5', '3+'].map((num) => (
                              <button
                                key={num}
                                type="button"
                                onClick={() => setBathrooms(num)}
                                className={`py-2 rounded-lg text-xs font-semibold border transition-all ${
                                  bathrooms === num
                                    ? 'bg-jitto-navy text-white border-jitto-navy'
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                }`}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Approximate Square Footage
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { id: 'under-1000', label: 'Under 1,000 sq ft' },
                            { id: '1000-1500', label: '1,000 - 1,500 sq ft' },
                            { id: '1500-2200', label: '1,500 - 2,200 sq ft' },
                            { id: '2200-3200', label: '2,200+ sq ft' },
                          ].map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setHomeSqFt(item.id)}
                              className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                                homeSqFt === item.id
                                  ? 'bg-slate-100 border-jitto-navy text-jitto-navy font-semibold'
                                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                              }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Cleaning Cadence
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {[
                            { id: 'weekly', label: 'Weekly Maintenance' },
                            { id: 'bi-weekly', label: 'Bi-Weekly (Every 2 Wks)' },
                            { id: 'monthly', label: 'Monthly Maintenance' },
                            { id: 'deep-clean', label: 'Detailed Deep Clean' },
                            { id: 'move-in-out', label: 'Move-In / Move-Out' },
                          ].map((cad) => (
                            <button
                              key={cad.id}
                              type="button"
                              onClick={() => setResFrequency(cad.id)}
                              className={`p-2.5 rounded-lg border text-left text-xs font-medium transition-all ${
                                resFrequency === cad.id
                                  ? 'border-jitto-navy bg-slate-50 text-jitto-navy font-semibold'
                                  : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                              }`}
                            >
                              {cad.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Special Focus Areas (Optional)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {[
                            { id: 'baseboards', name: 'Baseboards Hand-Wash' },
                            { id: 'oven', name: 'Inside Oven Detailing' },
                            { id: 'fridge', name: 'Inside Refrigerator' },
                            { id: 'windows', name: 'Interior Glass Detailing' },
                            { id: 'cabinets', name: 'Inside Kitchen Cabinets' },
                            { id: 'pets', name: 'Pet Fur & Dander Focus' },
                          ].map((addon) => {
                            const active = resAddons.includes(addon.id);
                            return (
                              <button
                                key={addon.id}
                                type="button"
                                onClick={() => toggleResAddon(addon.id)}
                                className={`flex items-center gap-2 p-2 rounded-lg border text-xs text-left transition-all ${
                                  active
                                    ? 'bg-slate-100 border-slate-400 text-slate-900 font-medium'
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                }`}
                              >
                                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${active ? 'bg-jitto-navy text-white border-jitto-navy' : 'border-slate-300'}`}>
                                  {active && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                </div>
                                <span>{addon.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* COMMERCIAL QUESTIONS */}
                  {selectedService === 'commercial' && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Business / Facility Classification
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {[
                            'Corporate Office',
                            'Medical / Dental Clinic',
                            'Retail Store / Showroom',
                            'Daycare / Education',
                            'Fitness Center / Gym',
                            'Property Management Lobby'
                          ].map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setBusinessType(type)}
                              className={`p-2.5 rounded-lg border text-xs font-medium text-left transition-all ${
                                businessType === type
                                  ? 'bg-slate-100 border-jitto-navy text-jitto-navy font-semibold'
                                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1.5">
                            Approximate Square Footage
                          </label>
                          <select
                            value={commSqFt}
                            onChange={(e) => setCommSqFt(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white text-slate-700 focus:outline-none focus:border-jitto-navy"
                          >
                            <option value="under-1500">Under 1,500 sq ft</option>
                            <option value="1500-3500">1,500 - 3,500 sq ft</option>
                            <option value="3501-7000">3,500 - 7,000 sq ft</option>
                            <option value="7001+">7,000+ sq ft (Custom SOW)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1.5">
                            Preferred Cleaning Window (24/7)
                          </label>
                          <select
                            value={preferredHours}
                            onChange={(e) => setPreferredHours(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white text-slate-700 focus:outline-none focus:border-jitto-navy"
                          >
                            <option value="After Hours (Evenings)">After Hours (Evenings / Closed)</option>
                            <option value="Daytime Porter">Daytime Custodial / Porter</option>
                            <option value="Weekends Only">Weekends Only</option>
                            <option value="Overnight Custom">24/7 Overnight Window</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
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
                              className={`p-2 rounded-lg border text-xs text-center transition-all ${
                                commFrequency === fq.id
                                  ? 'bg-slate-100 border-jitto-navy text-jitto-navy font-semibold'
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

                  {/* POST-CONSTRUCTION QUESTIONS */}
                  {selectedService === 'post-construction' && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Project Type
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
                              className={`p-2.5 rounded-lg border text-xs font-medium text-left transition-all ${
                                projectType === pt
                                  ? 'bg-slate-100 border-jitto-navy text-jitto-navy font-semibold'
                                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                              }`}
                            >
                              {pt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1.5">
                            Total Project Area (Approx. Sq Ft)
                          </label>
                          <input
                            type="number"
                            min="300"
                            step="100"
                            value={projectSqFt}
                            onChange={(e) => setProjectSqFt(e.target.value)}
                            placeholder="e.g. 2800"
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-jitto-navy"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1.5">
                            Target Handover / Closing Date
                          </label>
                          <input
                            type="date"
                            value={finishDate}
                            onChange={(e) => setFinishDate(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-jitto-navy"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">
                          Required Phase
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {[
                            { name: 'Phase 1: Rough Clean', desc: 'Debris & splatter sweep' },
                            { name: 'Phase 2: Final Detail Clean', desc: 'HEPA vac, glass & millwork' },
                            { name: 'Full 3-Phase Package', desc: 'Rough, Final & Inspection Touch' },
                          ].map((stg) => (
                            <button
                              key={stg.name}
                              type="button"
                              onClick={() => setConstructionStage(stg.name)}
                              className={`p-2.5 rounded-lg border text-left transition-all ${
                                constructionStage === stg.name
                                  ? 'bg-slate-100 border-jitto-navy text-jitto-navy font-semibold'
                                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                              }`}
                            >
                              <div className="text-xs font-semibold text-slate-900">{stg.name}</div>
                              <div className="text-[11px] text-slate-500 mt-0.5">{stg.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Photo Upload Zone */}
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">
                          Upload Job Site Photos or Blueprints (Optional)
                        </label>
                        <div className="border border-dashed border-slate-300 rounded-xl p-4 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            id="photo-upload-input"
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
                          <label htmlFor="photo-upload-input" className="cursor-pointer flex flex-col items-center">
                            <Upload className="w-5 h-5 text-slate-400 mb-1" />
                            <span className="text-xs font-semibold text-jitto-navy hover:underline">
                              Click to attach site photos
                            </span>
                            <span className="text-[10px] text-slate-400 mt-0.5">Helps assess dust levels & glass detailing</span>
                          </label>
                        </div>

                        {uploadedPhotos.length > 0 && (
                          <div className="mt-2 flex items-center gap-2 overflow-x-auto">
                            {uploadedPhotos.map((url, i) => (
                              <div key={i} className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                                <img src={url} alt="Site" className="w-full h-full object-cover" />
                              </div>
                            ))}
                            <span className="text-[11px] text-slate-500">{uploadedPhotos.length} photo(s) attached</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100" />

                {/* STEP 3: CONTACT INFORMATION */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                    03 / Contact & Property Details
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Elena Vance"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-jitto-navy"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="(249) 000-0000"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-jitto-navy"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="elena@example.ca"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-jitto-navy"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Municipality</label>
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white text-slate-700 focus:outline-none focus:border-jitto-navy"
                      >
                        {COMPANY_INFO.serviceAreas.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-medium text-slate-600 mb-1">Property Address or Site Location</label>
                    <input
                      type="text"
                      value={propertyAddress}
                      onChange={(e) => setPropertyAddress(e.target.value)}
                      placeholder="e.g. 120 Lakeshore Dr, Unit 302"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-jitto-navy"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-medium text-slate-600 mb-1">Notes, Access or Particular Requests</label>
                    <textarea
                      rows={3}
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      placeholder="Special surfaces, lockbox instructions, or inspection deadlines..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-jitto-navy"
                    />
                  </div>
                </div>

                {/* SUBMIT */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-jitto-navy hover:bg-jitto-navy-800 text-white font-semibold py-3.5 px-6 rounded-xl transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Preparing Proposal Request...</span>
                    ) : (
                      <>
                        <span>Submit For Custom Proposal</span>
                        <ArrowRight className="w-4 h-4 text-jitto-cyan" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-slate-400 mt-2">
                    Direct founder review. Complimentary walkthrough arranged upon request.
                  </p>
                </div>

              </form>
            </div>

            {/* SIDEBAR: SCOPE & STANDARDS (NO PRICES) */}
            <div className="lg:col-span-4 space-y-4">
              
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm sticky top-24">
                <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-jitto-navy">
                    Scope Inclusions
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium capitalize">
                    {selectedService}
                  </span>
                </div>

                <div className="py-4 space-y-3 text-xs text-slate-600 border-b border-slate-100">
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-jitto-navy mt-0.5 shrink-0 stroke-[2.5]" />
                    <span>Standardized room-by-room quality checklist</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-jitto-navy mt-0.5 shrink-0 stroke-[2.5]" />
                    <span>All commercial supplies & HEPA filtration equipment provided</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-jitto-navy mt-0.5 shrink-0 stroke-[2.5]" />
                    <span>The same vetted, uniformed crew whenever possible</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-jitto-navy mt-0.5 shrink-0 stroke-[2.5]" />
                    <span>Proof, not promises: before & after photo confirmation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-jitto-navy mt-0.5 shrink-0 stroke-[2.5]" />
                    <span>Full commercial liability & Ontario WSIB coverage</span>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold mb-1">
                    Direct Founder Contact
                  </div>
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-jitto-cyan-600 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-jitto-cyan-600" />
                    <span>(249) 800-0127 (24/7 Available)</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
