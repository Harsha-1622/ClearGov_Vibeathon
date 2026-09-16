import React from 'react';
import { Landmark } from 'lucide-react';

interface GovernmentSymbolProps {
  size?: 'sm' | 'md' | 'lg';
  showMotto?: boolean;
  className?: string;
}

export const GovernmentSymbol: React.FC<GovernmentSymbolProps> = ({
  size = 'md',
  showMotto = false,
  className = '',
}) => {
  if (size === 'sm') {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        {/* Compact Official Government Emblem Medallion */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B2247] via-[#123B7A] to-[#0A3266] text-white flex items-center justify-center shadow-md shadow-blue-950/20 border-2 border-[#F59E0B]/80 relative overflow-hidden group">
          {/* Subtle Tricolor Accent Top-Right */}
          <div className="absolute top-0 right-0 w-3 h-3 overflow-hidden">
            <div className="w-full h-1 bg-[#F97316]" />
            <div className="w-full h-1 bg-white" />
            <div className="w-full h-1 bg-[#10B981]" />
          </div>

          {/* Inner Golden Ring */}
          <div className="absolute inset-0.5 rounded-[9px] border border-[#F59E0B]/30 pointer-events-none" />

          {/* Government Emblem: Landmark Colonnade */}
          <Landmark className="w-5 h-5 text-[#FDE68A] drop-shadow-sm transition-transform group-hover:scale-105" />
        </div>
      </div>
    );
  }

  if (size === 'lg') {
    return (
      <div className={`flex flex-col items-center text-center space-y-2.5 ${className}`}>
        {/* Prestigious National Government Seal */}
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-b from-[#0B2247] via-[#123B7A] to-[#082042] p-1 shadow-xl shadow-blue-950/30 border-2 border-[#D97706] flex items-center justify-center">
          {/* Outer Ring with circular dots */}
          <div className="absolute inset-1 rounded-full border border-dashed border-[#F59E0B]/50 pointer-events-none" />
          
          {/* Inner Circular Core */}
          <div className="w-full h-full rounded-full bg-[#0E2F60] flex flex-col items-center justify-center relative overflow-hidden border border-[#F59E0B]/40">
            {/* Tricolor Ribbon Motif */}
            <div className="absolute top-2 flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
            </div>

            <Landmark className="w-9 h-9 text-[#FCD34D] mt-1.5 drop-shadow" />
            
            {/* National emblem circular rosette dot */}
            <div className="w-2 h-2 rounded-full border border-[#FDE68A] bg-[#D97706]/80 mt-1 shadow-xs" />
          </div>
        </div>

        {showMotto && (
          <div className="space-y-0.5">
            <span className="text-[11px] font-black text-[#123B7A] uppercase tracking-widest block font-serif">
              सत्यमेव जयते
            </span>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
              Government of India • Civic Public Services
            </span>
          </div>
        )}
      </div>
    );
  }

  // Default: 'md' size
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Official Government Seal Insignia */}
      <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0B2247] via-[#123B7A] to-[#0B254D] text-white flex items-center justify-center shadow-md shadow-blue-950/25 border-2 border-[#D97706] shrink-0 overflow-hidden group">
        {/* Tricolor Corner Ribbon */}
        <div className="absolute top-0 right-0 w-3.5 h-3.5 flex flex-col pointer-events-none">
          <div className="h-1 bg-[#EA580C] w-full" />
          <div className="h-1 bg-white w-full" />
          <div className="h-1 bg-[#059669] w-full" />
        </div>

        {/* Dual Ring Inner Border */}
        <div className="absolute inset-0.5 rounded-xl border border-[#F59E0B]/30 pointer-events-none" />

        {/* Government Landmark Symbol */}
        <Landmark className="w-6 h-6 text-[#FDE68A] transition-transform group-hover:scale-110 drop-shadow-sm" />
      </div>

      {showMotto && (
        <div className="flex flex-col text-left leading-tight">
          <span className="text-[10px] font-black text-[#123B7A] uppercase tracking-wider font-serif">
            सत्यमेव जयते
          </span>
          <span className="text-[9px] font-semibold text-slate-500">
            Government of India
          </span>
        </div>
      )}
    </div>
  );
};
