export const key = 'progress';

const ERROR = `[${key}] ERROR`;
const TO_DEFAULT = `[${key}] TO_DEFAULT`;
const LOAD = `[${key}] LOAD`;
const LOADED = `[${key}] LOADED`;
const CALCULATE = `[${key}] CALCULATE`;
const CALCULATED = `[${key}] CALCULATED`;

export const actionTypes = {
  LOAD,
  LOADED,
  ERROR,
  CALCULATE,
  CALCULATED,
  TO_DEFAULT
};

export const DEFAULT_STATE = 'DEFAULT_STATE';
export const LOADED_STATE = 'LOADED_STATE';
export const LOADING_STATE = 'LOADING_STATE';
export const ERROR_STATE = 'ERROR_STATE';
export const CALCULATING_STATE = 'CALCULATING_STATE';

export const formStates = {
  DEFAULT_STATE,
  LOADING_STATE,
  LOADED_STATE,
  ERROR_STATE,
  CALCULATING_STATE
};

const load = () => ({
  type: actionTypes.LOAD,
  payload: {}
});

const loaded = progress => ({
  type: actionTypes.LOADED,
  payload: {
    progress
  }
});

const error = error => ({
  type: actionTypes.ERROR,
  payload: {
    error
  }
});

const toDefault = () => ({
  type: actionTypes.TO_DEFAULT,
  payload: {}
});

const calculate = () => ({
  type: actionTypes.CALCULATE,
  payload: {}
});

const calculated = progress => ({
  type: actionTypes.CALCULATED,
  payload: progress
});

export const actions = {
  load,
  loaded,
  error,
  toDefault,
  calculate,
  calculated
};
