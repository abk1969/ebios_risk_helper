import React, { useState } from 'react';
import type { ActionPlan, Risk, TreatmentStatus } from '../../types';
import { formatDate } from '../../utils/reportUtils';

interface Props {
  risk: Risk;
  actionPlans: ActionPlan[];
  onActionPlansChange: (actionPlans: ActionPlan[]) => void;
}

export const RiskTreatmentTable: React.FC<Props> = ({
  risk,
  actionPlans,
  onActionPlansChange,
}) => {
  const [newActionPlan, setNewActionPlan] = useState<Omit<ActionPlan, 'id'>>({
    riskId: risk.id,
    action: '',
    description: '',
    responsible: '',
    deadline: '',
    status: 'à traiter',
  });

  const handleAddAction = () => {
    if (!newActionPlan.action) return;

    const actionPlan: ActionPlan = {
      id: crypto.randomUUID(),
      ...newActionPlan,
    };

    onActionPlansChange([...actionPlans, actionPlan]);
    setNewActionPlan({
      riskId: risk.id,
      action: '',
      description: '',
      responsible: '',
      deadline: '',
      status: 'à traiter',
    });
  };

  const handleDeleteAction = (id: string) => {
    onActionPlansChange(actionPlans.filter(ap => ap.id !== id));
  };

  const handleUpdateStatus = (id: string, status: TreatmentStatus) => {
    onActionPlansChange(
      actionPlans.map(ap =>
        ap.id === id ? { ...ap, status } : ap
      )
    );
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Plan de traitement</h3>
      
      {/* Formulaire d'ajout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Action</label>
          <input
            type="text"
            value={newActionPlan.action}
            onChange={e => setNewActionPlan(prev => ({ ...prev, action: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Responsable</label>
          <input
            type="text"
            value={newActionPlan.responsible}
            onChange={e => setNewActionPlan(prev => ({ ...prev, responsible: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={newActionPlan.description}
            onChange={e => setNewActionPlan(prev => ({ ...prev, description: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={2}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Échéance</label>
          <input
            type="date"
            value={newActionPlan.deadline}
            onChange={e => setNewActionPlan(prev => ({ ...prev, deadline: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        onClick={handleAddAction}
        disabled={!newActionPlan.action}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        Ajouter une action
      </button>

      {/* Liste des actions */}
      <div className="mt-4 space-y-4">
        {actionPlans.map(ap => (
          <div
            key={ap.id}
            className="p-4 bg-gray-50 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div className="flex-grow">
              <div className="font-medium">{ap.action}</div>
              {ap.description && (
                <div className="text-sm text-gray-600 mt-1">{ap.description}</div>
              )}
              <div className="text-sm text-gray-500 mt-1">
                Responsable: {ap.responsible}
                {ap.deadline && ` | Échéance: ${formatDate(ap.deadline)}`}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={ap.status}
                onChange={e => handleUpdateStatus(ap.id, e.target.value as TreatmentStatus)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="à traiter">À traiter</option>
                <option value="en cours">En cours</option>
                <option value="traité">Traité</option>
              </select>
              <button
                onClick={() => handleDeleteAction(ap.id)}
                className="text-red-600 hover:text-red-800"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskTreatmentTable;