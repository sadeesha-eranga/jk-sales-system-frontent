import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Stock = React.lazy(() => import('./views/stock/Stock'));
const StockRequest = React.lazy(() => import('./views/stockrequest/StockRequest'));
const Customer = React.lazy(() => import('./views/customer/Customer'));
const Order = React.lazy(() => import('./views/order/Order'));
const Product = React.lazy(() => import('./views/product/Product'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/stock', name: 'Stock', component: Stock },
  { path: '/stockrequest', name: 'StockRequest', component: StockRequest },
  { path: '/customer', name: 'Customer', component: Customer },
  { path: '/order', name: 'Order', component: Order },
  { path: '/product', name: 'Product', component: Product },
];

export default routes;
