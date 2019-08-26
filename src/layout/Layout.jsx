import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { NavBar } from './NavBar';

export const defaultLeftItems = [
  { as: Link, content: 'Home', key: 'home', to: '/' },
  { as: Link, content: 'Reading', key: 'reading', to: '/reading' },
  { as: Link, content: 'Progress', key: 'progress', to: '/progress' },
  {
    as: Link,
    content: 'Settings',
    key: 'settings',
    to: '/settings'
  }
];

export const Layout = ({ leftItems, children }) => {
  return (
    <NavBar leftItems={!leftItems ? defaultLeftItems : leftItems}>
      {children}
    </NavBar>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.any,
  leftItems: PropTypes.any
};
