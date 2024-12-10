import React from 'react';
import type { EbiosFormData } from '../../types';
import { RiskReport } from '../Report/RiskReport';

interface Props {
  data: EbiosFormData;
  onSubmit: (data: Partial<EbiosFormData>) => void;
}

export const ResultsStep: React.FC<Props> = ({ data }) => {
  // Vérifier que toutes les données nécessaires sont présentes
  const isDataComplete = 
    data.stakeholders.length > 0 &&
    data.businessValues.length > 0 &&
    data.threats.length > 0 &&
    data.fearedEvents.length > 0 &&
    data.scenarios.length > 0 &&
    data.risks.length > 0;

  if (!isDataComplete) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-400 rounded">
        <h2 className="text-xl font-bold text-yellow-800 mb-4">Données incomplètes</h2>
        <p className="text-yellow-700">
          Certaines étapes de l'analyse sont incomplètes. Veuillez vérifier que vous avez :
        </p>
        <ul className="list-disc ml-6 mt-2 text-yellow-700">
          {data.stakeholders.length === 0 && <li>Ajouté des parties prenantes</li>}
          {data.businessValues.length === 0 && <li>Défini des valeurs métier</li>}
          {data.threats.length === 0 && <li>Identifié des menaces</li>}
          {data.fearedEvents.length === 0 && <li>Défini des événements redoutés</li>}
          {data.scenarios.length === 0 && <li>Créé des scénarios</li>}
          {data.risks.length === 0 && <li>Évalué les risques</li>}
        </ul>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Résultats de l'analyse</h2>
      
      {/* Résumé des données collectées */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm text-blue-600">Parties prenantes</div>
          <div className="text-2xl font-bold">{data.stakeholders.length}</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-sm text-green-600">Valeurs métier</div>
          <div className="text-2xl font-bold">{data.businessValues.length}</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-sm text-yellow-600">Menaces</div>
          <div className="text-2xl font-bold">{data.threats.length}</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="text-sm text-orange-600">Événements redoutés</div>
          <div className="text-2xl font-bold">{data.fearedEvents.length}</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-sm text-purple-600">Scénarios</div>
          <div className="text-2xl font-bold">{data.scenarios.length}</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-sm text-red-600">Risques</div>
          <div className="text-2xl font-bold">{data.risks.length}</div>
        </div>
      </div>

      {/* Rapport détaillé */}
      <div className="mt-8">
        <RiskReport data={data} />
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Imprimer
        </button>
        <button
          onClick={() => {
            const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
              JSON.stringify(data, null, 2)
            )}`;
            const link = document.createElement('a');
            link.href = jsonString;
            link.download = 'analyse_risques.json';
            link.click();
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Exporter
        </button>
      </div>
    </div>
  );
};