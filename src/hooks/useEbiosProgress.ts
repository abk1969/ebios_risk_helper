import { useState } from 'react';
import { EbiosWorkshop } from '../types/ebios';

export function useEbiosProgress() {
  const [currentWorkshop, setCurrentWorkshop] = useState<EbiosWorkshop>(EbiosWorkshop.SOCLE);
  
  const canProceedToNextWorkshop = (analysis: EbiosAnalysis): boolean => {
    switch (currentWorkshop) {
      case EbiosWorkshop.SOCLE:
        return !!analysis.context.scope && analysis.securityBaseline.measures.length > 0;
      case EbiosWorkshop.SOURCES:
        return analysis.riskSources.length > 0;
      case EbiosWorkshop.SCENARIOS:
        return analysis.strategicScenarios.length > 0;
      case EbiosWorkshop.OPERATIONNEL:
        return analysis.operationalScenarios.length > 0;
      case EbiosWorkshop.TRAITEMENT:
        return true;
      default:
        return false;
    }
  };

  const nextWorkshop = () => {
    setCurrentWorkshop(prev => Math.min(prev + 1, EbiosWorkshop.TRAITEMENT));
  };

  const previousWorkshop = () => {
    setCurrentWorkshop(prev => Math.max(prev - 1, EbiosWorkshop.SOCLE));
  };

  return {
    currentWorkshop,
    setCurrentWorkshop,
    canProceedToNextWorkshop,
    nextWorkshop,
    previousWorkshop,
  };
} 