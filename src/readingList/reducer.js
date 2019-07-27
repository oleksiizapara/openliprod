import { key, actionTypes, formStates } from './actions';

import produce from 'immer';
import { defaultReadingListPageSize } from 'common/constants';

export const selectors = {
  formState: state => state[key].formState,
  error: state => state[key].error,
  messages: state => state[key].messages,
  activePage: state => state[key].activePage,
  totalPages: state => state[key].totalPages,
  pageSize: state => state[key].pageSize,
  pages: state => state[key].pages
};

const initialState = {
  formState: formStates.DEFAULT_STATE,
  error: '',
  messages: [],
  pages: [],
  activePage: undefined,
  totalPages: undefined,
  pageSize: defaultReadingListPageSize
};

export default function(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.LOAD:
        draft.formState = formStates.LOADING_STATE;
        break;
      case actionTypes.LOADED:
        draft.formState = formStates.LOADED_STATE;
        break;
      case actionTypes.ERROR:
        draft.error = action.payload.error;
        draft.formState = formStates.ERROR_STATE;
        break;
      case actionTypes.PAGE_UPDATED:
        draft.formState = formStates.LOADED_STATE;
        draft.pages = action.payload.pages;
        draft.messages = action.payload.messages;
        draft.activePage = action.payload.activePage;
        draft.totalPages = action.payload.totalPages;
        break;
      case actionTypes.TO_DEFAULT:
        draft.formState = formStates.DEFAULT_STATE;
        draft.pages = [];
        draft.messages = [];
        draft.activePage = undefined;
        draft.totalPages = undefined;
        break;
      default:
        break;
    }
  });
}
