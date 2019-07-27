import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App, { MockedApp } from './App';
import registerServiceWorker from './registerServiceWorker';
import { Analytics } from '../node_modules/aws-amplify/lib/index';

window.LOG_LEVEL = process.env.REACT_APP_LOG_LEVEL
  ? process.env.REACT_APP_LOG_LEVEL
  : 'ERROR';

if (process.env.NODE_ENV !== 'production') {
  Analytics.disable();
}

if (
  process.env.NODE_ENV === 'development' &&
  process.env.REACT_APP_IS_MOCKED === 'true'
) {
  ReactDOM.render(<MockedApp />, document.getElementById('root'));
  registerServiceWorker();
} else {
  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();
}
