import { createMockStore } from 'redux-logic-test';

import { key, actions, actionTypes, formStates } from '../actions';
import { selectors } from '../reducer';
import logic from '../logic';

import { actionTypes as settingsActionTypes } from 'settings/actions';

import reducer from 'rootReducer';
import { Auth } from 'aws-amplify';

test(`[redux-logic]  changePassword successfully`, async () => {
  const initialState = {
    [key]: { formState: formStates.DEFAULT_STATE }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  Auth.currentAuthenticatedUser = jest.fn().mockResolvedValue('testUser');
  Auth.changePassword = jest
    .fn()
    .mockResolvedValue('password successfully changed');

  store.dispatch(
    actions.changePassword({
      oldPassword: 'oldPassword',
      newPassword: 'newPassword'
    })
  );

  await store.whenComplete(() => {
    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.LOADED_STATE);
  });
});

test(`[redux-logic]  changePassword api error`, async () => {
  const initialState = {
    [key]: { formState: formStates.DEFAULT_STATE }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  Auth.currentAuthenticatedUser = jest.fn().mockResolvedValue('testUser');
  Auth.changePassword = jest
    .fn()
    .mockRejectedValue(new Error('testErrorMessage'));

  store.dispatch(
    actions.changePassword({
      oldPassword: 'oldPassword',
      newPassword: 'newPassword'
    })
  );

  await store.whenComplete(() => {
    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.ERROR_STATE);

    const error = selectors.error(store.getState());
    expect(error).toEqual('testErrorMessage');
  });
});

test(`[redux-logic]  updateProfile successfully`, async () => {
  const initialState = {
    [key]: { formState: formStates.DEFAULT_STATE }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  Auth.currentAuthenticatedUser = jest.fn().mockResolvedValue('testUser');
  Auth.updateUserAttributes = jest
    .fn()
    .mockResolvedValue('userAttributes successfully changed');

  store.dispatch(
    actions.updateProfile({
      email: 'test@email.com',
      name: 'testName',
      familyName: 'testFamilyName'
    })
  );

  await store.whenComplete(() => {
    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.LOADED_STATE);

    expect(store.actions).toMatchObject([
      {},
      { type: settingsActionTypes.USER_REFRESH },
      { type: actionTypes.LOADED }
    ]);

    expect(Auth.updateUserAttributes.mock.calls).toEqual([
      [
        'testUser',
        {
          email: 'test@email.com',
          family_name: 'testFamilyName',
          name: 'testName'
        }
      ]
    ]);
  });
});

test(`[redux-logic]  updateProfile api error`, async () => {
  const initialState = {
    [key]: { formState: formStates.DEFAULT_STATE }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  Auth.currentAuthenticatedUser = jest.fn().mockResolvedValue('testUser');
  Auth.updateUserAttributes = jest
    .fn()
    .mockRejectedValue(new Error('testErrorMessage'));

  store.dispatch(
    actions.updateProfile({
      email: 'test@email.com',
      name: 'testName',
      familyName: 'testFamilyName'
    })
  );

  await store.whenComplete(() => {
    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.ERROR_STATE);

    const error = selectors.error(store.getState());
    expect(error).toEqual('testErrorMessage');
  });
});

test(`[redux-logic]  updateProfileCode successfully`, async () => {
  const initialState = {
    [key]: { formState: formStates.DEFAULT_STATE }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  Auth.verifyCurrentUserAttributeSubmit = jest
    .fn()
    .mockResolvedValue('testResult');

  store.dispatch(
    actions.updateProfileCode({
      code: '123456'
    })
  );

  await store.whenComplete(() => {
    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.LOADED_STATE);

    expect(store.actions).toMatchObject([
      {},
      { type: settingsActionTypes.USER_REFRESH },
      { type: actionTypes.LOADED }
    ]);

    expect(Auth.verifyCurrentUserAttributeSubmit.mock.calls).toEqual([
      ['email', '123456']
    ]);
  });
});

test(`[redux-logic]  updateProfileCode api error`, async () => {
  const initialState = {
    [key]: { formState: formStates.DEFAULT_STATE }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  Auth.verifyCurrentUserAttributeSubmit = jest
    .fn()
    .mockRejectedValue(new Error('testErrorMessage'));

  store.dispatch(
    actions.updateProfileCode({
      code: '123456'
    })
  );

  await store.whenComplete(() => {
    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.ERROR_STATE);

    const error = selectors.error(store.getState());
    expect(error).toEqual('testErrorMessage');
  });
});
