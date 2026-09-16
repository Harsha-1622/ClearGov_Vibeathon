import React, { useState, useEffect } from 'react';
import {
  User,
  Calendar,
  Building,
  BookOpen,
  Percent,
  IndianRupee,
  CreditCard,
  ArrowRight,
  Sparkles,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GovernmentSymbol } from '../components/GovernmentSymbol';

export const ApplicantInfoPage: React.FC = () => {
  const { scenario, updateApplicantInfo, setCurrentRoute, activeScenarioId, t, language } = useApp();

  const [formData, setFormData] = useState({
    fullName: scenario.applicant.fullName,
    dob: scenario.applicant.dob,
    college: scenario.applicant.college,
    course: scenario.applicant.course,
    academicPercentage: scenario.applicant.academicPercentage,
    annualFamilyIncome: scenario.applicant.annualFamilyIncome,
    bankAccount: scenario.applicant.bankAccount,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData({
      fullName: scenario.applicant.fullName,
      dob: scenario.applicant.dob,
      college: scenario.applicant.college,
      course: scenario.applicant.course,
      academicPercentage: scenario.applicant.academicPercentage,
      annualFamilyIncome: scenario.applicant.annualFamilyIncome,
      bankAccount: scenario.applicant.bankAccount,
    });
    setErrors({});
  }, [scenario.applicant, activeScenarioId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required.';
    if (!formData.dob.trim()) errs.dob = 'Date of Birth is required.';
    if (!formData.college.trim()) errs.college = 'College / Institution is required.';
    if (!formData.course.trim()) errs.course = 'Course is required.';
    if (!formData.academicPercentage.trim()) errs.academicPercentage = 'Academic percentage is required.';
    if (!formData.annualFamilyIncome.trim()) errs.annualFamilyIncome = 'Annual family income is required.';
    if (!formData.bankAccount.trim()) errs.bankAccount = 'Bank account is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    updateApplicantInfo(formData);
    setCurrentRoute('evidence');
  };

  const loadSampleAnanya = () => {
    setFormData({
      fullName: 'Ananya Rao',
      dob: '12/08/2005',
      college: 'Veltech University',
      course: 'B.Tech CSE',
      academicPercentage: '87.4%',
      annualFamilyIncome: '₹2,40,000',
      bankAccount: 'XXXX XXXX 4821',
    });
    setErrors({});
  };

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-10 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-5 border-b border-slate-200">
        <div className="flex items-start gap-3.5">
          <GovernmentSymbol size="md" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#123B7A] bg-[#E8EEF8] px-2.5 py-0.5 rounded-md border border-[#123B7A]/20">
                Stage 02 • Self-Declaration Intake
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-semibold font-serif">
                {language === 'hi' ? 'भारत सरकार' : language === 'te' ? 'భారత ప్రభుత్వం' : 'Government of India'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mt-1.5 tracking-tight">
              Applicant Identification & Record
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Application Dossier Identifier: <span className="font-mono font-bold text-[#123B7A] bg-blue-50 px-2 py-0.5 rounded-md">{scenario.applicant.applicationId}</span>
            </p>
          </div>
        </div>

        <button
          id="btn-load-sample-data"
          type="button"
          onClick={loadSampleAnanya}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#123B7A] hover:text-[#0B2247] bg-[#E8EEF8] hover:bg-blue-100 border border-[#123B7A]/20 px-3.5 py-2 rounded-xl transition-all self-start cursor-pointer shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#123B7A]" />
          <span>{t.btnResetSample}</span>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6 card-premium-hover">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="input-fullname"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Ananya Rao"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.fullName ? 'border-rose-300 bg-rose-50/20' : 'border-slate-300 bg-white'
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Date of Birth *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Calendar className="w-4 h-4" />
              </div>
              <input
                id="input-dob"
                type="text"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                placeholder="DD/MM/YYYY"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.dob ? 'border-rose-300 bg-rose-50/20' : 'border-slate-300 bg-white'
                }`}
              />
            </div>
            {errors.dob && (
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.dob}
              </p>
            )}
          </div>

          {/* Academic Percentage */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Academic Percentage *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Percent className="w-4 h-4" />
              </div>
              <input
                id="input-percentage"
                type="text"
                name="academicPercentage"
                value={formData.academicPercentage}
                onChange={handleChange}
                placeholder="e.g. 87.4%"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.academicPercentage ? 'border-rose-300 bg-rose-50/20' : 'border-slate-300 bg-white'
                }`}
              />
            </div>
            {errors.academicPercentage && (
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.academicPercentage}
              </p>
            )}
          </div>

          {/* College / Institution */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              College / Institution *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Building className="w-4 h-4" />
              </div>
              <input
                id="input-college"
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="e.g. Veltech University"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.college ? 'border-rose-300 bg-rose-50/20' : 'border-slate-300 bg-white'
                }`}
              />
            </div>
            {errors.college && (
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.college}
              </p>
            )}
          </div>

          {/* Course */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Course *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <input
                id="input-course"
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="e.g. B.Tech CSE"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.course ? 'border-rose-300 bg-rose-50/20' : 'border-slate-300 bg-white'
                }`}
              />
            </div>
            {errors.course && (
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.course}
              </p>
            )}
          </div>

          {/* Annual Family Income */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Annual Family Income *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <IndianRupee className="w-4 h-4" />
              </div>
              <input
                id="input-income"
                type="text"
                name="annualFamilyIncome"
                value={formData.annualFamilyIncome}
                onChange={handleChange}
                placeholder="e.g. ₹2,40,000"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.annualFamilyIncome ? 'border-rose-300 bg-rose-50/20' : 'border-slate-300 bg-white'
                }`}
              />
            </div>
            {errors.annualFamilyIncome && (
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.annualFamilyIncome}
              </p>
            )}
          </div>

          {/* Bank Account */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Bank Account *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <CreditCard className="w-4 h-4" />
              </div>
              <input
                id="input-bank"
                type="text"
                name="bankAccount"
                value={formData.bankAccount}
                onChange={handleChange}
                placeholder="XXXX XXXX 4821"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.bankAccount ? 'border-rose-300 bg-rose-50/20' : 'border-slate-300 bg-white'
                }`}
              />
            </div>
            {errors.bankAccount && (
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.bankAccount}
              </p>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            Declared information will be cross-referenced against supporting documentary evidence.
          </p>

          <button
            id="btn-continue-to-evidence"
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-black text-xs bg-[#123B7A] hover:bg-[#0B2247] text-white px-7 py-3.5 rounded-2xl transition-all shadow-md shadow-blue-900/15 cursor-pointer"
          >
            <span>{t.btnProceedToEvidence}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
