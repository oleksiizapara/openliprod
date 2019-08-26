import React from 'react';
import Layout from './Layout';

import {
  Header,
  Container
} from 'semantic-ui-react';

const Home = () => {
  return (
  <React.Fragment>
    <Header as='h2'>
      Home
    </Header>
    <Container>
      OpenLI web application is helping with English words pronunciations.
    </Container>
  </React.Fragment>
  );
};

export default function HomeLayout() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}
