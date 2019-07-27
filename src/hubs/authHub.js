import {
  Hub,
  Logger,
  Auth,
  API,
  graphqlOperation,
  Analytics
} from 'aws-amplify';
import Enumerable from 'linq';
import configureStore from '../configureStore';
import { createUser } from 'common/mutationHelper';
import { getUser } from 'common/queryHelper';
import * as customQueries from 'graphql_custom/queries';
import * as mutations from 'graphql_custom/mutations';
import { assertErrors } from 'common/common';
import logger from 'common/logger';

// const logger = new Logger('My-Logger');

const handleAuthStateChange = async state => {
  if (state === 'signIn') {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();

      const usersResponse = assertErrors(
        await API.graphql(
          graphqlOperation(customQueries.listUsers, {
            filter: {
              id: { eq: cognitoUser.username }
            }
          })
        )
      );
      const savedUser = Enumerable.from(
        usersResponse.data.listUsers.items
      ).firstOrDefault();

      if (!savedUser) {
        assertErrors(
          await API.graphql(
            graphqlOperation(mutations.createUser, {
              input: {
                id: cognitoUser.username,
                username: cognitoUser.username,
                name: cognitoUser.attributes.name,
                familyName: cognitoUser.attributes.family_name
              }
            })
          )
        );
      }
    } catch (e) {
      Analytics.record({
        name: '[AuthHab] handleAuthStateChange',
        attributes: {
          error: e.message
        }
      });
      logger.debug('[AuthHab] handleAuthStateChange', e);
    }
  }
};

const listener = async data => {
  await handleAuthStateChange(data.payload.event);
  switch (data.payload.event) {
    case 'signIn':
      // logger.error('user signed in'); //[ERROR] My-Logger - user signed in
      break;
    case 'signUp':
      // logger.error('user signed up');
      break;
    case 'signOut':
      // logger.error('user signed out');
      break;
    case 'signIn_failure':
      // logger.error('user sign in failed');
      break;
    case 'configured':
    // logger.error('the Auth module is configured');
  }
};

export const listen = () => {
  Hub.listen('auth', listener);
};
