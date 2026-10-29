export interface LeadNote {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export type LeadPipelineStage = 'new' | 'contacted' | 'test-drive' | 'negotiation' | 'won' | 'lost';

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
  status: 'Pending Coordinator Review' | 'Dispatched to Sourcing Agents' | 'Contacted' | string;
  pipelineStage?: LeadPipelineStage;
  assignedAgent?: string;
  leadNotes?: LeadNote[];
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
  notes?: string;
  status: 'Pending Inspection' | 'Shared with Verified Agents' | 'Offer Under Review' | string;
  pipelineStage?: LeadPipelineStage;
  assignedAgent?: string;
  leadNotes?: LeadNote[];
}

export interface AgentLead {
  id: string;
  referenceId: string;
  type: 'agent';
  createdAt: string;
  agencyName: string;
  contactPerson: string;
  whatsappNumber: string;
  location?: string;
  operatingTowns: string[];
  specializations: string[];
  experienceYears: string;
  notes?: string;
  status: 'Application Received' | 'Credentials Under Review' | 'Approved Sourcing Partner' | string;
  pipelineStage?: LeadPipelineStage;
  assignedAgent?: string;
  leadNotes?: LeadNote[];
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

export function updateLead(id: string, updates: Partial<AnyLead>): AnyLead | null {
  const current = getStoredLeads();
  const index = current.findIndex((l) => l.id === id);
  if (index === -1) return null;

  const updatedLead = { ...current[index], ...updates };
  current[index] = updatedLead as AnyLead;
  saveLeadsToStorage(current);
  return updatedLead as AnyLead;
}

export function deleteLead(id: string): boolean {
  const current = getStoredLeads();
  const filtered = current.filter((l) => l.id !== id);
  if (filtered.length !== current.length) {
    saveLeadsToStorage(filtered);
    return true;
  }
  return false;
}

export function addLeadNote(id: string, text: string, author: string = 'Admin Coordinator'): LeadNote | null {
  const current = getStoredLeads();
  const index = current.findIndex((l) => l.id === id);
  if (index === -1) return null;

  const newNote: LeadNote = {
    id: `note-${Date.now()}`,
    author,
    text,
    createdAt: new Date().toISOString(),
  };

  const lead = current[index];
  const existingNotes = lead.leadNotes || [];
  current[index] = {
    ...lead,
    leadNotes: [newNote, ...existingNotes],
  } as AnyLead;

  saveLeadsToStorage(current);
  return newNote;
}

export type ManualLeadInput =
  | (Partial<BuyLead> & { type: 'buy'; notes?: string })
  | (Partial<SellLead> & { type: 'sell'; notes?: string })
  | (Partial<AgentLead> & { type: 'agent'; notes?: string });

export function createManualLead(leadData: ManualLeadInput): AnyLead {
  const prefix = leadData.type === 'buy' ? 'BUY' : leadData.type === 'sell' ? 'SELL' : 'AGT';
  const newLead: AnyLead = {
    id: `manual-${Date.now()}`,
    referenceId: generateRef(prefix),
    createdAt: new Date().toISOString(),
    pipelineStage: leadData.pipelineStage || 'new',
    assignedAgent: leadData.assignedAgent || 'Unassigned',
    leadNotes: leadData.notes


      ? [
          {
            id: `note-${Date.now()}`,
            author: 'Admin Intake',
            text: leadData.notes,
            createdAt: new Date().toISOString(),
          },
        ]
      : [],
    ...(leadData as any),
  };

  syncLeadLocally(newLead);
  return newLead;
}
