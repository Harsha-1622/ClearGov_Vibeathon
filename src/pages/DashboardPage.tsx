import React from 'react';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Upload,
  Layers,
  Sparkles,
  Clock,
  ShieldCheck,
  TrendingUp,
  HelpCircle,
  Activity,
  FileCheck,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';
import { ApplicationHealthCard } from '../components/ApplicationHealthCard';
import { NextActionCard } from '../components/NextActionCard';
import { WhatIfSimulationCard } from '../components/WhatIfSimulationCard';
import { GovernmentSymbol } from '../components/GovernmentSymbol';

export const DashboardPage: React.FC = () => {
  const {
    scenario,
    establishedCount,
    totalCount,
    decisionState,
    setCurrentRoute,
    requirements,
    t,
    language,
  } = useApp();

  const applicant = scenario.applicant;
  const verifiedCount = scenario.evidence.filter((e) => e.status === 'VERIFIED').length;
  const missingCount = scenario.evidence.filter((e) => e.status === 'MISSING').length;

  const readinessPercent = Math.round((establishedCount / totalCount) * 100);

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-10 px-4 space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div className="flex items-start gap-4">
          <GovernmentSymbol size="md" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#123B7A] bg-[#E8EEF8] px-2.5 py-0.5 rounded-md border border-[#123B7A]/20">
                ClearGov • {t.caseDossier}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-semibold font-serif">
                {language === 'hi' ? 'भारत सरकार' : language === 'te' ? 'భారత ప్రభుత్వం' : 'Government of India'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mt-1 tracking-tight">
              {applicant.fullName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-medium">
              {language === 'hi'
                ? 'सत्यापन निश्चितता की निगरानी करें, दस्तावेजी अंतराल ट्रैक करें और स्वचालित निर्णयों की समीक्षा करें।'
                : language === 'te'
                ? 'ధృవీకరణ ఖచ్చితత్వాన్ని పర్యవేక్షించండి, పత్రాల లోపాలను ట్రాక్ చేయండి మరియు ఆటోమేటెడ్ నిర్ణయాలను సమీక్షించండి.'
                : 'Monitor verification certainty, track documentary gaps, and review automated decisions.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={() => setCurrentRoute('evidence')}
            className="inline-flex items-center gap-2 text-xs font-black bg-[#123B7A] hover:bg-[#0B2247] text-white px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-900/15 cursor-pointer"
          >
            <span>{t.btnProceedToEvidence}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top 4 Summary Cards (Section 3) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Application Status */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-2 card-premium-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              Dossier Status
            </span>
            <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" />
          </div>
          <div>
            <span className="text-sm font-black text-slate-900 line-clamp-1 block tracking-tight">
              {decisionState}
            </span>
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
              Deterministic rule state
            </span>
          </div>
        </div>

        {/* 2. Readiness */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-2 card-premium-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              Readiness
            </span>
            <span className="text-xs font-black text-[#123B7A]">{readinessPercent}%</span>
          </div>
          <div>
            <span className="text-xl font-black text-slate-900 block font-mono">
              {establishedCount} / {totalCount} Requirements
            </span>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
              <div
                className="bg-[#123B7A] h-full rounded-full transition-all duration-500"
                style={{ width: `${readinessPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* 3. Evidence */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-2 card-premium-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              Evidence Intake
            </span>
            <FileCheck className="w-4 h-4 text-[#0E9F6E]" />
          </div>
          <div>
            <span className="text-xl font-black text-slate-900 block font-mono">
              {verifiedCount} Verified, {missingCount} Missing
            </span>
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
              Total {scenario.evidence.length} documentary artifacts
            </span>
          </div>
        </div>

        {/* 4. Next Action */}
        <div
          onClick={() => setCurrentRoute(missingCount > 0 ? 'evidence' : 'decision')}
          className="bg-[#E8EEF8]/60 hover:bg-[#E8EEF8] border border-[#123B7A]/25 rounded-3xl p-5 shadow-sm space-y-2 cursor-pointer transition-all card-premium-hover"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-[#123B7A]">
              Recommended Step
            </span>
            <ArrowRight className="w-4 h-4 text-[#123B7A]" />
          </div>
          <div>
            <span className="text-sm font-black text-[#123B7A] line-clamp-1 block">
              {missingCount > 0 ? 'Upload Missing Certificate' : 'Review Formal Determination'}
            </span>
            <span className="text-[11px] text-[#123B7A]/80 font-bold block mt-0.5">
              Click to resolve gap →
            </span>
          </div>
        </div>
      </div>

      {/* Application Progress Journey (Horizontal desktop / Vertical mobile) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-5 card-premium-hover">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Application Lifecycle Workflow
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              End-to-end status progression from submission through human adjudication to disbursement
            </p>
          </div>
          <span className="text-xs font-black text-[#123B7A] bg-[#E8EEF8] px-3 py-1 rounded-full border border-[#123B7A]/20 self-start sm:self-auto">
            Active Phase: Verification & Rules
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5 pt-2">
          {/* Step 1: Info */}
          <div className="p-4.5 rounded-2xl border bg-[#DEF7EC]/30 border-[#31C48D]/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#03543F]">
                Phase 1
              </span>
              <CheckCircle2 className="w-4 h-4 text-[#0E9F6E]" />
            </div>
            <h4 className="text-xs font-black text-slate-900">Applicant Intake</h4>
            <p className="text-[11px] text-slate-600 font-medium">Personal & academic details completed</p>
          </div>

          {/* Step 2: Evidence */}
          <div className="p-4.5 rounded-2xl border bg-[#FEF3C7]/30 border-[#F59E0B]/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#92400E]">
                Phase 2
              </span>
              <AlertTriangle className="w-4 h-4 text-[#D97706]" />
            </div>
            <h4 className="text-xs font-black text-slate-900">Evidence Extraction</h4>
            <p className="text-[11px] text-slate-600 font-medium">{establishedCount} of {totalCount} proofs established</p>
          </div>

          {/* Step 3: Assessment */}
          <div className="p-4.5 rounded-2xl border bg-[#E8EEF8]/40 border-[#123B7A]/20 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#123B7A]">
                Phase 3
              </span>
              <Activity className="w-4 h-4 text-[#123B7A]" />
            </div>
            <h4 className="text-xs font-black text-slate-900">Rules Engine</h4>
            <p className="text-[11px] text-slate-600 font-medium">Deterministic criteria evaluation active</p>
          </div>

          {/* Step 4: Decision */}
          <div className="p-4.5 rounded-2xl border bg-slate-50 border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Phase 4
              </span>
              <Clock className="w-4 h-4 text-slate-400" />
            </div>
            <h4 className="text-xs font-black text-slate-900">Final Determination</h4>
            <p className="text-[11px] text-slate-500 font-medium">
              {decisionState === 'SUFFICIENT TO PROCEED' ? 'Ready for disbursement' : 'Awaiting evidence proofs'}
            </p>
          </div>
        </div>
      </div>

      {/* Application Health Card */}
      <ApplicationHealthCard />

      {/* 2-Column Section: What-If Simulation & Next Best Action */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WhatIfSimulationCard />
        <NextActionCard />
      </div>
    </div>
  );
};
