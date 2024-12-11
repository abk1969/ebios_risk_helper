import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, FileText, Trash2, Edit } from 'lucide-react';
import { useAnalyses } from '../../hooks/useAnalyses';
import { formatDate } from '../../utils/dateUtils';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { analyses, loading, deleteAnalysis } = useAnalyses();

  if (loading) return <LoadingSpinner />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <button
          onClick={() => navigate('/analysis/new')}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
        >
          <Plus size={20} />
          Nouvelle analyse
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {analyses.map((analysis) => (
          <motion.div
            key={analysis.id}
            layout
            className="p-6 bg-card rounded-lg border border-border shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{analysis.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/analysis/${analysis.id}`)}
                  className="p-2 text-muted-foreground hover:text-foreground"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => deleteAnalysis(analysis.id)}
                  className="p-2 text-destructive hover:text-destructive/80"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Créée le {formatDate(analysis.createdAt)}</p>
              <p>Dernière modification: {formatDate(analysis.updatedAt)}</p>
              <p>Étape: {analysis.currentStep}/5</p>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => navigate(`/results/${analysis.id}`)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded hover:bg-secondary/80"
              >
                <FileText size={16} />
                Voir le rapport
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {analyses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucune analyse trouvée</p>
          <button
            onClick={() => navigate('/analysis/new')}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Commencer une analyse
          </button>
        </div>
      )}
    </motion.div>
  );
}; 