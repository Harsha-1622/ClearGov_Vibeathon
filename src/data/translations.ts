import { Language } from '../types';

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
  },
};

export const LANGUAGE_OPTIONS = [
  { code: 'en' as Language, label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
  { code: 'hi' as Language, label: 'Hindi', nativeLabel: 'हिन्दी', flag: '🇮🇳' },
  { code: 'te' as Language, label: 'Telugu', nativeLabel: 'తెలుగు', flag: '🇮🇳' },
];
