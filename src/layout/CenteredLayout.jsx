import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header } from 'semantic-ui-react';

const CenteredLayout = ({ children }) => {
  return (
    <div className='centered-form'>
      <style>
        {`
        body > div,
        body > div > div,
        body > div > div > div.centered-form {
          height: 100%;
        }
      `}
      </style>
      <Grid
        textAlign='center'
        style={{ height: '100%' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' textAlign='center'>
            OpenLI
          </Header>

          {children}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default CenteredLayout;

CenteredLayout.propTypes = {
  children: PropTypes.any
};
