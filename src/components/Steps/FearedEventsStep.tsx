import React, { useState, useEffect } from 'react';
import { FearedEvent, BusinessValue, Threat } from '../../types';
import HelpTooltip from '../HelpTooltip';
import { PlusCircle, Trash2, Edit } from 'lucide-react';

interface FearedEventsStepProps {
  onNext: (fearedEvents: FearedEvent[]) => void;
  onBack: () => void;
  fearedEvents: FearedEvent[];
  businessValues: BusinessValue[];
  threats: Threat[];
}

export const FearedEventsStep: React.FC<FearedEventsStepProps> = ({
  onNext,
  onBack,
  fearedEvents: initialFearedEvents,
  businessValues,
  threats,
}) => {
  const [fearedEvents, setFearedEvents] = useState<FearedEvent[]>(
    initialFearedEvents,
  );
  const [currentFearedEvent, setCurrentFearedEvent] = useState<FearedEvent>({
    id: '',
    businessValueId: '',
    threatId: '',
    impactLevel: 1,
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    businessValueId?: string;
    threatId?: string;
    impactLevel?: string;
  }>({});

  useEffect(() => {
    setFearedEvents(initialFearedEvents);
  }, [initialFearedEvents]);

  const validate = () => {
    const newErrors: {
      businessValueId?: string;
      threatId?: string;
      impactLevel?: string;
    } = {};
    if (!currentFearedEvent.businessValueId) {
      newErrors.businessValueId = 'La valeur métier est requise.';
    }
    if (!currentFearedEvent.threatId) {
      newErrors.threatId = 'La menace est requise.';
    }
    if (!currentFearedEvent.impactLevel) {
      newErrors.impactLevel = "Le niveau d'impact est requis.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddFearedEvent = () => {
    if (validate()) {
      setFearedEvents(prev => [
        ...prev,
        {
          ...currentFearedEvent,
          id: currentFearedEvent.id || crypto.randomUUID(),
        },
      ]);
      setCurrentFearedEvent({
        id: '',
        businessValueId: '',
        threatId: '',
        impactLevel: 1,
      });
      setEditMode(false);
      setErrors({});
    }
  };

  const handleEditFearedEvent = (id: string) => {
    const fearedEventToEdit = fearedEvents.find(fe => fe.id === id);
    if (fearedEventToEdit) {
      setCurrentFearedEvent(fearedEventToEdit);
      setEditMode(true);
      setErrors({});
    }
  };

  const handleUpdateFearedEvent = () => {
    if (validate()) {
      setFearedEvents(prev =>
        prev.map(fe =>
          fe.id === currentFearedEvent.id ? currentFearedEvent : fe,
        ),
      );
      setCurrentFearedEvent({
        id: '',
        businessValueId: '',
        threatId: '',
        impactLevel: 1,
      });
      setEditMode(false);
      setErrors({});
    }
  };

  const handleDeleteFearedEvent = (id: string) => {
    setFearedEvents(prev => prev.filter(fe => fe.id !== id));
  };

  const handleNext = () => {
    onNext(fearedEvents);
  };

  const getBusinessValueName = (businessValueId: string) => {
    return (
      businessValues.find(bv => bv.id === businessValueId)?.name ||
      'Valeur métier inconnue'
    );
  };

  const getThreatName = (threatId: string) => {
    return threats.find(t => t.id === threatId)?.name || 'Menace inconnue';
  };

  return (
    <div>
      <div className="flex items-center mb-2">
        <h3 className="text-lg font-medium">
          Événements redoutés{' '}
          <HelpTooltip text="Associez une menace à une valeur métier pour créer un événement redouté, et évaluez le niveau d'impact de cet événement." />
        </h3>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Valeur métier
        </label>
        <select
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={currentFearedEvent.businessValueId}
          onChange={e => {
            setCurrentFearedEvent(prev => ({
              ...prev,
              businessValueId: e.target.value,
            }));
            if (errors.businessValueId) {
              setErrors(prev => ({ ...prev, businessValueId: undefined }));
            }
          }}
        >
          <option value="">Sélectionnez une valeur métier</option>
          {businessValues.map(bv => (
            <option key={bv.id} value={bv.id}>
              {bv.name}
            </option>
          ))}
        </select>
        {errors.businessValueId && (
          <p className="mt-2 text-sm text-red-600">
            {errors.businessValueId}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Menace
        </label>
        <select
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={currentFearedEvent.threatId}
          onChange={e => {
            setCurrentFearedEvent(prev => ({
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
          Niveau d'impact
        </label>
        <div className="mt-1 flex space-x-2">
          {[1, 2, 3, 4].map(level => (
            <button
              key={level}
              type="button"
              className={`px-4 py-2 rounded-md ${
                currentFearedEvent.impactLevel === level
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() =>
                setCurrentFearedEvent(prev => ({
                  ...prev,
                  impactLevel: level,
                }))
              }
            >
              {level}
            </button>
          ))}
        </div>
        {errors.impactLevel && (
          <p className="mt-2 text-sm text-red-600">{errors.impactLevel}</p>
        )}
        <div className="mt-2">
          <p className="text-sm text-gray-600">
            Niveaux d'impact :{' '}
            <span className="font-bold">
              1 (Négligeable), 2 (Modéré), 3 (Important), 4 (Critique)
            </span>
          </p>
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        onClick={editMode ? handleUpdateFearedEvent : handleAddFearedEvent}
        disabled={
          !currentFearedEvent.businessValueId ||
          !currentFearedEvent.threatId ||
          !currentFearedEvent.impactLevel
        }
      >
        <PlusCircle className="w-4 h-4" />
        {editMode ? "Modifier l'événement" : "Ajouter l'événement"}
      </button>

      {/* Afficher les événements redoutés ajoutés */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">
          Événements redoutés ajoutés :
        </h3>
        {fearedEvents.length > 0 ? (
          <div className="space-y-3">
            {fearedEvents.map(fe => (
              <div
                key={fe.id}
                className="p-4 bg-gray-50 rounded-lg space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {getBusinessValueName(fe.businessValueId)} -{' '}
                      {getThreatName(fe.threatId)}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Impact :{' '}
                      {[
                        'Négligeable',
                        'Modéré',
                        'Important',
                        'Critique',
                      ][fe.impactLevel - 1] || 'Non défini'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditFearedEvent(fe.id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteFearedEvent(fe.id)}
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
          <p>Aucun événement redouté ajouté pour le moment.</p>
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
          disabled={fearedEvents.length === 0}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};
