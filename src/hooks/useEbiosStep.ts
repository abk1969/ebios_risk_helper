import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import type { EbiosFormData } from '../types';
import { CONSTANTS } from '../config/constants';

type StepValidation = (data: EbiosFormData) => boolean;

const stepValidations: Record<number, StepValidation> = {
  1: (data) => data.context.length >= CONSTANTS.STEPS.MIN_CONTEXT_LENGTH,
  2: (data) => data.stakeholders.length >= CONSTANTS.STEPS.MIN_STAKEHOLDERS,
  3: (data) => data.businessValues.length >= CONSTANTS.STEPS.MIN_BUSINESS_VALUES,
  4: (data) => data.threats.length >= CONSTANTS.STEPS.MIN_THREATS,
  5: (data) => data.fearedEvents.length >= CONSTANTS.STEPS.MIN_FEARED_EVENTS
};

export const useEbiosStep = (initialStep = 1) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const navigate = useNavigate();

  const validateStep = useCallback((step: number, data: EbiosFormData): boolean => {
    const validation = stepValidations[step];
    if (!validation) return true;
    return validation(data);
  }, []);

  const nextStep = useCallback((data: EbiosFormData) => {
    if (!validateStep(currentStep, data)) {
      toast.error('Veuillez compléter toutes les informations requises');
      return false;
    }

    setCurrentStep((prev) => Math.min(prev + 1, 5));
    return true;
  }, [currentStep, validateStep]);

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback((step: number, data: EbiosFormData) => {
    if (step < currentStep || validateStep(currentStep, data)) {
      setCurrentStep(step);
      return true;
    }
    toast.error('Veuillez compléter l\'étape actuelle avant de continuer');
    return false;
  }, [currentStep, validateStep]);

  return {
    currentStep,
    nextStep,
    previousStep,
    goToStep,
    validateStep
  };
}; 