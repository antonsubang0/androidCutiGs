
import HomePage from '../pages/home.jsx';
import AboutPage from '../pages/about.jsx';
import Generate from '../pages/generate.jsx';
import CatalogPage from '../pages/catalog.jsx';
import DaftarCuti from '../pages/daftarcutii.jsx';
import SettingsPage from '../pages/settings.jsx';

import DaftarKarywan from '../pages/daftarkaryawan.jsx';
import KarywanD from '../pages/karyawand.jsx';
import NotFoundPage from '../pages/404.jsx';
import LoginFix from '../pages/LoginFix.jsx';
import HomeFix from '../pages/HomeFix.jsx';

var routes = [
  {
    path: '/',
    component: LoginFix,
    options : {
      clearPreviousHistory : true
    }
  },
  {
    path: '/homefix/',
    component: HomeFix,
    options : {
      clearPreviousHistory : true
    }
  },
  {
    path: '/about/',
    component: AboutPage,
    options : {
      clearPreviousHistory : true
    }
  },
  {
    path: '/generate/',
    component: Generate,
  },
  {
    path: '/catalog/',
    component: CatalogPage,
    options : {
      clearPreviousHistory : true
    }
  },
  {
    path: '/daftarcuti/',
    component: DaftarCuti,
  },
  {
    path: '/settings/',
    component: SettingsPage,
  },

  {
    path: '/tkaryawan/',
    component: DaftarKarywan,
  },
  {
    path: '/karyawan/',
    component: KarywanD,

  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
