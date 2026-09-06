import React from 'react';
import { DemoProvider, useDemo } from './context/DemoContext';
import { DemoControlsBar } from './components/layout/DemoControlsBar';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { IDESecurityPage } from './pages/IDESecurityPage';
import { ContextRiskPage } from './pages/ContextRiskPage';
import { RemediationVerifPage } from './pages/RemediationVerifPage';
import { CICDPage } from './pages/CICDPage';
import { DashboardPage } from './pages/DashboardPage';
import { FindingsPage } from './pages/FindingsPage';
import { WhyOnly3Modal } from './components/modals/WhyOnly3Modal';
import { ContextVsSeverityModal } from './components/modals/ContextVsSeverityModal';
import { CommitModal } from './components/modals/CommitModal';
import { SettingsModal } from './components/modals/SettingsModal';

const MainContent: React.FC = () => {
  const { state } = useDemo();

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'ide':
        return <IDESecurityPage />;
      case 'context':
        return <ContextRiskPage />;
      case 'remediation':
        return <RemediationVerifPage />;
      case 'cicd':
        return <CICDPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'findings':
        return <FindingsPage />;
      default:
        return <IDESecurityPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* 1. Persistent Top Demo Controls Bar */}
      <DemoControlsBar />

      {/* 2. Top Navigation Header */}
      <Header />

      {/* 3. Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Dynamic Page Viewport */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto max-h-[calc(100vh-90px)]">
          {renderScreen()}
        </main>
      </div>

      {/* 4. Global Interactive Modals */}
      <WhyOnly3Modal />
      <ContextVsSeverityModal />
      <CommitModal />
      <SettingsModal />
    </div>
  );
};

export default function App() {
  return (
    <DemoProvider>
      <MainContent />
    </DemoProvider>
  );
}
