import { RiskLevel } from '../types';
import type { Risk, LikelihoodLevel, GravityLevel } from '../types';

export const calculateRiskScore = (likelihood: LikelihoodLevel, gravity: GravityLevel): number => {
  return likelihood * gravity;
};

export const getRiskLevel = (score: number): RiskLevel => {
  if (score <= 4) return RiskLevel.LOW;
  if (score <= 9) return RiskLevel.MODERATE;
  if (score <= 12) return RiskLevel.HIGH;
  return RiskLevel.CRITICAL;
};

export const getRiskStats = (risks: Risk[]) => {
  if (!risks?.length) {
    return { critical: 0, high: 0, moderate: 0, low: 0 };
  }
  
  return risks.reduce(
    (acc, risk) => {
      if (!risk?.likelihoodLevel || !risk?.gravityLevel) {
        throw new Error('Niveaux de probabilité et de gravité requis pour chaque risque');
      }
      
      const score = calculateRiskScore(risk.likelihoodLevel, risk.gravityLevel);
      const level = getRiskLevel(score);
      acc[level.toLowerCase() as keyof typeof acc]++;
      return acc;
    },
    { critical: 0, high: 0, moderate: 0, low: 0 }
  );
};

export const sortRisksByPriority = (risks: Risk[]): Risk[] => {
  if (!risks?.length) {
    return [];
  }

  return [...risks].sort((a, b) => {
    if (!a?.likelihoodLevel || !a?.gravityLevel || !b?.likelihoodLevel || !b?.gravityLevel) {
      throw new Error('Niveaux de probabilité et de gravité requis pour chaque risque');
    }
    const scoreA = calculateRiskScore(a.likelihoodLevel, a.gravityLevel);
    const scoreB = calculateRiskScore(b.likelihoodLevel, b.gravityLevel);
    return scoreB - scoreA;
  });
}; 