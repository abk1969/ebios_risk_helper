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

// Niveaux de risque
export enum RiskLevel {
  LOW = 'Faible',
  MODERATE = 'Modéré',
  HIGH = 'Élevé',
  CRITICAL = 'Critique',
}

// Types de parties prenantes
export type StakeholderType = 'interne' | 'externe' | 'fournisseur' | 'client' | 'autre';

// Types de menaces
export type ThreatCategory = 'cyber' | 'physique' | 'humain' | 'organisationnel' | 'autre';

// Statuts de traitement
export type TreatmentStatus = 'à traiter' | 'en cours' | 'traité';

// Interfaces principales
export interface Stakeholder {
  id: string;
  name: string;
  type: StakeholderType;
  description: string;
  contact: string;
}

export interface BusinessValue {
  id: string;
  name: string;
  description: string;
  stakeholderId: string;
  essentialityCriteria: string[];
}

export interface Threat {
  id: string;
  name: string;
  description: string;
  category: ThreatCategory;
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

export interface Risk {
  id: string;
  scenarioId: string;
  likelihoodLevel: LikelihoodLevel;
  gravityLevel: GravityLevel;
  riskTreatmentStatus: TreatmentStatus;
}

export interface ActionPlan {
  id: string;
  riskId: string;
  action: string;
  description: string;
  responsible: string;
  deadline: string;
  status: TreatmentStatus;
}

// Interface principale de l'application
export interface EbiosFormData {
  id: string;
  context: string;
  stakeholders: Stakeholder[];
  businessValues: BusinessValue[];
  threats: Threat[];
  fearedEvents: FearedEvent[];
  scenarios: Scenario[];
  risks: Risk[];
  actionPlans: ActionPlan[];
}

import type { FC } from 'react';

export interface StepComponentProps {
  data: EbiosFormData;
  onSubmit: (data: Partial<EbiosFormData>) => void;
}

export interface Step {
  title: string;
  component: FC<StepComponentProps>;
  validation?: (data: EbiosFormData) => boolean;
}