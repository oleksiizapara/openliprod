import { createMockStore } from 'redux-logic-test';

import { key, actions, formStates } from '../actions';
import { selectors } from '../reducer';
import logic from '../logic';

import reducer from 'rootReducer';
import * as queryHelper from 'common/queryHelper';

describe.each([
  [
    {
      formState: formStates.DEFAULT_STATE,
      error: '',
      messages: [],
      pages: [],
      activePage: undefined,
      totalPages: undefined,
      pageSize: 2
    },
    {
      messages: [{ id: 'message1' }, { id: 'message2' }],
      nextToken: null
    },
    [{ id: 'message1' }, { id: 'message2' }],
    [
      [
        {
          searchText: 'TestSearchText',
          nextToken: null,
          pageSize: 2
        }
      ]
    ],
    formStates.LOADED_STATE,
    1,
    1,
    ''
  ],
  [
    {
      formState: formStates.DEFAULT_STATE,
      error: '',
      messages: [],
      pages: [],
      activePage: undefined,
      totalPages: undefined,
      pageSize: 2
    },
    {
      messages: [{ id: 'message1' }, { id: 'message2' }],
      nextToken: 'TetNextToken'
    },
    [{ id: 'message1' }, { id: 'message2' }],
    [
      [
        {
          searchText: 'TestSearchText',
          nextToken: null,
          pageSize: 2
        }
      ]
    ],
    formStates.LOADED_STATE,
    1,
    2,
    ''
  ],
  [
    {
      formState: formStates.DEFAULT_STATE,
      error: '',
      messages: [],
      pages: [],
      activePage: undefined,
      totalPages: undefined,
      pageSize: 2
    },
    undefined,
    [],
    [
      [
        {
          searchText: 'TestSearchText',
          nextToken: null,
          pageSize: 2
        }
      ]
    ],
    formStates.ERROR_STATE,
    undefined,
    undefined,
    'Search is not working'
  ]
])(
  '[redux-logic] search',
  (
    initialKeyState,
    getSearchMessagesResult,
    expectedMessages,
    expectedMockCalls,
    expectedState,
    expectedActivePage,
    expectedTotalPages,
    expectedError
  ) => {
    test(`[redux-logic] search ${expectedState}`, async () => {
      const initialState = {
        [key]: initialKeyState
      };

      const store = createMockStore({
        initialState,
        reducer,
        logic
      });

      queryHelper.getSearchMessages = jest
        .fn()
        .mockResolvedValueOnce(getSearchMessagesResult);

      store.dispatch(actions.search('TestSearchText'));

      await store.whenComplete(() => {
        const formState = selectors.formState(store.getState());
        expect(formState).toEqual(expectedState);

        const messages = selectors.messages(store.getState());
        expect(messages).toEqual(expectedMessages);

        const activePage = selectors.activePage(store.getState());
        expect(activePage).toEqual(expectedActivePage);

        const totalPages = selectors.totalPages(store.getState());
        expect(totalPages).toEqual(expectedTotalPages);

        expect(queryHelper.getSearchMessages.mock.calls).toEqual(
          expectedMockCalls
        );

        const error = selectors.error(store.getState());
        expect(error).toEqual(expectedError);
      });
    });
  }
);

describe.each([
  [
    {
      formState: formStates.DEFAULT_STATE,
      error: '',
      messages: [{ id: 'message1' }, { id: 'message2' }],
      pages: [
        {
          pageId: 1,
          messages: [{ id: 'message1' }, { id: 'message2' }],
          searchText: 'TestSearchText',
          nextToken: 'TestNextToken'
        }
      ],
      activePage: 1,
      totalPages: 2,
      pageSize: 2
    },
    2,
    {
      messages: [{ id: 'message3' }, { id: 'message4' }],
      nextToken: null
    },
    [{ id: 'message3' }, { id: 'message4' }],
    [
      [
        {
          searchText: 'TestSearchText',
          nextToken: 'TestNextToken',
          pageSize: 2
        }
      ]
    ],
    formStates.LOADED_STATE,
    2,
    2,
    ''
  ],
  [
    {
      formState: formStates.DEFAULT_STATE,
      error: '',
      messages: [{ id: 'message1' }, { id: 'message2' }],
      pages: [
        {
          pageId: 1,
          messages: [{ id: 'message1' }, { id: 'message2' }],
          searchText: 'TestSearchText',
          nextToken: 'TestNextToken'
        }
      ],
      activePage: 1,
      totalPages: 2,
      pageSize: 2
    },
    2,
    {
      messages: [{ id: 'message3' }, { id: 'message4' }],
      nextToken: 'TestNextToken2'
    },
    [{ id: 'message3' }, { id: 'message4' }],
    [
      [
        {
          searchText: 'TestSearchText',
          nextToken: 'TestNextToken',
          pageSize: 2
        }
      ]
    ],
    formStates.LOADED_STATE,
    2,
    3,
    ''
  ],
  [
    {
      formState: formStates.DEFAULT_STATE,
      error: '',
      messages: [{ id: 'message3' }, { id: 'message4' }],
      pages: [
        {
          pageId: 1,
          messages: [{ id: 'message1' }, { id: 'message2' }],
          searchText: 'TestSearchText',
          nextToken: 'TestNextToken'
        },
        {
          pageId: 2,
          messages: [{ id: 'message3' }, { id: 'message4' }],
          searchText: 'TestSearchText',
          nextToken: null
        }
      ],
      activePage: 2,
      totalPages: 2,
      pageSize: 2
    },
    1,
    undefined,
    [{ id: 'message1' }, { id: 'message2' }],
    [],
    formStates.LOADED_STATE,
    1,
    2,
    ''
  ],
  [
    {
      formState: formStates.DEFAULT_STATE,
      error: '',
      messages: [{ id: 'message1' }, { id: 'message2' }],
      pages: [
        {
          pageId: 1,
          messages: [{ id: 'message1' }, { id: 'message2' }],
          searchText: 'TestSearchText',
          nextToken: 'TestNextToken'
        }
      ],
      activePage: 1,
      totalPages: 2,
      pageSize: 2
    },
    2,
    undefined,
    [{ id: 'message1' }, { id: 'message2' }],
    [
      [
        {
          searchText: 'TestSearchText',
          nextToken: 'TestNextToken',
          pageSize: 2
        }
      ]
    ],
    formStates.ERROR_STATE,
    1,
    2,
    'Search is not working'
  ]
])(
  '[redux-logic] search',
  (
    initialKeyState,
    changedPage,
    getSearchMessagesResult,
    expectedMessages,
    expectedMockCalls,
    expectedState,
    expectedActivePage,
    expectedTotalPages,
    expectedError
  ) => {
    test(`[redux-logic] changePage ${expectedState}`, async () => {
      const initialState = {
        [key]: initialKeyState
      };

      const store = createMockStore({
        initialState,
        reducer,
        logic
      });

      queryHelper.getSearchMessages = jest
        .fn()
        .mockResolvedValueOnce(getSearchMessagesResult);

      store.dispatch(actions.changePage(changedPage));

      await store.whenComplete(() => {
        const formState = selectors.formState(store.getState());
        expect(formState).toEqual(expectedState);

        const messages = selectors.messages(store.getState());
        expect(messages).toEqual(expectedMessages);

        const activePage = selectors.activePage(store.getState());
        expect(activePage).toEqual(expectedActivePage);

        const totalPages = selectors.totalPages(store.getState());
        expect(totalPages).toEqual(expectedTotalPages);

        expect(queryHelper.getSearchMessages.mock.calls).toEqual(
          expectedMockCalls
        );

        const error = selectors.error(store.getState());
        expect(error).toEqual(expectedError);
      });
    });
  }
);
