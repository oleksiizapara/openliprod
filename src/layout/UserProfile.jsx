import React from 'react';
import useReactRouter from 'use-react-router';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Dropdown } from 'semantic-ui-react';

import { selectors } from 'settings/reducer';
import { Menu } from 'semantic-ui-react';
import { Auth } from 'aws-amplify';
import logger from 'common/logger';

export const UserProfile = () => {
  const { history } = useReactRouter();

  const isLoaded = useSelector(state => selectors.isLoaded(state));
  const user = useSelector(state => selectors.user(state));

  return !isLoaded ? (
    <></>
  ) : !user ? (
    <>
      <Menu.Item as={Link} content='Sign In' key='sign_in' to='/sign_in' />
      <Menu.Item as={Link} content='Sign Up' key='sign_up' to='/sign_up' />
    </>
  ) : (
    <Dropdown item icon='user' direction='left'>
      <Dropdown.Menu>
        <Dropdown.Item
          as={Link}
          content='Your List'
          key='reading_list'
          to='/reading_list'
        />
        <Dropdown.Item
          as={Link}
          content='Your Profile'
          key='profile'
          to='/profile'
        />
        <Dropdown.Item
          onClick={async () => {
            try {
              await Auth.signOut();
              history.push('/');
            } catch (exception) {
              logger.debug(exception);
            }
          }}
          content='Sign Out'
        />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserProfile;
