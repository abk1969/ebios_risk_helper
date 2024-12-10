import React from 'react';
import { Pie } from '@nivo/pie'; // Correct import
import { Risk } from '../../../types';

interface RiskDistributionPieProps {
  risks: Risk[];
}

const RiskDistributionPie: React.FC<RiskDistributionPieProps> = ({
  risks,
}) => {
  // Si aucun risque n'est présent, afficher un message
  if (risks.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">Aucun risque à afficher pour le moment.</p>
      </div>
    );
  }

  // Calculer la distribution des risques par niveau
  const riskLevels = {
    Faible: 0,
    Modéré: 0,
    Élevé: 0,
    Critique: 0,
  };

  risks.forEach(risk => {
    const riskLevel = risk.likelihoodLevel * risk.gravityLevel;
    if (riskLevel >= 1 && riskLevel <= 4) {
      riskLevels.Faible++;
    } else if (riskLevel > 4 && riskLevel <= 8) {
      riskLevels.Modéré++;
    } else if (riskLevel > 8 && riskLevel <= 12) {
      riskLevels.Élevé++;
    } else if (riskLevel > 12 && riskLevel <= 16) {
      riskLevels.Critique++;
    }
  });

  // Préparer les données pour le graphique
  const data = [
    {
      id: 'Faible',
      label: 'Faible',
      value: riskLevels.Faible,
      color: 'rgb(34, 197, 94)', // Vert
    },
    {
      id: 'Modéré',
      label: 'Modéré',
      value: riskLevels.Modéré,
      color: 'rgb(234, 179, 8)', // Jaune
    },
    {
      id: 'Élevé',
      label: 'Élevé',
      value: riskLevels.Élevé,
      color: 'rgb(249, 115, 22)', // Orange
    },
    {
      id: 'Critique',
      label: 'Critique',
      value: riskLevels.Critique,
      color: 'rgb(239, 68, 68)', // Rouge
    },
  ].filter(item => item.value > 0); // Filtrer les niveaux de risque non présents

  return (
    <div className="bg-white p-6 rounded-lg shadow" style={{ height: 400 }}>
      <Pie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ datum: 'data.color' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        enableArcLinkLabels={false} // Désactiver les labels de lien d'arc
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }} // Couleur du texte des labels
        tooltip={({ datum: { label, value, color } }) => (
          <div
            style={{
              background: 'white',
              padding: '9px 12px',
              border: '1px solid #ccc',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              color: color, // Utiliser la couleur de la part du graphique
            }}
          >
            <strong>{label}</strong>: {value}
          </div>
        )}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000', // Couleur du texte au survol de la légende
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Diagramme circulaire de la répartition des risques"
      />
    </div>
  );
};

export default RiskDistributionPie;