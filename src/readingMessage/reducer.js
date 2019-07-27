import produce from 'immer';

import { key, actionTypes, formStates } from './actions';

export const selectors = {
  id: state => state[key].id,
  readingMessage: state => state[key].readingMessage,
  formState: state => state[key].formState,
  error: state => state[key].error
};

const initialReadingMessage = () => {
  return {
    id: '',
    title: '',
    content: '',
    access: ''
    // tags: ''
  };
};

const initialState = {
  id: '',
  readingMessage: initialReadingMessage(),
  formState: formStates.DEFAULT_STATE,
  error: ''
};

export default function(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.UPDATED:
        draft.readingMessage = action.payload.readingMessage;
        break;
      case actionTypes.LOAD:
        draft.identifier = action.payload.identifier;
        draft.id = action.payload.id;
        draft.formState = formStates.LOADING_STATE;
        break;
      case actionTypes.CREATE:
        draft.id = '';
        draft.readingMessage = initialReadingMessage();
        draft.formState = formStates.LOADED_STATE;
        break;
      case actionTypes.LOADED:
        draft.formState = formStates.LOADED_STATE;
        break;
      case actionTypes.PUBLISH:
        draft.formState = formStates.LOADING_STATE;
        break;
      case actionTypes.DELETE:
        draft.formState = formStates.LOADING_STATE;
        break;
      case actionTypes.DELETED:
        draft.formState = formStates.DELETED_STATE;
        draft.id = '';
        draft.readingMessage = initialReadingMessage();
        break;
      case actionTypes.PUBLISHED:
        draft.id = action.payload.readingMessage.id;
        draft.readingMessage = action.payload.readingMessage;
        draft.formState = formStates.PUBLISHED_STATE;
        break;
      case actionTypes.ERROR:
        draft.formState = formStates.ERROR_STATE;
        draft.error = action.payload.error;
        break;
      case actionTypes.TO_DEFAULT:
        draft.formState = formStates.DEFAULT_STATE;
        draft.error = '';
        draft.id = '';
        draft.readingMessage = initialReadingMessage();
        break;
      default:
        break;
    }
  });
}
