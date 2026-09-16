import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, AlertTriangle, Upload, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WhatIfSimulationCard: React.FC = () => {
  const { decisionState, uploadSimulatedEvidence, resetCurrentScenario, establishedCount, totalCount, t } = useApp();

  const isAlreadySufficient = decisionState === 'SUFFICIENT TO PROCEED';

  return (
    <div
      id="what-if-simulation-card"
      className="bg-gradient-to-br from-[#0B2247] via-[#123B7A] to-[#184D9C] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-[#06B6D4]/30"
    >
      {/* Background Accent Graphics */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-56 h-56 rounded-full bg-[#06B6D4]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-8 w-56 h-56 rounded-full bg-[#6366F1]/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/15">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/20 text-[#A5F3FC] border border-[#06B6D4]/40 flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-black tracking-wider text-[#A5F3FC]">
                  {t.simBadge}
                </span>
                <span className="text-white/40">•</span>
                <span className="text-[10px] text-white/70 font-mono">{t.simSubtitle}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black tracking-tight text-white">
                {t.simTitle}
              </h3>
            </div>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-[#A5F3FC] border border-white/20 self-start sm:self-auto backdrop-blur-md">
            {isAlreadySufficient ? t.simActiveBadge : t.simSandboxBadge}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl font-medium">
          {t.simDesc}
        </p>

        {/* Before vs After Comparison Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Current State */}
          <div className="bg-white/10 border border-white/15 rounded-2xl p-4.5 backdrop-blur-md">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#A5F3FC] block mb-1">
              {t.simCurrentEval}
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-white font-mono">
                {establishedCount} / {totalCount}
              </span>
              <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1 bg-amber-900/30 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                {decisionState}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-2 font-medium">
              {establishedCount < totalCount ? t.statusAdditionalEvidence : t.statusSufficient}
            </p>
          </div>

          {/* Simulated Projected State */}
          <div className="bg-[#0E9F6E]/20 border border-[#31C48D]/40 rounded-2xl p-4.5 backdrop-blur-md">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#A7F3D0] block mb-1">
              {t.simProjected}
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-white font-mono">
                5 / 5
              </span>
              <span className="text-[11px] font-bold text-emerald-300 flex items-center gap-1 bg-emerald-900/30 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {t.statusSufficient}
              </span>
            </div>
            <p className="text-[11px] text-emerald-100 mt-2 font-medium">
              {t.phase4DescReady}
            </p>
          </div>
        </div>

        {/* Action Trigger */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-slate-300 font-medium">
            {t.simDesc.slice(0, 70)}...
          </span>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {isAlreadySufficient ? (
              <button
                id="btn-reset-simulation"
                type="button"
                onClick={resetCurrentScenario}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-black text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t.simBtnRevert}</span>
              </button>
            ) : (
              <button
                id="btn-simulate-upload-now"
                type="button"
                onClick={() => uploadSimulatedEvidence('ev-income-cert', 'Simulated_Income_Certificate_Verified.pdf')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-black text-slate-900 bg-[#06B6D4] hover:bg-[#22D3EE] shadow-lg shadow-cyan-950/20 transition-all cursor-pointer hover:scale-[1.02]"
              >
                <Upload className="w-4 h-4 text-slate-900" />
                <span>{t.simBtnSimulate}</span>
                <ArrowRight className="w-4 h-4 text-slate-900" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
