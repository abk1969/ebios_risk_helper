export interface Analysis {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'in_progress' | 'completed';
  operationalScenarios: OperationalScenario[];
  threatSources: ThreatSource[];
  businessValues: BusinessValue[];
}

export interface OperationalScenario {
  id: string;
  title: string;
  description: string;
  threatSources: ThreatSource[];
  likelihood: number;
  impact: number;
  steps: ScenarioStep[];
  technicalControls?: string[];
  status: 'draft' | 'validated';
}

export interface ScenarioStep {
  id: string;
  description: string;
  order: number;
  technicalAssets: string[];
  vulnerabilities?: string[];
}

export interface ThreatSource {
  id: string;
  name: string;
  category: 'ORGANISATION' | 'NATION' | 'CYBERCRIME';
  description: string;
  capability?: number;
  motivation?: number;
  resources?: number;
}

export interface BusinessValue {
  id: string;
  name: string;
  criticality: number;
  impactDescription: string;
}
