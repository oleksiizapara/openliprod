import React from 'react';
import { Link } from 'react-router-dom';

import Layout from 'layout/Layout';
import ReadingList from './ReadingList';
import { Header, Icon } from 'semantic-ui-react';

const ReadingHeader = () => (
  <Header as='h2'>
    <Link to='/reading_add'>
      <Icon name='add' link />
    </Link>
    Reading List
  </Header>
);

const ReadingListPage = () => (
  <Layout>
    <ReadingHeader />
    <ReadingList />
  </Layout>
);

export default ReadingListPage;
