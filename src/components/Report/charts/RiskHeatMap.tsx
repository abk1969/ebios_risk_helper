import React from 'react';
import type { Risk } from '../../../types';

interface Props {
  risks: Risk[];
}

export const RiskHeatMap: React.FC<Props> = ({ risks }) => {
  // Calculer la distribution des risques
  const heatmapData = Array.from({ length: 4 }, (_, i) => 
    Array.from({ length: 4 }, (_, j) => {
      const count = risks.filter(risk => 
        risk.likelihoodLevel === i + 1 && risk.gravityLevel === j + 1
      ).length;
      return { likelihood: i + 1, gravity: j + 1, count };
    })
  );

  return (
    <div>
      <h3>Carte de chaleur des risques</h3>
      {/* Afficher les données calculées */}
      <pre>{JSON.stringify(heatmapData, null, 2)}</pre>
    </div>
  );
};