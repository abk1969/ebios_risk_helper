import React, { useState, useEffect } from 'react';
import { Threat } from '../../types';
import HelpTooltip from '../HelpTooltip';
import { PlusCircle, Trash2, Edit } from 'lucide-react';

interface ThreatsStepProps {
  onNext: (threats: Threat[]) => void;
  onBack: () => void;
  threats: Threat[];
}

export const ThreatsStep: React.FC<ThreatsStepProps> = ({
  onNext,
  onBack,
  threats: initialThreats,
}) => {
  const [threats, setThreats] = useState<Threat[]>(initialThreats);
  const [currentThreat, setCurrentThreat] = useState<Threat>({
    id: '',
    name: '',
    description: '',
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ name?: string; description?: string }>(
    {},
  );

  useEffect(() => {
    setThreats(initialThreats);
  }, [initialThreats]);

  const validate = () => {
    const newErrors: { name?: string; description?: string } = {};
    if (!currentThreat.name.trim()) {
      newErrors.name = 'Le nom de la menace est requis.';
    }
    if (!currentThreat.description.trim()) {
      newErrors.description = 'La description de la menace est requise.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddThreat = () => {
    if (validate()) {
      setThreats(prev => [
        ...prev,
        { ...currentThreat, id: currentThreat.id || crypto.randomUUID() },
      ]);
      setCurrentThreat({ id: '', name: '', description: '' });
      setEditMode(false);
      setErrors({});
    }
  };

  const handleEditThreat = (id: string) => {
    const threatToEdit = threats.find(threat => threat.id === id);
    if (threatToEdit) {
      setCurrentThreat(threatToEdit);
      setEditMode(true);
      setErrors({});
    }
  };

  const handleUpdateThreat = () => {
    if (validate()) {
      setThreats(prev =>
        prev.map(threat =>
          threat.id === currentThreat.id ? currentThreat : threat,
        ),
      );
      setCurrentThreat({ id: '', name: '', description: '' });
      setEditMode(false);
      setErrors({});
    }
  };

  const handleDeleteThreat = (id: string) => {
    setThreats(prev => prev.filter(threat => threat.id !== id));
  };

  const handleNext = () => {
    onNext(threats);
  };

  return (
    <div>
      <div className="flex items-center mb-2">
        <h3 className="text-lg font-medium">
          Menaces{' '}
          <HelpTooltip text="Identifiez les menaces qui pourraient compromettre vos valeurs métier. Par exemple : vol de données, intrusion, malveillance, erreur humaine, panne, etc." />
        </h3>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Nom de la menace
        </label>
        <input
          type="text"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={currentThreat.name}
          onChange={e => {
            setCurrentThreat(prev => ({ ...prev, name: e.target.value }));
            if (errors.name) {
              setErrors(prev => ({ ...prev, name: undefined }));
            }
          }}
          placeholder="Nom de la menace..."
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-600">{errors.name}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Description de la menace
        </label>
        <textarea
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={currentThreat.description}
          onChange={e => {
            setCurrentThreat(prev => ({
              ...prev,
              description: e.target.value,
            }));
            if (errors.description) {
              setErrors(prev => ({ ...prev, description: undefined }));
            }
          }}
          placeholder="Description de la menace..."
          rows={3}
        />
        {errors.description && (
          <p className="mt-2 text-sm text-red-600">{errors.description}</p>
        )}
      </div>
      <div className="mt-2 mb-4">
        <p className="text-sm text-gray-600">
          Exemples de menaces :
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
          <li>"Vol de données"</li>
          <li>"Intrusion sur le serveur"</li>
          <li>"Attaque par déni de service"</li>
          <li>"Divulgation accidentelle d'informations"</li>
        </ul>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        onClick={editMode ? handleUpdateThreat : handleAddThreat}
        disabled={
          !currentThreat.name.trim() || !currentThreat.description.trim()
        }
      >
        <PlusCircle className="w-4 h-4" />
        {editMode ? 'Modifier la menace' : 'Ajouter la menace'}
      </button>

      {/* Afficher les menaces ajoutées */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Menaces ajoutées :</h3>
        {threats.length > 0 ? (
          <div className="space-y-3">
            {threats.map(threat => (
              <div
                key={threat.id}
                className="p-4 bg-gray-50 rounded-lg space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{threat.name}</h4>
                    <p className="text-sm text-gray-600">
                      {threat.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditThreat(threat.id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteThreat(threat.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Aucune menace ajoutée pour le moment.</p>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={onBack}
        >
          Retour
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleNext}
          disabled={threats.length === 0}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};
