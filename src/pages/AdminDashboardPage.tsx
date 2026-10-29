import React, { useState, useEffect, useMemo } from 'react';
import { AutoaceLogo } from '../components/AutoaceLogo';
import {
  getInventoryCars,
  addInventoryCar,
  updateInventoryCar,
  deleteInventoryCar,
  getCmsBanners,
  updateCmsBanner,
  CmsBanner,
} from '../services/inventoryService';
import {
  getAllLeads,
  updateLead,
  deleteLead,
  addLeadNote,
  createManualLead,
  AnyLead,
  LeadPipelineStage,
} from '../services/leadService';
import { ShowroomCar } from '../data/showroomData';
import {
  LayoutDashboard,
  BarChart3,
  Car,
  Users,
  Megaphone,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Edit3,
  Trash2,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  SlidersHorizontal,
  X,
  FileSpreadsheet,
  Building,
  Fuel,
  RefreshCw,
  Send,
  Calendar,
  Sparkles,
  ArrowLeft,
  ChevronDown,
} from 'lucide-react';

interface AdminDashboardPageProps {
  onBackToHome: () => void;
  onNavigateToShowroom?: () => void;
  onNavigateToDeal?: (dealId: string) => void;
}

type AdminTab = 'analytics' | 'cms-inventory' | 'crm-leads' | 'cms-banners';

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onBackToHome,
  onNavigateToShowroom,
  onNavigateToDeal,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('analytics');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'qtd' | 'ytd'>('30d');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Data states
  const [cars, setCars] = useState<ShowroomCar[]>([]);
  const [leads, setLeads] = useState<AnyLead[]>([]);
  const [banners, setBanners] = useState<CmsBanner[]>([]);

  // Search & Filter states
  const [carSearch, setCarSearch] = useState('');
  const [fuelFilter, setFuelFilter] = useState<string>('all');
  const [leadSearch, setLeadSearch] = useState('');
  const [leadTypeFilter, setLeadTypeFilter] = useState<string>('all');
  const [leadStageFilter, setLeadStageFilter] = useState<string>('all');
  const [leadViewMode, setLeadViewMode] = useState<'table' | 'kanban'>('kanban');

  // Modals & Drawers
  const [isCarModalOpen, setIsCarModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<ShowroomCar | null>(null);
  const [selectedLead, setSelectedLead] = useState<AnyLead | null>(null);
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [chartHoverIndex, setChartHoverIndex] = useState<number | null>(null);

  // New Car Form State
  const [carFormData, setCarFormData] = useState<Partial<ShowroomCar>>({
    name: '',
    make: 'Audi',
    model: '',
    trim: '',
    bodyStyle: 'Hatchback',
    fuelType: 'Petrol',
    gearbox: 'Automatic',
    engineSize: '1.5 litre',
    year: 2026,
    mileageKm: 12000,
    priceZMW: 240000,
    monthlyZMW: 4900,
    location: 'Lusaka (Woodlands)',
    dealer: 'Autoace Verified Direct',
    isTopRated: true,
    isAd: false,
    condition: 'Used',
    images: ['/src/assets/images/hero_green_audi_hatchback_1793016489379.jpg'],
    features: ['Android Auto', 'Apple CarPlay', 'Cruise Control', 'Parking Sensors'],
    lifestyleTags: ['in-stock', 'city'],
    fullDescription: 'High specification executive hatchback in pristine condition with complete service documentation.',
  });

  // Manual Lead Form State
  const [manualLeadData, setManualLeadData] = useState({
    type: 'buy' as 'buy' | 'sell',
    customerName: '',
    whatsappNumber: '',
    make: '',
    model: '',
    budgetZMW: '',
    location: 'Lusaka',
    notes: '',
  });

  // Load and subscribe to data
  const refreshAllData = () => {
    setCars(getInventoryCars());
    setLeads(getAllLeads());
    setBanners(getCmsBanners());
  };

  useEffect(() => {
    refreshAllData();

    const handleInventoryChange = () => setCars(getInventoryCars());
    const handleLeadsChange = () => setLeads(getAllLeads());
    const handleBannersChange = () => setBanners(getCmsBanners());

    window.addEventListener('autoace_inventory_updated', handleInventoryChange);
    window.addEventListener('autoace_leads_updated', handleLeadsChange);
    window.addEventListener('autoace_banners_updated', handleBannersChange);

    return () => {
      window.removeEventListener('autoace_inventory_updated', handleInventoryChange);
      window.removeEventListener('autoace_leads_updated', handleLeadsChange);
      window.removeEventListener('autoace_banners_updated', handleBannersChange);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Metrics Calculations
  const metrics = useMemo(() => {
    const totalInventoryValue = cars.reduce((acc, c) => acc + (c.priceZMW || 0), 0);
    const avgCarPrice = cars.length > 0 ? Math.round(totalInventoryValue / cars.length) : 0;
    const totalLeadsCount = leads.length;
    const buyLeadsCount = leads.filter((l) => l.type === 'buy').length;
    const sellLeadsCount = leads.filter((l) => l.type === 'sell').length;
    const closedWonCount = leads.filter((l) => (l as any).pipelineStage === 'won').length;
    const conversionRate = totalLeadsCount > 0 ? ((closedWonCount / totalLeadsCount) * 100).toFixed(1) : '34.8';

    const petrolCount = cars.filter((c) => c.fuelType === 'Petrol').length;
    const dieselCount = cars.filter((c) => c.fuelType === 'Diesel').length;
    const hybridCount = cars.filter((c) => c.fuelType === 'Hybrid').length;
    const electricCount = cars.filter((c) => c.fuelType === 'Electric').length;

    return {
      totalInventoryValue,
      avgCarPrice,
      totalCars: cars.length,
      totalLeadsCount,
      buyLeadsCount,
      sellLeadsCount,
      closedWonCount,
      conversionRate,
      petrolCount,
      dieselCount,
      hybridCount,
      electricCount,
    };
  }, [cars, leads]);

  // Chart data for weekly volume trends
  const trendData = useMemo(() => {
    return [
      { day: 'Mon', leads: 8, deals: 3, views: 240 },
      { day: 'Tue', leads: 14, deals: 5, views: 420 },
      { day: 'Wed', leads: 11, deals: 4, views: 380 },
      { day: 'Thu', leads: 19, deals: 7, views: 560 },
      { day: 'Fri', leads: 24, deals: 9, views: 710 },
      { day: 'Sat', leads: 29, deals: 12, views: 980 },
      { day: 'Sun', leads: 22, deals: 8, views: 820 },
    ];
  }, []);

  // Filtered Cars
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const q = carSearch.toLowerCase().trim();
      const matchSearch =
        !q ||
        car.name.toLowerCase().includes(q) ||
        car.make.toLowerCase().includes(q) ||
        car.model.toLowerCase().includes(q) ||
        car.location.toLowerCase().includes(q) ||
        (car.trim && car.trim.toLowerCase().includes(q));

      const matchFuel = fuelFilter === 'all' || car.fuelType.toLowerCase() === fuelFilter.toLowerCase();
      return matchSearch && matchFuel;
    });
  }, [cars, carSearch, fuelFilter]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const q = leadSearch.toLowerCase().trim();
      const name =
        lead.type === 'buy' ? lead.customerName : lead.type === 'sell' ? lead.sellerName : lead.contactPerson;
      const ref = lead.referenceId || '';
      const phone = lead.whatsappNumber || '';
      const model = (lead as any).model || (lead as any).agencyName || '';

      const matchSearch =
        !q ||
        name.toLowerCase().includes(q) ||
        ref.toLowerCase().includes(q) ||
        phone.includes(q) ||
        model.toLowerCase().includes(q);

      const matchType = leadTypeFilter === 'all' || lead.type === leadTypeFilter;
      const leadStage = lead.pipelineStage || 'new';
      const matchStage = leadStageFilter === 'all' || leadStage === leadStageFilter;

      return matchSearch && matchType && matchStage;
    });
  }, [leads, leadSearch, leadTypeFilter, leadStageFilter]);

  // Handlers for Cars CMS
  const handleOpenAddCar = () => {
    setEditingCar(null);
    setCarFormData({
      id: `car-${Date.now()}`,
      name: '',
      make: 'Audi',
      model: '',
      trim: 'Sport',
      bodyStyle: 'Hatchback',
      fuelType: 'Petrol',
      gearbox: 'Automatic',
      engineSize: '1.5 litre',
      year: 2026,
      mileageKm: 15000,
      priceZMW: 245000,
      monthlyZMW: 4950,
      location: 'Lusaka (Woodlands)',
      dealer: 'Autoace Verified Direct',
      isTopRated: true,
      isAd: false,
      condition: 'Used',
      images: ['/src/assets/images/hero_green_audi_hatchback_1793016489379.jpg'],
      features: ['Touchscreen Navigation', 'Apple CarPlay', 'Cruise Control', 'Warranty'],
      lifestyleTags: ['in-stock', 'city'],
      fullDescription: 'Certified multi-point inspected vehicle, clean title, verified odometer.',
    });
    setIsCarModalOpen(true);
  };

  const handleOpenEditCar = (car: ShowroomCar) => {
    setEditingCar(car);
    setCarFormData({ ...car });
    setIsCarModalOpen(true);
  };

  const handleSaveCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!carFormData.name || !carFormData.make || !carFormData.priceZMW) {
      alert('Please fill out the vehicle title, make, and price.');
      return;
    }

    if (editingCar) {
      updateInventoryCar(editingCar.id, carFormData as ShowroomCar);
      showToast(`Updated "${carFormData.name}" in inventory.`);
    } else {
      const newCar: ShowroomCar = {
        ...(carFormData as ShowroomCar),
        id: carFormData.id || `autoace-${Date.now()}`,
        images: carFormData.images && carFormData.images.length > 0
          ? carFormData.images
          : ['/src/assets/images/hero_green_audi_hatchback_1793016489379.jpg'],
      };
      addInventoryCar(newCar);
      showToast(`Added "${newCar.name}" to inventory.`);
    }
    setIsCarModalOpen(false);
  };

  const handleDeleteCar = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from inventory?`)) {
      deleteInventoryCar(id);
      showToast(`Removed "${name}" from inventory.`);
    }
  };

  // Handlers for Leads CRM
  const handleUpdateLeadStage = (leadId: string, newStage: LeadPipelineStage) => {
    const stageNames: Record<LeadPipelineStage, string> = {
      new: 'New / Pending Review',
      contacted: 'Contacted',
      'test-drive': 'Test Drive / Inspection',
      negotiation: 'Offer Under Review',
      won: 'Deal Won / Completed',
      lost: 'Closed / Lost',
    };
    updateLead(leadId, {
      pipelineStage: newStage,
      status: stageNames[newStage] || newStage,
    });
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead((prev) => (prev ? { ...prev, pipelineStage: newStage } : null));
    }
    showToast(`Lead moved to ${stageNames[newStage]}.`);
  };

  const handleAddNoteToSelectedLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNoteText.trim()) return;
    addLeadNote(selectedLead.id, newNoteText.trim(), 'Admin Coordinator');
    setNewNoteText('');
    const updated = getAllLeads().find((l) => l.id === selectedLead.id);
    if (updated) setSelectedLead(updated);
    showToast('Activity note saved to lead timeline.');
  };

  const handleCreateManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualLeadData.customerName || !manualLeadData.whatsappNumber) {
      alert('Customer Name and WhatsApp Phone are required.');
      return;
    }

    if (manualLeadData.type === 'buy') {
      createManualLead({
        type: 'buy',
        customerName: manualLeadData.customerName,
        whatsappNumber: manualLeadData.whatsappNumber,
        make: manualLeadData.make || 'Toyota',
        model: manualLeadData.model || 'Hilux',
        budgetZMW: manualLeadData.budgetZMW || 'K 350,000',
        location: manualLeadData.location,
        urgency: 'Medium',
        status: 'Contacted',
        pipelineStage: 'contacted',
        notes: manualLeadData.notes || 'Direct walk-in inquiry',
      });
    } else {
      createManualLead({
        type: 'sell',
        sellerName: manualLeadData.customerName,
        whatsappNumber: manualLeadData.whatsappNumber,
        make: manualLeadData.make || 'Toyota',
        model: manualLeadData.model || 'Prado',
        askingPriceZMW: manualLeadData.budgetZMW || 'K 400,000',
        location: manualLeadData.location,
        year: '2020',
        mileage: '65,000 km',
        transmission: 'Automatic',
        fuelType: 'Diesel',
        condition: 'Good',
        photosCount: 0,
        status: 'Pending Inspection',
        pipelineStage: 'new',
        notes: manualLeadData.notes || 'In-store appraisal evaluation',
      });
    }

    setIsNewLeadModalOpen(false);
    setManualLeadData({
      type: 'buy',
      customerName: '',
      whatsappNumber: '',
      make: '',
      model: '',
      budgetZMW: '',
      location: 'Lusaka',
      notes: '',
    });
    showToast('New lead successfully created.');
  };

  const handleDeleteLead = (id: string) => {
    if (window.confirm('Delete this customer enquiry record?')) {
      deleteLead(id);
      if (selectedLead?.id === id) setSelectedLead(null);
      showToast('Lead record deleted.');
    }
  };

  // CSV Export
  const exportAnalyticsCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Metric,Value\n' +
      `Total Inventory Value (ZMW),${metrics.totalInventoryValue}\n` +
      `Total Vehicles In Stock,${metrics.totalCars}\n` +
      `Average Vehicle Price (ZMW),${metrics.avgCarPrice}\n` +
      `Total Inbound Leads,${metrics.totalLeadsCount}\n` +
      `Buyer Enquiries,${metrics.buyLeadsCount}\n` +
      `Valuation / Sell Requests,${metrics.sellLeadsCount}\n` +
      `Deals Completed,${metrics.closedWonCount}\n` +
      `Conversion Rate,${metrics.conversionRate}%\n` +
      `Petrol Units,${metrics.petrolCount}\n` +
      `Diesel Units,${metrics.dieselCount}\n` +
      `Hybrid Units,${metrics.hybridCount}\n` +
      `Electric Units,${metrics.electricCount}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Autoace_Zed_Analytics_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Analytics summary exported as CSV.');
  };

  const exportLeadsCSV = () => {
    const headers = 'ReferenceID,Type,CustomerName,Phone,Vehicle,BudgetOrPrice,Location,Stage,CreatedAt\n';
    const rows = leads
      .map((l) => {
        const name = l.type === 'buy' ? l.customerName : l.type === 'sell' ? l.sellerName : l.contactPerson;
        const vehicle =
          l.type === 'agent'
            ? l.agencyName
            : `${(l as any).make || ''} ${(l as any).model || ''}`.trim();
        const price = l.type === 'buy' ? l.budgetZMW : l.type === 'sell' ? l.askingPriceZMW : 'N/A';
        const stage = l.pipelineStage || 'new';
        return `"${l.referenceId}","${l.type}","${name}","${l.whatsappNumber}","${vehicle}","${price}","${l.location || ''}","${stage}","${l.createdAt}"`;
      })
      .join('\n');

    const csvContent = 'data:text/csv;charset=utf-8,' + headers + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Autoace_Zed_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Leads database exported as CSV.');
  };

  const pipelineStages: { id: LeadPipelineStage; label: string; color: string }[] = [
    { id: 'new', label: 'New / Inbound', color: 'border-blue-500/60 bg-blue-500/10 text-blue-400' },
    { id: 'contacted', label: 'Contacted', color: 'border-yellow-500/60 bg-yellow-500/10 text-yellow-400' },
    { id: 'test-drive', label: 'Inspection / Test Drive', color: 'border-purple-500/60 bg-purple-500/10 text-purple-400' },
    { id: 'negotiation', label: 'Offer Under Review', color: 'border-amber-500/60 bg-amber-500/10 text-amber-400' },
    { id: 'won', label: 'Deal Won / Closed', color: 'border-emerald-500/60 bg-emerald-500/10 text-emerald-400' },
    { id: 'lost', label: 'Closed / Lost', color: 'border-neutral-500/60 bg-neutral-500/10 text-neutral-400' },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0e] text-neutral-100 font-sans flex flex-col selection:bg-[#8574ff] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1e1e24] border border-[#8574ff]/50 text-white px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 text-[#8574ff]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Contract (1 row, 3 zones, gap-8) */}
      <header className="bg-[#111113] border-b border-neutral-800 sticky top-0 z-40">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-8">
            {/* Zone 1: Brand & Breadcrumb */}
            <div className="flex items-center gap-4 shrink-0">
              <button
                type="button"
                onClick={onBackToHome}
                className="hover:opacity-90 transition-opacity cursor-pointer flex items-center"
                title="Return to Autoace Public Home"
              >
                <AutoaceLogo
                  className="w-[120px] h-9 object-contain"
                  variant="dark-mode"
                  style={{ width: '120px', height: '36px', objectFit: 'contain' }}
                />
              </button>
              <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400 border-l border-neutral-800 pl-4">
                <span>Admin Operations</span>
                <span aria-hidden="true">/</span>
                <span className="text-neutral-200 capitalize font-medium">
                  {activeTab.replace('-', ' ')}
                </span>
              </div>
            </div>

            {/* Zone 2: Navigation Tabs (Segmented Controls) */}
            <nav className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-lg overflow-x-auto max-w-full">
              <button
                type="button"
                onClick={() => setActiveTab('analytics')}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'analytics'
                    ? 'bg-[#8574ff] text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Analytics</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('cms-inventory')}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'cms-inventory'
                    ? 'bg-[#8574ff] text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                <span>Inventory CMS ({cars.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('crm-leads')}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'crm-leads'
                    ? 'bg-[#8574ff] text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Leads CRM ({leads.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('cms-banners')}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'cms-banners'
                    ? 'bg-[#8574ff] text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <Megaphone className="w-3.5 h-3.5" />
                <span>Banners & Content</span>
              </button>
            </nav>

            {/* Zone 3: Storefront Exit Action */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onBackToHome}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white border border-neutral-700 hover:border-neutral-500 rounded-lg transition-colors cursor-pointer"
                title="View Public Storefront"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Back to Storefront</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace Viewport */}
      <main className="flex-1 max-w-[1520px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ========================================================================= */}
        {/* TAB 1: ANALYTICS                                                         */}
        {/* ========================================================================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Executive Analytics & Performance
                </h1>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Real-time sales velocity, inquiry throughput, inventory valuation, and regional Zambian demand.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Time Range Selector */}
                <div className="flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-medium">
                  {(['7d', '30d', 'qtd', 'ytd'] as const).map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1 rounded-md transition-colors uppercase ${
                        timeRange === range
                          ? 'bg-neutral-800 text-white font-semibold shadow-xs'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>

                {/* CSV Export Button */}
                <button
                  type="button"
                  onClick={exportAnalyticsCSV}
                  className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* KPI Stat Cards (4 columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#141417] border border-neutral-800/80 rounded-xl p-5">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>Gross Inventory Valuation</span>
                  <span className="flex items-center text-emerald-400 font-mono text-[11px] font-medium">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +14.2%
                  </span>
                </div>
                <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-white">
                  K {metrics.totalInventoryValue.toLocaleString()}
                </div>
                <div className="mt-2 text-[11px] text-neutral-500">
                  {metrics.totalCars} units active · Avg K {metrics.avgCarPrice.toLocaleString()} / unit
                </div>
              </div>

              <div className="bg-[#141417] border border-neutral-800/80 rounded-xl p-5">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>Inbound Leads & Enquiries</span>
                  <span className="flex items-center text-emerald-400 font-mono text-[11px] font-medium">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +18.4%
                  </span>
                </div>
                <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-white">
                  {metrics.totalLeadsCount} Leads
                </div>
                <div className="mt-2 text-[11px] text-neutral-500">
                  {metrics.buyLeadsCount} Buyer requests · {metrics.sellLeadsCount} Seller valuations
                </div>
              </div>

              <div className="bg-[#141417] border border-neutral-800/80 rounded-xl p-5">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>Showroom Conversion SLA</span>
                  <span className="flex items-center text-emerald-400 font-mono text-[11px] font-medium">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +3.2%
                  </span>
                </div>
                <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-white">
                  {metrics.conversionRate}%
                </div>
                <div className="mt-2 text-[11px] text-neutral-500">
                  {metrics.closedWonCount} Deals concluded · Avg 18m response time
                </div>
              </div>

              <div className="bg-[#141417] border border-neutral-800/80 rounded-xl p-5">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>Avg Velocity On Lot</span>
                  <span className="flex items-center text-emerald-400 font-mono text-[11px] font-medium">
                    <ArrowDownRight className="w-3.5 h-3.5" /> -4.1 days
                  </span>
                </div>
                <div className="mt-2 text-2xl font-bold font-mono tabular-nums text-white">
                  14.2 Days
                </div>
                <div className="mt-2 text-[11px] text-neutral-500">
                  Top velocity: 4x4 Pickups & Compact Hatchbacks
                </div>
              </div>
            </div>

            {/* Visual Charts Grid (2 columns) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Area / Bar Chart: Weekly Inbound Leads & Closed Deals */}
              <div className="lg:col-span-2 bg-[#141417] border border-neutral-800/80 rounded-xl p-5 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-sm font-semibold text-white">Weekly Inbound Throughput vs Closed Deals</h2>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Daily customer lead generation volume across WhatsApp and Web inquiries.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1.5 text-neutral-300">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#8574ff]"></span> Leads
                    </span>
                    <span className="flex items-center gap-1.5 text-neutral-300">
                      <span className="w-2.5 h-2.5 rounded-xs bg-emerald-400"></span> Deals Won
                    </span>
                  </div>
                </div>

                {/* SVG Trend Chart */}
                <div className="relative w-full h-56 pt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200">
                    <defs>
                      <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8574ff" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#8574ff" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid lines */}
                    {[0, 50, 100, 150].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        y1={y}
                        x2="600"
                        y2={y}
                        stroke="#26262b"
                        strokeDasharray="4 4"
                        strokeWidth="1"
                      />
                    ))}

                    {/* Area path for Leads */}
                    <path
                      d="M 20 160 Q 100 120, 180 140 T 360 80 T 480 30 T 580 60 L 580 190 L 20 190 Z"
                      fill="url(#purpleGrad)"
                    />

                    {/* Line for Leads */}
                    <path
                      d="M 20 160 Q 100 120, 180 140 T 360 80 T 480 30 T 580 60"
                      fill="none"
                      stroke="#8574ff"
                      strokeWidth="2.5"
                    />

                    {/* Line for Deals Won */}
                    <path
                      d="M 20 180 Q 100 165, 180 170 T 360 140 T 480 110 T 580 130"
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="2"
                    />

                    {/* Interactive points */}
                    {trendData.map((d, i) => {
                      const x = 30 + i * 90;
                      const yLead = 180 - d.leads * 5;
                      const yDeal = 180 - d.deals * 6;
                      const isHovered = chartHoverIndex === i;

                      return (
                        <g
                          key={d.day}
                          className="cursor-pointer"
                          onMouseEnter={() => setChartHoverIndex(i)}
                          onMouseLeave={() => setChartHoverIndex(null)}
                        >
                          <circle
                            cx={x}
                            cy={yLead}
                            r={isHovered ? 6 : 4}
                            fill="#8574ff"
                            stroke="#0d0d0e"
                            strokeWidth="2"
                          />
                          <circle
                            cx={x}
                            cy={yDeal}
                            r={isHovered ? 5 : 3}
                            fill="#34d399"
                            stroke="#0d0d0e"
                            strokeWidth="2"
                          />
                          <text
                            x={x}
                            y="198"
                            textAnchor="middle"
                            fill="#a3a3a3"
                            fontSize="11"
                            fontFamily="monospace"
                          >
                            {d.day}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Tooltip on hover */}
                  {chartHoverIndex !== null && (
                    <div
                      className="absolute top-2 left-1/2 -translate-x-1/2 bg-neutral-900 border border-neutral-700 px-3 py-1.5 rounded-md text-xs shadow-lg flex items-center gap-3 pointer-events-none"
                    >
                      <span className="font-semibold text-white">{trendData[chartHoverIndex].day}:</span>
                      <span className="text-[#8574ff] font-mono tabular-nums">{trendData[chartHoverIndex].leads} Inbound Leads</span>
                      <span className="text-emerald-400 font-mono tabular-nums">{trendData[chartHoverIndex].deals} Deals Concluded</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Fuel & Powertrain Mix Breakdown */}
              <div className="bg-[#141417] border border-neutral-800/80 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-white">Inventory Powertrain Share</h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Live breakdown of available showroom stock by fuel architecture.
                  </p>

                  <div className="mt-5 space-y-3.5">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-neutral-300 font-medium">Petrol / ICE</span>
                        <span className="font-mono tabular-nums text-neutral-400">
                          {metrics.petrolCount} units ({Math.round((metrics.petrolCount / (metrics.totalCars || 1)) * 100)}%)
                        </span>
                      </div>
                      <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{
                            width: `${(metrics.petrolCount / (metrics.totalCars || 1)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-neutral-300 font-medium">Diesel (4x4 & Haulers)</span>
                        <span className="font-mono tabular-nums text-neutral-400">
                          {metrics.dieselCount} units ({Math.round((metrics.dieselCount / (metrics.totalCars || 1)) * 100)}%)
                        </span>
                      </div>
                      <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{
                            width: `${(metrics.dieselCount / (metrics.totalCars || 1)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-neutral-300 font-medium">Self-Charging Hybrid</span>
                        <span className="font-mono tabular-nums text-neutral-400">
                          {metrics.hybridCount} units ({Math.round((metrics.hybridCount / (metrics.totalCars || 1)) * 100)}%)
                        </span>
                      </div>
                      <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{
                            width: `${(metrics.hybridCount / (metrics.totalCars || 1)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-neutral-300 font-medium">Full Electric (EV)</span>
                        <span className="font-mono tabular-nums text-neutral-400">
                          {metrics.electricCount} units ({Math.round((metrics.electricCount / (metrics.totalCars || 1)) * 100)}%)
                        </span>
                      </div>
                      <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#8574ff] rounded-full"
                          style={{
                            width: `${(metrics.electricCount / (metrics.totalCars || 1)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-400 flex items-center justify-between">
                  <span>Fastest turning segment:</span>
                  <span className="text-white font-medium">Diesel 4x4 Double Cabs (9 days)</span>
                </div>
              </div>
            </div>

            {/* Regional Demand & Top Fast-Moving Models */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Regional Demand Distribution */}
              <div className="bg-[#141417] border border-neutral-800/80 rounded-xl p-5">
                <h2 className="text-sm font-semibold text-white mb-1">Regional Zambian Customer Inquiries</h2>
                <p className="text-xs text-neutral-400 mb-4">
                  Breakdown by customer inspection and dispatch zones.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
                    <div className="text-xs text-neutral-400">Lusaka Metro</div>
                    <div className="text-lg font-bold font-mono text-white mt-1">62% of volume</div>
                    <div className="text-[11px] text-neutral-500 mt-1">Woodlands, Roma, Industrial Area</div>
                  </div>

                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
                    <div className="text-xs text-neutral-400">Copperbelt Hub</div>
                    <div className="text-lg font-bold font-mono text-white mt-1">24% of volume</div>
                    <div className="text-[11px] text-neutral-500 mt-1">Ndola, Kitwe, Luanshya</div>
                  </div>

                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
                    <div className="text-xs text-neutral-400">Southern Province</div>
                    <div className="text-lg font-bold font-mono text-white mt-1">9% of volume</div>
                    <div className="text-[11px] text-neutral-500 mt-1">Livingstone, Mazabuka, Choma</div>
                  </div>

                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
                    <div className="text-xs text-neutral-400">Mining & Frontier</div>
                    <div className="text-lg font-bold font-mono text-white mt-1">5% of volume</div>
                    <div className="text-[11px] text-neutral-500 mt-1">Solwezi, Kasama, Chipata</div>
                  </div>
                </div>
              </div>

              {/* Fast-Moving Leaderboard */}
              <div className="bg-[#141417] border border-neutral-800/80 rounded-xl p-5">
                <h2 className="text-sm font-semibold text-white mb-1">Top Inquired Showroom Vehicles</h2>
                <p className="text-xs text-neutral-400 mb-4">
                  Ranked by test drive inquiries and view counts.
                </p>

                <div className="divide-y divide-neutral-800/80">
                  {cars.slice(0, 4).map((car, idx) => (
                    <div key={car.id} className="py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-5 text-xs font-mono font-bold text-neutral-500">0{idx + 1}</span>
                        <div>
                          <div className="text-xs font-semibold text-white">{car.name}</div>
                          <div className="text-[11px] text-neutral-400">
                            {car.year} · {car.fuelType} · {car.location}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold font-mono text-white">K {car.priceZMW.toLocaleString()}</div>
                        <div className="text-[10px] text-emerald-400 font-mono">High Demand</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: INVENTORY CMS                                                     */}
        {/* ========================================================================= */}
        {activeTab === 'cms-inventory' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-neutral-800">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Vehicle Inventory Management
                </h1>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Live fleet catalog synced directly to the public Showroom and Car Detail viewports.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleOpenAddCar}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#8574ff] hover:bg-[#7260f5] rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Vehicle</span>
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 bg-[#141417] border border-neutral-800 rounded-xl">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search by make, model, trim, location..."
                  value={carSearch}
                  onChange={(e) => setCarSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-hidden focus:border-[#8574ff]"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400 whitespace-nowrap">Fuel:</span>
                <select
                  value={fuelFilter}
                  onChange={(e) => setFuelFilter(e.target.value)}
                  className="px-2.5 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-200 focus:outline-hidden"
                >
                  <option value="all">All Powertrains</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="electric">Electric</option>
                </select>
                <span className="text-xs text-neutral-500 font-mono tabular-nums pl-2">
                  Showing {filteredCars.length} of {cars.length}
                </span>
              </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-[#141417] border border-neutral-800 rounded-xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-neutral-300">
                  <thead className="bg-neutral-900/90 text-neutral-400 border-b border-neutral-800 text-[11px] font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Vehicle</th>
                      <th className="py-3 px-3">Specs</th>
                      <th className="py-3 px-3">Location</th>
                      <th className="py-3 px-3 text-right">Cash Price</th>
                      <th className="py-3 px-3 text-right">Monthly</th>
                      <th className="py-3 px-3 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80">
                    {filteredCars.map((car) => (
                      <tr key={car.id} className="hover:bg-neutral-900/40 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={car.images?.[0] || '/src/assets/images/hero_green_audi_hatchback_1793016489379.jpg'}
                              alt={car.name}
                              className="w-12 h-9 object-cover rounded-md border border-neutral-800 shrink-0"
                            />
                            <div>
                              <div className="font-semibold text-white hover:text-[#8574ff] cursor-pointer">
                                {car.name}
                              </div>
                              <div className="text-[11px] text-neutral-500 font-mono">
                                {car.make} · {car.trim}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <div className="text-neutral-200">
                            {car.year} · {car.fuelType}
                          </div>
                          <div className="text-[11px] text-neutral-500 font-mono tabular-nums">
                            {car.mileageKm.toLocaleString()} km · {car.gearbox}
                          </div>
                        </td>

                        <td className="py-3 px-3 text-neutral-300">
                          <div>{car.location}</div>
                          <div className="text-[11px] text-neutral-500">{car.dealer}</div>
                        </td>

                        <td className="py-3 px-3 text-right font-mono font-bold text-white tabular-nums">
                          K {car.priceZMW.toLocaleString()}
                        </td>

                        <td className="py-3 px-3 text-right font-mono text-neutral-400 tabular-nums">
                          K {car.monthlyZMW.toLocaleString()} / mo
                        </td>

                        <td className="py-3 px-3 text-center">
                          <button
                            type="button"
                            onClick={() => {
                              const newTopRated = !car.isTopRated;
                              updateInventoryCar(car.id, { isTopRated: newTopRated });
                              showToast(`Updated "${car.name}" status.`);
                            }}
                            className={`px-2 py-0.5 text-[11px] font-medium rounded-md cursor-pointer transition-colors ${
                              car.isTopRated
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                            }`}
                            title="Click to toggle Top Rated badge"
                          >
                            {car.isTopRated ? 'Top Rated' : 'Standard'}
                          </button>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {onNavigateToDeal && (
                              <button
                                type="button"
                                onClick={() => onNavigateToDeal(car.id)}
                                className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors cursor-pointer"
                                title="Preview Public Page"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleOpenEditCar(car)}
                              className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors cursor-pointer"
                              title="Edit Vehicle"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCar(car.id, car.name)}
                              className="p-1.5 text-rose-400/80 hover:text-rose-400 rounded hover:bg-rose-500/10 transition-colors cursor-pointer"
                              title="Delete from Inventory"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: LEADS & CRM                                                       */}
        {/* ========================================================================= */}
        {activeTab === 'crm-leads' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-neutral-800">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Customer Relationship Management (CRM)
                </h1>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Manage buyer requests, valuation submissions, and dealer partner applications.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* View Mode Toggle */}
                <div className="flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-lg text-xs">
                  <button
                    type="button"
                    onClick={() => setLeadViewMode('kanban')}
                    className={`px-3 py-1 rounded-md font-medium transition-colors ${
                      leadViewMode === 'kanban' ? 'bg-[#8574ff] text-white shadow-xs' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Pipeline Kanban
                  </button>
                  <button
                    type="button"
                    onClick={() => setLeadViewMode('table')}
                    className={`px-3 py-1 rounded-md font-medium transition-colors ${
                      leadViewMode === 'table' ? 'bg-[#8574ff] text-white shadow-xs' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    List Table
                  </button>
                </div>

                <button
                  type="button"
                  onClick={exportLeadsCSV}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 border border-neutral-700 rounded-lg transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsNewLeadModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#8574ff] hover:bg-[#7260f5] rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Lead</span>
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 bg-[#141417] border border-neutral-800 rounded-xl">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search customer name, phone (+260...), reference ID, or vehicle..."
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-hidden focus:border-[#8574ff]"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={leadTypeFilter}
                  onChange={(e) => setLeadTypeFilter(e.target.value)}
                  className="px-2.5 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-200 focus:outline-hidden"
                >
                  <option value="all">All Request Types</option>
                  <option value="buy">Buyer Enquiries</option>
                  <option value="sell">Valuation Submissions</option>
                  <option value="agent">Dealer / Agent</option>
                </select>

                <select
                  value={leadStageFilter}
                  onChange={(e) => setLeadStageFilter(e.target.value)}
                  className="px-2.5 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-200 focus:outline-hidden"
                >
                  <option value="all">All Stages</option>
                  {pipelineStages.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* KANBAN VIEW */}
            {leadViewMode === 'kanban' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 pt-1 overflow-x-auto">
                {pipelineStages.map((stage) => {
                  const stageLeads = filteredLeads.filter(
                    (l) => (l.pipelineStage || 'new') === stage.id
                  );

                  return (
                    <div
                      key={stage.id}
                      className="bg-[#141417] border border-neutral-800/90 rounded-xl p-3 flex flex-col min-h-[500px]"
                    >
                      {/* Column Header */}
                      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-neutral-800 text-xs font-semibold text-neutral-300">
                        <span className="truncate pr-1">{stage.label}</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-neutral-800 text-neutral-400">
                          {stageLeads.length}
                        </span>
                      </div>

                      {/* Lead Cards in Stage */}
                      <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[650px] pr-0.5">
                        {stageLeads.map((lead) => {
                          const customerName =
                            lead.type === 'buy'
                              ? lead.customerName
                              : lead.type === 'sell'
                              ? lead.sellerName
                              : lead.contactPerson;
                          const vehicle =
                            lead.type === 'agent'
                              ? lead.agencyName
                              : `${(lead as any).make || ''} ${(lead as any).model || ''}`;

                          return (
                            <div
                              key={lead.id}
                              onClick={() => setSelectedLead(lead)}
                              className="p-3 bg-neutral-900/90 hover:bg-neutral-800/80 border border-neutral-800 hover:border-neutral-700 rounded-lg transition-all cursor-pointer group shadow-2xs"
                            >
                              <div className="flex items-center justify-between text-[11px] mb-1">
                                <span className="font-mono text-neutral-400 font-semibold">{lead.referenceId}</span>
                                <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-400">
                                  {lead.type}
                                </span>
                              </div>

                              <div className="font-semibold text-xs text-white group-hover:text-[#8574ff] transition-colors">
                                {customerName}
                              </div>

                              <div className="text-[11px] text-neutral-400 truncate mt-0.5">
                                {vehicle}
                              </div>

                              <div className="mt-2 pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                                <span>{lead.location || 'Lusaka'}</span>
                                <span className="text-[#8574ff]">{lead.whatsappNumber}</span>
                              </div>
                            </div>
                          );
                        })}

                        {stageLeads.length === 0 && (
                          <div className="h-28 flex items-center justify-center text-[11px] text-neutral-600 border border-dashed border-neutral-800 rounded-lg">
                            No deals in stage
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* TABLE VIEW */}
            {leadViewMode === 'table' && (
              <div className="bg-[#141417] border border-neutral-800 rounded-xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-neutral-300">
                    <thead className="bg-neutral-900/90 text-neutral-400 border-b border-neutral-800 text-[11px] font-semibold uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Ref ID</th>
                        <th className="py-3 px-3">Type</th>
                        <th className="py-3 px-3">Customer Name</th>
                        <th className="py-3 px-3">Contact (WhatsApp)</th>
                        <th className="py-3 px-3">Vehicle Details</th>
                        <th className="py-3 px-3">Stage</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/80">
                      {filteredLeads.map((lead) => {
                        const customerName =
                          lead.type === 'buy'
                            ? lead.customerName
                            : lead.type === 'sell'
                            ? lead.sellerName
                            : lead.contactPerson;
                        const vehicle =
                          lead.type === 'agent'
                            ? lead.agencyName
                            : `${(lead as any).make || ''} ${(lead as any).model || ''}`;
                        const stage = lead.pipelineStage || 'new';

                        return (
                          <tr key={lead.id} className="hover:bg-neutral-900/40 transition-colors">
                            <td className="py-3 px-4 font-mono font-semibold text-neutral-400">
                              {lead.referenceId}
                            </td>

                            <td className="py-3 px-3">
                              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">
                                {lead.type}
                              </span>
                            </td>

                            <td className="py-3 px-3 font-semibold text-white">
                              {customerName}
                            </td>

                            <td className="py-3 px-3 font-mono text-neutral-400">
                              <a
                                href={`https://wa.me/${lead.whatsappNumber.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-emerald-400 flex items-center gap-1"
                              >
                                <span>{lead.whatsappNumber}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </td>

                            <td className="py-3 px-3 text-neutral-300">
                              <div>{vehicle}</div>
                              <div className="text-[10px] text-neutral-500 font-mono">
                                {lead.type === 'buy' ? lead.budgetZMW : lead.type === 'sell' ? lead.askingPriceZMW : ''}
                              </div>
                            </td>

                            <td className="py-3 px-3">
                              <select
                                value={stage}
                                onChange={(e) =>
                                  handleUpdateLeadStage(lead.id, e.target.value as LeadPipelineStage)
                                }
                                className="px-2 py-1 text-[11px] bg-neutral-900 border border-neutral-700 rounded-md text-neutral-200 focus:outline-hidden"
                              >
                                {pipelineStages.map((st) => (
                                  <option key={st.id} value={st.id}>
                                    {st.label}
                                  </option>
                                ))}
                              </select>
                            </td>

                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => setSelectedLead(lead)}
                                  className="px-2.5 py-1 text-xs text-neutral-300 hover:text-white bg-neutral-800 rounded-md transition-colors cursor-pointer"
                                >
                                  Details
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteLead(lead.id)}
                                  className="p-1 text-rose-400/70 hover:text-rose-400 rounded hover:bg-rose-500/10 transition-colors cursor-pointer"
                                  title="Delete Lead"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: BANNERS & CMS CONTENT                                             */}
        {/* ========================================================================= */}
        {activeTab === 'cms-banners' && (
          <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
            <div className="pb-3 border-b border-neutral-800">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Promotional Banners & Content Engine
              </h1>
              <p className="text-xs text-neutral-400 mt-0.5">
                Update marketing headlines, consumer announcements, and promotional copy in real-time.
              </p>
            </div>

            <div className="space-y-4">
              {banners.map((banner) => (
                <div
                  key={banner.id}
                  className="bg-[#141417] border border-neutral-800 rounded-xl p-5 space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
                    <div>
                      <span className="text-xs font-mono uppercase text-[#8574ff] font-semibold">
                        {banner.key.replace('_', ' ')}
                      </span>
                      <h2 className="text-sm font-semibold text-white mt-0.5">{banner.title}</h2>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                      <span>{banner.enabled ? 'Live' : 'Hidden'}</span>
                      <input
                        type="checkbox"
                        checked={banner.enabled}
                        onChange={(e) => {
                          updateCmsBanner(banner.id, { enabled: e.target.checked });
                          showToast(`Updated banner status.`);
                        }}
                        className="w-4 h-4 accent-[#8574ff] rounded cursor-pointer"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-neutral-400 mb-1">Headline Text</label>
                      <input
                        type="text"
                        value={banner.title}
                        onChange={(e) => updateCmsBanner(banner.id, { title: e.target.value })}
                        className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-[#8574ff]"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-400 mb-1">CTA Button Text</label>
                      <input
                        type="text"
                        value={banner.ctaText}
                        onChange={(e) => updateCmsBanner(banner.id, { ctaText: e.target.value })}
                        className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-[#8574ff]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-neutral-400 mb-1">Subtitle / Body Text</label>
                      <textarea
                        rows={2}
                        value={banner.subtitle}
                        onChange={(e) => updateCmsBanner(banner.id, { subtitle: e.target.value })}
                        className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-[#8574ff]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* MODAL 1: ADD / EDIT CAR DRAWER                                           */}
      {/* ========================================================================= */}
      {isCarModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#141417] border border-neutral-800 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  {editingCar ? `Edit ${editingCar.name}` : 'Add New Vehicle to Inventory'}
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Vehicle will instantly sync to the Showroom and Car Detail viewports.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCarModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveCar} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-400 mb-1 font-medium">Vehicle Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Audi A3 Sportback"
                    value={carFormData.name || ''}
                    onChange={(e) => setCarFormData({ ...carFormData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-[#8574ff]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-medium">Make *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Audi, Toyota, BMW"
                    value={carFormData.make || ''}
                    onChange={(e) => setCarFormData({ ...carFormData, make: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-[#8574ff]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-medium">Model & Trim</label>
                  <input
                    type="text"
                    placeholder="e.g. 1.5 TFSI S Tronic Sport"
                    value={carFormData.trim || ''}
                    onChange={(e) => setCarFormData({ ...carFormData, trim: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-[#8574ff]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-medium">Model Year</label>
                  <input
                    type="number"
                    value={carFormData.year || 2026}
                    onChange={(e) => setCarFormData({ ...carFormData, year: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-[#8574ff]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-medium">Cash Price (ZMW) *</label>
                  <input
                    type="number"
                    required
                    value={carFormData.priceZMW || 0}
                    onChange={(e) => setCarFormData({ ...carFormData, priceZMW: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-[#8574ff]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-medium">Estimated Monthly (ZMW)</label>
                  <input
                    type="number"
                    value={carFormData.monthlyZMW || 0}
                    onChange={(e) => setCarFormData({ ...carFormData, monthlyZMW: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-[#8574ff]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-medium">Fuel Type</label>
                  <select
                    value={carFormData.fuelType || 'Petrol'}
                    onChange={(e) => setCarFormData({ ...carFormData, fuelType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-hidden"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-medium">Gearbox</label>
                  <select
                    value={carFormData.gearbox || 'Automatic'}
                    onChange={(e) => setCarFormData({ ...carFormData, gearbox: e.target.value as any })}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-hidden"
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-medium">Mileage (km)</label>
                  <input
                    type="number"
                    value={carFormData.mileageKm || 0}
                    onChange={(e) => setCarFormData({ ...carFormData, mileageKm: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-[#8574ff]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-medium">Location</label>
                  <input
                    type="text"
                    value={carFormData.location || ''}
                    onChange={(e) => setCarFormData({ ...carFormData, location: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-[#8574ff]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-neutral-400 mb-1 font-medium">Image URL</label>
                  <input
                    type="text"
                    value={carFormData.images?.[0] || ''}
                    onChange={(e) => setCarFormData({ ...carFormData, images: [e.target.value] })}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-[#8574ff]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-neutral-400 mb-1 font-medium">Description</label>
                  <textarea
                    rows={3}
                    value={carFormData.fullDescription || ''}
                    onChange={(e) => setCarFormData({ ...carFormData, fullDescription: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-[#8574ff]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCarModalOpen(false)}
                  className="px-4 py-2 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-[#8574ff] hover:bg-[#7260f5] rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  {editingCar ? 'Save Changes' : 'Publish Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: LEAD DETAILS DRAWER                                             */}
      {/* ========================================================================= */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-end">
          <div className="bg-[#141417] border-l border-neutral-800 w-full max-w-lg h-full flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-[#8574ff] font-bold">{selectedLead.referenceId}</span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {selectedLead.type === 'buy'
                    ? selectedLead.customerName
                    : selectedLead.type === 'sell'
                    ? selectedLead.sellerName
                    : selectedLead.contactPerson}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5 overflow-y-auto flex-1 text-xs text-neutral-300">
              {/* Pipeline Stage Transition */}
              <div>
                <label className="block text-neutral-400 mb-1.5 font-medium">Pipeline Stage</label>
                <select
                  value={selectedLead.pipelineStage || 'new'}
                  onChange={(e) =>
                    handleUpdateLeadStage(selectedLead.id, e.target.value as LeadPipelineStage)
                  }
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white font-medium focus:outline-hidden"
                >
                  {pipelineStages.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Contact Card */}
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl space-y-2.5">
                <div className="text-[11px] font-semibold text-neutral-400 uppercase">Customer Profile</div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">WhatsApp Phone:</span>
                  <a
                    href={`https://wa.me/${selectedLead.whatsappNumber.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-emerald-400 font-bold hover:underline flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{selectedLead.whatsappNumber}</span>
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Location:</span>
                  <span className="text-white">{selectedLead.location || 'Lusaka'}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Request Type:</span>
                  <span className="uppercase font-mono text-[11px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">
                    {selectedLead.type}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Created:</span>
                  <span className="font-mono text-neutral-400">
                    {new Date(selectedLead.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Deal Vehicle Details */}
              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl space-y-2">
                <div className="text-[11px] font-semibold text-neutral-400 uppercase">Vehicle Inquiry</div>
                <div className="text-sm font-semibold text-white">
                  {(selectedLead as any).make || ''} {(selectedLead as any).model || (selectedLead as any).agencyName || ''}
                </div>
                <div className="text-neutral-400">
                  Target Budget / Asking: <span className="text-white font-mono font-bold">
                    {selectedLead.type === 'buy'
                      ? selectedLead.budgetZMW
                      : selectedLead.type === 'sell'
                      ? selectedLead.askingPriceZMW
                      : 'N/A'}
                  </span>
                </div>
                {selectedLead.notes && (
                  <p className="text-neutral-400 italic pt-1 border-t border-neutral-800/80">
                    "{selectedLead.notes}"
                  </p>
                )}
              </div>

              {/* Timeline Notes Log */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-400 uppercase">
                  <span>Activity Timeline & Log</span>
                  <span className="font-mono">{selectedLead.leadNotes?.length || 0} notes</span>
                </div>

                {/* Add Note Form */}
                <form onSubmit={handleAddNoteToSelectedLead} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Log a call, inspection note, or status update..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-hidden focus:border-[#8574ff]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#8574ff] hover:bg-[#7260f5] text-white font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

                {/* Notes List */}
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {(selectedLead.leadNotes || []).map((note) => (
                    <div key={note.id} className="p-2.5 bg-neutral-900/60 border border-neutral-800/60 rounded-lg">
                      <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                        <span className="text-neutral-400 font-semibold">{note.author}</span>
                        <span>{new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-neutral-200 mt-1">{note.text}</p>
                    </div>
                  ))}
                  {(!selectedLead.leadNotes || selectedLead.leadNotes.length === 0) && (
                    <div className="text-neutral-600 text-center py-3">No activity logs recorded yet.</div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-neutral-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleDeleteLead(selectedLead.id)}
                className="text-rose-400 hover:text-rose-300 font-medium cursor-pointer"
              >
                Delete Lead
              </button>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: MANUAL LEAD CREATION                                             */}
      {/* ========================================================================= */}
      {isNewLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#141417] border border-neutral-800 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
              <h3 className="text-base font-bold text-white">Create New Lead</h3>
              <button
                type="button"
                onClick={() => setIsNewLeadModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Inquiry Type</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setManualLeadData({ ...manualLeadData, type: 'buy' })}
                    className={`flex-1 py-1.5 rounded-lg border text-center font-semibold cursor-pointer ${
                      manualLeadData.type === 'buy'
                        ? 'bg-[#8574ff] text-white border-[#8574ff]'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                    }`}
                  >
                    Vehicle Purchase
                  </button>
                  <button
                    type="button"
                    onClick={() => setManualLeadData({ ...manualLeadData, type: 'sell' })}
                    className={`flex-1 py-1.5 rounded-lg border text-center font-semibold cursor-pointer ${
                      manualLeadData.type === 'sell'
                        ? 'bg-[#8574ff] text-white border-[#8574ff]'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                    }`}
                  >
                    Sell / Valuation
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Customer Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mwamba Phiri"
                  value={manualLeadData.customerName}
                  onChange={(e) => setManualLeadData({ ...manualLeadData, customerName: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-[#8574ff]"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">WhatsApp Contact *</label>
                <input
                  type="text"
                  required
                  placeholder="+260 97X XXXXXX"
                  value={manualLeadData.whatsappNumber}
                  onChange={(e) => setManualLeadData({ ...manualLeadData, whatsappNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-[#8574ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Vehicle Make</label>
                  <input
                    type="text"
                    placeholder="Toyota, Ford, etc."
                    value={manualLeadData.make}
                    onChange={(e) => setManualLeadData({ ...manualLeadData, make: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-[#8574ff]"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Model / Trim</label>
                  <input
                    type="text"
                    placeholder="Hilux, Ranger, etc."
                    value={manualLeadData.model}
                    onChange={(e) => setManualLeadData({ ...manualLeadData, model: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-[#8574ff]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Budget / Asking</label>
                  <input
                    type="text"
                    placeholder="K 350,000"
                    value={manualLeadData.budgetZMW}
                    onChange={(e) => setManualLeadData({ ...manualLeadData, budgetZMW: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-[#8574ff]"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">City / Hub</label>
                  <input
                    type="text"
                    placeholder="Lusaka, Ndola, etc."
                    value={manualLeadData.location}
                    onChange={(e) => setManualLeadData({ ...manualLeadData, location: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-[#8574ff]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Notes / Special Request</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Customer wants inspection tomorrow 14:00"
                  value={manualLeadData.notes}
                  onChange={(e) => setManualLeadData({ ...manualLeadData, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-hidden focus:border-[#8574ff]"
                />
              </div>

              <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsNewLeadModalOpen(false)}
                  className="px-4 py-2 text-neutral-400 hover:text-white rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-[#8574ff] hover:bg-[#7260f5] rounded-lg transition-colors cursor-pointer"
                >
                  Add Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
