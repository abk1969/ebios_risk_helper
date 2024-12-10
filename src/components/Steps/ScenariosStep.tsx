import React, { useState, useEffect } from 'react';
import { Scenario, Threat, FearedEvent, BusinessValue } from '../../types';
import HelpTooltip from '../HelpTooltip';
import { PlusCircle, Trash2, Edit } from 'lucide-react';

interface ScenariosStepProps {
  onNext: (scenarios: Scenario[]) => void;
  onBack: () => void;
  scenarios: Scenario[];
  threats: Threat[];
  fearedEvents: FearedEvent[];
  businessValues: BusinessValue[];
}

const ScenariosStep: React.FC<ScenariosStepProps> = ({
  onNext,
  onBack,
  scenarios: initialScenarios,
  threats,
  fearedEvents,
  businessValues,
}) => {
  const [scenarios, setScenarios] = useState<Scenario[]>(initialScenarios);
  const [currentScenario, setCurrentScenario] = useState<Scenario>({
    id: '',
    name: '',
    description: '',
    threatId: '',
    fearedEventId: '',
    likelihoodLevel: 1,
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    threatId?: string;
    fearedEventId?: string;
    likelihoodLevel?: string;
  }>({});

  useEffect(() => {
    setScenarios(initialScenarios);
  }, [initialScenarios]);

  const validate = () => {
    const newErrors: {
      name?: string;
      description?: string;
      threatId?: string;
      fearedEventId?: string;
      likelihoodLevel?: string;
    } = {};
    if (!currentScenario.name.trim()) {
      newErrors.name = 'Le nom du scénario est requis.';
    }
    if (!currentScenario.description.trim()) {
      newErrors.description = 'La description du scénario est requise.';
    }
    if (!currentScenario.threatId) {
      newErrors.threatId = 'La menace associée est requise.';
    }
    if (!currentScenario.fearedEventId) {
      newErrors.fearedEventId = "L'événement redouté associé est requis.";
    }
    if (!currentScenario.likelihoodLevel) {
      newErrors.likelihoodLevel = 'Le niveau de vraisemblance est requis.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddScenario = () => {
    if (validate()) {
      setScenarios(prev => [
        ...prev,
        {
          ...currentScenario,
          id: currentScenario.id || crypto.randomUUID(),
        },
      ]);
      setCurrentScenario({
        id: '',
        name: '',
        description: '',
        threatId: '',
        fearedEventId: '',
        likelihoodLevel: 1,
      });
      setEditMode(false);
      setErrors({});
    }
  };

  const handleEditScenario = (id: string) => {
    const scenarioToEdit = scenarios.find(scenario => scenario.id === id);
    if (scenarioToEdit) {
      setCurrentScenario(scenarioToEdit);
      setEditMode(true);
      setErrors({});
    }
  };

  const handleUpdateScenario = () => {
    if (validate()) {
      setScenarios(prev =>
        prev.map(scenario =>
          scenario.id === currentScenario.id ? currentScenario : scenario,
        ),
      );
      setCurrentScenario({
        id: '',
        name: '',
        description: '',
        threatId: '',
        fearedEventId: '',
        likelihoodLevel: 1,
      });
      setEditMode(false);
      setErrors({});
    }
  };

  const handleDeleteScenario = (id: string) => {
    setScenarios(prev => prev.filter(scenario => scenario.id !== id));
  };

  const handleNext = () => {
    onNext(scenarios);
  };

  // Fonction corrigée : prend businessValues et threats en paramètres
  const getFearedEventDescription = (
    fearedEventId: string,
    businessValues: BusinessValue[],
    threats: Threat[],
  ) => {
    const fearedEvent = fearedEvents.find(fe => fe.id === fearedEventId);
    if (!fearedEvent) return 'Événement redouté inconnu';

    const businessValue = businessValues.find(
      bv => bv.id === fearedEvent.businessValueId,
    );
    const threat = threats.find(t => t.id === fearedEvent.threatId);

    return `${businessValue?.name || 'Valeur métier inconnue'} - ${
      threat?.name || 'Menace inconnue'
    }`;
  };

  const getThreatName = (threatId: string) => {
    return threats.find(t => t.id === threatId)?.name || 'Menace inconnue';
  };

  return (
    <div>
      <div className="flex items-center mb-2">
        <h3 className="text-lg font-medium">
          Scénarios de menace{' '}
          <HelpTooltip text="Décrivez comment la menace peut se concrétiser en exploitant une ou plusieurs vulnérabilités, pour atteindre la valeur métier. Soyez précis dans la description du scénario." />
        </h3>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Nom du scénario de menace
        </label>
        <input
          type="text"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={currentScenario.name}
          onChange={e => {
            setCurrentScenario(prev => ({ ...prev, name: e.target.value }));
            if (errors.name) {
              setErrors(prev => ({ ...prev, name: undefined }));
            }
          }}
          placeholder="Nom du scénario..."
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-600">{errors.name}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Description du scénario
        </label>
        <textarea
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={currentScenario.description}
          onChange={e => {
            setCurrentScenario(prev => ({
              ...prev,
              description: e.target.value,
            }));
            if (errors.description) {
              setErrors(prev => ({ ...prev, description: undefined }));
            }
          }}
          placeholder="Décrivez le scénario..."
          rows={3}
        />
        {errors.description && (
          <p className="mt-2 text-sm text-red-600">{errors.description}</p>
        )}
      </div>
      <div className="mt-2 mb-4">
        <p className="text-sm text-gray-600">
          Exemples de scénario :
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
          <li>
            "Un attaquant distant utilise une injection SQL pour obtenir un
            accès non autorisé aux données clients stockées dans la base de
            données."
          </li>
          <li>
            "Un employé insatisfait divulgue des informations confidentielles à
            un concurrent."
          </li>
          <li>
            "Une panne de courant prolongée rend indisponible le serveur
            principal, entraînant une interruption de service."
          </li>
        </ul>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Menace associée
        </label>
        <select
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={currentScenario.threatId}
          onChange={e => {
            setCurrentScenario(prev => ({
              ...prev,
              threatId: e.target.value,
            }));
            if (errors.threatId) {
              setErrors(prev => ({ ...prev, threatId: undefined }));
            }
          }}
        >
          <option value="">Sélectionnez une menace</option>
          {threats.map(threat => (
            <option key={threat.id} value={threat.id}>
              {threat.name}
            </option>
          ))}
        </select>
        {errors.threatId && (
          <p className="mt-2 text-sm text-red-600">{errors.threatId}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Événement redouté associé
        </label>
        <select
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={currentScenario.fearedEventId}
          onChange={e => {
            setCurrentScenario(prev => ({
              ...prev,
              fearedEventId: e.target.value,
            }));
            if (errors.fearedEventId) {
              setErrors(prev => ({ ...prev, fearedEventId: undefined }));
            }
          }}
        >
          <option value="">Sélectionnez un événement redouté</option>
          {fearedEvents.map(fearedEvent => (
            <option key={fearedEvent.id} value={fearedEvent.id}>
              {getFearedEventDescription(
                fearedEvent.id,
                businessValues,
                threats,
              )}
            </option>
          ))}
        </select>
        {errors.fearedEventId && (
          <p className="mt-2 text-sm text-red-600">
            {errors.fearedEventId}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Niveau de vraisemblance
        </label>
        <div className="mt-1 flex space-x-2">
          {[1, 2, 3, 4].map(level => (
            <button
              key={level}
              type="button"
              className={`px-4 py-2 rounded-md ${
                currentScenario.likelihoodLevel === level
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() =>
                setCurrentScenario(prev => ({
                  ...prev,
                  likelihoodLevel: level,
                }))
              }
            >
              {level}
            </button>
          ))}
        </div>
        {errors.likelihoodLevel && (
          <p className="mt-2 text-sm text-red-600">
            {errors.likelihoodLevel}
          </p>
        )}
        <div className="mt-2">
          <p className="text-sm text-gray-600">
            Niveaux de vraisemblance :{' '}
            <span className="font-bold">
              1 (Minime), 2 (Possible), 3 (Probable), 4 (Certaine)
            </span>
          </p>
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        onClick={editMode ? handleUpdateScenario : handleAddScenario}
        disabled={
          !currentScenario.name.trim() ||
          !currentScenario.description.trim() ||
          !currentScenario.threatId ||
          !currentScenario.fearedEventId ||
          !currentScenario.likelihoodLevel
        }
      >
        <PlusCircle className="w-4 h-4" />
        {editMode ? 'Modifier le scénario' : 'Ajouter le scénario'}
      </button>

      {/* Afficher les scénarios ajoutés */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Scénarios ajoutés :</h3>
        {scenarios.length > 0 ? (
          <div className="space-y-3">
            {scenarios.map(scenario => (
              <div
                key={scenario.id}
                className="p-4 bg-gray-50 rounded-lg space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {scenario.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {scenario.description}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Menace : {getThreatName(scenario.threatId)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Événement redouté :{' '}
                      {getFearedEventDescription(
                        scenario.fearedEventId,
                        businessValues,
                        threats,
                      )}
                    </p>
                    <p className="text-sm text-gray-600">
                      Vraisemblance :{' '}
                      {[
                        'Minime',
                        'Possible',
                        'Probable',
                        'Certaine',
                      ][scenario.likelihoodLevel - 1] || 'Non défini'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditScenario(scenario.id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteScenario(scenario.id)}
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
          <p>Aucun scénario ajouté pour le moment.</p>
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
          disabled={scenarios.length === 0}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default ScenariosStep;