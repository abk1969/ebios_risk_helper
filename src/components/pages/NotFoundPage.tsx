import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">404</h1>
      <p className="mb-4 text-gray-600">Page non trouvée</p>
      <Link 
        to="/" 
        className="text-primary hover:underline transition-colors duration-200"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFoundPage;