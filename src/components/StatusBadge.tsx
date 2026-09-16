import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  FileQuestion,
  HelpCircle,
  XCircle,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { EvidenceStatus, ApplicationDecisionState } from '../types';
import { useApp } from '../context/AppContext';

type AnyStatus = EvidenceStatus | ApplicationDecisionState | 'RESOLVED' | 'PENDING';

interface StatusBadgeProps {
  status: AnyStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true,
}) => {
  const { language } = useApp();
  let bgClass = 'bg-slate-100 text-slate-700 border-slate-200';
  let icon = <HelpCircle className="w-3.5 h-3.5" />;

  switch (status) {
    case 'VERIFIED':
    case 'SUFFICIENT TO PROCEED':
    case 'RESOLVED':
      bgClass = 'bg-[#DEF7EC] text-[#03543F] border-[#31C48D] font-bold shadow-xs';
      icon = <CheckCircle2 className="w-3.5 h-3.5 text-[#0E9F6E]" />;
      break;
    case 'MISSING':
    case 'ADDITIONAL EVIDENCE REQUIRED':
      bgClass = 'bg-[#FEF3C7] text-[#92400E] border-[#F59E0B] font-bold shadow-xs';
      icon = <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />;
      break;
    case 'UNREADABLE':
    case 'LOW CONFIDENCE':
      bgClass = 'bg-[#EEF2FF] text-[#3730A3] border-[#818CF8] font-bold shadow-xs';
      icon = <FileQuestion className="w-3.5 h-3.5 text-[#6366F1]" />;
      break;
    case 'CONFLICT':
    case 'HUMAN REVIEW REQUIRED':
      bgClass = 'bg-[#FEE2E2] text-[#991B1B] border-[#EF4444] font-bold shadow-xs';
      icon = <ShieldAlert className="w-3.5 h-3.5 text-[#DC2626]" />;
      break;
    case 'CONDITION NOT SATISFIED':
      bgClass = 'bg-[#FFF7ED] text-[#9A3412] border-[#FB923C] font-bold shadow-xs';
      icon = <XCircle className="w-3.5 h-3.5 text-[#EA580C]" />;
      break;
    case 'PENDING':
    case 'INCOMPLETE':
    case 'EXPIRED':
      bgClass = 'bg-slate-100 text-slate-800 border-slate-300 font-semibold';
      icon = <Clock className="w-3.5 h-3.5 text-slate-500" />;
      break;
  }

  // Multilingual translations for statuses
  const getLocalizedStatus = (s: AnyStatus) => {
    if (language === 'hi') {
      const map: Record<string, string> = {
        'VERIFIED': 'सत्यापित (VERIFIED)',
        'MISSING': 'अनुपलब्ध (MISSING)',
        'INCOMPLETE': 'अपूर्ण (INCOMPLETE)',
        'UNREADABLE': 'अस्पष्ट (UNREADABLE)',
        'EXPIRED': 'समाप्त (EXPIRED)',
        'CONFLICT': 'विसंगति (CONFLICT)',
        'LOW CONFIDENCE': 'कम विश्वास (LOW CONFIDENCE)',
        'SUFFICIENT TO PROCEED': 'स्वीकृति हेतु पर्याप्त (SUFFICIENT)',
        'ADDITIONAL EVIDENCE REQUIRED': 'अतिरिक्त साक्ष्य आवश्यक',
        'CONDITION NOT SATISFIED': 'शर्त पूरी नहीं हुई',
        'HUMAN REVIEW REQUIRED': 'मानव समीक्षा आवश्यक',
        'RESOLVED': 'सुलझाया गया (RESOLVED)',
        'PENDING': 'प्रतीक्षारत (PENDING)',
      };
      return map[s] || s;
    }
    if (language === 'te') {
      const map: Record<string, string> = {
        'VERIFIED': 'ధృవీకరించబడింది (VERIFIED)',
        'MISSING': 'లేదు (MISSING)',
        'INCOMPLETE': 'అసంపూర్ణం (INCOMPLETE)',
        'UNREADABLE': 'అస్పష్టం (UNREADABLE)',
        'EXPIRED': 'గడువు ముగిసింది (EXPIRED)',
        'CONFLICT': 'తేడా ఉంది (CONFLICT)',
        'LOW CONFIDENCE': 'తక్కువ నమ్మకం (LOW CONFIDENCE)',
        'SUFFICIENT TO PROCEED': 'ముందుకు వెళ్ళవచ్చు (SUFFICIENT)',
        'ADDITIONAL EVIDENCE REQUIRED': 'అదనపు ఆధారాలు అవసరం',
        'CONDITION NOT SATISFIED': 'నిబంధన నెరవేరలేదు',
        'HUMAN REVIEW REQUIRED': 'మానవ సమీక్ష అవసరం',
        'RESOLVED': 'పరిష్కరించబడింది (RESOLVED)',
        'PENDING': 'పెండింగ్‌లో ఉంది (PENDING)',
      };
      return map[s] || s;
    }
    return s;
  };

  const sizeClasses = {
    sm: 'text-[11px] px-2.5 py-0.5 gap-1.5 font-bold tracking-tight',
    md: 'text-xs px-3 py-1 gap-1.5 font-bold tracking-tight',
    lg: 'text-sm px-4 py-1.5 gap-2 font-black tracking-tight',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border whitespace-nowrap transition-all ${bgClass} ${sizeClasses[size]}`}
    >
      {showIcon && icon}
      <span>{getLocalizedStatus(status)}</span>
    </span>
  );
};

