import React, { useState } from 'react';
import type { EbiosFormData, FearedEvent } from '../../types';

interface Props {
  data: EbiosFormData;
  onSubmit: (data: Partial<EbiosFormData>) => void;
}

export const FearedEventsStep: React.FC<Props> = ({ data, onSubmit }) => {
  const [newEvent, setNewEvent] = useState<Partial<FearedEvent>>({
    impactLevel: 1,
  });

  const handleAddEvent = () => {
    if (!newEvent.businessValueId || !newEvent.threatId) return;

    const event: FearedEvent = {
      id: Date.now().toString(),
      businessValueId: newEvent.businessValueId,
      threatId: newEvent.threatId,
      impactLevel: newEvent.impactLevel || 1,
    };

    onSubmit({
      fearedEvents: [...data.fearedEvents, event]
    });

    setNewEvent({
      impactLevel: 1,
    });
  };

  const handleDeleteEvent = (id: string) => {
    onSubmit({
      fearedEvents: data.fearedEvents.filter(e => e.id !== id)
    });
  };

  const getBusinessValueName = (id: string) => {
    return data.businessValues.find(bv => bv.id === id)?.name || 'Valeur inconnue';
  };

  const getThreatName = (id: string) => {
    return data.threats.find(t => t.id === id)?.name || 'Menace inconnue';
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Événements redoutés</h2>
      
      {/* Formulaire d'ajout */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Valeur métier</label>
            <select
              value={newEvent.businessValueId || ''}
              onChange={e => setNewEvent(prev => ({ ...prev, businessValueId: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Sélectionner une valeur métier</option>
              {data.businessValues.map(value => (
                <option key={value.id} value={value.id}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Menace</label>
            <select
              value={newEvent.threatId || ''}
              onChange={e => setNewEvent(prev => ({ ...prev, threatId: e.target.value }))}
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
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Niveau d'impact (1-4)</label>
          <input
            type="number"
            min="1"
            max="4"
            value={newEvent.impactLevel}
            onChange={e => setNewEvent(prev => ({ ...prev, impactLevel: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleAddEvent}
          disabled={!newEvent.businessValueId || !newEvent.threatId}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Ajouter l'événement redouté
        </button>
      </div>

      {/* Liste des événements */}
      <div className="space-y-4">
        {data.fearedEvents.map(event => (
          <div key={event.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">
                {getBusinessValueName(event.businessValueId)}
              </div>
              <div className="text-sm text-gray-500">
                Menace: {getThreatName(event.threatId)} | Impact: {event.impactLevel}
              </div>
            </div>
            <button
              onClick={() => handleDeleteEvent(event.id)}
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
