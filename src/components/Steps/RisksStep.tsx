import React, { useState, useCallback } from 'react';
import type { EbiosFormData, Risk, Scenario, TreatmentStatus } from '../../types';
import { LikelihoodLevel, GravityLevel } from '../../types';
import { calculateRiskLevel } from '../../utils/reportUtils';

interface Props {
  data: EbiosFormData;
  onSubmit: (data: Partial<EbiosFormData>) => void;
}

interface NewRisk {
  scenarioId: string;
  likelihoodLevel: LikelihoodLevel;
  gravityLevel: GravityLevel;
}

// Définir la constante en utilisant le type importé
const TREATMENT_STATUSES: TreatmentStatus[] = ['à traiter', 'en cours', 'traité'];

const RISK_LEVEL_STYLES: Record<string, string> = {
  Critique: 'bg-red-100 text-red-800',
  Élevé: 'bg-orange-100 text-orange-800',
  Modéré: 'bg-yellow-100 text-yellow-800',
  Faible: 'bg-green-100 text-green-800',
};

export const RisksStep: React.FC<Props> = ({ data, onSubmit }) => {
  const [newRisk, setNewRisk] = useState<NewRisk>({
    scenarioId: '',
    likelihoodLevel: LikelihoodLevel.MINIMAL,
    gravityLevel: GravityLevel.NEGLIGIBLE,
  });

  const handleAddRisk = () => {
    if (!newRisk.scenarioId) {
      console.warn('Tentative d\'ajout d\'un risque sans scénario sélectionné');
      return;
    }

    try {
      const risk: Risk = {
        id: crypto.randomUUID(),
        name: data.scenarios.find(s => s.id === newRisk.scenarioId)?.name || 'Risque sans nom',
        scenarioId: newRisk.scenarioId,
        likelihoodLevel: newRisk.likelihoodLevel,
        gravityLevel: newRisk.gravityLevel,
        riskTreatmentStatus: 'à traiter',
      };

      onSubmit({
        risks: [...data.risks, risk]
      });

      setNewRisk({
        scenarioId: '',
        likelihoodLevel: LikelihoodLevel.MINIMAL,
        gravityLevel: GravityLevel.NEGLIGIBLE,
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du risque:', error);
    }
  };

  const handleDeleteRisk = useCallback((id: string) => {
    onSubmit({
      risks: data.risks.filter(r => r.id !== id)
    });
  }, [onSubmit, data.risks]);

  const handleUpdateStatus = (id: string, status: TreatmentStatus): void => {
    onSubmit({
      risks: data.risks.map(r =>
        r.id === id ? { ...r, riskTreatmentStatus: status } : r
      )
    });
  };

  const getScenarioDetails = useCallback((scenarioId: string): Scenario | undefined => {
    return data.scenarios.find(s => s.id === scenarioId);
  }, [data.scenarios]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Évaluation des risques</h2>
      
      {/* Formulaire d'ajout */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Scénario</label>
            <select
              value={newRisk.scenarioId}
              onChange={e => setNewRisk(prev => ({ ...prev, scenarioId: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Sélectionner un scénario</option>
              {data.scenarios.map(scenario => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Vraisemblance</label>
            <select
              value={newRisk.likelihoodLevel}
              onChange={e => setNewRisk(prev => ({ ...prev, likelihoodLevel: Number(e.target.value) as LikelihoodLevel }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {Object.entries(LikelihoodLevel)
                .filter(([key]) => !isNaN(Number(key)))
                .map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gravité</label>
            <select
              value={newRisk.gravityLevel}
              onChange={e => setNewRisk(prev => ({ ...prev, gravityLevel: Number(e.target.value) as GravityLevel }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {Object.entries(GravityLevel)
                .filter(([key]) => !isNaN(Number(key)))
                .map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleAddRisk}
          disabled={!newRisk.scenarioId}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Ajouter le risque
        </button>
      </div>

      {/* Liste des risques */}
      <div className="space-y-4">
        {data.risks.map(risk => {
          const scenario = getScenarioDetails(risk.scenarioId);
          const riskLevel = calculateRiskLevel(risk.likelihoodLevel, risk.gravityLevel);

          if (!scenario) {
            console.warn(`Scénario non trouvé pour le risque ${risk.id}`);
            return null;
          }

          return (
            <div key={risk.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{scenario?.name}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Vraisemblance: {risk.likelihoodLevel} | Gravité: {risk.gravityLevel}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={risk.riskTreatmentStatus}
                    onChange={e => handleUpdateStatus(risk.id, e.target.value as TreatmentStatus)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {TREATMENT_STATUSES.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                  <div className={`
                    px-2 py-1 rounded text-sm
                    ${RISK_LEVEL_STYLES[riskLevel]}
                  `}>
                    {riskLevel}
                  </div>
                  <button
                    onClick={() => handleDeleteRisk(risk.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};