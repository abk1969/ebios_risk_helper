import { useMultiStepForm } from './hooks/useMultiStepForm';
import { ContextStep } from './components/Steps/ContextStep';
import { StakeholdersStep } from './components/Steps/StakeholdersStep';
import { BusinessValuesStep } from './components/Steps/BusinessValuesStep';
import { ThreatsStep } from './components/Steps/ThreatsStep';
import { FearedEventsStep } from './components/Steps/FearedEventsStep';
import { ScenariosStep } from './components/Steps/ScenariosStep';
import { RisksStep } from './components/Steps/RisksStep';
import { ResultsStep } from './components/Steps/ResultsStep';
import type { EbiosFormData, Step } from './types';
import { saveAnalysis } from './services/ebiosService';

const steps: Step[] = [
  {
    title: 'Contexte',
    component: ContextStep,
    validation: (data: EbiosFormData) => !!data.context.trim(),
  },
  {
    title: 'Parties prenantes',
    component: StakeholdersStep,
    validation: (data: EbiosFormData) => data.stakeholders.length > 0,
  },
  {
    title: 'Valeurs métier',
    component: BusinessValuesStep,
    validation: (data: EbiosFormData) => data.businessValues.length > 0,
  },
  {
    title: 'Menaces',
    component: ThreatsStep,
    validation: (data: EbiosFormData) => data.threats.length > 0,
  },
  {
    title: 'Événements redoutés',
    component: FearedEventsStep,
    validation: (data: EbiosFormData) => data.fearedEvents.length > 0,
  },
  {
    title: 'Scénarios',
    component: ScenariosStep,
    validation: (data: EbiosFormData) => data.scenarios.length > 0,
  },
  {
    title: 'Risques',
    component: RisksStep,
    validation: (data: EbiosFormData) => data.risks.length > 0,
  },
  {
    title: 'Résultats',
    component: ResultsStep,
  },
];

function App() {
  const {
    currentStepIndex,
    currentStep,
    data,
    setData,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
    CurrentStepComponent,
  } = useMultiStepForm(steps);

  const handleSubmit = async (updatedData: Partial<EbiosFormData>) => {
    const newData = {
      ...data,
      ...updatedData
    };
    setData(newData);

    if (isLastStep) {
      try {
        await saveAnalysis(newData);
      } catch (error) {
        console.error('Error saving analysis:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4">
            Assistant d'analyse des risques EBIOS RM
          </h1>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{currentStep.title}</h2>
              <div className="text-sm text-gray-500">
                Étape {currentStepIndex + 1} sur {steps.length}
              </div>
            </div>
            <div className="h-2 bg-gray-200 rounded">
              <div
                className="h-full bg-blue-500 rounded transition-all duration-300"
                style={{
                  width: `${((currentStepIndex + 1) / steps.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <CurrentStepComponent
            data={data}
            onSubmit={handleSubmit}
          />

          <div className="mt-6 flex justify-between">
            {!isFirstStep && (
              <button
                onClick={prevStep}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Précédent
              </button>
            )}
            {!isLastStep && (
              <button
                onClick={nextStep}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-auto"
                disabled={!currentStep.validation?.(data)}
              >
                Suivant
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;