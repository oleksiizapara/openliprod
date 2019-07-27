import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Responsive } from 'semantic-ui-react';

import { NavBarMobile } from './NavBarMobile';
import { NavBarChildren } from './NavBarChildren';
import { NavBarDesktop } from './NavBarDesktop';

export const NavBar = ({ leftItems, rightItems, children, rightIcons }) => {
  const [visible, setVisible] = useState(false);

  const handlePusher = () => {
    if (visible) setVisible(false);
  };

  const handleToggle = () => setVisible(!visible);

  return (
    <div>
      <Responsive {...Responsive.onlyMobile}>
        <NavBarMobile
          leftItems={leftItems}
          onPusherClick={handlePusher}
          onToggle={handleToggle}
          rightItems={rightItems}
          visible={visible}
          rightIcons={rightIcons}
        >
          <NavBarChildren>{children}</NavBarChildren>
        </NavBarMobile>
      </Responsive>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <NavBarDesktop
          leftItems={leftItems}
          rightItems={rightItems}
          rightIcons={rightIcons}
        />
        <NavBarChildren>{children}</NavBarChildren>
      </Responsive>
    </div>
  );
};

NavBar.propTypes = {
  leftItems: PropTypes.array,
  rightItems: PropTypes.array,
  children: PropTypes.any,
  rightIcons: PropTypes.object
};
