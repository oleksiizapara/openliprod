import React from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { Header, Segment, Container, Icon } from 'semantic-ui-react';
import readingMessageAccess from 'common/readingMessageAccess';

const ReadingMessage = ({ message }) => {
  return (
    <>
      <Header attached='top' as='h3'>
        {message.access == readingMessageAccess.PRIVATE && (
          <Icon name='protect' />
        )}
        {message.access == readingMessageAccess.PUBLIC && <Icon name='globe' />}

        <Header.Content>
          <Link to={`/reading/${message.id}`}> {message.title}</Link>
        </Header.Content>
      </Header>

      <Segment attached>
        <Container>{message.content}</Container>
        <Container textAlign='right'>{`${message.author.name} ${
          message.author.familyName
        }, ${new Date(message.createdAt).toLocaleDateString()}`}</Container>
      </Segment>
    </>
  );
};

ReadingMessage.propTypes = {
  message: PropTypes.object
};

export default ReadingMessage;
