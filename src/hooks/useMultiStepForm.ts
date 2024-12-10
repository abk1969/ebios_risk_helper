import { useState } from 'react';
import type { EbiosFormData } from '../types';

export type StepComponent = React.FC<{
  data: EbiosFormData;
  onSubmit: (data: Partial<EbiosFormData>) => void;
}>;

export interface Step {
  title: string;
  component: StepComponent;
  validation?: (data: EbiosFormData) => boolean;
}

const INITIAL_DATA: EbiosFormData = {
  id: crypto.randomUUID(),
  context: '',
  stakeholders: [],
  businessValues: [],
  threats: [],
  fearedEvents: [],
  scenarios: [],
  risks: [],
  actionPlans: [],
};

export function useMultiStepForm(steps: Step[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [data, setData] = useState<EbiosFormData>(INITIAL_DATA);

  function nextStep() {
    setCurrentStepIndex(i => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function prevStep() {
    setCurrentStepIndex(i => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  function goToStep(index: number) {
    if (index >= 0 && index < steps.length) {
      setCurrentStepIndex(index);
    }
  }

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  return {
    currentStepIndex,
    currentStep,
    steps,
    isFirstStep,
    isLastStep,
    goToStep,
    nextStep,
    prevStep,
    data,
    setData,
    CurrentStepComponent: steps[currentStepIndex].component,
  };
}