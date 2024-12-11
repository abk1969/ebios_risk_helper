import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Book, Shield, ExternalLink } from 'lucide-react';

export const DocumentationPage: React.FC = () => {
  const sections = [
    {
      title: "Guide d'utilisation",
      icon: FileText,
      content: [
        "Comment démarrer une analyse",
        "Les 5 ateliers EBIOS RM",
        "Gestion des risques",
        "Export et rapports"
      ]
    },
    {
      title: "Méthode EBIOS Risk Manager",
      icon: Shield,
      content: [
        "Socle de sécurité",
        "Sources de risque",
        "Scénarios stratégiques",
        "Scénarios opérationnels",
        "Traitement du risque"
      ]
    },
    {
      title: "Ressources externes",
      icon: ExternalLink,
      content: [
        "Documentation ANSSI",
        "Guide EBIOS RM",
        "Outils complémentaires",
        "Formations"
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8">Documentation</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-card rounded-lg border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <section.icon className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">{section.title}</h2>
            </div>
            <ul className="space-y-2">
              {section.content.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Book size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-card rounded-lg border border-border">
        <h2 className="text-xl font-semibold mb-4">Besoin d'aide ?</h2>
        <p className="text-muted-foreground">
          Notre équipe est disponible pour vous accompagner dans votre analyse des risques.
          N'hésitez pas à consulter notre documentation détaillée ou à nous contacter directement.
        </p>
      </div>
    </motion.div>
  );
}; 