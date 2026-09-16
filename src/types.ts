export type PageRoute = 'landing' | 'dashboard' | 'services' | 'applicant' | 'evidence' | 'assessment' | 'decision' | 'reviewer';

export type Language = 'en' | 'hi' | 'te';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'warning' | 'info' | 'success' | 'danger';
  targetRoute: PageRoute;
}

export type EvidenceStatus =
  | 'VERIFIED'
  | 'MISSING'
  | 'INCOMPLETE'
  | 'UNREADABLE'
  | 'EXPIRED'
  | 'CONFLICT'
  | 'LOW CONFIDENCE';

export interface ExtractedDetail {
  label: string;
  value: string;
  status?: 'MATCH' | 'MISMATCH' | 'UNVERIFIED';
}

export interface EvidenceItem {
  id: string;
  name: string;
  linkedRequirement: string;
  requirementKey: 'identity' | 'enrollment' | 'academic' | 'bank' | 'income';
  status: EvidenceStatus;
  confidence: number;
  extractedDetails: ExtractedDetail[];
  fileName?: string;
  fileSize?: string;
  uploadDate?: string;
  issue?: string;
  nextAction?: string;
  documentType: string;
}

export interface ApplicantData {
  fullName: string;
  dob: string;
  college: string;
  course: string;
  academicPercentage: string;
  annualFamilyIncome: string;
  bankAccount: string;
  applicationId: string;
  submissionDate: string;
}

export interface AuditEvent {
  id: string;
  event: string;
  description: string;
  timestamp: string;
  actor: 'Applicant' | 'System Assessment' | 'Caseworker Reviewer';
  tag?: string;
}

export interface ConflictDetails {
  field: string;
  applicationValue: string;
  documentValue: string;
  documentSource: string;
  explanation: string;
  resolved?: boolean;
  resolutionChoice?: string;
  resolvedAt?: string;
}

export type ApplicationDecisionState =
  | 'SUFFICIENT TO PROCEED'
  | 'ADDITIONAL EVIDENCE REQUIRED'
  | 'CONDITION NOT SATISFIED'
  | 'HUMAN REVIEW REQUIRED';

export interface Scenario {
  id: string;
  title: string;
  applicantName: string;
  badgeText: string;
  badgeVariant: 'warning' | 'danger' | 'purple' | 'info' | 'success';
  scenarioDescription: string;
  applicant: ApplicantData;
  evidence: EvidenceItem[];
  conflict?: ConflictDetails;
  incomeThresholdConfig?: {
    threshold: number;
    thresholdFormatted: string;
    actualIncome: number;
  };
  auditTrail: AuditEvent[];
}
