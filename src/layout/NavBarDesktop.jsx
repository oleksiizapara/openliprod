import React from 'react';
import PropTypes from 'prop-types';

import { Menu } from 'semantic-ui-react';
import LogoMenuItem from './LogoMenuItem';
import UserProfile from './UserProfile';

export const NavBarDesktop = ({ leftItems, rightItems }) => {
  return (
    <Menu fixed='top' inverted>
      <Menu.Item>
        <LogoMenuItem />
      </Menu.Item>
      {leftItems.map(item => (
        // eslint-disable-next-line react/jsx-key
        <Menu.Item {...item} />
      ))}
      <Menu.Menu position='right'>
        <UserProfile />
      </Menu.Menu>
    </Menu>
  );
};

NavBarDesktop.propTypes = {
  leftItems: PropTypes.array,
  rightItems: PropTypes.any
};
