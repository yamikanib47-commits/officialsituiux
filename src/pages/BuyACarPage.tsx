import React, { useState } from 'react';
import { AutoaceLogo } from '../components/AutoaceLogo';
import {
  POPULAR_MAKES,
  ALL_MAKES,
  MONTHLY_PRICES,
  CASH_PRICES,
  DEFAULT_MODELS_BY_MAKE,
  TOYOTA_MODELS,
  CarModelItem,
} from '../data/buyCarData';
import { ChevronLeft, X, Zap, ChevronDown, Info, MapPin, CheckCircle2 } from 'lucide-react';

interface BuyACarPageProps {
  onBackToHome: () => void;
}

type ConfigStep = 'initial' | 'budget' | 'engine' | 'colour' | 'postcode' | 'summary';

export const BuyACarPage: React.FC<BuyACarPageProps> = ({ onBackToHome }) => {
  // Navigation & Step States
  const [currentStep, setCurrentStep] = useState<ConfigStep>('initial');
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState<'make' | 'model'>('make');
  const [filterEVGrantOnly, setFilterEVGrantOnly] = useState(false);
  const [selectedMake, setSelectedMake] = useState<string | null>('Toyota');
  const [selectedModel, setSelectedModel] = useState<string>('Aygo X');

  // Budget Step States
  const [pricingMode, setPricingMode] = useState<'Monthly' | 'Cash'>('Monthly');
  const [minPrice, setMinPrice] = useState('Any');
  const [maxPrice, setMaxPrice] = useState('Any');

  // Colour customization
  const [selectedColour, setSelectedColour] = useState<string>("I don't mind");

  // Location in Zambia
  const [postcode, setPostcode] = useState<string>('Lusaka');

  const priceOptions = pricingMode === 'Monthly' ? MONTHLY_PRICES : CASH_PRICES;

  const handleMakeSelect = (makeName: string) => {
    setSelectedMake(makeName);
    setFilterEVGrantOnly(false);
    setModalStep('model');
  };

  const handleModelSelect = (modelName: string) => {
    setSelectedModel(modelName);
    setShowModal(false);
    setCurrentStep('engine');
  };

  // Models for selected make
  const modelsForMake = (selectedMake && DEFAULT_MODELS_BY_MAKE[selectedMake]) || TOYOTA_MODELS;
  const displayedModels = filterEVGrantOnly
    ? modelsForMake.filter((m) => m.hasEVGrant)
    : modelsForMake;

  const displayedPopular = filterEVGrantOnly
    ? POPULAR_MAKES.filter((m) => m.hasEVGrant)
    : POPULAR_MAKES;

  const displayedAll = filterEVGrantOnly
    ? ALL_MAKES.filter((m) => m.hasEVGrant)
    : ALL_MAKES;

  const colours = [
    { id: 'any', name: "I don't mind", price: 'Free' },
    { id: 'tarragon', name: 'Bi-tone metallic - Tarragon', price: 'Free', colorHex: '#94a3a8' },
    { id: 'silver', name: 'Bi-tone metallic - Jasmine silver', price: 'Free', colorHex: '#e2e4e6' },
    { id: 'cinnamon', name: 'Bi-tone metallic - Cinnamon', price: 'Free', colorHex: '#d8b598' },
    { id: 'lavender', name: 'Bi-tone metallic - Lavender', price: 'Free', colorHex: '#9887a2' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col relative">
      {/* Mobile Ambient Gradient Top Backdrop */}
      <div className="lg:hidden h-28 bg-gradient-to-b from-[#fedcd2]/70 via-[#fde9e3]/60 to-[#daf5f2]/70 absolute top-0 left-0 right-0 z-0"></div>

      <div className="flex-1 flex flex-col lg:flex-row min-h-screen relative z-10">
        {/* Left Interactive Form Area */}
        <div className="w-full lg:w-[58%] xl:w-[54%] min-h-screen bg-white rounded-t-[28px] lg:rounded-none mt-12 lg:mt-0 p-6 sm:p-10 lg:p-14 flex flex-col justify-between shadow-lg lg:shadow-none">
          <div>
            {/* Brand Logo */}
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

            {/* STEP 1: Initial Question */}
            {currentStep === 'initial' && (
              <div className="animate-in fade-in duration-200">
                <button
                  type="button"
                  onClick={onBackToHome}
                  className="inline-flex items-center gap-1 font-bold text-sm text-neutral-900 hover:underline mb-8 cursor-pointer"
                >
                  <span className="font-extrabold text-base">&lt;</span>
                  <span className="underline underline-offset-2">Back</span>
                </button>

                <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-neutral-900 tracking-tight leading-tight mb-8 font-sans">
                  Do you know what you’re looking for?
                </h1>

                <div className="space-y-4 max-w-md">
                  <button
                    type="button"
                    onClick={() => {
                      setModalStep('make');
                      setShowModal(true);
                    }}
                    className="w-full py-4 px-6 rounded-lg border border-neutral-300 hover:border-black bg-white hover:bg-neutral-50 text-neutral-900 font-bold text-sm sm:text-base text-center transition-all duration-150 shadow-sm active:scale-[0.99] cursor-pointer"
                  >
                    I know the make and model
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep('budget')}
                    className="w-full py-4 px-6 rounded-lg border border-neutral-300 hover:border-black bg-white hover:bg-neutral-50 text-neutral-900 font-bold text-sm sm:text-base text-center transition-all duration-150 shadow-sm active:scale-[0.99] cursor-pointer"
                  >
                    I’m not sure what I want
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Budget Discovery */}
            {currentStep === 'budget' && (
              <div className="animate-in fade-in duration-200">
                <div className="flex items-center justify-between mb-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep('initial')}
                    className="inline-flex items-center gap-1 font-bold text-sm text-neutral-900 hover:underline cursor-pointer"
                  >
                    <span className="font-extrabold text-base">&lt;</span>
                    <span className="underline underline-offset-2">Back</span>
                  </button>
                  <span className="text-xs sm:text-sm font-bold text-neutral-800">
                    10% completed
                  </span>
                </div>

                <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden mb-8">
                  <div className="h-full bg-[#8574ff] w-[10%] rounded-full"></div>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-neutral-900 tracking-tight leading-tight mb-2 font-sans">
                  What's your budget?
                </h1>
                <p className="text-xs sm:text-sm text-neutral-600 font-medium mb-6">
                  Choose a range for your new car
                </p>

                {/* Monthly / Cash Toggle */}
                <div className="border border-neutral-300 rounded-xl p-1 flex items-center max-w-md mb-6 bg-white">
                  <button
                    type="button"
                    onClick={() => setPricingMode('Monthly')}
                    className={`flex-1 py-2.5 text-center text-sm font-black rounded-lg transition-all cursor-pointer ${
                      pricingMode === 'Monthly' ? 'bg-[#8574ff] text-neutral-950 shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setPricingMode('Cash')}
                    className={`flex-1 py-2.5 text-center text-sm font-black rounded-lg transition-all cursor-pointer ${
                      pricingMode === 'Cash' ? 'bg-[#8574ff] text-neutral-950 shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Cash
                  </button>
                </div>

                {/* Dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mb-8">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-neutral-900 mb-1.5">
                      Minimum price
                    </label>
                    <div className="relative">
                      <select
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full appearance-none bg-white border border-neutral-300 rounded-lg px-3.5 py-3 text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#8574ff] cursor-pointer"
                      >
                        {priceOptions.map((opt) => (
                          <option key={`min-${opt}`} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-neutral-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-neutral-900 mb-1.5">
                      Maximum price
                    </label>
                    <div className="relative">
                      <select
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full appearance-none bg-white border border-neutral-300 rounded-lg px-3.5 py-3 text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#8574ff] cursor-pointer"
                      >
                        {priceOptions.map((opt) => (
                          <option key={`max-${opt}`} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-neutral-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-200 flex items-center gap-3 max-w-md">
                  <button
                    type="button"
                    onClick={() => setCurrentStep('engine')}
                    className="flex-1 py-3 px-6 rounded-lg border border-neutral-300 hover:bg-neutral-50 font-bold text-sm sm:text-base text-neutral-900 transition-colors text-center cursor-pointer"
                  >
                    Skip
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep('engine')}
                    className="flex-1 py-3 px-6 rounded-lg bg-[#8574ff] hover:bg-[#7360f2] font-black text-sm sm:text-base text-neutral-950 transition-colors text-center shadow-sm cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Choose an Engine (Matches Screenshot 1) */}
            {currentStep === 'engine' && (
              <div className="animate-in fade-in duration-200">
                <div className="flex items-center justify-between mb-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep('initial')}
                    className="inline-flex items-center gap-1 font-bold text-sm text-neutral-900 hover:underline cursor-pointer"
                  >
                    <span className="font-extrabold text-base">&lt;</span>
                    <span className="underline underline-offset-2">Back</span>
                  </button>
                  <span className="text-xs sm:text-sm font-bold text-neutral-800">
                    66% completed
                  </span>
                </div>

                <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden mb-8">
                  <div className="h-full bg-[#8574ff] w-[66%] rounded-full"></div>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-neutral-900 tracking-tight leading-tight mb-2 font-sans">
                  Choose an engine
                </h1>
                <p className="text-xs sm:text-sm text-neutral-600 font-medium mb-6">
                  Pick an engine that best suits your regular journeys
                </p>

                {/* Engine Card */}
                <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow mb-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div>
                      <h2 className="text-lg sm:text-xl font-black text-neutral-900 mb-1">
                        1.5 Hybrid CVT
                      </h2>
                      <p className="text-xs sm:text-sm text-neutral-600 font-medium mb-4">
                        Automatic • Self-charging hybrid (Petrol)
                      </p>

                      <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-600">
                        <div>
                          <p className="text-[11px] text-neutral-400 font-semibold mb-0.5">Performance</p>
                          <p className="font-extrabold text-neutral-900">85 kW (116 BHP)</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-neutral-400 font-semibold mb-0.5 flex items-center gap-1">
                            Efficiency <Info className="w-3 h-3 text-neutral-400" />
                          </p>
                          <p className="font-extrabold text-neutral-900">76 MPG</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-neutral-400 font-semibold mb-0.5">Emissions</p>
                          <p className="font-extrabold text-neutral-900">CO2 89 g/km</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center lg:flex-col lg:items-end justify-between border-t lg:border-t-0 lg:border-l border-neutral-200 pt-4 lg:pt-0 lg:pl-6 gap-3">
                      <div className="text-right">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs text-neutral-500 font-medium">Benchmark Price</span>
                          <span className="text-sm font-extrabold text-neutral-900">K 390,000</span>
                        </div>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="text-xs text-neutral-500 font-medium">Monthly from</span>
                          <span className="text-base font-black text-neutral-900">K 8,500/mo*</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setCurrentStep('colour')}
                        className="bg-[#8574ff] hover:bg-[#7360f2] text-neutral-950 font-black text-sm sm:text-base px-6 py-3 rounded-lg transition-colors whitespace-nowrap shadow-sm cursor-pointer"
                      >
                        Pick this engine
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-400 leading-relaxed max-w-xl">
                  * Please contact the dealer for a personalised quote, including terms and conditions. Quote is subject to dealer requirements, including status and availability. Illustrations include lease and personal contract hire prices.
                </p>
              </div>
            )}

            {/* STEP 4: Customise your car (Matches Screenshot 2) */}
            {currentStep === 'colour' && (
              <div className="animate-in fade-in duration-200">
                <div className="flex items-center justify-between mb-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep('engine')}
                    className="inline-flex items-center gap-1 font-bold text-sm text-neutral-900 hover:underline cursor-pointer"
                  >
                    <span className="font-extrabold text-base">&lt;</span>
                    <span className="underline underline-offset-2">Back</span>
                  </button>
                  <span className="text-xs sm:text-sm font-bold text-neutral-800">
                    80% completed
                  </span>
                </div>

                <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden mb-8">
                  <div className="h-full bg-[#8574ff] w-[80%] rounded-full"></div>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-neutral-900 tracking-tight leading-tight mb-2 font-sans">
                  Customise your car
                </h1>
                <p className="text-xs sm:text-sm text-neutral-600 font-medium mb-6">
                  Make your car your own with a choice of colours and options
                </p>

                {/* Colour selection grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-6">
                  {colours.map((c) => {
                    const isSelected = selectedColour === c.name;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedColour(c.name)}
                        className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#f5f3ff] border-[#8574ff] ring-1 ring-[#8574ff]'
                            : 'bg-white border-neutral-300 hover:border-neutral-400'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              isSelected ? 'border-[#6852f5]' : 'border-neutral-400'
                            }`}
                          >
                            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#6852f5]" />}
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-neutral-900 leading-tight">
                              {c.name}
                            </p>
                            <p className="text-xs text-neutral-500 font-medium mt-0.5">{c.price}</p>
                          </div>
                        </div>

                        {c.colorHex && (
                          <div
                            className="w-7 h-7 rounded-full shadow-inner border border-neutral-200 shrink-0"
                            style={{ backgroundColor: c.colorHex }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-3 max-w-sm">
                  <button
                    type="button"
                    onClick={() => setCurrentStep('postcode')}
                    className="w-full py-3 px-4 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-900 font-bold text-sm text-center transition-colors cursor-pointer"
                  >
                    Choose add-ons
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep('postcode')}
                    className="w-full py-3.5 px-6 rounded-lg bg-[#8574ff] hover:bg-[#7360f2] text-neutral-950 font-black text-sm sm:text-base text-center transition-colors shadow-sm cursor-pointer"
                  >
                    Next step
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Postcode / Location (Matches Screenshot 3) */}
            {currentStep === 'postcode' && (
              <div className="animate-in fade-in duration-200">
                <div className="flex items-center justify-between mb-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep('colour')}
                    className="inline-flex items-center gap-1 font-bold text-sm text-neutral-900 hover:underline cursor-pointer"
                  >
                    <span className="font-extrabold text-base">&lt;</span>
                    <span className="underline underline-offset-2">Back</span>
                  </button>
                  <span className="text-xs sm:text-sm font-bold text-neutral-800">
                    88% completed
                  </span>
                </div>

                <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden mb-8">
                  <div className="h-full bg-[#8574ff] w-[88%] rounded-full"></div>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-neutral-900 tracking-tight leading-tight mb-2 font-sans">
                  Great choice!
                </h1>
                <p className="text-xs sm:text-sm text-neutral-600 font-medium mb-6 max-w-md">
                  Enter your city or town in Zambia so you can compare offers from local dealerships, as well as the best direct import deals across the country.
                </p>

                <div className="max-w-md space-y-4 mb-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-neutral-900 mb-1.5">
                      City / Location in Zambia
                    </label>
                    <div className="relative mb-2">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-700">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        placeholder="e.g. Lusaka, Ndola, Kitwe"
                        className="w-full pl-11 pr-4 py-3 border border-neutral-300 rounded-lg text-sm sm:text-base font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#8574ff]"
                      />
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {['Lusaka', 'Ndola', 'Kitwe', 'Livingstone', 'Chipata', 'Solwezi'].map((town) => (
                        <button
                          key={town}
                          type="button"
                          onClick={() => setPostcode(town)}
                          className={`text-xs px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                            postcode === town
                              ? 'bg-[#8574ff] text-neutral-950 font-bold'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                        >
                          {town}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentStep('summary')}
                    className="w-full py-3.5 px-6 rounded-lg bg-[#8574ff] hover:bg-[#7360f2] text-neutral-950 font-black text-sm sm:text-base text-center transition-colors shadow-sm cursor-pointer"
                  >
                    Next step
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: Summary & Dealers Offers */}
            {currentStep === 'summary' && (
              <div className="animate-in fade-in duration-200 max-w-lg">
                <div className="flex items-center justify-between mb-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep('postcode')}
                    className="inline-flex items-center gap-1 font-bold text-sm text-neutral-900 hover:underline cursor-pointer"
                  >
                    <span className="font-extrabold text-base">&lt;</span>
                    <span className="underline underline-offset-2">Back</span>
                  </button>
                  <span className="text-xs sm:text-sm font-bold text-neutral-800">
                    100% completed
                  </span>
                </div>

                <div className="w-full h-1.5 bg-[#8574ff] rounded-full overflow-hidden mb-8"></div>

                <div className="w-12 h-12 rounded-full bg-[#f0edff] flex items-center justify-center text-[#6852f5] mb-4">
                  <CheckCircle2 className="w-7 h-7 text-[#553ee6]" />
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight leading-tight mb-2 font-sans">
                  Your {selectedMake} {selectedModel} is configured!
                </h1>
                <p className="text-xs sm:text-sm text-neutral-600 font-medium mb-6">
                  Top verified Autoace dealers in <span className="font-bold text-neutral-900">{postcode}</span> and across Zambia are now compiling their best upfront quotes.
                </p>

                <div className="bg-[#f8f7f5] rounded-xl p-4 border border-neutral-200 space-y-2 mb-6 text-xs text-neutral-700">
                  <div className="flex justify-between font-bold">
                    <span>Engine:</span>
                    <span>1.5 Hybrid CVT (Automatic)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Colour:</span>
                    <span>{selectedColour}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Budget Mode:</span>
                    <span>{pricingMode}</span>
                  </div>
                  <div className="flex justify-between text-[#553ee6] font-extrabold">
                    <span>Average Autoace Saving:</span>
                    <span>K 45,000 off standard import price</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onBackToHome}
                  className="w-full py-3.5 px-6 rounded-lg bg-black hover:bg-neutral-800 text-white font-extrabold text-sm sm:text-base text-center transition-colors cursor-pointer shadow"
                >
                  Return to Autoace Home
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Desktop Pastel Mesh Gradient Side */}
        <div className="hidden lg:block lg:w-[42%] xl:w-[46%] min-h-screen bg-gradient-to-br from-[#fedcd2]/60 via-[#fde9e3]/50 to-[#daf5f2]/80 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-100/40 via-transparent to-transparent"></div>
        </div>
      </div>

      {/* "Choose make" & "Choose model" Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full sm:max-w-[560px] h-full sm:h-auto sm:max-h-[92vh] sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
            {/* Modal Header */}
            <div className="p-4 border-b border-neutral-200 flex items-center justify-between sticky top-0 bg-white z-20">
              {modalStep === 'model' ? (
                <button
                  type="button"
                  onClick={() => setModalStep('make')}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
                  aria-label="Back to Choose make"
                >
                  <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                </button>
              ) : (
                <div className="w-8"></div>
              )}

              <h2 className="text-sm sm:text-base font-extrabold text-neutral-900">
                {modalStep === 'make' ? 'Choose make' : 'Choose model'}
              </h2>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Modal Step 1: Choose make */}
            {modalStep === 'make' && (
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 pb-20">
                {/* Toyota Yaris Advertisement Box */}
                <div className="bg-[#e2f9f5] rounded-xl p-3.5 sm:p-4 border border-[#b8ece5] relative">
                  <div className="flex items-start justify-between text-[10px] text-neutral-600 mb-2">
                    <span></span>
                    <div className="flex items-center gap-1 font-semibold">
                      <span>Advertisement</span>
                      <Info className="w-3 h-3" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-20 sm:w-24 shrink-0 aspect-[16/10] bg-white/70 rounded-lg overflow-hidden flex items-center justify-center p-1">
                      <img
                        src="/src/assets/images/hero_yellow_ev_hatchback_1793016491792.jpg"
                        alt="Toyota Yaris Deal"
                        className="w-full h-full object-contain filter hue-rotate-180"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xs sm:text-sm font-extrabold text-neutral-900 mb-0.5">
                        Toyota Yaris
                      </h3>
                      <p className="text-[11px] sm:text-xs text-neutral-800 font-medium leading-snug">
                        0% APR Representative over 24 months* + K15,000 Loyalty Voucher towards your next vehicle package^
                      </p>
                      <a
                        href="#terms"
                        className="inline-block text-[10px] text-neutral-600 underline hover:text-black font-semibold mt-1"
                      >
                        See terms and conditions
                      </a>
                    </div>
                  </div>
                </div>

                {/* Popular makes Section */}
                <div>
                  <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2.5">
                    Popular makes
                  </h3>
                  <div className="divide-y divide-neutral-100 border-t border-b border-neutral-100">
                    {displayedPopular.map((make) => (
                      <button
                        key={`pop-${make.name}`}
                        type="button"
                        onClick={() => handleMakeSelect(make.name)}
                        className="w-full py-3 px-1 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full border border-neutral-300 flex items-center justify-center text-[10px] font-bold text-neutral-800">
                            {make.name.charAt(0)}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:underline">
                            {make.name}
                          </span>
                          {make.isNew && (
                            <span className="bg-black text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-sm tracking-tight">
                              New
                            </span>
                          )}
                        </div>

                        {make.hasEVGrant && (
                          <span className="w-5 h-5 rounded-full bg-[#8574ff] text-neutral-950 flex items-center justify-center">
                            <Zap className="w-3 h-3 fill-neutral-950 text-neutral-950" />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* All makes Section */}
                <div>
                  <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2.5">
                    All makes
                  </h3>
                  <div className="divide-y divide-neutral-100 border-t border-b border-neutral-100">
                    {displayedAll.map((make) => (
                      <button
                        key={`all-${make.name}`}
                        type="button"
                        onClick={() => handleMakeSelect(make.name)}
                        className="w-full py-3 px-1 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full border border-neutral-300 flex items-center justify-center text-[10px] font-bold text-neutral-800">
                            {make.name.charAt(0)}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:underline">
                            {make.name}
                          </span>
                          {make.isNew && (
                            <span className="bg-black text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-sm tracking-tight">
                              New
                            </span>
                          )}
                        </div>

                        {make.hasEVGrant && (
                          <span className="w-5 h-5 rounded-full bg-[#8574ff] text-neutral-950 flex items-center justify-center">
                            <Zap className="w-3 h-3 fill-neutral-950 text-neutral-950" />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Modal Step 2: Choose model */}
            {modalStep === 'model' && (
              <div className="p-2 sm:p-4 overflow-y-auto flex-1 space-y-1 pb-20">
                <div className="divide-y divide-neutral-100 border-t border-b border-neutral-100">
                  {displayedModels.map((model) => (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => handleModelSelect(model.name)}
                      className="w-full py-3.5 px-3 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-extrabold text-neutral-900 group-hover:underline">
                          {model.name}
                        </span>

                        {model.hasEVGrant && (
                          <span
                            className="inline-flex items-center justify-center w-5 h-5 rounded bg-[#8574ff] text-neutral-950 shadow-xs"
                            title="EV Grant options"
                          >
                            <Zap className="w-3.5 h-3.5 fill-neutral-950 text-neutral-950" />
                          </span>
                        )}
                      </div>

                      <div className="w-24 sm:w-32 aspect-[16/9] flex items-center justify-end overflow-hidden">
                        <img
                          src={model.image}
                          alt={model.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Floating Filter Pill */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none z-30">
              <button
                type="button"
                onClick={() => setFilterEVGrantOnly(!filterEVGrantOnly)}
                className={`pointer-events-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-full shadow-lg border text-xs font-black transition-all cursor-pointer ${
                  filterEVGrantOnly
                    ? 'bg-[#8574ff] text-neutral-950 border-[#8574ff]'
                    : 'bg-white text-neutral-900 border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <Zap className={`w-3.5 h-3.5 ${filterEVGrantOnly ? 'fill-neutral-950 text-neutral-950' : 'fill-[#8574ff] text-[#8574ff]'}`} />
                <span>EV Grant options</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
