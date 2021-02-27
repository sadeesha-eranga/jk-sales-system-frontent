import React from 'react';
import Cookies from 'js-cookie';
import SimpleLineIcon from 'react-simple-line-icons';

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <SimpleLineIcon name="chart" style={{marginRight: "10px"}} />
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Stock',
    to: '/stock',
    icon: <SimpleLineIcon name="drawer" style={{marginRight: "10px"}} />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'StockRequest',
    to: '/stockrequest',
    icon: <SimpleLineIcon name="list" style={{marginRight: "10px"}} />
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Customer',
    to: '/customer',
    icon: <SimpleLineIcon name="user" style={{marginRight: "10px"}} />
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Order',
    to: '/order',
    icon: <SimpleLineIcon name="basket" style={{marginRight: "10px"}} />
  },
];

if (Cookies.get('userRole') === 'HEAD_OFFICE_ADMIN') {
  const product = {
    _tag: 'CSidebarNavItem',
    name: 'Product',
    to: '/product',
    icon: <SimpleLineIcon name="tag" style={{marginRight: "10px"}} />
  };
  _nav.splice(1, 0, product);
}

export default _nav
