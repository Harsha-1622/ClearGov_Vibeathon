import React from 'react';
import { ShieldCheck, Info, FileCheck, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EvidenceQualityCard: React.FC = () => {
  const { scenario, establishedCount, totalCount } = useApp();

  // Deterministic calculation of quality dimensions based on current scenario evidence
  const metrics = React.useMemo(() => {
    const completeness = Math.round((establishedCount / totalCount) * 100);
    
    // Clarity is based on confidence of submitted items
    const submitted = scenario.evidence.filter((e) => e.status !== 'MISSING');
    const clarity = submitted.length > 0
      ? Math.round(submitted.reduce((acc, curr) => acc + curr.confidence, 0) / submitted.length)
      : 50;

    // Consistency is penalized if conflict exists
    const hasConflict = scenario.evidence.some((e) => e.status === 'CONFLICT') || (scenario.conflict && !scenario.conflict.resolved);
    const consistency = hasConflict ? 68 : 100;

    // Confidence: verified documents average
    const verifiedItems = scenario.evidence.filter((e) => e.status === 'VERIFIED');
    const confidence = verifiedItems.length > 0
      ? Math.round(verifiedItems.reduce((acc, curr) => acc + curr.confidence, 0) / verifiedItems.length)
      : 60;

    // Overall weighted score
    const overall = Math.round(completeness * 0.35 + clarity * 0.25 + consistency * 0.25 + confidence * 0.15);

    let explanation = '';
    if (completeness === 100 && consistency === 100) {
      explanation = 'All documents authenticated with high clarity and complete cross-record consistency.';
    } else if (hasConflict) {
      explanation = 'Optical extraction is clear, but cross-document record conflict was detected in Date of Birth.';
    } else if (scenario.evidence.some((e) => e.status === 'UNREADABLE')) {
      explanation = 'Optical intake quality failed minimum resolution requirements on submitted certificate.';
    } else {
      explanation = 'Evidence quality is high across submitted records, but one required document is still missing.';
    }

    return { completeness, clarity, consistency, confidence, overall, explanation };
  }, [scenario, establishedCount, totalCount]);

  return (
    <div
      id="evidence-quality-score-card"
      className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-6 card-premium-hover"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#E8EEF8] text-[#123B7A] flex items-center justify-center font-bold border border-[#123B7A]/20">
            <ShieldCheck className="w-5 h-5 text-[#123B7A]" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Evidence Quality & Integrity Index
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Multi-dimensional evaluation of document integrity, readability, and cross-record consistency
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="text-right">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none font-mono">
              {metrics.overall}%
            </span>
            <span className="block text-[10px] font-black uppercase tracking-wider text-[#123B7A] mt-0.5">
              Composite Index
            </span>
          </div>
          <div className="w-2.5 h-10 rounded-full bg-slate-100 overflow-hidden flex flex-col justify-end">
            <div
              className={`w-full transition-all duration-500 rounded-full ${
                metrics.overall >= 85 ? 'bg-[#0E9F6E]' : metrics.overall >= 70 ? 'bg-[#F59E0B]' : 'bg-[#EF4444]'
              }`}
              style={{ height: `${metrics.overall}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4 Dimension Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Completeness */}
        <div className="bg-[#F4F8FC] p-4 rounded-2xl border border-slate-200/90 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Completeness</span>
            <span className="font-black text-slate-900 font-mono">{metrics.completeness}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#123B7A] h-full rounded-full transition-all duration-500"
              style={{ width: `${metrics.completeness}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-500 font-medium block">
            {establishedCount} of {totalCount} criteria satisfied
          </span>
        </div>

        {/* Clarity / Legibility */}
        <div className="bg-[#F4F8FC] p-4 rounded-2xl border border-slate-200/90 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Clarity & OCR</span>
            <span className="font-black text-slate-900 font-mono">{metrics.clarity}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                metrics.clarity >= 80 ? 'bg-[#0E9F6E]' : 'bg-[#6366F1]'
              }`}
              style={{ width: `${metrics.clarity}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-500 font-medium block">
            Optical scan resolution and legibility
          </span>
        </div>

        {/* Consistency */}
        <div className="bg-[#F4F8FC] p-4 rounded-2xl border border-slate-200/90 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Consistency</span>
            <span className="font-black text-slate-900 font-mono">{metrics.consistency}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                metrics.consistency === 100 ? 'bg-[#0E9F6E]' : 'bg-[#EF4444]'
              }`}
              style={{ width: `${metrics.consistency}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-500 font-medium block">
            Cross-record field matching
          </span>
        </div>

        {/* Confidence */}
        <div className="bg-[#F4F8FC] p-4 rounded-2xl border border-slate-200/90 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Confidence</span>
            <span className="font-black text-slate-900 font-mono">{metrics.confidence}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#06B6D4] h-full rounded-full transition-all duration-500"
              style={{ width: `${metrics.confidence}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-500 font-medium block">
            Issuing authority verification certainty
          </span>
        </div>
      </div>

      {/* Explanation & Prototype Notice */}
      <div className="p-4 bg-[#E8EEF8]/60 border border-[#123B7A]/20 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-slate-800 font-medium">
          <Info className="w-4 h-4 text-[#123B7A] shrink-0" />
          <span>{metrics.explanation}</span>
        </div>
        <span className="text-[10px] font-bold text-[#123B7A] shrink-0 uppercase tracking-wider">
          Evidence Audit Index • Deterministic Output
        </span>
      </div>
    </div>
  );
};
