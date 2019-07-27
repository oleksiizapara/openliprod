export const key = 'control';

export const START = `[${key}] START`;
export const STOP = `[${key}] STOP`;
export const REPEAT = `[${key}] REPEAT`;
export const RESET = `[${key}] RESET`;
export const BACKWARD = `[${key}] BACKWARD`;
export const FAST_BACKWARD = `[${key}] FAST_BACKWARD`;
export const FORWARD = `[${key}] FORWARD`;
export const FAST_FORWARD = `[${key}] FAST_FORWARD`;
export const ERROR = `[${key}] ERROR`;

export const actionTypes = {
  START,
  STOP,
  REPEAT,
  RESET,
  BACKWARD,
  FORWARD,
  FAST_BACKWARD,
  FAST_FORWARD,
  ERROR
};

export const DEFAULT_STATE = 'DEFAULT_STATE';
export const ERROR_STATE = 'ERROR_STATE';

export const formStates = {
  DEFAULT_STATE,
  ERROR_STATE
};

export const start = () => ({
  type: actionTypes.START,
  payload: {}
});

export const stop = () => ({
  type: actionTypes.STOP,
  payload: {}
});

export const reset = () => ({
  type: actionTypes.RESET,
  payload: {}
});

export const repeat = () => ({
  type: actionTypes.REPEAT,
  payload: {}
});

export const backward = () => ({
  type: actionTypes.BACKWARD,
  payload: {}
});

export const fastBackward = () => ({
  type: actionTypes.FAST_BACKWARD,
  payload: {}
});

export const forward = () => ({
  type: actionTypes.FORWARD,
  payload: {}
});

export const fastForward = () => ({
  type: actionTypes.FAST_FORWARD,
  payload: {}
});

export const error = error => ({
  type: actionTypes.ERROR,
  payload: {
    error
  }
});

export const actions = {
  start,
  stop,
  reset,
  error,
  backward,
  fastBackward,
  forward,
  fastForward
};
