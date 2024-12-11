export const CONSTANTS = {
  APP: {
    NAME: 'EBIOS Risk Helper',
    VERSION: '1.0.0',
    DESCRIPTION: 'Assistant d\'analyse des risques selon la méthode EBIOS RM',
  },
  ROUTES: {
    HOME: '/',
    ANALYSIS: '/analysis',
    RESULTS: '/results',
    DOCUMENTATION: '/documentation',
  },
  STEPS: {
    MIN_CONTEXT_LENGTH: 50,
    MIN_STAKEHOLDERS: 2,
    MIN_BUSINESS_VALUES: 1,
    MIN_THREATS: 1,
    MIN_FEARED_EVENTS: 1,
    MIN_SCENARIOS: 1,
    MIN_RISKS: 1,
  },
  LIMITS: {
    MAX_NAME_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_STAKEHOLDERS: 50,
    MAX_BUSINESS_VALUES: 30,
    MAX_THREATS: 40,
    MAX_FEARED_EVENTS: 50,
    MAX_SCENARIOS: 30,
    MAX_RISKS: 50,
    MAX_ACTION_PLANS: 100,
  },
  RISK_LEVELS: {
    LOW: { max: 4, color: 'green' },
    MODERATE: { max: 9, color: 'yellow' },
    HIGH: { max: 12, color: 'orange' },
    CRITICAL: { max: 16, color: 'red' },
  },
} as const;

export type Constants = typeof CONSTANTS; 