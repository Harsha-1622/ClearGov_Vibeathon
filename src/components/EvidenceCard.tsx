import React from 'react';
import {
  FileText,
  Upload,
  Info,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { EvidenceItem } from '../types';
import { StatusBadge } from './StatusBadge';

interface EvidenceCardProps {
  item: EvidenceItem;
  onViewDetails: (item: EvidenceItem) => void;
  onUploadClick: (item: EvidenceItem) => void;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({
  item,
  onViewDetails,
  onUploadClick,
}) => {
  const isMissing = item.status === 'MISSING';
  const isUnreadable = item.status === 'UNREADABLE' || item.status === 'LOW CONFIDENCE';
  const isConflict = item.status === 'CONFLICT';
  const isVerified = item.status === 'VERIFIED';

  const getConfidenceBarColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-[#0E9F6E]';
    if (confidence >= 70) return 'bg-[#F59E0B]';
    if (confidence > 0) return 'bg-[#EF4444]';
    return 'bg-slate-200';
  };

  return (
    <div
      id={`evidence-card-${item.id}`}
      className={`rounded-2xl border transition-all duration-200 p-5 bg-white card-premium-hover ${
        isMissing
          ? 'border-[#F59E0B]/60 bg-[#FEF3C7]/15'
          : isConflict
          ? 'border-[#EF4444]/60 bg-[#FEE2E2]/15'
          : isUnreadable
          ? 'border-[#818CF8]/60 bg-[#EEF2FF]/20'
          : 'border-slate-200/90 shadow-xs'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3">
          <div
            className={`p-2.5 rounded-xl shrink-0 ${
              isVerified
                ? 'bg-[#DEF7EC] text-[#03543F] border border-[#31C48D]/40'
                : isMissing
                ? 'bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B]/40'
                : isConflict
                ? 'bg-[#FEE2E2] text-[#991B1B] border border-[#EF4444]/40'
                : 'bg-[#EEF2FF] text-[#3730A3] border border-[#818CF8]/40'
            }`}
          >
            <FileText className="w-5 h-5" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-base font-bold text-slate-900 leading-snug">
                {item.name}
              </h4>
              <span className="text-[11px] text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md font-semibold">
                {item.documentType}
              </span>
            </div>

            <p className="text-xs text-slate-600 mt-1 flex items-center gap-1.5 font-medium">
              <span className="text-slate-400">Linked Statutory Clause:</span>
              <span className="text-slate-800 font-semibold">{item.linkedRequirement}</span>
            </p>
          </div>
        </div>

        <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-2">
          <StatusBadge status={item.status} />
        </div>
      </div>

      {/* Confidence Score Bar */}
      <div className="mt-3 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-semibold text-slate-600 flex items-center gap-1">
            Optical Extraction Confidence:
          </span>
          <span
            className={`font-bold font-mono ${
              item.confidence >= 90
                ? 'text-[#03543F]'
                : item.confidence >= 70
                ? 'text-[#92400E]'
                : item.confidence > 0
                ? 'text-[#991B1B]'
                : 'text-slate-400'
            }`}
          >
            {item.confidence > 0 ? `${item.confidence}%` : 'Not Ingested (Missing)'}
          </span>
        </div>

        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${getConfidenceBarColor(
              item.confidence
            )}`}
            style={{ width: `${item.confidence}%` }}
          />
        </div>
      </div>

      {/* Issue note if present */}
      {item.issue && item.issue !== 'No issue detected.' && (
        <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900">Evaluation Notice: </span>
            <span className="font-medium">{item.issue}</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <button
          id={`btn-details-${item.id}`}
          onClick={() => onViewDetails(item)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#123B7A] px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>View Details & OCR Trace</span>
        </button>

        {(isMissing || isUnreadable) && (
          <button
            id={`btn-upload-${item.id}`}
            onClick={() => onUploadClick(item)}
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#123B7A] hover:bg-[#0B2247] text-white px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Evidence</span>
          </button>
        )}

        {isVerified && item.fileName && (
          <span className="text-xs text-[#03543F] font-bold flex items-center gap-1.5 bg-[#DEF7EC] px-3 py-1 rounded-full border border-[#31C48D]/50">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0E9F6E]" />
            <span className="truncate max-w-[170px] sm:max-w-[200px]">{item.fileName}</span>
          </span>
        )}

        {isConflict && (
          <span className="text-xs text-[#991B1B] font-bold flex items-center gap-1.5 bg-[#FEE2E2] px-3 py-1 rounded-full border border-[#EF4444]/50">
            <ShieldAlert className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>Reviewer Intervention Required</span>
          </span>
        )}
      </div>
    </div>
  );
};
