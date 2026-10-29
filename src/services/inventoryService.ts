import { SHOWROOM_CARS, ShowroomCar } from '../data/showroomData';

const INVENTORY_STORAGE_KEY = 'autoace_inventory_cars_v1';
const BANNERS_STORAGE_KEY = 'autoace_cms_banners_v1';

export interface CmsBanner {
  id: string;
  key: 'top_announcement' | 'fuel_banner' | 'hero_callout';
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  enabled: boolean;
  updatedAt: string;
}

export const DEFAULT_BANNERS: CmsBanner[] = [
  {
    id: 'b-1',
    key: 'top_announcement',
    title: 'Diesel near £2 a litre? Compare electric deals',
    subtitle: 'Save up to 45% in operating costs with hybrid & electric models.',
    ctaText: 'Compare deals',
    ctaLink: '/showroom',
    enabled: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'b-2',
    key: 'fuel_banner',
    title: 'I PITY THE FUEL!',
    subtitle: 'Skip the queues and save thousands with certified high-efficiency pre-owned vehicles and direct sourcing in Zambia.',
    ctaText: 'Browse fuel savers',
    ctaLink: '/showroom',
    enabled: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'b-3',
    key: 'hero_callout',
    title: 'Zambian Direct Import & Local Verified Stock',
    subtitle: 'Transparent valuation, duty estimation, and direct dealer delivery across Lusaka and the Copperbelt.',
    ctaText: 'Explore Showroom',
    ctaLink: '/showroom',
    enabled: true,
    updatedAt: new Date().toISOString(),
  },
];

export function getInventoryCars(): ShowroomCar[] {
  try {
    const raw = localStorage.getItem(INVENTORY_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(SHOWROOM_CARS));
      return SHOWROOM_CARS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return SHOWROOM_CARS;
  } catch {
    return SHOWROOM_CARS;
  }
}

export function saveInventoryCars(cars: ShowroomCar[]): void {
  try {
    localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(cars));
    window.dispatchEvent(new CustomEvent('autoace_inventory_updated', { detail: cars }));
  } catch (err) {
    console.error('Failed to save inventory in localStorage', err);
  }
}

export function addInventoryCar(car: ShowroomCar): ShowroomCar {
  const current = getInventoryCars();
  const updated = [car, ...current];
  saveInventoryCars(updated);
  return car;
}

export function updateInventoryCar(id: string, updates: Partial<ShowroomCar>): ShowroomCar | null {
  const current = getInventoryCars();
  const index = current.findIndex((c) => c.id === id);
  if (index === -1) return null;

  const updatedCar = { ...current[index], ...updates };
  current[index] = updatedCar;
  saveInventoryCars(current);
  return updatedCar;
}

export function deleteInventoryCar(id: string): boolean {
  const current = getInventoryCars();
  const filtered = current.filter((c) => c.id !== id);
  if (filtered.length !== current.length) {
    saveInventoryCars(filtered);
    return true;
  }
  return false;
}

export function getCmsBanners(): CmsBanner[] {
  try {
    const raw = localStorage.getItem(BANNERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(BANNERS_STORAGE_KEY, JSON.stringify(DEFAULT_BANNERS));
      return DEFAULT_BANNERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_BANNERS;
  } catch {
    return DEFAULT_BANNERS;
  }
}

export function updateCmsBanner(id: string, updates: Partial<CmsBanner>): CmsBanner | null {
  const banners = getCmsBanners();
  const index = banners.findIndex((b) => b.id === id);
  if (index === -1) return null;

  const updated = { ...banners[index], ...updates, updatedAt: new Date().toISOString() };
  banners[index] = updated;
  try {
    localStorage.setItem(BANNERS_STORAGE_KEY, JSON.stringify(banners));
    window.dispatchEvent(new CustomEvent('autoace_banners_updated', { detail: banners }));
  } catch (err) {
    console.error('Failed to save banners', err);
  }
  return updated;
}
