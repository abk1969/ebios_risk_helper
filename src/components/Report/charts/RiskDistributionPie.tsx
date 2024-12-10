import React from 'react';
import type { Risk } from '../../../types';

interface Props {
  risks: Risk[];
}

export const RiskDistributionPie: React.FC<Props> = ({ risks }) => {
  // Calculer la distribution des niveaux de risque
  const distribution = risks.reduce((acc, risk) => {
    const level = risk.likelihoodLevel * risk.gravityLevel;
    const category = 
      level <= 4 ? 'Faible' :
      level <= 8 ? 'Modéré' :
      level <= 12 ? 'Élevé' : 'Critique';
    
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      <h3>Distribution des risques</h3>
      {/* Afficher les données calculées */}
      <pre>{JSON.stringify(distribution, null, 2)}</pre>
    </div>
  );
};