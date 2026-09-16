import React from 'react';
import {
  X,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Layers,
  ArrowRight,
  ShieldCheck,
  Calendar,
  HardDrive,
} from 'lucide-react';
import { EvidenceItem } from '../types';
import { StatusBadge } from './StatusBadge';

interface EvidenceDetailModalProps {
  item: EvidenceItem | null;
  onClose: () => void;
  onUploadClick: (item: EvidenceItem) => void;
}

export const EvidenceDetailModal: React.FC<EvidenceDetailModalProps> = ({
  item,
  onClose,
  onUploadClick,
}) => {
  if (!item) return null;

  const isMissing = item.status === 'MISSING';
  const isUnreadable = item.status === 'UNREADABLE';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="evidence-detail-modal"
        className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-start justify-between bg-slate-50/70 sticky top-0 backdrop-blur-md">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-blue-100 text-blue-800">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                <StatusBadge status={item.status} size="sm" />
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Linked Requirement:{' '}
                <span className="font-semibold text-slate-900">{item.linkedRequirement}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Evidence Status
              </span>
              <div className="mt-1">
                <StatusBadge status={item.status} />
              </div>
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Extraction Confidence
              </span>
              <span className="text-base font-extrabold text-slate-900 mt-1 block">
                {item.confidence > 0 ? `${item.confidence}%` : '0% (No file)'}
              </span>
            </div>
            {item.fileName && (
              <div className="col-span-2 pt-2 border-t border-slate-200/80 flex flex-wrap gap-4 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <HardDrive className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono text-slate-800 font-semibold">{item.fileName}</span>
                  {item.fileSize && <span className="text-slate-400">({item.fileSize})</span>}
                </span>
                {item.uploadDate && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Uploaded: {item.uploadDate}</span>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Issue & Next Action Cards */}
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Audit Issue Assessment
              </span>
              <p className="text-sm font-medium text-slate-800">
                {item.issue || 'No issue detected.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/50">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block mb-1">
                Recommended Next Action
              </span>
              <p className="text-sm font-medium text-blue-950">
                {item.nextAction || 'None required. Evidence is currently sufficient.'}
              </p>
            </div>
          </div>

          {/* Extracted Data Points Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-slate-400" />
              <span>Extracted Fields & Verification Log</span>
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200 text-xs">
              {item.extractedDetails.length > 0 ? (
                item.extractedDetails.map((detail, idx) => (
                  <div
                    key={idx}
                    className="p-3 flex items-center justify-between bg-white hover:bg-slate-50/70"
                  >
                    <span className="font-semibold text-slate-600">{detail.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">{detail.value}</span>
                      {detail.status === 'MATCH' && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">
                          MATCH
                        </span>
                      )}
                      {detail.status === 'MISMATCH' && (
                        <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded font-semibold">
                          MISMATCH
                        </span>
                      )}
                      {detail.status === 'UNVERIFIED' && (
                        <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-semibold">
                          UNVERIFIED
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-slate-500">
                  No extracted fields available. Document has not been submitted or processed.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 hover:text-slate-800 px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Close
          </button>

          {(isMissing || isUnreadable) && (
            <button
              onClick={() => {
                onClose();
                onUploadClick(item);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors shadow-2xs cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Document Now</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
