import { key, actionTypes, formStates } from './actions';

import produce from 'immer';

export const selectors = {
  readingMessage: state => state[key].readingMessage,
  formState: state => state[key].formState,
  words: state => state[key].words,
  error: state => state[key].error,
  transcript: state => state[key].transcript,
  isReading: state => state[key].isReading,
  command: state => state[key].command
};

const initTranscriptState = () => {
  return {
    groups: [],
    transcript: undefined,
    lastRecognisedWord: undefined
  };
};

const initialState = {
  readingMessage: undefined,
  words: [],
  formState: formStates.DEFAULT_STATE,
  error: '',
  transcript: initTranscriptState(),
  isReading: false
};

export default function(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.LOAD:
        draft.formState = formStates.LOADING_STATE;
        break;
      case actionTypes.UPDATE_READING_MESSAGE:
        draft.readingMessage = action.payload.readingMessage;
        break;
      case actionTypes.UPDATE_WORDS:
        draft.words = action.payload.words;
        break;
      case actionTypes.LOADED:
        draft.formState = formStates.LOADED_STATE;
        draft.transcript = initTranscriptState();
        break;
      case actionTypes.READ_STARTED:
        draft.formState = formStates.READING_STATE;
        draft.isReading = true;
        break;
      case actionTypes.READ_STOPPED:
        draft.formState = formStates.LOADED_STATE;
        draft.isReading = false;
        break;
      case actionTypes.READ_FINISHED:
        draft.formState = formStates.REVIEW_STATE;
        draft.isReading = false;
        break;
      case actionTypes.UPDATE_TRANSCRIPT:
        draft.transcript = action.payload.transcript;
        break;
      case actionTypes.ERROR:
        draft.error = action.payload.error;
        draft.formState = formStates.ERROR_STATE;
        break;
      default:
        break;
    }
  });
}
