import React from 'react';
import { Activity, ShieldCheck, CheckCircle2, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ApplicationHealthCard: React.FC = () => {
  const { scenario, establishedCount, totalCount, decisionState, t } = useApp();

  const health = React.useMemo(() => {
    const completeness = Math.round((establishedCount / totalCount) * 100);

    const hasConflict = scenario.evidence.some((e) => e.status === 'CONFLICT') || (scenario.conflict && !scenario.conflict.resolved);
    const consistency = hasConflict ? 68 : 100;

    const submitted = scenario.evidence.filter((e) => e.status !== 'MISSING');
    const evidenceQuality = submitted.length > 0
      ? Math.round(submitted.reduce((acc, curr) => acc + curr.confidence, 0) / submitted.length)
      : 50;

    const reviewReadiness = decisionState === 'SUFFICIENT TO PROCEED' ? 100 : Math.round((completeness * 0.6) + (consistency * 0.4));

    return {
      completeness,
      evidenceQuality,
      consistency,
      reviewReadiness,
    };
  }, [scenario, establishedCount, totalCount, decisionState]);

  return (
    <div
      id="application-health-card"
      className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              {t.healthTitle}
            </h3>
            <p className="text-xs text-slate-500">
              {t.healthSubtitle}
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
          {t.healthGood}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Completeness */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">{t.healthCompleteness}</span>
            <span className="font-extrabold text-slate-900">{health.completeness}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${health.completeness}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-500 block">
            {t.healthCompletenessDesc} ({establishedCount}/{totalCount})
          </span>
        </div>

        {/* 2. Evidence Quality */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">{t.healthQuality}</span>
            <span className="font-extrabold text-slate-900">{health.evidenceQuality}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                health.evidenceQuality >= 80 ? 'bg-emerald-600' : 'bg-amber-500'
              }`}
              style={{ width: `${health.evidenceQuality}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-500 block">
            {t.healthQualityDesc}
          </span>
        </div>

        {/* 3. Consistency */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">{t.healthConsistency}</span>
            <span className="font-extrabold text-slate-900">{health.consistency}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                health.consistency === 100 ? 'bg-emerald-600' : 'bg-rose-500'
              }`}
              style={{ width: `${health.consistency}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-500 block">
            {t.healthConsistencyDesc}
          </span>
        </div>

        {/* 4. Review Readiness */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">{t.healthReadiness}</span>
            <span className="font-extrabold text-slate-900">{health.reviewReadiness}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-teal-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${health.reviewReadiness}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-500 block">
            {t.healthReadinessDesc}
          </span>
        </div>
      </div>
    </div>
  );
};
