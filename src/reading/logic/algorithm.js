import { createLogic } from 'redux-logic';
import produce from 'immer';
import Enumerable from 'linq';

import { actionTypes, actions, formStates } from '../actions';

import { selectors } from '../reducer';

import { actionTypes as speechRecognitionActionTypes } from 'speechRecognition/actions';

import * as queryHelper from 'common/queryHelper';
import { errorMessages } from 'common/errorMessages';
import { date } from 'common/date';

import {
  splitTextOnWords,
  recogniseWords,
  validateRecognisedWords,
  calculateNotRecognisedWords,
  updateTranscript,
  finalizeWords,
  calculateLastRecognisedWord,
  calculateSkipWord,
  isFinishedReading,
  filterRecognisedWordIndexes
} from '../common';
import logger from 'common/logger';

export const loadWords = createLogic({
  type: actionTypes.LOAD,

  processOptions: {
    dispatchReturn: true
  },

  async process({ action }, dispatch, done) {
    const { id } = action.payload;
    const readingMessage = await queryHelper.getReadingMessage(id);

    if (!readingMessage) {
      dispatch(actions.error(errorMessages.readingMessageWasNotFound));
      done();
      return;
    }

    dispatch(actions.updateReadingMessage(readingMessage));

    const words = splitTextOnWords(readingMessage.content);
    dispatch(actions.updateWords(words));
    dispatch(actions.loaded());
    done();
  }
});

export const recognitionFinalWords = createLogic({
  type: speechRecognitionActionTypes.FINAL_UPDATED,

  processOptions: {
    dispatchReturn: true
  },

  process({ getState, action }, dispatch, done) {
    const formState = selectors.formState(getState());
    if (formState !== formStates.READING_STATE) {
      done();
      return;
    }

    const finalTranscript = action.payload.finalTranscript;
    const finalTranscriptWords = splitTextOnWords(finalTranscript);
    const words = selectors.words(getState());

    const lastRecognisedWord = calculateLastRecognisedWord(words);

    const testedWords = Enumerable.from(words)
      .skip(lastRecognisedWord ? lastRecognisedWord.index : 0)
      .where(x => !x.isFinalRecognised)
      .take(Math.max(finalTranscriptWords.length + 1, 3))
      .toArray();

    const rawRecognisedWordIndexes = recogniseWords(
      testedWords,
      finalTranscriptWords
    );

    const filteredRawRecognisedWordIndexes = filterRecognisedWordIndexes(
      rawRecognisedWordIndexes,
      finalTranscriptWords
    );

    const recognisedWordIndexes = validateRecognisedWords(
      filteredRawRecognisedWordIndexes
    );

    const normalizedRecognisedWordIndexes = Enumerable.from(
      recognisedWordIndexes
    )
      .select((x, index) => {
        if (x === -1) {
          return x;
        }
        return index + (lastRecognisedWord ? lastRecognisedWord.index + 1 : 0);
      })
      .where(x => x !== -1)
      .toArray();

    const notRecognisedWordIndexes = calculateNotRecognisedWords(
      testedWords,
      recognisedWordIndexes
    );

    logger.debug({
      finalTranscriptWords,
      words,
      lastRecognisedWord,
      testedWords,
      rawRecognisedWordIndexes,
      normalizedRecognisedWordIndexes
    });

    const updatedWords = produce(words, draft => {
      normalizedRecognisedWordIndexes.forEach(x => {
        draft[x].isFinalRecognised = true;

        if (!('time' in draft[x])) {
          draft[x].time = date.getUTCtime();
        }
      });

      notRecognisedWordIndexes.forEach(x => {
        if (!('isNotRecognisedCount' in draft[x])) {
          draft[x].isNotRecognisedCount = 1;
        } else {
          draft[x].isNotRecognisedCount++;
        }
      });
    });

    const finalizedWords = finalizeWords(updatedWords);

    if (words !== finalizedWords) {
      dispatch(actions.updateWords(finalizedWords));
    }

    const onlyUpdatedWords = Enumerable.from(normalizedRecognisedWordIndexes)
      .select(index => words[index])
      .toArray();
    const transcript = selectors.transcript(getState());

    const updatedTranscript = updateTranscript(
      action,
      transcript,
      lastRecognisedWord,
      onlyUpdatedWords
    );

    logger.debug(updatedTranscript);

    if (updatedTranscript) {
      dispatch(actions.updateTranscript(updatedTranscript));
    }

    const latestWord = Enumerable.from(updatedWords).lastOrDefault();
    if (latestWord && latestWord.isFinalRecognised) {
      dispatch(actions.finishReading());
    }

    done();
  }
});

export const recognitionInterimWords = createLogic({
  type: speechRecognitionActionTypes.INTERIM_UPDATED,

  processOptions: {
    dispatchReturn: true
  },

  process({ getState, action }, dispatch, done) {
    const formState = selectors.formState(getState());
    if (formState !== formStates.READING_STATE) {
      done();
      return;
    }

    const interimTranscript = action.payload.interimTranscript;
    const interimTranscriptWords = splitTextOnWords(interimTranscript);
    const words = selectors.words(getState());

    const lastRecognisedWord = calculateLastRecognisedWord(words);
    const testedWords = Enumerable.from(words)
      .skip(lastRecognisedWord ? lastRecognisedWord.index : 0)
      .where(x => !x.isFinalRecognised)
      .take(Math.max(interimTranscriptWords.length + 1, 3))
      .toArray();

    const rawRecognisedWordIndexes = recogniseWords(
      testedWords,
      interimTranscriptWords
    );

    const filteredRawRecognisedWordIndexes = filterRecognisedWordIndexes(
      rawRecognisedWordIndexes,
      interimTranscriptWords
    );

    const recognisedWordIndexes = validateRecognisedWords(
      filteredRawRecognisedWordIndexes
    );

    const normalizedRecognisedWordIndexes = Enumerable.from(
      recognisedWordIndexes
    )
      .select((x, index) => {
        if (x === -1) {
          return x;
        }
        return index + (lastRecognisedWord ? lastRecognisedWord.index + 1 : 0);
      })
      .where(x => x !== -1)
      .toArray();

    logger.debug({
      interimTranscriptWords,
      words,
      lastRecognisedWord,
      testedWords,
      rawRecognisedWordIndexes,
      normalizedRecognisedWordIndexes,
      filteredRawRecognisedWordIndexes
    });

    const updatedWords = produce(words, draft => {
      normalizedRecognisedWordIndexes.forEach(x => {
        if (!draft[x].isInterimRecognised) {
          draft[x].isInterimRecognised = true;

          if (!('time' in draft[x])) {
            draft[x].time = date.getUTCtime();
          }
        }
      });
    });

    const finalizedWords = isFinishedReading(updatedWords)
      ? finalizeWords(updatedWords)
      : updatedWords;

    if (words !== finalizedWords) {
      dispatch(actions.updateWords(finalizedWords));
    }

    const onlyUpdatedWords = Enumerable.from(normalizedRecognisedWordIndexes)
      .select(index => words[index])
      .toArray();
    const transcript = selectors.transcript(getState());

    const updatedTranscript = updateTranscript(
      action,
      transcript,
      lastRecognisedWord,
      onlyUpdatedWords
    );

    logger.debug(updatedTranscript);

    if (updatedTranscript) {
      dispatch(actions.updateTranscript(updatedTranscript));
    }

    if (isFinishedReading(finalizedWords)) {
      dispatch(actions.finishReading());
    }

    done();
  }
});

export const skipWord = createLogic({
  type: actionTypes.SKIP_WORD,

  processOptions: {
    dispatchReturn: true
  },

  process({ getState }, dispatch, done) {
    const formState = selectors.formState(getState());
    if (formState !== formStates.READING_STATE) {
      done();
      return;
    }

    const words = selectors.words(getState());

    const finalizedWords = finalizeWords(words);

    const updatedWords = calculateSkipWord(finalizedWords);

    if (updatedWords !== words) {
      dispatch(actions.updateWords(updatedWords));
    }

    done();
  }
});

export default [
  loadWords,
  recognitionFinalWords,
  recognitionInterimWords,
  skipWord
];
