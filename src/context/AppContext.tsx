import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import {
  Scenario,
  PageRoute,
  EvidenceItem,
  ApplicationDecisionState,
  AuditEvent,
  Language,
} from '../types';
import { INITIAL_SCENARIOS } from '../data/mockData';
import { TRANSLATIONS, TranslationDictionary } from '../data/translations';

interface Toast {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface RequirementStatus {
  key: string;
  label: string;
  isEstablished: boolean;
  statusText: string;
  evidenceName: string;
  statusNote: string;
}

interface AppContextType {
  // Navigation
  currentRoute: PageRoute;
  setCurrentRoute: (route: PageRoute) => void;

  // Active Scenario & Data
  activeScenarioId: string;
  setActiveScenarioId: (id: string) => void;
  scenario: Scenario;
  updateApplicantInfo: (data: Partial<Scenario['applicant']>) => void;

  // Evidence Actions
  uploadSimulatedEvidence: (evidenceId: string, customFileName?: string) => void;
  selectedEvidenceDetail: EvidenceItem | null;
  setSelectedEvidenceDetail: (item: EvidenceItem | null) => void;

  // Reviewer Actions
  resolveConflict: (choice: 'confirm_app' | 'confirm_doc' | 'request_evidence' | 'escalate', notes?: string) => void;

  // Assessment & Decision Computations
  requirements: RequirementStatus[];
  establishedCount: number;
  totalCount: number;
  decisionState: ApplicationDecisionState;
  decisionExplanation: {
    title: string;
    whatEstablished: string[];
    whatNotEstablished: string[];
    whyCurrentState: string;
    canProceedText: string;
    nextBestAction: {
      action: string;
      why: string;
      whatHappensNext: string;
      actionButtonText?: string;
      actionButtonRoute?: PageRoute;
    };
  };

  // Audit trail
  addAuditEvent: (event: string, description: string, actor: AuditEvent['actor'], tag?: string) => void;

  // Toasts
  toasts: Toast[];
  addToast: (title: string, description?: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;

  // Localization
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;

  // Reset demo
  resetCurrentScenario: () => void;
  resetAllScenarios: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('landing');
  const [activeScenarioId, setActiveScenarioId] = useState<string>('ananya');
  const [scenariosState, setScenariosState] = useState<Record<string, Scenario>>(() =>
    JSON.parse(JSON.stringify(INITIAL_SCENARIOS))
  );
  const [selectedEvidenceDetail, setSelectedEvidenceDetail] = useState<EvidenceItem | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((title: string, description?: string, type: Toast['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const scenario = useMemo(() => {
    return scenariosState[activeScenarioId] || scenariosState['ananya'];
  }, [scenariosState, activeScenarioId]);

  const addAuditEvent = useCallback((event: string, description: string, actor: AuditEvent['actor'], tag?: string) => {
    const newEvent: AuditEvent = {
      id: `aud-${Date.now()}`,
      event,
      description,
      timestamp: 'Just now',
      actor,
      tag: tag || 'System Action',
    };
    setScenariosState((prev) => {
      const current = prev[activeScenarioId];
      if (!current) return prev;
      return {
        ...prev,
        [activeScenarioId]: {
          ...current,
          auditTrail: [newEvent, ...current.auditTrail],
        },
      };
    });
  }, [activeScenarioId]);

  const updateApplicantInfo = useCallback((data: Partial<Scenario['applicant']>) => {
    setScenariosState((prev) => {
      const current = prev[activeScenarioId];
      if (!current) return prev;
      return {
        ...prev,
        [activeScenarioId]: {
          ...current,
          applicant: {
            ...current.applicant,
            ...data,
          },
        },
      };
    });
    addToast('Applicant Information Updated', 'Changes preserved for assessment.', 'success');
  }, [activeScenarioId, addToast]);

  const uploadSimulatedEvidence = useCallback((evidenceId: string, customFileName?: string) => {
    setScenariosState((prev) => {
      const cur = prev[activeScenarioId];
      if (!cur) return prev;

      const updatedEvidence = cur.evidence.map((item) => {
        if (item.id === evidenceId || (evidenceId === 'ev-income-cert' && item.requirementKey === 'income')) {
          return {
            ...item,
            status: 'VERIFIED' as const,
            confidence: 95,
            fileName: customFileName || 'Income_Certificate_RevenueDept_Verified.pdf',
            fileSize: '1.4 MB',
            uploadDate: 'Just now',
            issue: 'No issue detected.',
            nextAction: 'None required (Verified).',
            extractedDetails: [
              { label: 'Document Name', value: 'Annual Family Income Certificate', status: 'MATCH' as const },
              { label: 'Certified Amount', value: '₹2,40,000 / annum', status: 'MATCH' as const },
              { label: 'Issuing Officer', value: 'Sub-Divisional Magistrate / Tehsildar', status: 'MATCH' as const },
              { label: 'Digital Signatory', value: 'Valid Public Key Verified', status: 'MATCH' as const },
              { label: 'Issue Date', value: 'August 2026', status: 'MATCH' as const },
            ],
          };
        }
        return item;
      });

      const auditAdditions: AuditEvent[] = [
        {
          id: `aud-${Date.now()}-1`,
          event: 'Evidence Uploaded',
          description: `Uploaded document "${customFileName || 'Income_Certificate_RevenueDept_Verified.pdf'}" to satisfy Family Income requirement.`,
          timestamp: 'Just now',
          actor: 'Applicant',
          tag: 'Upload',
        },
        {
          id: `aud-${Date.now()}-2`,
          event: 'Evidence Verified',
          description: 'Document authenticated with 95% confidence. Extracted certified income ₹2,40,000 / annum.',
          timestamp: 'Just now',
          actor: 'System Assessment',
          tag: 'Verification',
        },
        {
          id: `aud-${Date.now()}-3`,
          event: 'Assessment Updated',
          description: 'All 5 of 5 requirements now established. Decision state upgraded to SUFFICIENT TO PROCEED.',
          timestamp: 'Just now',
          actor: 'System Assessment',
          tag: 'Decision Engine',
        },
      ];

      return {
        ...prev,
        [activeScenarioId]: {
          ...cur,
          evidence: updatedEvidence,
          auditTrail: [...auditAdditions, ...cur.auditTrail],
        },
      };
    });

    addToast(
      'Assessment Updated Successfully',
      '5 / 5 Requirements now established. All configured prototype requirements can now be assessed.',
      'success'
    );
  }, [activeScenarioId, addToast]);

  const resolveConflict = useCallback((choice: 'confirm_app' | 'confirm_doc' | 'request_evidence' | 'escalate', notes?: string) => {
    setScenariosState((prev) => {
      const cur = prev[activeScenarioId];
      if (!cur || !cur.conflict) return prev;

      let resolvedDesc = '';
      let updatedStatus: 'VERIFIED' | 'CONFLICT' = 'VERIFIED';
      let newDob = cur.applicant.dob;

      if (choice === 'confirm_doc') {
        resolvedDesc = `Reviewer confirmed Government ID date of birth (${cur.conflict.documentValue}). Application record updated; original form value (${cur.conflict.applicationValue}) preserved in audit log.`;
        newDob = cur.conflict.documentValue;
        updatedStatus = 'VERIFIED';
      } else if (choice === 'confirm_app') {
        resolvedDesc = `Reviewer accepted Application form date of birth (${cur.conflict.applicationValue}) with verified institutional documentation.`;
        updatedStatus = 'VERIFIED';
      } else if (choice === 'request_evidence') {
        resolvedDesc = `Reviewer requested secondary verification (Birth Certificate / Class X Board Certificate).`;
        updatedStatus = 'CONFLICT';
      } else {
        resolvedDesc = `Reviewer escalated file to Senior Welfare Officer for manual hearing.`;
        updatedStatus = 'CONFLICT';
      }

      const updatedEvidence = cur.evidence.map((item) => {
        if (item.requirementKey === 'identity') {
          return {
            ...item,
            status: updatedStatus,
            confidence: choice === 'confirm_doc' || choice === 'confirm_app' ? 96 : item.confidence,
            issue: choice === 'confirm_doc' || choice === 'confirm_app' ? 'Resolved via caseworker verification.' : item.issue,
            nextAction: choice === 'confirm_doc' || choice === 'confirm_app' ? 'None required (Resolved).' : item.nextAction,
          };
        }
        return item;
      });

      const auditEvent: AuditEvent = {
        id: `aud-${Date.now()}`,
        event: 'Reviewer Action Recorded',
        description: resolvedDesc + (notes ? ` Note: "${notes}"` : ''),
        timestamp: 'Just now',
        actor: 'Caseworker Reviewer',
        tag: 'Human in the Loop',
      };

      return {
        ...prev,
        [activeScenarioId]: {
          ...cur,
          applicant: {
            ...cur.applicant,
            dob: newDob,
          },
          conflict: {
            ...cur.conflict,
            resolved: choice === 'confirm_doc' || choice === 'confirm_app',
            resolutionChoice: choice,
            resolvedAt: 'Just now',
          },
          evidence: updatedEvidence,
          auditTrail: [auditEvent, ...cur.auditTrail],
        },
      };
    });

    addToast('Reviewer Action Recorded', 'Case updated and logged to tamper-evident audit timeline.', 'success');
  }, [activeScenarioId, addToast]);

  const resetCurrentScenario = useCallback(() => {
    setScenariosState((prev) => ({
      ...prev,
      [activeScenarioId]: JSON.parse(JSON.stringify(INITIAL_SCENARIOS[activeScenarioId])),
    }));
    addToast('Scenario Reset', 'Restored to baseline demo state.', 'info');
  }, [activeScenarioId, addToast]);

  const resetAllScenarios = useCallback(() => {
    setScenariosState(JSON.parse(JSON.stringify(INITIAL_SCENARIOS)));
    addToast('All Scenarios Reset', 'All applicant test states restored.', 'info');
  }, [addToast]);

  // Dynamic Computation of Requirements
  const requirements = useMemo<RequirementStatus[]>(() => {
    const ev = scenario.evidence;

    const idItem = ev.find((e) => e.requirementKey === 'identity');
    const isIdentityEstablished = idItem?.status === 'VERIFIED';

    const enrollItem = ev.find((e) => e.requirementKey === 'enrollment');
    const isEnrollmentEstablished = enrollItem?.status === 'VERIFIED';

    const acadItem = ev.find((e) => e.requirementKey === 'academic');
    const isAcademicEstablished = acadItem?.status === 'VERIFIED';

    const bankItem = ev.find((e) => e.requirementKey === 'bank');
    const isBankEstablished = bankItem?.status === 'VERIFIED';

    const incomeItem = ev.find((e) => e.requirementKey === 'income');
    let isIncomeEstablished = false;
    let incomeStatusNote = '';

    if (!incomeItem || incomeItem.status === 'MISSING') {
      isIncomeEstablished = false;
      incomeStatusNote = 'Required Income Certificate has not been submitted.';
    } else if (incomeItem.status === 'UNREADABLE' || incomeItem.status === 'LOW CONFIDENCE') {
      isIncomeEstablished = false;
      incomeStatusNote = `Document optical quality is insufficient (${incomeItem.confidence}% confidence).`;
    } else if (incomeItem.status === 'VERIFIED') {
      // Check condition rule if present (e.g. Arjun)
      if (scenario.incomeThresholdConfig) {
        if (scenario.incomeThresholdConfig.actualIncome > scenario.incomeThresholdConfig.threshold) {
          isIncomeEstablished = false;
          incomeStatusNote = `Income ₹${scenario.incomeThresholdConfig.actualIncome.toLocaleString()} exceeds prototype scheme cap of ${scenario.incomeThresholdConfig.thresholdFormatted}.`;
        } else {
          isIncomeEstablished = true;
          incomeStatusNote = 'Verified income is within configured prototype threshold.';
        }
      } else {
        isIncomeEstablished = true;
        incomeStatusNote = 'Verified and meets income criteria.';
      }
    }

    return [
      {
        key: 'identity',
        label: 'Identity',
        isEstablished: isIdentityEstablished,
        statusText: isIdentityEstablished ? 'Established' : 'Not Established',
        evidenceName: idItem?.name || 'College / Govt ID',
        statusNote: isIdentityEstablished
          ? 'Confirmed through institutional or national ID.'
          : (idItem?.status === 'CONFLICT' ? 'Conflicting DOB data between application and document.' : 'Identity document missing or unverified.'),
      },
      {
        key: 'enrollment',
        label: 'Enrollment',
        isEstablished: isEnrollmentEstablished,
        statusText: isEnrollmentEstablished ? 'Established' : 'Not Established',
        evidenceName: enrollItem?.name || 'Bonafide Certificate',
        statusNote: isEnrollmentEstablished
          ? 'Active student status confirmed by college bonafide.'
          : 'Enrollment document missing or unverified.',
      },
      {
        key: 'academic',
        label: 'Academic Eligibility',
        isEstablished: isAcademicEstablished,
        statusText: isAcademicEstablished ? 'Established' : 'Not Established',
        evidenceName: acadItem?.name || 'Semester Marksheet',
        statusNote: isAcademicEstablished
          ? `Marksheet verifies academic percentage ≥ 75% threshold.`
          : 'Academic transcript missing or unverified.',
      },
      {
        key: 'bank',
        label: 'Bank Details',
        isEstablished: isBankEstablished,
        statusText: isBankEstablished ? 'Established' : 'Not Established',
        evidenceName: bankItem?.name || 'Bank Proof',
        statusNote: isBankEstablished
          ? 'Active bank account verified for direct benefit disbursement.'
          : 'Bank passbook proof missing or unverified.',
      },
      {
        key: 'income',
        label: 'Family Income',
        isEstablished: isIncomeEstablished,
        statusText: isIncomeEstablished ? 'Established' : 'Not Established',
        evidenceName: incomeItem?.name || 'Revenue Income Certificate',
        statusNote: incomeStatusNote,
      },
    ];
  }, [scenario]);

  const establishedCount = useMemo(() => {
    return requirements.filter((r) => r.isEstablished).length;
  }, [requirements]);

  const totalCount = requirements.length;

  // Deterministic Decision Engine
  const decisionState = useMemo<ApplicationDecisionState>(() => {
    // 1. Conflict check
    if (scenario.conflict && !scenario.conflict.resolved) {
      return 'HUMAN REVIEW REQUIRED';
    }

    // 2. Unreadable or Low Confidence check
    const hasUnreadable = scenario.evidence.some(
      (e) => e.status === 'UNREADABLE' || e.status === 'LOW CONFIDENCE' || e.status === 'CONFLICT'
    );
    if (hasUnreadable) {
      return 'HUMAN REVIEW REQUIRED';
    }

    // 3. Missing evidence check
    const hasMissing = scenario.evidence.some((e) => e.status === 'MISSING');
    if (hasMissing) {
      return 'ADDITIONAL EVIDENCE REQUIRED';
    }

    // 4. Condition not satisfied check (e.g. Arjun)
    if (scenario.incomeThresholdConfig) {
      if (scenario.incomeThresholdConfig.actualIncome > scenario.incomeThresholdConfig.threshold) {
        return 'CONDITION NOT SATISFIED';
      }
    }

    // 5. If all established
    if (establishedCount === totalCount) {
      return 'SUFFICIENT TO PROCEED';
    }

    return 'ADDITIONAL EVIDENCE REQUIRED';
  }, [scenario, establishedCount, totalCount]);

  // Decision Detailed Explanation & Next Best Action
  const decisionExplanation = useMemo(() => {
    const whatEstablished = requirements.filter((r) => r.isEstablished).map((r) => r.label);
    const whatNotEstablished = requirements.filter((r) => !r.isEstablished).map((r) => r.label);

    let title = '';
    let whyCurrentState = '';
    let canProceedText = '';
    let nextBestAction = {
      action: '',
      why: '',
      whatHappensNext: '',
      actionButtonText: '',
      actionButtonRoute: 'evidence' as PageRoute,
    };

    if (decisionState === 'ADDITIONAL EVIDENCE REQUIRED') {
      title = 'ADDITIONAL EVIDENCE REQUIRED';
      whyCurrentState =
        'The required Income Certificate has not been submitted, so the Family Income requirement cannot currently be established.';
      canProceedText =
        'Additional evidence is required before the configured assessment can be completed.';
      nextBestAction = {
        action: 'Upload Income Certificate',
        why: 'Required evidence has not been submitted to verify the applicant family income falls under ₹2,50,000.',
        whatHappensNext:
          'Once submitted, automated extraction will evaluate the revenue certificate and update the assessment readiness to 5 / 5.',
        actionButtonText: 'Resolve Evidence Issue',
        actionButtonRoute: 'evidence',
      };
    } else if (decisionState === 'SUFFICIENT TO PROCEED') {
      title = 'SUFFICIENT TO PROCEED';
      whyCurrentState =
        'All configured prototype requirements have supporting evidence and can now be assessed.';
      canProceedText =
        'All 5 configured prototype requirements have established supporting evidence. The file is ready for final scheme allocation.';
      nextBestAction = {
        action: 'Proceed to Review & Scheme Allocation',
        why: 'All 5 configured requirements (Identity, Enrollment, Academic Eligibility, Bank Details, and Family Income) are verified.',
        whatHappensNext:
          'The application enters the caseworker disbursement batch with full deterministic audit certification.',
        actionButtonText: 'Open Reviewer Queue',
        actionButtonRoute: 'reviewer',
      };
    } else if (decisionState === 'HUMAN REVIEW REQUIRED') {
      title = 'HUMAN REVIEW REQUIRED';
      if (scenario.conflict && !scenario.conflict.resolved) {
        whyCurrentState =
          'Two sources contain different dates of birth. The system cannot reliably determine which value should be accepted and requires human confirmation.';
        canProceedText =
          'Automated decision halted. A human caseworker must review the conflicting evidence before the file can move forward.';
        nextBestAction = {
          action: 'Caseworker Confirmation Required',
          why: 'Discrepancy detected between self-declared application form and government identity record.',
          whatHappensNext:
            'A caseworker will select the authoritative value or request supplementary documentation.',
          actionButtonText: 'Open Case in Review Queue',
          actionButtonRoute: 'reviewer',
        };
      } else {
        // Unreadable / low confidence (e.g. Priya)
        whyCurrentState =
          'Required information could not be reliably extracted because document quality is insufficient (42% optical confidence).';
        canProceedText =
          'Evidence quality gate prevented automatic acceptance of unreadable data. Human intervention or resubmission is required.';
        nextBestAction = {
          action: 'Upload a Clearer Copy',
          why: 'The submitted document exhibits optical blur and low resolution below the required 85% intake threshold.',
          whatHappensNext:
            'Uploading a clean scan will allow automated optical verification to establish the remaining requirement.',
          actionButtonText: 'Upload Clear Document',
          actionButtonRoute: 'evidence',
        };
      }
    } else {
      // CONDITION NOT SATISFIED (e.g. Arjun)
      title = 'CONDITION NOT SATISFIED';
      whyCurrentState =
        'Verified evidence establishes a family income of ₹4,20,000, which is above the configured prototype threshold of ₹2,50,000.';
      canProceedText =
        'The application does not satisfy the configured economic threshold rule for this specific scholarship scheme.';
      nextBestAction = {
        action: 'Review Applicable Condition',
        why: 'Verified family income of ₹4,20,000 exceeds the maximum income cap of ₹2,50,000 specified for this prototype scheme.',
        whatHappensNext:
          'The applicant may review other merit-only or non-income restricted public scholarship programs.',
        actionButtonText: 'Review Evidence Details',
        actionButtonRoute: 'evidence',
      };
    }

    return {
      title,
      whatEstablished,
      whatNotEstablished,
      whyCurrentState,
      canProceedText,
      nextBestAction,
    };
  }, [decisionState, requirements, scenario]);

  const t = useMemo(() => TRANSLATIONS[language] || TRANSLATIONS.en, [language]);

  const value = {
    language,
    setLanguage,
    t,
    currentRoute,
    setCurrentRoute,
    activeScenarioId,
    setActiveScenarioId,
    scenario,
    updateApplicantInfo,
    uploadSimulatedEvidence,
    selectedEvidenceDetail,
    setSelectedEvidenceDetail,
    resolveConflict,
    requirements,
    establishedCount,
    totalCount,
    decisionState,
    decisionExplanation,
    addAuditEvent,
    toasts,
    addToast,
    removeToast,
    resetCurrentScenario,
    resetAllScenarios,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
