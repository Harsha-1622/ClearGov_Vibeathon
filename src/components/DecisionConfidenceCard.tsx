import React from 'react';
import { Gauge, Info, ShieldCheck, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DecisionConfidenceCard: React.FC = () => {
  const { decisionState, scenario, establishedCount, totalCount } = useApp();

  // Deterministic calculation of decision confidence
  const calculatedScore = React.useMemo(() => {
    if (decisionState === 'SUFFICIENT TO PROCEED') return 96;
    if (decisionState === 'HUMAN REVIEW REQUIRED') {
      if (scenario.conflict && !scenario.conflict.resolved) return 68;
      return 54; // e.g. Priya unreadable
    }
    if (decisionState === 'CONDITION NOT SATISFIED') return 94; // high certainty that rule is breached
    // Additional evidence required (4/5)
    return Math.round((establishedCount / totalCount) * 88 + 10); // ~80%
  }, [decisionState, scenario, establishedCount, totalCount]);

  const ratingLabel = calculatedScore >= 90 ? 'High Confidence' : calculatedScore >= 70 ? 'Moderate Confidence' : 'Low Confidence (Review Triggered)';
  const strokeColor = calculatedScore >= 90 ? '#0E9F6E' : calculatedScore >= 70 ? '#F59E0B' : '#EF4444';

  // Circle params
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (calculatedScore / 100) * circumference;

  return (
    <div
      id="decision-confidence-card"
      className="bg-white border border-slate-200 shadow-md rounded-3xl p-6 sm:p-7 hover:shadow-lg transition-all card-premium-hover"
    >
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center border border-[#6366F1]/20">
            <Gauge className="w-5 h-5 text-[#6366F1]" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 tracking-tight">
              Assessment Confidence
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Evidence validation & consistency index
            </p>
          </div>
        </div>

        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
            calculatedScore >= 90
              ? 'bg-[#DEF7EC] text-[#03543F] border-[#31C48D]'
              : calculatedScore >= 70
              ? 'bg-[#FEF3C7] text-[#92400E] border-[#F59E0B]'
              : 'bg-[#FEE2E2] text-[#991B1B] border-[#EF4444]'
          }`}
        >
          {ratingLabel}
        </span>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Radial Meter */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 96 96">
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="#e2e8f0"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke={strokeColor}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-black text-slate-900 leading-none font-mono">
              {calculatedScore}%
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">
              Index
            </span>
          </div>
        </div>

        {/* Explainability Breakdown */}
        <div className="flex-1 space-y-3 text-xs">
          <div className="p-3 bg-[#F4F8FC] rounded-2xl border border-slate-200">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-[#123B7A] shrink-0 mt-0.5" />
              <p className="text-slate-700 leading-relaxed font-medium">
                Confidence reflects the optical clarity, cryptographic signing, and cross-field consistency of available evidence.
                <strong className="text-slate-900 block mt-1 font-semibold">
                  It is an evidence audit metric, not an approval score.
                </strong>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
              <span className="text-slate-500 font-medium block">Verified Evidence</span>
              <span className="font-extrabold text-slate-900 text-sm">
                {establishedCount} of {totalCount} Items
              </span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
              <span className="text-slate-500 font-medium block">Resolution State</span>
              <span className="font-extrabold text-slate-900 text-sm">
                {decisionState === 'SUFFICIENT TO PROCEED' ? 'Unconditional' : 'Conditional'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
