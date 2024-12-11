import React from 'react';
import type { EbiosFormData, ActionPlan } from '../../types';
import { RiskTreatmentTable } from './RiskTreatmentTable';
import { calculateRiskLevel, getRiskDetails, sortRisksByCriticality, calculateRiskStats } from '../../utils/reportUtils';

interface Props {
  data: EbiosFormData;
  onActionPlansChange?: (actionPlans: ActionPlan[]) => void;
}

export const RiskReport: React.FC<Props> = ({ data, onActionPlansChange }) => {
  const sortedRisks = sortRisksByCriticality(data.risks);
  const stats = calculateRiskStats(data.risks);

  const handleActionPlansChange = (riskId: string, newActionPlans: ActionPlan[]) => {
    if (!onActionPlansChange) return;
    const updatedActionPlans = data.actionPlans
      .filter(ap => ap.riskId !== riskId)
      .concat(newActionPlans);
    onActionPlansChange(updatedActionPlans);
  };

  // Extraction du composant de niveau de risque pour améliorer la lisibilité
  const RiskLevelBadge: React.FC<{ level: string }> = ({ level }) => (
    <div className={`
      px-3 py-1 rounded-full text-sm font-medium
      ${level === 'Critique' && 'bg-red-100 text-red-800'}
      ${level === 'Élevé' && 'bg-orange-100 text-orange-800'}
      ${level === 'Modéré' && 'bg-yellow-100 text-yellow-800'}
      ${level === 'Faible' && 'bg-green-100 text-green-800'}
    `}>
      {level}
    </div>
  );

  // Extraction du composant de barre de progression
  const ProgressBar: React.FC<{ value: number; max: number }> = ({ value, max }) => (
    <div className="flex items-center gap-2">
      <span>{value}</span>
      <div className="flex-grow bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 rounded-full h-2"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <div id="risk-report" className="space-y-8 print:space-y-6">
      <h2 className="text-2xl font-bold print:text-xl">Rapport d'analyse des risques</h2>

      {/* Contexte */}
      <section className="print:break-inside-avoid">
        <h3 className="text-xl font-semibold mb-2 print:text-lg">Contexte</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{data.context}</p>
      </section>

      {/* Statistiques */}
      <section className="print:break-inside-avoid">
        <h3 className="text-xl font-semibold mb-4 print:text-lg">Vue d'ensemble</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-red-600 text-sm">Critiques</div>
            <div className="text-2xl font-bold">{stats.critical}</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-orange-600 text-sm">Élevés</div>
            <div className="text-2xl font-bold">{stats.high}</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-yellow-600 text-sm">Modérés</div>
            <div className="text-2xl font-bold">{stats.moderate}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-green-600 text-sm">Faibles</div>
            <div className="text-2xl font-bold">{stats.low}</div>
          </div>
        </div>
      </section>

      {/* Synthèse des risques */}
      <section>
        <h3 className="text-xl font-semibold mb-4 print:text-lg">Analyse détaillée des risques</h3>
        {sortedRisks.map(risk => {
          const details = getRiskDetails(risk, data);
          if (!details) return null;

          const { scenario, fearedEvent, businessValue, threat, actionPlans } = details;
          const riskLevel = calculateRiskLevel(risk.likelihoodLevel, risk.gravityLevel);

          return (
            <div key={risk.id} className="mb-8 p-6 bg-white rounded-lg shadow print:shadow-none print:border print:border-gray-200 print:break-inside-avoid">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold">{scenario.name}</h4>
                  <p className="text-gray-600">{scenario.description}</p>
                </div>
                <RiskLevelBadge level={riskLevel} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-medium text-gray-700">Valeur métier impactée</h5>
                  <p>{businessValue.name}</p>
                  {businessValue.description && (
                    <p className="text-sm text-gray-600">{businessValue.description}</p>
                  )}
                </div>
                <div>
                  <h5 className="font-medium text-gray-700">Menace</h5>
                  <p>{threat.name}</p>
                  {threat.description && (
                    <p className="text-sm text-gray-600">{threat.description}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <h5 className="font-medium text-gray-700">Impact</h5>
                  <ProgressBar value={fearedEvent.impactLevel} max={4} />
                </div>
                <div>
                  <h5 className="font-medium text-gray-700">Vraisemblance</h5>
                  <ProgressBar value={risk.likelihoodLevel} max={4} />
                </div>
                <div>
                  <h5 className="font-medium text-gray-700">Gravité</h5>
                  <ProgressBar value={risk.gravityLevel} max={4} />
                </div>
              </div>

              {onActionPlansChange && (
                <RiskTreatmentTable
                  risk={risk}
                  actionPlans={actionPlans}
                  onActionPlansChange={(newActionPlans) => handleActionPlansChange(risk.id, newActionPlans)}
                />
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};