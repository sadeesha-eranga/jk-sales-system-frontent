import React from 'react';
import CIcon from '@coreui/icons-react';
// import Cookies from 'js-cookie';

let _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-grid" customClasses="c-sidebar-nav-icon"/>
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Stock',
    to: '/stock',
    icon: <CIcon name="cil-spreadsheet" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'StockRequest',
    to: '/stockrequest',
    icon: <CIcon name="cil-list" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Customer',
    to: '/customer',
    icon: <CIcon name="cil-user" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Order',
    to: '/order',
    icon: <CIcon name="cil-task" customClasses="c-sidebar-nav-icon"/>,
  },
];

// if (Cookies.get('userRole') === 'HEAD_OFFICE_ADMIN') {
//   _nav = _nav.filter(path => path.name !== 'StockRequest');
// }

export default _nav
