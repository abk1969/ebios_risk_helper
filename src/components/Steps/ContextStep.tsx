import React, { useState, useEffect } from 'react';
import HelpTooltip from '../HelpTooltip';
import Button from '../Button';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import { EbiosFormData } from '../../types';

interface ContextStepProps {
  nextStep: () => void;
  prevStep: () => void;
  updateData: (data: Partial<EbiosFormData>) => void;
  context: string;
}

export const ContextStep: React.FC<ContextStepProps> = ({
  nextStep,
  prevStep,
  updateData,
  context,
}) => {
  const [localContext, setLocalContext] = useState(context);
  const [error, setError] = useState<string>('');

  const { currentStepIndex } = useMultiStepForm([]);

  useEffect(() => {
    setLocalContext(context);
  }, [context]);

  const validateContext = (value: string) => {
    if (!value.trim()) {
      return 'Le contexte est requis.';
    }
    if (value.length < 20) {
      return 'Le contexte doit contenir au moins 20 caractères.';
    }
    return '';
  };

  const handleContextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContext = e.target.value;
    setLocalContext(newContext);
    setError(validateContext(newContext));
  };

  const handleNext = () => {
    const validationError = validateContext(localContext);
    if (validationError) {
      setError(validationError);
      return;
    }
    updateData({ context: localContext });
    nextStep();
  };

  return (
    <div>
      <div className="flex items-center mb-2">
        <h3 className="text-lg font-medium">
          Contexte de l'analyse{' '}
          <HelpTooltip text="Décrivez le contexte de votre analyse EBIOS RM. Par exemple, indiquez le nom de votre organisation, son secteur d'activité, les objectifs de l'analyse, etc." />
        </h3>
      </div>
      <div className="mb-4">
        <label
          htmlFor="context-description"
          className="block text-sm font-medium text-gray-700"
        >
          Description du contexte
        </label>
        <textarea
          id="context-description"
          className={`mt-1 block w-full py-2 px-3 border ${
            error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          } bg-white rounded-md shadow-sm focus:outline-none  sm:text-sm`}
          value={localContext}
          onChange={handleContextChange}
          placeholder="Décrivez le contexte de votre analyse, les objectifs, les limites, les acteurs, etc..."
          rows={4}
          aria-describedby={error ? 'context-error' : undefined}
        />
        {error && (
          <p id="context-error" className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
      <div className="mt-2 mb-4">
        <p className="text-sm text-gray-600">Exemples de contexte :</p>
        <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
          <li>
            "Analyse EBIOS RM pour une PME de 50 salariés spécialisée dans le
            développement web."
          </li>
          <li>
            "Évaluation des risques liés à la mise en place d'un nouveau service
            cloud pour une start-up du secteur de la santé."
          </li>
        </ul>
      </div>

      <div className="mt-6 flex justify-between gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={prevStep}
          disabled={currentStepIndex === 0}
        >
          Retour
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          disabled={!!error || !localContext.trim()}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
};
