import React from 'react';
import Layout from './Layout';

import { Header, Container } from 'semantic-ui-react';

const Home = () => {
  return (
    <React.Fragment>
      <Header as='h2'>Home</Header>
      <Container>
        <p>
          OpenLi is an open-source project which helps people all over the
          world, improving their pronunciation skills. It is free to use. Each
          person can practice on his/her own as he/she wishes. There are
          different scenarios which are implemented in the current version. The
          person can create reading messages on his or her own or use shared
          reading paragraphs. By looking at the progress page, a person can
          review his or her result and
        </p>
        <p>
          On the other hand, the teachers can use this program by creating a
          plan for a student and flexible change it for the person's needs. It
          can increase the learning curve and reduce the time which a person
          used for learning the right pronunciation.
        </p>
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
