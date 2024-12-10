import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Theme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
    light: string;
    dark: string;
    radar: string[]; // Palette de couleurs pour le graphique radar
    heatmap: string[]; // Palette de couleurs pour la heatmap
    pie: string[]; // Palette de couleurs pour le graphique pie
    // ... autres palettes de couleurs
  };
}

interface ThemeContextProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const defaultTheme: Theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#6b7280',
    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
    info: '#06b6d4',
    light: '#f3f4f6',
    dark: '#1f2937',
    radar: ['#800080', '#008080', '#808000'],
    heatmap: [
      '#e8e8e8', // 0 risque
      '#ccece6', // Faible
      '#99d8c9',
      '#66c2a4',
      '#41ae76',
      '#238b45', // Vraisemblance 2
      '#fed976', // Modéré
      '#feb24c',
      '#fd8d3c',
      '#fc4e2a',
      '#e31a1c', // Vraisemblance 3
      '#fc4e2a', // Élevé
      '#e31a1c',
      '#bd0026',
      '#800026',
      '#800026', // Vraisemblance 4
    ],
    pie: ['rgb(34, 197, 94)', 'rgb(234, 179, 8)', 'rgb(249, 115, 22)', 'rgb(239, 68, 68)'],
  },
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme doit être utilisé dans un ThemeProvider');
  }
  return context;
};