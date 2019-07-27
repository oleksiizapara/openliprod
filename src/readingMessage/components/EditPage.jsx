import React from 'react';

import Layout from 'layout/Layout';
import { Header } from 'semantic-ui-react';
import Edit from './Edit';

const EditPageHeader = () => <Header as='h2'>Edit Reading Message</Header>;

const EditPage = () => {
  return (
    <Layout>
      <EditPageHeader />
      <Edit />
    </Layout>
  );
};

export default EditPage;
