import React, { useState } from 'react';
import type { EbiosFormData, BusinessValue } from '../../types';

interface Props {
  data: EbiosFormData;
  onSubmit: (data: Partial<EbiosFormData>) => void;
}

export const BusinessValuesStep: React.FC<Props> = ({ data, onSubmit }) => {
  const [newValue, setNewValue] = useState<Partial<BusinessValue>>({
    name: '',
    description: '',
    stakeholderId: '',
    essentialityCriteria: []
  });

  const handleAdd = () => {
    if (!newValue.name || !newValue.stakeholderId) return;

    const newBusinessValue: BusinessValue = {
      id: Date.now().toString(),
      ...newValue as Omit<BusinessValue, 'id'>
    };

    onSubmit({
      businessValues: [...data.businessValues, newBusinessValue]
    });

    setNewValue({
      name: '',
      description: '',
      stakeholderId: '',
      essentialityCriteria: []
    });
  };

  const handleDelete = (id: string) => {
    onSubmit({
      businessValues: data.businessValues.filter(bv => bv.id !== id)
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Valeurs métier</h2>
      
      {/* Formulaire d'ajout */}
      <div className="mb-4 space-y-4">
        <input
          type="text"
          value={newValue.name}
          onChange={e => setNewValue(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Nom de la valeur métier"
          className="w-full p-2 border rounded"
        />
        <select
          value={newValue.stakeholderId}
          onChange={e => setNewValue(prev => ({ ...prev, stakeholderId: e.target.value }))}
          className="w-full p-2 border rounded"
        >
          <option value="">Sélectionner une partie prenante</option>
          {data.stakeholders.map(stakeholder => (
            <option key={stakeholder.id} value={stakeholder.id}>
              {stakeholder.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={!newValue.name || !newValue.stakeholderId}
        >
          Ajouter
        </button>
      </div>

      {/* Liste des valeurs métier */}
      <div className="space-y-2">
        {data.businessValues.map(value => (
          <div key={value.id} className="flex justify-between items-center p-2 border rounded">
            <div>
              <div className="font-bold">{value.name}</div>
              <div className="text-sm text-gray-600">
                Partie prenante: {data.stakeholders.find(s => s.id === value.stakeholderId)?.name}
              </div>
            </div>
            <button
              onClick={() => handleDelete(value.id)}
              className="text-red-500 hover:text-red-700"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
