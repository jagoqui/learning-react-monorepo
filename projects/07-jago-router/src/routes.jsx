import { lazy } from 'react';
import HomePage from './components/pages/Home';
import SearchPage from './components/pages/Search';

const AboutPage = lazy(() => import('./components/pages/About'));

export const routes = [
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/about',
    Component: AboutPage,
  },
  {
    path: '/:lang/about',
    Component: AboutPage,
  },
  {
    path: '/twitter/:username',
    Component: ({ routeParams }) => <h1>Twitter {routeParams.username}</h1>,
  },
  {
    path: '/search/:query',
    Component: SearchPage,
  },
];
