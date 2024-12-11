import React, { createContext, useContext, useState } from 'react';
import type { EbiosFormData } from '../types';

interface AnalysisContextType {
  analysisData: EbiosFormData | null;
  updateAnalysis: (data: Partial<EbiosFormData>) => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [analysisData, setAnalysisData] = useState<EbiosFormData | null>(null);

  const updateAnalysis = (data: Partial<EbiosFormData>) => {
    setAnalysisData(prev => prev ? { ...prev, ...data } : null);
  };

  return (
    <AnalysisContext.Provider value={{ analysisData, updateAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
}