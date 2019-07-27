import { createLogic } from 'redux-logic';

import { actionTypes as controlActionTypes } from 'control/actions';

import {
  actionTypes as readingActionTypes,
  actions as readingActions,
  formStates
} from 'reading/actions';

import { actions as reviewActions } from 'review/actions';

import {
  actions as speechRecognitionActions,
  commands as speechRecognitionCommands
} from 'speechRecognition/actions';

import { selectors } from 'reading/reducer';

const start = createLogic({
  type: controlActionTypes.START,

  processOptions: {
    dispatchReturn: true
  },

  async process({ getState }, dispatch, done) {
    const formState = selectors.formState(getState());
    const isReading = selectors.isReading(getState());
    if (
      formState !== formStates.LOADED_STATE ||
      (formState === formStates.READING_STATE && isReading)
    ) {
      done();
      return;
    }

    dispatch(readingActions.startReading());

    dispatch(
      speechRecognitionActions.commandUpdated(speechRecognitionCommands.START)
    );

    done();
  }
});

const stop = createLogic({
  type: controlActionTypes.STOP,

  processOptions: {
    dispatchReturn: true
  },

  async process({ getState }, dispatch, done) {
    const formState = selectors.formState(getState());
    const isReading = selectors.isReading(getState());
    if (
      formState !== formStates.READING_STATE ||
      (formState === formStates.READING_STATE && !isReading)
    ) {
      done();
      return;
    }

    dispatch(readingActions.stopReading());

    dispatch(
      speechRecognitionActions.commandUpdated(speechRecognitionCommands.STOP)
    );

    done();
  }
});

const resetReading = createLogic({
  type: controlActionTypes.RESET,

  processOptions: {
    dispatchReturn: true
  },

  async process({ getState }, dispatch, done) {
    const formState = selectors.formState(getState());
    const isReading = selectors.isReading(getState());
    if (
      formState !== formStates.READING_STATE ||
      (formState === formStates.READING_STATE && !isReading)
    ) {
      done();
      return;
    }

    dispatch(
      speechRecognitionActions.commandUpdated(speechRecognitionCommands.RESET)
    );

    done();
  }
});

const forward = createLogic({
  type: controlActionTypes.FORWARD,

  processOptions: {
    dispatchReturn: true
  },

  async process({ getState }, dispatch, done) {
    const formState = selectors.formState(getState());
    const isReading = selectors.isReading(getState());
    if (
      formState !== formStates.READING_STATE ||
      (formState === formStates.READING_STATE && !isReading)
    ) {
      done();
      return;
    }

    dispatch(readingActions.skipWord());

    dispatch(
      speechRecognitionActions.commandUpdated(speechRecognitionCommands.RESET)
    );

    done();
  }
});

const readFinished = createLogic({
  type: readingActionTypes.READ_FINISHED,

  processOptions: {
    dispatchReturn: true
  },

  async process(_, dispatch, done) {
    dispatch(
      speechRecognitionActions.commandUpdated(speechRecognitionCommands.STOP)
    );

    done();
  }
});

const resetReview = createLogic({
  type: controlActionTypes.RESET,

  processOptions: {
    dispatchReturn: true
  },

  async process({ getState }, dispatch, done) {
    const readingMessage = selectors.readingMessage(getState());
    const formState = selectors.formState(getState());
    if (formState !== formStates.REVIEW_STATE) {
      done();
      return;
    }

    dispatch(readingActions.load(readingMessage.id));

    dispatch(reviewActions.toDefault());

    done();
  }
});

export default [start, stop, resetReading, forward, readFinished, resetReview];
