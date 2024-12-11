import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './layout';
import LandingPage from '../landingpage';
import { EbiosAnalysis } from '../components/EbiosAnalysis';
import { ResultsPage } from '../components/ResultsPage';
import { DocumentationPage } from '../components/DocumentationPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'analysis',
        element: <EbiosAnalysis />,
      },
      {
        path: 'results',
        element: <ResultsPage />,
      },
      {
        path: 'documentation',
        element: <DocumentationPage />,
      },
    ],
  },
], {
  basename: '/ebios_risk_helper',
}); 