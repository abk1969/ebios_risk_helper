import React from 'react';
import { Analysis } from '../../types/analysis';

interface SecurityBaselineWorkshopProps {
  data: Analysis;
  onUpdate: (data: Analysis) => void;
}

export const SecurityBaselineWorkshop: React.FC<SecurityBaselineWorkshopProps> = ({ data, onUpdate }) => {
  return (
    <div>
      <h2>Atelier Socle de Sécurité</h2>
      {/* Contenu de l'atelier */}
    </div>
  );
}; 