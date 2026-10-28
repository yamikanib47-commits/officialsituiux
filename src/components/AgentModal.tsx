import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Users, MapPin, Phone, Briefcase } from 'lucide-react';
import { submitAgentLead, AgentLead } from '../services/leadService';
import { ZAMBIAN_TOWNS } from '../data/buyCarData';

interface AgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AgentModal: React.FC<AgentModalProps> = ({ isOpen, onClose }) => {
  const [agencyName, setAgencyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [selectedTowns, setSelectedTowns] = useState<string[]>(['Lusaka']);
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>(['Local Pre-owned', '4x4 & Pickups']);
  const [experienceYears, setExperienceYears] = useState('3-5 years');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedLead, setSubmittedLead] = useState<AgentLead | null>(null);

  if (!isOpen) return null;

  const toggleTown = (town: string) => {
    setSelectedTowns((prev) =>
      prev.includes(town) ? prev.filter((t) => t !== town) : [...prev, town]
    );
  };

  const toggleSpec = (spec: string) => {
    setSelectedSpecs((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactPerson.trim() || !whatsappNumber.trim()) {
      setError('Please provide your name and WhatsApp contact number.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await submitAgentLead({
        agencyName: agencyName.trim() || `${contactPerson.trim()} Sourcing`,
        contactPerson: contactPerson.trim(),
        whatsappNumber: whatsappNumber.trim(),
        operatingTowns: selectedTowns.length > 0 ? selectedTowns : ['Lusaka'],
        specializations: selectedSpecs,
        experienceYears,
        notes: notes.trim(),
      });
      setSubmittedLead(result);
    } catch {
      setError('Failed to submit application. Please check your network and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#181818] text-white w-full max-w-xl rounded-2xl border border-neutral-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-[#111111]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#00e5db]/20 text-[#00e5db] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white">Join as an AutoAce Sourcing Agent</h3>
              <p className="text-xs text-neutral-400">Receive and fulfill verified vehicle sourcing requests across Zambia</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-sm">
          {submittedLead ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#00e5db]/20 text-[#00e5db] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h4 className="text-xl font-black text-white">Application Received</h4>
              <div className="inline-block bg-neutral-900 px-4 py-2 rounded-lg border border-neutral-800 font-mono text-sm text-[#00e5db]">
                Ref: {submittedLead.referenceId}
              </div>
              <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{submittedLead.contactPerson}</strong>. Our partnership desk will reach out to you on WhatsApp (<span className="text-[#00e5db]">{submittedLead.whatsappNumber}</span>) to verify your credentials and configure your lead dispatch preferences.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-[#00e5db] hover:bg-[#00c9c0] text-black font-extrabold text-sm px-6 py-2.5 rounded-lg transition-colors"
                >
                  Close & Return
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-900/30 border border-red-700/60 text-red-200 text-xs font-semibold">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    Agency or Trading Name
                  </label>
                  <input
                    type="text"
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    placeholder="e.g. Copperbelt Auto Brokers"
                    className="w-full bg-[#222222] border border-neutral-700 rounded-lg px-3.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-[#00e5db]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g. Kondwani Banda"
                    className="w-full bg-[#222222] border border-neutral-700 rounded-lg px-3.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-[#00e5db]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  WhatsApp Contact Number *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 font-bold text-xs">
                    🇿🇲
                  </span>
                  <input
                    type="text"
                    required
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="+260 97X XXX XXX"
                    className="w-full bg-[#222222] border border-neutral-700 rounded-lg pl-9 pr-3.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-[#00e5db]"
                  />
                </div>
              </div>

              {/* Operating Towns */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                  Operating Towns in Zambia (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {ZAMBIAN_TOWNS.slice(0, 8).map((town) => {
                    const active = selectedTowns.includes(town);
                    return (
                      <button
                        key={town}
                        type="button"
                        onClick={() => toggleTown(town)}
                        className={`text-xs px-2.5 py-1 rounded-md border transition-all ${
                          active
                            ? 'bg-[#00e5db] text-black font-bold border-[#00e5db]'
                            : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:border-neutral-500'
                        }`}
                      >
                        {town}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Specializations */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                  Sourcing Specializations
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    'Japan Direct Imports',
                    'South Africa Transit / Durban',
                    'Local Pre-owned / Zambian Registered',
                    '4x4 & Commercial Pickups',
                    'Luxury / Executive Vehicles',
                    'Clearing & Border Logistics (Nakonde/Chirundu)',
                  ].map((spec) => {
                    const active = selectedSpecs.includes(spec);
                    return (
                      <button
                        key={spec}
                        type="button"
                        onClick={() => toggleSpec(spec)}
                        className={`p-2 rounded-lg border text-left transition-all ${
                          active
                            ? 'bg-[#00e5db]/15 border-[#00e5db] text-[#00e5db] font-semibold'
                            : 'bg-neutral-800/80 border-neutral-700 text-neutral-300 hover:border-neutral-600'
                        }`}
                      >
                        {spec}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  Years Active in Automotive Sourcing
                </label>
                <select
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="w-full bg-[#222222] border border-neutral-700 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-[#00e5db]"
                >
                  <option value="1-2 years">1 - 2 years</option>
                  <option value="3-5 years">3 - 5 years</option>
                  <option value="6-10 years">6 - 10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  Additional Notes or Clearing Capacity (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Mention current bonded yards, yard location, or clearing partnerships..."
                  className="w-full bg-[#222222] border border-neutral-700 rounded-lg p-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#00e5db] text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#00e5db] hover:bg-[#00c9c0] text-black font-extrabold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-60"
                >
                  {isSubmitting ? 'Submitting registration...' : 'Register Sourcing Interest'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
