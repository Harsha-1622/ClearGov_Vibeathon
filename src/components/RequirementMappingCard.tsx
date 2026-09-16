import React from 'react';
import { ArrowDown, ArrowRight, CheckCircle2, AlertTriangle, ShieldAlert, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RequirementMappingCard: React.FC = () => {
  const { requirements, scenario } = useApp();

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md card-premium-hover">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#E8EEF8] text-[#123B7A] flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-[#123B7A]" />
            </div>
            <span>Requirement Evidence Mapping Pipeline</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Deterministic linkage demonstrating how submitted artifacts establish statutory conditions
          </p>
        </div>
        <span className="text-xs font-bold text-[#123B7A] bg-[#E8EEF8] px-3 py-1 rounded-full border border-[#123B7A]/20">
          Deterministic Mapping Rule
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
        {requirements.map((req) => {
          const evItem = scenario.evidence.find((e) => e.requirementKey === req.key);
          const isVerified = evItem?.status === 'VERIFIED';
          const isMissing = evItem?.status === 'MISSING';
          const isConflict = evItem?.status === 'CONFLICT';
          const isUnreadable = evItem?.status === 'UNREADABLE';

          return (
            <div
              key={req.key}
              className={`rounded-2xl border p-4 flex flex-col justify-between transition-all duration-200 ${
                req.isEstablished
                  ? 'bg-[#DEF7EC]/30 border-[#31C48D]/50'
                  : isMissing
                  ? 'bg-[#FEF3C7]/30 border-[#F59E0B]/50'
                  : 'bg-[#FEE2E2]/30 border-[#EF4444]/50'
              }`}
            >
              {/* Step 1: Scheme Requirement */}
              <div className="text-center">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block mb-1">
                  Scheme Requirement
                </span>
                <h4 className="text-xs font-black text-slate-900 leading-tight min-h-[32px] flex items-center justify-center">
                  {req.label}
                </h4>
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center my-2 text-slate-400">
                <ArrowDown className="w-3.5 h-3.5 text-slate-400" />
              </div>

              {/* Step 2: Evidence Document */}
              <div className="bg-white border border-slate-200 rounded-xl p-2.5 text-center shadow-2xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                  Linked Document
                </span>
                <span className="text-xs font-bold text-slate-800 line-clamp-1 block" title={req.evidenceName}>
                  {req.evidenceName}
                </span>
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center my-2 text-slate-400">
                <ArrowDown className="w-3.5 h-3.5 text-slate-400" />
              </div>

              {/* Step 3: Document Status & Confidence */}
              <div className="text-center py-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                  Extraction Output
                </span>
                <div className="text-xs font-bold font-mono">
                  {isVerified && (
                    <span className="text-[#03543F]">Verified — {evItem?.confidence}%</span>
                  )}
                  {isMissing && <span className="text-[#92400E]">Missing</span>}
                  {isConflict && <span className="text-[#991B1B]">Conflict ({evItem?.confidence}%)</span>}
                  {isUnreadable && <span className="text-[#4338CA]">Unreadable ({evItem?.confidence}%)</span>}
                </div>
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center my-2 text-slate-400">
                <ArrowDown className="w-3.5 h-3.5 text-slate-400" />
              </div>

              {/* Step 4: Requirement Established / Not Established */}
              <div
                className={`p-2.5 rounded-xl text-center font-black text-xs flex items-center justify-center gap-1.5 ${
                  req.isEstablished
                    ? 'bg-[#DEF7EC] text-[#03543F] border border-[#31C48D]'
                    : 'bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B]'
                }`}
              >
                {req.isEstablished ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0E9F6E]" />
                    <span>Established</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Not Established</span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
