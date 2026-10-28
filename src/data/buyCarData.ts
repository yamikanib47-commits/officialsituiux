export interface CarMakeItem {
  name: string;
  isPopular?: boolean;
  isNew?: boolean;
  hasEVGrant?: boolean;
}

export const POPULAR_MAKES: CarMakeItem[] = [
  { name: 'Toyota', isPopular: true, hasEVGrant: true },
  { name: 'Nissan', isPopular: true, hasEVGrant: true },
  { name: 'Ford', isPopular: true },
  { name: 'Isuzu', isPopular: true },
  { name: 'Mitsubishi', isPopular: true },
  { name: 'Mercedes-Benz', isPopular: true, hasEVGrant: true },
  { name: 'BMW', isPopular: true, hasEVGrant: true },
  { name: 'Honda', isPopular: true, hasEVGrant: true },
];

export const ALL_MAKES: CarMakeItem[] = [
  { name: 'Audi', hasEVGrant: true },
  { name: 'BMW', hasEVGrant: true },
  { name: 'BYD', isNew: true, hasEVGrant: true },
  { name: 'Changan', isNew: true },
  { name: 'Chery', isNew: true },
  { name: 'Chevrolet' },
  { name: 'Ford' },
  { name: 'Great Wall (GWM)', isNew: true },
  { name: 'Honda', hasEVGrant: true },
  { name: 'Hyundai', hasEVGrant: true },
  { name: 'Isuzu' },
  { name: 'Jaecoo', isNew: true, hasEVGrant: true },
  { name: 'Jeep' },
  { name: 'Kia', hasEVGrant: true },
  { name: 'Land Rover' },
  { name: 'Lexus', hasEVGrant: true },
  { name: 'Mazda' },
  { name: 'Mercedes-Benz', hasEVGrant: true },
  { name: 'Mitsubishi' },
  { name: 'Nissan', hasEVGrant: true },
  { name: 'Peugeot' },
  { name: 'Renault', hasEVGrant: true },
  { name: 'Subaru' },
  { name: 'Suzuki', hasEVGrant: true },
  { name: 'Toyota', hasEVGrant: true },
  { name: 'Volkswagen' },
  { name: 'Volvo', hasEVGrant: true },
];

export interface CarModelItem {
  id: string;
  name: string;
  bodyType: string;
  benchmarkPriceZMW: string;
  image: string;
  hasEVGrant?: boolean;
}

export const TOYOTA_MODELS: CarModelItem[] = [
  {
    id: 'mark-x',
    name: 'Mark X (250G / 300G V6)',
    bodyType: 'Executive Saloon',
    benchmarkPriceZMW: 'K 165,000',
    image: '/src/assets/images/renault_five_electric_1793016492061.jpg',
  },
  {
    id: 'hilux-gd6',
    name: 'Hilux GD-6 Double Cab',
    bodyType: '4x4 Pickup',
    benchmarkPriceZMW: 'K 680,000',
    image: '/src/assets/images/car_review_mat_suv_1793016494055.jpg',
  },
  {
    id: 'land-cruiser-prado',
    name: 'Land Cruiser Prado TX/TZ',
    bodyType: 'Full-Size SUV',
    benchmarkPriceZMW: 'K 790,000',
    image: '/src/assets/images/jaecoo_compact_suv_1793016492784.jpg',
  },
  {
    id: 'fortuner',
    name: 'Fortuner 2.8 GD-6',
    bodyType: '7-Seater SUV',
    benchmarkPriceZMW: 'K 620,000',
    image: '/src/assets/images/jaecoo_compact_suv_1793016492784.jpg',
  },
  {
    id: 'rav4',
    name: 'RAV4 Hybrid / Petrol',
    bodyType: 'Compact SUV',
    benchmarkPriceZMW: 'K 390,000',
    image: '/src/assets/images/hero_yellow_ev_hatchback_1793016491792.jpg',
    hasEVGrant: true,
  },
  {
    id: 'harrier',
    name: 'Harrier (Grand / Hybrid)',
    bodyType: 'Luxury Crossover',
    benchmarkPriceZMW: 'K 340,000',
    image: '/src/assets/images/renault_five_electric_1793016492061.jpg',
    hasEVGrant: true,
  },
  {
    id: 'corolla-vitz',
    name: 'Corolla / Vitz (Fuel Saver)',
    bodyType: 'Hatchback',
    benchmarkPriceZMW: 'K 160,000',
    image: '/src/assets/images/hero_yellow_ev_hatchback_1793016491792.jpg',
    hasEVGrant: true,
  },
];

export const DEFAULT_MODELS_BY_MAKE: Record<string, CarModelItem[]> = {
  Toyota: TOYOTA_MODELS,
  Nissan: [
    { id: 'navara', name: 'Navara PRO-4X / LE', bodyType: '4x4 Double Cab', benchmarkPriceZMW: 'K 580,000', image: '/src/assets/images/car_review_mat_suv_1793016494055.jpg' },
    { id: 'dualis', name: 'Dualis / Qashqai Crossover', bodyType: 'Compact SUV', benchmarkPriceZMW: 'K 180,000', image: '/src/assets/images/hero_yellow_ev_hatchback_1793016491792.jpg' },
    { id: 'x-trail', name: 'X-Trail e-POWER / 4WD', bodyType: 'Family SUV', benchmarkPriceZMW: 'K 360,000', image: '/src/assets/images/jaecoo_compact_suv_1793016492784.jpg', hasEVGrant: true },
    { id: 'patrol', name: 'Patrol V8 Executive', bodyType: 'Heavy 4WD', benchmarkPriceZMW: 'K 1,200,000', image: '/src/assets/images/jaecoo_compact_suv_1793016492784.jpg' },
  ],
  Ford: [
    { id: 'ranger-xlt', name: 'Ranger 2.0 / 2.2 Double Cab', bodyType: '4x4 Pickup', benchmarkPriceZMW: 'K 520,000', image: '/src/assets/images/car_review_mat_suv_1793016494055.jpg' },
    { id: 'everest', name: 'Everest Sport / Titanium', bodyType: '7-Seater SUV', benchmarkPriceZMW: 'K 690,000', image: '/src/assets/images/jaecoo_compact_suv_1793016492784.jpg' },
  ],
  Isuzu: [
    { id: 'dmax-300', name: 'D-Max 3.0 V-Cross 4x4', bodyType: 'Double Cab', benchmarkPriceZMW: 'K 610,000', image: '/src/assets/images/car_review_mat_suv_1793016494055.jpg' },
    { id: 'dmax-250', name: 'D-Max 250 Single / Double Cab', bodyType: 'Commercial 4x4', benchmarkPriceZMW: 'K 430,000', image: '/src/assets/images/car_review_mat_suv_1793016494055.jpg' },
  ],
  Mitsubishi: [
    { id: 'pajero-sport', name: 'Pajero Sport 2.4 D4', bodyType: 'Rugged SUV', benchmarkPriceZMW: 'K 540,000', image: '/src/assets/images/jaecoo_compact_suv_1793016492784.jpg' },
    { id: 'triton', name: 'Triton 4x4 Athlete', bodyType: 'Double Cab', benchmarkPriceZMW: 'K 490,000', image: '/src/assets/images/car_review_mat_suv_1793016494055.jpg' },
  ],
  'Mercedes-Benz': [
    { id: 'c-class', name: 'C-Class (C200 / C220d)', bodyType: 'Executive Saloon', benchmarkPriceZMW: 'K 380,000', image: '/src/assets/images/renault_five_electric_1793016492061.jpg', hasEVGrant: true },
    { id: 'gle', name: 'GLE 350d 4MATIC', bodyType: 'Luxury SUV', benchmarkPriceZMW: 'K 890,000', image: '/src/assets/images/jaecoo_compact_suv_1793016492784.jpg' },
  ],
  BMW: [
    { id: 'x5', name: 'X5 xDrive30d / 40i', bodyType: 'Luxury SUV', benchmarkPriceZMW: 'K 780,000', image: '/src/assets/images/car_review_mat_suv_1793016494055.jpg' },
    { id: '3-series', name: '3 Series (320i / 320d)', bodyType: 'Sport Saloon', benchmarkPriceZMW: 'K 340,000', image: '/src/assets/images/hero_yellow_ev_hatchback_1793016491792.jpg' },
  ],
  Honda: [
    { id: 'fit', name: 'Fit / Jazz Hybrid Fuel Saver', bodyType: 'Hatchback', benchmarkPriceZMW: 'K 140,000', image: '/src/assets/images/hero_yellow_ev_hatchback_1793016491792.jpg', hasEVGrant: true },
    { id: 'cr-v', name: 'CR-V AWD / e:HEV', bodyType: 'Compact SUV', benchmarkPriceZMW: 'K 350,000', image: '/src/assets/images/jaecoo_compact_suv_1793016492784.jpg', hasEVGrant: true },
    { id: 'vezel', name: 'Vezel Hybrid Crossover', bodyType: 'Crossover', benchmarkPriceZMW: 'K 230,000', image: '/src/assets/images/renault_five_electric_1793016492061.jpg', hasEVGrant: true },
  ],
};

export const ZAMBIAN_TOWNS = [
  'Lusaka',
  'Ndola',
  'Kitwe',
  'Livingstone',
  'Kabwe',
  'Chipata',
  'Solwezi',
  'Chingola',
  'Mufulira',
  'Mazabuka',
  'Kasama',
  'Mongu',
];

export const MONTHLY_PRICES = [
  'Any',
  'K 3,500/mo',
  'K 5,000/mo',
  'K 7,500/mo',
  'K 10,000/mo',
  'K 15,000/mo',
  'K 25,000/mo',
  'K 35,000/mo+',
];

export const CASH_PRICES = [
  'Any',
  'Under K 150,000',
  'K 150,000 - K 250,000',
  'K 250,000 - K 400,000',
  'K 400,000 - K 600,000',
  'K 600,000 - K 850,000',
  'K 850,000 - K 1,200,000',
  'K 1,200,000+',
];

export const BUDGET_OPTIONS_ZMW = [
  'Any Budget',
  'Under K 150,000',
  'K 150,000 - K 250,000',
  'K 250,000 - K 400,000',
  'K 400,000 - K 600,000',
  'K 600,000 - K 850,000',
  'K 850,000 - K 1,200,000',
  'K 1,200,000+',
];

export const URGENCY_OPTIONS = [
  'Immediate (Ready to inspect & buy)',
  'Within 2-4 weeks',
  'Within 1-2 months',
  'Budget planning / Exploring options',
];
