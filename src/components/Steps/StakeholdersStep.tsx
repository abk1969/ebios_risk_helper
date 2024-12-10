import React, { useState, useEffect } from 'react';
import { Stakeholder } from '../../types';
import HelpTooltip from '../HelpTooltip';

interface StakeholdersStepProps {
  onNext: (stakeholders: Stakeholder[]) => void;
  onBack: () => void;
  stakeholders: Stakeholder[];
}

export const StakeholdersStep: React.FC<StakeholdersStepProps> = ({
  onNext,
  onBack,
  stakeholders,
}) => {
  const [localStakeholders, setLocalStakeholders] = useState<Stakeholder[]>(
    stakeholders,
  );
  const [currentStakeholderName, setCurrentStakeholderName] = useState('');
  const [currentStakeholderNeeds, setCurrentStakeholderNeeds] = useState('');
  const [errors, setErrors] = useState<{ name?: string; needs?: string }>({});

  useEffect(() => {
    setLocalStakeholders(stakeholders);
  }, [stakeholders]);

  const validate = () => {
    const newErrors: { name?: string; needs?: string } = {};
    if (!currentStakeholderName.trim()) {
      newErrors.name = 'Le nom de la partie prenante est requis.';
    }
    if (!currentStakeholderNeeds.trim()) {
      newErrors.needs = 'Les besoins de la partie prenante sont requis.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddStakeholder = () => {
    if (!validate()) {
      return;
    }

    const newStakeholder: Stakeholder = {
      id: Date.now().toString(),
      name: currentStakeholderName,
      needs: currentStakeholderNeeds.split(',').map(need => need.trim()),
    };
    setLocalStakeholders(prev => [...prev, newStakeholder]);
    setCurrentStakeholderName('');
    setCurrentStakeholderNeeds('');
    setErrors({});
  };

  const handleDeleteStakeholder = (stakeholderId: string) => {
    setLocalStakeholders(prev =>
      prev.filter(stakeholder => stakeholder.id !== stakeholderId),
    );
  };

  const handleNext = () => {
    onNext(localStakeholders);
  };

  return (
    <div>
      <div className="flex items-center mb-2">
        <h3 className="text-lg font-medium">
          Parties prenantes{' '}
          <HelpTooltip text="Identifiez les acteurs (internes ou externes) qui ont un intérêt dans le système étudié. Par exemple : les utilisateurs, les clients, la direction, les partenaires, etc." />
        </h3>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Nom de la partie prenante
        </label>
        <input
          type="text"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={currentStakeholderName}
          onChange={e => {
            setCurrentStakeholderName(e.target.value);
            if (errors.name) {
              setErrors(prev => ({ ...prev, name: undefined }));
            }
          }}
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-600">{errors.name}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Besoins de la partie prenante (séparez par des virgules)
        </label>
        <textarea
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={currentStakeholderNeeds}
          onChange={e => {
            setCurrentStakeholderNeeds(e.target.value);
            if (errors.needs) {
              setErrors(prev => ({ ...prev, needs: undefined }));
            }
          }}
          rows={3}
        />
        {errors.needs && (
          <p className="mt-2 text-sm text-red-600">{errors.needs}</p>
        )}
      </div>
      <div className="mt-2 mb-4">
        <p className="text-sm text-gray-600">
          Exemples de besoins :
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
          <li>
            "Accéder aux données de l'entreprise de manière sécurisée" (Utilisateur)
          </li>
          <li>
            "Assurer la continuité de l'activité" (Direction)
          </li>
          <li>
            "Respecter les exigences légales en matière de protection des données"
            (Client)
          </li>
        </ul>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleAddStakeholder}
        disabled={
          !currentStakeholderName.trim() || !currentStakeholderNeeds.trim()
        }
      >
        Ajouter la partie prenante
      </button>

      {/* Afficher les parties prenantes ajoutées */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">
          Parties prenantes ajoutées :
        </h3>
        {localStakeholders.length > 0 ? (
          <ul>
            {localStakeholders.map(stakeholder => (
              <li
                key={stakeholder.id}
                className="flex items-center justify-between mb-2"
              >
                <div>
                  <span className="font-medium">{stakeholder.name}</span> -
                  Besoins : {stakeholder.needs.join(', ')}
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteStakeholder(stakeholder.id)}
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune partie prenante ajoutée pour le moment.</p>
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
          disabled={localStakeholders.length === 0}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};
