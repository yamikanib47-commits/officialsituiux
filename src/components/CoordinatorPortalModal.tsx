import React, { useState, useEffect } from 'react';
import { X, Search, Filter, RefreshCw, Car, Tag, Users, CheckCircle, Clock, Phone, MapPin } from 'lucide-react';
import { getAllLeads, AnyLead } from '../services/leadService';

interface CoordinatorPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CoordinatorPortalModal: React.FC<CoordinatorPortalModalProps> = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState<AnyLead[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'buy' | 'sell' | 'agent'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const loadData = () => {
    setLoading(true);
    const data = getAllLeads();
    setLeads(data);
    setTimeout(() => setLoading(false), 200);
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
    const handleUpdate = () => loadData();
    window.addEventListener('autoace_leads_updated', handleUpdate);
    return () => window.removeEventListener('autoace_leads_updated', handleUpdate);
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = leads.filter((item) => {
    if (filterType !== 'all' && item.type !== filterType) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    if (item.referenceId.toLowerCase().includes(q)) return true;
    if (item.type === 'buy') {
      return (
        item.customerName.toLowerCase().includes(q) ||
        item.make.toLowerCase().includes(q) ||
        item.model.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q)
      );
    }
    if (item.type === 'sell') {
      return (
        item.sellerName.toLowerCase().includes(q) ||
        item.make.toLowerCase().includes(q) ||
        item.model.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q)
      );
    }
    if (item.type === 'agent') {
      return (
        item.contactPerson.toLowerCase().includes(q) ||
        item.agencyName.toLowerCase().includes(q) ||
        item.operatingTowns.some((t) => t.toLowerCase().includes(q))
      );
    }
    return false;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#181818] text-white w-full max-w-4xl rounded-2xl border border-neutral-700 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-[#111111]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00e5db] text-black flex items-center justify-center font-black text-xs">
              AZ
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white">AutoAce Lead & Sourcing Management</h3>
              <p className="text-xs text-neutral-400">Review incoming buying requests, seller listings, and agent onboarding</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadData}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 border-b border-neutral-800 bg-neutral-900/60 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: `All Leads (${leads.length})` },
              { id: 'buy', label: `Buy Requests (${leads.filter((l) => l.type === 'buy').length})` },
              { id: 'sell', label: `Seller Listings (${leads.filter((l) => l.type === 'sell').length})` },
              { id: 'agent', label: `Agent Signups (${leads.filter((l) => l.type === 'agent').length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterType(tab.id as any)}
                className={`text-xs px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-colors ${
                  filterType === tab.id
                    ? 'bg-[#00e5db] text-black'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reference, name, make, town..."
              className="w-full bg-[#222222] border border-neutral-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#00e5db]"
            />
          </div>
        </div>

        {/* Lead List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-neutral-500 text-sm">
              No matching records found.
            </div>
          ) : (
            filtered.map((item) => {
              if (item.type === 'buy') {
                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all text-xs space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-bold uppercase text-[10px]">
                          BUY REQUEST
                        </span>
                        <span className="font-mono font-bold text-white text-xs">{item.referenceId}</span>
                        <span className="text-neutral-500 text-[11px]">
                          {new Date(item.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <span className="bg-neutral-800 text-[#00e5db] px-2 py-0.5 rounded text-[10px] font-bold">
                        {item.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                      <div>
                        <p className="text-neutral-400">Vehicle Target:</p>
                        <p className="font-bold text-white text-sm">
                          {item.make} {item.model}
                        </p>
                        {item.yearRange && <p className="text-neutral-400 text-[11px]">Year: {item.yearRange}</p>}
                      </div>

                      <div>
                        <p className="text-neutral-400">Budget & Location:</p>
                        <p className="font-bold text-[#00e5db]">{item.budgetZMW}</p>
                        <p className="text-neutral-300 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-neutral-500" />
                          <span>{item.location}</span>
                        </p>
                      </div>

                      <div>
                        <p className="text-neutral-400">Buyer Contact:</p>
                        <p className="font-bold text-white">{item.customerName}</p>
                        <a
                          href={`https://wa.me/${item.whatsappNumber.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#00e5db] hover:underline flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{item.whatsappNumber}</span>
                        </a>
                      </div>
                    </div>

                    {item.notes && (
                      <div className="bg-neutral-950/70 p-2 rounded text-[11px] text-neutral-300 border border-neutral-800/80">
                        <strong className="text-neutral-400">Customer Note:</strong> {item.notes}
                      </div>
                    )}
                  </div>
                );
              }

              if (item.type === 'sell') {
                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all text-xs space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-amber-950 text-amber-400 border border-amber-800 px-2 py-0.5 rounded font-bold uppercase text-[10px]">
                          SELLER LISTING
                        </span>
                        <span className="font-mono font-bold text-white text-xs">{item.referenceId}</span>
                        <span className="text-neutral-500 text-[11px]">
                          {new Date(item.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <span className="bg-neutral-800 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold">
                        {item.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                      <div>
                        <p className="text-neutral-400">Vehicle Specification:</p>
                        <p className="font-bold text-white text-sm">
                          {item.year} {item.make} {item.model}
                        </p>
                        <p className="text-neutral-400 text-[11px]">
                          {item.mileage} · {item.transmission} · {item.fuelType}
                        </p>
                        {item.regNumber && (
                          <span className="inline-block mt-1 bg-yellow-400 text-black px-1.5 py-0.5 rounded font-mono font-black text-[10px]">
                            {item.regNumber}
                          </span>
                        )}
                      </div>

                      <div>
                        <p className="text-neutral-400">Asking Price & Location:</p>
                        <p className="font-bold text-[#00e5db] text-sm">{item.askingPriceZMW}</p>
                        <p className="text-neutral-300 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-neutral-500" />
                          <span>{item.location}</span>
                        </p>
                        <p className="text-neutral-400 text-[11px]">Condition: {item.condition}</p>
                      </div>

                      <div>
                        <p className="text-neutral-400">Seller Contact:</p>
                        <p className="font-bold text-white">{item.sellerName}</p>
                        <a
                          href={`https://wa.me/${item.whatsappNumber.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#00e5db] hover:underline flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{item.whatsappNumber}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              }

              if (item.type === 'agent') {
                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all text-xs space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-sky-950 text-sky-400 border border-sky-800 px-2 py-0.5 rounded font-bold uppercase text-[10px]">
                          AGENT REGISTRATION
                        </span>
                        <span className="font-mono font-bold text-white text-xs">{item.referenceId}</span>
                        <span className="text-neutral-500 text-[11px]">
                          {new Date(item.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <span className="bg-neutral-800 text-sky-300 px-2 py-0.5 rounded text-[10px] font-bold">
                        {item.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                      <div>
                        <p className="text-neutral-400">Agency / Name:</p>
                        <p className="font-bold text-white text-sm">{item.agencyName}</p>
                        <p className="text-neutral-300">Contact: {item.contactPerson}</p>
                        <p className="text-neutral-400 text-[11px]">Exp: {item.experienceYears}</p>
                      </div>

                      <div>
                        <p className="text-neutral-400">Operating Towns:</p>
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {item.operatingTowns.map((t) => (
                            <span key={t} className="bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded text-[10px]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-neutral-400">WhatsApp Dispatch:</p>
                        <a
                          href={`https://wa.me/${item.whatsappNumber.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#00e5db] hover:underline flex items-center gap-1 font-bold"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{item.whatsappNumber}</span>
                        </a>
                      </div>
                    </div>

                    {item.specializations && item.specializations.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {item.specializations.map((s) => (
                          <span key={s} className="bg-sky-950/60 text-sky-300 border border-sky-800/60 px-1.5 py-0.5 rounded text-[10px]">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return null;
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-neutral-800 bg-[#111111] flex items-center justify-between text-[11px] text-neutral-400">
          <span>AutoAce Zed Internal Coordinator System</span>
          <span>Stored in /data/leads.json & Local Cache</span>
        </div>
      </div>
    </div>
  );
};
