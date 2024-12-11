import React, { useState } from 'react';
import type { EbiosFormData, BusinessValue } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Valeurs métier</h2>
      
      {/* Formulaire d'ajout */}
      <div className="mb-6 space-y-4 p-6 bg-card rounded-lg border border-border shadow-sm">
        <input
          type="text"
          value={newValue.name}
          onChange={e => setNewValue(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Nom de la valeur métier"
          className="w-full p-2 border rounded-lg bg-background"
        />
        <select
          value={newValue.stakeholderId}
          onChange={e => setNewValue(prev => ({ ...prev, stakeholderId: e.target.value }))}
          className="w-full p-2 border rounded-lg bg-background"
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
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2"
          disabled={!newValue.name || !newValue.stakeholderId}
        >
          <Plus size={20} />
          Ajouter
        </button>
      </div>

      {/* Liste des valeurs métier */}
      <div className="grid gap-4">
        {data.businessValues.map(value => (
          <div key={value.id} className="p-4 bg-card rounded-lg border border-border shadow-sm flex justify-between items-center">
            <div>
              <div className="font-semibold">{value.name}</div>
              <div className="text-sm text-muted-foreground">
                Partie prenante: {data.stakeholders.find(s => s.id === value.stakeholderId)?.name}
              </div>
            </div>
            <button
              onClick={() => handleDelete(value.id)}
              className="p-2 text-destructive hover:text-destructive/80"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
