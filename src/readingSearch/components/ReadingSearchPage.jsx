import React from 'react';
import { Link } from 'react-router-dom';

import { Header, Icon } from 'semantic-ui-react';

import Layout from 'layout/Layout';
import ReadingSearch from './ReadingSearch';

const ReadingSearchHeader = () => (
  <Header as='h2'>
    <Link to='/reading_add'>
      <Icon name='add' link />
    </Link>
    Reading Search
  </Header>
);

export default function ReadingSearchPage() {
  return (
    <Layout>
      <ReadingSearchHeader />
      <ReadingSearch />
    </Layout>
  );
}
