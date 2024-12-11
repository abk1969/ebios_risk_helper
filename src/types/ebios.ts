export enum EbiosWorkshop {
  SOCLE = 1,          // Socle de sécurité
  SOURCES = 2,        // Sources de risque
  SCENARIOS = 3,      // Scénarios stratégiques
  OPERATIONNEL = 4,   // Scénarios opérationnels
  TRAITEMENT = 5      // Traitement du risque
}

export interface EbiosAnalysis {
  id: string;
  currentWorkshop: EbiosWorkshop;
  context: {
    scope: string;
    objectives: string[];
    constraints: string[];
    regulatoryFramework: string[];
  };
  securityBaseline: {
    measures: Array<{
      id: string;
      category: string;
      description: string;
      status: 'implemented' | 'planned' | 'not-applicable';
    }>;
  };
  riskSources: Array<{
    id: string;
    name: string;
    category: 'internal' | 'external';
    objectives: string[];
    capabilities: number; // 1-4
    resources: string[];
  }>;
  strategicScenarios: Array<{
    id: string;
    sourceId: string;
    targetId: string;
    likelihood: number; // 1-4
    impact: number; // 1-4
    description: string;
  }>;
  operationalScenarios: Array<{
    id: string;
    strategicScenarioId: string;
    description: string;
    technicalControls: string[];
    likelihood: number; // 1-4
  }>;
  riskTreatment: {
    residualRisks: Array<{
      scenarioId: string;
      acceptanceStatus: 'accepted' | 'mitigated' | 'transferred' | 'avoided';
      justification?: string;
    }>;
    controls: Array<{
      id: string;
      description: string;
      type: 'preventive' | 'detective' | 'corrective';
      status: 'planned' | 'implemented';
      deadline?: string;
    }>;
  };
} 