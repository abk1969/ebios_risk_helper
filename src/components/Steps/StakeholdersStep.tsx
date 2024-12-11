import React, { useState } from 'react';
import type { EbiosFormData, Stakeholder } from '../../types';

interface Props {
  data: EbiosFormData;
  onSubmit: (data: Partial<EbiosFormData>) => void;
}

type StakeholderType = 'interne' | 'externe' | 'fournisseur' | 'client' | 'autre';

interface NewStakeholder {
  name: string;
  type: StakeholderType | '';
  description: string;
  contact: string;
}

export const StakeholdersStep: React.FC<Props> = ({ data, onSubmit }) => {
  const [newStakeholder, setNewStakeholder] = useState<NewStakeholder>({
    name: '',
    type: '',
    description: '',
    contact: '',
  });

  const handleAddStakeholder = () => {
    if (!newStakeholder.name.trim() || !newStakeholder.type) return;

    const stakeholder: Stakeholder = {
      id: crypto.randomUUID(),
      name: newStakeholder.name.trim(),
      type: newStakeholder.type,
      description: newStakeholder.description.trim(),
      contact: newStakeholder.contact.trim(),
    };

    onSubmit({
      stakeholders: [...data.stakeholders, stakeholder]
    });

    setNewStakeholder({
      name: '',
      type: '',
      description: '',
      contact: '',
    });
  };

  const handleDeleteStakeholder = (id: string) => {
    onSubmit({
      stakeholders: data.stakeholders.filter(s => s.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Parties prenantes</h2>
      
      {/* Formulaire d'ajout */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              value={newStakeholder.name}
              onChange={e => setNewStakeholder(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ex: Direction des Systèmes d'Information"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              value={newStakeholder.type}
              onChange={e => setNewStakeholder(prev => ({ ...prev, type: e.target.value as StakeholderType }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Sélectionner un type</option>
              <option value="interne">Interne</option>
              <option value="externe">Externe</option>
              <option value="fournisseur">Fournisseur</option>
              <option value="client">Client</option>
              <option value="autre">Autre</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={newStakeholder.description}
            onChange={e => setNewStakeholder(prev => ({ ...prev, description: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            placeholder="Description du rôle et des responsabilités..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contact</label>
          <input
            type="text"
            value={newStakeholder.contact}
            onChange={e => setNewStakeholder(prev => ({ ...prev, contact: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Email ou téléphone"
          />
        </div>

        <button
          onClick={handleAddStakeholder}
          disabled={!newStakeholder.name || !newStakeholder.type}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Ajouter la partie prenante
        </button>
      </div>

      {/* Liste des parties prenantes */}
      <div className="space-y-4">
        {data.stakeholders.map(stakeholder => (
          <div key={stakeholder.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">{stakeholder.name}</div>
              <div className="text-sm text-gray-500">
                Type: {stakeholder.type}
                {stakeholder.contact && ` | Contact: ${stakeholder.contact}`}
              </div>
              {stakeholder.description && (
                <div className="text-sm text-gray-500 mt-1">
                  {stakeholder.description}
                </div>
              )}
            </div>
            <button
              onClick={() => handleDeleteStakeholder(stakeholder.id)}
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
