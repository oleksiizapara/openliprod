import { createLogic } from 'redux-logic';

import { Auth } from 'aws-amplify';

import { actionTypes, actions } from './actions';

import { actions as settingsActions } from 'settings/actions';

import logger from 'common/logger';

export const changePassword = createLogic({
  type: actionTypes.CHANGE_PASSWORD,

  processOptions: {
    dispatchReturn: true
  },

  latest: true,

  async process({ action }, dispatch, done) {
    const { oldPassword, newPassword } = action.payload;

    try {
      const user = await Auth.currentAuthenticatedUser();
      const result = await Auth.changePassword(user, oldPassword, newPassword);
      logger.debug({ user, result });
      dispatch(actions.loaded());
    } catch (exception) {
      logger.debug(exception);
      dispatch(actions.error(exception.message));
    }

    done();
  }
});

export const updateProfile = createLogic({
  type: actionTypes.UPDATE_PROFILE,

  processOptions: {
    dispatchReturn: true
  },

  latest: true,

  async process({ action }, dispatch, done) {
    const { email, name, familyName } = action.payload;

    try {
      const user = await Auth.currentAuthenticatedUser();

      var updatedUserAttributes = {
        email: email,
        name: name,
        family_name: familyName
      };

      let result = await Auth.updateUserAttributes(user, updatedUserAttributes);

      logger.debug({ user, result });
      dispatch(settingsActions.userRefresh());
      dispatch(actions.loaded());
    } catch (exception) {
      logger.debug(exception);
      dispatch(actions.error(exception.message));
    }

    done();
  }
});

export const updateProfileCode = createLogic({
  type: actionTypes.UPDATE_PROFILE_CODE,

  processOptions: {
    dispatchReturn: true
  },

  latest: true,

  async process({ action }, dispatch, done) {
    const { code } = action.payload;

    try {
      let result = await Auth.verifyCurrentUserAttributeSubmit('email', code);
      logger.debug({ result });
      dispatch(settingsActions.userRefresh());
      dispatch(actions.loaded());
    } catch (exception) {
      logger.debug(exception);
      dispatch(actions.error(exception.message));
    }

    done();
  }
});

export default [changePassword, updateProfile, updateProfileCode];
