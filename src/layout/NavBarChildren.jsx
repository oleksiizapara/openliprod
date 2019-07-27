import React from 'react';
import PropTypes from 'prop-types';

import { Container } from 'semantic-ui-react';

export const NavBarChildren = ({ children }) => (
  <Container style={{ marginTop: '5em' }}>{children}</Container>
);

NavBarChildren.propTypes = {
  children: PropTypes.any
};
