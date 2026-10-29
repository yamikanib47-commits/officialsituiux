import React, { useState, useMemo, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ShowroomCar } from '../data/showroomData';
import { getInventoryCars } from '../services/inventoryService';
import {
  Search,
  Filter,
  X,
  Heart,
  ChevronDown,
  ChevronUp,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Phone,
  MessageSquare,
  ShieldCheck,
  Calendar,
  Check,
  SlidersHorizontal,
  Zap,
  TrendingDown,
  Compass,
  Users,
} from 'lucide-react';

interface ShowroomPageProps {
  onBackToHome: () => void;
  onNavigateToBuy: () => void;
  onNavigateToSell: (carPhrase?: string) => void;
  onNavigateToDeal?: (carId: string) => void;
  onNavigateToAdmin?: () => void;
}

export const ShowroomPage: React.FC<ShowroomPageProps> = ({
  onBackToHome,
  onNavigateToBuy,
  onNavigateToSell,
  onNavigateToDeal,
  onNavigateToAdmin,
}) => {

  // Mobile filter drawer toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Active lifestyle pill
  const [activeLifestyleTag, setActiveLifestyleTag] = useState<string | null>(null);

  // Vehicle category filter: Cars vs Vans
  const [vehicleCategory, setVehicleCategory] = useState<'Cars' | 'Vans'>('Cars');

  // Accordion section collapse state
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    location: true,
    makeModel: true,
    payment: true,
    price: true,
    mileage: false,
    bodyDrive: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Filter States
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedMake, setSelectedMake] = useState<string>('All');
  const [selectedBodyStyle, setSelectedBodyStyle] = useState<string>('All');
  const [selectedFuelType, setSelectedFuelType] = useState<string>('All');
  const [selectedGearbox, setSelectedGearbox] = useState<string>('All');
  const [paymentType, setPaymentType] = useState<'cash' | 'lease'>('cash');
  const [maxPriceZMW, setMaxPriceZMW] = useState<number>(1000000);
  const [minPriceZMW, setMinPriceZMW] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'newest' | 'mileage-asc'>('recommended');
  const [savedSearches, setSavedSearches] = useState(false);

  // Selected car for Dealer Contact / Inspection Modal
  const [selectedCar, setSelectedCar] = useState<ShowroomCar | null>(null);
  const [activeImageIndexes, setActiveImageIndexes] = useState<{ [carId: string]: number }>({});
  const [savedCarIds, setSavedCarIds] = useState<{ [carId: string]: boolean }>({});

  // Lead modal form state
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [buyerName, setBuyerName] = useState('Alex Chileshe');
  const [buyerPhone, setBuyerPhone] = useState('+260 97 712 3456');

  const nextImage = (carId: string, max: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndexes((prev) => ({
      ...prev,
      [carId]: ((prev[carId] || 0) + 1) % max,
    }));
  };

  const prevImage = (carId: string, max: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndexes((prev) => ({
      ...prev,
      [carId]: (prev[carId] || 0) === 0 ? max - 1 : (prev[carId] || 0) - 1,
    }));
  };

  const toggleSaveCar = (carId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedCarIds((prev) => ({ ...prev, [carId]: !prev[carId] }));
  };

  const [allCars, setAllCars] = useState<ShowroomCar[]>(() => getInventoryCars());

  useEffect(() => {
    const handleUpdate = () => setAllCars(getInventoryCars());
    window.addEventListener('autoace_inventory_updated', handleUpdate);
    return () => window.removeEventListener('autoace_inventory_updated', handleUpdate);
  }, []);

  // Filter logic
  const filteredCars = useMemo(() => {
    let result = [...allCars];

    // Category
    if (vehicleCategory === 'Vans') {
      result = result.filter((c) => c.bodyStyle === 'Double Cab' || c.make === 'Vauxhall');
    }

    // Lifestyle tags
    if (activeLifestyleTag) {
      result = result.filter((c) => c.lifestyleTags.includes(activeLifestyleTag as any));
    }

    // Make
    if (selectedMake !== 'All') {
      result = result.filter((c) => c.make.toLowerCase() === selectedMake.toLowerCase());
    }

    // Body Style
    if (selectedBodyStyle !== 'All') {
      result = result.filter((c) => c.bodyStyle === selectedBodyStyle);
    }

    // Fuel Type
    if (selectedFuelType !== 'All') {
      result = result.filter((c) => c.fuelType === selectedFuelType);
    }

    // Gearbox
    if (selectedGearbox !== 'All') {
      result = result.filter((c) => c.gearbox === selectedGearbox);
    }

    // Price range
    result = result.filter((c) => c.priceZMW >= minPriceZMW && c.priceZMW <= maxPriceZMW);

    // Location
    if (locationQuery.trim()) {
      const q = locationQuery.toLowerCase();
      result = result.filter(
        (c) => c.location.toLowerCase().includes(q) || c.dealer.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.priceZMW - b.priceZMW);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.priceZMW - a.priceZMW);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.year - a.year);
    } else if (sortBy === 'mileage-asc') {
      result.sort((a, b) => a.mileageKm - b.mileageKm);
    }

    return result;
  }, [
    vehicleCategory,
    activeLifestyleTag,
    selectedMake,
    selectedBodyStyle,
    selectedFuelType,
    selectedGearbox,
    minPriceZMW,
    maxPriceZMW,
    locationQuery,
    sortBy,
  ]);

  const resetAllFilters = () => {
    setActiveLifestyleTag(null);
    setSelectedMake('All');
    setSelectedBodyStyle('All');
    setSelectedFuelType('All');
    setSelectedGearbox('All');
    setLocationQuery('');
    setMinPriceZMW(0);
    setMaxPriceZMW(1000000);
    setSortBy('recommended');
  };

  const makes = [
    'All',
    'Audi',
    'BMW',
    'Citroen',
    'Ford',
    'Kia',
    'Land Rover',
    'Mazda',
    'Mercedes-Benz',
    'Nissan',
    'Peugeot',
    'Toyota',
    'Vauxhall',
    'Volvo',
  ];

  return (
    <div className="min-h-screen bg-[#f8f7f5] text-slate-900 font-sans flex flex-col selection:bg-[#8574ff] selection:text-neutral-950">
      {/* 1. Universal Autoace Header */}
      <Header
        onNavigateToHome={onBackToHome}
        onNavigateToBuy={onNavigateToBuy}
        onNavigateToSell={onNavigateToSell}
        onNavigateToAdmin={onNavigateToAdmin}
        onNavigateToShowroom={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />


      {/* 2. Showroom Top Breadcrumb & Summary Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          {/* Breadcrumb line */}
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
            <button onClick={onBackToHome} className="hover:underline cursor-pointer">
              Autoace Zed
            </button>
            <span>/</span>
            <span className="text-neutral-800 font-semibold">Showroom</span>
            <span>/</span>
            <span className="text-neutral-900 font-bold">Just Listed Cars</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Left: Total Deals Heading */}
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-[#f0edff] text-[#6852f5] flex items-center justify-center shrink-0 border border-[#8574ff]/20">
                <SlidersHorizontal className="w-5 h-5 stroke-[2.2]" />
              </span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight flex items-center gap-2">
                  <span>87,521 Deals</span>
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#ede9fe] text-[#553ee6] border border-[#8574ff]/30">
                    Just Listed
                  </span>
                </h1>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">
                  Showing {filteredCars.length} verified available cars in Zambia with dealer warranty & Kwacha financing
                </p>
              </div>
            </div>

            {/* Right: Sort Dropdown & Mobile Filter Button */}
            <div className="flex items-center gap-3 self-end sm:self-auto w-full sm:w-auto justify-between sm:justify-end">
              {/* Mobile Filter Drawer Trigger */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-neutral-900 text-white font-bold text-xs rounded-lg shadow-sm cursor-pointer"
              >
                <Filter className="w-4 h-4" />
                <span>Filter deals ({filteredCars.length})</span>
              </button>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500 font-bold hidden md:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-neutral-300 text-xs sm:text-sm font-bold text-neutral-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#8574ff] cursor-pointer shadow-xs"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-asc">Price: Low to high</option>
                  <option value="price-desc">Price: High to low</option>
                  <option value="newest">Newest year first</option>
                  <option value="mileage-asc">Mileage: Low to high</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Lifestyle Filter Pills Row */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-4 pb-1">
            {[
              { id: 'most-off-rrp', label: 'Most off RRP', icon: TrendingDown },
              { id: 'in-stock', label: 'In stock now', icon: MapPin },
              { id: 'city', label: 'City driving', icon: Zap },
              { id: 'outdoors', label: 'I live outdoors', icon: Compass },
              { id: 'family', label: 'I have young kids', icon: Users },
            ].map((pill) => {
              const Icon = pill.icon;
              const isActive = activeLifestyleTag === pill.id;
              return (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setActiveLifestyleTag(isActive ? null : pill.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-bold whitespace-nowrap transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                      : 'bg-white text-neutral-800 border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 shadow-xs'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#8574ff]' : 'text-neutral-500'}`} />
                  <span>{pill.label}</span>
                </button>
              );
            })}

            {activeLifestyleTag && (
              <button
                type="button"
                onClick={() => setActiveLifestyleTag(null)}
                className="text-xs font-bold text-[#6852f5] hover:underline whitespace-nowrap pl-2 cursor-pointer"
              >
                Clear tag
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Main Showroom Layout: Sidebar + Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full">
        <div className="flex items-start gap-8">
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block w-[300px] xl:w-[320px] shrink-0 bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs sticky top-24 self-start max-h-[calc(100vh-120px)] overflow-y-auto no-scrollbar">
            {/* Top Toggle: Cars vs Vans */}
            <div className="grid grid-cols-2 bg-[#f0edff]/60 p-1 rounded-xl mb-4 border border-[#8574ff]/20">
              <button
                type="button"
                onClick={() => setVehicleCategory('Cars')}
                className={`py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  vehicleCategory === 'Cars'
                    ? 'bg-white text-neutral-950 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Cars
              </button>
              <button
                type="button"
                onClick={() => setVehicleCategory('Vans')}
                className={`py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  vehicleCategory === 'Vans'
                    ? 'bg-white text-neutral-950 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Vans & Pickups
              </button>
            </div>

            {/* Save Search Button */}
            <button
              type="button"
              onClick={() => setSavedSearches(!savedSearches)}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 mb-5 transition-all border cursor-pointer ${
                savedSearches
                  ? 'bg-[#8574ff] text-neutral-950 border-[#8574ff]'
                  : 'bg-white text-neutral-800 border-neutral-300 hover:border-neutral-400'
              }`}
            >
              <Heart className={`w-4 h-4 ${savedSearches ? 'fill-neutral-950 text-neutral-950' : 'text-neutral-600'}`} />
              <span>{savedSearches ? 'Search Saved' : 'Save search'}</span>
            </button>

            {/* Accordion 1: Distance from you */}
            <div className="border-b border-neutral-200 pb-4 mb-4">
              <button
                type="button"
                onClick={() => toggleSection('location')}
                className="w-full flex items-center justify-between text-xs font-black text-neutral-900 uppercase tracking-wider mb-2.5 cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#8574ff]"></span>
                  Distance from you
                </span>
                {openSections.location ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {openSections.location && (
                <div className="space-y-2.5 animate-in fade-in duration-150">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                        City / Town
                      </label>
                      <input
                        type="text"
                        value={locationQuery}
                        onChange={(e) => setLocationQuery(e.target.value)}
                        placeholder="e.g. Lusaka"
                        className="w-full px-2.5 py-2 text-xs font-bold border border-neutral-300 rounded-lg outline-none focus:ring-1 focus:ring-[#8574ff]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                        Distance
                      </label>
                      <select className="w-full px-2.5 py-2 text-xs font-bold border border-neutral-300 rounded-lg outline-none focus:ring-1 focus:ring-[#8574ff] bg-white cursor-pointer">
                        <option>Nationwide</option>
                        <option>Within 25 km</option>
                        <option>Within 50 km</option>
                        <option>Within 100 km</option>
                      </select>
                    </div>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Showing verified dealerships with delivery across Zambia.
                  </p>
                </div>
              )}
            </div>

            {/* Accordion 2: Make & model */}
            <div className="border-b border-neutral-200 pb-4 mb-4">
              <button
                type="button"
                onClick={() => toggleSection('makeModel')}
                className="w-full flex items-center justify-between text-xs font-black text-neutral-900 uppercase tracking-wider mb-2.5 cursor-pointer"
              >
                <span>Make & model</span>
                {openSections.makeModel ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {openSections.makeModel && (
                <div className="space-y-2.5 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-500 mb-1">Make</label>
                    <select
                      value={selectedMake}
                      onChange={(e) => setSelectedMake(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-bold border border-neutral-300 rounded-lg outline-none focus:ring-1 focus:ring-[#8574ff] bg-white cursor-pointer"
                    >
                      {makes.map((m) => (
                        <option key={m} value={m}>
                          {m === 'All' ? 'All Makes' : m}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-500 mb-1">Body Style</label>
                    <select
                      value={selectedBodyStyle}
                      onChange={(e) => setSelectedBodyStyle(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-bold border border-neutral-300 rounded-lg outline-none focus:ring-1 focus:ring-[#8574ff] bg-white cursor-pointer"
                    >
                      <option value="All">All Body Styles</option>
                      <option value="SUV">SUV</option>
                      <option value="Hatchback">Hatchback</option>
                      <option value="Saloon">Saloon / Sedan</option>
                      <option value="Double Cab">Double Cab Pickup</option>
                      <option value="Coupe">Coupe</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 3: Payment type */}
            <div className="border-b border-neutral-200 pb-4 mb-4">
              <button
                type="button"
                onClick={() => toggleSection('payment')}
                className="w-full flex items-center justify-between text-xs font-black text-neutral-900 uppercase tracking-wider mb-2.5 cursor-pointer"
              >
                <span>Payment type</span>
                {openSections.payment ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {openSections.payment && (
                <div className="space-y-2.5 animate-in fade-in duration-150">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentType('cash')}
                      className={`py-2 text-xs font-black rounded-lg border transition-all cursor-pointer ${
                        paymentType === 'cash'
                          ? 'bg-[#8574ff] text-neutral-950 border-[#8574ff] shadow-xs'
                          : 'bg-white text-neutral-700 border-neutral-300'
                      }`}
                    >
                      Cash (ZMW)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentType('lease')}
                      className={`py-2 text-xs font-black rounded-lg border transition-all cursor-pointer ${
                        paymentType === 'lease'
                          ? 'bg-[#8574ff] text-neutral-950 border-[#8574ff] shadow-xs'
                          : 'bg-white text-neutral-700 border-neutral-300'
                      }`}
                    >
                      Monthly lease
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 4: Price Range (Kwacha) */}
            <div className="border-b border-neutral-200 pb-4 mb-4">
              <button
                type="button"
                onClick={() => toggleSection('price')}
                className="w-full flex items-center justify-between text-xs font-black text-neutral-900 uppercase tracking-wider mb-2.5 cursor-pointer"
              >
                <span>Price (Kwacha)</span>
                {openSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {openSections.price && (
                <div className="space-y-2.5 animate-in fade-in duration-150">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-500 mb-1">Min Price</label>
                      <select
                        value={minPriceZMW}
                        onChange={(e) => setMinPriceZMW(Number(e.target.value))}
                        className="w-full px-2 py-2 text-xs font-bold border border-neutral-300 rounded-lg outline-none focus:ring-1 focus:ring-[#8574ff] bg-white cursor-pointer"
                      >
                        <option value={0}>Any</option>
                        <option value={50000}>K 50,000</option>
                        <option value={100000}>K 100,000</option>
                        <option value={150000}>K 150,000</option>
                        <option value={250000}>K 250,000</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-500 mb-1">Max Price</label>
                      <select
                        value={maxPriceZMW}
                        onChange={(e) => setMaxPriceZMW(Number(e.target.value))}
                        className="w-full px-2 py-2 text-xs font-bold border border-neutral-300 rounded-lg outline-none focus:ring-1 focus:ring-[#8574ff] bg-white cursor-pointer"
                      >
                        <option value={1000000}>Any</option>
                        <option value={150000}>K 150,000</option>
                        <option value={250000}>K 250,000</option>
                        <option value={350000}>K 350,000</option>
                        <option value={550000}>K 550,000</option>
                        <option value={850000}>K 850,000</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 5: Body & Drive */}
            <div className="border-b border-neutral-200 pb-4 mb-4">
              <button
                type="button"
                onClick={() => toggleSection('bodyDrive')}
                className="w-full flex items-center justify-between text-xs font-black text-neutral-900 uppercase tracking-wider mb-2.5 cursor-pointer"
              >
                <span>Gearbox & Fuel</span>
                {openSections.bodyDrive ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {openSections.bodyDrive && (
                <div className="space-y-2.5 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-500 mb-1">Fuel Type</label>
                    <select
                      value={selectedFuelType}
                      onChange={(e) => setSelectedFuelType(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-bold border border-neutral-300 rounded-lg outline-none focus:ring-1 focus:ring-[#8574ff] bg-white cursor-pointer"
                    >
                      <option value="All">All Fuels</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-500 mb-1">Gearbox</label>
                    <select
                      value={selectedGearbox}
                      onChange={(e) => setSelectedGearbox(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-bold border border-neutral-300 rounded-lg outline-none focus:ring-1 focus:ring-[#8574ff] bg-white cursor-pointer"
                    >
                      <option value="All">All Transmissions</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Reset Filters CTA */}
            <button
              type="button"
              onClick={resetAllFilters}
              className="w-full py-2 text-center text-xs font-bold text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              Reset all filters
            </button>
          </aside>

          {/* Main Grid: 3 Columns of Car Cards */}
          <main className="flex-1">
            {filteredCars.length === 0 ? (
              <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
                <p className="text-lg font-black text-neutral-900 mb-2">No matching deals found</p>
                <p className="text-xs text-neutral-500 mb-6">
                  Try broadening your price range or clearing filter parameters.
                </p>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="px-6 py-2.5 bg-[#8574ff] text-neutral-950 font-black text-xs rounded-xl hover:bg-[#7360f2] transition-colors cursor-pointer"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredCars.map((car) => {
                  const currentImgIdx = activeImageIndexes[car.id] || 0;
                  const currentImg = car.images[currentImgIdx] || car.images[0];
                  const isSaved = savedCarIds[car.id];

                  return (
                    <article
                      key={car.id}
                      onClick={() => {
                        if (onNavigateToDeal) {
                          onNavigateToDeal(car.id);
                        } else {
                          setSelectedCar(car);
                        }
                      }}
                      className="bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between group cursor-pointer"
                    >
                      {/* Image Frame with Badges & Nav Dots */}
                      <div className="relative aspect-[16/11] bg-neutral-100 overflow-hidden">
                        <img
                          src={currentImg}
                          alt={car.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Top Rated Dealer Badge */}
                        {car.isTopRated && (
                          <div className="absolute top-2.5 left-2.5 bg-neutral-900/90 text-[#8574ff] text-[10px] font-black px-2 py-0.5 rounded shadow-sm backdrop-blur-xs flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[#8574ff]" />
                            <span>Top Rated Dealer</span>
                          </div>
                        )}

                        {/* Save Favorite Button */}
                        <button
                          type="button"
                          onClick={(e) => toggleSaveCar(car.id, e)}
                          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 text-neutral-800 hover:text-red-500 flex items-center justify-center shadow transition-colors cursor-pointer"
                          aria-label="Save car"
                        >
                          <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                        </button>

                        {/* Carousel Arrows (Hover visible) */}
                        {car.images.length > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={(e) => prevImage(car.id, car.images.length, e)}
                              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90 cursor-pointer"
                              aria-label="Previous photo"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={(e) => nextImage(car.id, car.images.length, e)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90 cursor-pointer"
                              aria-label="Next photo"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </>
                        )}

                        {/* Pagination Dots */}
                        {car.images.length > 1 && (
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/35 px-2 py-0.5 rounded-full backdrop-blur-xs">
                            {car.images.map((_, idx) => (
                              <span
                                key={idx}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${
                                  idx === currentImgIdx ? 'bg-white scale-125' : 'bg-white/50'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Content Area */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Ad & Used / Brand New Badges */}
                          <div className="flex items-center gap-1.5 mb-1.5">
                            {car.isAd && (
                              <span className="text-[10px] font-bold text-neutral-500 border border-neutral-300 rounded px-1.5 py-0.5">
                                Ad
                              </span>
                            )}
                            <span className="text-[10px] font-black text-white bg-neutral-900 rounded px-1.5 py-0.5">
                              {car.condition}
                            </span>
                          </div>

                          {/* Trim Subhead */}
                          <p className="text-[11px] text-neutral-500 font-semibold line-clamp-1 mb-0.5">
                            {car.trim}
                          </p>

                          {/* Vehicle Title */}
                          <h3 className="text-base sm:text-lg font-black text-neutral-900 tracking-tight leading-snug line-clamp-1 mb-1">
                            {car.name}
                          </h3>

                          {/* Spec Line */}
                          <p className="text-xs text-neutral-600 font-medium mb-3">
                            {car.gearbox} • {car.fuelType} • {car.engineSize}
                          </p>

                          {/* Price in Zambian Kwacha */}
                          <div className="mb-3">
                            <p className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                              K {car.priceZMW.toLocaleString()}
                            </p>
                            <p className="text-[11px] font-bold text-neutral-500 mt-0.5">
                              or from <span className="text-neutral-800 font-extrabold">K {car.monthlyZMW.toLocaleString()}</span>/mo
                            </p>
                          </div>
                        </div>

                        {/* Location & Details Footer */}
                        <div className="pt-3 border-t border-neutral-200/80 flex items-center justify-between text-[11px] text-neutral-600 font-medium">
                          <span className="flex items-center gap-1 line-clamp-1">
                            <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            <span className="truncate">{car.location}</span>
                          </span>
                          <span className="text-neutral-500 shrink-0">
                            {car.year} • {car.mileageKm.toLocaleString()} km
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls matching screenshot */}
            <div className="mt-10 pt-6 border-t border-neutral-200 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold">
              <button
                type="button"
                className="w-9 h-9 rounded-lg bg-neutral-900 text-white flex items-center justify-center cursor-pointer shadow-xs"
              >
                1
              </button>
              <button
                type="button"
                className="w-9 h-9 rounded-lg bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 flex items-center justify-center cursor-pointer"
              >
                2
              </button>
              <span className="px-2 text-neutral-400">...</span>
              <button
                type="button"
                className="w-9 h-9 rounded-lg bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 flex items-center justify-center cursor-pointer"
              >
                100
              </button>
              <button
                type="button"
                className="w-9 h-9 rounded-lg bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 flex items-center justify-center cursor-pointer"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* 4. Mobile Slide-Over Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />

          <div className="relative ml-auto w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-base font-black text-neutral-900">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 text-neutral-500 hover:text-neutral-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-5 flex-1">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Make</label>
                <select
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-bold border border-neutral-300 rounded-lg outline-none bg-white"
                >
                  {makes.map((m) => (
                    <option key={m} value={m}>
                      {m === 'All' ? 'All Makes' : m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">City / Region</label>
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="e.g. Lusaka, Ndola"
                  className="w-full px-3 py-2 text-xs font-bold border border-neutral-300 rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Max Price (Kwacha)</label>
                <select
                  value={maxPriceZMW}
                  onChange={(e) => setMaxPriceZMW(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-bold border border-neutral-300 rounded-lg outline-none bg-white"
                >
                  <option value={1000000}>Any Max</option>
                  <option value={150000}>K 150,000</option>
                  <option value={250000}>K 250,000</option>
                  <option value={350000}>K 350,000</option>
                  <option value={550000}>K 550,000</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Fuel Type</label>
                <select
                  value={selectedFuelType}
                  onChange={(e) => setSelectedFuelType(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-bold border border-neutral-300 rounded-lg outline-none bg-white"
                >
                  <option value="All">All Fuels</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <button
                type="button"
                onClick={resetAllFilters}
                className="w-full py-2 text-xs font-bold text-neutral-500 hover:underline"
              >
                Reset all filters
              </button>
            </div>

            <div className="p-4 border-t border-neutral-200 sticky bottom-0 bg-white">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3.5 bg-[#8574ff] text-neutral-950 font-black text-sm rounded-xl shadow cursor-pointer"
              >
                Show {filteredCars.length} deals
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Interactive Vehicle Enquiry / Dealer Inspection Modal */}
      {selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => {
              setSelectedCar(null);
              setEnquirySuccess(false);
            }}
          />

          <div className="relative z-10 max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header Image */}
            <div className="relative aspect-[16/9] bg-neutral-900">
              <img
                src={selectedCar.images[0]}
                alt={selectedCar.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setSelectedCar(null);
                  setEnquirySuccess(false);
                }}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-3 bg-neutral-900/90 text-white px-2.5 py-1 rounded-md text-xs font-black backdrop-blur-xs">
                {selectedCar.dealer}
              </div>
            </div>

            <div className="p-6">
              <p className="text-xs text-neutral-500 font-semibold">{selectedCar.trim}</p>
              <h2 className="text-xl font-black text-neutral-900 mt-0.5">{selectedCar.name}</h2>
              <div className="flex items-baseline gap-2 mt-1 mb-4">
                <span className="text-2xl font-black text-[#553ee6]">
                  K {selectedCar.priceZMW.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-neutral-500">
                  or K {selectedCar.monthlyZMW.toLocaleString()}/mo
                </span>
              </div>

              {/* Specs Pills */}
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-neutral-700 bg-neutral-50 p-3 rounded-xl mb-5 border border-neutral-200">
                <div>📍 {selectedCar.location}</div>
                <div>📅 {selectedCar.year} Model</div>
                <div>⚙️ {selectedCar.gearbox} ({selectedCar.engineSize})</div>
                <div>🛣️ {selectedCar.mileageKm.toLocaleString()} km</div>
              </div>

              {enquirySuccess ? (
                <div className="p-4 bg-[#f0edff] rounded-xl text-center space-y-2 border border-[#8574ff]/30">
                  <div className="w-10 h-10 rounded-full bg-[#8574ff] text-neutral-950 flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                  <h4 className="text-sm font-black text-neutral-900">Enquiry Sent to {selectedCar.dealer}!</h4>
                  <p className="text-xs text-neutral-600">
                    A representative has received your details and will WhatsApp you with the full inspection report and viewing schedule.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-bold border border-neutral-300 rounded-lg outline-none focus:ring-2 focus:ring-[#8574ff]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Phone Number (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-bold border border-neutral-300 rounded-lg outline-none focus:ring-2 focus:ring-[#8574ff]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEnquirySuccess(true)}
                      className="py-3 px-4 bg-[#8574ff] hover:bg-[#7360f2] text-neutral-950 font-black text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp Dealer</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setEnquirySuccess(true)}
                      className="py-3 px-4 bg-neutral-900 hover:bg-neutral-800 text-white font-black text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Viewing</span>
                    </button>
                  </div>

                  {onNavigateToDeal && (
                    <button
                      type="button"
                      onClick={() => {
                        const targetId = selectedCar.id;
                        setSelectedCar(null);
                        onNavigateToDeal(targetId);
                      }}
                      className="w-full mt-2 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-extrabold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-neutral-300/80"
                    >
                      <span>View full car details & gallery →</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 6. Universal Footer */}
      <Footer onNavigateToHome={onBackToHome} onNavigateToAdmin={onNavigateToAdmin} />
    </div>
  );
};
