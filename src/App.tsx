import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Import des composants
import { ContextStep } from './components/Steps/ContextStep';
import { StakeholdersStep } from './components/Steps/StakeholdersStep';
import { BusinessValuesStep } from './components/Steps/BusinessValuesStep';
import { ThreatsStep } from './components/Steps/ThreatsStep';
import { FearedEventsStep } from './components/Steps/FearedEventsStep';
import { ScenariosStep } from './components/Steps/ScenariosStep';
import { RisksStep } from './components/Steps/RisksStep';
import { RiskReport } from './components/Report/RiskReport';
import StepHeader from './components/StepHeader';
import Button from './components/Button';

// Import des hooks et types
import { useMultiStepForm } from './hooks/UseMultiStepForm';
import {
  EbiosFormData,
  Stakeholder,
  BusinessValue,
  Threat,
  FearedEvent,
  Scenario,
  Risk,
} from './types';

// Import des services
import { loadEbiosData, saveEbiosData } from './services/ebiosService';

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    CurrentStepComponent,
    currentStepIndex,
    currentStep,
    steps,
    isFirstStep,
    isLastStep,
    data,
    updateData,
    nextStep,
    prevStep,
  } = useMultiStepForm([
    {
      title: 'Étape 1 : Contexte',
      component: ContextStep,
      validation: (data: EbiosFormData) => {
        return data.context.trim().length >= 20;
      },
    },
    {
      title: 'Étape 2a : Parties prenantes',
      component: StakeholdersStep,
      validation: (data: EbiosFormData) => {
        return data.stakeholders.length > 0;
      },
    },
    {
      title: 'Étape 2b : Valeurs métier',
      component: BusinessValuesStep,
      validation: (data: EbiosFormData) => {
        return data.businessValues.length > 0;
      },
    },
    {
      title: 'Étape 3 : Menaces',
      component: ThreatsStep,
      validation: (data: EbiosFormData) => {
        return data.threats.length > 0;
      },
    },
    {
      title: 'Étape 4 : Événements redoutés',
      component: FearedEventsStep,
      validation: (data: EbiosFormData) => {
        return data.fearedEvents.length > 0;
      },
    },
    {
      title: 'Étape 5 : Scénarios de menace',
      component: ScenariosStep,
      validation: (data: EbiosFormData) => {
        return data.scenarios.length > 0;
      },
    },
    {
      title: 'Étape 6 : Risques',
      component: RisksStep,
      validation: (data: EbiosFormData) => {
        return data.risks.length > 0;
      },
    },
    {
      title: 'Rapport de risques',
      component: RiskReport,
    },
  ]);

  // Charger les données au démarrage
  useEffect(() => {
    const loadInitialData = async () => {
      const savedData = await loadEbiosData();
      if (savedData) {
        updateData(savedData);
      }
      setLoading(false);
    };
    loadInitialData();
  }, []);

  // Sauvegarder les données à chaque modification
  useEffect(() => {
    if (!loading) {
      saveEbiosData(data);
    }
  }, [data, loading]);

  const handleContextNext = (context: string) => {
    updateData({ context });
    nextStep();
  };

  const handleStakeholdersNext = (stakeholders: Stakeholder[]) => {
    updateData({ stakeholders });
    nextStep();
  };

  const handleBusinessValuesNext = (businessValues: BusinessValue[]) => {
    updateData({ businessValues });
    nextStep();
  };

  const handleThreatsNext = (threats: Threat[]) => {
    updateData({ threats });
    nextStep();
  };

  const handleFearedEventsNext = (fearedEvents: FearedEvent[]) => {
    updateData({ fearedEvents });
    nextStep();
  };

  const handleScenariosNext = (scenarios: Scenario[]) => {
    updateData({ scenarios });
    nextStep();
  };

  const handleRisksSubmit = (risks: Risk[]) => {
    updateData({ risks });
    navigate('/report');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-blue-600 shadow-md py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-white">EBIOS RM</h1>
        </div>
      </header>

      <main className="container mx-auto mt-6 px-4">
        <Routes>
          <Route
            path="/"
            element={
              <div className="bg-white shadow rounded-lg p-6">
                <StepHeader
                  title={currentStep.title}
                  stepNumber={currentStepIndex + 1}
                  totalSteps={steps.length}
                  description=""
                />

                {CurrentStepComponent === ContextStep && (
                  <ContextStep
                    context={data.context}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    updateData={updateData}
                  />
                )}
                {CurrentStepComponent === StakeholdersStep && (
                  <StakeholdersStep
                    stakeholders={data.stakeholders}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    updateData={updateData}
                  />
                )}
                {CurrentStepComponent === BusinessValuesStep && (
                  <BusinessValuesStep
                    businessValues={data.businessValues}
                    stakeholders={data.stakeholders}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    updateData={updateData}
                  />
                )}
                {CurrentStepComponent === ThreatsStep && (
                  <ThreatsStep
                    threats={data.threats}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    updateData={updateData}
                  />
                )}
                {CurrentStepComponent === FearedEventsStep && (
                  <FearedEventsStep
                    fearedEvents={data.fearedEvents}
                    businessValues={data.businessValues}
                    threats={data.threats}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    updateData={updateData}
                  />
                )}
                {CurrentStepComponent === ScenariosStep && (
                  <ScenariosStep
                    scenarios={data.scenarios}
                    threats={data.threats}
                    fearedEvents={data.fearedEvents}
                    businessValues={data.businessValues}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    updateData={updateData}
                  />
                )}
                {CurrentStepComponent === RisksStep && (
                  <RisksStep
                    risks={data.risks}
                    scenarios={data.scenarios}
                    onSubmit={handleRisksSubmit}
                    onBack={prevStep}
                  />
                )}

                {/* Navigation par bouton (sauf pour la dernière étape) */}
                {currentStepIndex < steps.length - 1 && (
                  <div className="mt-6 flex justify-between">
                    <Button onClick={prevStep} disabled={isFirstStep}>
                      Précédent
                    </Button>
                    <Button onClick={nextStep} disabled={isLastStep}>
                      Suivant
                    </Button>
                  </div>
                )}
                {/* Bouton de retour pour la dernière étape */}
                {currentStepIndex === steps.length - 1 && (
                  <div className="mt-6">
                    <Button onClick={prevStep}>Retour</Button>
                  </div>
                )}
              </div>
            }
          />
          <Route
            path="/report"
            element={
              <RiskReport
                risks={data.risks}
                scenarios={data.scenarios}
                businessValues={data.businessValues}
                threats={data.threats}
                fearedEvents={data.fearedEvents}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;