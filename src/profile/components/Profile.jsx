import React from 'react';
import { useSelector } from 'react-redux';

import { Message, Divider, Header } from 'semantic-ui-react';

import { formStates } from '../actions';
import { selectors } from '../reducer';
import { selectors as settingsSelectors } from 'settings/reducer';

import ChangePassword from './ChangePassword';
import UpdateProfileFields from './UpdateProfileFields';
import UpdateProfileCode from './UpdateProfileCode';

const Profile = () => {
  const formState = useSelector(state => selectors.formState(state));

  const error = useSelector(state => selectors.error(state));

  const user = useSelector(state => settingsSelectors.user(state));

  return (
    <>
      <Header as='h4'>Change Password</Header>
      <ChangePassword />
      <Divider />
      <Header as='h4'>Update Profile</Header>
      <UpdateProfileFields />
      {user && !user.emailVerified && (
        <>
          <Divider />
          <Header as='h4'>Verify Email</Header>
          <UpdateProfileCode />
        </>
      )}
      {formState == formStates.ERROR_STATE && error && (
        <Message error content={error} />
      )}
    </>
  );
};

export default Profile;
