import React from 'react';
import type { Risk, Scenario } from '../../../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

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

  // Transformer les données pour Recharts
  const chartData = [
    {
      subject: 'Probabilité',
      ...data.reduce((acc, item) => ({
        ...acc,
        [item.scenario]: item.likelihood
      }), {})
    },
    {
      subject: 'Gravité',
      ...data.reduce((acc, item) => ({
        ...acc,
        [item.scenario]: item.gravity
      }), {})
    }
  ];

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h3>Radar des risques</h3>
      <ResponsiveContainer>
        <RadarChart data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 5]} />
          {scenarios.map((scenario) => (
            <Radar
              key={scenario.id}
              name={scenario.name}
              dataKey={scenario.name}
              stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`}
              fill={`#${Math.floor(Math.random()*16777215).toString(16)}`}
              fillOpacity={0.6}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};