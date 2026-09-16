import React from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, ShieldAlert, FileQuestion } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SmartEvidenceInsights: React.FC = () => {
  const { scenario, requirements, establishedCount, totalCount } = useApp();

  const insights = React.useMemo(() => {
    const list: { type: 'success' | 'warning' | 'danger' | 'info'; text: string }[] = [];

    // Verified count
    const verifiedCount = scenario.evidence.filter((e) => e.status === 'VERIFIED').length;
    if (verifiedCount > 0) {
      list.push({
        type: 'success',
        text: `${verifiedCount} required evidence items are verified by authoritative signatures or institutional seals.`,
      });
    }

    // Missing count
    const missingCount = scenario.evidence.filter((e) => e.status === 'MISSING').length;
    if (missingCount > 0) {
      list.push({
        type: 'warning',
        text: `${missingCount} required evidence item is missing (${scenario.evidence.find(e => e.status === 'MISSING')?.name || 'Required Certificate'}).`,
      });
    }

    // Conflict check
    const hasConflict = scenario.evidence.some((e) => e.status === 'CONFLICT') || (scenario.conflict && !scenario.conflict.resolved);
    if (hasConflict) {
      list.push({
        type: 'danger',
        text: 'Cross-document discrepancy detected between self-declared application form and government identity record.',
      });
    } else if (verifiedCount > 0) {
      list.push({
        type: 'success',
        text: 'No conflicts detected across verified evidence records.',
      });
    }

    // Unreadable check
    const unreadable = scenario.evidence.find((e) => e.status === 'UNREADABLE');
    if (unreadable) {
      list.push({
        type: 'warning',
        text: `Submitted ${unreadable.name} optical scan exhibits low confidence (${unreadable.confidence}%) and cannot be verified automatically.`,
      });
    }

    // Unmet requirements
    const unmet = requirements.filter((r) => !r.isEstablished);
    if (unmet.length > 0) {
      list.push({
        type: 'warning',
        text: `${unmet.map((u) => u.label).join(' and ')} cannot currently be established.`,
      });
    } else {
      list.push({
        type: 'success',
        text: 'All 5 configured prototype requirements have established supporting evidence.',
      });
    }

    return list;
  }, [scenario, requirements]);

  return (
    <div
      id="smart-evidence-insights-card"
      className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-md space-y-4 card-premium-hover"
    >
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center font-bold border border-[#6366F1]/20">
            <Sparkles className="w-5 h-5 text-[#6366F1]" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 tracking-tight">
              Statutory Evidence Synthesis
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Deterministic rule synthesis from document intake and OCR trace
            </p>
          </div>
        </div>

        <span className="text-[11px] font-black text-[#4F46E5] bg-[#EEF2FF] px-3 py-1 rounded-full border border-[#6366F1]/30">
          Rule-Driven Logic
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {insights.map((insight, index) => {
          const isSuccess = insight.type === 'success';
          const isWarning = insight.type === 'warning';
          const isDanger = insight.type === 'danger';

          return (
            <div
              key={index}
              className={`p-3.5 rounded-2xl border flex items-start gap-3 text-xs transition-colors ${
                isSuccess
                  ? 'bg-[#DEF7EC]/50 border-[#31C48D]/40 text-[#03543F]'
                  : isWarning
                  ? 'bg-[#FEF3C7]/50 border-[#F59E0B]/40 text-[#92400E]'
                  : 'bg-[#FEE2E2]/50 border-[#EF4444]/40 text-[#991B1B]'
              }`}
            >
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-[#0E9F6E] shrink-0 mt-0.5" />}
              {isWarning && <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />}
              {isDanger && <ShieldAlert className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />}
              <span className="font-semibold leading-relaxed">{insight.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
