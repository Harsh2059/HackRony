import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ActiveScreen, DemoState } from '../types';

interface DemoContextType {
  state: DemoState;
  setTheme: (theme: 'light' | 'dark') => void;
  navigate: (screen: ActiveScreen) => void;
  resetDemo: () => void;
  applyFixAndVerify: () => Promise<void>;
  commitChanges: () => void;
  setModal: (modalName: 'whyOnly3' | 'contextVsSeverity' | 'settings' | 'commit', isOpen: boolean) => void;
  isPatching: boolean;
  activeVerificationIndex: number;
}

const initialDemoState: DemoState = {
  currentScreen: 'ide', // Starts inside VS Code experience
  theme: (localStorage.getItem('shieldflow_theme') as 'light' | 'dark') || 'light',
  repository: 'payments-api',
  environment: 'Production',
  findingState: 'OPEN',
  remediationStatus: 'NOT_STARTED',
  verificationStatus: 'NOT_STARTED',
  riskScore: 92,
  releaseDecision: 'BLOCK',
  commitStatus: 'UNCOMMITTED',
  problemsCount: 1,
  activeFindingId: 'FINDING-101',
  showWhyOnly3Modal: false,
  showContextVsSeverityModal: false,
  showSettingsModal: false,
  showCommitModal: false,
};

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<DemoState>(initialDemoState);
  const [isPatching, setIsPatching] = useState<boolean>(false);
  const [activeVerificationIndex, setActiveVerificationIndex] = useState<number>(-1);

  // Sync theme class on <html> and <body> elements
  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('shieldflow_theme', state.theme);
  }, [state.theme]);

  const setTheme = (theme: 'light' | 'dark') => {
    setState((prev) => ({ ...prev, theme }));
  };

  const navigate = (currentScreen: ActiveScreen) => {
    setState((prev) => ({ ...prev, currentScreen }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setModal = (modalName: 'whyOnly3' | 'contextVsSeverity' | 'settings' | 'commit', isOpen: boolean) => {
    setState((prev) => {
      switch (modalName) {
        case 'whyOnly3':
          return { ...prev, showWhyOnly3Modal: isOpen };
        case 'contextVsSeverity':
          return { ...prev, showContextVsSeverityModal: isOpen };
        case 'settings':
          return { ...prev, showSettingsModal: isOpen };
        case 'commit':
          return { ...prev, showCommitModal: isOpen };
        default:
          return prev;
      }
    });
  };

  const applyFixAndVerify = async () => {
    setIsPatching(true);
    setState((prev) => ({
      ...prev,
      remediationStatus: 'APPLYING',
      verificationStatus: 'RUNNING',
      findingState: 'REMEDIATING',
      currentScreen: 'remediation',
    }));

    // Step 1: Patch Application (1.2s delay)
    await new Promise((r) => setTimeout(r, 1200));
    setState((prev) => ({ ...prev, remediationStatus: 'APPLIED', findingState: 'VERIFYING' }));

    // Step 2: Live Verification Scan Progression (4 checks, ~650ms each)
    for (let i = 0; i < 4; i++) {
      setActiveVerificationIndex(i);
      await new Promise((r) => setTimeout(r, 650));
    }

    // Step 3: Verification Completed & Risk Recalculated
    setIsPatching(false);
    setActiveVerificationIndex(4); // All passed

    setState((prev) => ({
      ...prev,
      verificationStatus: 'PASSED',
      findingState: 'RESOLVED',
      riskScore: 8,
      releaseDecision: 'ALLOW',
      problemsCount: 0,
    }));
  };

  const commitChanges = () => {
    setState((prev) => ({
      ...prev,
      commitStatus: 'COMMITTED',
      showCommitModal: false,
      currentScreen: 'cicd',
    }));
  };

  const resetDemo = () => {
    setIsPatching(false);
    setActiveVerificationIndex(-1);
    setState({
      ...initialDemoState,
      theme: state.theme, // Preserve light/dark preference
    });
  };

  return (
    <DemoContext.Provider
      value={{
        state,
        setTheme,
        navigate,
        resetDemo,
        applyFixAndVerify,
        commitChanges,
        setModal,
        isPatching,
        activeVerificationIndex,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
