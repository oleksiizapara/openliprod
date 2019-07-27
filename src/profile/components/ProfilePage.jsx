import React from 'react';
import { Header } from 'semantic-ui-react';

import Layout from 'layout/Layout';
import Profile from './Profile';

const ProfileHeader = () => <Header as='h2'>Profile</Header>;

const ProfilePage = () => {
  return (
    <Layout>
      <ProfileHeader />
      <Profile />
    </Layout>
  );
};

export default ProfilePage;
