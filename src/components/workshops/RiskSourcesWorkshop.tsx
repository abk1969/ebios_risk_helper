import React from 'react';
import { Analysis } from '../../types/analysis'; // Ajustez le chemin selon votre structure

interface RiskSourcesWorkshopProps {
  data: Analysis;
  onUpdate: (data: Analysis) => void;
}

export const RiskSourcesWorkshop: React.FC<RiskSourcesWorkshopProps> = ({ data, onUpdate }) => {
  return (
    <div>
      <h2>Atelier Sources de Risques</h2>
      {/* Contenu de l'atelier */}
    </div>
  );
}; 