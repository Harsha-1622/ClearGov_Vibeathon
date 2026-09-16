import React from 'react';
import {
  GraduationCap,
  ArrowRight,
  Shield,
  FileCheck2,
  Users,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GovernmentSymbol } from '../components/GovernmentSymbol';
import { INITIAL_SCENARIOS } from '../data/mockData';

export const ServiceSelectPage: React.FC = () => {
  const { setCurrentRoute, setActiveScenarioId, activeScenarioId, t, language } = useApp();

  const handleContinuePrimary = () => {
    setCurrentRoute('applicant');
  };

  const handleSelectDemo = (id: string) => {
    setActiveScenarioId(id);
    setCurrentRoute('applicant');
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 px-4 space-y-8">
      <div className="flex items-start gap-4">
        <GovernmentSymbol size="md" />
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#123B7A] bg-[#E8EEF8] px-2.5 py-0.5 rounded-md border border-[#123B7A]/20">
              Public Assistance Gateway
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-semibold font-serif">
              {language === 'hi' ? 'भारत सरकार' : language === 'te' ? 'భారత ప్రభుత్వం' : 'Government of India'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mt-1.5 tracking-tight">
            Select Statutory Program
          </h2>
          <p className="text-sm text-slate-600 mt-1 font-medium max-w-2xl">
            Choose an authorized public assistance scheme to initialize rule-based criteria and evidence extraction pipelines.
          </p>
        </div>
      </div>

      {/* Primary Scholarship Scenario Card */}
      <div className="bg-white rounded-3xl border border-[#123B7A]/30 p-6 sm:p-8 shadow-md card-premium-hover relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8EEF8]/40 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 relative">
          <div className="flex items-start gap-4">
            <div className="p-4 rounded-2xl bg-[#E8EEF8] text-[#123B7A] shrink-0 border border-[#123B7A]/20">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  Higher Education Student Scholarship
                </h3>
                <span className="text-xs font-black bg-[#DEF7EC] text-[#03543F] px-3 py-0.5 rounded-full border border-[#31C48D]/40">
                  Active Scheme • FY 2026
                </span>
              </div>
              <p className="text-sm text-slate-700 font-medium leading-relaxed max-w-xl">
                "Determine whether the submitted documents and academic records reliably establish economic need and merit thresholds."
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-500 font-semibold">
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg text-slate-700 border border-slate-200">
                  Merit: ≥ 75.0% Aggregate
                </span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg text-slate-700 border border-slate-200">
                  Income: ≤ ₹2,50,000 / yr
                </span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg text-slate-700 border border-slate-200">
                  5 Verification Artifacts
                </span>
              </div>
            </div>
          </div>

          <button
            id="btn-continue-service"
            onClick={handleContinuePrimary}
            className="inline-flex items-center justify-center gap-2 font-black text-xs bg-[#123B7A] hover:bg-[#0B2247] text-white px-6 py-3.5 rounded-2xl transition-all shadow-md shadow-blue-900/15 shrink-0 cursor-pointer"
          >
            <span>Proceed with Program</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Load Demo Scenarios Section */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#E8EEF8] text-[#123B7A] flex items-center justify-center font-bold">
              <Users className="w-4 h-4 text-[#123B7A]" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900">
                Or Load Benchmark Case Studies
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                Simulated case dossiers designed to test edge conditions and decision explainability
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-[#123B7A] bg-[#E8EEF8] px-2.5 py-1 rounded-lg border border-[#123B7A]/20">
            4 Interactive Cases
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {Object.values(INITIAL_SCENARIOS).map((demo) => (
            <button
              key={demo.id}
              onClick={() => handleSelectDemo(demo.id)}
              className={`text-left p-4.5 rounded-2xl border transition-all flex flex-col justify-between bg-[#F8FAFC] hover:bg-white hover:border-[#123B7A] hover:shadow-sm cursor-pointer card-premium-hover ${
                demo.id === activeScenarioId
                  ? 'border-[#123B7A] ring-2 ring-[#123B7A]/20 bg-white'
                  : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="font-black text-slate-900 text-sm">
                    {demo.applicantName}
                  </span>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700 font-mono">
                    {demo.badgeText}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {demo.scenarioDescription}
                </p>
              </div>
              <div className="mt-3.5 pt-2.5 border-t border-slate-200/80 text-xs font-black text-[#123B7A] flex items-center justify-between">
                <span>Load Case Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
