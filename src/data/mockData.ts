export interface DealItem {
  id: string;
  title: string;
  image: string;
  tag?: string;
  budgetQuery?: string;
}

export interface TrendingCar {
  id: string;
  name: string;
  subtitle: string;
  badge?: string;
  avgSaving: string;
  image: string;
  cashPrice: string;
  leasePrice: string;
  rating?: string;
  make: string;
  model: string;
}

export interface ReviewItem {
  id: string;
  title: string;
  score: string;
  image: string;
  presenters?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  image: string;
  readTime?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  image: string;
  duration?: string;
}

export interface TrustpilotReview {
  id: string;
  name: string;
  timeAgo: string;
  verified: boolean;
  title: string;
  content: string;
  stars: number;
}

export const CATEGORY_CHIPS = [
  { id: 'just-listed', label: 'Just Listed Deals', icon: 'sparkles', active: true },
  { id: 'pickups', label: '4x4 & Pickups', icon: 'shield' },
  { id: 'sourcing', label: 'Direct Sourcing', icon: 'sparkles' },
  { id: 'local-used', label: 'Local Pre-owned', icon: 'car' },
  { id: 'commercial', label: 'Commercial & Vans', icon: 'truck' },
  { id: 'suvs', label: 'SUVs & Crossovers', icon: 'shield' },
  { id: 'fuel-saver', label: 'Fuel Savers', icon: 'battery-charging' },
  { id: 'estate', label: 'Family Estates', icon: 'briefcase' },
  { id: 'under-300k', label: 'Under K300k', icon: 'coins' },
];

export const BROWSE_DEALS: DealItem[] = [
  {
    id: 'imports',
    title: 'Japan & SA Imports',
    image: '/src/assets/images/jaecoo_compact_suv_1793016492784.jpg',
    budgetQuery: 'Imports',
  },
  {
    id: 'under-200k',
    title: 'Under K200,000',
    image: '/src/assets/images/hero_yellow_ev_hatchback_1793016491792.jpg',
    budgetQuery: 'K 200,000',
  },
  {
    id: 'under-300k',
    title: 'Under K300,000',
    image: '/src/assets/images/renault_five_electric_1793016492061.jpg',
    budgetQuery: 'K 300,000',
  },
  {
    id: 'under-500k',
    title: 'Under K500,000',
    image: '/src/assets/images/hero_yellow_ev_hatchback_1793016491792.jpg',
    budgetQuery: 'K 500,000',
  },
  {
    id: 'under-750k',
    title: 'Under K750,000',
    image: '/src/assets/images/jaecoo_compact_suv_1793016492784.jpg',
    budgetQuery: 'K 750,000',
  },
  {
    id: 'open-budget',
    title: 'Open Budget',
    image: '/src/assets/images/renault_five_electric_1793016492061.jpg',
    budgetQuery: 'Any Budget',
  },
];

export const TRENDING_CARS: TrendingCar[] = [
  {
    id: 'renault-5',
    name: 'Renault 5 E-Tech',
    subtitle: 'Ultra-efficient modern city EV',
    badge: 'Eco Sourcing',
    avgSaving: 'Direct Agent Sourcing',
    image: '/src/assets/images/renault_five_electric_1793016492061.jpg',
    cashPrice: 'K 480,000',
    leasePrice: 'CIF Lusaka benchmark',
    make: 'Renault',
    model: '5 E-Tech',
  },
  {
    id: 'jaecoo-e5',
    name: 'Jaecoo E5 SUV',
    subtitle: 'High-clearance premium crossover',
    badge: 'Agent Network',
    avgSaving: 'Verified Import Partner',
    image: '/src/assets/images/jaecoo_compact_suv_1793016492784.jpg',
    cashPrice: 'K 590,000',
    leasePrice: 'Duty & clearing support',
    make: 'Jaecoo',
    model: 'E5',
  },
  {
    id: 'volvo-ex30',
    name: 'Volvo EX30',
    subtitle: 'Stylish compact luxury electric SUV',
    badge: 'Clean Energy',
    avgSaving: 'Procurement Coordination',
    image: '/src/assets/images/hero_yellow_ev_hatchback_1793016491792.jpg',
    cashPrice: 'K 720,000',
    leasePrice: 'Direct agent quotes',
    make: 'Volvo',
    model: 'EX30',
  },
];

export const TRUSTPILOT_REVIEWS: TrustpilotReview[] = [
  {
    id: 'rev-1',
    name: 'Chileshe M.',
    timeAgo: 'Lusaka · 2 hours ago',
    verified: true,
    title: 'SOURCING WAS SMOOTH AND TRANSPARENT',
    content: 'AutoAce connected me with an agent who had the exact Toyota Hilux GD-6 double cab I needed. Physical inspection and paperwork checked out perfectly.',
    stars: 5,
  },
  {
    id: 'rev-2',
    name: 'Kondwani B.',
    timeAgo: 'Kitwe · 5 hours ago',
    verified: true,
    title: 'Sold my Ranger without the hassle',
    content: 'Posted my vehicle details and expected price. No time-wasters calling; the coordinator linked me with a vetted buyer in Ndola within 48 hours.',
    stars: 5,
  },
  {
    id: 'rev-3',
    name: 'Mutale P.',
    timeAgo: 'Ndola · 1 day ago',
    verified: true,
    title: 'Helped coordinate our company fleet',
    content: 'Sourced 3 commercial utility pickups across different vetted agents with full invoice clarity. Recommended for business procurement in Zambia.',
    stars: 5,
  },
  {
    id: 'rev-4',
    name: 'Mwamba S.',
    timeAgo: 'Livingstone · 2 days ago',
    verified: true,
    title: 'Professional coordinator updates',
    content: 'The WhatsApp updates from the AutoAce coordinator were prompt and accurate. Good to have a reliable vehicle procurement partner in Zambia.',
    stars: 5,
  },
];

export const POPULAR_REVIEWS: ReviewItem[] = [
  {
    id: 'review-1',
    title: 'Jaecoo 7 Review & Long-Term Reliability',
    score: '8/10',
    image: '/src/assets/images/car_review_mat_suv_1793016494055.jpg',
  },
  {
    id: 'review-2',
    title: 'Lepas L8 SUV Evaluation',
    score: '8/10',
    image: '/src/assets/images/jaecoo_compact_suv_1793016492784.jpg',
  },
  {
    id: 'review-3',
    title: 'Changan Deepal S05 Walkthrough',
    score: '7/10',
    image: '/src/assets/images/renault_five_electric_1793016492061.jpg',
  },
];

export const LATEST_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Navigating vehicle import duty and clearing through Nakonde and Chirundu in 2026',
    image: '/src/assets/images/ev_charging_plug_station_1793016493875.jpg',
  },
  {
    id: 'news-2',
    title: 'Top 5 fuel-efficient 4x4 vehicles suited for Zambian highway and gravel conditions',
    image: '/src/assets/images/car_review_mat_suv_1793016494055.jpg',
  },
  {
    id: 'news-3',
    title: 'Why hybrid and electric vehicles are gaining momentum for urban commuting in Lusaka',
    image: '/src/assets/images/hero_yellow_ev_hatchback_1793016491792.jpg',
  },
];

export const LATEST_VIDEOS: VideoItem[] = [
  {
    id: 'video-1',
    title: 'Is the NEW BMW X5 still the ultimate luxury SUV for cross-country touring?',
    image: '/src/assets/images/car_review_mat_suv_1793016494055.jpg',
  },
  {
    id: 'video-2',
    title: 'Full Off-Road & Endurance Test: Luxury 4x4 comparison and clearance',
    image: '/src/assets/images/jaecoo_compact_suv_1793016492784.jpg',
  },
  {
    id: 'video-3',
    title: 'Compact EV & Hybrid Efficiency Test: Real world fuel consumption breakdown',
    image: '/src/assets/images/hero_yellow_ev_hatchback_1793016491792.jpg',
  },
];

export const REVOLUTION_TOOLS = [
  {
    id: 'rev-tool-1',
    title: 'Fast procurement for priority business & personal vehicles',
    image: '/src/assets/images/ev_charging_plug_station_1793016493875.jpg',
  },
  {
    id: 'rev-tool-2',
    title: 'Verified vehicle agent coverage across Zambian major towns',
    image: '/src/assets/images/jaecoo_compact_suv_1793016492784.jpg',
    isMap: true,
  },
  {
    id: 'rev-tool-3',
    title: 'Total cost of ownership: Fuel vs Hybrid running costs in Zambia',
    image: '/src/assets/images/renault_five_electric_1793016492061.jpg',
  },
];

export const CAR_TYPES = [
  { id: 'suvs', name: 'SUVs & 4x4s', count: 'High demand' },
  { id: 'hatchbacks', name: 'Hatchbacks', count: 'Fuel savers' },
  { id: 'saloons', name: 'Saloons / Sedans', count: 'Executive' },
  { id: 'coupes', name: 'Coupes', count: 'Sport' },
  { id: 'estate-cars', name: 'Estate & Wagons', count: 'Utility' },
  { id: 'people-carriers', name: 'People Carriers / MPVs', count: '7-Seaters' },
  { id: 'sports-cars', name: 'Pickups & 4WD', count: 'Workhorses' },
  { id: 'convertibles', name: 'Convertibles', count: 'Lifestyle' },
];

export const CAR_MANUFACTURERS = [
  'Toyota', 'Nissan', 'Ford', 'Isuzu', 'Mitsubishi',
  'Mercedes-Benz', 'BMW', 'Volkswagen', 'Land Rover', 'Audi',
  'Hyundai', 'Kia', 'Honda', 'Subaru', 'Suzuki',
  'Mazda', 'Volvo', 'Jeep', 'Chery', 'Jaecoo',
  'BYD', 'Great Wall (GWM)', 'Changan', 'Peugeot', 'Renault'
];

export const POPULAR_USED_MODELS = [
  'Toyota Hilux GD-6', 'Toyota Land Cruiser Prado', 'Ford Ranger XLT', 'Toyota Fortuner', 'Nissan Navara',
  'Toyota Harrier', 'Toyota RAV4', 'Isuzu D-Max', 'Mitsubishi Pajero', 'Toyota Land Cruiser 79',
  'Toyota Corolla / Vitz', 'Mercedes-Benz C-Class', 'BMW X5', 'Nissan X-Trail', 'Toyota Mark X'
];

export const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'What is AutoAce Zed?',
    answer:
      'AutoAce Zed is a Zambian vehicle sourcing and procurement coordination platform. We are not a traditional car dealership holding inventory; instead, we connect individuals and businesses seeking vehicles with vetted vehicle agents, clearing specialists, and private sellers across Zambia.'
  },
  {
    id: 'faq-2',
    question: 'How does vehicle sourcing work for buyers?',
    answer:
      'Simply describe the car you need—or specify your budget in Zambian Kwacha (ZMW)—along with your preferred location (Lusaka, Ndola, Kitwe, etc.). Our coordination desk matches your request with authorized agents and verified listings, communicating directly with you on WhatsApp.'
  },
  {
    id: 'faq-3',
    question: 'How do I sell my car on AutoAce Zed?',
    answer:
      'Submit your vehicle make, model, year, mileage, condition, asking price in ZMW, and photos. Our coordinators review the submission and share it with pre-qualified buyers and sourcing agents looking for that profile. There are no automated false valuations or upfront listing fees.'
  },
  {
    id: 'faq-4',
    question: 'How can vehicle agents and sourcing partners join?',
    answer:
      'If you are a professional vehicle sourcing agent, import clearing partner, or dealership in Zambia, you can register interest through our "Join as an Agent" flow. Once vetted, you will receive customer sourcing requests matching your operating towns and vehicle specializations.'
  },
  {
    id: 'faq-5',
    question: 'Does AutoAce Zed charge buyers for making a request?',
    answer:
      'No. Submitting a sourcing request or vehicle enquiry on AutoAce Zed is free. You will receive quotes and vehicle options with transparent pricing from participating sourcing partners.'
  }
];
