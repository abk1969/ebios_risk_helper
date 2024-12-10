import React from 'react';
import { LikelihoodLevel, GravityLevel, RiskLevel } from '../types';

interface Props {
  likelihoodLevel: LikelihoodLevel;
  gravityLevel: GravityLevel;
  onChange?: (likelihood: LikelihoodLevel, gravity: GravityLevel) => void;
  readOnly?: boolean;
}

const RiskEvaluator: React.FC<Props> = ({
  likelihoodLevel,
  gravityLevel,
  onChange,
  readOnly = false,
}) => {
  const calculateRiskLevel = (likelihood: number, gravity: number): RiskLevel => {
    const score = likelihood * gravity;
    if (score <= 4) return RiskLevel.LOW;
    if (score <= 9) return RiskLevel.MODERATE;
    if (score <= 12) return RiskLevel.HIGH;
    return RiskLevel.CRITICAL;
  };

  const getRiskColor = (level: RiskLevel): string => {
    switch (level) {
      case RiskLevel.LOW:
        return 'bg-green-100 text-green-800';
      case RiskLevel.MODERATE:
        return 'bg-yellow-100 text-yellow-800';
      case RiskLevel.HIGH:
        return 'bg-orange-100 text-orange-800';
      case RiskLevel.CRITICAL:
        return 'bg-red-100 text-red-800';
    }
  };

  const handleLikelihoodChange = (value: string) => {
    if (onChange) {
      onChange(Number(value) as LikelihoodLevel, gravityLevel);
    }
  };

  const handleGravityChange = (value: string) => {
    if (onChange) {
      onChange(likelihoodLevel, Number(value) as GravityLevel);
    }
  };

  const currentRiskLevel = calculateRiskLevel(likelihoodLevel, gravityLevel);
  const riskColor = getRiskColor(currentRiskLevel);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vraisemblance
          </label>
          <select
            value={likelihoodLevel}
            onChange={(e) => handleLikelihoodChange(e.target.value)}
            disabled={readOnly}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
          >
            {Object.entries(LikelihoodLevel)
              .filter(([key]) => !isNaN(Number(key)))
              .map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gravité
          </label>
          <select
            value={gravityLevel}
            onChange={(e) => handleGravityChange(e.target.value)}
            disabled={readOnly}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
          >
            {Object.entries(GravityLevel)
              .filter(([key]) => !isNaN(Number(key)))
              .map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm font-medium text-gray-700 mb-1">
          Niveau de risque
        </div>
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${riskColor}`}>
          {currentRiskLevel}
        </div>
      </div>

      {!readOnly && (
        <div className="mt-2 text-sm text-gray-500">
          Score = Vraisemblance ({likelihoodLevel}) × Gravité ({gravityLevel}) = {likelihoodLevel * gravityLevel}
        </div>
      )}
    </div>
  );
};

export default RiskEvaluator;