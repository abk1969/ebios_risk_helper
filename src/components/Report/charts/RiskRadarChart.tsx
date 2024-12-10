import React from 'react';
import type { Risk, Scenario } from '../../../types';

interface Props {
  scenarios: Scenario[];
  risks: Risk[];
}

export const RiskRadarChart: React.FC<Props> = ({ scenarios, risks }) => {
  // Utiliser les props pour calculer les données du graphique
  const data = scenarios.map(scenario => {
    const scenarioRisks = risks.filter(risk => risk.scenarioId === scenario.id);
    const avgLikelihood = scenarioRisks.reduce((sum, risk) => sum + risk.likelihoodLevel, 0) / (scenarioRisks.length || 1);
    const avgGravity = scenarioRisks.reduce((sum, risk) => sum + risk.gravityLevel, 0) / (scenarioRisks.length || 1);
    
    return {
      scenario: scenario.name,
      likelihood: avgLikelihood,
      gravity: avgGravity
    };
  });

  return (
    <div>
      <h3>Radar des risques</h3>
      {/* Afficher les données calculées */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};