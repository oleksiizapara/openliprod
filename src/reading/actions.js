export const key = 'reading';

const LOAD = `[${key}] LOAD`;
const LOADED = `[${key}] LOADED`;
const READ_STARTED = `[${key}] READ_STARTED`;
const READ_STOPPED = `[${key}] READ_STOPPED`;
const READ_FINISHED = `[${key}] READ_FINISHED`;
const ERROR = `[${key}] ERROR`;
const UPDATE_READING_MESSAGE = `[${key}] UPDATE_READING_MESSAGE`;
const UPDATE_WORDS = `[${key}] UPDATE_WORDS`;
const UPDATE_TRANSCRIPT = `[${key}] UPDATE_TRANSCRIPT`;
const SKIP_WORD = `[${key}] SKIP_WORD`;

export const actionTypes = {
  LOAD,
  LOADED,
  READ_STARTED,
  READ_STOPPED,
  READ_FINISHED,
  ERROR,
  UPDATE_READING_MESSAGE,
  UPDATE_WORDS,
  UPDATE_TRANSCRIPT,
  SKIP_WORD
};

const DEFAULT_STATE = 'DEFAULT_STATE';
const LOADING_STATE = 'LOADING_STATE';
const LOADED_STATE = 'LOADED_STATE';
const READING_STATE = 'READING_STATE';
const REVIEW_STATE = 'REVIEW_STATE';
const ERROR_STATE = 'ERROR_STATE';

export const formStates = {
  DEFAULT_STATE,
  LOADING_STATE,
  LOADED_STATE,
  READING_STATE,
  REVIEW_STATE,
  ERROR_STATE
};

const final = 'final';
const interim = 'interim';

export const transcriptTypes = {
  final,
  interim
};

const load = id => ({
  type: actionTypes.LOAD,
  payload: {
    id
  }
});

const loaded = () => ({
  type: actionTypes.LOADED,
  payload: {}
});

const startReading = () => ({
  type: actionTypes.READ_STARTED,
  payload: {}
});

const stopReading = () => ({
  type: actionTypes.READ_STOPPED,
  payload: {}
});

const finishReading = () => ({
  type: actionTypes.READ_FINISHED,
  payload: {}
});

const error = error => ({
  type: actionTypes.ERROR,
  payload: {
    error
  }
});

const updateReadingMessage = readingMessage => ({
  type: actionTypes.UPDATE_READING_MESSAGE,
  payload: {
    readingMessage
  }
});

const updateWords = words => ({
  type: actionTypes.UPDATE_WORDS,
  payload: {
    words
  }
});

const updateTranscript = transcript => ({
  type: actionTypes.UPDATE_TRANSCRIPT,
  payload: {
    transcript
  }
});

const skipWord = () => ({
  type: actionTypes.SKIP_WORD,
  payload: {}
});

export const actions = {
  load,
  loaded,
  startReading,
  stopReading,
  finishReading,
  updateTranscript,
  error,
  updateReadingMessage,
  updateWords,
  skipWord
};
