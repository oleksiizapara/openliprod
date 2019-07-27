import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Enumerable from 'linq';

import { Message, Form, Icon, Container } from 'semantic-ui-react';

import { formStates, actions } from '../actions';
import { selectors } from '../reducer';
import ProgressReadingMessage from './ProgressReadingMessage';

const Progress = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.load());
  }, [dispatch]);

  const formState = useSelector(state => selectors.formState(state));
  const error = useSelector(state => selectors.error(state));
  const readingMessageProgresses = useSelector(state =>
    selectors.readingMessageProgresses(state)
  );

  switch (formState) {
    case formStates.LOADING_STATE:
      return <div>Loading ...</div>;
    case formStates.LOADED_STATE:
    case formStates.READING_STATE:
    case formStates.REVIEW_STATE:
      return (
        <>
          {Enumerable.from(readingMessageProgresses)
            .orderByDescending(x => x.time)
            .toArray()
            .map(readingMessageProgress => (
              <ProgressReadingMessage
                key={readingMessageProgress.orderId}
                readingMessageProgress={readingMessageProgress}
              />
            ))}
        </>
      );
    default:
      return <Message>{error}</Message>;
  }
};

export default Progress;
