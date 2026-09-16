import React from 'react';
import { AlertCircle, ShieldAlert, FileText, CheckCircle2, Clock, HelpCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ConflictAnalysisCardProps {
  onActionSelect: (choice: 'confirm_doc' | 'confirm_app' | 'request_evidence' | 'escalate') => void;
  isResolved?: boolean;
}

export const ConflictAnalysisCard: React.FC<ConflictAnalysisCardProps> = ({
  onActionSelect,
  isResolved,
}) => {
  const { scenario } = useApp();
  const conflict = scenario.conflict;

  if (!conflict) return null;

  return (
    <div
      id="conflict-analysis-panel"
      className="bg-white border border-[#EF4444]/60 rounded-3xl p-6 sm:p-8 shadow-md space-y-6 card-premium-hover relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#FEE2E2]/40 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10" />

      {/* Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-rose-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FEE2E2] text-[#991B1B] flex items-center justify-center font-bold border border-[#EF4444]/30">
            <ShieldAlert className="w-5 h-5 text-[#DC2626]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#991B1B]">
                Cross-Record Investigation
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">Field: {conflict.field}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mt-0.5">
              Discrepancy Audit & Resolution Panel
            </h3>
          </div>
        </div>

        <span
          className={`text-xs font-black px-3.5 py-1 rounded-full border ${
            isResolved
              ? 'bg-[#DEF7EC] text-[#03543F] border-[#31C48D]'
              : 'bg-[#FEE2E2] text-[#991B1B] border-[#EF4444]'
          }`}
        >
          {isResolved ? 'Resolved by Authorized Caseworker' : 'Discrepancy Flagged — Caseworker Action'}
        </span>
      </div>

      {/* 2-Source Direct Comparison Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Source 1: Application Form */}
        <div className="bg-[#F4F8FC] rounded-2xl border border-slate-200 p-5 space-y-2">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
            <span className="font-bold text-slate-600 uppercase tracking-wider">
              Source 1: Self-Declaration Form
            </span>
            <span className="text-[11px] font-bold text-[#123B7A] bg-blue-50 px-2 py-0.5 rounded">Applicant Submission</span>
          </div>
          <div className="pt-1">
            <span className="text-[11px] text-slate-500 font-medium block">Declared Value</span>
            <span className="text-2xl font-mono font-black text-slate-900">
              {conflict.applicationValue}
            </span>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              Self-declared by applicant during primary digital registration.
            </p>
          </div>
        </div>

        {/* Source 2: Government Identity Document */}
        <div className="bg-[#FEF2F2] rounded-2xl border border-[#EF4444]/40 p-5 space-y-2">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-rose-200">
            <span className="font-bold text-[#991B1B] uppercase tracking-wider">
              Source 2: Government ID ({conflict.documentSource})
            </span>
            <span className="text-[11px] font-bold text-[#991B1B] bg-[#FEE2E2] px-2 py-0.5 rounded border border-[#EF4444]/30">
              OCR Authenticated
            </span>
          </div>
          <div className="pt-1">
            <span className="text-[11px] text-rose-600 font-medium block">Extracted Value</span>
            <span className="text-2xl font-mono font-black text-rose-950">
              {conflict.documentValue}
            </span>
            <p className="text-xs text-rose-800 mt-1 font-medium">
              Extracted directly via cryptographic OCR from {conflict.documentSource}.
            </p>
          </div>
        </div>
      </div>

      {/* System Assessment & Recommended Action */}
      <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-2 text-xs">
        <div className="flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-slate-800 leading-relaxed font-semibold">
              <strong className="text-slate-900 font-black">Statutory Finding:</strong> Two authoritative sources state discordant dates of birth ({conflict.applicationValue} vs {conflict.documentValue}). Under rule 3.2, automated approval cannot proceed without caseworker reconciliation.
            </p>
            <p className="text-slate-700 leading-relaxed font-medium">
              <strong className="text-slate-900 font-black">Statutory Guidance:</strong> Affirm the cryptographically verified document date, accept the self-declared input with reason, or order secondary corroboration.
            </p>
          </div>
        </div>
      </div>

      {/* Reviewer Decision Actions (4 choices) */}
      <div className="space-y-3 pt-2">
        <span className="text-xs font-black uppercase tracking-wider text-slate-800 block">
          Caseworker Adjudication Decision:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* 1. Confirm Document Value */}
          <button
            id="btn-confirm-doc-value"
            type="button"
            onClick={() => onActionSelect('confirm_doc')}
            className="p-3.5 text-left rounded-2xl bg-[#123B7A] hover:bg-[#0B2247] text-white transition-all shadow-sm hover:shadow-md cursor-pointer space-y-1"
          >
            <span className="text-xs font-black block">Affirm Government ID</span>
            <span className="text-[11px] text-blue-200 block font-medium">Adopt {conflict.documentValue}</span>
          </button>

          {/* 2. Confirm Application Value */}
          <button
            id="btn-confirm-app-value"
            type="button"
            onClick={() => onActionSelect('confirm_app')}
            className="p-3.5 text-left rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 transition-all shadow-sm hover:shadow-md cursor-pointer space-y-1"
          >
            <span className="text-xs font-black block">Accept Declared Value</span>
            <span className="text-[11px] text-slate-600 block font-medium">Adopt {conflict.applicationValue}</span>
          </button>

          {/* 3. Request Additional Evidence */}
          <button
            id="btn-request-secondary-evidence"
            type="button"
            onClick={() => onActionSelect('request_evidence')}
            className="p-3.5 text-left rounded-2xl bg-[#F59E0B] hover:bg-[#D97706] text-white transition-all shadow-sm hover:shadow-md cursor-pointer space-y-1"
          >
            <span className="text-xs font-black block">Request Secondary Evidence</span>
            <span className="text-[11px] text-amber-100 block font-medium">Order Secondary Board Cert</span>
          </button>

          {/* 4. Escalate */}
          <button
            id="btn-escalate-case"
            type="button"
            onClick={() => onActionSelect('escalate')}
            className="p-3.5 text-left rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all cursor-pointer space-y-1 border border-slate-200"
          >
            <span className="text-xs font-black block">Escalate to Senior Officer</span>
            <span className="text-[11px] text-slate-600 block font-medium">Transfer to Section Officer</span>
          </button>
        </div>
      </div>
    </div>
  );
};
