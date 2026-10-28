import React, { useState, useMemo, useEffect } from 'react';
import { AutoaceLogo } from '../components/AutoaceLogo';
import {
  ChevronLeft,
  CheckCircle2,
  Camera,
  MapPin,
  Phone,
  User,
  ShieldCheck,
  Check,
  TrendingUp,
  Car,
  Sparkles,
  Edit3,
  AlertCircle,
} from 'lucide-react';

interface SellACarPageProps {
  onBackToHome: () => void;
  initialCarPhrase?: string;
  initialReg?: string; // Backwards compatibility if passed
}

interface ParsedCarDetails {
  title: string;
  year: string;
  make: string;
  model: string;
  trim: string;
  estimatedLowZMW: number;
  estimatedHighZMW: number;
  defaultReserveZMW: number;
  suggestedGearbox: 'Automatic' | 'Manual';
  suggestedFuel: string;
}

function parseVehiclePhrase(phrase: string): { year: string; make: string; model: string } {
  const clean = (phrase || '').trim();
  if (!clean) {
    return { year: '', make: '', model: '' };
  }

  const text = clean.toLowerCase();
  const yearMatch = text.match(/\b(19\d{2}|20\d{2})\b/);
  const year = yearMatch ? yearMatch[0] : '';

  let make = '';
  let model = '';

  if (text.includes('toyota')) make = 'Toyota';
  else if (text.includes('honda')) make = 'Honda';
  else if (text.includes('nissan')) make = 'Nissan';
  else if (text.includes('mercedes') || text.includes('benz')) make = 'Mercedes-Benz';
  else if (text.includes('ford')) make = 'Ford';
  else if (text.includes('mitsubishi')) make = 'Mitsubishi';
  else if (text.includes('isuzu')) make = 'Isuzu';
  else if (text.includes('bmw')) make = 'BMW';
  else if (text.includes('volkswagen') || text.includes('vw')) make = 'Volkswagen';
  else if (text.includes('mazda')) make = 'Mazda';
  else if (text.includes('subaru')) make = 'Subaru';

  if (text.includes('mark x') || text.includes('markx')) {
    if (!make) make = 'Toyota';
    model = 'Mark X';
  } else if (text.includes('hilux')) {
    if (!make) make = 'Toyota';
    model = 'Hilux GD-6';
  } else if (text.includes('fit') || text.includes('jazz')) {
    if (!make) make = 'Honda';
    model = 'Fit';
  } else if (text.includes('dualis') || text.includes('qashqai')) {
    if (!make) make = 'Nissan';
    model = 'Dualis';
  } else if (text.includes('c-class') || text.includes('c class') || text.includes('c200') || text.includes('c220')) {
    if (!make) make = 'Mercedes-Benz';
    model = 'C-Class';
  } else if (text.includes('ranger')) {
    if (!make) make = 'Ford';
    model = 'Ranger';
  } else if (text.includes('prado') || text.includes('land cruiser')) {
    if (!make) make = 'Toyota';
    model = 'Land Cruiser Prado';
  } else if (text.includes('x-trail') || text.includes('xtrail')) {
    if (!make) make = 'Nissan';
    model = 'X-Trail';
  } else {
    // If no exact match, extract remaining terms
    let remainder = clean;
    if (year) remainder = remainder.replace(year, '');
    if (make) remainder = remainder.replace(new RegExp(make, 'i'), '');
    model = remainder.trim() || clean;
  }

  return { year, make, model };
}

export const SellACarPage: React.FC<SellACarPageProps> = ({
  onBackToHome,
  initialCarPhrase,
  initialReg,
}) => {
  // Slide 1: Car details
  // Slide 2: Pricing
  // Slide 3: Photos
  // Slide 4: Personal info (Name, phone, location)
  // Slide 5: Thank you & confirmation
  const [slide, setSlide] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Initialize vehicle info from query phrase (clean empty state if none passed)
  const queryPhrase = (initialCarPhrase ?? '').trim();
  const initialParsed = useMemo(() => parseVehiclePhrase(queryPhrase), [queryPhrase]);

  const [selectedYear, setSelectedYear] = useState<string>(initialParsed.year);
  const [selectedMake, setSelectedMake] = useState<string>(initialParsed.make);
  const [selectedModel, setSelectedModel] = useState<string>(initialParsed.model);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Synchronize when query parameter changes
  useEffect(() => {
    const updated = parseVehiclePhrase(queryPhrase);
    setSelectedYear(updated.year);
    setSelectedMake(updated.make);
    setSelectedModel(updated.model);
    setValidationError(null);
  }, [queryPhrase]);

  // Dynamic calculation of Zambian market specs and valuation
  const carDetails: ParsedCarDetails = useMemo(() => {
    const combined = `${selectedYear} ${selectedMake} ${selectedModel}`.toLowerCase().trim();
    const year = selectedYear || '2015';

    if (!selectedMake && !selectedModel) {
      return {
        title: '',
        year: selectedYear,
        make: '',
        model: '',
        trim: '',
        estimatedLowZMW: 0,
        estimatedHighZMW: 0,
        defaultReserveZMW: 0,
        suggestedGearbox: 'Automatic',
        suggestedFuel: 'Petrol',
      };
    }

    if (combined.includes('mark x') || combined.includes('markx')) {
      return {
        title: `${year} Toyota Mark X`,
        year,
        make: 'Toyota',
        model: 'Mark X',
        trim: '2.5L V6 250G Sedan • Dual VVT-i (GRX120 / GRX130)',
        estimatedLowZMW: 150000,
        estimatedHighZMW: 180000,
        defaultReserveZMW: 165000,
        suggestedGearbox: 'Automatic',
        suggestedFuel: 'Petrol',
      };
    }

    if (combined.includes('hilux')) {
      return {
        title: `${year} Toyota Hilux GD-6`,
        year,
        make: 'Toyota',
        model: 'Hilux Double Cab',
        trim: '2.8 GD-6 / 3.0 D-4D 4x4 Raider • High Rider Double Cab',
        estimatedLowZMW: 480000,
        estimatedHighZMW: 560000,
        defaultReserveZMW: 520000,
        suggestedGearbox: 'Automatic',
        suggestedFuel: 'Diesel',
      };
    }

    if (combined.includes('fit') || combined.includes('jazz')) {
      return {
        title: `${year} Honda Fit`,
        year,
        make: 'Honda',
        model: 'Fit Hybrid / Petrol',
        trim: '1.3L / 1.5L i-VTEC Smart Hatchback • Fuel Saver (GE6/GP1)',
        estimatedLowZMW: 95000,
        estimatedHighZMW: 125000,
        defaultReserveZMW: 110000,
        suggestedGearbox: 'Automatic',
        suggestedFuel: 'Petrol',
      };
    }

    if (combined.includes('dualis') || combined.includes('qashqai')) {
      return {
        title: `${year} Nissan Dualis`,
        year,
        make: 'Nissan',
        model: 'Dualis 4WD',
        trim: '2.0L MR20DE 20G Crossover SUV • Panoramic Roof',
        estimatedLowZMW: 155000,
        estimatedHighZMW: 185000,
        defaultReserveZMW: 170000,
        suggestedGearbox: 'Automatic',
        suggestedFuel: 'Petrol',
      };
    }

    if (combined.includes('prado') || combined.includes('land cruiser')) {
      return {
        title: `${year} Toyota Land Cruiser Prado`,
        year,
        make: 'Toyota',
        model: 'Land Cruiser Prado',
        trim: '3.0 D-4D / 2.7 TX-L 7-Seater 4x4 (150 Series)',
        estimatedLowZMW: 650000,
        estimatedHighZMW: 790000,
        defaultReserveZMW: 720000,
        suggestedGearbox: 'Automatic',
        suggestedFuel: 'Diesel',
      };
    }

    if (combined.includes('c-class') || combined.includes('c200') || combined.includes('c220') || combined.includes('c class')) {
      return {
        title: `${year} Mercedes-Benz C-Class`,
        year,
        make: 'Mercedes-Benz',
        model: 'C-Class (W204)',
        trim: 'C200 CGI / C220 CDI Avantgarde Executive Saloon',
        estimatedLowZMW: 210000,
        estimatedHighZMW: 260000,
        defaultReserveZMW: 235000,
        suggestedGearbox: 'Automatic',
        suggestedFuel: 'Petrol',
      };
    }

    if (combined.includes('ranger')) {
      return {
        title: `${year} Ford Ranger`,
        year,
        make: 'Ford',
        model: 'Ranger XLT',
        trim: '2.2 TDCi / 3.2 TDCi Double Cab 4x4 Pickup',
        estimatedLowZMW: 430000,
        estimatedHighZMW: 510000,
        defaultReserveZMW: 470000,
        suggestedGearbox: 'Automatic',
        suggestedFuel: 'Diesel',
      };
    }

    if (combined.includes('x-trail') || combined.includes('xtrail')) {
      return {
        title: `${year} Nissan X-Trail`,
        year,
        make: 'Nissan',
        model: 'X-Trail',
        trim: '2.0L 4WD 7-Seater Comfort Edition (T31/T32)',
        estimatedLowZMW: 175000,
        estimatedHighZMW: 220000,
        defaultReserveZMW: 195000,
        suggestedGearbox: 'Automatic',
        suggestedFuel: 'Petrol',
      };
    }

    // Default intelligent baseline for other models
    const displayTitle = [selectedYear, selectedMake, selectedModel].filter(Boolean).join(' ') || 'Vehicle Details';
    return {
      title: displayTitle,
      year: year || '2015',
      make: selectedMake || 'Vehicle',
      model: selectedModel || 'Model',
      trim: 'Verified Specification • Zambia Market Ready',
      estimatedLowZMW: 160000,
      estimatedHighZMW: 210000,
      defaultReserveZMW: 185000,
      suggestedGearbox: 'Automatic',
      suggestedFuel: 'Petrol',
    };
  }, [selectedYear, selectedMake, selectedModel]);

  // Form states
  const [mileage, setMileage] = useState('94,500 km');
  const [gearbox, setGearbox] = useState<'Manual' | 'Automatic'>(carDetails.suggestedGearbox);
  const [fuelType, setFuelType] = useState(carDetails.suggestedFuel);
  const [condition, setCondition] = useState<'Excellent' | 'Good' | 'Fair'>('Excellent');

  // Slide 2: Pricing (In Zambian Kwacha)
  const [expectedPrice, setExpectedPrice] = useState(
    carDetails.defaultReserveZMW ? carDetails.defaultReserveZMW.toLocaleString() : '165,000'
  );

  // Slide 3: Photos
  const [uploadedPhotos, setUploadedPhotos] = useState<{ [key: string]: boolean }>({
    front: true,
    rear: true,
    interior: false,
    wheels: false,
  });

  // Slide 4: Personal Info in Zambia
  const [fullName, setFullName] = useState('Alex Chileshe');
  const [phoneNumber, setPhoneNumber] = useState('+260 97 712 3456');
  const [location, setLocation] = useState('Lusaka, Zambia');

  const popularZambiaLocations = [
    'Lusaka',
    'Ndola',
    'Kitwe',
    'Livingstone',
    'Kabwe',
    'Chipata',
    'Solwezi',
    'Chingola',
  ];

  const popularSuggestions = [
    '2009 Toyota Mark X',
    '2015 Toyota Hilux GD-6',
    '2010 Honda Fit',
    '2014 Nissan Dualis',
    '2012 Mercedes C-Class',
    '2016 Ford Ranger',
  ];

  const handleApplyPopularSuggestion = (suggestion: string) => {
    const parsed = parseVehiclePhrase(suggestion);
    setSelectedYear(parsed.year);
    setSelectedMake(parsed.make);
    setSelectedModel(parsed.model);
    setValidationError(null);
  };

  const progressPercentage = {
    1: 20,
    2: 45,
    3: 70,
    4: 90,
    5: 100,
  }[slide];

  const togglePhoto = (slot: string) => {
    setUploadedPhotos((prev) => ({ ...prev, [slot]: !prev[slot] }));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col relative">
      {/* Mobile Ambient Top Backdrop */}
      <div className="lg:hidden h-28 bg-gradient-to-b from-[#fedcd2]/70 via-[#fde9e3]/60 to-[#daf5f2]/70 absolute top-0 left-0 right-0 z-0"></div>

      <div className="flex-1 flex flex-col lg:flex-row min-h-screen relative z-10">
        {/* Left Interactive Area */}
        <div className="w-full lg:w-[58%] xl:w-[54%] min-h-screen bg-white rounded-t-[28px] lg:rounded-none mt-12 lg:mt-0 p-6 sm:p-10 lg:p-14 flex flex-col justify-between shadow-lg lg:shadow-none">
          <div>
            {/* Header Brand */}
            <div className="mb-8">
              <button
                type="button"
                onClick={onBackToHome}
                className="hover:opacity-80 transition-opacity cursor-pointer inline-flex items-center"
                title="Return to Autoace Home"
              >
                <AutoaceLogo variant="light-mode" className="w-[150px] h-[150px] object-contain" style={{ width: '150px', height: '150px', objectFit: 'contain' }} />
              </button>
            </div>

            {/* Subheader & Progress Bar */}
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={() => {
                  if (slide > 1) {
                    setSlide((s) => (s - 1) as 1 | 2 | 3 | 4);
                  } else {
                    onBackToHome();
                  }
                }}
                className="inline-flex items-center gap-1 font-bold text-sm text-neutral-900 hover:underline cursor-pointer"
              >
                <span className="font-extrabold text-base">&lt;</span>
                <span className="underline underline-offset-2">Back</span>
              </button>

              <span className="text-xs sm:text-sm font-bold text-neutral-800">
                {progressPercentage}% completed
              </span>
            </div>

            <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden mb-8">
              <div
                className="h-full bg-[#8574ff] transition-all duration-300 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            {/* SLIDE 1: Car Details (Clean empty form with Year, Make, Model or hydrated from query phrase) */}
            {slide === 1 && (
              <div className="animate-in fade-in duration-200 max-w-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#f5f3ff] text-[#6852f5] text-xs font-bold border border-[#8574ff]/30">
                    Step 1 of 5
                  </span>
                  <span className="text-xs font-semibold text-neutral-500">Zambian Market</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-neutral-900 tracking-tight leading-tight mb-2 font-sans">
                  What are you selling?
                </h1>
                <p className="text-xs sm:text-sm text-neutral-600 font-medium mb-6">
                  Enter your car details to calculate real buyer demand and dealer bids in Zambia.
                </p>

                {validationError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-700 flex items-center gap-2 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{validationError}</span>
                  </div>
                )}

                {/* Vehicle Selection Box */}
                <div className="bg-[#f8f7f5] p-4 sm:p-5 rounded-2xl border border-neutral-200 mb-6 space-y-3.5">
                  {/* Active recognized vehicle banner */}
                  {selectedMake && selectedModel && (
                    <div className="p-3 bg-white rounded-xl border border-neutral-200 flex items-center justify-between shadow-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#8574ff] text-neutral-950 flex items-center justify-center shrink-0">
                          <Car className="w-5 h-5 stroke-[2.5]" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-neutral-900 leading-tight">
                            {carDetails.title}
                          </p>
                          <p className="text-[11px] text-neutral-500 font-medium">
                            {carDetails.trim || 'Verified Zambian Specification'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-neutral-400 block uppercase">Estimated Range</span>
                        <span className="text-xs font-black text-[#553ee6]">
                          K {carDetails.estimatedLowZMW ? carDetails.estimatedLowZMW.toLocaleString() : '150,000'} - K {carDetails.estimatedHighZMW ? carDetails.estimatedHighZMW.toLocaleString() : '180,000'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Clean Form: Year, Make, Model */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Year Selector */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1">
                        Year
                      </label>
                      <select
                        value={selectedYear}
                        onChange={(e) => {
                          setSelectedYear(e.target.value);
                          setValidationError(null);
                        }}
                        className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-xs sm:text-sm font-bold text-neutral-900 outline-none focus:ring-2 focus:ring-[#8574ff] cursor-pointer"
                      >
                        <option value="">Select Year</option>
                        {Array.from({ length: 27 }, (_, i) => 2025 - i).map((yr) => (
                          <option key={yr} value={yr}>
                            {yr}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Make Selector */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1">
                        Make
                      </label>
                      <select
                        value={selectedMake}
                        onChange={(e) => {
                          setSelectedMake(e.target.value);
                          setValidationError(null);
                        }}
                        className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-xs sm:text-sm font-bold text-neutral-900 outline-none focus:ring-2 focus:ring-[#8574ff] cursor-pointer"
                      >
                        <option value="">Select Make</option>
                        {[
                          'Toyota',
                          'Nissan',
                          'Honda',
                          'Mercedes-Benz',
                          'Ford',
                          'Mitsubishi',
                          'Isuzu',
                          'Mazda',
                          'BMW',
                          'Volkswagen',
                          'Subaru',
                          'Land Rover',
                          'Hyundai',
                          'Kia',
                          'Other',
                        ].map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Model Input */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1">
                        Model
                      </label>
                      <input
                        type="text"
                        value={selectedModel}
                        onChange={(e) => {
                          setSelectedModel(e.target.value);
                          setValidationError(null);
                        }}
                        placeholder="e.g. Mark X, Hilux..."
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs sm:text-sm font-bold text-neutral-900 outline-none focus:ring-2 focus:ring-[#8574ff] placeholder:text-neutral-400 placeholder:font-normal"
                      />
                    </div>
                  </div>

                  {/* Popular Suggestions Chips */}
                  <div className="pt-2 border-t border-neutral-200">
                    <p className="text-[11px] text-neutral-500 mb-1.5 flex items-center gap-1 font-medium">
                      <Sparkles className="w-3 h-3 text-[#6852f5]" />
                      Popular Zambian models (click to fill):
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {popularSuggestions.map((suggestion) => {
                        const isMatch =
                          selectedModel &&
                          suggestion.toLowerCase().includes(selectedModel.toLowerCase()) &&
                          (!selectedMake || suggestion.toLowerCase().includes(selectedMake.toLowerCase()));
                        return (
                          <button
                            key={suggestion}
                            type="button"
                            onClick={() => handleApplyPopularSuggestion(suggestion)}
                            className={`text-[11px] px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                              isMatch
                                ? 'bg-[#8574ff] text-neutral-950 font-black shadow-xs'
                                : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-300 font-medium'
                            }`}
                          >
                            {suggestion}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {/* Mileage */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-neutral-900 mb-1.5">
                      Current Odometer Reading
                    </label>
                    <input
                      type="text"
                      value={mileage}
                      onChange={(e) => setMileage(e.target.value)}
                      placeholder="e.g. 94,500 km"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-sm sm:text-base font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#8574ff]"
                    />
                  </div>

                  {/* Gearbox */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-neutral-900 mb-1.5">
                      Transmission
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {(['Automatic', 'Manual'] as const).map((gb) => (
                        <button
                          key={gb}
                          type="button"
                          onClick={() => setGearbox(gb)}
                          className={`py-3 text-center rounded-lg text-sm font-bold border transition-all cursor-pointer ${
                            gearbox === gb
                              ? 'bg-[#f5f3ff] border-[#8574ff] text-neutral-950 font-black shadow-xs'
                              : 'bg-white border-neutral-300 text-neutral-700 hover:border-neutral-400'
                          }`}
                        >
                          {gb}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fuel Type */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-neutral-900 mb-1.5">
                      Fuel Type
                    </label>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {['Petrol', 'Diesel', 'Hybrid/EV'].map((fuel) => (
                        <button
                          key={fuel}
                          type="button"
                          onClick={() => setFuelType(fuel)}
                          className={`py-2.5 text-center rounded-lg text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                            fuelType === fuel
                              ? 'bg-[#f5f3ff] border-[#8574ff] text-neutral-950 font-black shadow-xs'
                              : 'bg-white border-neutral-300 text-neutral-700 hover:border-neutral-400'
                          }`}
                        >
                          {fuel}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!selectedMake.trim() || !selectedModel.trim()) {
                      setValidationError('Please select or enter your vehicle Make and Model to continue.');
                      return;
                    }
                    setValidationError(null);
                    setExpectedPrice(
                      carDetails.defaultReserveZMW ? carDetails.defaultReserveZMW.toLocaleString() : '165,000'
                    );
                    setSlide(2);
                  }}
                  className="w-full py-3.5 px-6 rounded-lg bg-[#8574ff] hover:bg-[#7360f2] text-neutral-950 font-black text-sm sm:text-base text-center transition-colors shadow-sm cursor-pointer"
                >
                  Continue to pricing
                </button>
              </div>
            )}

            {/* SLIDE 2: Pricing & Valuation (In Zambian Kwacha) */}
            {slide === 2 && (
              <div className="animate-in fade-in duration-200 max-w-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#f5f3ff] text-[#6852f5] text-xs font-bold border border-[#8574ff]/30">
                    Step 2 of 5
                  </span>
                  <span className="text-xs font-semibold text-neutral-500">Valuation in Kwacha</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-neutral-900 tracking-tight leading-tight mb-2 font-sans">
                  Your estimated valuation
                </h1>
                <p className="text-xs sm:text-sm text-neutral-600 font-medium mb-6">
                  Based on recent vehicle transactions and active buyer demand in Zambia
                </p>

                {/* Valuation Highlight Box */}
                <div className="bg-[#111111] text-white p-6 rounded-2xl mb-6 shadow-md border border-neutral-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-[#8574ff] text-xs font-bold uppercase tracking-wider">
                      <TrendingUp className="w-4 h-4" />
                      <span>Instant Kwacha Valuation</span>
                    </div>
                    <span className="text-[11px] text-neutral-400 font-medium">ZMW (K)</span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl sm:text-4xl font-black text-white">
                      K {(carDetails.estimatedLowZMW || 150000).toLocaleString()} - K {(carDetails.estimatedHighZMW || 180000).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Over 450+ verified dealers and cash buyers across Lusaka, Ndola, Kitwe and nationwide will compete to give you the highest market price.
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-neutral-900 mb-1.5">
                      Your desired reserve price in Zambian Kwacha (K)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-black text-neutral-600 text-sm">
                        K
                      </span>
                      <input
                        type="text"
                        value={expectedPrice}
                        onChange={(e) => setExpectedPrice(e.target.value)}
                        placeholder="165,000"
                        className="w-full pl-9 pr-4 py-3 border border-neutral-300 rounded-lg text-sm sm:text-base font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#8574ff]"
                      />
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1">
                      Recommended target for {carDetails.title}: K {carDetails.defaultReserveZMW.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-neutral-900 mb-1.5">
                      Car overall condition
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Excellent', 'Good', 'Fair'] as const).map((cond) => (
                        <button
                          key={cond}
                          type="button"
                          onClick={() => setCondition(cond)}
                          className={`py-3 text-center rounded-lg text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                            condition === cond
                              ? 'bg-[#f5f3ff] border-[#8574ff] text-neutral-950 font-black shadow-xs'
                              : 'bg-white border-neutral-300 text-neutral-700 hover:border-neutral-400'
                          }`}
                        >
                          {cond}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSlide(3)}
                  className="w-full py-3.5 px-6 rounded-lg bg-[#8574ff] hover:bg-[#7360f2] text-neutral-950 font-black text-sm sm:text-base text-center transition-colors shadow-sm cursor-pointer"
                >
                  Continue to photos
                </button>
              </div>
            )}

            {/* SLIDE 3: Photos Upload */}
            {slide === 3 && (
              <div className="animate-in fade-in duration-200 max-w-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#f5f3ff] text-[#6852f5] text-xs font-bold border border-[#8574ff]/30">
                    Step 3 of 5
                  </span>
                  <span className="text-xs font-semibold text-neutral-500">Vehicle Photos</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-neutral-900 tracking-tight leading-tight mb-2 font-sans">
                  Add photos of your {carDetails.title}
                </h1>
                <p className="text-xs sm:text-sm text-neutral-600 font-medium mb-6">
                  Clear photos increase buyer confidence and can get you up to K15,000 higher bids
                </p>

                {/* Photo Upload Slots Grid */}
                <div className="grid grid-cols-2 gap-3.5 mb-8">
                  {[
                    { id: 'front', label: 'Front & side angle', img: '/src/assets/images/jaecoo_compact_suv_1793016492784.jpg' },
                    { id: 'rear', label: 'Rear profile', img: '/src/assets/images/hero_yellow_ev_hatchback_1793016491792.jpg' },
                    { id: 'interior', label: 'Dashboard & seats', img: '/src/assets/images/ev_charging_plug_station_1793016493875.jpg' },
                    { id: 'wheels', label: 'Engine & white book', img: '/src/assets/images/renault_five_electric_1793016492061.jpg' },
                  ].map((slot) => {
                    const isUploaded = uploadedPhotos[slot.id];
                    return (
                      <div
                        key={slot.id}
                        onClick={() => togglePhoto(slot.id)}
                        className={`border-2 border-dashed rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-all aspect-[4/3] relative overflow-hidden group ${
                          isUploaded
                            ? 'border-[#8574ff] bg-[#f5f3ff]/50'
                            : 'border-neutral-300 hover:border-neutral-400 bg-neutral-50'
                        }`}
                      >
                        {isUploaded ? (
                          <>
                            <img
                              src={slot.img}
                              alt={slot.label}
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center text-white">
                              <span className="w-7 h-7 rounded-full bg-[#8574ff] text-neutral-950 flex items-center justify-center mb-1">
                                <Check className="w-4 h-4 stroke-[3]" />
                              </span>
                              <span className="text-[11px] font-bold drop-shadow">Added</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <Camera className="w-7 h-7 text-neutral-400 group-hover:text-neutral-700 transition-colors mb-1.5" />
                            <span className="text-xs font-bold text-neutral-800">{slot.label}</span>
                            <span className="text-[10px] text-neutral-500 mt-0.5">Click to add</span>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setSlide(4)}
                  className="w-full py-3.5 px-6 rounded-lg bg-[#8574ff] hover:bg-[#7360f2] text-neutral-950 font-black text-sm sm:text-base text-center transition-colors shadow-sm cursor-pointer"
                >
                  Continue to contact details
                </button>
              </div>
            )}

            {/* SLIDE 4: Personal Info (Name, phone, location in Zambia) */}
            {slide === 4 && (
              <div className="animate-in fade-in duration-200 max-w-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#f5f3ff] text-[#6852f5] text-xs font-bold border border-[#8574ff]/30">
                    Step 4 of 5
                  </span>
                  <span className="text-xs font-semibold text-neutral-500">Contact Details</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-neutral-900 tracking-tight leading-tight mb-2 font-sans">
                  Where should we send your offers?
                </h1>
                <p className="text-xs sm:text-sm text-neutral-600 font-medium mb-6">
                  Verified dealers and buyers will send private bids directly to your Autoace account
                </p>

                <div className="space-y-4 mb-8">
                  {/* Name */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-neutral-900 mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                        <User className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Alex Chileshe"
                        className="w-full pl-11 pr-4 py-3 border border-neutral-300 rounded-lg text-sm sm:text-base font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#8574ff]"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-neutral-900 mb-1.5">
                      Phone Number (WhatsApp enabled)
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                        <Phone className="w-5 h-5" />
                      </div>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+260 97 712 3456"
                        className="w-full pl-11 pr-4 py-3 border border-neutral-300 rounded-lg text-sm sm:text-base font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#8574ff]"
                      />
                    </div>
                  </div>

                  {/* Location in Zambia */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-neutral-900 mb-1.5">
                      City / Location in Zambia
                    </label>
                    <div className="relative mb-2">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Lusaka, Zambia"
                        className="w-full pl-11 pr-4 py-3 border border-neutral-300 rounded-lg text-sm sm:text-base font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#8574ff]"
                      />
                    </div>

                    {/* Quick selection chips for Zambian cities */}
                    <div className="flex flex-wrap gap-1.5">
                      {popularZambiaLocations.map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => setLocation(`${loc}, Zambia`)}
                          className={`text-xs px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                            location.startsWith(loc)
                              ? 'bg-[#8574ff] text-neutral-950 font-bold'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-2 text-xs text-neutral-500">
                    <ShieldCheck className="w-4 h-4 text-[#6852f5] shrink-0 mt-0.5" />
                    <span>
                      We keep your contact details private until you accept a formal offer with verified secure payment.
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSlide(5)}
                  className="w-full py-3.5 px-6 rounded-lg bg-[#8574ff] hover:bg-[#7360f2] text-neutral-950 font-black text-sm sm:text-base text-center transition-colors shadow-sm cursor-pointer"
                >
                  Submit & get my bids
                </button>
              </div>
            )}

            {/* SLIDE 5: Thank You & Final Confirmation */}
            {slide === 5 && (
              <div className="animate-in fade-in duration-200 max-w-lg">
                <div className="w-14 h-14 rounded-full bg-[#f0edff] flex items-center justify-center text-[#6852f5] mb-5">
                  <CheckCircle2 className="w-8 h-8 text-[#553ee6]" />
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-neutral-900 tracking-tight leading-tight mb-2 font-sans">
                  Thank you, {fullName}!
                </h1>
                <p className="text-xs sm:text-sm text-neutral-600 font-medium mb-6">
                  Your car listing is live. Verified dealers and direct buyers in <span className="font-bold text-neutral-900">{location}</span> and nationwide have been alerted.
                </p>

                {/* Final Summary Card */}
                <div className="bg-[#f8f7f5] rounded-xl p-5 border border-neutral-200 space-y-3 mb-6 text-xs text-neutral-700">
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                    <span className="font-extrabold text-neutral-900">Vehicle:</span>
                    <span className="bg-[#8574ff] text-neutral-950 font-black px-2.5 py-1 rounded text-xs">
                      {carDetails.title || 'Vehicle Listing'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Trim / Spec:</span>
                    <span className="font-bold text-neutral-900">{carDetails.trim || 'Verified Specification'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Estimated Valuation:</span>
                    <span className="font-bold text-[#553ee6]">
                      K {(carDetails.estimatedLowZMW || 150000).toLocaleString()} - K {(carDetails.estimatedHighZMW || 180000).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Target Reserve:</span>
                    <span className="font-bold text-neutral-900">K {expectedPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Location:</span>
                    <span className="font-bold text-neutral-900">{location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Inspection:</span>
                    <span className="font-bold text-neutral-900">Free physical inspection & secure handover</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={onBackToHome}
                    className="w-full py-3.5 px-6 rounded-lg bg-black hover:bg-neutral-800 text-white font-extrabold text-sm sm:text-base text-center transition-colors cursor-pointer shadow"
                  >
                    Return to Autoace Home
                  </button>

                  <p className="text-center text-[11px] text-neutral-400">
                    Questions? Call our Lusaka coordination desk at +260 97 100 2000
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Desktop Ambient Gradient Side */}
        <div className="hidden lg:flex lg:w-[42%] xl:w-[46%] min-h-screen bg-gradient-to-br from-[#fedcd2]/60 via-[#fde9e3]/50 to-[#daf5f2]/80 relative overflow-hidden flex-col justify-center items-center p-10 xl:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-100/40 via-transparent to-transparent pointer-events-none"></div>

          <div className="relative z-10 max-w-sm w-full bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/60 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-[#f0edff] text-[#6852f5] text-[11px] font-black uppercase tracking-wider">
                Zambian Market Direct
              </span>
              <span className="text-xs font-bold text-neutral-500">Autoace Zed</span>
            </div>

            <div>
              <p className="text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">Vehicle Selected</p>
              <h3 className="text-lg font-black text-neutral-900 mt-0.5 leading-snug">
                {carDetails.title || 'Choose or Enter Vehicle'}
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                {carDetails.trim || 'Pick Year, Make & Model on the left to activate instant Kwacha dealer bidding.'}
              </p>
            </div>

            {carDetails.estimatedLowZMW > 0 && (
              <div className="bg-neutral-900 text-white rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-400 block font-semibold">Active Dealer Range</span>
                  <span className="text-sm font-black text-[#8574ff]">
                    K {carDetails.estimatedLowZMW.toLocaleString()} - K {carDetails.estimatedHighZMW.toLocaleString()}
                  </span>
                </div>
                <span className="text-[11px] bg-[#8574ff] text-neutral-950 px-2 py-0.5 rounded font-black">
                  ZMW
                </span>
              </div>
            )}

            <div className="pt-2 border-t border-neutral-200/80 space-y-2 text-xs text-neutral-600 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6852f5] shrink-0" />
                <span>450+ verified buyers across Lusaka, Ndola & Kitwe</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6852f5] shrink-0" />
                <span>100% free with zero hidden seller commissions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6852f5] shrink-0" />
                <span>Instant mobile money or bank transfer upon handover</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
