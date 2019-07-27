import React from 'react';

import Layout from 'layout/Layout';
import { Header } from 'semantic-ui-react';
import Create from './Create';

const CreatePageHeader = () => <Header as='h2'>Add Reading Message</Header>;

const CreatePage = () => {
  return (
    <Layout>
      <CreatePageHeader />
      <Create />
    </Layout>
  );
};

export default CreatePage;
