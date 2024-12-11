export const routes = {
  home: '/',
  analysis: '/analysis',
  results: '/results',
  documentation: '/documentation',
  guide: '/docs/guide.pdf',
  ebiosDoc: 'https://www.ssi.gouv.fr/guide/la-methode-ebios-risk-manager-le-guide/',
} as const;

export type Routes = typeof routes; 