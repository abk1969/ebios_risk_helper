import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EBIOS Risk Helper. Tous droits réservés.
          </div>
          <div className="mt-4 md:mt-0">
            <a 
              href="https://www.ssi.gouv.fr/entreprise/management-du-risque/la-methode-ebios-risk-manager/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Méthode EBIOS Risk Manager
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}; 