import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  FileQuestion,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Info,
  Clock,
  Check,
  X,
  Sparkles,
  FileCheck2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from './StatusBadge';
import { GovernmentSymbol } from './GovernmentSymbol';

interface DecisionCardProps {
  onResolveIssueClick?: () => void;
}

export const DecisionCard: React.FC<DecisionCardProps> = ({ onResolveIssueClick }) => {
  const { decisionState, decisionExplanation, scenario, requirements, t } = useApp();

  const isSufficient = decisionState === 'SUFFICIENT TO PROCEED';
  const isAdditionalEvidence = decisionState === 'ADDITIONAL EVIDENCE REQUIRED';
  const isHumanReview = decisionState === 'HUMAN REVIEW REQUIRED';
  const isConditionFailed = decisionState === 'CONDITION NOT SATISFIED';

  // Subheading based on state
  const subHeading = isSufficient
    ? 'All 5 configured prototype requirements have verified supporting evidence.'
    : isAdditionalEvidence
    ? 'Your application needs one more item before assessment can be completed.'
    : isHumanReview
    ? 'Automated processing paused: discrepancies require human caseworker determination.'
    : 'Evidence verified, but scheme qualification threshold condition was not met.';

  return (
    <div className="space-y-6">
      {/* Primary Centered Decision Hero Card */}
      <div
        id="decision-hero-card"
        className={`rounded-3xl border-2 p-6 sm:p-9 bg-white shadow-md transition-all duration-300 relative overflow-hidden ${
          isSufficient
            ? 'border-[#31C48D] bg-gradient-to-b from-[#DEF7EC]/50 via-white to-white'
            : isAdditionalEvidence
            ? 'border-[#F59E0B] bg-gradient-to-b from-[#FEF3C7]/50 via-white to-white'
            : isHumanReview
            ? 'border-[#EF4444] bg-gradient-to-b from-[#FEE2E2]/50 via-white to-white'
            : 'border-[#FB923C] bg-gradient-to-b from-[#FFF7ED]/50 via-white to-white'
        }`}
      >
        {/* Top institutional ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            <GovernmentSymbol size="sm" />
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#123B7A] block">
                ClearGov Deterministic Decision Synthesis
              </span>
              <span className="text-[10px] font-mono font-bold text-slate-500">
                Official Statutory Determination • Ref: {scenario.applicant.applicationId}
              </span>
            </div>
          </div>

          <StatusBadge status={decisionState} size="lg" />
        </div>

        {/* Large Prominent Hero Header */}
        <div className="py-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
              isSufficient
                ? 'bg-[#0E9F6E] text-white'
                : isAdditionalEvidence
                ? 'bg-[#F59E0B] text-white'
                : isHumanReview
                ? 'bg-[#EF4444] text-white'
                : 'bg-[#EA580C] text-white'
            }`}
          >
            {isSufficient && <ShieldCheck className="w-9 h-9 sm:w-11 sm:h-11" />}
            {isAdditionalEvidence && <AlertTriangle className="w-9 h-9 sm:w-11 sm:h-11" />}
            {isHumanReview && <ShieldAlert className="w-9 h-9 sm:w-11 sm:h-11" />}
            {isConditionFailed && <X className="w-9 h-9 sm:w-11 sm:h-11 stroke-[3]" />}
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {decisionExplanation.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl">
              {subHeading}
            </p>
          </div>
        </div>

        {/* Two Structured Columns: What We Established vs What We Could Not Establish */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
          {/* Column 1: What We Established */}
          <div className="bg-[#F4F8FC] border border-slate-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#DEF7EC] text-[#03543F] flex items-center justify-center font-bold">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <h3 className="text-sm font-black text-slate-900">
                  What We Established
                </h3>
              </div>
              <span className="text-xs font-black text-[#03543F] bg-[#DEF7EC] px-2.5 py-0.5 rounded-full border border-[#31C48D]">
                {requirements.filter((r) => r.isEstablished).length} Verified
              </span>
            </div>

            <div className="space-y-2.5">
              {requirements
                .filter((r) => r.isEstablished)
                .map((req) => (
                  <div
                    key={req.key}
                    className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#0E9F6E] shrink-0" />
                        <span className="text-xs font-bold text-slate-900">
                          {req.label}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-[#03543F] bg-[#DEF7EC] px-2 py-0.5 rounded-full border border-[#31C48D]">
                        Established
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 pl-6 leading-relaxed">
                      Source: <span className="font-semibold text-slate-800">{req.evidenceName}</span> ({req.statusNote})
                    </p>
                  </div>
                ))}

              {requirements.filter((r) => r.isEstablished).length === 0 && (
                <p className="text-xs text-slate-500 italic p-4 text-center">
                  No requirements currently verified.
                </p>
              )}
            </div>
          </div>

          {/* Column 2: What We Could Not Establish */}
          <div className="bg-[#F4F8FC] border border-slate-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#FEF3C7] text-[#92400E] flex items-center justify-center font-bold">
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm font-black text-slate-900">
                  What We Could Not Establish
                </h3>
              </div>
              <span className="text-xs font-black text-[#92400E] bg-[#FEF3C7] px-2.5 py-0.5 rounded-full border border-[#F59E0B]">
                {requirements.filter((r) => !r.isEstablished).length} Attention
              </span>
            </div>

            <div className="space-y-2.5">
              {requirements
                .filter((r) => !r.isEstablished)
                .map((req) => (
                  <div
                    key={req.key}
                    className="p-3 bg-white rounded-xl border border-amber-200/90 shadow-2xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0" />
                        <span className="text-xs font-bold text-slate-900">
                          {req.label}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-[#92400E] bg-[#FEF3C7] px-2 py-0.5 rounded-full border border-[#F59E0B]">
                        Not Established
                      </span>
                    </div>
                    <div className="pl-6 text-[11px] text-slate-700 space-y-0.5">
                      <p className="font-medium">
                        <strong className="text-slate-900 font-semibold">Reason:</strong> {req.statusNote}
                      </p>
                    </div>
                  </div>
                ))}

              {requirements.filter((r) => !r.isEstablished).length === 0 && (
                <div className="p-4 bg-[#DEF7EC]/80 border border-[#31C48D] rounded-xl text-center space-y-1">
                  <CheckCircle2 className="w-6 h-6 text-[#0E9F6E] mx-auto" />
                  <p className="text-xs font-bold text-[#03543F]">
                    Zero Unmet Requirements
                  </p>
                  <p className="text-[11px] text-[#046C4E]">
                    All 5 prototype criteria have established supporting evidence.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Explainability Block: Why? & Can Proceed? */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <div className="p-4 rounded-2xl bg-[#EEF2FF]/60 border border-[#6366F1]/30 text-xs">
            <span className="font-black text-[#4F46E5] uppercase tracking-wider block mb-1">
              Why is the application in this state?
            </span>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">
              "{decisionExplanation.whyCurrentState}"
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F4F8FC] border border-slate-200 text-xs">
            <span className="font-black text-[#123B7A] uppercase tracking-wider block mb-1">
              Can the application proceed?
            </span>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">
              "{decisionExplanation.canProceedText}"
            </p>
          </div>
        </div>

        {/* Civic-Tech Prototype Disclaimer */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>ClearGov Deterministic Engine • Explainable rule evaluation without external black-box models</span>
          </span>
          <span className="font-semibold text-slate-700">
            {isSufficient ? 'Ready for caseworker batch distribution' : 'Awaiting required applicant or reviewer step'}
          </span>
        </div>
      </div>
    </div>
  );
};
