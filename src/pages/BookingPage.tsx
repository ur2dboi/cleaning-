import React, { useState } from 'react';
import { PageRoute, ServiceCategory } from '../types';
import { COMPANY_INFO } from '../data/content';
import confetti from 'canvas-confetti';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Key, 
  CheckCircle2, 
  Sparkles, 
  Home as HomeIcon, 
  Building2, 
  HardHat, 
  ShieldCheck, 
  Phone, 
  ArrowRight,
  User,
  Mail,
  RotateCcw
} from 'lucide-react';

interface BookingPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<number>(1);
  const [category, setCategory] = useState<ServiceCategory>('residential');
  const [packageType, setPackageType] = useState<string>('Regular Maintenance Clean');
  
  // Date & Time
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [bookingDate, setBookingDate] = useState<string>(tomorrow);
  const [timeSlot, setTimeSlot] = useState<string>('Morning (8:00 AM - 12:00 PM)');
  const [is247Flexible, setIs247Flexible] = useState<boolean>(false);

  // Address & Access
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('Barrie');
  const [accessMethod, setAccessMethod] = useState<string>('Someone will be home');
  const [accessNotes, setAccessNotes] = useState<string>('');

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
      window.scrollTo({ top: 120, behavior: 'smooth' });

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00c2cb', '#012d6c', '#10b981', '#ffffff']
      });
    }, 600);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-jitto-cyan-50 border border-jitto-cyan-200 text-jitto-navy text-xs font-bold uppercase tracking-wider mb-3">
            <CalendarIcon className="w-3.5 h-3.5 text-jitto-cyan-600" />
            Direct Schedule Booking
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-serif">
            Reserve Your Cleaning Crew
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Select your preferred time slot, provide access instructions, and let our 16-year proven team handle the rest.
          </p>
        </div>

        {isBooked ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center max-w-xl mx-auto animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-bold mb-3">
              BOOKING #{bookingId}
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 mb-2">
              Booking Reserved!
            </h2>
            <p className="text-slate-600 text-sm mb-6">
              Thank you, <strong>{fullName}</strong>. We've reserved your slot for <strong>{bookingDate}</strong> ({timeSlot}). A Jitto supervisor will send your crew assignment details and arrival confirmation window.
            </p>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left mb-6 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Service:</span>
                <span className="font-bold text-slate-800 capitalize">{category} ({packageType})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location:</span>
                <span className="font-bold text-slate-800">{address}, {city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Access:</span>
                <span className="font-bold text-slate-800">{accessMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Crew Guarantee:</span>
                <span className="font-bold text-jitto-navy">Official Uniform & Checklist Provided</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => onNavigate('home')}
                className="bg-jitto-navy hover:bg-jitto-navy-800 text-white font-bold py-3 px-6 rounded-xl transition-colors text-sm"
              >
                Return to Homepage
              </button>
              <button
                onClick={() => setIsBooked(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-colors text-sm flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Book Another Clean</span>
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-500">
              Need to reschedule or speak directly to the founders? Call <strong>(249) 800-0127</strong> (24/7).
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  1. Select Cleaning Classification
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'residential', label: 'Residential', icon: HomeIcon, desc: 'Home, condo, deep clean' },
                    { id: 'commercial', label: 'Commercial', icon: Building2, desc: 'Office, retail, clinic' },
                    { id: 'post-construction', label: 'Post-Construction', icon: HardHat, desc: 'Reno, new build, handover' }
                  ].map((s) => {
                    const Icon = s.icon;
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
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${
                          category === s.id
                            ? 'border-jitto-navy bg-jitto-navy-50/50 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className={`p-2 rounded-xl ${category === s.id ? 'bg-jitto-navy text-white' : 'bg-slate-100 text-slate-600'}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          {category === s.id && <CheckCircle2 className="w-5 h-5 text-jitto-navy" />}
                        </div>
                        <div className="font-bold text-slate-900 text-sm">{s.label}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{s.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Package Choice */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  2. Choose Specific Package
                </label>
                <select
                  value={packageType}
                  onChange={(e) => setPackageType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-jitto-cyan"
                >
                  {category === 'residential' && (
                    <>
                      <option value="Regular Maintenance Clean">Regular Maintenance Clean (Recurring / Upkeep)</option>
                      <option value="Detailed Deep Clean">Detailed Deep Clean (Seasonal / Comprehensive)</option>
                      <option value="Move-In / Move-Out Turnover">Move-In / Move-Out Turnover Clean</option>
                    </>
                  )}
                  {category === 'commercial' && (
                    <>
                      <option value="After-Hours Commercial Clean">After-Hours Office / Facility Clean</option>
                      <option value="Daytime Porter Program">Daytime Custodial / Porter Program</option>
                      <option value="Medical / Dental Clinic Sanitation">Medical / Dental Clinic Hospital-Grade Clean</option>
                      <option value="Weekend Commercial Reset">Weekend Commercial Reset</option>
                    </>
                  )}
                  {category === 'post-construction' && (
                    <>
                      <option value="Phase 1: Rough Clean">Phase 1: Rough Construction Clean</option>
                      <option value="Phase 2: Final Detail Clean">Phase 2: Final Detailing & Dust Extraction</option>
                      <option value="Phase 3: Touch-Up Handover Clean">Phase 3: Touch-Up Handover / Inspection Clean</option>
                      <option value="Full 3-Phase Handover Package">Complete 3-Phase Post-Construction Package</option>
                    </>
                  )}
                </select>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    3. Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-jitto-cyan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Preferred Time Slot (24/7 Available)
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-jitto-cyan"
                  >
                    <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                    <option value="Evening / After-Hours (4:00 PM - 8:00 PM)">Evening / After-Hours (4:00 PM - 8:00 PM)</option>
                    <option value="Overnight / Custom Commercial Window">Overnight / 24/7 Custom Window</option>
                  </select>
                </div>
              </div>

              {/* Address & Access */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Street Address / Site Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 88 Bayfield St, Unit 4"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-jitto-cyan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Municipality *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-jitto-cyan"
                  >
                    {COMPANY_INFO.serviceAreas.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Access Method */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  4. How Will The Team Access The Property?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    'Someone will be home',
                    'Lockbox / Key code',
                    'Key with concierge / desk',
                    'Call 15 mins prior'
                  ].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setAccessMethod(method)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                        accessMethod === method
                          ? 'bg-jitto-navy-50 border-jitto-navy text-jitto-navy'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Marcus Vance"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-jitto-cyan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(249) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-jitto-cyan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="marcus@example.ca"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-jitto-cyan"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Special Instructions or Cleaning Priorities
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Please take off shoes, lockbox is on rear gate code 4912, hypoallergenic solutions preferred..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-jitto-cyan"
                />
              </div>

              {/* Trust Callout */}
              <div className="bg-jitto-cyan-50/60 rounded-2xl p-4 border border-jitto-cyan-200 flex items-center gap-3 text-xs text-slate-700">
                <ShieldCheck className="w-5 h-5 text-jitto-cyan-700 shrink-0" />
                <span>
                  <strong>Jitto Quality Guarantee:</strong> Fully insured & WSIB registered. Uniformed crew, room-by-room checklist, and before-and-after photo verification on handover cleans.
                </span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-jitto-navy hover:bg-jitto-navy-800 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-glow-cyan transition-all text-base flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Securing Booking Slot...</span>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-jitto-cyan" />
                    <span>Confirm & Book Cleaning Appointment</span>
                    <ArrowRight className="w-5 h-5 text-jitto-cyan" />
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
