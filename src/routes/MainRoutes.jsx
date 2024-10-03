import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/error/404')));

// Sayfalar burada
const DashboardPage = Loadable(lazy(() => import('pages/Dashboard/DashboardPage')));
const Dozaj2 = Loadable(lazy(() => import('pages/Dozaj2/Dozaj2')));
const Hammadde = Loadable(lazy(() => import('pages/Hammadde/Hammadde')));
const Mamul = Loadable(lazy(() => import('pages/Mamul/Mamul')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'dashboard',
          element: <DashboardPage />
        }
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'mamul-silolari',
          element: <Dozaj2 />
        }
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'hammadde',
          element: <Hammadde />
        }
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'mamul',
          element: <Mamul />
        }
      ]
    },
    {
      path: '*',
      element: <MaintenanceError />
    }
  ]
};

export default MainRoutes;
