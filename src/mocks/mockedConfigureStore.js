import { compose, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import mockedRootReducer from './mockedRootReducer';

const loggerMiddleware = createLogger();

const middleware = applyMiddleware(loggerMiddleware);

// using compose to allow for applyMiddleware, just add it in
const enhancer =
  typeof devToolsExtension !== 'undefined'
    ? compose(
        middleware,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    : middleware;

export default function configureStore() {
  const store = createStore(mockedRootReducer, enhancer);
  return store;
}
