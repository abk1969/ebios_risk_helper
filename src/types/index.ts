// Niveaux de vraisemblance (EBIOS RM)
export enum LikelihoodLevel {
  MINIMAL = 1,
  POSSIBLE = 2,
  PROBABLE = 3,
  CERTAIN = 4,
}

// Niveaux de gravité (EBIOS RM)
export enum GravityLevel {
  NEGLIGIBLE = 1,
  MODERATE = 2,
  SIGNIFICANT = 3,
  CRITICAL = 4,
}

// Niveaux de risque (combinaison de vraisemblance et gravité)
export enum RiskLevel {
  LOW = 'Faible',
  MODERATE = 'Modéré',
  HIGH = 'Élevé',
  CRITICAL = 'Critique',
}

export interface Risk {
  id: string;
  scenarioId: string;
  likelihoodLevel: LikelihoodLevel;
  gravityLevel: GravityLevel;
  riskTreatmentStatus?: string; // Statut du traitement du risque (par exemple, "à traiter", "en cours", "traité")
}

// OBSOLETE - Remplacé par Stakeholder et BusinessValue
// export interface Asset {
//   id: string;
//   name: string;
//   description: string;
// }

export interface Threat {
  id: string;
  name: string;
  description: string;
}

export interface Stakeholder {
  id: string;
  name: string;
  needs: string[];
}

export interface BusinessValue {
  id: string;
  name: string;
  description: string;
  stakeholderId: string;
  essentialityCriteria: string[];
}

export interface FearedEvent {
  id: string;
  businessValueId: string;
  threatId: string;
  impactLevel: number;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  threatId: string;
  fearedEventId: string;
  likelihoodLevel: LikelihoodLevel;
}

// Action de traitement du risque
export interface ActionPlan {
  id: string;
  riskId: string; // ID du risque associé
  action: string;
  description: string;
  responsible: string;
  deadline: string; // Vous pouvez utiliser un type Date si vous préférez
  status?: string; // Statut de l'action (par exemple, "à faire", "en cours", "terminé")
}

export interface EbiosFormData {
  context: string;
  stakeholders: Stakeholder[];
  businessValues: BusinessValue[];
  threats: Threat[];
  fearedEvents: FearedEvent[];
  scenarios: Scenario[];
  risks: Risk[];
  actionPlans: ActionPlan[]; // Ajout du tableau pour les actions de traitement des risques
}