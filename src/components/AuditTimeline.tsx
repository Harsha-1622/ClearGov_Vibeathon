import React from 'react';
import { History, Clock, User, Cpu, ShieldCheck, CheckCircle2, Shield } from 'lucide-react';
import { AuditEvent } from '../types';

interface AuditTimelineProps {
  events: AuditEvent[];
  title?: string;
}

export const AuditTimeline: React.FC<AuditTimelineProps> = ({
  events,
  title = 'Application Verification Audit Trail',
}) => {
  const getActorBadge = (actor: AuditEvent['actor']) => {
    switch (actor) {
      case 'Applicant':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
            <User className="w-3 h-3 text-slate-500" />
            <span>Applicant</span>
          </span>
        );
      case 'System Assessment':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
            <Cpu className="w-3 h-3 text-blue-600" />
            <span>Deterministic Engine</span>
          </span>
        );
      case 'Caseworker Reviewer':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Caseworker Reviewer</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900 tracking-tight">{title}</h4>
            <p className="text-[11px] text-slate-500">Tamper-evident, explainable audit record</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
            {events.length} Sealed Audit Entries
          </span>
        </div>
      </div>

      <div className="relative pl-6 space-y-4 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {events.map((evt) => (
          <div key={evt.id} className="relative group">
            {/* Timeline marker */}
            <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full border-2 border-white bg-blue-700 shadow-2xs ring-2 ring-slate-100" />

            <div className="bg-slate-50/80 hover:bg-slate-50 border border-slate-200/80 rounded-xl p-4 transition-colors space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{evt.event}</span>
                  {evt.tag && (
                    <span className="text-[10px] uppercase font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                      {evt.tag}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {getActorBadge(evt.actor)}
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{evt.timestamp}</span>
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {evt.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
