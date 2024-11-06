import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import { element } from 'prop-types';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const SmartNPCsPage = Loadable(lazy(() => import('pages/smart-npcs/sample-page')));
const CreateNFTsPage = Loadable(lazy(() => import('pages/create-nfts/sample-page')));
const ManageNFTsPage = Loadable(lazy(() => import('pages/manage-nfts/sample-page')));
const UploadToIPFSPage = Loadable(lazy(() => import('pages/upload-to-ipfs/sample-page')));
const ManageIPFSPage = Loadable(lazy(() => import('pages/manage-ipfs/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'create-nfts',
      element: <CreateNFTsPage />
    },
    {
      path: 'manage-nfts',
      element: <ManageNFTsPage />
    },
    {
      path: 'smart-npcs',
      element: <SmartNPCsPage />
    },
    {
      path: 'upload-to-ipfs',
      element: <UploadToIPFSPage />
    },
    {
      path: "manage-ipfs",
      element: <ManageIPFSPage />
    }
  ]
};

export default MainRoutes;
