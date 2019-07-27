export const key = 'readingList';

const LOAD = `[${key}] LOAD`;
const LOADED = `[${key}] LOADED`;
const ERROR = `[${key}] ERROR`;
const TO_DEFAULT = `[${key}] TO_DEFAULT`;
const PAGE_UPDATED = `[${key}] PAGE_UPDATED`;

export const actionTypes = {
  LOAD,
  LOADED,
  ERROR,
  TO_DEFAULT,
  PAGE_UPDATED
};

export const DEFAULT_STATE = 'DEFAULT_STATE';
export const LOADED_STATE = 'LOADED_STATE';
export const LOADING_STATE = 'LOADING_STATE';
export const ERROR_STATE = 'ERROR_STATE';

export const formStates = {
  DEFAULT_STATE,
  LOADING_STATE,
  LOADED_STATE,
  ERROR_STATE
};

const load = pageId => ({
  type: actionTypes.LOAD,
  payload: {
    pageId
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

const pagesUpdated = ({ pages, messages, activePage, totalPages }) => ({
  type: actionTypes.PAGE_UPDATED,
  payload: {
    pages,
    messages,
    activePage,
    totalPages
  }
});

const toDefault = () => ({
  type: actionTypes.TO_DEFAULT,
  payload: {}
});

export const actions = {
  load,
  loaded,
  error,
  pagesUpdated,
  toDefault
};
