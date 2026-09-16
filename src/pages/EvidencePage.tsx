import React, { useState, useMemo } from 'react';
import {
  FileCheck,
  Upload,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Info,
  RefreshCw,
  Filter,
  CheckCircle2,
  FileQuestion,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EvidenceCard } from '../components/EvidenceCard';
import { EvidenceDetailModal } from '../components/EvidenceDetailModal';
import { UploadModal } from '../components/UploadModal';
import { RequirementMappingCard } from '../components/RequirementMappingCard';
import { EvidenceQualityCard } from '../components/EvidenceQualityCard';
import { SmartEvidenceInsights } from '../components/SmartEvidenceInsights';
import { GovernmentSymbol } from '../components/GovernmentSymbol';
import { EvidenceItem } from '../types';

type FilterType = 'ALL' | 'VERIFIED' | 'MISSING' | 'ATTENTION' | 'REVIEW';

export const EvidencePage: React.FC = () => {
  const {
    scenario,
    uploadSimulatedEvidence,
    setCurrentRoute,
    establishedCount,
    totalCount,
    resetCurrentScenario,
    t,
    language,
  } = useApp();

  const [filter, setFilter] = useState<FilterType>('ALL');
  const [detailModalItem, setDetailModalItem] = useState<EvidenceItem | null>(null);
  const [uploadModalItem, setUploadModalItem] = useState<EvidenceItem | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const handleViewDetails = (item: EvidenceItem) => {
    setDetailModalItem(item);
  };

  const handleUploadClick = (item: EvidenceItem) => {
    setUploadModalItem(item);
    setIsUploadOpen(true);
  };

  const handleUploadSuccess = (evidenceId: string, customFileName?: string) => {
    uploadSimulatedEvidence(evidenceId, customFileName);
  };

  const hasMissing = scenario.evidence.some((e) => e.status === 'MISSING');
  const verifiedCount = scenario.evidence.filter((e) => e.status === 'VERIFIED').length;
  const attentionCount = scenario.evidence.filter((e) => e.status !== 'VERIFIED').length;

  const filteredEvidence = useMemo(() => {
    return scenario.evidence.filter((item) => {
      if (filter === 'ALL') return true;
      if (filter === 'VERIFIED') return item.status === 'VERIFIED';
      if (filter === 'MISSING') return item.status === 'MISSING';
      if (filter === 'ATTENTION') return item.status !== 'VERIFIED';
      if (filter === 'REVIEW') return item.status === 'CONFLICT' || item.status === 'UNREADABLE' || item.status === 'LOW CONFIDENCE';
      return true;
    });
  }, [scenario.evidence, filter]);

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-10 px-4 space-y-8">
      {/* Header with Top Summary Counters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div className="flex items-start gap-3.5">
          <GovernmentSymbol size="md" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#123B7A] bg-[#E8EEF8] px-2.5 py-0.5 rounded-md border border-[#123B7A]/20">
                ClearGov Intelligence
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-semibold font-serif">
                {language === 'hi' ? 'भारत सरकार' : language === 'te' ? 'భారత ప్రభుత్వం' : 'Government of India'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mt-1.5 tracking-tight">
              Evidence Repository & OCR Trace
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl font-medium">
              ClearGov determines whether each uploaded record satisfies statutory criteria with optical integrity and cryptographic proof.
            </p>
          </div>
        </div>

        {/* Top Summary Badge Counters */}
        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-2xl text-xs font-semibold shadow-xs">
            <span className="text-slate-600 font-bold">{totalCount} Criteria</span>
            <span className="text-slate-300">•</span>
            <span className="text-[#03543F] font-black bg-[#DEF7EC] px-2 py-0.5 rounded-md border border-[#31C48D]/40">
              {establishedCount} Established
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-[#92400E] font-black bg-[#FEF3C7] px-2 py-0.5 rounded-md border border-[#F59E0B]/40">
              {totalCount - establishedCount} Action
            </span>
          </div>

          <button
            id="btn-nav-to-assessment"
            onClick={() => setCurrentRoute('assessment')}
            className="inline-flex items-center gap-2 text-xs font-black bg-[#123B7A] hover:bg-[#0B2247] text-white px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-900/15 cursor-pointer"
          >
            <span>Evaluation View</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dynamic Action Required Alert if missing item */}
      {hasMissing && (
        <div className="bg-[#FEF3C7]/40 border border-[#F59E0B] rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-slate-900 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#92400E] flex items-center justify-center shrink-0 border border-[#F59E0B]/50 mt-0.5">
              <AlertCircle className="w-5 h-5 text-[#D97706]" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900">
                Action Required: 1 Mandatory Document Missing
              </h4>
              <p className="text-xs text-slate-700 mt-1 font-medium leading-relaxed max-w-2xl">
                The Revenue Income Certificate is required to establish family economic eligibility under Section 4.3. You can simulate upload to instantly observe deterministic re-evaluation.
              </p>
            </div>
          </div>

          <button
            id="btn-quick-upload-income"
            onClick={() => {
              const incomeItem = scenario.evidence.find((e) => e.requirementKey === 'income');
              if (incomeItem) handleUploadClick(incomeItem);
            }}
            className="self-start sm:self-auto inline-flex items-center gap-2 text-xs font-black bg-[#123B7A] hover:bg-[#0B2247] text-white px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Income Certificate</span>
          </button>
        </div>
      )}

      {/* Evidence Quality Score Card (Section 6) */}
      <EvidenceQualityCard />

      {/* Smart Evidence Insights (Section 8) */}
      <SmartEvidenceInsights />

      {/* Evidence-to-Requirement Relationship Map (Section 7) */}
      <RequirementMappingCard />

      {/* Filter Tabs & Evidence Document Cards */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <h3 className="text-base font-black text-slate-900">
              Submitted Document Repository
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Inspect cryptographic seals, optical OCR confidence, and cross-field statutory mappings.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200 text-xs">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                filter === 'ALL'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({scenario.evidence.length})
            </button>
            <button
              onClick={() => setFilter('VERIFIED')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                filter === 'VERIFIED'
                  ? 'bg-[#0E9F6E] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Verified ({verifiedCount})
            </button>
            <button
              onClick={() => setFilter('MISSING')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                filter === 'MISSING'
                  ? 'bg-[#F59E0B] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Missing ({scenario.evidence.filter((e) => e.status === 'MISSING').length})
            </button>
            <button
              onClick={() => setFilter('ATTENTION')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                filter === 'ATTENTION'
                  ? 'bg-[#EF4444] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Attention ({attentionCount})
            </button>
          </div>
        </div>

        {/* Evidence Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvidence.map((item) => (
            <EvidenceCard
              key={item.id}
              item={item}
              onViewDetails={handleViewDetails}
              onUploadClick={handleUploadClick}
            />
          ))}

          {filteredEvidence.length === 0 && (
            <div className="col-span-full p-8 text-center bg-white border border-slate-200 rounded-3xl text-slate-500 text-xs">
              No documents match this filter.
            </div>
          )}
        </div>
      </div>

      {/* Detail & Upload Modals */}
      <EvidenceDetailModal
        item={detailModalItem}
        onClose={() => setDetailModalItem(null)}
        onUploadClick={handleUploadClick}
      />

      <UploadModal
        item={uploadModalItem}
        isOpen={isUploadOpen}
        onClose={() => {
          setIsUploadOpen(false);
          setUploadModalItem(null);
        }}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
};
