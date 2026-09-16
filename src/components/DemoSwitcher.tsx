import React, { useState } from 'react';
import { ChevronDown, RefreshCw, Users, ShieldAlert, CheckCircle2, FileQuestion, XCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INITIAL_SCENARIOS } from '../data/mockData';

export const DemoSwitcher: React.FC = () => {
  const {
    activeScenarioId,
    setActiveScenarioId,
    scenario,
    resetCurrentScenario,
  } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const scenarioList = Object.values(INITIAL_SCENARIOS);

  const getScenarioIcon = (id: string) => {
    switch (id) {
      case 'ananya':
        return <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />;
      case 'rahul':
        return <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />;
      case 'priya':
        return <FileQuestion className="w-3.5 h-3.5 text-purple-600" />;
      case 'arjun':
        return <XCircle className="w-3.5 h-3.5 text-orange-600" />;
      default:
        return <Users className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center gap-1.5 bg-slate-100/90 hover:bg-slate-200/80 p-1 rounded-xl border border-slate-300/80 transition-colors">
        <button
          id="btn-demo-scenario-trigger"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-bold text-slate-800 focus:outline-none"
        >
          <span className="flex items-center gap-1.5 text-slate-500 font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Demo Applicant:</span>
          </span>
          <span className="font-extrabold text-blue-900 flex items-center gap-1">
            {getScenarioIcon(scenario.id)}
            <span>{scenario.applicantName}</span>
          </span>
          <span className="text-[10px] hidden md:inline-block bg-white text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 font-medium">
            {scenario.badgeText}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
        </button>

        <button
          id="btn-reset-scenario"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            resetCurrentScenario();
          }}
          title="Reset active applicant to initial demo state"
          className="p-1 text-slate-500 hover:text-slate-900 hover:bg-white rounded-lg transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div
            id="demo-switcher-dropdown"
            className="absolute right-0 mt-2 w-80 rounded-2xl bg-white shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
          >
            <div className="px-3.5 py-2 border-b border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Select Hackathon Demo Scenario
              </span>
              <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-bold">
                Deterministic
              </span>
            </div>

            <div className="p-1 space-y-1">
              {scenarioList.map((sc) => {
                const isSelected = sc.id === activeScenarioId;
                return (
                  <button
                    key={sc.id}
                    id={`demo-select-${sc.id}`}
                    type="button"
                    onClick={() => {
                      setActiveScenarioId(sc.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-blue-50/90 border border-blue-200 text-blue-950 font-semibold shadow-2xs'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">{getScenarioIcon(sc.id)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-slate-900">{sc.applicantName}</span>
                        <span className="text-[10px] font-medium text-slate-500 bg-white border border-slate-200 px-1 rounded">
                          {sc.badgeText}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug mt-1 line-clamp-2">
                        {sc.scenarioDescription}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
