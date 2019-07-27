import { createMockStore } from 'redux-logic-test';

import { key, actions, formStates } from '../actions';
import { selectors } from '../reducer';
import logic from '../logic';

import reducer from 'rootReducer';
import * as queryHelper from 'common/queryHelper';
import * as mutationHelper from 'common/mutationHelper';
import { errorMessages } from 'common/errorMessages';

describe.each([
  [
    {
      id: '',
      readingMessage: { id: '', title: '', content: '', access: '' },
      formState: formStates.DEFAULT_STATE,
      error: ''
    },
    {
      id: 'notNull',
      readingMessage: {
        id: 'notNull',
        title: 'notNull',
        content: 'notNull',
        access: 'notNull'
      },
      formState: formStates.DEFAULT_STATE,
      error: 'not null'
    }
  ]
])('[redux-logic] create readingMessage', initialKeyState => {
  test(`[redux-logic]  create readingMessage ${JSON.stringify(
    initialKeyState
  )}`, async () => {
    const initialState = {
      [key]: initialKeyState
    };

    const store = createMockStore({
      initialState,
      reducer,
      logic
    });

    store.dispatch(actions.create());

    await store.whenComplete(() => {
      const readingMessage = selectors.readingMessage(store.getState());
      expect(readingMessage).toEqual({
        id: '',
        title: '',
        content: '',
        access: ''
      });

      const formState = selectors.formState(store.getState());
      expect(formState).toEqual(formStates.LOADED_STATE);
    });
  });
});

describe.each([
  [
    {
      id: '',
      readingMessage: { id: '', title: '', content: '' },
      formState: formStates.DEFAULT_STATE,
      error: ''
    }
  ],
  [
    {
      id: 'notNull',
      readingMessage: { id: 'notNull', title: 'notNull', content: 'notNull' },
      formState: formStates.PUBLISHED_STATE,
      error: 'not null'
    }
  ]
])('[redux-logic] load edit readingMessage', initialKeyState => {
  test(`[redux-logic] load edit readingMessage ${JSON.stringify(
    initialKeyState
  )}`, async () => {
    const initialState = {
      [key]: initialKeyState
    };

    const store = createMockStore({
      initialState,
      reducer,
      logic
    });

    queryHelper.getReadingMessage = jest.fn().mockResolvedValue({
      id: '1',
      title: 'testTitle',
      content: 'testContent'
    });

    store.dispatch(actions.load('1'));

    await store.whenComplete(() => {
      const readingMessage = selectors.readingMessage(store.getState());
      expect(readingMessage).toEqual({
        id: '1',
        title: 'testTitle',
        content: 'testContent'
      });

      const formState = selectors.formState(store.getState());
      expect(formState).toEqual(formStates.LOADED_STATE);
    });
  });
});

test(`[redux-logic] load edit readingMessage does not exist`, async () => {
  const initialState = {
    [key]: {
      id: '',
      readingMessage: { id: '', title: '', content: '' },
      formState: formStates.DEFAULT_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  queryHelper.getReadingMessage = jest.fn().mockResolvedValue(undefined);

  store.dispatch(actions.load('1'));

  await store.whenComplete(() => {
    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.ERROR_STATE);

    const error = selectors.error(store.getState());
    expect(error).toEqual(errorMessages.readingMessageWasNotFound);
  });
});

test(`[redux-logic] publish created readingMessage`, async () => {
  const initialState = {
    [key]: {
      id: '',
      readingMessage: { id: '', title: '', content: '' },
      formState: formStates.LOADED_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  mutationHelper.createReadingMessage = jest.fn().mockResolvedValue({
    id: 'testId',
    title: 'demoTitle',
    content: 'demoContent'
  });

  store.dispatch(
    actions.publish({ id: '', title: 'demoTitle', content: 'demoContent' })
  );

  await store.whenComplete(() => {
    const readingMessage = selectors.readingMessage(store.getState());
    expect(readingMessage).toEqual({
      id: 'testId',
      title: 'demoTitle',
      content: 'demoContent'
    });

    const id = selectors.id(store.getState());
    expect(id).toEqual('testId');

    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.PUBLISHED_STATE);
  });
});

test(`[redux-logic] publish created readingMessage error API`, async () => {
  const initialState = {
    [key]: {
      id: '',
      readingMessage: { id: '', title: '', content: '' },
      formState: formStates.LOADED_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  mutationHelper.createReadingMessage = jest.fn().mockResolvedValue(undefined);

  store.dispatch(
    actions.publish({ id: '', title: 'demoTitle', content: 'demoContent' })
  );

  await store.whenComplete(() => {
    const readingMessage = selectors.readingMessage(store.getState());
    expect(readingMessage).toEqual({
      id: '',
      title: '',
      content: ''
    });

    const id = selectors.id(store.getState());
    expect(id).toEqual('');

    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.ERROR_STATE);

    const error = selectors.error(store.getState());
    expect(error).toEqual(errorMessages.readingMessageWasNotCreated);
  });
});

test(`[redux-logic] publish edited readingMessage`, async () => {
  const initialState = {
    [key]: {
      id: 'testId',
      readingMessage: { id: '', title: '', content: '' },
      formState: formStates.LOADED_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  mutationHelper.updateReadingMessage = jest.fn().mockResolvedValue({
    id: 'testId',
    title: 'demoTitle',
    content: 'demoContent'
  });

  store.dispatch(
    actions.publish({
      id: 'testId',
      title: 'updatedDemoTitle',
      content: 'updatedDemoContent'
    })
  );

  await store.whenComplete(() => {
    const readingMessage = selectors.readingMessage(store.getState());
    expect(readingMessage).toEqual({
      id: 'testId',
      title: 'demoTitle',
      content: 'demoContent'
    });

    const id = selectors.id(store.getState());
    expect(id).toEqual('testId');

    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.PUBLISHED_STATE);
  });
});

test(`[redux-logic] publish updated readingMessage error API`, async () => {
  const initialState = {
    [key]: {
      id: 'testId',
      readingMessage: {
        id: 'testId',
        title: 'demoTitle',
        content: 'demoContent'
      },
      formState: formStates.LOADED_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  mutationHelper.updateReadingMessage = jest.fn().mockResolvedValue(undefined);

  store.dispatch(
    actions.publish({
      id: 'testId',
      title: 'UpdatedDemoTitle',
      content: 'UpdatedDemoContent'
    })
  );

  await store.whenComplete(() => {
    const readingMessage = selectors.readingMessage(store.getState());
    expect(readingMessage).toEqual({
      id: 'testId',
      title: 'demoTitle',
      content: 'demoContent'
    });

    const id = selectors.id(store.getState());
    expect(id).toEqual('testId');

    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.ERROR_STATE);

    const error = selectors.error(store.getState());
    expect(error).toEqual(errorMessages.readingMessageWasNotUpdated);
  });
});

describe.each([
  [
    {
      id: 'NotNull',
      readingMessage: { id: 'NotNull', title: '', content: '' },
      formState: formStates.DEFAULT_STATE,
      error: ''
    },
    formStates.DELETED_STATE
  ]
])(
  '[redux-logic] delete readingMessage successful',
  (initialKeyState, expectedFormState) => {
    test(`[redux-logic] load edit readingMessage ${JSON.stringify(
      initialKeyState
    )}`, async () => {
      const initialState = {
        [key]: initialKeyState
      };

      const store = createMockStore({
        initialState,
        reducer,
        logic
      });

      mutationHelper.deleteReadingMessage = jest.fn().mockResolvedValue({
        id: '1'
      });

      store.dispatch(actions.delete('1'));

      await store.whenComplete(() => {
        const readingMessage = selectors.readingMessage(store.getState());
        expect(readingMessage).toMatchObject({ id: '' });

        const formState = selectors.formState(store.getState());
        expect(formState).toEqual(expectedFormState);
      });
    });
  }
);

describe.each([
  [
    {
      id: 'NotNull',
      readingMessage: { id: 'NotNull', title: '', content: '' },
      formState: formStates.DEFAULT_STATE,
      error: ''
    },
    formStates.ERROR_STATE,
    errorMessages.readingMessageWasNotDeleted
  ]
])(
  '[redux-logic] delete readingMessage successful',
  (initialKeyState, expectedFormState) => {
    test(`[redux-logic] load edit readingMessage error api ${JSON.stringify(
      initialKeyState
    )}`, async () => {
      const initialState = {
        [key]: initialKeyState
      };

      const store = createMockStore({
        initialState,
        reducer,
        logic
      });

      mutationHelper.deleteReadingMessage = jest
        .fn()
        .mockResolvedValue(undefined);

      store.dispatch(actions.delete('1'));

      await store.whenComplete(() => {
        const readingMessage = selectors.readingMessage(store.getState());
        expect(readingMessage).toMatchObject({ id: 'NotNull' });

        const formState = selectors.formState(store.getState());
        expect(formState).toEqual(expectedFormState);

        const error = selectors.error(store.getState());
        expect(error).toEqual('Reading message was not deleted');
      });
    });
  }
);
