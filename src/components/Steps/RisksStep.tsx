import React, { useState, useEffect } from 'react';
import { Risk, Scenario } from '../../types';
import HelpTooltip from '../HelpTooltip';
import { PlusCircle, Trash2, Edit } from 'lucide-react';

interface RisksStepProps {
  onSubmit: (risks: Risk[]) => void;
  onBack: () => void;
  risks: Risk[];
  scenarios: Scenario[];
}

const RisksStep: React.FC<RisksStepProps> = ({
  onSubmit,
  onBack,
  risks: initialRisks,
  scenarios,
}) => {
  const [risks, setRisks] = useState<Risk[]>(initialRisks);
  const [currentRisk, setCurrentRisk] = useState<Risk>({
    id: '',
    scenarioId: '',
    likelihoodLevel: 1,
    gravityLevel: 1,
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    scenarioId?: string;
    likelihoodLevel?: string;
    gravityLevel?: string;
  }>({});

  useEffect(() => {
    setRisks(initialRisks);
  }, [initialRisks]);

  const validate = () => {
    const newErrors: {
      scenarioId?: string;
      likelihoodLevel?: string;
      gravityLevel?: string;
    } = {};
    if (!currentRisk.scenarioId) {
      newErrors.scenarioId = 'Le scénario est requis.';
    }
    if (!currentRisk.likelihoodLevel) {
      newErrors.likelihoodLevel = 'Le niveau de vraisemblance est requis.';
    }
    if (!currentRisk.gravityLevel) {
      newErrors.gravityLevel = 'Le niveau de gravité est requis.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddRisk = () => {
    if (validate()) {
      setRisks(prev => [
        ...prev,
        { ...currentRisk, id: currentRisk.id || crypto.randomUUID() },
      ]);
      setCurrentRisk({
        id: '',
        scenarioId: '',
        likelihoodLevel: 1,
        gravityLevel: 1,
      });
      setEditMode(false);
      setErrors({});
    }
  };

  const handleEditRisk = (id: string) => {
    const riskToEdit = risks.find(risk => risk.id === id);
    if (riskToEdit) {
      setCurrentRisk(riskToEdit);
      setEditMode(true);
      setErrors({});
    }
  };

  const handleUpdateRisk = () => {
    if (validate()) {
      setRisks(prev =>
        prev.map(risk =>
          risk.id === currentRisk.id ? currentRisk : risk,
        ),
      );
      setCurrentRisk({
        id: '',
        scenarioId: '',
        likelihoodLevel: 1,
        gravityLevel: 1,
      });
      setEditMode(false);
      setErrors({});
    }
  };

  const handleDeleteRisk = (id: string) => {
    setRisks(prev => prev.filter(risk => risk.id !== id));
  };

  const handleSubmit = () => {
    onSubmit(risks);
  };

  const getScenarioName = (scenarioId: string) => {
    return (
      scenarios.find(s => s.id === scenarioId)?.name || 'Scénario inconnu'
    );
  };

  const getRiskLevelLabel = (riskLevel: number) => {
    if (riskLevel >= 1 && riskLevel <= 4) {
      return (
        <span className="bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
          Faible
        </span>
      );
    } else if (riskLevel > 4 && riskLevel <= 8) {
      return (
        <span className="bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
          Modéré
        </span>
      );
    } else if (riskLevel > 8 && riskLevel <= 12) {
      return (
        <span className="bg-orange-100 text-orange-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
          Élevé
        </span>
      );
    } else if (riskLevel > 12 && riskLevel <= 16) {
      return (
        <span className="bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
          Critique
        </span>
      );
    } else {
      return (
        <span className="bg-gray-100 text-gray-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
          Inconnu
        </span>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-2">
        <h3 className="text-lg font-medium">
          Évaluation des risques{' '}
          <HelpTooltip text="Évaluez le niveau de risque pour chaque scénario en combinant son niveau de vraisemblance et son niveau de gravité." />
        </h3>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Scénario
        </label>
        <select
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={currentRisk.scenarioId}
          onChange={e => {
            setCurrentRisk(prev => ({
              ...prev,
              scenarioId: e.target.value,
            }));
            if (errors.scenarioId) {
              setErrors(prev => ({ ...prev, scenarioId: undefined }));
            }
          }}
        >
          <option value="">Sélectionnez un scénario</option>
          {scenarios.map(scenario => (
            <option key={scenario.id} value={scenario.id}>
              {scenario.name}
            </option>
          ))}
        </select>
        {errors.scenarioId && (
          <p className="mt-2 text-sm text-red-600">{errors.scenarioId}</p>
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
                currentRisk.likelihoodLevel === level
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() =>
                setCurrentRisk(prev => ({
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
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Niveau de gravité
        </label>
        <div className="mt-1 flex space-x-2">
          {[1, 2, 3, 4].map(level => (
            <button
              key={level}
              type="button"
              className={`px-4 py-2 rounded-md ${
                currentRisk.gravityLevel === level
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() =>
                setCurrentRisk(prev => ({ ...prev, gravityLevel: level }))
              }
            >
              {level}
            </button>
          ))}
        </div>
        {errors.gravityLevel && (
          <p className="mt-2 text-sm text-red-600">{errors.gravityLevel}</p>
        )}
        <div className="mt-2">
          <p className="text-sm text-gray-600">
            Niveaux de gravité :{' '}
            <span className="font-bold">
              1 (Négligeable), 2 (Modéré), 3 (Important), 4 (Critique)
            </span>
          </p>
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        onClick={editMode ? handleUpdateRisk : handleAddRisk}
        disabled={
          !currentRisk.scenarioId ||
          !currentRisk.likelihoodLevel ||
          !currentRisk.gravityLevel
        }
      >
        <PlusCircle className="w-4 h-4" />
        {editMode ? 'Modifier le risque' : 'Ajouter le risque'}
      </button>

      {/* Afficher les risques ajoutés */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Risques ajoutés :</h3>
        {risks.length > 0 ? (
          <div className="space-y-3">
            {risks.map(risk => (
              <div key={risk.id} className="p-4 bg-gray-50 rounded-lg space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {getScenarioName(risk.scenarioId)}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Vraisemblance :{' '}
                      {[
                        'Minime',
                        'Possible',
                        'Probable',
                        'Certaine',
                      ][risk.likelihoodLevel - 1] || 'Non défini'}
                    </p>
                    <p className="text-sm text-gray-600">
                      Gravité :{' '}
                      {
                        [
                          'Négligeable',
                          'Modéré',
                          'Important',
                          'Critique',
                        ][risk.gravityLevel - 1] || 'Non défini'
                      }
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Niveau de risque :{' '}
                      {getRiskLevelLabel(
                        risk.likelihoodLevel * risk.gravityLevel,
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditRisk(risk.id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteRisk(risk.id)}
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
          <p>Aucun risque ajouté pour le moment.</p>
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
          onClick={handleSubmit}
          disabled={risks.length === 0}
        >
          Terminer l'évaluation
        </button>
      </div>
    </div>
  );
};

export default RisksStep;