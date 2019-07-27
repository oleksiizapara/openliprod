import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Amplify, { API } from 'aws-amplify';

import aws_exports from './aws-exports';

import configureStore from './configureStore';
import mockedConfigureStore from 'mocks/mockedConfigureStore';

import { Routes } from 'routes/index';
import AuthRedux from 'settings/components/AuthRedux';
import logger from 'common/logger';
import { listen } from 'hubs/authHub';

export default function App() {
  logger.debug('App started');

  Amplify.configure(aws_exports);
  const store = configureStore();
  listen();
  return (
    <Router>
      <Provider store={store}>
        <AuthRedux />
        <Routes />
      </Provider>
    </Router>
  );
}

export function MockedApp() {
  logger.debug('MockedApp started');
  const mockedStore = mockedConfigureStore();

  return (
    <Router>
      <Provider store={mockedStore}>
        <Routes />
      </Provider>
    </Router>
  );
}
