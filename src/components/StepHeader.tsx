import React from 'react';
import HelpTooltip from './HelpTooltip';

interface StepHeaderProps {
  title: string;
  currentStep: number;
  totalSteps: number;
  helpText?: string;
  className?: string;
}

const StepHeader: React.FC<StepHeaderProps> = ({
  title,
  currentStep,
  totalSteps,
  helpText,
  className = '',
}) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-bold">{title}</h2>
          {helpText && <HelpTooltip content={helpText} />}
        </div>
        <div className="text-sm text-gray-500">
          Étape {currentStep + 1} sur {totalSteps}
        </div>
      </div>

      {/* Barre de progression */}
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default StepHeader;