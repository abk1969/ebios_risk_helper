import React from 'react';
import { useEbiosProgress } from '../hooks/useEbiosProgress';
import { useAnalysis } from '../context/AnalysisContext';
import { EbiosWorkshop } from '../types/ebios';

// Composants pour chaque atelier
import { SecurityBaselineWorkshop } from './workshops/SecurityBaselineWorkshop';
import { RiskSourcesWorkshop } from './workshops/RiskSourcesWorkshop';
import { StrategicScenariosWorkshop } from './workshops/StrategicScenariosWorkshop';
import { OperationalScenariosWorkshop } from './workshops/OperationalScenariosWorkshop';
import { RiskTreatmentWorkshop } from './workshops/RiskTreatmentWorkshop';

export const EbiosAnalysis: React.FC = () => {
  const { analysisData, updateAnalysis } = useAnalysis();
  const { currentWorkshop, canProceedToNextWorkshop, nextWorkshop, previousWorkshop } = useEbiosProgress();

  const renderCurrentWorkshop = (): JSX.Element | null => {
    switch (currentWorkshop) {
      case EbiosWorkshop.SOCLE:
        return <SecurityBaselineWorkshop data={analysisData} onUpdate={updateAnalysis} />;
      case EbiosWorkshop.SOURCES:
        return <RiskSourcesWorkshop data={analysisData} onUpdate={updateAnalysis} />;
      case EbiosWorkshop.SCENARIOS:
        return <StrategicScenariosWorkshop data={analysisData} onUpdate={updateAnalysis} />;
      case EbiosWorkshop.OPERATIONNEL:
        return <OperationalScenariosWorkshop data={analysisData} onUpdate={updateAnalysis} />;
      case EbiosWorkshop.TRAITEMENT:
        return <RiskTreatmentWorkshop data={analysisData} onUpdate={updateAnalysis} />;
      default:
        console.warn(`Atelier inconnu: ${currentWorkshop}`);
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Analyse EBIOS RM</h1>
      
      {/* Navigation entre les ateliers */}
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={previousWorkshop}
          disabled={currentWorkshop === EbiosWorkshop.SOCLE}
          className={`px-4 py-2 bg-primary text-white rounded ${
            currentWorkshop === EbiosWorkshop.SOCLE ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Atelier précédent
        </button>
        
        <div className="text-lg font-semibold">
          Atelier {currentWorkshop + 1} sur 5
        </div>
        
        <button 
          onClick={nextWorkshop}
          disabled={!canProceedToNextWorkshop(analysisData)}
          className={`px-4 py-2 bg-primary text-white rounded ${
            !canProceedToNextWorkshop(analysisData) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Atelier suivant
        </button>
      </div>

      {/* Contenu de l'atelier courant */}
      {renderCurrentWorkshop()}
    </div>
  );
}; 