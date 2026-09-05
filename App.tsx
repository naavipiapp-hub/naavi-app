import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ShieldCheck, Check, Wallet, Search, MapPin, Star, Sparkles, X, Lock, ArrowRight, CheckCircle2, Store } from 'lucide-react';
import { MerchantDashboard } from './components/MerchantDashboard';
import { NaaviLogo } from './components/NaaviLogo';

interface LocationOption {
  id: string;
  flag: string;
  country: string;
  hubs: string;
}

interface Service {
  id: string;
  title: string;
  category: string;
  location: string;
  pricePi: number;
  priceUnit: string;
  rating: number;
  reviews: number;
  badge: string;
  escrowNote: string;
  image: string;
  perks: string[];
}

const LOCATIONS: LocationOption[] = [
  { id: 'all-ng', flag: '🇳🇬', country: 'Nigeria', hubs: 'Lagos/Abuja' },
  { id: 'lagos', flag: '🇳🇬', country: 'Nigeria', hubs: 'Lagos (VI/Ikoyi/Lekki)' },
  { id: 'abuja', flag: '🇳🇬', country: 'Nigeria', hubs: 'Abuja (Maitama/CBD)' },
  { id: 'ph', flag: '🇳🇬', country: 'Nigeria', hubs: 'Port Harcourt Hub' },
  { id: 'calabar', flag: '🇳🇬', country: 'Nigeria', hubs: 'Calabar & Tourism Hub' },
];

const MOCK_SERVICES: Service[] = [
  {
    id: '1',
    title: 'Transcorp Hilton Luxury Suite',
    category: 'Stays',
    location: 'Maitama, Abuja',
    pricePi: 22.5,
    priceUnit: 'night',
    rating: 4.9,
    reviews: 128,
    badge: 'POPULAR IN ABUJA',
    escrowNote: 'Released 2h after verified check-in QR scan',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    perks: ['Free Airport Shuttle', 'Executive Lounge', 'High-speed Wifi']
  },
  {
    id: '2',
    title: 'VIP Executive SUV Airport Transfer',
    category: 'Rides',
    location: 'Murtala Muhammed Airport, Lagos',
    pricePi: 4.8,
    priceUnit: 'trip',
    rating: 4.8,
    reviews: 95,
    badge: 'TOP RATED RIDE',
    escrowNote: 'Released upon passenger safe arrival verification',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    perks: ['Professional Chauffeur', 'AC & Refreshments', 'Flight Tracking']
  },
  {
    id: '3',
    title: 'Nok by Alara - Fine African Dining',
    category: 'Food',
    location: 'Victoria Island, Lagos',
    pricePi: 3.2,
    priceUnit: 'meal',
    rating: 4.7,
    reviews: 210,
    badge: 'CULTURAL LANDMARK',
    escrowNote: 'Released upon order voucher redemption at restaurant',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    perks: ['Gourmet African Fusion', 'Outdoor Garden', 'Pi Loyalty Discount']
  },
  {
    id: '4',
    title: 'Obudu Mountain Resort Day Experience',
    category: 'Tours',
    location: 'Calabar Tourism Hub',
    pricePi: 18.0,
    priceUnit: 'ticket',
    rating: 4.98,
    reviews: 64,
    badge: 'TRENDING TOUR',
    escrowNote: 'Released upon tour departure check-in',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80',
    perks: ['Guided Canopy Walk', 'Cable Car Pass', 'Buffet Lunch Included']
  }
];

export default function App() {
  const [activePortal, setActivePortal] = useState<'traveler' | 'merchant'>('traveler');
  const [currentLocation, setCurrentLocation] = useState<LocationOption>(LOCATIONS[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  
  // Booking & Escrow Modal States
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBookClick = (service: Service) => {
    setSelectedService(service);
    setBookingSuccess(false);
    setIsProcessing(false);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setBookingSuccess(true);
    }, 2000);
  };

  const filteredServices = selectedCategory === 'All Categories'
    ? MOCK_SERVICES
    : MOCK_SERVICES.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#100932] text-white font-sans pb-12 relative">
      {/* 1. Header Section */}
      <header className="sticky top-0 z-40 w-full bg-[#1a0f4a]/95 backdrop-blur-md border-b border-[#362284]/80 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Logo & Name */}
          <div className="flex items-center gap-3">
            <NaaviLogo className="w-10 h-10 shrink-0 shadow-md shadow-[#D4AF37]/20" />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white">Naavi</span>
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40 tracking-wider">
                  {activePortal === 'merchant' ? 'π MERCHANT' : 'π WEB3'}
                </span>
              </div>
              <span className="text-[11px] text-[#E0E0E0] font-medium leading-tight">
                {activePortal === 'merchant' ? 'Verified Merchant Portal' : 'Verified Pi Travel Marketplace'}
              </span>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center flex-wrap gap-2.5 sm:gap-3 ml-auto">
            {/* View Mode Toggle: Traveler View vs Merchant Portal */}
            <div className="flex items-center bg-[#241662] p-1 rounded-full border border-[#3d2794] text-xs font-semibold shadow-inner">
              <button
                onClick={() => setActivePortal('traveler')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  activePortal === 'traveler'
                    ? 'bg-[#D4AF37] text-[#100932] font-black shadow-md shadow-[#D4AF37]/20'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Traveler View
              </button>
              <button
                onClick={() => setActivePortal('merchant')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                  activePortal === 'merchant'
                    ? 'bg-[#D4AF37] text-[#100932] font-black shadow-md shadow-[#D4AF37]/20'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Merchant Portal</span>
              </button>
            </div>

            {/* Location Selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#241662] hover:bg-[#2d1c7a] border border-[#3d2794] text-xs font-medium text-[#E0E0E0] transition-colors shadow-sm cursor-pointer"
              >
                <span className="text-sm">{currentLocation.flag}</span>
                <span className="font-semibold text-white truncate max-w-[130px] sm:max-w-[170px]">
                  {currentLocation.country} ({currentLocation.hubs})
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#D4AF37] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#241662] border border-[#3d2794] shadow-2xl py-2 z-50">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider border-b border-[#362284]/80">
                    Select Nigerian Travel Hub
                  </div>
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => {
                        setCurrentLocation(loc);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-[#321f82] transition-colors cursor-pointer ${
                        currentLocation.id === loc.id ? 'text-[#D4AF37] font-semibold bg-[#2a1a70]' : 'text-[#E0E0E0]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{loc.flag}</span>
                        <span>{loc.country} ({loc.hubs})</span>
                      </div>
                      {currentLocation.id === loc.id && <Check className="w-3.5 h-3.5 text-[#D4AF37]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Escrow Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37]/10 to-[#241662] border border-[#D4AF37]/50 text-xs font-semibold text-[#D4AF37]">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span className="whitespace-nowrap">🛡️ Pi Escrow Protected</span>
            </div>

            {/* Wallet Balance */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1a0f4a] border border-[#3d2794] text-xs font-semibold text-white">
              <Wallet className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>128.50</span>
              <span className="text-[#D4AF37] font-bold">π</span>
            </div>
          </div>

        </div>
      </header>

      {/* View Mode Content */}
      {activePortal === 'merchant' ? (
        <MerchantDashboard />
      ) : (
        <>
          {/* 2. Hero & AI Concierge Search Section */}
          <section className="max-w-5xl mx-auto px-4 pt-10 pb-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241662] border border-[#D4AF37]/30 text-xs text-[#D4AF37] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Pi AI Travel Concierge</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
              Find & Book Verified Travel Services with Pi
            </h1>
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-8">
              Rides, stays, and local experiences across Nigeria.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-[#1a0f4a]/90 border border-[#3d2794] p-2 rounded-2xl shadow-xl flex items-center gap-2 mb-4">
              <Search className="w-5 h-5 text-gray-400 ml-2 shrink-0" />
              <input
                type="text"
                placeholder="e.g., Hotel in Abuja under 25 Pi..."
                className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-gray-400"
              />
              <button className="bg-[#D4AF37] hover:bg-[#c39e2e] text-[#100932] font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all shrink-0">
                Send 📐
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
              {['All Categories', 'Rides', 'Stays', 'Food', 'Tours'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl transition-all font-medium cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#D4AF37] text-[#100932] font-bold shadow-md shadow-[#D4AF37]/20'
                      : 'bg-[#1a0f4a] text-gray-300 hover:bg-[#241662] border border-[#362284]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {/* 3. Vendor Grid / Results Section */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Verified Listings <span className="text-xs bg-[#241662] px-2 py-0.5 rounded-full border border-[#3d2794] text-[#D4AF37]">({filteredServices.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-[#1a0f4a] rounded-2xl border border-[#362284] overflow-hidden hover:border-[#D4AF37]/50 transition-all group flex flex-col justify-between"
                >
                  <div>
                    {/* Image & Badges */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 bg-[#100932]/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-[#D4AF37] border border-[#D4AF37]/30">
                        {service.category}
                      </div>
                      <div className="absolute top-2 right-2 bg-[#D4AF37] text-[#100932] px-2.5 py-1 rounded-lg text-[10px] font-black tracking-wider uppercase shadow-md">
                        {service.badge}
                      </div>
                      
                      {/* Escrow Release Footer Tag */}
                      <div className="absolute bottom-0 inset-x-0 bg-black/75 backdrop-blur-sm px-2 py-1 text-[10px] text-gray-300 border-t border-white/10 truncate">
                        🛡️ {service.escrowNote}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-4">
                      <div className="flex items-center gap-1 text-[11px] text-gray-400 mb-1">
                        <MapPin className="w-3 h-3 text-[#D4AF37]" />
                        <span className="truncate">{service.location}</span>
                      </div>

                      <h3 className="font-bold text-white text-sm line-clamp-1 mb-2 group-hover:text-[#D4AF37] transition-colors">
                        {service.title}
                      </h3>

                      <div className="flex items-center gap-2 mb-3 text-xs">
                        <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded font-bold">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{service.rating}</span>
                        </div>
                        <span className="text-gray-400 text-[11px]">({service.reviews} bookings)</span>
                      </div>

                      {/* Perks list */}
                      <ul className="space-y-1 mb-4">
                        {service.perks.map((perk, i) => (
                          <li key={i} className="text-[11px] text-gray-300 flex items-center gap-1.5">
                            <span className="text-[#D4AF37] font-bold">•</span> {perk}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Price & Action */}
                  <div className="p-4 pt-0 border-t border-[#362284]/50 mt-auto">
                    <div className="flex items-center justify-between my-3">
                      <span className="text-[11px] text-gray-400">Escrow Rate</span>
                      <div className="text-right">
                        <span className="text-lg font-black text-[#D4AF37]">{service.pricePi} π</span>
                        <span className="text-[10px] text-gray-400"> / {service.priceUnit}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleBookClick(service)}
                      className="w-full bg-[#241662] hover:bg-[#D4AF37] hover:text-[#100932] border border-[#D4AF37]/50 text-[#D4AF37] font-bold py-2 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Book with Pi Escrow</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </main>
        </>
      )}

      {/* 4. PI ESCROW PAYMENT MODAL */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1a0f4a] border border-[#D4AF37]/50 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="bg-[#241662] px-6 py-4 border-b border-[#362284] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                <span className="font-bold text-white text-base">Pi Escrow Checkout</span>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-[#321f82] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            {!bookingSuccess ? (
              <div className="p-6">
                {/* Booking Summary Card */}
                <div className="flex gap-4 p-3 rounded-2xl bg-[#100932] border border-[#362284] mb-5">
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] font-bold uppercase text-[#D4AF37] tracking-wider">
                      {selectedService.category} • {selectedService.location}
                    </span>
                    <h4 className="font-bold text-white text-sm line-clamp-1 mt-0.5">
                      {selectedService.title}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="text-lg font-black text-[#D4AF37]">{selectedService.pricePi} π</span>
                      <span className="text-xs text-gray-400">/ {selectedService.priceUnit}</span>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2.5 text-xs text-gray-300 bg-[#241662]/50 p-4 rounded-2xl border border-[#362284] mb-5">
                  <div className="flex justify-between">
                    <span>Service Rate ({selectedService.priceUnit})</span>
                    <span className="font-semibold text-white">{selectedService.pricePi} π</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Naavi Escrow Protection Fee (1.5%)</span>
                    <span className="font-semibold text-emerald-400">
                      {(selectedService.pricePi * 0.015).toFixed(2)} π
                    </span>
                  </div>
                  <div className="border-t border-[#362284] pt-2 flex justify-between font-bold text-sm text-white">
                    <span>Total Pi to Lock in Escrow</span>
                    <span className="text-[#D4AF37]">
                      {(selectedService.pricePi * 1.015).toFixed(2)} π
                    </span>
                  </div>
                </div>

                {/* Escrow Smart Contract Guarantee Note */}
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs mb-6 flex items-start gap-2.5">
                  <Lock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#D4AF37] block mb-0.5">Non-Custodial Escrow Contract</span>
                    <span>{selectedService.escrowNote}. Funds are held safely until service completion.</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="w-1/3 py-3 rounded-xl border border-[#362284] text-xs font-semibold text-gray-300 hover:bg-[#241662] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmPayment}
                    disabled={isProcessing}
                    className="w-2/3 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c39e2e] text-[#100932] font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D4AF37]/20 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span>Connecting to Pi Wallet...</span>
                    ) : (
                      <>
                        <span>Confirm & Pay with Pi</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              /* Success View */
              <div className="p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mb-4 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Escrow Payment Locked!</h3>
                <p className="text-xs text-gray-300 max-w-xs mb-6">
                  Your funds are secured in the Pi Smart Contract. Voucher code sent to your Naavi wallet.
                </p>
                <div className="w-full bg-[#100932] p-3 rounded-xl border border-[#362284] text-xs text-gray-400 mb-6 font-mono">
                  TXID: <span className="text-[#D4AF37]">pi_tx_987f2a10b49c...</span>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full py-3 rounded-xl bg-[#241662] hover:bg-[#321f82] border border-[#D4AF37]/40 text-[#D4AF37] font-bold text-xs transition-colors cursor-pointer"
                >
                  Return to Marketplace
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
