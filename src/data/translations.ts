import { Language } from '../types';

export interface PipelineStepTranslation {
  step: string;
  title: string;
  description: string;
  badge: string;
}

export interface TranslationDictionary {
  // Brand & Govt Emblem
  appName: string;
  appTagline: string;
  govPortal: string;
  govMotto: string;
  officialPlatform: string;
  deterministicEngine: string;
  hackathonDemo: string;
  stateEmblemTitle: string;
  nationalMotto: string;

  // Navigation
  navHome: string;
  navDashboard: string;
  navApplications: string;
  navEvidence: string;
  navAssessment: string;
  navDecision: string;
  navReviewer: string;

  // Common Action Buttons
  btnStartApplication: string;
  btnViewDecision: string;
  btnProceedToEvidence: string;
  btnProceedToAssessment: string;
  btnProceedToDecision: string;
  btnUploadEvidence: string;
  btnReevaluate: string;
  btnResetSample: string;
  btnAdjudicate: string;
  btnDownloadFormalLetter: string;
  btnSaveNotes: string;
  btnBack: string;
  btnConfirm: string;
  btnCancel: string;

  // Statuses
  statusSufficient: string;
  statusAdditionalEvidence: string;
  statusConditionNotSatisfied: string;
  statusHumanReview: string;
  statusEstablished: string;
  statusNotEstablished: string;
  statusVerified: string;
  statusMissing: string;
  statusConflict: string;
  statusUnreadable: string;
  statusLowConfidence: string;

  // Metrics & Headers
  readinessIndex: string;
  evidenceQuality: string;
  statutoryCriteria: string;
  auditTrail: string;
  nextRecommendedStep: string;
  caseDossier: string;
  caseworkerQueue: string;
  activeCaseFile: string;

  // Hero Section
  heroTitle: string;
  heroThesis: string;
  heroSubtitle: string;
  selectProgramPrompt: string;
  selectLanguage: string;

  // Quick Metrics Ticker
  metricArch: string;
  metricArchVal: string;
  metricAi: string;
  metricAiVal: string;
  metricSafety: string;
  metricSafetyVal: string;
  metricAudit: string;
  metricAuditVal: string;

  // Core Pipeline (The 7 steps)
  pipelineBadge: string;
  pipelineTitle: string;
  pipelineSubtitle: string;
  pipelineSteps: PipelineStepTranslation[];
  humanInTheLoopNotice: string;
  btnInspectReviewer: string;

  // Test Cases Suite
  evaluatorTestSuite: string;
  testCasesTitle: string;
  testCasesSubtitle: string;
  selectCasePrompt: string;
  currentScenario: string;
  runScenario: string;
  scenarioAnanyaDesc: string;
  scenarioPriyaDesc: string;
  scenarioRahulDesc: string;
  scenarioArjunDesc: string;

  // 3 Feature Highlight Cards
  feat1Tag: string;
  feat1Title: string;
  feat1Desc: string;
  feat2Tag: string;
  feat2Title: string;
  feat2Desc: string;
  feat3Tag: string;
  feat3Title: string;
  feat3Desc: string;

  // Dashboard Lifecycle Workflow
  lifecycleTitle: string;
  lifecycleSubtitle: string;
  lifecycleActivePhase: string;
  phase1Title: string;
  phase1Desc: string;
  phase2Title: string;
  phase2Desc: string;
  phase3Title: string;
  phase3Desc: string;
  phase4Title: string;
  phase4DescReady: string;
  phase4DescAwaiting: string;

  // Application Health Index
  healthTitle: string;
  healthSubtitle: string;
  healthGood: string;
  healthCompleteness: string;
  healthCompletenessDesc: string;
  healthQuality: string;
  healthQualityDesc: string;
  healthConsistency: string;
  healthConsistencyDesc: string;
  healthReadiness: string;
  healthReadinessDesc: string;

  // Simulator
  simBadge: string;
  simTitle: string;
  simSubtitle: string;
  simDesc: string;
  simActiveBadge: string;
  simSandboxBadge: string;
  simCurrentEval: string;
  simProjected: string;
  simBtnSimulate: string;
  simBtnRevert: string;

  // Next Best Action
  nextActionEngine: string;
  nextActionHeading: string;
  nextActionDirection: string;
  nextActionTarget: string;
  nextActionWhy: string;
  nextActionHow: string;
  nextActionResolveGap: string;
  nextActionReviewLetter: string;
  nextActionAdjudicateQueue: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    // Brand & Govt Emblem
    appName: 'ClearGov',
    appTagline: 'From Evidence to Decision',
    govPortal: 'Government of India • Civic Public Services',
    govMotto: 'Transparent Public-Service Evidence Engine',
    officialPlatform: 'OFFICIAL CIVIC-TECH PLATFORM',
    deterministicEngine: 'DETERMINISTIC ENGINE ACTIVE',
    hackathonDemo: 'CIVIC DEMO',
    stateEmblemTitle: 'National Civic Emblem',
    nationalMotto: 'Satyameva Jayate • Truth Alone Triumphs',

    // Navigation
    navHome: 'Home',
    navDashboard: 'Dashboard',
    navApplications: 'Applications',
    navEvidence: 'Evidence',
    navAssessment: 'Assessment',
    navDecision: 'Decision',
    navReviewer: 'Reviewer',

    // Common Action Buttons
    btnStartApplication: 'Start Application',
    btnViewDecision: 'View Decision Center',
    btnProceedToEvidence: 'Proceed to Evidence Verification',
    btnProceedToAssessment: 'Proceed to Rules Evaluation',
    btnProceedToDecision: 'Proceed to Decision Center',
    btnUploadEvidence: 'Upload Document',
    btnReevaluate: 'Re-evaluate',
    btnResetSample: 'Reset Sample Data',
    btnAdjudicate: 'Adjudicate File',
    btnDownloadFormalLetter: 'Download Determination Notice',
    btnSaveNotes: 'Save Caseworker Determination',
    btnBack: 'Back',
    btnConfirm: 'Confirm',
    btnCancel: 'Cancel',

    // Statuses
    statusSufficient: 'SUFFICIENT TO PROCEED',
    statusAdditionalEvidence: 'ADDITIONAL EVIDENCE REQUIRED',
    statusConditionNotSatisfied: 'CONDITION NOT SATISFIED',
    statusHumanReview: 'HUMAN REVIEW REQUIRED',
    statusEstablished: 'Established',
    statusNotEstablished: 'Action Required',
    statusVerified: 'Verified',
    statusMissing: 'Missing',
    statusConflict: 'Discrepancy',
    statusUnreadable: 'Unreadable',
    statusLowConfidence: 'Low Confidence',

    // Metrics & Headers
    readinessIndex: 'Application Readiness Index',
    evidenceQuality: 'Evidence Quality Metric',
    statutoryCriteria: 'Statutory Qualification Criteria',
    auditTrail: 'Cryptographic Audit Trail',
    nextRecommendedStep: 'Recommended Step',
    caseDossier: 'Case Dossier',
    caseworkerQueue: 'Caseworker Review Queue',
    activeCaseFile: 'Active Case File Adjudication',

    // Hero Section
    heroTitle: 'From Evidence to Decision',
    heroThesis: '“Know what your evidence establishes, what is missing, and what to do next.”',
    heroSubtitle:
      'An AI-powered civic evaluation system that replaces opaque government rejections with deterministic evidence verification, statutory explainability, and guaranteed next steps.',
    selectProgramPrompt: 'Select Statutory Program',
    selectLanguage: 'Language',

    // Quick Metrics Ticker
    metricArch: 'Architecture',
    metricArchVal: '100% Deterministic',
    metricAi: 'AI Engine',
    metricAiVal: 'Rule Decomposition',
    metricSafety: 'Safety Mechanism',
    metricSafetyVal: 'Human-in-the-Loop',
    metricAudit: 'Auditability',
    metricAuditVal: 'Tamper-Evident Trail',

    // Core Pipeline
    pipelineBadge: 'CORE INTELLIGENCE ARCHITECTURE',
    pipelineTitle: 'The Transparent Evidence-to-Decision Pipeline',
    pipelineSubtitle:
      'How ClearGov deterministically moves from citizen service selection to explainable decision and next action.',
    pipelineSteps: [
      {
        step: '01',
        title: 'User Selects Service',
        description: 'Citizen chooses student scholarship scheme',
        badge: 'Input',
      },
      {
        step: '02',
        title: 'AI Analyzes Requirements',
        description: 'Deconstructs policy gazette into legal criteria',
        badge: 'AI Engine',
      },
      {
        step: '03',
        title: 'Required Docs Identified',
        description: 'Maps 5 mandatory proofs needed for evaluation',
        badge: 'Criteria',
      },
      {
        step: '04',
        title: 'Compare with Submitted Proofs',
        description: 'OCR optical analysis & cross-field integrity check',
        badge: 'Verification',
      },
      {
        step: '05',
        title: 'Missing Docs Detected',
        description: 'Flags unverified, expired or unreadable scans',
        badge: 'Safety Alert',
      },
      {
        step: '06',
        title: 'Explain Why Required',
        description: 'Cites exact statutory clause (§4.2 Income Cap)',
        badge: 'Explainability',
      },
      {
        step: '07',
        title: 'Show Next Action',
        description: 'Prescribes precise 1-click corrective resolution',
        badge: 'Direction',
      },
    ],
    humanInTheLoopNotice:
      'Human-in-the-loop: If OCR quality is below threshold or cross-record discrepancies emerge, automated decisions pause and route to caseworker review.',
    btnInspectReviewer: 'Inspect Reviewer Queue',

    // Test Cases Suite
    evaluatorTestSuite: 'Evaluator Test Suite',
    testCasesTitle: 'Test Curated Civic Edge-Cases with One Click',
    testCasesSubtitle:
      'Simulate different applicant conditions to observe how ClearGov adapts deterministically.',
    selectCasePrompt: 'Select any case below',
    currentScenario: 'Current Scenario',
    runScenario: 'Run Scenario',
    scenarioAnanyaDesc:
      'Initial applicant state with 4 of 5 requirements established. Demonstrates dynamic simulated upload and reassessment flow.',
    scenarioPriyaDesc:
      'Degraded scan sample demonstrating automated quality checks and transparent re-upload guidance.',
    scenarioRahulDesc:
      'Cross-document discrepancy (Application DOB vs Aadhaar DOB) routing to caseworker adjudication.',
    scenarioArjunDesc:
      'Verified evidence establishes family income exceeding statutory threshold.',

    // 3 Feature Highlights
    feat1Tag: 'Deep Extraction',
    feat1Title: 'Evidence Intelligence',
    feat1Desc:
      'Every document is evaluated for optical clarity, cryptographic seals, expiration dates, and cross-record consistency before decisions are determined.',
    feat2Tag: 'Zero Black-Box',
    feat2Title: 'Explainable Decisions',
    feat2Desc:
      'ClearGov generates unambiguous audit trails explaining what has been established, what remains unmet, the underlying legal clause, and the immediate next step.',
    feat3Tag: 'Caseworker Guardrails',
    feat3Title: 'Human-in-the-Loop Review',
    feat3Desc:
      'When conflicting records (like Aadhaar vs. application DOB) or degraded scans emerge, ClearGov flags the case with side-by-side evidence diffs for caseworker adjudication.',

    // Dashboard Lifecycle Workflow
    lifecycleTitle: 'Application Lifecycle Workflow',
    lifecycleSubtitle:
      'End-to-end status progression from submission through human adjudication to disbursement',
    lifecycleActivePhase: 'Active Phase: Verification & Rules',
    phase1Title: 'Applicant Intake',
    phase1Desc: 'Personal & academic details completed',
    phase2Title: 'Evidence Extraction',
    phase2Desc: 'Document proofs authenticated and established',
    phase3Title: 'Rules Engine',
    phase3Desc: 'Deterministic criteria evaluation active',
    phase4Title: 'Final Determination',
    phase4DescReady: 'Ready for benefit disbursement',
    phase4DescAwaiting: 'Awaiting documentary proof resolution',

    // Application Health Index
    healthTitle: 'Application Health Index',
    healthSubtitle: 'Composite diagnostics on case completeness and review eligibility',
    healthGood: 'Health Status: Optimal',
    healthCompleteness: 'Completeness',
    healthCompletenessDesc: 'Requirements satisfied',
    healthQuality: 'Evidence Quality',
    healthQualityDesc: 'Average OCR & verification confidence',
    healthConsistency: 'Field Consistency',
    healthConsistencyDesc: 'Cross-document identity parity',
    healthReadiness: 'Review Readiness',
    healthReadinessDesc: 'Eligible for immediate automated decision',

    // Simulator
    simBadge: 'Interactive Simulator',
    simTitle: 'What If I Upload Missing Evidence?',
    simSubtitle: 'Deterministic State Projection',
    simDesc:
      'Simulate the exact deterministic outcome when the applicant provides the required Revenue Income Certificate. ClearGov dynamically recalculates rule satisfaction in real-time.',
    simActiveBadge: 'Simulation In Effect',
    simSandboxBadge: 'Interactive Sandbox',
    simCurrentEval: 'Current Evaluation',
    simProjected: 'Simulated Outcome',
    simBtnSimulate: 'Simulate Upload: Revenue Income Certificate',
    simBtnRevert: 'Revert Simulation',

    // Next Best Action
    nextActionEngine: 'Deterministic Guidance Engine',
    nextActionHeading: 'NEXT BEST ACTION',
    nextActionDirection: 'Rule-Based Direction',
    nextActionTarget: 'Target Action',
    nextActionWhy: 'Why This is Required (Statutory Basis)',
    nextActionHow: 'How to Resolve This',
    nextActionResolveGap: 'Resolve Evidence Gap',
    nextActionReviewLetter: 'Review Determination Notice',
    nextActionAdjudicateQueue: 'Open Reviewer Adjudication',
  },

  hi: {
    // Brand & Govt Emblem
    appName: 'क्लियरगॉव (ClearGov)',
    appTagline: 'साक्ष्य से निर्णय तक',
    govPortal: 'भारत सरकार • नागरिक लोक सेवा पोर्टल',
    govMotto: 'पारदर्शी लोक-सेवा साक्ष्य एवं नियम प्रणाली',
    officialPlatform: 'आधिकारिक नागरिक-तकनीकी मंच',
    deterministicEngine: 'निश्चयात्मक नियम इंजन सक्रिय',
    hackathonDemo: 'नागरिक डेमो',
    stateEmblemTitle: 'राष्ट्रीय नागरिक प्रतीक',
    nationalMotto: 'सत्यमेव जयते • सत्य की ही विजय होती है',

    // Navigation
    navHome: 'मुख्य पृष्ठ',
    navDashboard: 'डैशबोर्ड',
    navApplications: 'आवेदन',
    navEvidence: 'साक्ष्य दस्तावेज़',
    navAssessment: 'मूल्यांकन',
    navDecision: 'निर्णय केंद्र',
    navReviewer: 'अधिनिर्णय',

    // Common Action Buttons
    btnStartApplication: 'आवेदन शुरू करें',
    btnViewDecision: 'निर्णय केंद्र देखें',
    btnProceedToEvidence: 'साक्ष्य सत्यापन की ओर बढ़ें',
    btnProceedToAssessment: 'नियम मूल्यांकन की ओर बढ़ें',
    btnProceedToDecision: 'निर्णय केंद्र की ओर बढ़ें',
    btnUploadEvidence: 'दस्तावेज़ अपलोड करें',
    btnReevaluate: 'पुनर्मूल्यांकन करें',
    btnResetSample: 'नमूना डेटा रीसेट करें',
    btnAdjudicate: 'मामले का अधिनिर्णय करें',
    btnDownloadFormalLetter: 'औपचारिक निर्णय आदेश डाउनलोड करें',
    btnSaveNotes: 'अधिकारी निर्णय सुरक्षित करें',
    btnBack: 'वापस',
    btnConfirm: 'पुष्टि करें',
    btnCancel: 'रद्द करें',

    // Statuses
    statusSufficient: 'आगे बढ़ने के लिए पर्याप्त (SUFFICIENT)',
    statusAdditionalEvidence: 'अतिरिक्त साक्ष्य आवश्यक (ADDITIONAL EVIDENCE)',
    statusConditionNotSatisfied: 'शर्त पूरी नहीं हुई (NOT SATISFIED)',
    statusHumanReview: 'मानव समीक्षा आवश्यक (HUMAN REVIEW)',
    statusEstablished: 'सत्यापित एवं स्थापित',
    statusNotEstablished: 'कार्यवाही आवश्यक',
    statusVerified: 'सत्यापित',
    statusMissing: 'अनुपलब्ध',
    statusConflict: 'विसंगति',
    statusUnreadable: 'अस्पष्ट स्कैन',
    statusLowConfidence: 'कम विश्वसनीयता',

    // Metrics & Headers
    readinessIndex: 'आवेदन तत्परता सूचकांक',
    evidenceQuality: 'साक्ष्य गुणवत्ता स्कोर',
    statutoryCriteria: 'वैधानिक पात्रता मानदंड',
    auditTrail: 'क्रिप्टोग्राफिक ऑडिट ट्रेल',
    nextRecommendedStep: 'अनुशंसित अगला कदम',
    caseDossier: 'केस फ़ाइल विवरण',
    caseworkerQueue: 'अधिकारी समीक्षा कतार',
    activeCaseFile: 'सक्रिय फ़ाइल अधिनिर्णय',

    // Hero Section
    heroTitle: 'साक्ष्य से निर्णय तक',
    heroThesis: '“जानिए आपके साक्ष्य क्या साबित करते हैं, क्या कमी है, और आगे क्या करना है।”',
    heroSubtitle:
      'एक पारदर्शी एआई-संचालित नागरिक मूल्यांकन प्रणाली जो अपारदर्शी सरकारी अस्वीकृतियों के स्थान पर स्पष्ट साक्ष्य सत्यापन, वैधानिक व्याख्या और निश्चित समाधान प्रदान करती है।',
    selectProgramPrompt: 'वैधानिक लोक योजना चुनें',
    selectLanguage: 'भाषा चुनें',

    // Quick Metrics Ticker
    metricArch: 'आर्किटेक्चर',
    metricArchVal: '100% निश्चयात्मक',
    metricAi: 'एआई इंजन',
    metricAiVal: 'नियम विघटन',
    metricSafety: 'सुरक्षा प्रणाली',
    metricSafetyVal: 'मानव-पर्यवेक्षण युक्त',
    metricAudit: 'सत्यापनीयता',
    metricAuditVal: 'अपरिवर्तनीय ऑडिट ट्रेल',

    // Core Pipeline
    pipelineBadge: 'मुख्य बुद्धिमत्ता आर्किटेक्चर',
    pipelineTitle: 'पारदर्शी साक्ष्य-से-निर्णय पाइपलाइन',
    pipelineSubtitle:
      'क्लियरगॉव नागरिक सेवा चयन से लेकर स्पष्ट निर्णय और अगले कदम तक कैसे निष्पक्ष और पारदर्शी रूप से कार्य करता है।',
    pipelineSteps: [
      {
        step: '01',
        title: 'नागरिक सेवा चयन',
        description: 'नागरिक छात्रवृत्ति या लोक सेवा का चयन करता है',
        badge: 'सेवा इनपुट',
      },
      {
        step: '02',
        title: 'एआई नियमों का विश्लेषण',
        description: 'सरकारी राजपत्र और नीतियों को स्पष्ट कानूनी मानदंडों में बदलता है',
        badge: 'एआई इंजन',
      },
      {
        step: '03',
        title: 'आवश्यक दस्तावेज़ों की पहचान',
        description: 'सत्यापन के लिए 5 अनिवार्य साक्ष्यों की सूची तैयार करता है',
        badge: 'पात्रता शर्तें',
      },
      {
        step: '04',
        title: 'जमा साक्ष्यों से तुलना',
        description: 'ओसीआर स्कैनिंग और फ़ील्ड मिलान द्वारा सत्यता की जांच',
        badge: 'सत्यापन',
      },
      {
        step: '05',
        title: 'लापता दस्तावेज़ों की पहचान',
        description: 'अस्पष्ट, समाप्त या अनुपलब्ध प्रमाणपत्रों को तुरंत चिह्नित करता है',
        badge: 'सुरक्षा चेतावनी',
      },
      {
        step: '06',
        title: 'वैधानिक कारण स्पष्ट करना',
        description: 'स्पष्ट कानूनी धारा उद्धृत करता है (उदा. §4.2 आय सीमा नियम)',
        badge: 'स्पष्टता',
      },
      {
        step: '07',
        title: 'अगला कदम सुझाना',
        description: 'नागरिक को 1-क्लिक में समस्या हल करने का सटीक समाधान देता है',
        badge: 'मार्गदर्शन',
      },
    ],
    humanInTheLoopNotice:
      'मानव पर्यवेक्षण: यदि स्कैन गुणवत्ता अपर्याप्त हो या जन्मतिथि में विसंगति पाई जाए, तो स्वचालित निर्णय रुककर अधिकारी समीक्षा हेतु चला जाता है।',
    btnInspectReviewer: 'अधिकारी कतार देखें',

    // Test Cases Suite
    evaluatorTestSuite: 'परीक्षण एवं मूल्यांकन सुइट',
    testCasesTitle: 'एक क्लिक में नागरिक मामलों का परीक्षण करें',
    testCasesSubtitle:
      'विभिन्न आवेदक स्थितियों का अनुकरण करें और देखें कि क्लियरगॉव कैसे पारदर्शी निर्णय लेता है।',
    selectCasePrompt: 'नीचे किसी भी मामले का चयन करें',
    currentScenario: 'वर्तमान मामला',
    runScenario: 'मामला चलाएं',
    scenarioAnanyaDesc:
      'प्रारंभिक आवेदक स्थिति: 5 में से 4 आवश्यकताएं स्थापित हैं। आय प्रमाण पत्र अपलोड कर त्वरित पुनः मूल्यांकन का परीक्षण करें।',
    scenarioPriyaDesc:
      'अस्पष्ट स्कैन नमूना: स्वचालित गुणवत्ता जांच और पारदर्शी पुनः-अपलोड मार्गदर्शन प्रदर्शित करता है।',
    scenarioRahulDesc:
      'दस्तावेजों में विसंगति (आवेदन जन्मतिथि बनाम आधार जन्मतिथि) जिसे अधिकारी समीक्षा हेतु भेजा गया है।',
    scenarioArjunDesc:
      'सत्यापित साक्ष्य से ज्ञात होता है कि पारिवारिक आय वैधानिक सीमा (₹2.5 लाख) से अधिक है।',

    // 3 Feature Highlights
    feat1Tag: 'गहन निष्कर्षण',
    feat1Title: 'साक्ष्य बुद्धिमत्ता',
    feat1Desc:
      'निर्णय से पूर्व प्रत्येक दस्तावेज़ की स्पष्टता, डिजिटल मुहर, वैधता तिथि और रिकॉर्ड निरंतरता का कड़ाई से मूल्यांकन किया जाता है।',
    feat2Tag: 'पूर्ण पारदर्शिता',
    feat2Title: 'व्याख्या योग्य निर्णय',
    feat2Desc:
      'क्लियरगॉव स्पष्ट ऑडिट ट्रेल बनाता है जो यह बताता है कि क्या स्थापित हुआ है, क्या शेष है, और इसके पीछे कौन सा कानूनी नियम है।',
    feat3Tag: 'अधिकारी सुरक्षा कवच',
    feat3Title: 'मानव-समीक्षा संरक्षण',
    feat3Desc:
      'जब विसंगतियां (जैसे आधार बनाम आवेदन जन्मतिथि) सामने आती हैं, तो प्रणाली अधिकारी के सामने दोनों साक्ष्य रखकर न्यायसंगत समीक्षा कराती है।',

    // Dashboard Lifecycle Workflow
    lifecycleTitle: 'आवेदन जीवन-चक्र प्रगति',
    lifecycleSubtitle:
      'आवेदन जमा करने से लेकर साक्ष्य सत्यापन, अधिकारी समीक्षा और छात्रवृत्ति वितरण तक की पूर्ण प्रगति',
    lifecycleActivePhase: 'सक्रिय चरण: सत्यापन एवं नियम मूल्यांकन',
    phase1Title: 'आवेदक पंजीकरण',
    phase1Desc: 'व्यक्तिगत एवं शैक्षणिक विवरण पूर्ण',
    phase2Title: 'साक्ष्य निष्कर्षण',
    phase2Desc: 'दस्तावेजी साक्ष्य प्रमाणित एवं स्थापित',
    phase3Title: 'नियम इंजन',
    phase3Desc: 'निश्चयात्मक पात्रता मानदंड मूल्यांकन सक्रिय',
    phase4Title: 'अंतिम निर्णय',
    phase4DescReady: 'लाभ वितरण हेतु पूरी तरह तैयार',
    phase4DescAwaiting: 'लापता साक्ष्य दस्तावेज़ की प्रतीक्षा',

    // Application Health Index
    healthTitle: 'आवेदन स्वास्थ्य सूचकांक',
    healthSubtitle: 'मामले की पूर्णता और समीक्षा पात्रता का समग्र निदान',
    healthGood: 'स्थिति: उत्तम',
    healthCompleteness: 'पूर्णता',
    healthCompletenessDesc: 'शर्तें पूरी हुईं',
    healthQuality: 'साक्ष्य गुणवत्ता',
    healthQualityDesc: 'औसत ओसीआर और सत्यापन विश्वसनीयता',
    healthConsistency: 'रिकॉर्ड समानता',
    healthConsistencyDesc: 'दस्तावेज़ों में पहचान की एकरूपता',
    healthReadiness: 'समीक्षा तत्परता',
    healthReadinessDesc: 'तत्काल स्वचालित निर्णय हेतु पात्र',

    // Simulator
    simBadge: 'इंटरएक्टिव सिम्युलेटर',
    simTitle: 'यदि मैं लापता दस्तावेज़ अपलोड कर दूं तो क्या होगा?',
    simSubtitle: 'निश्चयात्मक परिणाम प्रक्षेपण',
    simDesc:
      'जब आवेदक आवश्यक आय प्रमाण पत्र जमा करता है, तो वास्तविक परिणाम का परीक्षण करें। क्लियरगॉव तुरंत नियमों की पुनः गणना करता है।',
    simActiveBadge: 'सिमुलेशन सक्रिय',
    simSandboxBadge: 'इंटरएक्टिव सैंडबॉक्स',
    simCurrentEval: 'वर्तमान मूल्यांकन',
    simProjected: 'प्रक्षेपित परिणाम',
    simBtnSimulate: 'अपलोड सिमुलेशन: आय प्रमाण पत्र',
    simBtnRevert: 'सिमुलेशन वापस लें',

    // Next Best Action
    nextActionEngine: 'मार्गदर्शन इंजन',
    nextActionHeading: 'सर्वोत्तम अगला कदम',
    nextActionDirection: 'नियम-आधारित दिशा',
    nextActionTarget: 'लक्ष्य कार्यवाही',
    nextActionWhy: 'यह क्यों आवश्यक है (वैधानिक आधार)',
    nextActionHow: 'इसे कैसे हल करें',
    nextActionResolveGap: 'दस्तावेज़ अंतराल हल करें',
    nextActionReviewLetter: 'औपचारिक निर्णय आदेश देखें',
    nextActionAdjudicateQueue: 'अधिकारी समीक्षा खोलें',
  },

  te: {
    // Brand & Govt Emblem
    appName: 'క్లియర్‌గవ్ (ClearGov)',
    appTagline: 'ఆధారాల నుండి నిర్ణయం వరకు',
    govPortal: 'భారత ప్రభుత్వం • పౌర సేవల పోర్టల్',
    govMotto: 'పారదర్శక పౌరసేవల ఆధారాల విశ్లేషణ వ్యవస్థ',
    officialPlatform: 'అధికారిక పౌర సాంకేతిక వేదిక',
    deterministicEngine: 'ఖచ్చితమైన నియమ ఇంజిన్ క్రియాశీలం',
    hackathonDemo: 'పౌర డెమో',
    stateEmblemTitle: 'జాతీయ పౌర చిహ్నం',
    nationalMotto: 'సత్యమేవ జయతే • సత్యమే జయిస్తుంది',

    // Navigation
    navHome: 'హోమ్',
    navDashboard: 'డాష్‌బోర్డ్',
    navApplications: 'దరఖాస్తులు',
    navEvidence: 'ఆధారాలు (డాక్యుమెంట్లు)',
    navAssessment: 'మూల్యాంకనం',
    navDecision: 'నిర్ణయ కేంద్రం',
    navReviewer: 'పరిశీలన & తీర్పు',

    // Common Action Buttons
    btnStartApplication: 'దరఖాస్తు ప్రారంభించండి',
    btnViewDecision: 'నిర్ణయ కేంద్రాన్ని చూడండి',
    btnProceedToEvidence: 'ఆధారాల ధృవీకరణకు వెళ్లండి',
    btnProceedToAssessment: 'నియమాల మూల్యాంకనానికి వెళ్లండి',
    btnProceedToDecision: 'నిర్ణయ కేంద్రానికి వెళ్లండి',
    btnUploadEvidence: 'పత్రాన్ని అప్‌లోడ్ చేయండి',
    btnReevaluate: 'మరలా పరిశీలించండి',
    btnResetSample: 'నమూనా డేటా రీసెట్',
    btnAdjudicate: 'దరఖాస్తును పరిష్కరించండి',
    btnDownloadFormalLetter: 'అధికారిక ఉత్తర్వు డౌన్‌లోడ్',
    btnSaveNotes: 'కేస్‌వర్కర్ నిర్ణయాన్ని భద్రపరచండి',
    btnBack: 'వెనుకకు',
    btnConfirm: 'ధృవీకరించు',
    btnCancel: 'రద్దు చేయి',

    // Statuses
    statusSufficient: 'కొనసాగడానికి సరిపోతుంది (SUFFICIENT)',
    statusAdditionalEvidence: 'అదనపు ఆధారాలు అవసరం (ADDITIONAL EVIDENCE)',
    statusConditionNotSatisfied: 'నిబంధన నెరవేరలేదు (NOT SATISFIED)',
    statusHumanReview: 'మానవ సమీక్ష అవసరం (HUMAN REVIEW)',
    statusEstablished: 'ధృవీకరించబడింది',
    statusNotEstablished: 'చర్య అవసరం',
    statusVerified: 'ధృవీకరించబడింది',
    statusMissing: 'అందుబాటులో లేదు',
    statusConflict: 'తేడా గుర్తించబడింది',
    statusUnreadable: 'స్పష్టత లేదు',
    statusLowConfidence: 'తక్కువ విశ్వసనీయత',

    // Metrics & Headers
    readinessIndex: 'దరఖాస్తు సంసిద్ధత సూచిక',
    evidenceQuality: 'ఆధారాల నాణ్యత స్కోరు',
    statutoryCriteria: 'చట్టబద్ధమైన అర్హత ప్రమాణాలు',
    auditTrail: 'క్రిప్టోగ్రాఫిక్ ఆడిట్ రికార్డు',
    nextRecommendedStep: 'సిఫార్సు చేయబడిన తదుపరి చర్య',
    caseDossier: 'కేసు దస్తావేజు',
    caseworkerQueue: 'సమీక్షకుల వరుస క్రమం',
    activeCaseFile: 'సక్రియ కేసు దస్తావేజు పరిశీలన',

    // Hero Section
    heroTitle: 'ఆధారాల నుండి నిర్ణయం వరకు',
    heroThesis: '“మీ ఆధారాలు ఏమి రుజువు చేస్తున్నాయి, ఏది లోపించింది, తదుపరి ఏమి చేయాలో తెలుసుకోండి.”',
    heroSubtitle:
      'అస్పష్టమైన ప్రభుత్వ తిరస్కరణల స్థానంలో ఖచ్చితమైన ఆధారాల ధృవీకరణ, చట్టపరమైన వివరణ మరియు స్పష్టమైన తదుపరి చర్యలను అందించే AI ఆధారిత పౌర మూల్యాంకన వ్యవస్థ.',
    selectProgramPrompt: 'ప్రభుత్వ పథకాన్ని ఎంచుకోండి',
    selectLanguage: 'భాషను ఎంచుకోండి',

    // Quick Metrics Ticker
    metricArch: 'నిర్మాణం',
    metricArchVal: '100% ఖచ్చితమైన నియమాలు',
    metricAi: 'AI ఇంజిన్',
    metricAiVal: 'నిబంధనల విశ్లేషణ',
    metricSafety: 'భద్రతా వ్యవస్థ',
    metricSafetyVal: 'మానవ పర్యవేక్షణ',
    metricAudit: 'సందేహరహితం',
    metricAuditVal: 'మార్చలేని ఆడిట్ రికార్డు',

    // Core Pipeline
    pipelineBadge: 'కీలక సాంకేతిక ముఖ్యాంశాలు',
    pipelineTitle: 'పారదర్శక ఆధారాల నుండి నిర్ణయ ప్రక్రియ',
    pipelineSubtitle:
      'పౌరుడు సేవను ఎంచుకున్నది మొదలుకుని స్పష్టమైన నిర్ణయం మరియు తదుపరి చర్యల వరకు క్లియర్‌గవ్ ఎలా పనిచేస్తుందో చూడండి.',
    pipelineSteps: [
      {
        step: '01',
        title: 'పౌరుల సేవల ఎంపిక',
        description: 'విద్యార్థి ఉపకారవేతన పథకాన్ని ఎంపిక చేసుకుంటారు',
        badge: 'ఇన్‌పుట్',
      },
      {
        step: '02',
        title: 'AI నిబంధనల విశ్లేషణ',
        description: 'ప్రభుత్వ గెజిట్ నియమాలను స్పష్టమైన చట్టపరమైన ప్రమాణాలుగా మారుస్తుంది',
        badge: 'AI ఇంజిన్',
      },
      {
        step: '03',
        title: 'అవసరమైన పత్రాల గుర్తింపు',
        description: 'మూల్యాంకనం కోసం అవసరమైన 5 తప్పనిసరి పత్రాల జాబితాను రూపొందిస్తుంది',
        badge: 'అర్హత ప్రమాణాలు',
      },
      {
        step: '04',
        title: 'సమర్పించిన ఆధారాలతో పోలిక',
        description: 'OCR స్కానింగ్ మరియు వివరాల సమగ్రత తనిఖీ చేస్తుంది',
        badge: 'ధృవీకరణ',
      },
      {
        step: '05',
        title: 'లోపించిన పత్రాల గుర్తింపు',
        description: 'స్పష్టత లేని లేదా గడువు ముగిసిన పత్రాలను గుర్తిస్తుంది',
        badge: 'హెచ్చరిక',
      },
      {
        step: '06',
        title: 'ఎందుకు అవసరమో వివరణ',
        description: 'స్పష్టమైన చట్టపరమైన నిబంధనను ఉదహరిస్తుంది (§4.2 ఆదాయ పరిమితి)',
        badge: 'వివరణాత్మకత',
      },
      {
        step: '07',
        title: 'తదుపరి చర్యను చూపడం',
        description: '1-క్లిక్‌తో లోపాన్ని సరిదిద్దుకునే పరిష్కారాన్ని అందిస్తుంది',
        badge: 'మార్గదర్శకత్వం',
      },
    ],
    humanInTheLoopNotice:
      'మానవ పర్యవేక్షణ: ఒకవేళ స్కాన్ నాణ్యత తక్కువగా ఉన్నా లేదా పుట్టిన తేదీల్లో తేడాలు కనిపించినా, ఆటోమేటెడ్ నిర్ణయం ఆగి సమీక్షకుడి పరిశీలనకు పంపబడుతుంది.',
    btnInspectReviewer: 'సమీక్షకుల క్యూను చూడండి',

    // Test Cases Suite
    evaluatorTestSuite: 'పరిశీలకుల పరీక్షా విభాగం',
    testCasesTitle: 'ఒక్క క్లిక్‌తో వివిధ కేసులను పరీక్షించండి',
    testCasesSubtitle:
      'వివిధ దరఖాస్తు పరిస్థితులలో క్లియర్‌గవ్ ఎలా స్పందిస్తుందో ప్రత్యక్షంగా గమనించండి.',
    selectCasePrompt: 'క్రింది కేసులలో ఒకదాన్ని ఎంచుకోండి',
    currentScenario: 'ప్రస్తుత కేసు',
    runScenario: 'కేసును ప్రారంభించండి',
    scenarioAnanyaDesc:
      'ప్రారంభ దరఖాస్తు స్థితి: 5 నిబంధనలలో 4 నెరవేరాయి. ఆదాయ ధృవీకరణ పత్రం అప్‌లోడ్ చేసి తిరిగి పరిశీలించే ప్రక్రియను పరీక్షించండి.',
    scenarioPriyaDesc:
      'అస్పష్టమైన స్కాన్ నమూనా: ఆటోమేటెడ్ నాణ్యత తనిఖీ మరియు స్పష్టమైన రీ-అప్‌లోడ్ మార్గదర్శకత్వాన్ని ప్రదర్శిస్తుంది.',
    scenarioRahulDesc:
      'పత్రాల మధ్య తేడా (దరఖాస్తు పుట్టిన తేదీ వర్సెస్ ఆధార్ తేదీ) - కేస్‌వర్కర్ పరిశీలనకు సిఫార్సు చేయబడింది.',
    scenarioArjunDesc:
      'ధృవీకరించబడిన ఆధారాల ప్రకారం కుటుంబ వార్షిక ఆదాయం చట్టబద్ధమైన పరిమితి (₹2.5 లక్షలు) కంటే ఎక్కువ.',

    // 3 Feature Highlights
    feat1Tag: 'లోతైన విశ్లేషణ',
    feat1Title: 'ఆధారాల మేధస్సు',
    feat1Desc:
      'నిర్ణయం తీసుకునే ముందు ప్రతి పత్రం యొక్క స్పష్టత, అధికారిక ముద్ర, చెల్లుబాటు గడువు మరియు నిబంధనల సరిపోలికను క్షుణ్ణంగా తనిఖీ చేస్తుంది.',
    feat2Tag: 'పూర్తి పారదర్శకత',
    feat2Title: 'వివరణాత్మక నిర్ణయాలు',
    feat2Desc:
      'క్లియర్‌గవ్ ఏ అంశాలు రుజువయ్యాయి, ఏవి మిగిలిపోయాయి మరియు తదుపరి ఏమి చేయాలో వివరించే స్పష్టమైన ఆడిట్ నివేదికను అందిస్తుంది.',
    feat3Tag: 'అధికారుల రక్షణ',
    feat3Title: 'మానవ పర్యవేక్షణ రక్షణ',
    feat3Desc:
      'పత్రాలలో తేడాలు కనిపించినప్పుడు, వ్యవస్థ అధికారుల ముందు రెండు ఆధారాలను ఉంచి పారదర్శక నిర్ణయం తీసుకునేందుకు తోడ్పడుతుంది.',

    // Dashboard Lifecycle Workflow
    lifecycleTitle: 'దరఖాస్తు జీవిత-చక్ర ప్రయాణం',
    lifecycleSubtitle:
      'సమర్పణ నుండి ధృవీకరణ, మానవ సమీక్ష మరియు ఉపకారవేతనం విడుదల వరకు పూర్తి పురోగతి',
    lifecycleActivePhase: 'ప్రస్తుత దశ: ధృవీకరణ & నిబంధనల మూల్యాంకనం',
    phase1Title: 'దరఖాస్తు నమోదు',
    phase1Desc: 'వ్యక్తిగత మరియు విద్యా వివరాలు పూర్తయ్యాయి',
    phase2Title: 'ఆధారాల సేకరణ',
    phase2Desc: 'పత్రాల ఆధారాలు ధృవీకరించబడ్డాయి',
    phase3Title: 'నియమ ఇంజిన్',
    phase3Desc: 'చట్టబద్ధమైన అర్హత ప్రమాణాల మూల్యాంకనం జరుగుతోంది',
    phase4Title: 'తుది నిర్ణయం',
    phase4DescReady: 'ఆర్థిక సహాయం విడుదలకు సిద్ధంగా ఉంది',
    phase4DescAwaiting: 'లోపించిన ఆధారాల పరిష్కారం కోసం ఎదురుచూస్తోంది',

    // Application Health Index
    healthTitle: 'దరఖాస్తు ఆరోగ్య సూచిక',
    healthSubtitle: 'కేసు సంపూర్ణత మరియు సమీక్ష అర్హతపై సమగ్ర విశ్లేషణ',
    healthGood: 'ఆరోగ్య స్థితి: ఉత్తమం',
    healthCompleteness: 'సంపూర్ణత',
    healthCompletenessDesc: 'నిబంధనలు నెరవేరాయి',
    healthQuality: 'ఆధారాల నాణ్యత',
    healthQualityDesc: 'సగటు OCR మరియు ధృవీకరణ విశ్వసనీయత',
    healthConsistency: 'సమాచార సమగ్రత',
    healthConsistencyDesc: 'పత్రాలలో గుర్తింపు వివరాల ఏకరూపత',
    healthReadiness: 'సమీక్ష సంసిద్ధత',
    healthReadinessDesc: 'వెంటనే ఆటోమేటెడ్ నిర్ణయానికి అర్హత',

    // Simulator
    simBadge: 'ఇంటరాక్టివ్ సిమ్యులేటర్',
    simTitle: 'ఒకవేళ నేను లోపించిన పత్రాలను అప్‌లోడ్ చేస్తే ఏమి జరుగుతుంది?',
    simSubtitle: 'ఖచ్చితమైన స్థితి అంచనా',
    simDesc:
      'దరఖాస్తుదారు అవసరమైన ఆదాయ ధృవీకరణ పత్రాన్ని సమర్పించినప్పుడు ఖచ్చితమైన ఫలితాన్ని పరీక్షించండి. క్లియర్‌గవ్ వెంటనే నియమాలను పునఃసమీక్షిస్తుంది.',
    simActiveBadge: 'సిమ్యులేషన్ క్రియాశీలం',
    simSandboxBadge: 'ఇంటరాక్టివ్ శాండ్‌బాక్స్',
    simCurrentEval: 'ప్రస్తుత మూల్యాంకనం',
    simProjected: 'అంచనా వేసిన ఫలితం',
    simBtnSimulate: 'అప్‌లోడ్ సిమ్యులేషన్: ఆదాయ ధృవీకరణ పత్రం',
    simBtnRevert: 'సిమ్యులేషన్ రద్దు చేయండి',

    // Next Best Action
    nextActionEngine: 'మార్గదర్శక ఇంజిన్',
    nextActionHeading: 'సిఫార్సు చేయబడిన ఉత్తమ చర్య',
    nextActionDirection: 'నియమ ఆధారిత సూచన',
    nextActionTarget: 'లక్ష్య చర్య',
    nextActionWhy: 'ఇది ఎందుకు అవసరం (చట్టబద్ధమైన ఆధారం)',
    nextActionHow: 'దీనిని ఎలా పరిష్కరించాలి',
    nextActionResolveGap: 'ఆధారాల లోపాన్ని పరిష్కరించండి',
    nextActionReviewLetter: 'అధికారిక నిర్ణయ పత్రాన్ని సమీక్షించండి',
    nextActionAdjudicateQueue: 'సమీక్షకుల పరిశీలనను తెరవండి',
  },
};

export const LANGUAGE_OPTIONS = [
  { code: 'en' as Language, label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
  { code: 'hi' as Language, label: 'Hindi', nativeLabel: 'हिन्दी', flag: '🇮🇳' },
  { code: 'te' as Language, label: 'Telugu', nativeLabel: 'తెలుగు', flag: '🇮🇳' },
];
