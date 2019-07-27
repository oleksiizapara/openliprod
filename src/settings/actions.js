export const key = 'settings';

const USER_UPDATED = `[${key}] USER_UPDATED`;
const USER_UNREGISTERED = `[${key}] USER_UNREGISTERED`;
const USER_FETCH = `[${key}] USER_FETCH`;
const USER_REFRESH = `[${key}] USER_REFRESH`;

export const actionTypes = {
  USER_UPDATED,
  USER_UNREGISTERED,
  USER_FETCH,
  USER_REFRESH
};

const userUpdated = user => ({
  type: actionTypes.USER_UPDATED,
  payload: { user }
});

const userUnregistered = () => ({
  type: actionTypes.USER_UNREGISTERED,
  payload: {}
});

const userFetch = () => ({
  type: actionTypes.USER_FETCH,
  payload: {}
});

const userRefresh = () => ({
  type: actionTypes.USER_REFRESH,
  payload: {}
});

export const actions = {
  userUpdated,
  userUnregistered,
  userFetch,
  userRefresh
};
