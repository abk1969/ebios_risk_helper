import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from './components/ui/card';
import { 
  Cpu, Command, Sparkles, Zap, ShieldCheck, Globe, ArrowRight,
  Mail, Phone
} from 'lucide-react';
import { env } from './config/env';

const features = [
  {
    title: 'Analyse contextuelle',
    description: 'Identifiez et analysez le contexte de votre organisation',
    icon: Globe,
  },
  {
    title: 'Évaluation des risques',
    description: 'Évaluez les risques selon la méthode EBIOS RM',
    icon: ShieldCheck,
  },
  {
    title: 'Aide à la décision',
    description: 'Obtenez des recommandations basées sur l\'IA',
    icon: Sparkles,
  },
  {
    title: 'Rapports détaillés',
    description: 'Générez des rapports professionnels automatiquement',
    icon: Command,
  },
];

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              {env.app.name}
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              {env.app.description}
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <Link
                to="/analysis"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Commencer l'analyse
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Fonctionnalités principales
            </h2>
          </div>

          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="relative p-6">
                <div className="absolute top-4 right-4">
                  <feature.icon className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;