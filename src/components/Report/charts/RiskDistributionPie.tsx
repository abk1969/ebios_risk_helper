import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { Risk } from '../../../types';
import { calculateRiskLevel } from '../../../utils/reportUtils';

interface RiskDistributionPieProps {
  risks: Risk[];
}

const COLORS = {
  Critique: '#ef4444',  // red-500
  Élevé: '#f97316',    // orange-500
  Modéré: '#eab308',   // yellow-500
  Faible: '#22c55e'    // green-500
};

export const RiskDistributionPie: React.FC<RiskDistributionPieProps> = ({ risks }) => {
  const distribution = risks.reduce((acc, risk) => {
    const level = calculateRiskLevel(risk.likelihoodLevel, risk.gravityLevel);
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(distribution).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[entry.name as keyof typeof COLORS]}
                className="stroke-white stroke-2"
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};