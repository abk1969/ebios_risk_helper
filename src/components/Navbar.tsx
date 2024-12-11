import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../hooks/useAuth';
import { Sun, Moon, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Tableau de bord', href: '/dashboard' },
    { name: 'Documentation', href: '/documentation' },
  ];

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-primary">
                EBIOS RM
              </Link>
            </div>

            {/* Navigation desktop */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium
                    ${location.pathname === item.href
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground hover:border-b-2 hover:border-border'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            {/* Bouton thème */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Menu utilisateur */}
            {user ? (
              <div className="ml-4 flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
                <button
                  onClick={() => logout()}
                  className="px-3 py-2 text-sm rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-4 px-3 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Connexion
              </Link>
            )}

            {/* Menu mobile */}
            <div className="sm:hidden ml-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation mobile */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium
                    ${location.pathname === item.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}; 