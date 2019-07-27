import { key, actionTypes, formStates } from './actions';

import produce from 'immer';

export const selectors = {
  formState: state => state[key].formState,
  error: state => state[key].error
};

const initialState = {
  formState: formStates.DEFAULT_STATE,
  error: ''
};

export default function(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.LOADED:
        draft.formState = formStates.LOADED_STATE;
        break;
      case actionTypes.CHANGE_PASSWORD:
        draft.formState = formStates.LOADING_STATE;
        draft.error = '';
        break;
      case actionTypes.UPDATE_PROFILE:
        draft.formState = formStates.LOADING_STATE;
        draft.error = '';
        break;
      case actionTypes.UPDATE_PROFILE_CODE:
        draft.formState = formStates.LOADING_STATE;
        draft.error = '';
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
