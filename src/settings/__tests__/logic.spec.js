import { createMockStore } from 'redux-logic-test';

import { key, actions } from '../actions';
import { selectors } from '../reducer';
import logic from '../logic';

import reducer from 'rootReducer';
import { Auth } from 'aws-amplify';

describe.each([
  [
    { isLoaded: false, user: undefined },
    {
      username: '1',
      attributes: {
        name: 'testName',
        family_name: 'testFamilyName',
        email: 'test@mail.com',
        email_verified: true
      }
    },
    {
      isLoading: true,
      user: {
        email: 'test@mail.com',
        emailVerified: true,
        familyName: 'testFamilyName',
        id: '1',
        name: 'testName'
      }
    }
  ]
])(
  '[redux-logic] recognitionInterimWords',
  (initialKeyState, mockedValue, expectedState) => {
    test(`[redux-logic]  userFetch ${mockedValue}`, async () => {
      const initialState = {
        [key]: initialKeyState
      };

      const store = createMockStore({
        initialState,
        reducer,
        logic
      });

      Auth.currentUserInfo = jest.fn().mockResolvedValue(mockedValue);

      store.dispatch(actions.userFetch());

      await store.whenComplete(() => {
        const isLoaded = selectors.isLoaded(store.getState());
        expect(isLoaded).toEqual(expectedState.isLoading);

        const user = selectors.user(store.getState());
        expect(user).toEqual(expectedState.user);
      });
    });

    test(`[redux-logic]  userRefresh ${mockedValue}`, async () => {
      const initialState = {
        [key]: initialKeyState
      };

      const store = createMockStore({
        initialState,
        reducer,
        logic
      });

      Auth.currentUserInfo = jest.fn().mockResolvedValue(mockedValue);

      store.dispatch(actions.userRefresh());

      await store.whenComplete(() => {
        const isLoaded = selectors.isLoaded(store.getState());
        expect(isLoaded).toEqual(expectedState.isLoading);

        const user = selectors.user(store.getState());
        expect(user).toEqual(expectedState.user);
      });
    });
  }
);

test(`[redux-logic]  userFetch error`, async () => {
  const initialState = {
    [key]: { isLoaded: false, user: undefined }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  Auth.currentUserInfo = jest.fn().mockRejectedValue(new Error());

  store.dispatch(actions.userFetch());

  await store.whenComplete(() => {
    const isLoaded = selectors.isLoaded(store.getState());
    expect(isLoaded).toEqual(true);

    const user = selectors.user(store.getState());
    expect(user).toEqual(null);
  });
});
