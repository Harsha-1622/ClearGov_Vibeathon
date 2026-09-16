import React, { useState, useRef, useEffect } from 'react';
import { Languages, ChevronDown, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import { LANGUAGE_OPTIONS } from '../data/translations';

export const LanguageSelector: React.FC<{ variant?: 'navbar' | 'compact' | 'footer' }> = ({
  variant = 'navbar',
}) => {
  const { language, setLanguage } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption =
    LANGUAGE_OPTIONS.find((opt) => opt.code === language) || LANGUAGE_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
        {LANGUAGE_OPTIONS.map((opt) => (
          <button
            key={opt.code}
            onClick={() => setLanguage(opt.code)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              language === opt.code
                ? 'bg-[#123B7A] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>{opt.nativeLabel}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        id="btn-language-selector"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-300 hover:border-[#123B7A] bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#123B7A]/20"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Languages className="w-3.5 h-3.5 text-[#123B7A]" />
        <span className="font-bold text-slate-900 tracking-tight">
          {currentOption.nativeLabel}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white shadow-xl ring-1 ring-black/10 border border-slate-200 py-1.5 z-50 animate-in fade-in-50 zoom-in-95 duration-100">
          <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
            Select Language • भाषा • భాష
          </div>
          {LANGUAGE_OPTIONS.map((opt) => {
            const isSelected = language === opt.code;
            return (
              <button
                key={opt.code}
                id={`btn-lang-${opt.code}`}
                onClick={() => handleSelect(opt.code)}
                className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#E8EEF8] text-[#123B7A] font-black'
                    : 'text-slate-700 hover:bg-slate-50 font-semibold'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{opt.flag}</span>
                  <div>
                    <span className="block font-black text-slate-900">{opt.nativeLabel}</span>
                    <span className="block text-[10px] text-slate-500 font-medium">
                      {opt.label}
                    </span>
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#123B7A]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
