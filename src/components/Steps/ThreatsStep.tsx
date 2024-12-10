import React, { useState } from 'react';
import type { EbiosFormData, Threat } from '../../types';

interface Props {
  data: EbiosFormData;
  onSubmit: (data: Partial<EbiosFormData>) => void;
}

type ThreatCategory = 'cyber' | 'physique' | 'humain' | 'organisationnel' | 'autre';

interface NewThreat {
  name: string;
  description: string;
  category: ThreatCategory | '';
}

export const ThreatsStep: React.FC<Props> = ({ data, onSubmit }) => {
  const [newThreat, setNewThreat] = useState<NewThreat>({
    name: '',
    description: '',
    category: '',
  });

  const handleAddThreat = () => {
    if (!newThreat.name || !newThreat.category) return;

    const threat: Threat = {
      id: Date.now().toString(),
      name: newThreat.name,
      description: newThreat.description,
      category: newThreat.category,
    };

    onSubmit({
      threats: [...data.threats, threat]
    });

    setNewThreat({
      name: '',
      description: '',
      category: '',
    });
  };

  const handleDeleteThreat = (id: string) => {
    onSubmit({
      threats: data.threats.filter(t => t.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Menaces</h2>
      
      {/* Formulaire d'ajout */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              value={newThreat.name}
              onChange={e => setNewThreat(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ex: Attaque par déni de service"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Catégorie</label>
            <select
              value={newThreat.category}
              onChange={e => setNewThreat(prev => ({ ...prev, category: e.target.value as ThreatCategory }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Sélectionner une catégorie</option>
              <option value="cyber">Cyber</option>
              <option value="physique">Physique</option>
              <option value="humain">Humain</option>
              <option value="organisationnel">Organisationnel</option>
              <option value="autre">Autre</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={newThreat.description}
            onChange={e => setNewThreat(prev => ({ ...prev, description: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            placeholder="Description de la menace..."
          />
        </div>

        <button
          onClick={handleAddThreat}
          disabled={!newThreat.name || !newThreat.category}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Ajouter la menace
        </button>
      </div>

      {/* Liste des menaces */}
      <div className="space-y-4">
        {data.threats.map(threat => (
          <div key={threat.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">{threat.name}</div>
              <div className="text-sm text-gray-500">
                Catégorie: {threat.category}
              </div>
              {threat.description && (
                <div className="text-sm text-gray-500 mt-1">
                  {threat.description}
                </div>
              )}
            </div>
            <button
              onClick={() => handleDeleteThreat(threat.id)}
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
