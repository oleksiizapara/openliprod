import React from 'react';
import { Link } from 'react-router-dom';

import { Header, Icon } from 'semantic-ui-react';

import Layout from 'layout/Layout';
import Progress from './Progress';

const ProgressHeader = () => (
  <Header as='h2'>
    Progress
  </Header>
);

export default function ProgressPage() {
  return (
    <Layout>
      <ProgressHeader />
      <Progress />
    </Layout>
  );
}
