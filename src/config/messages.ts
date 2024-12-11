export const messages = {
  success: {
    save: 'Progression sauvegardée avec succès',
    load: 'Données chargées avec succès',
    export: 'Rapport exporté avec succès',
  },
  error: {
    save: 'Erreur lors de la sauvegarde',
    load: 'Erreur lors du chargement des données',
    export: 'Erreur lors de l\'export',
    validation: {
      required: 'Ce champ est requis',
      minLength: (min: number) => `Minimum ${min} caractères requis`,
      maxLength: (max: number) => `Maximum ${max} caractères autorisés`,
      min: (min: number) => `Minimum ${min} élément(s) requis`,
      max: (max: number) => `Maximum ${max} élément(s) autorisés`,
      minValue: (min: number) => `Valeur minimum : ${min}`,
      maxValue: (max: number) => `Valeur maximum : ${max}`,
      invalidFormat: 'Format invalide',
    },
  },
} as const;

export type Messages = typeof messages; 