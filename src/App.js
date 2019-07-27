import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Amplify from 'aws-amplify';

import aws_exports from './aws-exports';

import configureStore from './configureStore';
import mockedConfigureStore from 'mocks/mockedConfigureStore';

import { Routes } from 'routes/index';
import AuthRedux from 'settings/components/AuthRedux';
import logger from 'common/logger';

Amplify.configure(aws_exports);

const store = configureStore();
const mockedStore = mockedConfigureStore();

export default function App() {
  logger.debug('App started');
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
  return (
    <Router>
      <Provider store={mockedStore}>
        <Routes />
      </Provider>
    </Router>
  );
}
