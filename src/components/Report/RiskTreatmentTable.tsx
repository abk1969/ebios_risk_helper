import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { Risk, Scenario } from '../../types';

interface ActionPlan {
  id: string;
  riskId: string;
  action: string;
  description: string;
  responsible: string;
  deadline: string; // Change the type to string
}

interface RiskTreatmentTableProps {
  risks: Risk[];
  scenarios: Scenario[];
  actionPlans: ActionPlan[];
  onActionPlansChange: (actionPlans: ActionPlan[]) => void;
}

const RiskTreatmentTable: React.FC<RiskTreatmentTableProps> = ({
  risks,
  scenarios,
  actionPlans,
  onActionPlansChange,
}) => {
  // Fonction pour récupérer le nom du scénario associé à un risque
  const getScenarioNameForRisk = (riskId: string) => {
    const risk = risks.find(r => r.id === riskId);
    if (!risk) return 'Scénario inconnu';
    const scenario = scenarios.find(s => s.id === risk.scenarioId);
    return scenario?.name || 'Scénario inconnu';
  };

  // Fonction pour mettre à jour une action dans le tableau
  const handleActionPlanChange = (
    actionPlanId: string,
    field: keyof ActionPlan,
    value: any,
  ) => {
    const updatedActionPlans = actionPlans.map(ap =>
      ap.id === actionPlanId ? { ...ap, [field]: value } : ap,
    );
    onActionPlansChange(updatedActionPlans);
  };

  const handleAddEmptyActionPlan = (riskId: string) => {
    const newActionPlan: ActionPlan = {
      id: Date.now().toString(), // Générer un ID unique, vous pouvez utiliser une librairie comme uuid pour cela
      riskId,
      action: '',
      description: '',
      responsible: '',
      deadline: '', // Initialiser avec une chaîne vide
    };

    onActionPlansChange([...actionPlans, newActionPlan]);
  };

  // Filter action plans to only include those associated with existing risks
  const validActionPlans = actionPlans.filter(ap =>
    risks.some(risk => risk.id === ap.riskId),
  );

  return (
    <div className="mt-12 bg-white p-6 rounded-xl shadow">
      <h3 className="text-2xl font-semibold mb-6">
        Stratégie de traitement du risque
      </h3>
      <p className="text-gray-600 mb-4">
        Définissez ici les actions à mettre en place pour traiter les risques
        identifiés (réduction, transfert, acceptation, etc.).
      </p>
      {/* Tableau pour la stratégie de traitement du risque */}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Risque
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Responsable
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Échéance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {validActionPlans.map(ap => (
              <tr key={ap.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getScenarioNameForRisk(ap.riskId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={ap.action}
                    onChange={e =>
                      handleActionPlanChange(ap.id, 'action', e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <textarea
                    value={ap.description}
                    onChange={e =>
                      handleActionPlanChange(
                        ap.id,
                        'description',
                        e.target.value,
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    rows={3}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={ap.responsible}
                    onChange={e =>
                      handleActionPlanChange(
                        ap.id,
                        'responsible',
                        e.target.value,
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="date"
                    value={ap.deadline}
                    onChange={e =>
                      handleActionPlanChange(ap.id, 'deadline', e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() =>
                      setActionPlans(
                        actionPlans.filter(
                          currentAp => currentAp.id !== ap.id,
                        ),
                      )
                    }
                    className="text-red-600 hover:text-red-900"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Bouton pour ajouter une nouvelle action pour un risque spécifique */}
      <div className="mt-4">
        {risks.map(risk => (
          <button
            key={risk.id}
            onClick={() => handleAddEmptyActionPlan(risk.id)}
            className="mt-2 mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <PlusCircle className="mr-2" />
            Ajouter une action pour : {getScenarioNameForRisk(risk.id)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RiskTreatmentTable;