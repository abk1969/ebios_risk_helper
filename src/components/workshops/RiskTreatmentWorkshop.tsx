import React from 'react';
import { Analysis } from '../../types/analysis';

interface RiskTreatmentWorkshopProps {
  data: Analysis;
  onUpdate: (data: Analysis) => void;
}

export const RiskTreatmentWorkshop: React.FC<RiskTreatmentWorkshopProps> = ({ data, onUpdate }) => {
  return (
    <div>
      <h2>Atelier Traitement des Risques</h2>
      {/* Contenu de l'atelier */}
    </div>
  );
}; 