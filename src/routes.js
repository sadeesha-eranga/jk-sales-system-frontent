import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Stock = React.lazy(() => import('./views/stock/Stock'));
const StockRequest = React.lazy(() => import('./views/stockrequest/StockRequest'));
const Customer = React.lazy(() => import('./views/customer/Customer'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/stock', name: 'Stock', component: Stock },
  { path: '/stockrequest', name: 'StockRequest', component: StockRequest },
  { path: '/customer', name: 'Customer', component: Customer },
];

export default routes;
