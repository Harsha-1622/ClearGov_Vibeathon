import React, { useState } from 'react';
import {
  FileText,
  CheckSquare,
  Scale,
  UserCheck,
  Menu,
  X,
  FileCheck,
  LayoutDashboard,
  Home,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageRoute } from '../types';
import { DemoSwitcher } from './DemoSwitcher';
import { NotificationCenter } from './NotificationCenter';
import { GovernmentSymbol } from './GovernmentSymbol';
import { LanguageSelector } from './LanguageSelector';

export const Navbar: React.FC = () => {
  const { currentRoute, setCurrentRoute, t, language } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { route: PageRoute; label: string; icon: React.ReactNode }[] = [
    { route: 'landing', label: t.navHome, icon: <Home className="w-4 h-4" /> },
    { route: 'dashboard', label: t.navDashboard, icon: <LayoutDashboard className="w-4 h-4" /> },
    { route: 'services', label: t.navApplications, icon: <FileText className="w-4 h-4" /> },
    { route: 'evidence', label: t.navEvidence, icon: <FileCheck className="w-4 h-4" /> },
    { route: 'assessment', label: t.navAssessment, icon: <CheckSquare className="w-4 h-4" /> },
    { route: 'decision', label: t.navDecision, icon: <Scale className="w-4 h-4" /> },
    { route: 'reviewer', label: t.navReviewer, icon: <UserCheck className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-30 shadow-xs backdrop-blur-md bg-white/95 border-b border-slate-200">
      {/* Institutional Top Strip */}
      <div className="bg-[#0B2247] text-white py-1.5 px-4 text-[10px] font-semibold tracking-wider flex items-center justify-between border-b border-[#123B7A]">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
            <span className="text-[#FDE68A] font-black uppercase tracking-wider font-serif">
              {language === 'hi' ? 'भारत सरकार' : language === 'te' ? 'భారత ప్రభుత్వం' : 'GOVERNMENT OF INDIA'}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-200 font-bold">{t.officialPlatform}</span>
            <span className="text-slate-500 hidden md:inline">•</span>
            <span className="text-slate-300 hidden md:inline">{t.govMotto}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-300 text-[10px]">
            <span className="hidden lg:inline font-mono text-[#A5F3FC]">
              {t.deterministicEngine}
            </span>
            <span className="bg-[#123B7A] text-[#FDE68A] font-bold px-2 py-0.5 rounded text-[9px] border border-[#F59E0B]/30">
              {t.hackathonDemo}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Government Emblem */}
          <div className="flex items-center gap-3">
            <button
              id="nav-brand-logo"
              type="button"
              onClick={() => setCurrentRoute('landing')}
              className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
            >
              {/* Official Government Symbol Icon */}
              <GovernmentSymbol size="sm" />

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-black text-slate-900 tracking-tight block leading-tight">
                    ClearGov
                  </span>
                  <span className="text-[9px] font-black bg-[#E8EEF8] text-[#123B7A] px-1.5 py-0.5 rounded border border-[#123B7A]/20">
                    GOVT
                  </span>
                </div>
                <span className="text-[10px] font-extrabold tracking-wider text-[#123B7A] block -mt-0.5">
                  {t.appTagline}
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  id={`nav-link-${item.route}`}
                  onClick={() => setCurrentRoute(item.route)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#123B7A] text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Language Selector + Notification Center + Demo Switcher + Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Multi-language Selector (English / Hindi / Telugu) */}
            <LanguageSelector variant="navbar" />

            <NotificationCenter />
            <DemoSwitcher />

            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <div className="py-1 border-b border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              {t.selectLanguage}
            </span>
            <LanguageSelector variant="compact" />
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => {
                    setCurrentRoute(item.route);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#E8EEF8] text-[#123B7A] font-black border border-[#123B7A]/20'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

