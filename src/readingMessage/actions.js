export const key = 'readingMessage';

const TO_DEFAULT = `[${key}] TO_DEFAULT`;
const CREATE = `[${key}] CREATE`;
const LOAD = `[${key}] LOAD`;
const LOADED = `[${key}] LOADED`;
const UPDATED = `[${key}] UPDATED`;
const PUBLISH = `[${key}] PUBLISH`;
const PUBLISHED = `[${key}] PUBLISHED`;
const ERROR = `[${key}] ERROR`;
const DELETE = `[${key}] DELETE`;
const DELETED = `[${key}] DELETED`;

export const actionTypes = {
  TO_DEFAULT,
  CREATE,
  LOAD,
  LOADED,
  UPDATED,
  PUBLISH,
  PUBLISHED,
  ERROR,
  DELETE,
  DELETED
};

const DEFAULT_STATE = 'DEFAULT_STATE';
const LOADING_STATE = 'LOADING_STATE';
const LOADED_STATE = 'LOADED_STATE';
const PUBLISHED_STATE = 'PUBLISHED_STATE';
const ERROR_STATE = 'ERROR_STATE';
const DELETED_STATE = 'DELETED_STATE';

export const formStates = {
  DEFAULT_STATE,
  LOADING_STATE,
  LOADED_STATE,
  PUBLISHED_STATE,
  ERROR_STATE,
  DELETED_STATE
};

const toDefault = () => ({
  type: actionTypes.LOAD,
  payload: {}
});

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

const create = () => ({
  type: actionTypes.CREATE,
  payload: {}
});

const updated = readingMessage => ({
  type: actionTypes.UPDATED,
  payload: {
    readingMessage
  }
});

const publish = readingMessage => ({
  type: actionTypes.PUBLISH,
  payload: {
    readingMessage
  }
});

const published = readingMessage => ({
  type: actionTypes.PUBLISHED,
  payload: {
    readingMessage
  }
});

const error = error => ({
  type: actionTypes.ERROR,
  payload: {
    error
  }
});

const deleteReadingMessage = id => ({
  type: actionTypes.DELETE,
  payload: {
    id
  }
});

const deletedReadingMessage = () => ({
  type: actionTypes.DELETED,
  payload: {}
});

export const actions = {
  toDefault,
  create,
  load,
  loaded,
  updated,
  publish,
  published,
  error,
  delete: deleteReadingMessage,
  deleted: deletedReadingMessage
};
