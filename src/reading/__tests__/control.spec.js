import { createMockStore } from 'redux-logic-test';

import * as queryHelper from 'common/queryHelper';
import { key, actions, formStates } from '../actions';

import { actions as controlActions } from 'control/actions';

import {
  key as reviewKey,
  formStates as reviewFormStates
} from 'review/actions';
import { selectors as reviewSelectors } from 'review/reducer';
import { logic } from '../index';

import {
  key as speechRecognitionKey,
  actionTypes as speechRecognitionActionTypes,
  commands as speechRecognitionCommands
} from 'speechRecognition/actions';

import { selectors as readingSelectors } from 'reading/reducer';
import reducer from 'rootReducer';

test(`[redux-logic] onReadingFinished   `, async () => {
  const initialState = {
    [key]: {
      words: [{ index: 0, word: 'a' }],
      formState: formStates.READING_STATE
    },
    [speechRecognitionKey]: {}
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  store.dispatch(actions.finishReading());

  await store.whenComplete(() => {
    expect(store.actions).toEqual(
      expect.arrayContaining([
        {
          payload: { command: speechRecognitionCommands.STOP },
          type: speechRecognitionActionTypes.COMMAND_UPDATED
        }
      ])
    );
  });
});

test(`[redux-logic] review reset reading`, async () => {
  queryHelper.getReadingMessage = jest.fn().mockResolvedValue({
    content: 'a b'
  });

  const initialState = {
    [key]: {
      readingMessage: { id: 'uniqueId' },
      formState: formStates.REVIEW_STATE
    },
    [reviewKey]: {
      formState: reviewFormStates.LOADED_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  store.dispatch(controlActions.reset());

  await store.whenComplete(() => {
    const words = readingSelectors.words(store.getState());
    expect(words).toEqual([
      { afterWord: ' ', index: 0, preWord: '', viewWord: 'a ', word: 'a' },
      { afterWord: '', index: 1, preWord: '', viewWord: 'b', word: 'b' }
    ]);

    const formState = readingSelectors.formState(store.getState());
    expect(formState).toEqual(formStates.LOADED_STATE);

    const reviewFormState = reviewSelectors.formState(store.getState());
    expect(reviewFormState).toEqual(reviewFormStates.DEFAULT_STATE);

    const reviewReadingMessage = reviewSelectors.readingMessage(
      store.getState()
    );
    expect(reviewReadingMessage).toEqual(undefined);
  });
});
