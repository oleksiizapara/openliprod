export const key = 'profile';

const ERROR = `[${key}] ERROR`;
const LOADED = `[${key}] LOADED`;
const UPDATE_PROFILE = `[${key}] UPDATE_PROFILE`;
const UPDATE_PROFILE_CODE = `[${key}] UPDATE_PROFILE_CONFIRM`;
const CHANGE_PASSWORD = `[${key}] CHANGE_PASSWORD`;

export const actionTypes = {
  LOADED,
  ERROR,
  UPDATE_PROFILE,
  CHANGE_PASSWORD,
  UPDATE_PROFILE_CODE
};

const DEFAULT_STATE = 'DEFAULT_STATE';
const LOADED_STATE = 'LOADED_STATE';
const LOADING_STATE = 'LOADING_STATE';
const ERROR_STATE = 'ERROR_STATE';

export const formStates = {
  DEFAULT_STATE,
  LOADING_STATE,
  LOADED_STATE,
  ERROR_STATE
};

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

const changePassword = values => ({
  type: actionTypes.CHANGE_PASSWORD,
  payload: { ...values }
});

const updateProfile = values => ({
  type: actionTypes.UPDATE_PROFILE,
  payload: { ...values }
});

const updateProfileCode = ({ code }) => ({
  type: actionTypes.UPDATE_PROFILE_CODE,
  payload: {
    code
  }
});

export const actions = {
  error,
  loaded,
  updateProfile,
  updateProfileCode,
  changePassword
};
