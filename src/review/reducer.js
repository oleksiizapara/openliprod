import { key, actionTypes, formStates } from './actions';

import produce from 'immer';

export const selectors = {
  formState: state => state[key].formState,
  error: state => state[key].error,

  words: state => state[key].words,
  readingMessage: state => state[key].readingMessage,

  totalWords: state => state[key].totalWords,
  readingSpeed: state => state[key].readingSpeed,
  recognisedWords: state => state[key].recognisedWords,
  notRecognisedWords: state => state[key].notRecognisedWords,
  uniqueWords: state => state[key].uniqueWords,
  recognisedWordsPercent: state => state[key].recognisedWordsPercent,
  time: state => state[key].time
};

const initialState = {
  formState: formStates.DEFAULT_STATE,
  error: '',

  words: [],
  readingMessageId: '',
  totalWords: undefined,
  readingSpeed: undefined,
  recognisedWords: [],
  notRecognisedWords: [],
  uniqueWords: [],
  recognisedWordsPercent: undefined,
  time: undefined
};

export default function(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.LOAD:
        draft.formState = formStates.LOADING_STATE;
        draft.words = action.payload.words;
        draft.readingMessage = action.payload.readingMessage;
        break;
      case actionTypes.LOADED:
        draft.formState = formStates.LOADED_STATE;
        break;
      case actionTypes.CALCULATED:
        draft.totalWords = action.payload.totalWords;
        draft.readingSpeed = action.payload.readingSpeed;
        draft.recognisedWords = action.payload.recognisedWords;
        draft.notRecognisedWords = action.payload.notRecognisedWords;
        draft.uniqueWords = action.payload.uniqueWords;
        draft.recognisedWordsPercent = action.payload.recognisedWordsPercent;
        draft.time = action.payload.time;
        break;
      case actionTypes.ERROR:
        draft.error = action.payload.error;
        draft.formState = formStates.ERROR_STATE;
        break;
      case actionTypes.TO_DEFAULT:
        draft.formState = formStates.DEFAULT_STATE;
        draft.words = [];
        draft.readingMessage = undefined;
        draft.totalWords = undefined;
        draft.readingSpeed = undefined;
        draft.recognisedWords = [];
        draft.notRecognisedWords = [];
        draft.uniqueWords = [];
        draft.recognisedWordsPercent = undefined;
        draft.time = undefined;
        break;
      default:
        break;
    }
  });
}
