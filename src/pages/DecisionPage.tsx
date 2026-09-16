import React, { useState } from 'react';
import {
  Scale,
  ArrowRight,
  Upload,
  RefreshCw,
  FileCheck2,
  AlertCircle,
  CheckCircle2,
  Shield,
  Clock,
  History,
  FileText,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DecisionCard } from '../components/DecisionCard';
import { NextActionCard } from '../components/NextActionCard';
import { DecisionConfidenceCard } from '../components/DecisionConfidenceCard';
import { WhatIfSimulationCard } from '../components/WhatIfSimulationCard';
import { AuditTimeline } from '../components/AuditTimeline';
import { UploadModal } from '../components/UploadModal';
import { GovernmentSymbol } from '../components/GovernmentSymbol';
import { EvidenceItem } from '../types';

export const DecisionPage: React.FC = () => {
  const {
    scenario,
    decisionState,
    setCurrentRoute,
    uploadSimulatedEvidence,
    resetCurrentScenario,
    t,
    language,
  } = useApp();

  const [uploadModalItem, setUploadModalItem] = useState<EvidenceItem | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const missingItem = scenario.evidence.find(
    (e) => e.status === 'MISSING' || e.status === 'UNREADABLE'
  );

  const handleResolveIssue = () => {
    if (missingItem) {
      setUploadModalItem(missingItem);
      setIsUploadOpen(true);
    } else if (decisionState === 'HUMAN REVIEW REQUIRED') {
      setCurrentRoute('reviewer');
    } else {
      setCurrentRoute('evidence');
    }
  };

  const handleUploadSuccess = (evidenceId: string, customFileName?: string) => {
    uploadSimulatedEvidence(evidenceId, customFileName);
  };

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-10 px-4 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div className="flex items-start gap-3.5">
          <GovernmentSymbol size="md" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#123B7A] bg-[#E8EEF8] px-2.5 py-0.5 rounded-md border border-[#123B7A]/20">
                ClearGov Decision Center
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-semibold font-serif">
                {language === 'hi' ? 'भारत सरकार' : language === 'te' ? 'భారత ప్రభుత్వం' : 'Government of India'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mt-1.5 tracking-tight">
              Decision Assessment Center
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1 font-medium">
              <span>
                Applicant: <strong className="font-bold text-slate-900">{scenario.applicant.fullName}</strong>
              </span>
              <span>•</span>
              <span>
                Dossier ID: <strong className="font-mono font-bold text-[#123B7A] bg-blue-50 px-2 py-0.5 rounded-md">{scenario.applicant.applicationId}</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={resetCurrentScenario}
            title="Reset this case to demo start"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Scenario</span>
          </button>

          <button
            id="btn-nav-reviewer-queue"
            onClick={() => setCurrentRoute('reviewer')}
            className="inline-flex items-center gap-2 text-xs font-black bg-[#123B7A] hover:bg-[#0B2247] text-white px-4.5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-900/15 cursor-pointer"
          >
            <span>Reviewer Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Hero Decision Card - The Highlight of ClearGov */}
      <DecisionCard onResolveIssueClick={handleResolveIssue} />

      {/* 2-Column: Assessment Confidence & Next Best Action */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5">
          <DecisionConfidenceCard />
        </div>
        <div className="lg:col-span-7">
          <NextActionCard onActionButtonClick={handleResolveIssue} />
        </div>
      </div>

      {/* What-If Simulation: Interactive Projected Outcome */}
      <WhatIfSimulationCard />

      {/* Audit Trail for this Case */}
      <AuditTimeline events={scenario.auditTrail} title="Case Assessment & Evidence Verification Audit Trail" />

      {/* Simulated Upload Modal */}
      <UploadModal
        item={uploadModalItem}
        isOpen={isUploadOpen}
        onClose={() => {
          setIsUploadOpen(false);
          setUploadModalItem(null);
        }}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
};
