import produce from 'immer';

import { key, actionTypes } from './actions';

export const selectors = {
  listening: state => state[key].listening,
  command: state => state[key].command
};

const initialState = {
  listening: false,
  command: undefined
};

export default function(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.LISTENING_UPDATED:
        draft.listening = action.payload.listening;
        break;
      case actionTypes.COMMAND_UPDATED:
        draft.command = { name: action.payload.command };
        break;
      default:
        break;
    }
  });
}
