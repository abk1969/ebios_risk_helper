export const validations = {
  context: {
    minLength: 50,
    requiredWords: ['objectifs', 'contexte', 'organisation'],
  },
  stakeholders: {
    min: 2,
    maxNameLength: 100,
    maxDescriptionLength: 500,
  },
  businessValues: {
    min: 1,
    maxNameLength: 100,
    maxDescriptionLength: 500,
    minCriticity: 1,
    maxCriticity: 4,
  },
  threats: {
    min: 1,
    maxNameLength: 100,
    maxDescriptionLength: 500,
    minCapability: 1,
    maxCapability: 4,
    minResources: 1,
  },
  fearedEvents: {
    min: 1,
    maxNameLength: 100,
    maxDescriptionLength: 500,
    minImpactLevel: 1,
    maxImpactLevel: 4,
  },
  scenarios: {
    min: 1,
    maxNameLength: 100,
    maxDescriptionLength: 500,
    minLikelihoodLevel: 1,
    maxLikelihoodLevel: 4,
  },
  risks: {
    min: 1,
    maxNameLength: 100,
    maxDescriptionLength: 500,
  },
  actionPlans: {
    maxNameLength: 100,
    maxDescriptionLength: 500,
    maxResponsibleLength: 100,
  },
} as const;

export type Validations = typeof validations; 