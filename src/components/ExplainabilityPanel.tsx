import React from 'react';
import { HelpCircle, FileCheck, AlertTriangle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ExplainabilityPanel: React.FC = () => {
  const { scenario, requirements, decisionState } = useApp();

  const reviewedDocs = scenario.evidence.filter((e) => e.status === 'VERIFIED');
  const missingDocs = scenario.evidence.filter((e) => e.status === 'MISSING');
  const problematicDocs = scenario.evidence.filter(
    (e) => e.status === 'CONFLICT' || e.status === 'UNREADABLE' || e.status === 'LOW CONFIDENCE'
  );

  const isSufficient = decisionState === 'SUFFICIENT TO PROCEED';

  return (
    <div
      id="explainability-panel"
      className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Explainability Panel
            </h3>
            <p className="text-xs text-slate-500">
              Deterministic rule trace: exactly why the system reached this evaluation
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 self-start sm:self-auto">
          Deterministic Logic Trace
        </span>
      </div>

      {/* 4 Step Pipeline Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* 1. Evidence Reviewed */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>1. Evidence Reviewed</span>
          </div>
          <div className="space-y-1.5 pt-1">
            {reviewedDocs.map((doc) => (
              <div key={doc.id} className="text-xs bg-white px-2.5 py-1.5 rounded-lg border border-slate-200/70 text-slate-800 font-medium truncate">
                ✓ {doc.name}
              </div>
            ))}
            {reviewedDocs.length === 0 && (
              <span className="text-xs text-slate-400 italic">None verified yet</span>
            )}
          </div>
        </div>

        {/* 2. Unmet / Missing Items */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>2. Missing / Deficient</span>
          </div>
          <div className="space-y-1.5 pt-1">
            {missingDocs.map((doc) => (
              <div key={doc.id} className="text-xs bg-amber-50/80 px-2.5 py-1.5 rounded-lg border border-amber-200 text-amber-900 font-semibold truncate">
                ⚠ {doc.name} (Missing)
              </div>
            ))}
            {problematicDocs.map((doc) => (
              <div key={doc.id} className="text-xs bg-rose-50/80 px-2.5 py-1.5 rounded-lg border border-rose-200 text-rose-900 font-semibold truncate">
                ✕ {doc.name} ({doc.status})
              </div>
            ))}
            {missingDocs.length === 0 && problematicDocs.length === 0 && (
              <div className="text-xs bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200 text-emerald-800 font-semibold">
                ✓ Zero missing proofs
              </div>
            )}
          </div>
        </div>

        {/* 3. Scheme Policy Logic */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>3. Scheme Policy Rule</span>
          </div>
          <p className="text-xs text-slate-700 font-medium leading-relaxed pt-1">
            "Under Public Scholarship Guideline §4.2, Family Income must be established via certified Revenue Authority proof (cap: ≤ ₹2,50,000/yr)."
          </p>
        </div>

        {/* 4. Synthesized Result */}
        <div className={`p-4 rounded-xl border space-y-2 ${
          isSufficient ? 'bg-emerald-50/70 border-emerald-300' : 'bg-amber-50/70 border-amber-300'
        }`}>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-800">
            <span>4. Rule Result</span>
          </div>
          <p className="text-xs font-semibold text-slate-900 leading-relaxed pt-1">
            {isSufficient
              ? 'All 5 statutory scheme conditions verified. File meets sufficient-to-proceed criteria.'
              : 'Family Income requirement cannot currently be established without authenticated Revenue Certificate.'}
          </p>
        </div>
      </div>
    </div>
  );
};
