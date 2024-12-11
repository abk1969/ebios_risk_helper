import { ArrowLeft, ArrowRight, Save } from 'lucide-react';

interface NavigationButtonsProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  onPrevious: () => void;
  onNext: () => void;
  isValid?: boolean;
  isSaving?: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  isFirstStep,
  isLastStep,
  onPrevious,
  onNext,
  isValid = true,
  isSaving = false,
}) => (
  <div className="flex justify-between mt-8">
    {!isFirstStep && (
      <button
        onClick={onPrevious}
        className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        disabled={isSaving}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Précédent
      </button>
    )}
    <button
      onClick={onNext}
      disabled={!isValid || isSaving}
      className={`flex items-center px-4 py-2 text-white rounded-lg transition-colors ml-auto
        ${isValid && !isSaving 
          ? 'bg-blue-600 hover:bg-blue-700' 
          : 'bg-gray-400 cursor-not-allowed'}`}
    >
      {isSaving ? (
        <>
          <Save className="w-4 h-4 mr-2 animate-spin" />
          Sauvegarde...
        </>
      ) : (
        <>
          {isLastStep ? 'Terminer' : 'Suivant'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </>
      )}
    </button>
  </div>
); 