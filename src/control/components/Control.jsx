import React from 'react';
import { useSelector } from 'react-redux';
import { Header } from 'semantic-ui-react';
import { Message } from 'semantic-ui-react';

import { selectors } from '../reducer';
import { selectors as readingSelectors } from 'reading/reducer';
import { formStates } from '../actions';
import { formStates as readingFormStates } from 'reading/actions';
import RecordingButton from './RecordingButton';
import RepeatButton from './RepeatButton';
import BackwardButton from './BackwardButton';
import ForwardButton from './ForwardButton';
import FastForwardButton from './FastForwardButton';
import FastBackwardButton from './FastBackwardButton';

const ReadingControlsHeader = () => <Header as='h4'>Reading Controls</Header>;

const Control = () => {
  const error = useSelector(state => selectors.error(state));
  const formState = useSelector(state => selectors.formState(state));

  const readingFormState = useSelector(state =>
    readingSelectors.formState(state)
  );

  return (
    <>
      <ReadingControlsHeader />
      {formState === formStates.ERROR_STATE && error ? (
        <Message error content={error} />
      ) : readingFormState === readingFormStates.LOADED_STATE ||
        readingFormState === readingFormStates.READING_STATE ? (
        <>
          <RecordingButton />
          <RepeatButton />
          <FastBackwardButton />
          <BackwardButton />
          <ForwardButton />
          <FastForwardButton />
        </>
      ) : readingFormState === readingFormStates.REVIEW_STATE ? (
        <>
          <RepeatButton />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Control;
