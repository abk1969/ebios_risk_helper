import React from 'react';
import { Card } from './ui/card';
import { FileText, Book, ExternalLink } from 'lucide-react';

export const DocumentationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Documentation</h1>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-start">
              <FileText className="h-6 w-6 text-blue-500 mr-4" />
              <div>
                <h2 className="text-xl font-semibold mb-2">Guide d'utilisation</h2>
                <p className="text-gray-600 mb-4">
                  Apprenez à utiliser l'application étape par étape pour réaliser votre analyse des risques.
                </p>
                <a
                  href="/docs/guide.pdf"
                  className="text-blue-600 hover:text-blue-700 flex items-center"
                >
                  Consulter le guide
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start">
              <Book className="h-6 w-6 text-blue-500 mr-4" />
              <div>
                <h2 className="text-xl font-semibold mb-2">Méthode EBIOS RM</h2>
                <p className="text-gray-600 mb-4">
                  Documentation officielle de la méthode EBIOS Risk Manager par l'ANSSI.
                </p>
                <a
                  href="https://www.ssi.gouv.fr/guide/la-methode-ebios-risk-manager-le-guide/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 flex items-center"
                >
                  Accéder à la documentation
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}; 