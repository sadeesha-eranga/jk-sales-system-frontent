import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Stock = React.lazy(() => import('./views/stock/Stock'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/stock', name: 'Stock', component: Stock },
];

export default routes;
