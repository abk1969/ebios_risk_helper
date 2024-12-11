import React from 'react';
import { Analysis } from '../../types/analysis';

interface StrategicScenariosWorkshopProps {
  data: Analysis;
  onUpdate: (data: Analysis) => void;
}

export const StrategicScenariosWorkshop: React.FC<StrategicScenariosWorkshopProps> = ({ data, onUpdate }) => {
  return (
    <div>
      <h2>Atelier Scénarios Stratégiques</h2>
      {/* Contenu de l'atelier */}
    </div>
  );
}; 