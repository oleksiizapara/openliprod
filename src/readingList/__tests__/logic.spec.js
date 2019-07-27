import { createMockStore } from 'redux-logic-test';

import { key, actions, formStates } from '../actions';
import { key as settingsKey } from 'settings/actions';
import { selectors } from '../reducer';
import logic from '../logic';

import reducer from 'rootReducer';
import * as queryHelper from 'common/queryHelper';

test(`[redux-logic] load page if user is not authorised`, async () => {
  const initialState = {
    [key]: {
      formState: formStates.DEFAULT_STATE,
      messages: [],
      error: undefined,
      activePage: undefined,
      totalPages: undefined,
      pages: []
    },
    [settingsKey]: {
      isLoaded: false,
      user: undefined
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  store.dispatch(actions.load(1));

  await store.whenComplete(() => {
    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.LOADING_STATE);

    const messages = selectors.messages(store.getState());
    expect(messages).toEqual([]);
  });
});

test(`[redux-logic] load first page`, async () => {
  const initialState = {
    [key]: {
      formState: formStates.DEFAULT_STATE,
      messages: [],
      error: undefined,
      pageSize: 2,
      activePage: undefined,
      totalPages: undefined,
      pages: []
    },
    [settingsKey]: {
      isLoaded: true,
      user: { id: 'testUserId' }
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  queryHelper.getReadingMessagesByAuthor = jest.fn().mockResolvedValueOnce({
    messages: [{ id: 'message1' }, { id: 'message2' }],
    nextToken: null
  });

  store.dispatch(actions.load(1));

  await store.whenComplete(() => {
    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.LOADED_STATE);

    const messages = selectors.messages(store.getState());
    expect(messages).toEqual([{ id: 'message1' }, { id: 'message2' }]);

    const activePage = selectors.activePage(store.getState());
    expect(activePage).toEqual(1);

    const totalPages = selectors.totalPages(store.getState());
    expect(totalPages).toEqual(1);

    expect(queryHelper.getReadingMessagesByAuthor.mock.calls).toEqual([
      [
        {
          authorId: 'testUserId',
          nextToken: null,
          pageSize: 2
        }
      ]
    ]);
  });
});

test(`[redux-logic] load first page error api`, async () => {
  const initialState = {
    [key]: {
      formState: formStates.DEFAULT_STATE,
      messages: [],
      error: undefined,
      pageSize: 2,
      activePage: undefined,
      totalPages: undefined,
      pages: []
    },
    [settingsKey]: {
      isLoaded: true,
      user: { id: 'testUserId' }
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  queryHelper.getReadingMessagesByAuthor = jest
    .fn()
    .mockResolvedValueOnce(undefined);

  store.dispatch(actions.load(1));

  await store.whenComplete(() => {
    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.ERROR_STATE);

    const error = selectors.error(store.getState());
    expect(error).toEqual('Reading messages was not found');

    const activePage = selectors.activePage(store.getState());
    expect(activePage).toEqual(undefined);

    const totalPages = selectors.totalPages(store.getState());
    expect(totalPages).toEqual(undefined);

    expect(queryHelper.getReadingMessagesByAuthor.mock.calls).toEqual([
      [
        {
          authorId: 'testUserId',
          nextToken: null,
          pageSize: 2
        }
      ]
    ]);
  });
});

test(`[redux-logic] load first page with 2 total pages (nextToken is not null)`, async () => {
  const initialState = {
    [key]: {
      formState: formStates.DEFAULT_STATE,
      messages: [],
      error: undefined,
      pageSize: 2,
      activePage: undefined,
      totalPages: undefined,
      pages: []
    },
    [settingsKey]: {
      isLoaded: true,
      user: { id: 'testUserId' }
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  queryHelper.getReadingMessagesByAuthor = jest.fn().mockResolvedValueOnce({
    messages: [{ id: 'message1' }, { id: 'message2' }],
    nextToken: 'testNextToken'
  });

  store.dispatch(actions.load(1));

  await store.whenComplete(() => {
    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.LOADED_STATE);

    const messages = selectors.messages(store.getState());
    expect(messages).toEqual([{ id: 'message1' }, { id: 'message2' }]);

    const activePage = selectors.activePage(store.getState());
    expect(activePage).toEqual(1);

    const totalPages = selectors.totalPages(store.getState());
    expect(totalPages).toEqual(2);

    expect(queryHelper.getReadingMessagesByAuthor.mock.calls).toEqual([
      [
        {
          authorId: 'testUserId',
          nextToken: null,
          pageSize: 2
        }
      ]
    ]);
  });
});

test(`[redux-logic] load second page`, async () => {
  const initialState = {
    [key]: {
      formState: formStates.LOADED_STATE,
      messages: [{ id: 'message1' }, { id: 'message2' }],
      error: undefined,
      activePage: 1,
      totalPages: 2,
      pageSize: 2,
      pages: [
        {
          pageId: 1,
          messages: [{ id: 'message1' }, { id: 'message2' }],
          nextToken: 'testNextToken'
        }
      ]
    },
    [settingsKey]: {
      isLoaded: true,
      user: { id: 'testUserId' }
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  queryHelper.getReadingMessagesByAuthor = jest.fn().mockResolvedValueOnce({
    messages: [{ id: 'message3' }, { id: 'message4' }],
    nextToken: null
  });

  store.dispatch(actions.load(2));

  await store.whenComplete(() => {
    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.LOADED_STATE);

    const messages = selectors.messages(store.getState());
    expect(messages).toEqual([{ id: 'message3' }, { id: 'message4' }]);

    const activePage = selectors.activePage(store.getState());
    expect(activePage).toEqual(2);

    const totalPages = selectors.totalPages(store.getState());
    expect(totalPages).toEqual(2);

    expect(queryHelper.getReadingMessagesByAuthor.mock.calls).toEqual([
      [
        {
          authorId: 'testUserId',
          nextToken: 'testNextToken',
          pageSize: 2
        }
      ]
    ]);
  });
});

test(`[redux-logic] load first existed page`, async () => {
  const initialState = {
    [key]: {
      formState: formStates.LOADED_STATE,
      messages: [{ id: 'message3' }, { id: 'message4' }],
      error: undefined,
      activePage: 2,
      totalPages: 2,
      pageSize: 2,
      pages: [
        {
          pageId: 1,
          messages: [{ id: 'message1' }, { id: 'message2' }],
          nextToken: 'testNextToken1'
        },
        {
          pageId: 2,
          messages: [{ id: 'message3' }, { id: 'message4' }],
          nextToken: null
        }
      ]
    },
    [settingsKey]: {
      isLoaded: true,
      user: { id: 'testUserId' }
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  queryHelper.getReadingMessagesByAuthor = jest.fn().mockResolvedValueOnce({});

  store.dispatch(actions.load(1));

  await store.whenComplete(() => {
    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.LOADED_STATE);

    const messages = selectors.messages(store.getState());
    expect(messages).toEqual([{ id: 'message1' }, { id: 'message2' }]);

    const activePage = selectors.activePage(store.getState());
    expect(activePage).toEqual(1);

    const totalPages = selectors.totalPages(store.getState());
    expect(totalPages).toEqual(2);

    expect(queryHelper.getReadingMessagesByAuthor.mock.calls).toEqual([]);
  });
});

test(`[redux-logic] toDefault state`, async () => {
  const initialState = {
    [key]: {
      formState: formStates.LOADED_STATE,
      messages: [{ id: 'message1' }, { id: 'message2' }],
      error: undefined,
      activePage: 1,
      totalPages: 2,
      pageSize: 2,
      pages: [
        {
          pageId: 1,
          messages: [{ id: 'message1' }, { id: 'message2' }],
          nextToken: 'testNextToken'
        }
      ]
    },
    [settingsKey]: {
      isLoaded: true,
      user: { id: 'testUserId' }
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  store.dispatch(actions.toDefault());

  await store.whenComplete(() => {
    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.DEFAULT_STATE);

    const messages = selectors.messages(store.getState());
    expect(messages).toEqual([]);

    const pages = selectors.pages(store.getState());
    expect(pages).toEqual([]);
  });
});
