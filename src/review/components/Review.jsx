import React from 'react';
import { useSelector } from 'react-redux';

import { Header, Table, Message, Loader } from 'semantic-ui-react';

import { formStates } from '../actions';
import { selectors } from '../reducer';

const ReviewHeader = () => <Header as='h2'>Review</Header>;

const Review = () => {
  const formState = useSelector(state => selectors.formState(state));
  const totalWords = useSelector(state => selectors.totalWords(state));
  const readingSpeed = useSelector(state => selectors.readingSpeed(state));
  const recognisedWords = useSelector(state =>
    selectors.recognisedWords(state)
  );
  const notRecognisedWords = useSelector(state =>
    selectors.notRecognisedWords(state)
  );
  const error = useSelector(state => selectors.error(state));

  switch (formState) {
    case formStates.LOADING_STATE:
      return (
        <>
          <ReviewHeader />
          <Loader active inline />
        </>
      );
    case formStates.LOADED_STATE:
      return (
        <>
          <ReviewHeader />
          <Table basic='very' celled collapsing>
            <Table.Body>
              <Table.Row>
                <Table.Cell singleLine>Total Words</Table.Cell>
                <Table.Cell>{`${totalWords} words`}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell singleLine>Reading Speed</Table.Cell>
                <Table.Cell>{`${readingSpeed} words/minute`}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell singleLine>Recognised Words</Table.Cell>
                <Table.Cell>{recognisedWords.join(', ')}</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell singleLine>Not Recognised Words</Table.Cell>
                <Table.Cell>{notRecognisedWords.join(', ')}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </>
      );
    case formStates.ERROR_STATE:
      return (
        <>
          <ReviewHeader />
          <Message error content={error} />
        </>
      );
    default:
      return <></>;
  }
};

export default Review;
