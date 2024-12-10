import React, { useState, useEffect } from 'react';
import { BusinessValue, Stakeholder } from '../../types';
import HelpTooltip from '../HelpTooltip';
import { PlusCircle, Trash2, Edit } from 'lucide-react';

interface BusinessValuesStepProps {
  onNext: (businessValues: BusinessValue[]) => void;
  onBack: () => void;
  businessValues: BusinessValue[];
  stakeholders: Stakeholder[];
}

export const BusinessValuesStep: React.FC<BusinessValuesStepProps> = ({
  onNext,
  onBack,
  businessValues: initialBusinessValues,
  stakeholders,
}) => {
  const [businessValues, setBusinessValues] = useState<BusinessValue[]>(
    initialBusinessValues,
  );
  const [currentBusinessValue, setCurrentBusinessValue] = useState<BusinessValue>({
    id: '',
    name: '',
    description: '',
    stakeholderId: '',
    essentialityCriteria: [],
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    stakeholderId?: string;
    essentialityCriteria?: string;
  }>({});

  useEffect(() => {
    setBusinessValues(initialBusinessValues);
  }, [initialBusinessValues]);

  const validate = () => {
    const newErrors: {
      name?: string;
      description?: string;
      stakeholderId?: string;
      essentialityCriteria?: string;
    } = {};
    if (!currentBusinessValue.name.trim()) {
      newErrors.name = 'Le nom de la valeur métier est requis.';
    }
    if (!currentBusinessValue.description.trim()) {
      newErrors.description = 'La description de la valeur métier est requise.';
    }
    if (!currentBusinessValue.stakeholderId) {
      newErrors.stakeholderId =
        'Une partie prenante doit être associée à la valeur métier.';
    }
    if (
      !currentBusinessValue.essentialityCriteria ||
      currentBusinessValue.essentialityCriteria.length === 0
    ) {
      newErrors.essentialityCriteria =
        'Au moins un critère d\'essentialité est requis.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddBusinessValue = () => {
    if (validate()) {
      setBusinessValues(prev => [
        ...prev,
        {
          ...currentBusinessValue,
          id: currentBusinessValue.id || crypto.randomUUID(),
        },
      ]);
      setCurrentBusinessValue({
        id: '',
        name: '',
        description: '',
        stakeholderId: '',
        essentialityCriteria: [],
      });
      setEditMode(false);
      setErrors({});
    }
  };

  const handleEditBusinessValue = (id: string) => {
    const businessValueToEdit = businessValues.find(bv => bv.id === id);
    if (businessValueToEdit) {
      setCurrentBusinessValue(businessValueToEdit);
      setEditMode(true);
      setErrors({});
    }
  };

  const handleUpdateBusinessValue = () => {
    if (validate()) {
      setBusinessValues(prev =>
        prev.map(bv =>
          bv.id === currentBusinessValue.id ? currentBusinessValue : bv,
        ),
      );
      setCurrentBusinessValue({
        id: '',
        name: '',
        description: '',
        stakeholderId: '',
        essentialityCriteria: [],
      });
      setEditMode(false);
      setErrors({});
    }
  };

  const handleDeleteBusinessValue = (id: string) => {
    setBusinessValues(prev => prev.filter(bv => bv.id !== id));
  };

  const handleNext = () => {
    onNext(businessValues);
  };

  const getStakeholderName = (stakeholderId: string) => {
    return (
      stakeholders.find(s => s.id === stakeholderId)?.name ||
      'Partie prenante inconnue'
    );
  };

  const handleAddEssentialityCriteria = () => {
    if (
      currentBusinessValue.essentialityCriteria.length < 4 &&
      !currentBusinessValue.essentialityCriteria.includes('')
    ) {
      setCurrentBusinessValue(prev => ({
        ...prev,
        essentialityCriteria: [...prev.essentialityCriteria, ''],
      }));
    }
  };

  const handleRemoveEssentialityCriteria = (index: number) => {
    setCurrentBusinessValue(prev => ({
      ...prev,
      essentialityCriteria: prev.essentialityCriteria.filter(
        (_, i) => i !== index,
      ),
    }));
  };

  const handleUpdateEssentialityCriteria = (
    index: number,
    value: string,
  ) => {
    setCurrentBusinessValue(prev => ({
      ...prev,
      essentialityCriteria: prev.essentialityCriteria.map((v, i) =>
        i === index ? value : v,
      ),
    }));
  };

  return (
    <div>
      <div className="flex items-center mb-2">
        <h3 className="text-lg font-medium">
          Valeurs métier{' '}
          <HelpTooltip text="Identifiez les éléments essentiels à la réalisation des besoins des parties prenantes. Par exemple : des données, des services, des applications, des processus métier, etc." />
        </h3>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Nom de la valeur métier
        </label>
        <input
          type="text"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={currentBusinessValue.name}
          onChange={e => {
            setCurrentBusinessValue(prev => ({
              ...prev,
              name: e.target.value,
            }));
            if (errors.name) {
              setErrors(prev => ({ ...prev, name: undefined }));
            }
          }}
          placeholder="Nom de la valeur métier..."
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-600">{errors.name}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Description de la valeur métier
        </label>
        <textarea
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={currentBusinessValue.description}
          onChange={e => {
            setCurrentBusinessValue(prev => ({
              ...prev,
              description: e.target.value,
            }));
            if (errors.description) {
              setErrors(prev => ({ ...prev, description: undefined }));
            }
          }}
          placeholder="Description de la valeur métier..."
          rows={3}
        />
        {errors.description && (
          <p className="mt-2 text-sm text-red-600">{errors.description}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Partie prenante associée
        </label>
        <select
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={currentBusinessValue.stakeholderId}
          onChange={e => {
            setCurrentBusinessValue(prev => ({
              ...prev,
              stakeholderId: e.target.value,
            }));
            if (errors.stakeholderId) {
              setErrors(prev => ({ ...prev, stakeholderId: undefined }));
            }
          }}
        >
          <option value="">Sélectionnez une partie prenante</option>
          {stakeholders.map(stakeholder => (
            <option key={stakeholder.id} value={stakeholder.id}>
              {stakeholder.name}
            </option>
          ))}
        </select>
        {errors.stakeholderId && (
          <p className="mt-2 text-sm text-red-600">{errors.stakeholderId}</p>
        )}
      </div>

      {/* Critères d'essentialité */}
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Critères d'essentialité{' '}
            <HelpTooltip text="Saisissez les critères d'essentialité pour cette valeur métier : Disponibilité, Intégrité, Confidentialité, Preuve. Vous pouvez laisser un critère vide s'il n'est pas applicable." />
          </label>
        </div>
        {currentBusinessValue.essentialityCriteria.map((criteria, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={criteria}
              onChange={e =>
                handleUpdateEssentialityCriteria(index, e.target.value)
              }
              placeholder={`Critère ${index + 1}`}
            />
            <button
              className="ml-2 text-red-500 hover:text-red-700"
              onClick={() => handleRemoveEssentialityCriteria(index)}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {currentBusinessValue.essentialityCriteria.length < 4 && (
          <button
            type="button"
            className="text-blue-600 hover:text-blue-700 flex items-center"
            onClick={handleAddEssentialityCriteria}
          >
            <PlusCircle className="w-4 h-4 mr-1" />
            Ajouter un critère
          </button>
        )}
        {errors.essentialityCriteria && (
          <p className="mt-2 text-sm text-red-600">
            {errors.essentialityCriteria}
          </p>
        )}
      </div>

      <div className="mt-2 mb-4">
        <p className="text-sm text-gray-600">
          Exemples de critères d'essentialité :
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
          <li>"Disponibilité"</li>
          <li>"Confidentialité"</li>
          <li>"Intégrité"</li>
          <li>"Traçabilité"</li>
        </ul>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        onClick={
          editMode ? handleUpdateBusinessValue : handleAddBusinessValue
        }
        disabled={
          !currentBusinessValue.name.trim() ||
          !currentBusinessValue.description.trim() ||
          !currentBusinessValue.stakeholderId ||
          currentBusinessValue.essentialityCriteria.length === 0
        }
      >
        <PlusCircle className="w-4 h-4" />
        {editMode ? 'Modifier la valeur métier' : 'Ajouter la valeur métier'}
      </button>

      {/* Afficher les valeurs métier ajoutées */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">
          Valeurs métier ajoutées :
        </h3>
        {businessValues.length > 0 ? (
          <div className="space-y-3">
            {businessValues.map(bv => (
              <div
                key={bv.id}
                className="p-4 bg-gray-50 rounded-lg space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{bv.name}</h4>
                    <p className="text-sm text-gray-600">{bv.description}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Partie prenante :{' '}
                      {getStakeholderName(bv.stakeholderId)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Critères d'essentialité :{' '}
                      {bv.essentialityCriteria.join(', ')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditBusinessValue(bv.id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteBusinessValue(bv.id)}
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
          <p>Aucune valeur métier ajoutée pour le moment.</p>
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
          disabled={businessValues.length === 0}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};
