export interface BuyLead {
  id: string;
  referenceId: string;
  type: 'buy';
  createdAt: string;
  make: string;
  model: string;
  yearRange?: string;
  budgetZMW: string;
  location: string;
  urgency: string;
  customerName: string;
  whatsappNumber: string;
  notes?: string;
  preferredFuel?: string;
  status: 'Pending Coordinator Review' | 'Dispatched to Sourcing Agents' | 'Contacted';
}

export interface SellLead {
  id: string;
  referenceId: string;
  type: 'sell';
  createdAt: string;
  make: string;
  model: string;
  year: string;
  mileage: string;
  transmission: string;
  fuelType: string;
  condition: string;
  askingPriceZMW: string;
  location: string;
  regNumber?: string;
  sellerName: string;
  whatsappNumber: string;
  photosCount: number;
  status: 'Pending Inspection' | 'Shared with Verified Agents' | 'Offer Under Review';
}

export interface AgentLead {
  id: string;
  referenceId: string;
  type: 'agent';
  createdAt: string;
  agencyName: string;
  contactPerson: string;
  whatsappNumber: string;
  operatingTowns: string[];
  specializations: string[];
  experienceYears: string;
  notes?: string;
  status: 'Application Received' | 'Credentials Under Review' | 'Approved Sourcing Partner';
}

export type AnyLead = BuyLead | SellLead | AgentLead;

const STORAGE_KEY = 'autoace_zed_leads_v1';

// Seed initial realistic mock leads if none exist so the coordinator portal has immediate context
const INITIAL_SEED_LEADS: AnyLead[] = [
  {
    id: 'seed-buy-1',
    referenceId: 'AZ-BUY-8921',
    type: 'buy',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    make: 'Toyota',
    model: 'Hilux GD-6 Double Cab',
    yearRange: '2020 - 2023',
    budgetZMW: 'K 680,000',
    location: 'Lusaka (Woodlands)',
    urgency: 'Immediate (Ready to inspect)',
    customerName: 'Chileshe Mwape',
    whatsappNumber: '+260 977 412093',
    preferredFuel: 'Diesel',
    notes: 'Looking for automatic transmission, clean interior, service history required.',
    status: 'Dispatched to Sourcing Agents',
  },
  {
    id: 'seed-sell-1',
    referenceId: 'AZ-SELL-4019',
    type: 'sell',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    make: 'Ford',
    model: 'Ranger 2.2 TDCi XLT',
    year: '2019',
    mileage: '78,400 km',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    condition: 'Excellent',
    askingPriceZMW: 'K 430,000',
    location: 'Ndola (Kansenshi)',
    regNumber: 'BAA 4912 B',
    sellerName: 'Bwalya Tembo',
    whatsappNumber: '+260 966 820155',
    photosCount: 4,
    status: 'Shared with Verified Agents',
  },
  {
    id: 'seed-agent-1',
    referenceId: 'AZ-AGT-1104',
    type: 'agent',
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
    agencyName: 'Apex Motor Sourcing Zambia',
    contactPerson: 'Kondwani Banda',
    whatsappNumber: '+260 955 773190',
    operatingTowns: ['Lusaka', 'Kitwe', 'Ndola'],
    specializations: ['Japan Direct Imports', '4x4 & Commercial Pickups', 'Local Pre-owned'],
    experienceYears: '6+ years',
    notes: 'Registered sourcing business with bonded clearing clearance and inspection capacity.',
    status: 'Approved Sourcing Partner',
  },
];

function getStoredLeads(): AnyLead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_LEADS));
      return INITIAL_SEED_LEADS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SEED_LEADS;
  }
}

function saveLeadsToStorage(leads: AnyLead[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    window.dispatchEvent(new CustomEvent('autoace_leads_updated'));
  } catch (err) {
    console.error('Failed to save lead in localStorage', err);
  }
}

function generateRef(prefix: string): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `AZ-${prefix}-${num}`;
}

export async function submitBuyLead(payload: Omit<BuyLead, 'id' | 'referenceId' | 'createdAt' | 'type' | 'status'>): Promise<BuyLead> {
  const lead: BuyLead = {
    ...payload,
    id: `buy-${Date.now()}`,
    referenceId: generateRef('BUY'),
    type: 'buy',
    createdAt: new Date().toISOString(),
    status: 'Pending Coordinator Review',
  };

  // Attempt backend API call if available
  try {
    const res = await fetch('/api/leads/buy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.lead) {
        syncLeadLocally(data.lead);
        return data.lead;
      }
    }
  } catch {
    // API offline, fallback to client store seamlessly
  }

  syncLeadLocally(lead);
  return lead;
}

export async function submitSellLead(payload: Omit<SellLead, 'id' | 'referenceId' | 'createdAt' | 'type' | 'status'>): Promise<SellLead> {
  const lead: SellLead = {
    ...payload,
    id: `sell-${Date.now()}`,
    referenceId: generateRef('SELL'),
    type: 'sell',
    createdAt: new Date().toISOString(),
    status: 'Pending Inspection',
  };

  try {
    const res = await fetch('/api/leads/sell', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.lead) {
        syncLeadLocally(data.lead);
        return data.lead;
      }
    }
  } catch {
    // API offline fallback
  }

  syncLeadLocally(lead);
  return lead;
}

export async function submitAgentLead(payload: Omit<AgentLead, 'id' | 'referenceId' | 'createdAt' | 'type' | 'status'>): Promise<AgentLead> {
  const lead: AgentLead = {
    ...payload,
    id: `agt-${Date.now()}`,
    referenceId: generateRef('AGT'),
    type: 'agent',
    createdAt: new Date().toISOString(),
    status: 'Application Received',
  };

  try {
    const res = await fetch('/api/leads/agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.lead) {
        syncLeadLocally(data.lead);
        return data.lead;
      }
    }
  } catch {
    // API offline fallback
  }

  syncLeadLocally(lead);
  return lead;
}

function syncLeadLocally(lead: AnyLead) {
  const current = getStoredLeads();
  const updated = [lead, ...current];
  saveLeadsToStorage(updated);
}

export function getAllLeads(): AnyLead[] {
  return getStoredLeads();
}
