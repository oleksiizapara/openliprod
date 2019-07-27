import Enumerable from 'linq';

import { createLogic } from 'redux-logic';

import { actionTypes, actions } from './actions';
import { selectors } from './reducer';

import { actionTypes as readingActionTypes } from 'reading/actions';
import { selectors as readingSelectors } from 'reading/reducer';
import { selectors as settingsSelectors } from 'settings/reducer';

import {
  calculateTotalWordCount,
  calculateReadingSpeed,
  calculateRecognisedWords,
  calculateNotRecognisedWords,
  calculateUniqueWords,
  calculateRecognisedWordsPercent,
  calculateTime
} from './common';

import {
  createReadingMessageHistory,
  updateProgress
} from 'common/mutationHelper';

export const calculate = createLogic({
  type: actionTypes.LOAD,

  processOptions: {
    dispatchReturn: true
  },

  async process({ action }, dispatch, done) {
    const { words } = action.payload;

    const totalWords = calculateTotalWordCount(words);
    const readingSpeed = calculateReadingSpeed(words);
    const recognisedWords = calculateRecognisedWords(words);
    const notRecognisedWords = calculateNotRecognisedWords(words);
    const uniqueWords = calculateUniqueWords(words);
    const time = calculateTime(words);
    const recognisedWordsPercent = calculateRecognisedWordsPercent(words);

    dispatch(
      actions.calculated({
        totalWords,
        readingSpeed,
        recognisedWords,
        notRecognisedWords,
        uniqueWords,
        time,
        recognisedWordsPercent
      })
    );

    dispatch(actions.loaded());
    dispatch(actions.upload());
    done();
  }
});

export const onReadingFinished = createLogic({
  type: readingActionTypes.READ_FINISHED,

  processOptions: {
    dispatchReturn: true
  },

  async process({ getState }, dispatch, done) {
    const words = readingSelectors.words(getState());
    const readingMessage = readingSelectors.readingMessage(getState());

    dispatch(actions.load({ words, readingMessage }));

    done();
  }
});

export const onUpload = createLogic({
  type: actionTypes.UPLOAD,

  processOptions: {
    dispatchReturn: true
  },
  latest: true,
  async process({ getState }, dispatch, done) {
    const words = selectors.words(getState());
    const readingMessage = selectors.readingMessage(getState());

    const readingSpeed = selectors.readingSpeed(getState());
    const totalWords = selectors.totalWords(getState());
    const uniqueWords = selectors.uniqueWords(getState());
    const recognisedWords = selectors.recognisedWords(getState());
    const notRecognisedWords = selectors.notRecognisedWords(getState());
    const recognisedWordsPercent = selectors.recognisedWordsPercent(getState());
    const time = selectors.time(getState());

    createReadingMessageHistory({
      readingMessageId: readingMessage.id,
      title: readingMessage.title,

      words,
      readingSpeed,
      totalWords,
      uniqueWords,
      recognisedWords,
      notRecognisedWords,
      recognisedWordsPercent,
      time,
      isCalculated: false
    });

    dispatch(actions.uploaded(true));

    done();
  }
});

export default [calculate, onReadingFinished, onUpload];
