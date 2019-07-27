export const key = 'readingSearch';

const SEARCH = `[${key}] SEARCH`;
const CHANGE_PAGE = `[${key}] CHANGE_PAGE`;
const ERROR = `[${key}] ERROR`;
const TO_DEFAULT = `[${key}] TO_DEFAULT`;
const PAGE_UPDATED = `[${key}] PAGE_UPDATED`;

export const actionTypes = {
  SEARCH,
  CHANGE_PAGE,
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

const search = searchText => ({
  type: actionTypes.SEARCH,
  payload: {
    searchText
  }
});

const changePage = pageId => ({
  type: actionTypes.CHANGE_PAGE,
  payload: {
    pageId
  }
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
  search,
  changePage,
  error,
  pagesUpdated,
  toDefault
};
