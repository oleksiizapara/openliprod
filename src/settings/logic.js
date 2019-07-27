import { actionTypes, actions } from './actions';

import { createLogic } from 'redux-logic';

import { Auth } from 'aws-amplify';
import logger from 'common/logger';

const userFetch = createLogic({
  type: [actionTypes.USER_FETCH, actionTypes.USER_REFRESH],
  latest: true,

  processOptions: {
    dispatchReturn: true
  },

  async process(_, dispatch, done) {
    try {
      const userInfo = await Auth.currentUserInfo();
      if (!userInfo) {
        dispatch(actions.userUnregistered());
        done();
        return;
      }

      const {
        username: id,
        attributes: {
          name,
          family_name: familyName,
          email,
          email_verified: emailVerified
        }
      } = userInfo;

      dispatch(
        actions.userUpdated({
          id,
          name,
          familyName,
          email,
          emailVerified
        })
      );
    } catch (exception) {
      dispatch(actions.userUnregistered());
      logger.debug(exception);
    }

    done();
  }
});

export default [userFetch];
