export const key = 'review';

const LOAD = `[${key}] LOAD`;
const LOADED = `[${key}] LOADED`;
const CALCULATED = `[${key}] CALCULATED`;
const ERROR = `[${key}] ERROR`;
const TO_DEFAULT = `[${key}] TO_DEFAULT`;
const UPLOAD = `[${key}] UPLOAD`;
const UPLOADED = `[${key}] UPLOADED`;

export const actionTypes = {
  LOAD,
  LOADED,
  CALCULATED,
  ERROR,
  TO_DEFAULT,
  UPLOAD,
  UPLOADED
};

export const DEFAULT_STATE = 'DEFAULT_STATE';
export const LOADED_STATE = 'LOADED_STATE';
export const LOADING_STATE = 'LOADING_STATE';
export const READING_STATE = 'READING_STATE';
export const ERROR_STATE = 'ERROR_STATE';

export const formStates = {
  DEFAULT_STATE,
  LOADING_STATE,
  LOADED_STATE,
  READING_STATE,
  ERROR_STATE
};

const load = ({ words, readingMessage }) => ({
  type: actionTypes.LOAD,
  payload: {
    words,
    readingMessage
  }
});

const loaded = () => ({
  type: actionTypes.LOADED,
  payload: {}
});

const error = error => ({
  type: actionTypes.ERROR,
  payload: {
    error
  }
});

const calculated = data => ({
  type: actionTypes.CALCULATED,
  payload: data
});

const toDefault = () => ({
  type: actionTypes.TO_DEFAULT,
  payload: {}
});

const upload = () => ({
  type: actionTypes.UPLOAD,
  payload: {}
});

const uploaded = isUploaded => ({
  type: actionTypes.UPLOADED,
  payload: {
    isUploaded
  }
});

export const actions = {
  load,
  loaded,
  calculated,
  error,
  toDefault,
  upload,
  uploaded
};
