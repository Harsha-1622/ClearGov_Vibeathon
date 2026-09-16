import React, { useState } from 'react';
import {
  CheckSquare,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Upload,
  RefreshCw,
  Scale,
  Layers,
  HardDrive,
  Info,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProgressBar } from '../components/ProgressBar';
import { StatusBadge } from '../components/StatusBadge';
import { UploadModal } from '../components/UploadModal';
import { ExplainabilityPanel } from '../components/ExplainabilityPanel';
import { GovernmentSymbol } from '../components/GovernmentSymbol';
import { EvidenceItem } from '../types';

export const AssessmentPage: React.FC = () => {
  const {
    scenario,
    requirements,
    establishedCount,
    totalCount,
    setCurrentRoute,
    uploadSimulatedEvidence,
    addToast,
    t,
    language,
  } = useApp();

  const [uploadModalItem, setUploadModalItem] = useState<EvidenceItem | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isReassessing, setIsReassessing] = useState(false);

  const missingOrProblemItem = scenario.evidence.find(
    (e) => e.status === 'MISSING' || e.status === 'UNREADABLE'
  );

  const handleManualReassess = () => {
    setIsReassessing(true);
    setTimeout(() => {
      setIsReassessing(false);
      addToast(
        'Assessment Evaluated',
        `${establishedCount} of ${totalCount} requirements established with active deterministic policy rules.`,
        'info'
      );
    }, 400);
  };

  const handleUploadSuccess = (evidenceId: string, customFileName?: string) => {
    uploadSimulatedEvidence(evidenceId, customFileName);
  };

  // Percentage established
  const readinessPercent = Math.round((establishedCount / totalCount) * 100);

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-10 px-4 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div className="flex items-start gap-3.5">
          <GovernmentSymbol size="md" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#123B7A] bg-[#E8EEF8] px-2.5 py-0.5 rounded-md border border-[#123B7A]/20">
                ClearGov Deterministic Evaluation
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-semibold font-serif">
                {language === 'hi' ? 'भारत सरकार' : language === 'te' ? 'భారత ప్రభుత్వం' : 'Government of India'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mt-1.5 tracking-tight">
              Assessment & Criteria Engine
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1 font-medium">
              <span>
                Applicant: <strong className="font-bold text-slate-900">{scenario.applicant.fullName}</strong>
              </span>
              <span>•</span>
              <span>
                Dossier ID: <strong className="font-mono font-bold text-[#123B7A] bg-blue-50 px-2 py-0.5 rounded-md">{scenario.applicant.applicationId}</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            id="btn-reassess"
            type="button"
            disabled={isReassessing}
            onClick={handleManualReassess}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isReassessing ? 'animate-spin' : ''}`} />
            <span>Re-evaluate</span>
          </button>

          <button
            id="btn-view-decision"
            type="button"
            onClick={() => setCurrentRoute('decision')}
            className="inline-flex items-center gap-2 text-xs font-black bg-[#123B7A] hover:bg-[#0B2247] text-white px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-900/15 cursor-pointer"
          >
            <span>Decision Center</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Large Application Readiness Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-5 card-premium-hover">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-[#123B7A] bg-[#E8EEF8] px-2.5 py-0.5 rounded-md border border-[#123B7A]/20">
              Statutory Qualification Meter
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">
              Application Readiness Index: {readinessPercent}%
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {establishedCount} of {totalCount} statutory conditions conclusively satisfied by verified evidence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl font-black text-[#123B7A] font-mono">
              {establishedCount} <span className="text-slate-300 text-2xl font-normal">/</span> {totalCount}
            </span>
            <span className="text-xs font-black text-slate-600 uppercase tracking-wider">
              Criteria
            </span>
          </div>
        </div>

        {/* Big Progress Gauge */}
        <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              readinessPercent === 100
                ? 'bg-[#0E9F6E]'
                : readinessPercent >= 60
                ? 'bg-[#123B7A]'
                : 'bg-[#F59E0B]'
            }`}
            style={{ width: `${readinessPercent}%` }}
          />
        </div>
      </div>

      {/* Scheme Eligibility Requirements Grid with Confidence */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-5 card-premium-hover">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Statutory Qualification Criteria Checklist
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Each criteria requirement is evaluated independently against verified artifacts with cryptographic audit logging
            </p>
          </div>
          <span className="text-xs font-bold text-[#123B7A] bg-[#E8EEF8] px-3.5 py-1 rounded-full border border-[#123B7A]/20 self-start sm:self-auto">
            5 Statutory Criteria
          </span>
        </div>

        <div className="space-y-3 pt-1">
          {requirements.map((req) => {
            const evItem = scenario.evidence.find((e) => e.requirementKey === req.key);
            const confidence = evItem?.confidence || 0;

            return (
              <div
                key={req.key}
                className={`p-4.5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                  req.isEstablished
                    ? 'bg-[#DEF7EC]/30 border-[#31C48D]/40 hover:bg-[#DEF7EC]/40'
                    : 'bg-[#FEF3C7]/30 border-[#F59E0B]/40 hover:bg-[#FEF3C7]/45'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold ${
                      req.isEstablished
                        ? 'bg-[#DEF7EC] text-[#03543F] border border-[#31C48D]/50'
                        : 'bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B]/50'
                    }`}
                  >
                    {req.isEstablished ? (
                      <CheckCircle2 className="w-5 h-5 text-[#0E9F6E]" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-[#D97706]" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-black text-slate-900">
                        {req.label}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        — {req.evidenceName}
                      </span>
                      {req.isEstablished && confidence > 0 && (
                        <span className="text-[10px] font-black text-[#03543F] bg-[#DEF7EC] px-2.5 py-0.5 rounded-md border border-[#31C48D]/40 font-mono">
                          {confidence}% Conf
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {req.statusNote}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                  {req.isEstablished ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#03543F] bg-[#DEF7EC] border border-[#31C48D] px-3.5 py-1.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0E9F6E]" />
                      <span>Established</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#92400E] bg-[#FEF3C7] border border-[#F59E0B] px-3.5 py-1.5 rounded-full">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>Action Required</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Explainability Panel (Section 10) */}
      <ExplainabilityPanel />

      {/* Quick Action: Bottom Proceed */}
      <div className="flex justify-end pt-3">
        <button
          id="btn-bottom-view-decision"
          onClick={() => setCurrentRoute('decision')}
          className="inline-flex items-center gap-2 font-black text-xs bg-[#123B7A] hover:bg-[#0B2247] text-white px-7 py-3.5 rounded-2xl transition-all shadow-md shadow-blue-900/15 cursor-pointer"
        >
          <span>Proceed to Decision Center</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

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
