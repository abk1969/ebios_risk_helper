import React, { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const LandingPage = lazy(() => import('../landingpage'));
const EbiosAnalysis = lazy(() => import('../components/EbiosAnalysis').then(m => ({ default: m.EbiosAnalysis })));
const ResultsPage = lazy(() => import('../components/ResultsPage').then(m => ({ default: m.ResultsPage })));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/analysis',
    element: <EbiosAnalysis />,
  },
  {
    path: '/results',
    element: <ResultsPage />,
  },
]; 