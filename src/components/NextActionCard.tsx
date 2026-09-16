import React from 'react';
import { ArrowRight, Compass, HelpCircle, Upload, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NextActionCardProps {
  onActionButtonClick?: () => void;
}

export const NextActionCard: React.FC<NextActionCardProps> = ({ onActionButtonClick }) => {
  const { decisionExplanation, setCurrentRoute, decisionState } = useApp();
  const { nextBestAction } = decisionExplanation;

  const handleClick = () => {
    if (onActionButtonClick) {
      onActionButtonClick();
    } else if (nextBestAction.actionButtonRoute) {
      setCurrentRoute(nextBestAction.actionButtonRoute);
    }
  };

  const isSuccess = decisionState === 'SUFFICIENT TO PROCEED';
  const isConflict = decisionState === 'HUMAN REVIEW REQUIRED';

  return (
    <div
      id="next-action-card"
      className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-7 relative overflow-hidden card-premium-hover"
    >
      <div className="absolute top-0 right-0 w-44 h-44 bg-[#ECFEFF]/60 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-[#123B7A] text-white shadow-xs border border-[#06B6D4]/30">
            <Compass className="w-5 h-5 text-[#A5F3FC]" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-[#123B7A] block">
              Deterministic Guidance Engine
            </span>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              NEXT BEST ACTION
            </h3>
          </div>
        </div>

        <span className="text-xs font-bold text-[#03543F] bg-[#DEF7EC] px-3 py-1 rounded-full border border-[#31C48D]">
          Rule-Based Direction
        </span>
      </div>

      {/* Main Recommended Action Highlight */}
      <div className="p-5 rounded-2xl bg-[#F4F8FC] border border-slate-200/90 mb-6">
        <span className="text-xs font-black text-[#123B7A] uppercase tracking-wider block mb-1">
          Target Action
        </span>
        <p className="text-lg font-black text-slate-900">
          {nextBestAction.action}
        </p>
      </div>

      {/* 2-Column: WHY and WHAT HAPPENS NEXT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200">
          <span className="text-xs font-black uppercase tracking-wider text-[#6366F1] block mb-1.5 flex items-center gap-1">
            <span>WHY THIS IS REQUIRED</span>
          </span>
          <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
            {nextBestAction.why}
          </p>
        </div>

        <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200">
          <span className="text-xs font-black uppercase tracking-wider text-[#0E9F6E] block mb-1.5 flex items-center gap-1">
            <span>WHAT HAPPENS NEXT</span>
          </span>
          <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
            {nextBestAction.whatHappensNext}
          </p>
        </div>
      </div>

      {/* Interactive Action Button */}
      {nextBestAction.actionButtonText && (
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 font-medium">
            Take the recommended action to advance evaluation status:
          </span>
          <button
            id="btn-resolve-evidence-issue"
            onClick={handleClick}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 font-black text-sm px-6 py-3.5 rounded-xl transition-all shadow-md cursor-pointer ${
              isSuccess
                ? 'bg-[#0E9F6E] hover:bg-[#059669] text-white shadow-emerald-900/10'
                : isConflict
                ? 'bg-[#EF4444] hover:bg-[#DC2626] text-white shadow-red-900/10'
                : 'bg-[#123B7A] hover:bg-[#0B2247] text-white shadow-blue-900/15'
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : isConflict ? (
              <ShieldAlert className="w-4 h-4" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            <span>{nextBestAction.actionButtonText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
