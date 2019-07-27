import React, { useEffect } from 'react';

import { Hub } from 'aws-amplify';

import { useDispatch } from 'react-redux';

import { actions } from '../actions';

const reduxListener = dispatch => async data => {
  switch (data.payload.event) {
    case 'signIn':
      // history.push('/');
      // logger.error('user signed in'); //[ERROR] My-Logger - user signed in
      break;
    case 'signUp':
      // history.push('/sign_in');
      // logger.error('user signed up');
      break;
    case 'signOut':
      dispatch(actions.userUnregistered());
      //   history.push('/');
      // logger.error('user signed out');
      break;
    case 'signIn_failure':
      // logger.error('user sign in failed');
      break;
    case 'configured':
      // logger.error('the Auth module is configured');
      break;
    default:
      break;
  }
};

// {id: "ap-southeast-2:b121c590-ff4b-4df7-aeff-698cbc1e07aa", username: "7acbba31-78be-4901-9cb4-6293b0744611", attributes: {…}}
// attributes:
// email: "ivan.smith@mail.com"
// email_verified: true
// family_name: "Smith"
// name: "Ivan"
// sub: "7acbba31-78be-4901-9cb4-6293b0744611"
// __proto__: Object
// id: "ap-southeast-2:b121c590-ff4b-4df7-aeff-698cbc1e07aa"
// username: "7acbba31-78be-4901-9cb4-6293b0744611"

const AuthRedux = () => {
  const dispatch = useDispatch();

  Hub.listen('auth', reduxListener(dispatch));

  useEffect(() => {
    dispatch(actions.userFetch());
  }, [dispatch]);

  return <></>;
};

export default AuthRedux;
