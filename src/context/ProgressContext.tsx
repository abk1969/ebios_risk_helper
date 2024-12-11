import React, { createContext, useContext, useState } from 'react';

interface ProgressContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <ProgressContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
} 