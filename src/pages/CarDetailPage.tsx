import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SHOWROOM_CARS, ShowroomCar } from '../data/showroomData';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Sparkles,
  Phone,
  MessageSquare,
  ShieldCheck,
  Check,
  Clock,
  MapPin,
  TrendingUp,
  Fuel,
  Info,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  ShoppingBag,
  Video,
  Store,
  X,
  ArrowUp,
  ExternalLink,
  Calendar,
  Gauge,
  Zap,
  Sliders,
  Award,
} from 'lucide-react';

interface CarDetailPageProps {
  carId: string;
  onBack: () => void;
  onNavigateToHome?: () => void;
  onNavigateToBuy: () => void;
  onNavigateToSell: (carPhrase?: string) => void;
  onNavigateToShowroom: () => void;
  onNavigateToDeal: (carId: string) => void;
}

export const CarDetailPage: React.FC<CarDetailPageProps> = ({
  carId,
  onBack,
  onNavigateToHome,
  onNavigateToBuy,
  onNavigateToSell,
  onNavigateToShowroom,
  onNavigateToDeal,
}) => {
  // Find car by carId, fallback to audi-a3-sportback
  const car: ShowroomCar =
    SHOWROOM_CARS.find((c) => c.id === carId) ||
    SHOWROOM_CARS.find((c) => c.id === 'audi-a3-sportback') ||
    SHOWROOM_CARS[0];

  // Gallery active index & Lightbox modal
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareNotification, setShowShareNotification] = useState(false);

  // Expandable sections
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState<{ [key: string]: boolean }>({
    delivery: false,
    collection: false,
    perks: false,
  });

  const toggleAccordion = (key: string) => {
    setAccordionOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Modals
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isSpecsModalOpen, setIsSpecsModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isCostsModalOpen, setIsCostsModalOpen] = useState(false);
  const [isTopRatedInfoOpen, setIsTopRatedInfoOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  // Valuation input state in widget
  const [valuationInput, setValuationInput] = useState('');

  // Enquiry form state
  const [enquiryName, setEnquiryName] = useState('Alex Chileshe');
  const [enquiryPhone, setEnquiryPhone] = useState('+260 97 712 3456');
  const [enquiryMessage, setEnquiryMessage] = useState(
    `Hi, I am interested in this ${car.year} ${car.name} (${car.trim}) listed for K ${car.priceZMW.toLocaleString()}. Is it still available?`
  );
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // Phone reveal state
  const [isPhoneRevealed, setIsPhoneRevealed] = useState(false);

  // Sibling cars from same dealer or category
  const siblingCars = SHOWROOM_CARS.filter(
    (c) => c.id !== car.id && (c.dealer === car.dealer || c.make === car.make)
  ).slice(0, 3);

  // Gallery images list (fallback to at least 4 items)
  const galleryImages =
    car.images && car.images.length > 0
      ? car.images
      : [
          'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1541348263662-e0c82661210e?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
        ];

  // Scroll to top when car changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePhotoIdx(0);
  }, [car.id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShowShareNotification(true);
      setTimeout(() => setShowShareNotification(false), 3000);
    }
  };

  const handleValuationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (valuationInput.trim()) {
      onNavigateToSell(valuationInput.trim());
    } else {
      onNavigateToSell();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySubmitted(true);
    setTimeout(() => {
      setEnquirySubmitted(false);
      setIsEnquiryModalOpen(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-neutral-900 font-sans selection:bg-[#8574ff] selection:text-neutral-950 flex flex-col">
      {/* 1. Universal Top Header */}
      <Header
        onNavigateToHome={onNavigateToHome || onBack}
        onNavigateToBuy={onNavigateToBuy}
        onNavigateToSell={onNavigateToSell}
        onNavigateToShowroom={onNavigateToShowroom}
      />

      {/* Share Toast */}
      {showShareNotification && (
        <div className="fixed top-20 right-6 z-50 bg-neutral-900 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-bold border border-neutral-700 animate-in fade-in slide-in-from-top duration-200">
          <Check className="w-4 h-4 text-[#8574ff]" />
          <span>Deal link copied to clipboard!</span>
        </div>
      )}

      {/* 2. Breadcrumb & Navigation Bar */}
      <nav className="bg-white border-b border-neutral-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-neutral-800 hover:text-neutral-950 group cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-neutral-600 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back</span>
          </button>

          {/* Center Breadcrumbs (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-2 text-xs font-medium text-neutral-500">
            <span
              onClick={onNavigateToShowroom}
              className="hover:text-neutral-900 cursor-pointer"
            >
              Showroom
            </span>
            <span>/</span>
            <span>{car.make}</span>
            <span>/</span>
            <span className="font-semibold text-neutral-800 truncate max-w-[220px]">
              {car.name}
            </span>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
              aria-label="Share deal"
              title="Share deal"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600 hover:text-red-500 transition-colors cursor-pointer"
              aria-label="Save car"
              title="Save car"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite ? 'fill-red-500 text-red-500' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* 3. Main Content Container */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-4 sm:py-6 flex-1 w-full">
        {/* Gallery Section */}
        <section className="mb-6">
          {/* Desktop Gallery Grid */}
          <div className="hidden md:grid grid-cols-12 gap-2.5 h-[440px] rounded-2xl overflow-hidden bg-neutral-100 relative group">
            {/* Big Featured Left Image */}
            <div
              onClick={() => setIsGalleryOpen(true)}
              className="col-span-8 relative cursor-pointer overflow-hidden bg-neutral-900"
            >
              <img
                src={galleryImages[activePhotoIdx] || galleryImages[0]}
                alt={car.name}
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
              />
              {/* Photo Counter Badge */}
              <div className="absolute bottom-3 right-3 bg-neutral-950/80 text-white text-xs font-black px-2.5 py-1 rounded-md backdrop-blur-xs flex items-center gap-1.5 shadow-md">
                <span>📷</span>
                <span>
                  {activePhotoIdx + 1}/{galleryImages.length}
                </span>
              </div>
            </div>

            {/* 4 Thumbnails on Right (2x2 Grid) */}
            <div className="col-span-4 grid grid-cols-2 grid-rows-2 gap-2.5 relative">
              {galleryImages.slice(1, 5).map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActivePhotoIdx(idx + 1);
                    setIsGalleryOpen(true);
                  }}
                  className="relative overflow-hidden cursor-pointer bg-neutral-900 group/thumb"
                >
                  <img
                    src={imgUrl}
                    alt={`${car.name} detail ${idx + 1}`}
                    className="w-full h-full object-cover object-center group-hover/thumb:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/15 transition-colors" />
                </div>
              ))}

              {/* Floating carousel arrow */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIdx((prev) => (prev + 1) % galleryImages.length);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 text-neutral-900 shadow-xl flex items-center justify-center hover:bg-white hover:scale-105 transition-all cursor-pointer z-10"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Gallery Carousel */}
          <div className="md:hidden relative aspect-[16/11] rounded-2xl overflow-hidden bg-neutral-900">
            <img
              src={galleryImages[activePhotoIdx] || galleryImages[0]}
              alt={car.name}
              onClick={() => setIsGalleryOpen(true)}
              className="w-full h-full object-cover object-center cursor-pointer"
            />

            {/* Photo Counter Badge */}
            <div className="absolute bottom-3 right-3 bg-neutral-950/80 text-white text-[11px] font-black px-2 py-0.5 rounded shadow backdrop-blur-xs">
              📷 {activePhotoIdx + 1}/{galleryImages.length}
            </div>

            {/* Prev/Next arrows on mobile */}
            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActivePhotoIdx((prev) =>
                      prev === 0 ? galleryImages.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActivePhotoIdx((prev) => (prev + 1) % galleryImages.length)
                  }
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Dots */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded-full">
              {galleryImages.slice(0, 8).map((_, idx) => (
                <span
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === activePhotoIdx ? 'bg-white scale-125' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Full Gallery Button below images (Matches Screenshot) */}
          <button
            type="button"
            onClick={() => setIsGalleryOpen(true)}
            className="w-full mt-2 py-2.5 px-4 bg-[#f1f3f5] hover:bg-[#e9ecef] text-neutral-800 font-extrabold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer border border-neutral-200/60"
          >
            <span>📷</span>
            <span>Gallery ({galleryImages.length} photos)</span>
          </button>
        </section>

        {/* 2-Column Responsive Layout: Content Left, Sticky Dealer Rail Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Main Vehicle Details & Sections */}
          <div className="lg:col-span-8 space-y-6">
            {/* Title & Trim */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-950 tracking-tight uppercase leading-tight mb-1">
                {car.year} {car.name.toUpperCase()}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 font-semibold flex items-center flex-wrap gap-1.5">
                <span>{car.trim}</span>
                <span>•</span>
                <span className="font-bold text-neutral-800">{car.condition}</span>
                <span>•</span>
                <span className="text-neutral-700">{car.location}</span>
              </p>
            </div>

            {/* Mobile Dealer Card (Visible on mobile, matches 11_56_10 screenshot) */}
            <div className="lg:hidden bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 text-[#8574ff] flex flex-col items-center justify-center font-black text-xs shrink-0 shadow-sm">
                  <span className="text-white text-base">R</span>
                  <span className="text-[9px] text-[#8574ff] font-extrabold uppercase">
                    Top
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                    {car.dealer}
                  </p>
                  <h3 className="text-base font-black text-neutral-900 truncate">
                    {car.dealer}
                  </h3>
                  <p className="text-xs text-neutral-500 font-medium">
                    {car.dealerReviewsCount
                      ? `★ ${car.dealerRating} (${car.dealerReviewsCount} reviews)`
                      : 'No reviews'}
                  </p>
                </div>
              </div>

              <div className="mt-2.5 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="font-semibold text-neutral-700">{car.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  <span className="text-neutral-700 font-semibold text-[11px]">
                    Online now
                  </span>
                  {car.isTopRated && (
                    <span className="bg-neutral-900 text-[#8574ff] text-[10px] font-black px-1.5 py-0.5 rounded ml-1">
                      Top Rated Dealer
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsTopRatedInfoOpen(true)}
                className="mt-2 text-[11px] font-semibold text-neutral-500 hover:text-neutral-800 flex items-center gap-1 cursor-pointer"
              >
                <Info className="w-3 h-3 text-neutral-400" />
                <span>What is a top rated dealer?</span>
              </button>
            </div>

            {/* Price Box */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/90 shadow-xs">
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-0.5">
                Price
              </p>
              <div className="flex items-baseline gap-3 flex-wrap">
                <p className="text-3xl sm:text-4xl font-black text-neutral-950 tracking-tight">
                  K {car.priceZMW.toLocaleString()}
                </p>
                <span className="text-xs sm:text-sm font-extrabold text-neutral-500">
                  or from{' '}
                  <span className="text-neutral-900 font-black">
                    K {car.monthlyZMW.toLocaleString()}
                  </span>
                  /mo
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-medium mt-1">
                Call or message to get more details on this offer
              </p>
            </div>

            {/* 6-Box Primary Specifications Grid (Matches Screenshot exactly) */}
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {/* 1. YEAR */}
                <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-xs">
                  <p className="text-[11px] font-extrabold text-neutral-500 uppercase tracking-wider">
                    Year
                  </p>
                  <p className="text-base sm:text-lg font-black text-neutral-950 mt-0.5">
                    {car.year}
                  </p>
                </div>

                {/* 2. MILEAGE */}
                <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-xs">
                  <p className="text-[11px] font-extrabold text-neutral-500 uppercase tracking-wider">
                    Mileage
                  </p>
                  <p className="text-base sm:text-lg font-black text-neutral-950 mt-0.5">
                    {car.mileageKm.toLocaleString()} miles
                  </p>
                </div>

                {/* 3. POWER */}
                <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-xs">
                  <p className="text-[11px] font-extrabold text-neutral-500 uppercase tracking-wider">
                    Power
                  </p>
                  <p className="text-base sm:text-lg font-black text-neutral-950 mt-0.5">
                    {car.bhp || 116} <span className="text-xs font-bold text-neutral-500">bhp</span>
                  </p>
                </div>

                {/* 4. ENGINE */}
                <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-xs">
                  <p className="text-[11px] font-extrabold text-neutral-500 uppercase tracking-wider">
                    Engine
                  </p>
                  <p className="text-base sm:text-lg font-black text-neutral-950 mt-0.5">
                    {car.engineSize}
                  </p>
                </div>

                {/* 5. GEARBOX */}
                <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-xs">
                  <p className="text-[11px] font-extrabold text-neutral-500 uppercase tracking-wider">
                    Gearbox
                  </p>
                  <p className="text-base sm:text-lg font-black text-neutral-950 mt-0.5">
                    {car.gearbox}
                  </p>
                </div>

                {/* 6. FUEL */}
                <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-xs">
                  <p className="text-[11px] font-extrabold text-neutral-500 uppercase tracking-wider">
                    Fuel
                  </p>
                  <p className="text-base sm:text-lg font-black text-neutral-950 mt-0.5">
                    {car.fuelType}
                  </p>
                </div>
              </div>

              {/* Feature Chips */}
              <div className="flex flex-wrap gap-2 mt-3">
                {car.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="bg-white border border-neutral-200 text-neutral-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-2xs"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* View all specs and features button */}
              <button
                type="button"
                onClick={() => setIsSpecsModalOpen(true)}
                className="w-full mt-3 py-3 px-4 bg-[#f1f3f5] hover:bg-[#e9ecef] text-neutral-900 font-extrabold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer border border-neutral-200/80 text-center"
              >
                View all specs and features
              </button>
            </div>

            {/* WHY THIS CAR? Section (Matches Screenshot) */}
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-black text-neutral-950 tracking-tight uppercase">
                Why this car?
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Card 1: One keeper */}
                <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
                  <h3 className="text-sm font-black text-neutral-900">
                    {car.ownersCount || 1} keeper from new
                  </h3>
                  <p className="text-xs text-neutral-500 font-medium mt-0.5">
                    Just one registered keeper
                  </p>
                </div>

                {/* Card 2: Insurance Group */}
                <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="text-sm font-black text-neutral-900">
                        Insurance group {car.insuranceGroup || '17E'}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setIsHistoryModalOpen(true)}
                        className="text-neutral-400 hover:text-neutral-600"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-neutral-500 font-medium mt-0.5">
                      Cheaper to insure than most
                    </p>
                  </div>
                </div>

                {/* Card 3: Touchscreen infotainment */}
                <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs sm:col-span-2 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="text-sm font-black text-neutral-900">
                        Touchscreen infotainment
                      </h3>
                      <button
                        type="button"
                        onClick={() => setIsSpecsModalOpen(true)}
                        className="text-neutral-400 hover:text-neutral-600"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-neutral-500 font-medium mt-0.5">
                      Easy access to media and navigation
                    </p>
                  </div>
                </div>
              </div>

              {/* Featured Green Manufacturer Warranty Card */}
              <div className="bg-[#12b886]/10 border border-[#12b886]/30 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-full bg-[#12b886] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm sm:text-base font-black text-neutral-950">
                    Audi manufacturer warranty included
                  </h3>
                  <p className="text-xs text-neutral-700 font-medium mt-0.5">
                    {car.warrantyText ||
                      '3 years or 60,000 miles, whichever comes first • Valid until March 2029'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSpecsModalOpen(true)}
                    className="text-[11px] font-bold text-neutral-600 hover:text-neutral-900 underline mt-1.5 cursor-pointer block"
                  >
                    Terms and conditions apply
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions: Car History & Running Costs */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => setIsHistoryModalOpen(true)}
                className="w-full py-3 px-4 bg-[#f1f3f5] hover:bg-[#e9ecef] text-neutral-900 font-extrabold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer border border-neutral-200/80"
              >
                <TrendingUp className="w-4 h-4 text-neutral-700" />
                <span>Car History</span>
              </button>

              <button
                type="button"
                onClick={() => setIsCostsModalOpen(true)}
                className="w-full py-3 px-4 bg-[#f1f3f5] hover:bg-[#e9ecef] text-neutral-900 font-extrabold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer border border-neutral-200/80"
              >
                <Fuel className="w-4 h-4 text-neutral-700" />
                <span>Running Costs</span>
              </button>
            </div>

            {/* FROM THE DEALER Section */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-neutral-200/90 shadow-xs space-y-3">
              <h2 className="text-base sm:text-lg font-black text-neutral-950 uppercase tracking-tight">
                From the dealer
              </h2>

              <p
                className={`text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal ${
                  !isDescriptionExpanded ? 'line-clamp-3' : ''
                }`}
              >
                {car.fullDescription ||
                  'Adaptive Cruise Control, Airbags - Driver and Front Passenger with Passenger Airbag Deactivation, Anti-Theft Alarm, Attention and Fatigue Detection, Audi Drive Select, Audi Pre-Sense Front with Pedestrian and Cyclist Recognition, Camera Based Traffic Sign Recognition, Dual-Zone Electronic Climate Control, LED Headlights with LED Daytime-Running Lights, Light and Rain Sensor, MMI Navigation Plus with High Resolution 10.1in Touchscreen Display, Audi Smartphone Interface (Wireless Apple CarPlay and Android Auto), Rear Parking Sensors, Heated Front Sports Seats, 17in 5-Parallel Spoke Alloy Wheels, Lane Departure Warning, DAB Digital Radio.'}
              </p>

              <button
                type="button"
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="w-full py-2.5 px-4 bg-[#f1f3f5] hover:bg-[#e9ecef] text-neutral-900 font-extrabold text-xs rounded-xl transition-colors cursor-pointer border border-neutral-200/70"
              >
                {isDescriptionExpanded ? 'Show less' : 'Read the full description'}
              </button>
            </div>

            {/* Location Section */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-neutral-200/90 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-black text-neutral-950 uppercase tracking-tight">
                  Location
                </h2>
                <span className="text-xs text-neutral-500 font-medium">
                  {car.location}
                </span>
              </div>

              {/* Map Preview Card */}
              <div
                onClick={() => setIsMapModalOpen(true)}
                className="relative h-48 rounded-xl overflow-hidden cursor-pointer border border-neutral-200 bg-sky-50 group"
              >
                {/* Stylized Map Vector Background */}
                <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-100/80 via-white/40 to-emerald-100/60" />

                {/* Map streets mock lines */}
                <div className="absolute top-1/2 left-0 right-0 h-4 bg-white/80 -rotate-6 shadow-xs" />
                <div className="absolute top-0 bottom-0 left-1/3 w-4 bg-white/80 rotate-12 shadow-xs" />
                <div className="absolute top-0 bottom-0 left-2/3 w-3 bg-amber-100/90 shadow-xs" />

                {/* Center Pin Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                  <div className="bg-neutral-950 text-white text-[10px] font-black px-2 py-0.5 rounded shadow mb-1 whitespace-nowrap">
                    {car.dealer}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#8574ff] text-neutral-950 flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                    <MapPin className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>

                {/* Overlay Button */}
                <div className="absolute inset-x-0 bottom-3 flex justify-center z-10">
                  <span className="bg-white/95 text-neutral-900 font-black text-xs px-4 py-2 rounded-xl shadow-md group-hover:scale-105 transition-transform border border-neutral-200">
                    Click to interact with map
                  </span>
                </div>
              </div>

              <p className="text-xs text-neutral-500 font-medium">
                {car.dealerAddress ||
                  'Prestige Motor Complex, Magdalen Laver / Great East Hub, Lusaka, Zambia'}
              </p>
            </div>

            {/* Perks & services offered (Matches Screenshot) */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-neutral-200/90 shadow-xs space-y-4">
              <h2 className="text-base sm:text-lg font-black text-neutral-950 uppercase tracking-tight">
                Perks & services offered
              </h2>

              {/* 4 Icon Matrix */}
              <div className="grid grid-cols-2 gap-4 pt-1 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-800 flex items-center justify-center shrink-0">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-neutral-800">
                    Part-exchange available
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-800 flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-neutral-800">Buy online</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-800 flex items-center justify-center shrink-0">
                    <Video className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-neutral-800">Video call</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-800 flex items-center justify-center shrink-0">
                    <Store className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-neutral-800">
                    Click and collect
                  </span>
                </div>
              </div>

              {/* 3 Accordions */}
              <div className="border-t border-neutral-200/80 divide-y divide-neutral-200/80">
                {/* 1. Delivery */}
                <div className="py-3">
                  <button
                    type="button"
                    onClick={() => toggleAccordion('delivery')}
                    className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-black text-neutral-900 cursor-pointer"
                  >
                    <span>Delivery</span>
                    {accordionOpen.delivery ? (
                      <ChevronUp className="w-4 h-4 text-neutral-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-500" />
                    )}
                  </button>
                  {accordionOpen.delivery && (
                    <div className="mt-2 text-xs text-neutral-600 space-y-1 pl-1">
                      <p>
                        • <strong>Free delivery</strong> within Lusaka and Copperbelt
                        metro areas.
                      </p>
                      <p>
                        • Nationwide flat-rate carrier delivery to Ndola, Kitwe, Livingstone,
                        and Chipata within 48–72 hours.
                      </p>
                    </div>
                  )}
                </div>

                {/* 2. Collection */}
                <div className="py-3">
                  <button
                    type="button"
                    onClick={() => toggleAccordion('collection')}
                    className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-black text-neutral-900 cursor-pointer"
                  >
                    <span>Collection</span>
                    {accordionOpen.collection ? (
                      <ChevronUp className="w-4 h-4 text-neutral-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-500" />
                    )}
                  </button>
                  {accordionOpen.collection && (
                    <div className="mt-2 text-xs text-neutral-600 space-y-1 pl-1">
                      <p>
                        • Same-day handover available at{' '}
                        <strong>{car.dealer}</strong> showroom.
                      </p>
                      <p>
                        • Complete a 30-minute vehicle demonstration with dedicated
                        product specialist.
                      </p>
                    </div>
                  )}
                </div>

                {/* 3. Perks */}
                <div className="py-3">
                  <button
                    type="button"
                    onClick={() => toggleAccordion('perks')}
                    className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-black text-neutral-900 cursor-pointer"
                  >
                    <span>Perks</span>
                    {accordionOpen.perks ? (
                      <ChevronUp className="w-4 h-4 text-neutral-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-500" />
                    )}
                  </button>
                  {accordionOpen.perks && (
                    <div className="mt-2 text-xs text-neutral-600 space-y-1 pl-1">
                      <p>• 100-point mechanical inspection signed off by master technician.</p>
                      <p>• 14-day money-back peace of mind policy on certified orders.</p>
                      <p>• Full tank of fuel and complimentary deep detail valet included.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Legal Disclaimer & Deal ID */}
            <div className="text-[11px] text-neutral-500 leading-relaxed space-y-1.5 pt-2">
              <p>
                Whilst Autoace uses reasonable efforts to ensure accuracy all information
                and details must be confirmed when enquiring. Autoace makes no
                representations, warranties or guarantees, whether express or implied,
                that this information is accurate, complete or up to date. Autoace will not
                accept liability for the information provided.
              </p>
              <p className="font-semibold text-neutral-600">
                Deal ID: {car.dealId || 'c91137fa08a0a51334060ca69908c9ed'}
              </p>
            </div>

            {/* "Value my car" Widget (Matches Screenshot) */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-neutral-200/90 shadow-xs space-y-3">
              <h2 className="text-lg font-black text-neutral-950 uppercase tracking-tight">
                Value my car
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600">
                We check over thousands of dealers to find you the best price for your
                car.
              </p>

              <form onSubmit={handleValuationSubmit} className="space-y-3">
                <input
                  type="text"
                  value={valuationInput}
                  onChange={(e) => setValuationInput(e.target.value)}
                  placeholder="E.G. BKI7 GTD or 2009 Toyota Mark X"
                  className="w-full h-14 uppercase px-4 text-center text-lg sm:text-xl font-black tracking-wider text-neutral-900 border-2 border-neutral-300 rounded-xl focus:border-[#8574ff] focus:ring-2 focus:ring-[#8574ff]/20 outline-hidden transition-all bg-neutral-50/50 placeholder:text-neutral-300"
                />

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-[#8574ff] hover:bg-[#7360f2] text-neutral-950 font-black text-sm rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  Value my car
                </button>
              </form>
            </div>

            {/* MORE FROM [DEALER] Section */}
            {siblingCars.length > 0 && (
              <div className="space-y-4 pt-4">
                <h2 className="text-lg sm:text-xl font-black text-neutral-950 uppercase tracking-tight">
                  More from {car.dealer}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {siblingCars.map((sibling) => (
                    <article
                      key={sibling.id}
                      onClick={() => onNavigateToDeal(sibling.id)}
                      className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer group"
                    >
                      <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden">
                        <img
                          src={sibling.images[0]}
                          alt={sibling.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                        {sibling.isTopRated && (
                          <div className="absolute top-2.5 left-2.5 bg-neutral-950/90 text-[#8574ff] text-[10px] font-black px-2 py-0.5 rounded shadow-sm">
                            Top Rated Dealer
                          </div>
                        )}
                      </div>

                      <div className="p-4">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[10px] font-black text-white bg-neutral-900 rounded px-1.5 py-0.5">
                            {sibling.condition}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-500 font-semibold truncate">
                          {sibling.trim}
                        </p>
                        <h3 className="text-base font-black text-neutral-900 truncate">
                          {sibling.name}
                        </h3>
                        <p className="text-xs text-neutral-600 font-medium mb-2">
                          {sibling.gearbox} • {sibling.fuelType} • {sibling.engineSize}
                        </p>
                        <p className="text-xl font-black text-neutral-950">
                          K {sibling.priceZMW.toLocaleString()}
                        </p>
                        <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
                          <span className="truncate">{sibling.location}</span>
                          <span>
                            {sibling.year} • {sibling.mileageKm.toLocaleString()} km
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    type="button"
                    onClick={onNavigateToShowroom}
                    className="py-3 px-8 bg-[#8574ff] hover:bg-[#7360f2] text-neutral-950 font-black text-xs sm:text-sm rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    See all deals
                  </button>
                </div>
              </div>
            )}

            {/* Back to Top */}
            <div className="flex flex-col items-center justify-center pt-6 pb-2">
              <button
                type="button"
                onClick={scrollToTop}
                className="flex flex-col items-center gap-1 text-xs font-black text-neutral-600 hover:text-neutral-950 transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full border border-neutral-300 bg-white shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform">
                  <ArrowUp className="w-4 h-4 text-neutral-700" />
                </div>
                <span>Back to top</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Dealer Box (Desktop View) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-16 space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-md space-y-4">
              {/* Dealer Header */}
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-2xl bg-neutral-900 text-[#8574ff] flex flex-col items-center justify-center font-black shadow-inner shrink-0">
                  <span className="text-xl leading-none">R</span>
                  <span className="text-[9px] text-[#8574ff] font-extrabold uppercase mt-0.5">
                    Top
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    Official Dealer
                  </p>
                  <h3 className="text-lg font-black text-neutral-950 truncate">
                    {car.dealer}
                  </h3>
                  <p className="text-xs text-neutral-500 font-medium">
                    {car.dealerReviewsCount
                      ? `★ ${car.dealerRating} (${car.dealerReviewsCount} reviews)`
                      : 'No reviews'}
                  </p>
                </div>
              </div>

              {/* Status & Location */}
              <div className="pt-2 border-t border-neutral-100 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{car.location}</span>
                  </span>
                  <span className="flex items-center gap-1 font-bold text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    <span>Online now</span>
                  </span>
                </div>

                {car.isTopRated && (
                  <div className="bg-neutral-950 text-[#8574ff] text-xs font-black px-3 py-1.5 rounded-lg flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Top Rated Dealer</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsTopRatedInfoOpen(true)}
                      className="text-neutral-400 hover:text-white"
                      title="Learn more"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Price Callout in Sticky Bar */}
              <div className="pt-2 border-t border-neutral-100">
                <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                  Cash Price
                </p>
                <p className="text-3xl font-black text-neutral-950 tracking-tight">
                  K {car.priceZMW.toLocaleString()}
                </p>
                <p className="text-xs text-neutral-500 font-semibold mt-0.5">
                  or from{' '}
                  <span className="text-neutral-900 font-black">
                    K {car.monthlyZMW.toLocaleString()}
                  </span>
                  /mo
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEnquiryModalOpen(true)}
                  className="w-full py-3.5 px-4 bg-[#8574ff] hover:bg-[#7360f2] text-neutral-950 font-black text-sm rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-neutral-950" />
                  <span>Enquire now</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsPhoneRevealed(!isPhoneRevealed)}
                  className="w-full py-3 px-4 bg-neutral-900 hover:bg-neutral-800 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#8574ff]" />
                  <span>
                    {isPhoneRevealed
                      ? car.dealerPhone || '+260 97 712 3456'
                      : '01277 674555 (Click to call)'}
                  </span>
                </button>
              </div>

              {/* Guarantees */}
              <div className="pt-3 border-t border-neutral-100 space-y-2 text-[11px] text-neutral-600 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified paperwork & registration inspection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Replies within 15 minutes during office hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Autoace 14-day return satisfaction pledge</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* 4. Mobile Sticky Bottom Contact Bar (Matches 11_56_10 screenshot) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-neutral-200 px-4 py-3 z-40 shadow-2xl flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
            Price
          </p>
          <p className="text-lg font-black text-neutral-950 leading-tight truncate">
            K {car.priceZMW.toLocaleString()}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsPhoneRevealed(!isPhoneRevealed)}
          className="p-3 bg-neutral-100 text-neutral-900 rounded-xl hover:bg-neutral-200 transition-colors"
          aria-label="Call dealer"
        >
          <Phone className="w-5 h-5 text-neutral-800" />
        </button>

        <button
          type="button"
          onClick={() => setIsEnquiryModalOpen(true)}
          className="py-3 px-5 bg-[#8574ff] hover:bg-[#7360f2] text-neutral-950 font-black text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer shrink-0"
        >
          Enquire now
        </button>
      </div>

      {/* MODAL 1: Fullscreen Photo Lightbox */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white pb-3 border-b border-neutral-800">
            <span className="text-sm font-black">
              {car.name} ({activePhotoIdx + 1} of {galleryImages.length})
            </span>
            <button
              type="button"
              onClick={() => setIsGalleryOpen(false)}
              className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Stage Image */}
          <div className="relative flex-1 flex items-center justify-center py-4">
            <img
              src={galleryImages[activePhotoIdx]}
              alt={car.name}
              className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl"
            />

            {/* Nav Arrows */}
            <button
              type="button"
              onClick={() =>
                setActivePhotoIdx((prev) =>
                  prev === 0 ? galleryImages.length - 1 : prev - 1
                )
              }
              className="absolute left-2 sm:left-6 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center cursor-pointer shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={() =>
                setActivePhotoIdx((prev) => (prev + 1) % galleryImages.length)
              }
              className="absolute right-2 sm:right-6 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnails */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
            {galleryImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt=""
                onClick={() => setActivePhotoIdx(idx)}
                className={`w-14 h-10 object-cover rounded cursor-pointer transition-all ${
                  idx === activePhotoIdx
                    ? 'ring-2 ring-[#8574ff] scale-105'
                    : 'opacity-50 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* MODAL 2: Enquiry Dialog */}
      {isEnquiryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-neutral-200 animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsEnquiryModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {enquirySubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="text-xl font-black text-neutral-950">
                  Enquiry Sent Successfully!
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  <strong>{car.dealer}</strong> has received your interest for the{' '}
                  <strong>{car.year} {car.name}</strong>. Their agent will call or WhatsApp
                  you at <strong>{enquiryPhone}</strong> shortly.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={car.images[0]}
                    alt=""
                    className="w-14 h-11 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-sm font-black text-neutral-900 leading-snug">
                      Enquire with {car.dealer}
                    </h3>
                    <p className="text-xs text-neutral-500 font-semibold">
                      {car.name} • K {car.priceZMW.toLocaleString()}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleEnquirySubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-black uppercase text-neutral-600 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={enquiryName}
                      onChange={(e) => setEnquiryName(e.target.value)}
                      className="w-full h-10 px-3 border border-neutral-300 rounded-lg text-xs font-semibold focus:border-[#8574ff] focus:ring-1 focus:ring-[#8574ff] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase text-neutral-600 mb-1">
                      Phone Number (WhatsApp)
                    </label>
                    <input
                      type="text"
                      required
                      value={enquiryPhone}
                      onChange={(e) => setEnquiryPhone(e.target.value)}
                      className="w-full h-10 px-3 border border-neutral-300 rounded-lg text-xs font-semibold focus:border-[#8574ff] focus:ring-1 focus:ring-[#8574ff] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase text-neutral-600 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      value={enquiryMessage}
                      onChange={(e) => setEnquiryMessage(e.target.value)}
                      className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs text-neutral-800 focus:border-[#8574ff] focus:ring-1 focus:ring-[#8574ff] outline-hidden"
                    />
                  </div>

                  {/* Preset prompt pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() =>
                        setEnquiryMessage(
                          `Hi, can I schedule a test drive for the ${car.name}?`
                        )
                      }
                      className="text-[10px] font-bold px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-md cursor-pointer"
                    >
                      Book test drive
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setEnquiryMessage(
                          `Hi, I have a car to part-exchange against this ${car.name}. Can you value it?`
                        )
                      }
                      className="text-[10px] font-bold px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-md cursor-pointer"
                    >
                      Part-exchange enquiry
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setEnquiryMessage(
                          `Hi, what is your best cash price or discount on this vehicle?`
                        )
                      }
                      className="text-[10px] font-bold px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-md cursor-pointer"
                    >
                      Best price offer
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 bg-[#8574ff] hover:bg-[#7360f2] text-neutral-950 font-black text-xs sm:text-sm rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    Send message to dealer
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: All Specs & Features */}
      {isSpecsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative border border-neutral-200 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsSpecsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-neutral-950 mb-1">
              {car.year} {car.name} Specifications
            </h3>
            <p className="text-xs text-neutral-500 font-semibold mb-6">
              Complete manufacturer specifications and options
            </p>

            <div className="space-y-6">
              {(car.detailedSpecs || [
                {
                  category: 'Engine & Performance',
                  items: [
                    { label: 'Engine Size', value: car.engineSize },
                    { label: 'Power', value: `${car.bhp || 116} bhp` },
                    { label: 'Transmission', value: car.gearbox },
                    { label: 'Fuel Type', value: car.fuelType },
                    { label: 'Mileage', value: `${car.mileageKm.toLocaleString()} miles / km` },
                  ],
                },
                {
                  category: 'Exterior & Style',
                  items: [
                    { label: 'Body Style', value: car.bodyStyle },
                    { label: 'Trim Level', value: car.trim },
                    { label: 'Alloys', value: '17in 5-Spoke Alloy Wheels' },
                    { label: 'Lighting', value: 'Full LED Headlights & Daytime Running' },
                  ],
                },
                {
                  category: 'Interior & Tech',
                  items: [
                    { label: 'Infotainment', value: 'MMI High-Res Touchscreen Display' },
                    { label: 'Smartphone Interface', value: 'Apple CarPlay & Android Auto' },
                    { label: 'Climate Control', value: 'Dual-Zone Automatic Electronic AC' },
                    { label: 'Seating', value: 'Heated Front Sports Seats' },
                  ],
                },
              ]).map((section, idx) => (
                <div key={idx} className="border-t border-neutral-200 pt-4">
                  <h4 className="text-xs font-black uppercase text-neutral-500 tracking-wider mb-2.5">
                    {section.category}
                  </h4>
                  <div className="divide-y divide-neutral-100">
                    {section.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="py-2 flex items-center justify-between text-xs"
                      >
                        <span className="text-neutral-500 font-medium">{item.label}</span>
                        <span className="font-bold text-neutral-900">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-200">
              <button
                type="button"
                onClick={() => setIsSpecsModalOpen(false)}
                className="w-full py-2.5 bg-neutral-900 text-white font-bold text-xs rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Close specifications
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Car History Report */}
      {isHistoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-neutral-200 animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsHistoryModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-[#8574ff]" />
              <h3 className="text-lg font-black text-neutral-950">
                Official Vehicle History Check
              </h3>
            </div>
            <p className="text-xs text-neutral-500 font-medium mb-4">
              Verified by Autoace National Vehicle Registry & Police Database
            </p>

            <div className="space-y-2.5 divide-y divide-neutral-100">
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-neutral-600 font-medium">Stolen Record Check</span>
                <span className="font-extrabold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> No recorded issues
                </span>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-neutral-600 font-medium">Accident / Total Loss Write-Off</span>
                <span className="font-extrabold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Clear (Not written off)
                </span>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-neutral-600 font-medium">Outstanding Finance / Lien</span>
                <span className="font-extrabold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> All cleared
                </span>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-neutral-600 font-medium">Odometer Discrepancy</span>
                <span className="font-extrabold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Verified ({car.mileageKm.toLocaleString()} miles)
                </span>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-neutral-600 font-medium">Number of Previous Keepers</span>
                <span className="font-bold text-neutral-900">{car.ownersCount || 1} Keeper</span>
              </div>
            </div>

            <div className="mt-5 p-3 rounded-xl bg-neutral-50 text-[11px] text-neutral-500 leading-snug">
              Every car listed on Autoace undergoes a comprehensive 5-point data verification
              against Zambian Police and Transport Regulatory databases before publishing.
            </div>

            <button
              type="button"
              onClick={() => setIsHistoryModalOpen(false)}
              className="w-full mt-4 py-2.5 bg-neutral-900 text-white font-bold text-xs rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* MODAL 5: Running Costs Breakdown */}
      {isCostsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-neutral-200 animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsCostsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Fuel className="w-5 h-5 text-[#8574ff]" />
              <h3 className="text-lg font-black text-neutral-950">
                Running Costs Estimate
              </h3>
            </div>
            <p className="text-xs text-neutral-500 font-medium mb-4">
              Estimated operating expenses based on 15,000 km/year in Zambia
            </p>

            <div className="space-y-3">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex justify-between items-center text-xs">
                <span className="font-semibold text-neutral-600">Fuel Economy (Combined)</span>
                <span className="font-black text-neutral-900">5.2 L / 100 km (54 mpg)</span>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex justify-between items-center text-xs">
                <span className="font-semibold text-neutral-600">Est. Fuel Cost / Month</span>
                <span className="font-black text-neutral-900">~K 2,450 / mo</span>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex justify-between items-center text-xs">
                <span className="font-semibold text-neutral-600">Insurance Group</span>
                <span className="font-black text-emerald-600">17E (Competitive premium)</span>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex justify-between items-center text-xs">
                <span className="font-semibold text-neutral-600">Annual Road Tax & Fitness</span>
                <span className="font-black text-neutral-900">K 1,450 / year</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCostsModalOpen(false)}
              className="w-full mt-5 py-2.5 bg-neutral-900 text-white font-bold text-xs rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* MODAL 6: Top Rated Dealer Info */}
      {isTopRatedInfoOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-neutral-200 animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsTopRatedInfoOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-xl bg-neutral-950 text-[#8574ff] flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>

            <h3 className="text-lg font-black text-neutral-950 mb-1">
              What is an Autoace Top Rated Dealer?
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed space-y-2 mb-4">
              Top Rated Dealers earn this distinction based on verified buyer satisfaction,
              rapid responsiveness, zero hidden markups, and strict compliance with our
              100-point vehicle inspection protocol.
            </p>

            <div className="space-y-2 text-xs text-neutral-700">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Over 95% 5-star customer feedback</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Transparent fixed pricing guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Minimum 12-month mechanical warranty included</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsTopRatedInfoOpen(false)}
              className="w-full mt-5 py-2.5 bg-neutral-900 text-white font-bold text-xs rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* MODAL 7: Interactive Map Preview */}
      {isMapModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative border border-neutral-200 animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsMapModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-black text-neutral-950 mb-1">
              Dealership Location & Directions
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              {car.dealerAddress || 'Magdalen Laver / Great East Hub, Lusaka'}
            </p>

            {/* Stylized Big Map Canvas */}
            <div className="h-64 rounded-xl overflow-hidden relative border border-neutral-300 bg-neutral-100 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-200/50 via-white/50 to-emerald-200/50" />

              <div className="absolute top-1/2 left-0 right-0 h-6 bg-white/90 -rotate-3 shadow-sm" />
              <div className="absolute top-0 bottom-0 left-1/2 w-6 bg-white/90 rotate-6 shadow-sm" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="bg-neutral-950 text-white text-xs font-black px-3 py-1 rounded-lg shadow-lg mb-1">
                  {car.dealer}
                </div>
                <div className="w-10 h-10 rounded-full bg-[#8574ff] text-neutral-950 flex items-center justify-center shadow-xl border-2 border-white">
                  <MapPin className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${car.dealer} ${car.location} Zambia`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 bg-[#8574ff] text-neutral-950 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#7360f2] transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => setIsMapModalOpen(false)}
                className="px-5 py-2.5 bg-neutral-100 text-neutral-800 font-bold text-xs rounded-xl hover:bg-neutral-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Universal Footer */}
      <Footer onNavigateToHome={onNavigateToHome || onBack} />
    </div>
  );
};
