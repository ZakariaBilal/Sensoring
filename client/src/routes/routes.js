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
  {
    path: '/dashboard/sensors',
    element: lazy(() => import('features/CRUD/Sensor/SensorList')),
    exact: true,
  },
  {
    path: '/dashboard/sensors/insert',
    element: lazy(() => import('features/CRUD/Sensor/SensorInsert')),
    exact: true,
  },
  {
    path: '/dashboard/sensors/update',
    element: lazy(() => import('features/CRUD/Sensor/SensorUpdate')),
    exact: true,
  },
  {
    path: '/dashboard/activityTypes',
    element: lazy(() => import('features/CRUD/ActivityType/ActivityTypeList')),
    exact: true,
  },
  {
    path: '/dashboard/activityTypes/insert',
    element: lazy(() => import('features/CRUD/ActivityType/ActivityTypeInsert')),
    exact: true,
  },
  {
    path: '/dashboard/activityTypes/update',
    element: lazy(() => import('features/CRUD/ActivityType/ActivityTypeUpdate')),
    exact: true,
  },
];

export default routes;
