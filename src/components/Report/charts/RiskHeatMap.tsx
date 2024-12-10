import React from 'react';
import { ResponsiveHeatMap, HeatMapDatum } from '@nivo/heatmap';
import { Risk } from '../../../types';

interface RiskHeatMapProps {
  risks: Risk[];
}

const RiskHeatMap: React.FC<RiskHeatMapProps> = ({ risks }) => {
  // Préparation des données pour la heatmap
  const data: HeatMapDatum[] = Array.from({ length: 4 }, (_, i) => ({
    id: `${4 - i}`, // Axe des ordonnées : Gravité (de 4 à 1)
    data: Array.from({ length: 4 }, (_, j) => ({
      x: `${j + 1}`, // Axe des abscisses : Vraisemblance (de 1 à 4)
      y: risks.filter(
        r => r.gravityLevel === 4 - i && r.likelihoodLevel === j + 1,
      ).length, // Nombre de risques pour chaque combinaison de gravité et vraisemblance
    })),
  }));

  // Couleurs pour les niveaux de risque
  const colors = [
    '#e8e8e8', // 0 risque (gris clair)
    '#ccece6', // Faible
    '#99d8c9',
    '#66c2a4',
    '#41ae76',
    '#238b45', // Vraisemblance 2
    '#fed976', // Modéré
    '#feb24c',
    '#fd8d3c',
    '#fc4e2a',
    '#e31a1c', // Vraisemblance 3
    '#fc4e2a', // Élevé
    '#e31a1c',
    '#bd0026',
    '#800026',
    '#800026', // Vraisemblance 4 (rouge foncé)
  ];
  
  // Fonction pour obtenir la couleur en fonction du nombre de risques
  const getColor = (value: number) => {
    if (value === 0) return colors[0];
    if (value >= colors.length) return colors[colors.length - 1]; // Si plus de risques que de couleurs, on prend la dernière
    return colors[value];
  };

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ResponsiveHeatMap
        data={data}
        margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
        valueFormat=">-.2s"
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Vraisemblance',
          legendPosition: 'middle',
          legendOffset: -46,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Gravité',
          legendPosition: 'middle',
          legendOffset: -72,
        }}
        colors={cell => getColor(cell.value)} // Utilisation de la fonction getColor
        emptyColor="#f5f5f5" // Couleur pour les cases sans risque
        // Tooltip personnalisé
        tooltip={({ cell }) => (
          <div
            style={{
              background: 'white',
              padding: '9px 12px',
              border: '1px solid #ccc',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div>
              <strong>{cell.value}</strong> risque(s)
            </div>
            <div>
              Vraisemblance : <strong>{cell.x}</strong>
            </div>
            <div>
              Gravité : <strong>{cell.y}</strong>
            </div>
          </div>
        )}
        legends={[
          {
            anchor: 'bottom',
            translateX: 0,
            translateY: 30,
            length: 400,
            thickness: 8,
            direction: 'row',
            tickPosition: 'after',
            tickSize: 3,
            tickSpacing: 4,
            tickOverlap: false,
            title: 'Nombre de risques →',
            titleAlign: 'start',
            titleOffset: 4,
          },
        ]}
        role="application"
        ariaLabel="Heatmap des risques"
      />
    </div>
  );
};

export default RiskHeatMap;