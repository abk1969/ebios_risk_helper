import { env } from './env';

export const appConfig = {
  name: env.app.name,
  description: env.app.description,
  version: env.app.version,
  environment: env.app.environment,
  baseUrl: '/ebios_risk_helper',
  api: {
    baseUrl: env.app.environment === 'production' 
      ? 'https://api.ebios-risk-helper.com'
      : 'http://localhost:3000',
  },
  ebios: {
    maxStakeholders: 50,
    maxBusinessValues: 30,
    maxThreats: 40,
    maxFearedEvents: 50,
    maxScenarios: 30,
    maxRisks: 50,
    maxActionPlans: 100,
    riskLevels: {
      low: { max: 4, color: 'green' },
      moderate: { max: 9, color: 'yellow' },
      high: { max: 12, color: 'orange' },
      critical: { max: 16, color: 'red' },
    },
  },
} as const;

export type AppConfig = typeof appConfig; 