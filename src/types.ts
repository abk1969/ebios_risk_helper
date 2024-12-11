export interface EbiosFormData {
  risks: Risk[];
  scenarios: Scenario[];
}

export interface Risk {
  id: string;
  scenarioId: string;
  likelihoodLevel: LikelihoodLevel;
  gravityLevel: GravityLevel;
  riskTreatmentStatus: TreatmentStatus;
}

export interface Scenario {
  id: string;
  name: string;
}

export enum LikelihoodLevel {
  MINIMAL = 1,
  FAIBLE = 2,
  SIGNIFICATIF = 3,
  MAXIMAL = 4
}

export enum GravityLevel {
  NEGLIGIBLE = 1,
  LIMITEE = 2,
  IMPORTANTE = 3,
  CRITIQUE = 4
}

export type TreatmentStatus = 'à traiter' | 'en cours' | 'traité'; 