import React from 'react';
import { motion } from 'framer-motion';
import { useAnalysis } from '../context/AnalysisContext';
import { FileText, Download } from 'lucide-react';

export const ResultsPage: React.FC = () => {
  const { analysisData } = useAnalysis();

  const handleExport = () => {
    if (!analysisData) return;
    try {
      console.log('Export des résultats...', analysisData);
      // Ajouter la logique d'export ici
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
    }
  };

  if (!analysisData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-8"
      >
        <p className="text-muted-foreground text-center">Aucune analyse disponible</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Résultats de l'analyse</h1>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
        >
          <Download size={20} />
          Exporter
        </button>
      </div>

      <div className="grid gap-6">
        <section className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FileText size={24} className="text-primary" />
            Synthèse
          </h2>
          {/* Contenu à implémenter */}
          <p className="text-muted-foreground">
            {analysisData ? 'Analyse disponible' : 'Aucune analyse disponible'}
          </p>
        </section>
      </div>
    </motion.div>
  );
}; 