import React from 'react';
import Layout from 'layout/Layout';
import { Message } from 'semantic-ui-react';
import { errorMessages } from 'common/errorMessages';

const GenericNotFound = () => {
  return (
    <Layout>
      <Message error content={errorMessages.genericNotFoundMessage} />
    </Layout>
  );
};

export default GenericNotFound;
