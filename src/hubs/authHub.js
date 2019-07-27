import { Hub, Logger, Auth } from 'aws-amplify';
import { getUser } from '../queryHelper';
import { createUser } from '../mutationHelper';
import configureStore from '../configureStore';

// const logger = new Logger('My-Logger');

const handleAuthStateChange = async state => {
  if (state === 'signIn') {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    const userExists = await getUser(cognitoUser.username);
    if (!userExists) {
      const createdUser = await createUser({
        id: cognitoUser.username,
        username: cognitoUser.username
      });
      // this.props.onLogin(cognitoUser);
    } else {
      // this.props.onLogin(cognitoUser);
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
