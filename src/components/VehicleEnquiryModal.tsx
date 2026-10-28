import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { submitBuyLead, BuyLead } from '../services/leadService';
import { ZAMBIAN_TOWNS } from '../data/buyCarData';

interface VehicleEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: {
    name: string;
    make?: string;
    model?: string;
    image: string;
    priceZMW: string;
    subtitle?: string;
  } | null;
  onNavigateToFullConfigurator?: (make?: string, model?: string) => void;
}

export const VehicleEnquiryModal: React.FC<VehicleEnquiryModalProps> = ({
  isOpen,
  onClose,
  vehicle,
  onNavigateToFullConfigurator,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [location, setLocation] = useState('Lusaka');
  const [urgency, setUrgency] = useState('Immediate (Ready to inspect & buy)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<BuyLead | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !vehicle) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !whatsappNumber.trim()) {
      setError('Please provide your name and WhatsApp contact number.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await submitBuyLead({
        make: vehicle.make || vehicle.name.split(' ')[0] || 'Vehicle',
        model: vehicle.model || vehicle.name,
        budgetZMW: vehicle.priceZMW,
        location,
        urgency,
        customerName: customerName.trim(),
        whatsappNumber: whatsappNumber.trim(),
        notes: `Enquiry generated directly from featured vehicle card: ${vehicle.name} (${vehicle.priceZMW})`,
      });
      setSubmittedLead(result);
    } catch {
      setError('Unable to submit enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#181818] text-white w-full max-w-lg rounded-2xl border border-neutral-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-[#111111]">
          <div>
            <h3 className="font-extrabold text-base text-white">Source This Vehicle</h3>
            <p className="text-xs text-neutral-400">Coordinate sourcing across authorized agents in Zambia</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {/* Vehicle Snapshot Card */}
          <div className="flex items-center gap-3 bg-[#222222] p-3 rounded-xl border border-neutral-700">
            <div className="w-20 h-14 bg-white/10 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
              <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">{vehicle.name}</h4>
              <p className="text-xs text-neutral-400">{vehicle.subtitle || 'Direct agent sourcing'}</p>
              <p className="text-xs font-black text-[#00e5db] mt-0.5">{vehicle.priceZMW}</p>
            </div>
          </div>

          {submittedLead ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#00e5db]/20 text-[#00e5db] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h4 className="text-lg font-black text-white">Sourcing Request Received</h4>
              <div className="inline-block bg-neutral-900 px-3.5 py-1.5 rounded-md border border-neutral-800 font-mono text-xs text-[#00e5db]">
                Ref: {submittedLead.referenceId}
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                We have registered your interest in sourcing this <strong className="text-white">{vehicle.name}</strong>. An AutoAce coordinator will send matching options to your WhatsApp (<span className="text-[#00e5db]">{submittedLead.whatsappNumber}</span>).
              </p>
              <div className="pt-2 flex justify-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-[#00e5db] hover:bg-[#00c9c0] text-black font-extrabold text-xs px-5 py-2.5 rounded-lg"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              {error && (
                <div className="p-2.5 rounded bg-red-900/40 border border-red-700 text-red-200 text-xs font-semibold">
                  {error}
                </div>
              )}

              <div>
                <label className="block font-bold text-neutral-300 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Chileshe Mwape"
                  className="w-full bg-[#222222] border border-neutral-700 rounded-lg px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-[#00e5db] text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-300 mb-1">WhatsApp Number *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 font-bold">
                    🇿🇲
                  </span>
                  <input
                    type="text"
                    required
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="+260 97X XXX XXX"
                    className="w-full bg-[#222222] border border-neutral-700 rounded-lg pl-8 pr-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-[#00e5db] text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-neutral-300 mb-1">Preferred Town</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#222222] border border-neutral-700 rounded-lg px-2.5 py-2 text-white focus:outline-none focus:border-[#00e5db] text-xs"
                  >
                    {ZAMBIAN_TOWNS.map((town) => (
                      <option key={town} value={town}>
                        {town}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-neutral-300 mb-1">Purchase Urgency</label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="w-full bg-[#222222] border border-neutral-700 rounded-lg px-2.5 py-2 text-white focus:outline-none focus:border-[#00e5db] text-xs"
                  >
                    <option value="Immediate">Immediate</option>
                    <option value="Within 2 weeks">Within 2 weeks</option>
                    <option value="Exploring">Exploring</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-[#00e5db] hover:bg-[#00c9c0] text-black font-extrabold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow disabled:opacity-60"
                >
                  {isSubmitting ? 'Submitting request...' : 'Submit Sourcing Request'}
                </button>

                {onNavigateToFullConfigurator && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigateToFullConfigurator(vehicle.make, vehicle.model);
                    }}
                    className="w-full text-center text-xs text-neutral-400 hover:text-white py-1 flex items-center justify-center gap-1"
                  >
                    <span>Or configure complete vehicle requirements</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
