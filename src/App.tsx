import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { ToastContainer } from './components/ToastContainer';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ServiceSelectPage } from './pages/ServiceSelectPage';
import { ApplicantInfoPage } from './pages/ApplicantInfoPage';
import { EvidencePage } from './pages/EvidencePage';
import { AssessmentPage } from './pages/AssessmentPage';
import { DecisionPage } from './pages/DecisionPage';
import { ReviewerPage } from './pages/ReviewerPage';
import { Shield } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentRoute } = useApp();

  const renderPage = () => {
    switch (currentRoute) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'services':
        return <ServiceSelectPage />;
      case 'applicant':
        return <ApplicantInfoPage />;
      case 'evidence':
        return <EvidencePage />;
      case 'assessment':
        return <AssessmentPage />;
      case 'decision':
        return <DecisionPage />;
      case 'reviewer':
        return <ReviewerPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/60 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Screen Content */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Real-time Toast Notifications */}
      <ToastContainer />

      {/* Civic-Tech Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-blue-700 text-white flex items-center justify-center font-bold text-[10px]">
              <Shield className="w-3 h-3" />
            </div>
            <span className="font-bold text-slate-800">ClearGov</span>
            <span>—</span>
            <span className="text-slate-600">From Evidence to Decision</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Deterministic Civic Assessment Prototype</span>
            <span>•</span>
            <span>Zero Mock APIs / Clean State</span>
            <span>•</span>
            <span>Public Sector Hackathon Edition</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
