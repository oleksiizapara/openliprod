import produce from 'immer';

import { key, actionTypes } from './actions';

export const selectors = {
  isLoaded: state => state[key].isLoaded,
  user: state => state[key].user
};

const initialState = {
  isLoaded: false,
  user: undefined
};

export default function(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.USER_UPDATED:
        draft.isLoaded = true;
        draft.user = action.payload.user;
        break;
      case actionTypes.USER_UNREGISTERED:
        draft.isLoaded = true;
        draft.user = null;
        break;
      case actionTypes.USER_FETCH:
        draft.isLoaded = false;
        draft.user = null;
        break;
      default:
        break;
    }
  });
}
