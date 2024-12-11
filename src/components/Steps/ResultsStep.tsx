import React from 'react';
import type { EbiosFormData } from '../../types';
import { RiskReport } from '../Report/RiskReport';

interface Props {
  data: EbiosFormData;
  onSubmit: (data: Partial<EbiosFormData>) => void;
}

interface CompletenessData {
  stakeholders: boolean;
  businessValues: boolean;
  threats: boolean;
  fearedEvents: boolean;
  scenarios: boolean;
  risks: boolean;
}

const checkDataCompleteness = (data: EbiosFormData) => {
  return {
    stakeholders: data.stakeholders.length > 0,
    businessValues: data.businessValues.length > 0,
    threats: data.threats.length > 0,
    fearedEvents: data.fearedEvents.length > 0,
    scenarios: data.scenarios.length > 0,
    risks: data.risks.length > 0
  };
};

const exportToJson = (data: EbiosFormData) => {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(data, null, 2)
  )}`;
  const link = document.createElement('a');
  link.href = jsonString;
  link.download = 'analyse_risques.json';
  link.click();
};

const StatCard = ({ title, value, colorClass }: {
  title: string;
  value: number;
  colorClass: string;
}) => (
  <div className={`${colorClass} p-4 rounded-lg`}>
    <div className="text-sm">{title}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

const IncompleteDataWarning: React.FC<{ completeness: CompletenessData }> = ({ completeness }) => {
  const getMissingElements = () => {
    const missing = [];
    if (!completeness.stakeholders) missing.push('parties prenantes');
    if (!completeness.businessValues) missing.push('valeurs métier');
    if (!completeness.threats) missing.push('menaces');
    if (!completeness.fearedEvents) missing.push('événements redoutés');
    if (!completeness.scenarios) missing.push('scénarios');
    if (!completeness.risks) missing.push('risques');
    return missing;
  };

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h2 className="text-xl font-semibold text-yellow-800 mb-2">
        Données incomplètes
      </h2>
      <p className="text-yellow-700">
        Veuillez compléter les sections suivantes avant de générer le rapport :
      </p>
      <ul className="list-disc list-inside mt-2 text-yellow-700">
        {getMissingElements().map((element) => (
          <li key={element}>{element}</li>
        ))}
      </ul>
    </div>
  );
};

export const ResultsStep: React.FC<Props> = ({ data }) => {
  const completeness = checkDataCompleteness(data);
  const isDataComplete = Object.values(completeness).every(Boolean);

  if (!isDataComplete) {
    return <IncompleteDataWarning completeness={completeness} />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Résultats de l'analyse</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard 
          title="Parties prenantes" 
          value={data.stakeholders.length} 
          colorClass="bg-blue-50" 
        />
        <StatCard 
          title="Valeurs métier" 
          value={data.businessValues.length} 
          colorClass="bg-green-50" 
        />
        <StatCard 
          title="Menaces" 
          value={data.threats.length} 
          colorClass="bg-yellow-50" 
        />
        <StatCard 
          title="Événements redoutés" 
          value={data.fearedEvents.length} 
          colorClass="bg-orange-50" 
        />
        <StatCard 
          title="Scénarios" 
          value={data.scenarios.length} 
          colorClass="bg-purple-50" 
        />
        <StatCard 
          title="Risques" 
          value={data.risks.length} 
          colorClass="bg-red-50" 
        />
      </div>

      <div className="mt-8">
        <RiskReport data={data} />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Imprimer
        </button>
        <button
          onClick={() => exportToJson(data)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Exporter
        </button>
      </div>
    </div>
  );
};