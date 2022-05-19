import { lazy } from 'react';

const routes = [
  {
    path: 'dashboard',
    element: lazy(() => import('features/Dashboard')),
    exact: true,
  },
  {
    path: 'users',
    element: lazy(() => import('features/Users')),
    exact: true,
  },
  {
    path: '',
    element: lazy(() => import('features/Main')),
    exact: true,
  },
  {
    path: '/experimentSelect',
    element: lazy(() => import('features/ExperimentSelect')),
    exact: true,
  },
  {
    path: '/experimentStart',
    element: lazy(() => import('features/StartExperiment')),
    exact: true,
  },
];

export default routes;
