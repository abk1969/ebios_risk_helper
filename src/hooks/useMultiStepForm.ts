import { useState, Dispatch, SetStateAction } from 'react';
import {
  EbiosFormData,
  Stakeholder,
  BusinessValue,
  Threat,
  FearedEvent,
  Scenario,
  Risk,
} from '../types';

interface Step {
  title: string;
  component: React.ComponentType<any>;
  validation?: (data: EbiosFormData) => boolean; // Fonction de validation pour l'étape
}

interface UseMultiStepFormReturn {
  currentStepIndex: number;
  currentStep: Step;
  CurrentStepComponent: React.ComponentType<any>; // Pour le rendu du composant
  data: EbiosFormData;
  setData: Dispatch<SetStateAction<EbiosFormData>>;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  validateStep: (index: number) => boolean; // Validation pour une étape spécifique
}

export function useMultiStepForm(steps: Step[]): UseMultiStepFormReturn {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [data, setData] = useState<EbiosFormData>({
    context: '',
    stakeholders: [],
    businessValues: [],
    threats: [],
    fearedEvents: [],
    scenarios: [],
    risks: [],
  });

  const currentStep = steps[currentStepIndex];

  const validateStep = (index: number) => {
    const step = steps[index];
    if (step.validation) {
      return step.validation(data);
    }
    return true; // Pas de validation définie pour cette étape, on considère que c'est valide
  };

  const nextStep = () => {
    if (validateStep(currentStepIndex)) {
      setCurrentStepIndex(i => {
        if (i >= steps.length - 1) return i;
        return i + 1;
      });
    }
  };

  const prevStep = () => {
    setCurrentStepIndex(i => {
      if (i <= 0) return i;
      return i - 1;
    });
  };

  const goToStep = (index: number) => {
    // Aller à une étape spécifique, avec validation
    if (index >= 0 && index < steps.length && validateStep(index)) {
      setCurrentStepIndex(index);
    }
  };

  const updateData = (newData: Partial<EbiosFormData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  return {
    currentStepIndex,
    currentStep,
    CurrentStepComponent: currentStep.component,
    data,
    setData,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    validateStep,
  };
}