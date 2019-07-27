import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import LogoMenuItem from './LogoMenuItem';
import UserProfile from './UserProfile';

export const NavBarMobile = ({
  children,
  leftItems,
  onPusherClick,
  onToggle,
  visible
}) => {
  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        vertical
        visible={visible}
      >
        <Menu.Menu position='right'>
          {leftItems.map(item => (
            // eslint-disable-next-line react/jsx-key
            <Menu.Item {...item} />
          ))}
        </Menu.Menu>
      </Sidebar>
      <Sidebar.Pusher
        dimmed={visible}
        onClick={onPusherClick}
        style={{ minHeight: '100vh' }}
      >
        <Menu fixed='top' inverted>
          <Menu.Item>
            <LogoMenuItem />
          </Menu.Item>
          <Menu.Item onClick={onToggle}>
            <Icon name='sidebar' />
          </Menu.Item>
          <Menu.Menu position='right'>
            <UserProfile />
          </Menu.Menu>
        </Menu>
        {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

NavBarMobile.propTypes = {
  children: PropTypes.object,
  leftItems: PropTypes.array,
  onPusherClick: PropTypes.func,
  onToggle: PropTypes.func,
  rightItems: PropTypes.any,
  visible: PropTypes.bool
};
