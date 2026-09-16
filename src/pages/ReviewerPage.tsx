import React, { useState, useMemo } from 'react';
import {
  UserCheck,
  ShieldAlert,
  AlertTriangle,
  FileText,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Search,
  Layers,
  Clock,
  Send,
  Eye,
  FileQuestion,
  Scale,
  RefreshCw,
  Upload,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';
import { AuditTimeline } from '../components/AuditTimeline';
import { ConflictAnalysisCard } from '../components/ConflictAnalysisCard';
import { GovernmentSymbol } from '../components/GovernmentSymbol';
import { INITIAL_SCENARIOS } from '../data/mockData';

type QueueFilter = 'ALL' | 'HUMAN_REVIEW' | 'ADDITIONAL_EVIDENCE' | 'RESOLVED';

export const ReviewerPage: React.FC = () => {
  const {
    scenario,
    activeScenarioId,
    setActiveScenarioId,
    resolveConflict,
    decisionState,
    setCurrentRoute,
    uploadSimulatedEvidence,
    addToast,
    t,
    language,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [queueFilter, setQueueFilter] = useState<QueueFilter>('ALL');
  const [caseworkerNotes, setCaseworkerNotes] = useState<string>('');

  const handleSelectCase = (id: string) => {
    setActiveScenarioId(id);
  };

  const handleConflictAction = (
    choice: 'confirm_app' | 'confirm_doc' | 'request_evidence' | 'escalate'
  ) => {
    resolveConflict(choice, caseworkerNotes);
    setCaseworkerNotes('');
  };

  const queueItems = useMemo(() => {
    const list = [
      {
        id: 'rahul',
        name: 'Rahul Kumar',
        applicationId: 'CG-2026-7215',
        scheme: 'Student Scholarship',
        issue: 'DOB Discrepancy (Form vs Aadhaar)',
        confidence: '68%',
        priority: 'HIGH PRIORITY',
        priorityVariant: 'danger' as const,
        status: scenario.id === 'rahul' && scenario.conflict?.resolved ? 'RESOLVED' : 'HUMAN REVIEW REQUIRED',
        category: 'HUMAN_REVIEW' as const,
      },
      {
        id: 'priya',
        name: 'Priya Sharma',
        applicationId: 'CG-2026-4401',
        scheme: 'Student Scholarship',
        issue: 'Unreadable Income Cert (Blur Scan)',
        confidence: '42%',
        priority: 'HIGH PRIORITY',
        priorityVariant: 'purple' as const,
        status: 'HUMAN REVIEW REQUIRED',
        category: 'HUMAN_REVIEW' as const,
      },
      {
        id: 'ananya',
        name: 'Ananya Rao',
        applicationId: 'CG-2026-8941',
        scheme: 'Student Scholarship',
        issue: 'Missing Revenue Income Certificate',
        confidence: '0%',
        priority: 'MEDIUM PRIORITY',
        priorityVariant: 'warning' as const,
        status: scenario.id === 'ananya' && scenario.evidence.every((e) => e.status === 'VERIFIED') ? 'SUFFICIENT TO PROCEED' : 'ADDITIONAL EVIDENCE REQUIRED',
        category: 'ADDITIONAL_EVIDENCE' as const,
      },
      {
        id: 'arjun',
        name: 'Arjun Mehta',
        applicationId: 'CG-2026-9104',
        scheme: 'Student Scholarship',
        issue: 'Income Threshold Exceeded (₹4.2L > ₹2.5L)',
        confidence: '95%',
        priority: 'LOW PRIORITY',
        priorityVariant: 'info' as const,
        status: 'CONDITION NOT SATISFIED',
        category: 'RESOLVED' as const,
      },
    ];

    return list.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.applicationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.issue.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (queueFilter === 'ALL') return true;
      if (queueFilter === 'HUMAN_REVIEW') return item.category === 'HUMAN_REVIEW';
      if (queueFilter === 'ADDITIONAL_EVIDENCE') return item.category === 'ADDITIONAL_EVIDENCE';
      if (queueFilter === 'RESOLVED') return item.status === 'RESOLVED' || item.status === 'SUFFICIENT TO PROCEED';
      return true;
    });
  }, [searchQuery, queueFilter, scenario]);

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-10 px-4 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div className="flex items-start gap-3.5">
          <GovernmentSymbol size="md" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#123B7A] bg-[#E8EEF8] px-2.5 py-0.5 rounded-md border border-[#123B7A]/20">
                ClearGov Adjudication Console
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-semibold font-serif">
                {language === 'hi' ? 'भारत सरकार' : language === 'te' ? 'భారత ప్రభుత్వం' : 'Government of India'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mt-1.5 tracking-tight">
              Reviewer & Adjudication Workspace
            </h1>
            <p className="text-sm text-slate-600 mt-1 font-medium">
              Human-in-the-loop oversight to resolve evidence conflicts, low-confidence scans, and threshold anomalies.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={() => setCurrentRoute('decision')}
            className="inline-flex items-center gap-2 text-xs font-black bg-[#123B7A] hover:bg-[#0B2247] text-white px-4.5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-900/15 cursor-pointer"
          >
            <span>Decision Center</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top Metric Cards: Pending Review, Additional Evidence, Resolved Today */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-1.5 card-premium-hover">
          <span className="text-xs font-black uppercase tracking-wider text-[#991B1B] block">
            Adjudication Required
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">2</span>
            <span className="text-xs font-black text-[#991B1B] bg-[#FEE2E2] px-2.5 py-0.5 rounded-full border border-[#EF4444]/30">High Priority</span>
          </div>
          <p className="text-xs text-slate-500 font-medium">Discrepancies & unreadable optical scans</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-1.5 card-premium-hover">
          <span className="text-xs font-black uppercase tracking-wider text-[#92400E] block">
            Awaiting Evidence
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">1</span>
            <span className="text-xs font-black text-[#92400E] bg-[#FEF3C7] px-2.5 py-0.5 rounded-full border border-[#F59E0B]/30">Awaiting Upload</span>
          </div>
          <p className="text-xs text-slate-500 font-medium">Missing mandatory income certificate</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-1.5 card-premium-hover">
          <span className="text-xs font-black uppercase tracking-wider text-[#03543F] block">
            Resolved & Sealed Today
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">3</span>
            <span className="text-xs font-black text-[#03543F] bg-[#DEF7EC] px-2.5 py-0.5 rounded-full border border-[#31C48D]/30">Caseworker Verified</span>
          </div>
          <p className="text-xs text-slate-500 font-medium">Sealed in cryptographic audit trail</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
          <input
            id="input-search-queue"
            type="text"
            placeholder="Search applicants, ID, or discrepancy..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#123B7A] font-medium"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200 text-xs w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setQueueFilter('ALL')}
            className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-all ${
              queueFilter === 'ALL'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Cases ({queueItems.length})
          </button>
          <button
            onClick={() => setQueueFilter('HUMAN_REVIEW')}
            className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-all ${
              queueFilter === 'HUMAN_REVIEW'
                ? 'bg-[#EF4444] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Human Review
          </button>
          <button
            onClick={() => setQueueFilter('ADDITIONAL_EVIDENCE')}
            className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-all ${
              queueFilter === 'ADDITIONAL_EVIDENCE'
                ? 'bg-[#F59E0B] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Additional Evidence
          </button>
          <button
            onClick={() => setQueueFilter('RESOLVED')}
            className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-all ${
              queueFilter === 'RESOLVED'
                ? 'bg-[#0E9F6E] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Resolved
          </button>
        </div>
      </div>

      {/* Review Queue Cards Grid with Priority Indicators */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
          Caseworker Review Queue ({queueItems.length} Cases)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {queueItems.map((item) => {
            const isSelected = scenario.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleSelectCase(item.id)}
                className={`p-4.5 rounded-3xl border transition-all cursor-pointer bg-white space-y-3 card-premium-hover ${
                  isSelected
                    ? 'border-[#123B7A] ring-2 ring-[#123B7A]/20 shadow-md'
                    : 'border-slate-200/90 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-slate-900 text-sm tracking-tight">{item.name}</span>
                  <span
                    className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                      item.priorityVariant === 'danger'
                        ? 'bg-[#FEE2E2] text-[#991B1B] border-[#EF4444]/30'
                        : item.priorityVariant === 'purple'
                        ? 'bg-[#EEF2FF] text-[#4F46E5] border-[#6366F1]/30'
                        : item.priorityVariant === 'warning'
                        ? 'bg-[#FEF3C7] text-[#92400E] border-[#F59E0B]/30'
                        : 'bg-blue-50 text-[#123B7A] border-blue-200'
                    }`}
                  >
                    {item.priority}
                  </span>
                </div>

                <div className="text-xs text-slate-600 font-medium">
                  <span className="font-mono font-bold text-slate-400 block text-[11px]">{item.applicationId}</span>
                  <span className="text-slate-800 font-bold block mt-1 line-clamp-1">{item.issue}</span>
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-mono font-semibold">Conf: {item.confidence}</span>
                  <span className={`text-[11px] font-black ${isSelected ? 'text-[#123B7A]' : 'text-slate-600'}`}>
                    {isSelected ? 'Active File' : 'Adjudicate →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Case Detailed Inspection & Decision Workspace */}
      <div className="bg-[#F8FAFC] border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#123B7A] bg-[#E8EEF8] px-2.5 py-0.5 rounded-md border border-[#123B7A]/20">
              Active Case File Adjudication
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">
              Case #{scenario.applicant.applicationId}: {scenario.applicant.fullName}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Statutory Scheme: Higher Education Scholarship • Registered: {scenario.applicant.submissionDate}
            </p>
          </div>

          <StatusBadge status={decisionState} size="lg" />
        </div>

        {/* If Rahul Kumar: Show Conflict Analysis Card */}
        {scenario.conflict && (
          <ConflictAnalysisCard
            onActionSelect={handleConflictAction}
            isResolved={scenario.conflict.resolved}
          />
        )}

        {/* If Priya Sharma (Unreadable Scan) */}
        {scenario.id === 'priya' && (
          <div className="bg-white border-2 border-purple-300 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-purple-900 font-bold">
              <FileQuestion className="w-5 h-5 text-purple-600" />
              <h3 className="text-base font-black">Optical Extraction Below Intake Threshold</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              The submitted Revenue Certificate has an optical quality confidence score of <strong>42%</strong> due to optical blur and low resolution. ClearGov safety gates halt automatic acceptance to prevent erroneous qualification.
            </p>
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500">Simulate applicant submitting clean scan:</span>
              <button
                onClick={() => uploadSimulatedEvidence('ev-income-cert', 'Income_Certificate_Clear_Scan_Verified.pdf')}
                className="inline-flex items-center gap-2 text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Clear 300DPI Scan</span>
              </button>
            </div>
          </div>
        )}

        {/* If Arjun Mehta (Condition Not Met) */}
        {scenario.incomeThresholdConfig && scenario.incomeThresholdConfig.actualIncome > scenario.incomeThresholdConfig.threshold && (
          <div className="bg-white border-2 border-orange-300 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-orange-900 font-bold">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <h3 className="text-base font-black">Statutory Economic Cap Rule Evaluation</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Submitted revenue certificate is fully verified (95% confidence). However, certified annual family income (<strong>₹4,20,000</strong>) exceeds scheme ceiling (<strong>₹2,50,000</strong>). File is legally ineligible for this need-based program.
            </p>
          </div>
        )}

        {/* Caseworker Optional Note Input */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
            Caseworker Hearing & Rationale Notes
          </label>
          <textarea
            id="textarea-caseworker-notes"
            rows={2}
            value={caseworkerNotes}
            onChange={(e) => setCaseworkerNotes(e.target.value)}
            placeholder="Add case determination notes (will be sealed in the tamper-evident audit trail)..."
            className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>

        {/* Case Audit Trail */}
        <AuditTimeline
          events={scenario.auditTrail}
          title="Case Activity & Human-in-the-Loop Audit Trail"
        />
      </div>
    </div>
  );
};
