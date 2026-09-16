import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  subLabel?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  label = 'Application Readiness',
  subLabel,
}) => {
  const percentage = Math.min(100, Math.round((current / total) * 100));

  const getColor = () => {
    if (percentage === 100) return 'bg-emerald-600';
    if (percentage >= 80) return 'bg-amber-500';
    return 'bg-blue-600';
  };

  return (
    <div className="w-full bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {label}
          </span>
          <h4 className="text-lg font-bold text-slate-900">
            {current} / {total} Requirements Established
          </h4>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-slate-800">{percentage}%</span>
          <span className="block text-xs font-medium text-slate-500">
            {percentage === 100 ? 'Ready for Decision' : 'Assessment In Progress'}
          </span>
        </div>
      </div>

      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200/70">
        <div
          className={`h-full transition-all duration-500 rounded-full ${getColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {subLabel && (
        <p className="mt-2 text-xs text-slate-600 leading-relaxed">
          {subLabel}
        </p>
      )}
    </div>
  );
};
