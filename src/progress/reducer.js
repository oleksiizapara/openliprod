import { key, actionTypes, formStates, CALCULATING_STATE } from './actions';

import produce from 'immer';

export const selectors = {
  formState: state => state[key].formState,
  error: state => state[key].error,
  readingMessageProgresses: state => state[key].readingMessageProgresses,
  isCalculated: state => state[key].isCalculated,
  createdAt: state => state[key].createdAt,
  updatedAt: state => state[key].updatedAt
};

const initialState = {
  formState: formStates.DEFAULT_STATE,
  error: '',
  readingMessageProgresses: [],
  isCalculated: false,
  createdAt: undefined,
  updatedAt: undefined
};

export default function(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.LOAD:
        draft.formState = formStates.LOADING_STATE;
        break;
      case actionTypes.CALCULATE:
        draft.formState = formStates.CALCULATING_STATE;
        break;
      case actionTypes.CALCULATED:
        draft.formState = formStates.LOADED_STATE;
        draft.readingMessageProgresses =
          action.payload.readingMessageProgresses;
        draft.createdAt = action.payload.createdAt;
        draft.updatedAt = action.payload.updatedAt;
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
