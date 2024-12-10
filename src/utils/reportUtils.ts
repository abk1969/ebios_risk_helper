import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { RiskLevel } from '../types';
import type {
  EbiosFormData,
  Risk,
  Scenario,
  FearedEvent,
  BusinessValue,
  Threat,
  ActionPlan,
  LikelihoodLevel,
  GravityLevel,
} from '../types';

// Calcule le niveau de risque en fonction de la vraisemblance et de la gravité
export const calculateRiskLevel = (likelihood: LikelihoodLevel, gravity: GravityLevel): RiskLevel => {
  const score = likelihood * gravity;
  if (score <= 4) return RiskLevel.LOW;
  if (score <= 9) return RiskLevel.MODERATE;
  if (score <= 12) return RiskLevel.HIGH;
  return RiskLevel.CRITICAL;
};

// Récupère les informations complètes d'un risque
export const getRiskDetails = (
  risk: Risk,
  data: EbiosFormData
): {
  scenario: Scenario;
  fearedEvent: FearedEvent;
  businessValue: BusinessValue;
  threat: Threat;
  actionPlans: ActionPlan[];
} | null => {
  const scenario = data.scenarios.find(s => s.id === risk.scenarioId);
  if (!scenario) return null;

  const fearedEvent = data.fearedEvents.find(fe => fe.id === scenario.fearedEventId);
  if (!fearedEvent) return null;

  const businessValue = data.businessValues.find(bv => bv.id === fearedEvent.businessValueId);
  if (!businessValue) return null;

  const threat = data.threats.find(t => t.id === scenario.threatId);
  if (!threat) return null;

  const actionPlans = data.actionPlans.filter(ap => ap.riskId === risk.id);

  return {
    scenario,
    fearedEvent,
    businessValue,
    threat,
    actionPlans,
  };
};

// Trie les risques par niveau de criticité
export const sortRisksByCriticality = (risks: Risk[]): Risk[] => {
  return [...risks].sort((a, b) => {
    const scoreA = a.likelihoodLevel * a.gravityLevel;
    const scoreB = b.likelihoodLevel * b.gravityLevel;
    return scoreB - scoreA;
  });
};

// Groupe les risques par niveau
export const groupRisksByLevel = (risks: Risk[]): Record<RiskLevel, Risk[]> => {
  return risks.reduce((acc, risk) => {
    const level = calculateRiskLevel(risk.likelihoodLevel, risk.gravityLevel);
    if (!acc[level]) acc[level] = [];
    acc[level].push(risk);
    return acc;
  }, {} as Record<RiskLevel, Risk[]>);
};

// Calcule les statistiques des risques
export const calculateRiskStats = (risks: Risk[]) => {
  const grouped = groupRisksByLevel(risks);
  const total = risks.length;

  return {
    total,
    critical: (grouped[RiskLevel.CRITICAL] || []).length,
    high: (grouped[RiskLevel.HIGH] || []).length,
    moderate: (grouped[RiskLevel.MODERATE] || []).length,
    low: (grouped[RiskLevel.LOW] || []).length,
    distribution: {
      [RiskLevel.CRITICAL]: ((grouped[RiskLevel.CRITICAL] || []).length / total) * 100,
      [RiskLevel.HIGH]: ((grouped[RiskLevel.HIGH] || []).length / total) * 100,
      [RiskLevel.MODERATE]: ((grouped[RiskLevel.MODERATE] || []).length / total) * 100,
      [RiskLevel.LOW]: ((grouped[RiskLevel.LOW] || []).length / total) * 100,
    },
  };
};

// Formate une date pour l'affichage
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Génère un identifiant unique
export const generateId = (): string => {
  return crypto.randomUUID();
};

export async function generatePDF(): Promise<void> {
  const report = document.getElementById('risk-report');
  if (!report) {
    throw new Error('Report element not found');
  }

  try {
    const canvas = await html2canvas(report, {
      scale: 2,
      logging: false,
      useCORS: true
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('ebios-rm-report.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

export async function shareReport(): Promise<void> {
  try {
    if (!navigator.share) {
      throw new Error('Web Share API not supported');
    }

    await navigator.share({
      title: 'Rapport EBIOS RM',
      text: 'Analyse des risques EBIOS RM',
      url: window.location.href,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Web Share API not supported') {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      alert('Le lien a été copié dans le presse-papier !');
    } else {
      console.error('Error sharing report:', error);
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      alert('Le lien a été copié dans le presse-papier !');
    }
  }
}