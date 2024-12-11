export const RISK_LEVELS = {
  CRITICAL: {
    label: 'Critique',
    color: 'red',
    description: 'Risque inacceptable nécessitant une action immédiate',
  },
  HIGH: {
    label: 'Élevé',
    color: 'orange',
    description: 'Risque important nécessitant une action prioritaire',
  },
  MODERATE: {
    label: 'Modéré',
    color: 'yellow',
    description: 'Risque à traiter selon un plan d\'action défini',
  },
  LOW: {
    label: 'Faible',
    color: 'green',
    description: 'Risque acceptable avec surveillance',
  },
} as const;

export const TREATMENT_STATUS = {
  'à traiter': {
    label: 'À traiter',
    color: 'red',
  },
  'en cours': {
    label: 'En cours',
    color: 'yellow',
  },
  'traité': {
    label: 'Traité',
    color: 'green',
  },
} as const; 