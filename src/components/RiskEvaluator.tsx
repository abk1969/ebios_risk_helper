import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import type { Risk } from '../types';
import HelpTooltip from './HelpTooltip';

interface RiskEvaluatorProps {
  scenarioName: string;
  scenarioId: string;
  initialRisk?: Risk;
  onSave: (risk: Risk) => void;
  onCancel: () => void;
}

export function RiskEvaluator({
  scenarioName,
  scenarioId,
  initialRisk,
  onSave,
  onCancel,
}: RiskEvaluatorProps) {
  const [likelihoodLevel, setLikelihoodLevel] = useState<number>(
    initialRisk?.likelihoodLevel || 1,
  );
  const [gravityLevel, setGravityLevel] = useState<number>(
    initialRisk?.gravityLevel || 1,
  );
  const [comment, setComment] = useState<string>(initialRisk?.comment || '');

  // Labels pour les niveaux de vraisemblance et de gravité (maintenant sur 4 niveaux)
  const likelihoodLabels = ['Minime', 'Possible', 'Probable', 'Certaine'];
  const gravityLabels = ['Négligeable', 'Modéré', 'Important', 'Critique'];

  // Fonction pour calculer le niveau de risque avec une échelle personnalisable (maintenant sur 16 niveaux)
  const calculateRiskLevel = (
    likelihood: number,
    gravity: number,
    scale: number = 4,
  ) => {
    const normalizedLikelihood = Math.max(1, Math.min(likelihood, scale));
    const normalizedGravity = Math.max(1, Math.min(gravity, scale));
    return normalizedLikelihood * normalizedGravity;
  };

  // Obtenir le niveau de risque
  const riskLevel = calculateRiskLevel(likelihoodLevel, gravityLevel);

  // Fonction pour déterminer le label du niveau de risque
  const getRiskLevelLabel = (level: number) => {
    if (level <= 4) return 'Faible';
    if (level <= 8) return 'Modéré';
    if (level <= 12) return 'Élevé';
    return 'Critique';
  };

  const handleSave = () => {
    const risk: Risk = {
      id: initialRisk?.id || crypto.randomUUID(),
      scenarioId,
      likelihoodLevel, // Utiliser likelihoodLevel au lieu de probability
      gravityLevel, // Utiliser gravityLevel au lieu de impact
      comment,
    };
    onSave(risk);
  };

  // Réinitialiser le formulaire lorsque le scénario change
  useEffect(() => {
    setLikelihoodLevel(initialRisk?.likelihoodLevel || 1);
    setGravityLevel(initialRisk?.gravityLevel || 1);
    setComment(initialRisk?.comment || '');
  }, [scenarioId, initialRisk]);

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center mb-2">
        <h3 className="text-lg font-medium text-gray-900">
          Évaluation du risque{' '}
          <HelpTooltip text="Évaluez la vraisemblance et la gravité du risque associé à ce scénario." />
        </h3>
      </div>
      <h4 className="font-medium text-gray-900 mb-4">{scenarioName}</h4>

      <div className="space-y-4">
        {/* Vraisemblance Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vraisemblance
          </label>
          <input
            type="range"
            min="1"
            max="4"
            value={likelihoodLevel}
            onChange={e => setLikelihoodLevel(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600">
            {likelihoodLabels.map((label, index) => (
              <span key={index} className="text-center">
                {label}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Valeur actuelle : {likelihoodLevel} -{' '}
            {likelihoodLabels[likelihoodLevel - 1]}
          </p>
        </div>

        {/* Gravité Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gravité
          </label>
          <input
            type="range"
            min="1"
            max="4"
            value={gravityLevel}
            onChange={e => setGravityLevel(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600">
            {gravityLabels.map((label, index) => (
              <span key={index} className="text-center">
                {label}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Valeur actuelle : {gravityLevel} - {gravityLabels[gravityLevel - 1]}
          </p>
        </div>

        {/* Comment Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Commentaire (facultatif)
          </label>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Ajouter un commentaire sur l'évaluation du risque..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Risk Level Display */}
        <div className="pt-2">
          <p className="text-sm font-medium text-gray-700">
            Niveau de risque :{' '}
            <span
              className={`text-${getRiskLevelLabel(
                riskLevel,
              ).toLowerCase()}-600`}
            >
              {riskLevel} ({getRiskLevelLabel(riskLevel)})
            </span>
          </p>
        </div>

        {/* Save and Cancel Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="button" onClick={handleSave}>
            Enregistrer l'évaluation
          </Button>
        </div>
      </div>
    </div>
  );
}