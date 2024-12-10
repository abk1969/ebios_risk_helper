import React from 'react';

interface StepHeaderProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  description: string;
}

const StepHeader: React.FC<StepHeaderProps> = ({
  stepNumber,
  totalSteps,
  title,
  description,
}) => {
  const progress = (stepNumber / totalSteps) * 100;

  return (
    <div className="mb-6">
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Étape ${stepNumber} sur ${totalSteps}`}
        ></div>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <span className="flex items-center justify-center w-8 h-8 text-sm font-semibold text-white bg-blue-600 rounded-full">
          {stepNumber}
        </span>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {totalSteps && (
          <span className="text-sm text-gray-600">
            (Étape {stepNumber}/{totalSteps})
          </span>
        )}
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default StepHeader;