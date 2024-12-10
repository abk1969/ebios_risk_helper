import React, { useState, useRef } from 'react';
import {
  Risk,
  Scenario,
  BusinessValue,
  Threat,
  FearedEvent,
} from '../../types';
import { RiskRadarChart } from './charts/RiskRadarChart';
import { RiskHeatMap } from './charts/RiskHeatMap';
import { RiskDistributionPie } from './charts/RiskDistributionPie';
import { useTheme } from '../../context/ThemeContext';
import RiskTreatmentTable from './RiskTreatmentTable';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface RiskReportProps {
  risks: Risk[];
  scenarios: Scenario[];
  businessValues: BusinessValue[];
  threats: Threat[];
  fearedEvents: FearedEvent[];
}

interface ActionPlan {
  id: string;
  riskId: string; // ID du risque associé
  action: string;
  description: string;
  responsible: string;
  deadline: string;
}

export function RiskReport({
  risks,
  scenarios,
  businessValues,
  threats,
  fearedEvents,
}: RiskReportProps) {
  const [actionPlans, setActionPlans] = useState<ActionPlan[]>([]);
  const { theme } = useTheme();

  // Refs pour les sections du rapport
  const summaryRef = useRef<HTMLDivElement>(null);
  const riskProfileRef = useRef<HTMLDivElement>(null);
  const riskMatrixRef = useRef<HTMLDivElement>(null);
  const detailedAnalysisRef = useRef<HTMLDivElement>(null);
  const treatmentStrategyRef = useRef<HTMLDivElement>(null);

  // Tableau des sections pour la navigation
  const navigationSections = [
    { title: 'Résumé exécutif', ref: summaryRef },
    { title: 'Profil des risques', ref: riskProfileRef },
    { title: 'Matrice des risques', ref: riskMatrixRef },
    { title: 'Analyse détaillée', ref: detailedAnalysisRef },
    { title: 'Stratégie de traitement', ref: treatmentStrategyRef },
  ];

  // Fonction pour calculer le niveau de risque
  const calculateRiskLevel = (likelihoodLevel: number, gravityLevel: number) => {
    return likelihoodLevel * gravityLevel;
  };

  // Fonction pour récupérer le nom d'une valeur métier à partir de son ID
  const getBusinessValueName = (businessValueId: string) => {
    return (
      businessValues.find(bv => bv.id === businessValueId)?.name ||
      'Valeur métier inconnue'
    );
  };

  // Fonction pour récupérer le nom d'une menace à partir de son ID
  const getThreatName = (threatId: string) => {
    return threats.find(t => t.id === threatId)?.name || 'Menace inconnue';
  };

  // Fonction pour récupérer le nom du scénario associé à un risque
  const getScenarioNameForRisk = (riskId: string) => {
    const risk = risks.find(r => r.id === riskId);
    if (!risk) return 'Scénario inconnu';
    const scenario = scenarios.find(s => s.id === risk.scenarioId);
    return scenario?.name || 'Scénario inconnu';
  };

  // formater les données pour le graphique à barres
  const formatBarChartData = () => {
    return scenarios.map(scenario => {
      const scenarioRisks = risks.filter(
        risk => risk.scenarioId === scenario.id,
      );
      const likelihood =
        scenarioRisks.reduce((sum, risk) => sum + risk.likelihoodLevel, 0) /
        (scenarioRisks.length || 1);
      const gravity =
        scenarioRisks.reduce((sum, risk) => sum + risk.gravityLevel, 0) /
        (scenarioRisks.length || 1);
      return {
        name: scenario.name.substring(0, 15),
        Vraisemblance: likelihood,
        Gravité: gravity,
      };
    });
  };
  const barChartData = formatBarChartData();

  // Fonction pour mettre à jour le plan d'action
  const handleActionPlansChange = (updatedActionPlans: ActionPlan[]) => {
    setActionPlans(updatedActionPlans);
  };

  const getRiskLevelLabel = (level: number) => {
    if (level >= 1 && level <= 4) {
      return (
        <span className="bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
          Faible
        </span>
      );
    } else if (level > 4 && level <= 8) {
      return (
        <span className="bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
          Modéré
        </span>
      );
    } else if (level > 8 && level <= 12) {
      return (
        <span className="bg-orange-100 text-orange-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
          Élevé
        </span>
      );
    } else if (level > 12 && level <= 16) {
      return (
        <span className="bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
          Critique
        </span>
      );
    } else {
      return (
        <span className="bg-gray-100 text-gray-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
          Inconnu
        </span>
      );
    }
  };

  return (
    <div id="risk-report" className="p-6 bg-gray-100">
      <ReportNavigation sections={navigationSections} />
      <h1 className="text-3xl font-bold mb-8">
        Rapport d'analyse des risques EBIOS RM
      </h1>

      <section className="mb-12" ref={summaryRef}>
        <h2 className="text-2xl font-semibold mb-6">Résumé exécutif</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-blue-50 p-6 rounded-xl shadow">
            <p className="text-sm text-blue-600 mb-1">Valeurs métier</p>
            <p className="text-3xl font-bold text-blue-900">
              {businessValues.length}
            </p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-xl shadow">
            <p className="text-sm text-indigo-600 mb-1">Menaces</p>
            <p className="text-3xl font-bold text-indigo-900">
              {threats.length}
            </p>
          </div>
          <div className="bg-purple-50 p-6 rounded-xl shadow">
            <p className="text-sm text-purple-600 mb-1">Scénarios</p>
            <p className="text-3xl font-bold text-purple-900">
              {scenarios.length}
            </p>
          </div>
          <div className="bg-pink-50 p-6 rounded-xl shadow">
            <p className="text-sm text-pink-600 mb-1">Risques évalués</p>
            <p className="text-3xl font-bold text-pink-900">
              {risks.length}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12" ref={riskProfileRef}>
        <h2 className="text-2xl font-semibold mb-6">Profil des risques</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow h-[400px]">
            <h3 className="text-lg font-medium mb-4">
              Distribution des risques
            </h3>
            <RiskRadarChart scenarios={scenarios} risks={risks} />
          </div>

          <div className="bg-white p-6 rounded-xl shadow h-[400px]">
            <h3 className="text-lg font-medium mb-4">
              Distribution par niveau
            </h3>
            <RiskDistributionPie risks={risks} />
          </div>
          <div className="bg-white p-6 rounded-xl shadow col-span-2">
            <h3 className="text-lg font-medium mb-4">
              Vraisemblance et gravité par scénario
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="Vraisemblance"
                  fill={theme.colors.radar[0]}
                  fillOpacity={0.6}
                />
                <Bar
                  dataKey="Gravité"
                  fill={theme.colors.radar[1]}
                  fillOpacity={0.6}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="mb-12" ref={riskMatrixRef}>
        <h2 className="text-2xl font-semibold mb-6">Matrice des risques</h2>
        <div className="bg-white p-6 rounded-xl shadow h-[500px]">
          <RiskHeatMap risks={risks} />
        </div>
      </section>

      <section ref={detailedAnalysisRef}>
        <h2 className="text-2xl font-semibold mb-6">Analyse détaillée</h2>
        <div className="space-y-6">
          {scenarios.map(scenario => {
            const scenarioRisks = risks.filter(
              r => r.scenarioId === scenario.id,
            );
            const relatedBusinessValues = businessValues.filter(bv =>
              fearedEvents
                .filter(fe => fe.id === scenario.fearedEventId)
                .some(fe => fe.businessValueId === bv.id),
            );
            const relatedThreats = threats.filter(
              t => t.id === scenario.threatId,
            );

            return (
              <div key={scenario.id} className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-xl font-semibold mb-4">{scenario.name}</h3>
                <p className="text-gray-600 mb-4">{scenario.description}</p>

                {scenarioRisks.map(risk => (
                  <div key={risk.id} className="mb-4">
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          Vraisemblance
                        </h4>
                        <div className="flex items-center">
                          <div
                            className="h-2 w-full rounded-full bg-gray-200"
                            style={{
                              background: `linear-gradient(to right, ${
                                theme.colors.radar[0]
                              } ${
                                risk.likelihoodLevel * 25
                              }%, #e5e7eb ${risk.likelihoodLevel * 25}%)`,
                            }}
                          />
                          <span className="ml-2 font-medium">
                            {risk.likelihoodLevel}/4
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          Gravité
                        </h4>
                        <div className="flex items-center">
                          <div
                            className="h-2 w-full rounded-full bg-gray-200"
                            style={{
                              background: `linear-gradient(to right, ${
                                theme.colors.radar[1]
                              } ${
                                risk.gravityLevel * 25
                              }%, #e5e7eb ${risk.gravityLevel * 25}%)`,
                            }}
                          />
                          <span className="ml-2 font-medium">
                            {risk.gravityLevel}/4
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          Niveau de risque
                        </h4>
                        <span
                          className={`text-lg font-bold ${
                            calculateRiskLevel(
                              risk.likelihoodLevel,
                              risk.gravityLevel,
                            ) <= 4
                              ? 'text-green-600'
                              : calculateRiskLevel(
                                  risk.likelihoodLevel,
                                  risk.gravityLevel,
                                ) <= 8
                              ? 'text-yellow-600'
                              : calculateRiskLevel(
                                  risk.likelihoodLevel,
                                  risk.gravityLevel,
                                ) <= 12
                              ? 'text-orange-600'
                              : 'text-red-600'
                          }`}
                        >
                          {calculateRiskLevel(
                            risk.likelihoodLevel,
                            risk.gravityLevel,
                          )}
                        </span>
                        {getRiskLevelLabel(
                          calculateRiskLevel(
                            risk.likelihoodLevel,
                            risk.gravityLevel,
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-6 mt-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                      Valeurs métier concernées
                    </h4>
                    <ul className="list-disc list-inside text-gray-600">
                      {relatedBusinessValues.map(bv => (
                        <li key={bv.id}>{bv.name}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                      Menaces associées
                    </h4>
                    <ul className="list-disc list-inside text-gray-600">
                      {relatedThreats.map(threat => (
                        <li key={threat.id}>{threat.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-12 bg-white p-6 rounded-xl shadow" ref={treatmentStrategyRef}>
        <h3 className="text-2xl font-semibold mb-6">
          Stratégie de traitement du risque
        </h3>
        <p className="text-gray-600 mb-4">
          Définissez ici les actions à mettre en place pour traiter les risques
          identifiés (réduction, transfert, acceptation, etc.).
        </p>
        <RiskTreatmentTable
          risks={risks}
          scenarios={scenarios}
          actionPlans={actionPlans}
          onActionPlansChange={setActionPlans}
        />
      </section>
    </div>
  );
};