import React, { useState } from 'react';
import type { PageRoute, ServiceCategory } from '../types';
import { COMPANY_INFO } from '../data/content';
import confetti from 'canvas-confetti';
import { 
  Calendar as CalendarIcon, 
  Home as HomeIcon, 
  Building2, 
  HardHat, 
  Check, 
  ArrowRight,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';

interface BookingPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({ onNavigate }) => {
  const [category, setCategory] = useState<ServiceCategory>('residential');
  const [packageType, setPackageType] = useState<string>('Regular Maintenance Clean');
  
  // Date & Time
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [bookingDate, setBookingDate] = useState<string>(tomorrow);
  const [timeSlot, setTimeSlot] = useState<string>('Morning (8:00 AM - 12:00 PM)');

  // Address & Access
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('Barrie');
  const [accessMethod, setAccessMethod] = useState<string>('Someone will be home');

  // Contact
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // Confirmation state
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `JITTO-BK-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingId(generatedId);
      setIsSubmitting(false);
      setIsBooked(true);
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimalist Header */}
        <div className="mb-10 text-left">
          <span className="text-[11px] font-bold tracking-[0.2em] text-jitto-navy uppercase">
            Schedule Reservation
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight mt-1">
            Reserve Your Cleaning Crew
          </h1>
          <p className="mt-2 text-slate-500 text-xs sm:text-sm">
            Select your preferred date, access protocol, and specific priorities. No charges are applied until scope and schedule are verified.
          </p>
        </div>

        {isBooked ? (
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200/80 shadow-sm text-left animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-jitto-navy">Reservation Request Logged</span>
                <h2 className="text-2xl font-serif font-bold text-slate-900 mt-1">Reservation Received</h2>
              </div>
              <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {bookingId}
              </span>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed my-6">
              Thank you, <strong>{fullName}</strong>. We have placed a reservation hold for <strong>{bookingDate}</strong> ({timeSlot}). A Jitto operations manager will contact you directly to confirm the walkthrough and dispatch your assigned crew.
            </p>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 mb-6 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Service Category:</span>
                <span className="font-semibold text-slate-900 capitalize">{category} ({packageType})</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Location:</span>
                <span className="font-semibold text-slate-900">{address}, {city}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Access Protocol:</span>
                <span className="font-semibold text-slate-900">{accessMethod}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Crew Standard:</span>
                <span className="font-semibold text-jitto-navy">Vetted & Uniformed Crew with Checklist</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onNavigate('home')}
                className="bg-jitto-navy hover:bg-jitto-navy-800 text-white font-medium py-2.5 px-5 rounded-xl transition-colors text-xs"
              >
                Return to Homepage
              </button>
              <button
                onClick={() => setIsBooked(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2.5 px-5 rounded-xl transition-colors text-xs flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reserve Another Clean</span>
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400">
              Need immediate dispatch or emergency scheduling? Call <strong>(249) 800-0127</strong> (24/7).
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                  01 / Service Classification
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'residential', label: 'Residential', icon: HomeIcon, desc: 'Homes & Condos' },
                    { id: 'commercial', label: 'Commercial', icon: Building2, desc: 'Offices & Retail' },
                    { id: 'post-construction', label: 'Post-Construction', icon: HardHat, desc: 'New Builds & Renos' }
                  ].map((s) => {
                    const Icon = s.icon;
                    const active = category === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          setCategory(s.id as ServiceCategory);
                          if (s.id === 'residential') setPackageType('Regular Maintenance Clean');
                          if (s.id === 'commercial') setPackageType('After-Hours Commercial Clean');
                          if (s.id === 'post-construction') setPackageType('Handover Final Clean');
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          active
                            ? 'border-jitto-navy bg-slate-50 ring-1 ring-jitto-navy'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Icon className={`w-4 h-4 ${active ? 'text-jitto-navy' : 'text-slate-400'}`} />
                          {active && <Check className="w-3.5 h-3.5 text-jitto-navy stroke-[3]" />}
                        </div>
                        <div className="font-semibold text-slate-900 text-xs">{s.label}</div>
                        <div className="text-[11px] text-slate-500">{s.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Package Details */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Program Details
                </label>
                <select
                  value={packageType}
                  onChange={(e) => setPackageType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:border-jitto-navy"
                >
                  {category === 'residential' && (
                    <>
                      <option value="Regular Maintenance Clean">Regular Maintenance Clean (Recurring Upkeep)</option>
                      <option value="Detailed Deep Clean">Detailed Deep Clean (Seasonal Reset)</option>
                      <option value="Move-In / Move-Out Turnover">Move-In / Move-Out Turnover Clean</option>
                    </>
                  )}
                  {category === 'commercial' && (
                    <>
                      <option value="After-Hours Commercial Clean">After-Hours Office / Janitorial Clean</option>
                      <option value="Daytime Porter Program">Daytime Custodial / Porter Program</option>
                      <option value="Medical / Dental Clinic Sanitation">Medical / Dental Clinic Sanitization</option>
                      <option value="Weekend Commercial Reset">Weekend Commercial Reset</option>
                    </>
                  )}
                  {category === 'post-construction' && (
                    <>
                      <option value="Phase 1: Rough Clean">Phase 1: Rough Clean (Debris & Splatter Sweep)</option>
                      <option value="Phase 2: Final Detail Clean">Phase 2: Final Detail Clean (HEPA & Glass)</option>
                      <option value="Phase 3: Touch-Up Handover Clean">Phase 3: Touch-Up Handover / Inspection Clean</option>
                      <option value="Full 3-Phase Package">Full 3-Phase Handover Package</option>
                    </>
                  )}
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-jitto-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Time Window (24/7 Available)
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:border-jitto-navy"
                  >
                    <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                    <option value="Evening / After-Hours (4:00 PM - 8:00 PM)">Evening / After-Hours (4:00 PM - 8:00 PM)</option>
                    <option value="Overnight Custom Window">Overnight 24/7 Commercial Window</option>
                  </select>
                </div>
              </div>

              {/* Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Property Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 88 Bayfield St, Unit 4"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-jitto-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Municipality *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:border-jitto-navy"
                  >
                    {COMPANY_INFO.serviceAreas.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Access Method */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Property Access Method
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    'Someone will be home',
                    'Lockbox / Key code',
                    'Key with concierge',
                    'Call 15 mins prior'
                  ].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setAccessMethod(method)}
                      className={`p-2 rounded-lg border text-xs text-center transition-all ${
                        accessMethod === method
                          ? 'bg-slate-100 border-jitto-navy text-jitto-navy font-semibold'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Marcus Vance"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-jitto-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(249) 000-0000"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-jitto-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="marcus@example.ca"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-jitto-navy"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Access Notes or Special Instructions
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Lockbox location, delicate surfaces, pet considerations..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-jitto-navy"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-jitto-navy hover:bg-jitto-navy-800 text-white font-medium py-3.5 px-6 rounded-xl transition-all text-xs sm:text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Reserving Slot...</span>
                ) : (
                  <>
                    <span>Confirm & Hold Reservation</span>
                    <ArrowRight className="w-4 h-4 text-jitto-cyan" />
                  </>
                )}
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
