import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from './ui/Tooltip';
import type { StepHeaderProps } from '../types';

export const StepHeader: React.FC<StepHeaderProps> = ({
  currentStep,
  currentStepIndex,
  totalSteps
}) => (
  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          {currentStep.title}
          {currentStep.helpText && (
            <Tooltip content={currentStep.helpText}>
              <HelpCircle className="w-5 h-5 opacity-80" />
            </Tooltip>
          )}
        </h2>
        <p className="text-blue-100 mt-1">{currentStep.subtitle}</p>
      </div>
      <div className="text-blue-100">
        Étape {currentStepIndex + 1} sur {totalSteps}
      </div>
    </div>
  </div>
);