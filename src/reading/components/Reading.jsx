import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';
import { Link } from 'react-router-dom';

import {
  Message,
  Divider,
  Grid,
  Header,
  Icon,
  Container
} from 'semantic-ui-react';

import { actions, formStates } from '../actions';
import { selectors } from '../reducer';
import { selectors as settingsSelectors } from 'settings/reducer';

import Word from './Word';
import Review from 'review/components/Review';
import { Layout } from 'layout/Layout';
import ReadingHistory from './ReadingHistory';
import ReadingControls from 'control/components/Control';
import ChromeSpeechRecognition from 'speechRecognition/ChromeSpeechRecognition';
import { isEditable } from 'reading/common';

const ReadingHeader = () => <Header as='h2'>Reading</Header>;

const Reading = () => {
  const dispatch = useDispatch();
  const { match } = useReactRouter();

  useEffect(() => {
    dispatch(actions.load(match.params.id));
  }, [dispatch, match.params.id]);

  const formState = useSelector(state => selectors.formState(state));
  const error = useSelector(state => selectors.error(state));

  const words = useSelector(state => selectors.words(state));
  const readingMessage = useSelector(state => selectors.readingMessage(state));

  const user = useSelector(state => settingsSelectors.user(state));
  const isShowEditLink = isEditable(readingMessage, user);

  switch (formState) {
    case formStates.LOADING_STATE:
      return <div>Loading ...</div>;
    case formStates.LOADED_STATE:
    case formStates.READING_STATE:
    case formStates.REVIEW_STATE:
      return (
        <>
          <Header as='h4'>
            {isShowEditLink && (
              <Link to={`/reading_edit/${readingMessage.id}`}>
                <Icon name='edit' />
              </Link>
            )}
            {readingMessage.title}
          </Header>
          {words.map(word => (
            <Word key={word.index} word={word} />
          ))}
          <Container textAlign='right'>{`${readingMessage.author.name} ${
            readingMessage.author.familyName
          }, ${new Date(
            readingMessage.createdAt
          ).toLocaleDateString()}`}</Container>
        </>
      );
    default:
      return <Message>{error}</Message>;
  }
};

export default function ReadingLayout() {
  return (
    <Layout>
      <ReadingHeader />
      <Grid stackable divided>
        <Grid.Row>
          <Grid.Column width={12}>
            <Reading />
            <Divider />
            <Review />
          </Grid.Column>
          <Grid.Column width={4}>
            <ChromeSpeechRecognition />
            <ReadingControls />
            <Divider />
            <ReadingHistory />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}
