import type { EbiosFormData, Step } from './index';

export interface UseMultiStepFormReturn {
  currentStepIndex: number;
  currentStep: Step;
  steps: Step[];
  isFirstStep: boolean;
  isLastStep: boolean;
  data: EbiosFormData;
  setData: (data: EbiosFormData) => void;
  goToStep: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  CurrentStepComponent: Step['component'];
}

export interface UseEbiosDataReturn {
  data: EbiosFormData;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export interface UseAuthReturn {
  user: any;
  isLoading: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
} 