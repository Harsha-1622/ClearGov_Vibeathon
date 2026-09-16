import React from 'react';
import {
  ArrowRight,
  FileCheck,
  CheckSquare,
  Scale,
  UserCheck,
  Cpu,
  Layers,
  Sparkles,
  HelpCircle,
  FileSearch,
  FileText,
  AlertTriangle,
  Compass,
  CheckCircle2,
  ShieldAlert,
  Search,
  Zap,
  Landmark,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INITIAL_SCENARIOS } from '../data/mockData';
import { GovernmentSymbol } from '../components/GovernmentSymbol';

export const LandingPage: React.FC = () => {
  const { setCurrentRoute, setActiveScenarioId, activeScenarioId, t, language } = useApp();

  const handleStartApplication = () => {
    setActiveScenarioId('ananya');
    setCurrentRoute('services');
  };

  const handleViewDemo = () => {
    setActiveScenarioId('ananya');
    setCurrentRoute('decision');
  };

  const handleSelectDemo = (id: string) => {
    setActiveScenarioId(id);
    setCurrentRoute('decision');
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Premium Civic Hero Section with Background Gradient & Civic Pattern */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B2247] via-[#123B7A] to-[#0E7490] text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#06B6D4]/20">
        {/* Ambient background glowing orbs & grid */}
        <div className="absolute inset-0 opacity-15 pointer-events-none civic-pattern-grid" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#06B6D4]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-[#6366F1]/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          {/* Official Government Seal & Motto */}
          <div className="flex justify-center pt-2">
            <div className="p-3.5 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl inline-flex flex-col items-center">
              <GovernmentSymbol size="lg" showMotto={true} />
            </div>
          </div>

          {/* Civic Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#A5F3FC] text-xs font-bold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
            <Landmark className="w-3.5 h-3.5 text-[#FDE68A]" />
            <span className="font-serif font-black">{t.govPortal}</span>
            <span className="text-white/40">•</span>
            <span className="text-white/90">{t.stateEmblemTitle}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-4xl mx-auto drop-shadow-sm">
            {t.heroTitle}
          </h1>

          {/* Core Product Thesis */}
          <div className="max-w-3xl mx-auto py-2">
            <p className="text-xl sm:text-2xl font-extrabold text-[#E0F2FE] tracking-tight leading-snug">
              {t.heroThesis}
            </p>
            <p className="mt-3 text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal">
              {t.heroSubtitle}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              id="btn-hero-start-application"
              onClick={handleStartApplication}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 font-extrabold text-sm sm:text-base bg-[#0E9F6E] hover:bg-[#059669] text-white px-8 py-3.5 rounded-2xl transition-all shadow-lg shadow-emerald-950/20 hover:scale-[1.02] cursor-pointer"
            >
              <span>{t.btnStartApplication}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="btn-hero-view-demo"
              onClick={handleViewDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold text-sm sm:text-base bg-white/10 hover:bg-white/15 text-white border border-white/30 backdrop-blur-md px-7 py-3.5 rounded-2xl transition-all hover:border-white/50 cursor-pointer"
            >
              <span>{t.btnViewDecision}</span>
            </button>
          </div>


          {/* Quick Metrics Ticker */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-[#A5F3FC] block">Architecture</span>
              <span className="text-xs font-black text-white">100% Deterministic</span>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-[#A5F3FC] block">AI Engine</span>
              <span className="text-xs font-black text-white">Rule Decomposition</span>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-[#A5F3FC] block">Safety Mechanism</span>
              <span className="text-xs font-black text-white">Human-in-the-Loop</span>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-[#A5F3FC] block">Auditability</span>
              <span className="text-xs font-black text-white">Tamper-Evident Trail</span>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PRODUCT INTELLIGENCE PIPELINE (THE 7 STEPS) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#EEF2FF] rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] border border-[#6366F1]/30 text-[#4F46E5] text-xs font-black mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>CORE INTELLIGENCE ARCHITECTURE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              The Transparent Evidence-to-Decision Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              How ClearGov deterministically moves from citizen service selection to explainable decision and next action.
            </p>
          </div>

          {/* 7-Step Interactive Pipeline Flow */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-2.5 relative">
            {[
              {
                step: '01',
                title: 'User Selects Service',
                description: 'Citizen chooses student scholarship scheme',
                badge: 'Input',
                icon: <FileSearch className="w-4 h-4 text-[#123B7A]" />,
                color: 'border-[#123B7A]/30 bg-[#F4F8FC]',
                badgeColor: 'bg-[#123B7A]/10 text-[#123B7A]',
              },
              {
                step: '02',
                title: 'AI Analyzes Requirements',
                description: 'Deconstructs policy gazette into legal criteria',
                badge: 'AI Engine',
                icon: <Sparkles className="w-4 h-4 text-[#6366F1]" />,
                color: 'border-[#6366F1]/40 bg-[#EEF2FF]/60',
                badgeColor: 'bg-[#6366F1]/15 text-[#4F46E5]',
              },
              {
                step: '03',
                title: 'Required Docs Identified',
                description: 'Maps 5 mandatory proofs needed for evaluation',
                badge: 'Criteria',
                icon: <FileText className="w-4 h-4 text-[#06B6D4]" />,
                color: 'border-[#06B6D4]/40 bg-[#ECFEFF]/60',
                badgeColor: 'bg-[#06B6D4]/15 text-[#0891B2]',
              },
              {
                step: '04',
                title: 'Compare with Submitted Proofs',
                description: 'OCR optical analysis & cross-field integrity check',
                badge: 'Verification',
                icon: <FileCheck className="w-4 h-4 text-[#123B7A]" />,
                color: 'border-slate-200 bg-white',
                badgeColor: 'bg-slate-100 text-slate-700',
              },
              {
                step: '05',
                title: 'Missing Docs Detected',
                description: 'Flags unverified, expired or unreadable scans',
                badge: 'Safety Alert',
                icon: <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />,
                color: 'border-[#F59E0B]/40 bg-[#FEF3C7]/40',
                badgeColor: 'bg-[#F59E0B]/20 text-[#B45309]',
              },
              {
                step: '06',
                title: 'Explain Why Required',
                description: 'Cites exact statutory clause (§4.2 Income Cap)',
                badge: 'Explainability',
                icon: <HelpCircle className="w-4 h-4 text-[#6366F1]" />,
                color: 'border-[#6366F1]/40 bg-[#EEF2FF]/60',
                badgeColor: 'bg-[#6366F1]/15 text-[#4F46E5]',
              },
              {
                step: '07',
                title: 'Show Next Action',
                description: 'Prescribes precise 1-click corrective resolution',
                badge: 'Direction',
                icon: <Compass className="w-4 h-4 text-[#0E9F6E]" />,
                color: 'border-[#0E9F6E]/40 bg-[#DEF7EC]/60',
                badgeColor: 'bg-[#0E9F6E]/15 text-[#03543F]',
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-2 card-premium-hover ${item.color}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[10px] font-mono font-black text-slate-400">
                      STAGE {item.step}
                    </span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-white shadow-2xs inline-block mb-2">
                    {item.icon}
                  </div>
                  <h3 className="text-xs font-black text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <ShieldAlert className="w-4 h-4 text-[#EF4444] shrink-0" />
              <span>
                <strong>Human-in-the-loop:</strong> If OCR quality is below threshold or cross-record discrepancies emerge, automated decisions pause and route to caseworker review.
              </span>
            </div>
            <button
              onClick={() => setCurrentRoute('reviewer')}
              className="text-[#123B7A] font-bold hover:underline shrink-0 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Inspect Reviewer Queue</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* QUICK SCENARIOS TESTBED (FOR HACKATHON JUDGES) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-[#F4F8FC] border border-slate-200 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#123B7A]">
                Evaluator Test Suite
              </span>
              <h3 className="text-xl font-black text-slate-900">
                Test Curated Civic Edge-Cases with One Click
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Simulate different applicant conditions to observe how ClearGov adapts deterministically.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200 self-start">
              Select any case below
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.values(INITIAL_SCENARIOS).map((sc) => {
              const isCurrent = sc.id === activeScenarioId;
              return (
                <button
                  key={sc.id}
                  onClick={() => handleSelectDemo(sc.id)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-200 bg-white flex flex-col justify-between space-y-3 cursor-pointer ${
                    isCurrent
                      ? 'border-[#123B7A] ring-2 ring-[#123B7A]/20 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-sm font-black text-slate-900">{sc.applicantName}</span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {sc.badgeText}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-snug">
                      {sc.scenarioDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#123B7A]">
                    <span>{isCurrent ? 'Current Scenario' : 'Run Scenario'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3 Premium Feature Highlights */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Evidence Intelligence */}
          <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-xs card-premium-hover relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center mb-5 shadow-2xs border border-[#6366F1]/20">
              <FileCheck className="w-6 h-6 text-[#6366F1]" />
            </div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#6366F1] block mb-1">
              Deep Extraction
            </span>
            <h3 className="text-lg font-black text-slate-900 mb-2">
              Evidence Intelligence
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Every document is evaluated for optical clarity, cryptographic seals, expiration dates, and cross-record consistency before decisions are determined.
            </p>
          </div>

          {/* Card 2: Explainable Decisions */}
          <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-xs card-premium-hover relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-[#DEF7EC] text-[#0E9F6E] flex items-center justify-center mb-5 shadow-2xs border border-[#0E9F6E]/20">
              <Scale className="w-6 h-6 text-[#0E9F6E]" />
            </div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0E9F6E] block mb-1">
              Zero Black-Box
            </span>
            <h3 className="text-lg font-black text-slate-900 mb-2">
              Explainable Decisions
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              ClearGov generates unambiguous audit trails explaining what has been established, what remains unmet, the underlying legal clause, and the immediate next step.
            </p>
          </div>

          {/* Card 3: Human Review */}
          <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-xs card-premium-hover relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-[#ECFEFF] text-[#06B6D4] flex items-center justify-center mb-5 shadow-2xs border border-[#06B6D4]/20">
              <UserCheck className="w-6 h-6 text-[#0891B2]" />
            </div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0891B2] block mb-1">
              Caseworker Guardrails
            </span>
            <h3 className="text-lg font-black text-slate-900 mb-2">
              Human-in-the-Loop Review
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              When conflicting records (like Aadhaar vs. application DOB) or degraded scans emerge, ClearGov flags the case with side-by-side evidence diffs for caseworker adjudication.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

