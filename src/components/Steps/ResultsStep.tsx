import React from 'react';
import {
  BusinessValue,
  FearedEvent,
  Scenario,
  Risk,
  Threat,
} from '../../types';
import HelpTooltip from '../HelpTooltip';
import { CheckCircle, Edit, Trash2, XCircle } from 'lucide-react';

interface ResultsStepProps {
  onBack: () => void;
  risks: Risk[];
  scenarios: Scenario[];
  businessValues: BusinessValue[];
  threats: Threat[];
  fearedEvents: FearedEvent[];
}

const ResultsStep: React.FC<ResultsStepProps> = ({
  onBack,
  risks,
  scenarios,
  businessValues,
  threats,
  fearedEvents,
}) => {
  const getBusinessValueName = (businessValueId: string) => {
    return (
      businessValues.find(bv => bv.id === businessValueId)?.name ||
      'Valeur métier inconnue'
    );
  };

  const getThreatName = (threatId: string) => {
    return threats.find(t => t.id === threatId)?.name || 'Menace inconnue';
  };

  const getFearedEventDescription = (fearedEventId: string) => {
    const fearedEvent = fearedEvents.find(fe => fe.id === fearedEventId);
    if (!fearedEvent) return 'Événement redouté inconnu';

    const businessValue = businessValues.find(
      bv => bv.id === fearedEvent.businessValueId,
    );
    const threat = threats.find(t => t.id === fearedEvent.threatId);

    return `${businessValue?.name || 'Valeur métier inconnue'} - ${
      threat?.name || 'Menace inconnue'
    }`;
  };

  const calculateRiskLevel = (likelihoodLevel: number, gravityLevel: number) => {
    return likelihoodLevel * gravityLevel;
  };

  const getRiskLevelLabel = (riskLevel: number) => {
    if (riskLevel >= 1 && riskLevel <= 4) {
      return (
        <span className="bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
          Faible
        </span>
      );
    } else if (riskLevel > 4 && riskLevel <= 8) {
      return (
        <span className="bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
          Modéré
        </span>
      );
    } else if (riskLevel > 8 && riskLevel <= 12) {
      return (
        <span className="bg-orange-100 text-orange-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
          Élevé
        </span>
      );
    } else if (riskLevel > 12 && riskLevel <= 16) {
      return (
        <span className="bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
          Critique
        </span>
      );
    } else {
      return (
        <span className="bg-gray-100 text-gray-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
          Inconnu
        </span>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-2">
        <h3 className="text-lg font-medium">
          Synthèse et stratégie de traitement du risque{' '}
          <HelpTooltip text="Visualisez les résultats de l'analyse et définissez la stratégie de traitement du risque." />
        </h3>
      </div>

      {/* Affichage des scénarios et des risques associés */}
      {scenarios.map(scenario => (
        <div key={scenario.id} className="bg-gray-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold text-gray-900">{scenario.name}</h3>
          <p className="text-gray-600">{scenario.description}</p>

          <div className="mt-4">
            <h4 className="font-medium">Menace associée :</h4>
            <p className="text-gray-600">
              {getThreatName(scenario.threatId)}
            </p>
          </div>

          <div className="mt-4">
            <h4 className="font-medium">Événement redouté associé :</h4>
            <p className="text-gray-600">
              {getFearedEventDescription(scenario.fearedEventId)}
            </p>
          </div>

          <div className="mt-4">
            <h4 className="font-medium">Risques :</h4>
            {/* Filtrer les risques liés au scénario actuel */}
            {risks.filter(risk => risk.scenarioId === scenario.id).length > 0 ? (
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 text-left">Vraisemblance</th>
                    <th className="py-2 px-4 text-left">Gravité</th>
                    <th className="py-2 px-4 text-left">Niveau de risque</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {risks
                    .filter(risk => risk.scenarioId === scenario.id)
                    .map(risk => (
                      <tr key={risk.id}>
                        <td className="py-2 px-4">
                          {
                            [
                              'Minime',
                              'Possible',
                              'Probable',
                              'Certaine',
                            ][risk.likelihoodLevel - 1]
                          }
                        </td>
                        <td className="py-2 px-4">
                          {
                            [
                              'Négligeable',
                              'Modéré',
                              'Important',
                              'Critique',
                            ][risk.gravityLevel - 1]
                          }
                        </td>
                        <td className="py-2 px-4">
                          {getRiskLevelLabel(
                            calculateRiskLevel(
                              risk.likelihoodLevel,
                              risk.gravityLevel,
                            ),
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <p>Aucun risque associé à ce scénario.</p>
            )}
          </div>
        </div>
      ))}

      {/* Section pour la stratégie de traitement du risque (à compléter) */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-gray-900">
          Stratégie de traitement du risque
        </h3>
        <p>
          Définissez ici les actions à mettre en place pour traiter les risques
          identifiés (réduction, transfert, acceptation, etc.).
        </p>
        {/* Exemple de suggestion d'actions */}
        <div className="mt-4 space-y-4">
          {risks.map(risk => {
            const riskLevel = calculateRiskLevel(
              risk.likelihoodLevel,
              risk.gravityLevel,
            );
            const scenario = scenarios.find(s => s.id === risk.scenarioId);
            if (riskLevel > 8 && scenario) {
              return (
                <div
                  key={risk.id}
                  className="bg-yellow-50 border-l-4 border-yellow-400 p-4"
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <XCircle
                        className="h-5 w-5 text-yellow-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Le risque lié au scénario{' '}
                        <span className="font-medium">
                          {scenario.name}
                        </span>{' '}
                        est élevé ({getRiskLevelLabel(riskLevel)}).
                        <br />
                        Actions suggérées :
                        <ul className="list-disc list-inside mt-2">
                          <li>
                            Mettre en place des mesures de sécurité
                            supplémentaires.
                          </li>
                          <li>
                            Envisager une formation de sensibilisation à la
                            sécurité pour les employés.
                          </li>
                          <li>
                            Réaliser un audit de sécurité pour identifier les
                            vulnérabilités.
                          </li>
                        </ul>
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={onBack}
        >
          Retour
        </button>
        {/*  
        <Button type="submit">
          Terminer
        </Button> 
        */}
      </div>
    </div>
  );
};

export default ResultsStep;