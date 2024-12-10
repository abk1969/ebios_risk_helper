import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import { Risk, Scenario } from '../../../types';
import { useTheme } from '../../../context/ThemeContext'; // Importez le contexte de thème

interface RiskRadarChartProps {
  scenarios: Scenario[];
  risks: Risk[];
}

const RiskRadarChart: React.FC<RiskRadarChartProps> = ({
  scenarios,
  risks,
}) => {
  const { colors } = useTheme(); // Récupérez les couleurs du thème

  // Préparation des données pour le graphique radar
  const data = scenarios.map(scenario => {
    const associatedRisks = risks.filter(
      risk => risk.scenarioId === scenario.id,
    );
    const likelihoodSum = associatedRisks.reduce(
      (sum, risk) => sum + risk.likelihoodLevel,
      0,
    );
    const gravitySum = associatedRisks.reduce(
      (sum, risk) => sum + risk.gravityLevel,
      0,
    );
    const averageLikelihood =
      likelihoodSum / (associatedRisks.length || 1);
    const averageGravity = gravitySum / (associatedRisks.length || 1);

    return {
      scenario: scenario.name.substring(0, 20), // Limiter le nom du scénario à 20 caractères
      Vraisemblance: averageLikelihood,
      Gravité: averageGravity,
    };
  });

  // Vérifier s'il y a des données à afficher
  if (data.length === 0 || !scenarios || !risks) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">
          Aucun scénario à afficher pour le moment.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow" style={{ height: 500 }}>
      <h3 className="text-lg font-medium mb-4">
        Distribution des risques par scénario
      </h3>
      <ResponsiveRadar
        data={data}
        keys={['Vraisemblance', 'Gravité']}
        indexBy="scenario"
        maxValue={4}
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ from: 'color' }}
        gridLevels={4}
        gridShape="circular"
        gridLabelOffset={36}
        enableDots={true}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color' }}
        enableDotLabel={true}
        dotLabel="value"
        dotLabelYOffset={-12}
        colors={colors.radar} // Utiliser les couleurs du thème
        fillOpacity={0.25}
        blendMode="multiply"
        animate={true}
        motionConfig="gentle"
        isInteractive={true} // Activer l'interactivité pour les tooltips
        tooltip={({ id, value, color }) => (
          <div
            style={{
              background: 'white',
              padding: '9px 12px',
              border: '1px solid #ccc',
              color: color,
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <strong>{id}</strong>: {value}
          </div>
        )}
        legends={[
          {
            anchor: 'top-left',
            direction: 'column',
            translateX: -50,
            translateY: -40,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#999',
            symbolSize: 12,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default RiskRadarChart;