import React, { useState } from 'react';
import type { EbiosFormData, Scenario } from '../../types';
import { LikelihoodLevel } from '../../types';

interface Props {
  data: EbiosFormData;
  onSubmit: (data: Partial<EbiosFormData>) => void;
}

export const ScenariosStep: React.FC<Props> = ({ data, onSubmit }) => {
  const [newScenario, setNewScenario] = useState<Partial<Scenario>>({
    name: '',
    description: '',
    likelihoodLevel: LikelihoodLevel.MINIMAL,
  });

  const handleAddScenario = () => {
    if (!newScenario.name || !newScenario.threatId || !newScenario.fearedEventId) return;

    const scenario: Scenario = {
      id: Date.now().toString(),
      name: newScenario.name,
      description: newScenario.description || '',
      threatId: newScenario.threatId,
      fearedEventId: newScenario.fearedEventId,
      likelihoodLevel: newScenario.likelihoodLevel || LikelihoodLevel.MINIMAL,
    };

    onSubmit({
      scenarios: [...data.scenarios, scenario]
    });

    setNewScenario({
      name: '',
      description: '',
      likelihoodLevel: LikelihoodLevel.MINIMAL,
    });
  };

  const handleDeleteScenario = (id: string) => {
    onSubmit({
      scenarios: data.scenarios.filter(s => s.id !== id)
    });
  };

  const getFearedEventDetails = (fearedEventId: string) => {
    const event = data.fearedEvents.find(fe => fe.id === fearedEventId);
    if (!event) return 'Événement inconnu';

    const businessValue = data.businessValues.find(bv => bv.id === event.businessValueId);
    const threat = data.threats.find(t => t.id === event.threatId);

    return `${businessValue?.name || 'Valeur inconnue'} - ${threat?.name || 'Menace inconnue'}`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Scénarios de risque</h2>
      
      {/* Formulaire d'ajout */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom du scénario</label>
          <input
            type="text"
            value={newScenario.name}
            onChange={e => setNewScenario(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Ex: Attaque par déni de service"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={newScenario.description}
            onChange={e => setNewScenario(prev => ({ ...prev, description: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            placeholder="Décrivez le scénario..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Menace</label>
            <select
              value={newScenario.threatId || ''}
              onChange={e => setNewScenario(prev => ({ ...prev, threatId: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Sélectionner une menace</option>
              {data.threats.map(threat => (
                <option key={threat.id} value={threat.id}>
                  {threat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Événement redouté</label>
            <select
              value={newScenario.fearedEventId || ''}
              onChange={e => setNewScenario(prev => ({ ...prev, fearedEventId: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Sélectionner un événement</option>
              {data.fearedEvents.map(event => (
                <option key={event.id} value={event.id}>
                  {getFearedEventDetails(event.id)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Vraisemblance</label>
          <select
            value={newScenario.likelihoodLevel}
            onChange={e => setNewScenario(prev => ({ ...prev, likelihoodLevel: Number(e.target.value) }))}
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

        <button
          onClick={handleAddScenario}
          disabled={!newScenario.name || !newScenario.threatId || !newScenario.fearedEventId}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Ajouter le scénario
        </button>
      </div>

      {/* Liste des scénarios */}
      <div className="space-y-4">
        {data.scenarios.map(scenario => (
          <div key={scenario.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">{scenario.name}</div>
              <div className="text-sm text-gray-500">
                {scenario.description}
              </div>
              <div className="text-sm text-gray-500">
                Événement: {getFearedEventDetails(scenario.fearedEventId)} |
                Vraisemblance: {LikelihoodLevel[scenario.likelihoodLevel]}
              </div>
            </div>
            <button
              onClick={() => handleDeleteScenario(scenario.id)}
              className="text-red-600 hover:text-red-800"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};