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
  {
    path: '/dashboard/activities',
    element: lazy(() => import('features/CRUD/Activity/ActivityList')),
    exact: true,
  },
  {
    path: '/dashboard/activities/insert',
    element: lazy(() => import('features/CRUD/Activity/ActivityInsert')),
    exact: true,
  },
  {
    path: '/dashboard/activities/update',
    element: lazy(() => import('features/CRUD/Activity/ActivityUpdate')),
    exact: true,
  },
  {
    path: '/dashboard/experiments',
    element: lazy(() => import('features/CRUD/Experiment/ExperimentList')),
    exact: true,
  },
  {
    path: '/dashboard/experiments/insert',
    element: lazy(() => import('features/CRUD/Experiment/ExperimentInsert')),
    exact: true,
  },
  {
    path: '/dashboard/experiments/update',
    element: lazy(() => import('features/CRUD/Experiment/ExperimentUpdate')),
    exact: true,
  },
];

export default routes;
