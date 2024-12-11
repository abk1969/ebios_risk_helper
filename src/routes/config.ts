import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';
import React from 'react';

const LandingPage = lazy(() => import('../landingpage'));
const EbiosAnalysis = lazy(() => import('../components/EbiosAnalysis').then(m => ({ default: m.EbiosAnalysis })));
const ResultsPage = lazy(() => import('../components/ResultsPage').then(m => ({ default: m.ResultsPage })));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: React.createElement(LandingPage),
  },
  {
    path: '/analysis',
    element: React.createElement(EbiosAnalysis),
  },
  {
    path: '/results',
    element: React.createElement(ResultsPage),
  },
]; 