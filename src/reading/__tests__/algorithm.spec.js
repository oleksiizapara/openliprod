import { createMockStore } from 'redux-logic-test';

import { key, actions, formStates } from '../actions';
import { selectors } from '../reducer';
import logic from 'rootLogic';

import { actions as speechRecognitionActions } from 'speechRecognition/actions';
import reducer from 'rootReducer';

import * as queryHelper from 'common/queryHelper';
import { errorMessages } from 'common/errorMessages';
import { date } from 'common/date';

test(`[redux-logic] load words`, async () => {
  queryHelper.getReadingMessage = jest.fn().mockResolvedValue({
    content: 'a b'
  });

  const initialState = {
    [key]: {
      readingMessage: {},
      formState: formStates.DEFAULT_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  const testId = 1;
  store.dispatch(actions.load(testId));

  await store.whenComplete(() => {
    const words = selectors.words(store.getState());
    expect(words).toEqual([
      { afterWord: ' ', index: 0, preWord: '', viewWord: 'a ', word: 'a' },
      { afterWord: '', index: 1, preWord: '', viewWord: 'b', word: 'b' }
    ]);

    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.LOADED_STATE);
  });
});

test(`[redux-logic] api return exception`, async () => {
  queryHelper.getReadingMessage = jest.fn().mockResolvedValue(undefined);

  const initialState = {
    [key]: {
      readingMessage: {},
      formState: formStates.DEFAULT_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  const testId = 1;
  store.dispatch(actions.load(testId));

  await store.whenComplete(() => {
    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.ERROR_STATE);

    const error = selectors.error(store.getState());
    expect(error).toEqual(errorMessages.readingMessageWasNotFound);
  });
});

describe.each([
  [
    [
      {
        index: 0,
        word: 'you'
      },
      {
        index: 2,
        word: 'can'
      },
      {
        index: 3,
        word: 'find'
      },
      {
        index: 4,
        word: 'there'
      },
      {
        index: 5,
        word: 'the'
      },
      {
        index: 6,
        word: 'oldest'
      },
      {
        index: 7,
        word: 'and'
      },
      {
        index: 8,
        word: 'the'
      },
      {
        index: 9,
        word: 'newest'
      },
      {
        index: 9,
        word: 'books'
      }
    ],
    'you can find the oldest and other newest books',
    [
      {
        index: 0,
        word: 'you',
        isFinalRecognised: true
      },
      {
        index: 2,
        word: 'can',
        isFinalRecognised: true
      },
      {
        index: 3,
        word: 'find',
        isFinalRecognised: true
      },
      {
        index: 4,
        word: 'there'
      },
      {
        index: 5,
        word: 'the',
        isFinalRecognised: true
      },
      {
        index: 6,
        word: 'oldest',
        isFinalRecognised: true
      },
      {
        index: 7,
        word: 'and',
        isFinalRecognised: true
      },
      {
        index: 8,
        word: 'the'
      },
      {
        index: 9,
        word: 'newest',
        isFinalRecognised: true
      },
      {
        index: 9,
        word: 'books',
        isFinalRecognised: true
      }
    ]
  ],

  [
    [
      {
        index: 0,
        word: 'authentication',
        isFinalRecognised: true,
        isInterimRecognised: true
      },

      {
        index: 1,
        word: 'scheme'
      },
      {
        index: 2,
        word: 'with'
      },
      {
        index: 3,
        word: 'Amazon'
      },
      {
        index: 4,
        word: 'Cognito'
      },
      {
        index: 5,
        word: 'user'
      }
    ],
    'table with Amazon cognito',
    [
      {
        index: 0,
        word: 'authentication',
        isFinalRecognised: true,
        isInterimRecognised: true
      },
      {
        index: 1,
        word: 'scheme'
      },
      {
        index: 2,
        word: 'with',
        isFinalRecognised: true
      },
      {
        index: 3,
        word: 'Amazon',
        isFinalRecognised: true
      },
      {
        index: 4,
        word: 'Cognito',
        isFinalRecognised: true
      },
      {
        index: 5,
        word: 'user'
      }
    ]
  ],
  [
    [{ index: 0, word: 'Another' }],
    'Another',
    [
      {
        index: 0,
        word: 'Another',
        isFinalRecognised: true
      }
    ]
  ],
  [
    [{ index: 0, word: 'a' }],
    'a',
    [
      {
        index: 0,
        word: 'a',
        isFinalRecognised: true
      }
    ]
  ],
  [
    [
      { index: 0, word: 'a' },
      { index: 1, word: 'a', isFinalRecognised: true },
      { index: 2, word: 'a' }
    ],
    'a',
    [
      { index: 0, word: 'a' },
      { index: 1, word: 'a', isFinalRecognised: true },
      {
        index: 2,
        word: 'a',
        isFinalRecognised: true
      }
    ]
  ],
  [
    [
      { index: 0, word: 'direct' },
      { index: 1, word: 'neural' },
      { index: 2, word: 'pathways' },
      { index: 3, word: 'have' }
    ],
    'direct neural pathways',
    [
      { index: 0, word: 'direct', isFinalRecognised: true },
      { index: 1, word: 'neural', isFinalRecognised: true },
      { index: 2, word: 'pathways', isFinalRecognised: true },
      { index: 3, word: 'have' }
    ]
  ],
  [
    [
      { index: 0, word: 'direct' },
      { index: 1, word: 'neural' },
      { index: 2, word: 'pathways' },
      { index: 3, word: 'have' },
      { index: 4, word: 'been' },
      { index: 5, word: 'perfected' }
    ],
    'neural pathways have been perfected',
    [
      { index: 0, word: 'direct' },
      { index: 1, word: 'neural', isFinalRecognised: true },
      { index: 2, word: 'pathways', isFinalRecognised: true },
      { index: 3, word: 'have', isFinalRecognised: true },
      { index: 4, word: 'been', isFinalRecognised: true },
      { index: 5, word: 'perfected', isFinalRecognised: true }
    ]
  ],
  [
    [
      { index: 0, word: 'direct', isFinalRecognised: true },
      { index: 1, word: 'neural', isFinalRecognised: true },
      { index: 2, word: 'pathways', isFinalRecognised: true },
      { index: 3, word: 'have', isFinalRecognised: true },
      { index: 4, word: 'been', isFinalRecognised: true },
      { index: 5, word: 'a' },
      { index: 6, word: 'range' },
      { index: 7, word: 'of' },
      { index: 8, word: 'neural' },
      { index: 9, word: 'implants' }
    ],
    'our range of neural implants',
    [
      { index: 0, word: 'direct', isFinalRecognised: true },
      { index: 1, word: 'neural', isFinalRecognised: true },
      { index: 2, word: 'pathways', isFinalRecognised: true },
      { index: 3, word: 'have', isFinalRecognised: true },
      { index: 4, word: 'been', isFinalRecognised: true },
      { index: 5, word: 'a' },
      { index: 6, word: 'range', isFinalRecognised: true },
      { index: 7, word: 'of', isFinalRecognised: true },
      { index: 8, word: 'neural', isFinalRecognised: true },
      { index: 9, word: 'implants', isFinalRecognised: true }
    ]
  ]
])(
  '[redux-logic] recognitionFinalWords',
  (baseWords, finalText, expectedWords) => {
    test(`[redux-logic] recognitionFinalWords `, async () => {
      const initialState = {
        [key]: {
          words: baseWords,
          formState: formStates.READING_STATE
        }
      };

      const store = createMockStore({
        initialState,
        reducer,
        logic
      });

      store.dispatch(speechRecognitionActions.finalUpdated(finalText));

      await store.whenComplete(() => {
        const words = selectors.words(store.getState());
        expect(words).toMatchObject(expectedWords);
      });
    });
  }
);

describe.each([
  [
    [
      {
        index: 0,
        word: 'authentication',
        isFinalRecognised: true,
        isInterimRecognised: true
      },

      {
        index: 1,
        word: 'scheme'
      },
      {
        index: 2,
        word: 'with'
      },
      {
        index: 3,
        word: 'Amazon'
      },
      {
        index: 4,
        word: 'Cognito'
      },
      {
        index: 5,
        word: 'user'
      }
    ],
    'table with Amazon cognito',
    [
      {
        index: 0,
        word: 'authentication',
        isFinalRecognised: true,
        isInterimRecognised: true
      },
      {
        index: 1,
        word: 'scheme'
      },
      {
        index: 2,
        word: 'with',
        isInterimRecognised: true
      },
      {
        index: 3,
        word: 'Amazon',
        isInterimRecognised: true
      },
      {
        index: 4,
        word: 'Cognito',
        isInterimRecognised: true
      },
      {
        index: 5,
        word: 'user'
      }
    ]
  ],
  [
    [
      {
        afterWord: ' ',
        index: 0,
        preWord: '',
        viewWord: 'Table ',
        word: 'Table'
      },
      {
        afterWord: ' ',
        index: 1,
        preWord: '',
        viewWord: 'have ',
        word: 'have'
      },
      {
        afterWord: ' ',
        index: 2,
        preWord: '',
        viewWord: 'have ',
        word: 'have'
      },
      { afterWord: ' ', index: 3, preWord: '', viewWord: 'have ', word: 'have' }
    ],
    'table',
    [
      {
        afterWord: ' ',
        index: 0,
        preWord: '',
        viewWord: 'Table ',
        word: 'Table',
        isInterimRecognised: true
      },
      {
        afterWord: ' ',
        index: 1,
        preWord: '',
        viewWord: 'have ',
        word: 'have'
      },
      {
        afterWord: ' ',
        index: 2,
        preWord: '',
        viewWord: 'have ',
        word: 'have'
      },
      { afterWord: ' ', index: 3, preWord: '', viewWord: 'have ', word: 'have' }
    ]
  ],
  [
    [{ index: 0, word: 'a' }],
    'a',
    [
      {
        index: 0,
        word: 'a',
        isInterimRecognised: true
      }
    ]
  ],
  [
    [{ index: 0, word: 'a', isFinalRecognised: true }, { index: 1, word: 'b' }],
    'b',
    [
      { index: 0, word: 'a', isFinalRecognised: true },
      { index: 1, word: 'b', isInterimRecognised: true }
    ]
  ]
])(
  '[redux-logic] recognitionInterimWords',
  (baseWords, interimText, expectedWords) => {
    test(`[redux-logic] recognitionInterimWords ${interimText}`, async () => {
      const initialState = {
        [key]: {
          words: baseWords,
          formState: formStates.READING_STATE
        }
      };

      const store = createMockStore({
        initialState,
        reducer,
        logic
      });

      store.dispatch(speechRecognitionActions.interimUpdated(interimText));

      await store.whenComplete(() => {
        const words = selectors.words(store.getState());
        expect(words).toMatchObject(expectedWords);
      });
    });
  }
);

test(`[redux-logic] finalUpdate isInterimRecognised changed to  isFinalRecognised`, async () => {
  const initialState = {
    [key]: {
      words: [{ index: 0, word: 'a', isInterimRecognised: true }],
      formState: formStates.READING_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  store.dispatch(speechRecognitionActions.finalUpdated(''));

  await store.whenComplete(() => {
    const words = selectors.words(store.getState());
    expect(words).toMatchObject([
      {
        index: 0,
        word: 'a',
        isInterimRecognised: true,
        isFinalRecognised: true
      }
    ]);
  });
});

test(`[redux-logic] UTCTime added on final recognised words `, async () => {
  const initialState = {
    [key]: {
      words: [{ index: 0, word: 'a' }],
      formState: formStates.READING_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  date.getUTCtime = jest.fn(() => 1);

  store.dispatch(speechRecognitionActions.finalUpdated('a'));

  await store.whenComplete(() => {
    const words = selectors.words(store.getState());
    expect(words[0]).toMatchObject({ index: 0, word: 'a', time: 1 });
  });
});

test(`[redux-logic] UTCTime will not updated on final recognised words`, async () => {
  const initialState = {
    [key]: {
      words: [{ index: 0, word: 'a', time: 1 }]
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  date.getUTCtime = jest.fn(() => 2);

  store.dispatch(speechRecognitionActions.finalUpdated('a'));

  await store.whenComplete(() => {
    const words = selectors.words(store.getState());
    expect(words[0]).toMatchObject({ index: 0, word: 'a', time: 1 });
  });
});

test(`[redux-logic] UTCTime added on interim recognised words `, async () => {
  const initialState = {
    [key]: {
      words: [{ index: 0, word: 'a' }],
      formState: formStates.READING_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  date.getUTCtime = jest.fn(() => 1);

  store.dispatch(speechRecognitionActions.interimUpdated('a'));

  await store.whenComplete(() => {
    const words = selectors.words(store.getState());
    expect(words[0]).toMatchObject({ index: 0, word: 'a', time: 1 });
  });
});

test(`[redux-logic] UTCTime will not updated on interim recognised words `, async () => {
  const initialState = {
    [key]: {
      words: [{ index: 0, word: 'a', time: 1 }],
      formState: formStates.READING_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  date.getUTCtime = jest.fn(() => 2);

  store.dispatch(speechRecognitionActions.interimUpdated('a'));

  await store.whenComplete(() => {
    const words = selectors.words(store.getState());
    expect(words[0]).toMatchObject({ index: 0, word: 'a', time: 1 });
  });
});

describe.each([
  [
    [{ index: 0, word: 'a' }],
    'b',
    [
      {
        index: 0,
        word: 'a',
        isNotRecognisedCount: 1
      }
    ]
  ],
  [
    [{ index: 0, word: 'a', isNotRecognisedCount: 1 }],
    'b',
    [
      {
        index: 0,
        word: 'a',
        isNotRecognisedCount: 2
      }
    ]
  ],
  [
    [{ index: 0, word: 'a', isFinalRecognised: true }, { index: 1, word: 'c' }],
    'b',
    [
      {
        index: 0,
        word: 'a'
      },
      {
        index: 1,
        word: 'c',
        isNotRecognisedCount: 1
      }
    ]
  ]
])(
  '[redux-logic] isNotRecognisedCount will be updated',
  (baseWords, finalText, expectedWords) => {
    test(`[redux-logic] isNotRecognisedCount will be updated on final recognised words`, async () => {
      const initialState = {
        [key]: {
          words: baseWords,
          formState: formStates.READING_STATE
        }
      };

      const store = createMockStore({
        initialState,
        reducer,
        logic
      });

      store.dispatch(speechRecognitionActions.finalUpdated(finalText));

      await store.whenComplete(() => {
        const words = selectors.words(store.getState());
        expect(words).toMatchObject(expectedWords);
      });
    });
  }
);

describe.each([
  [
    {
      transcript: {
        groups: [{ interim: [{ type: 'interim', content: 'a' }] }],
        transcript: { transcriptType: 'interim', content: 'a' }
      },
      formState: formStates.READING_STATE
    },
    'b',
    {
      groups: [
        {
          interim: [{ type: 'interim', content: 'a' }],
          final: { type: 'final', content: 'b' }
        }
      ],
      transcript: { type: 'final', content: 'b' }
    }
  ],
  [
    {
      transcript: {
        groups: [],
        transcript: undefined
      },
      formState: formStates.READING_STATE
    },
    '',
    {
      groups: [],
      transcript: undefined
    }
  ]
])(
  '[redux-logic] final transcript will be updated test cases',
  (initialStateKey, finalText, expectedTranscript) => {
    test(`[redux-logic] final transcript will be added during reading to empty transcript redux`, async () => {
      const initialState = {
        [key]: initialStateKey
      };

      const store = createMockStore({
        initialState,
        reducer,
        logic
      });

      store.dispatch(speechRecognitionActions.finalUpdated(finalText));

      await store.whenComplete(() => {
        const transcript = selectors.transcript(store.getState());
        expect(transcript).toMatchObject(expectedTranscript);
      });
    });
  }
);

describe.each([
  [
    {
      transcript: { groups: [], transcript: undefined },
      formState: formStates.READING_STATE
    },
    'a',
    {
      groups: [
        {
          interim: [
            {
              content: 'a',
              type: 'interim'
            }
          ]
        }
      ],
      transcript: {
        content: 'a',
        type: 'interim'
      }
    }
  ],
  [
    {
      transcript: {
        groups: [
          {
            interim: [
              {
                content: 'a',
                type: 'interim'
              }
            ]
          }
        ],
        transcript: {
          content: 'a',
          type: 'interim'
        }
      },
      formState: formStates.READING_STATE
    },
    'b',
    {
      groups: [
        {
          interim: [
            { content: 'a', type: 'interim' },
            { content: 'b', type: 'interim' }
          ]
        }
      ],
      transcript: {
        content: 'b',
        type: 'interim'
      }
    }
  ],
  [
    {
      transcript: {
        groups: [],
        transcript: undefined
      },
      formState: formStates.READING_STATE
    },
    '',
    {
      groups: [],
      transcript: undefined
    }
  ]
])(
  '[redux-logic] interim transcript will be updated test cases',
  (initialStateKey, interimText, expectedTranscript) => {
    test(`[redux-logic] interim transcript will be added during reading to empty transcript redux`, async () => {
      const initialState = {
        [key]: initialStateKey
      };

      const store = createMockStore({
        initialState,
        reducer,
        logic
      });

      store.dispatch(speechRecognitionActions.interimUpdated(interimText));

      await store.whenComplete(() => {
        const transcript = selectors.transcript(store.getState());
        expect(transcript).toMatchObject(expectedTranscript);
      });
    });
  }
);

test(`[redux-logic] final transcript lastRecognisedWordIndex will be updated during reading`, async () => {
  const initialState = {
    [key]: {
      words: [
        { index: 0, word: 'a', isFinalRecognised: true },
        { index: 1, word: 'b' }
      ],
      transcript: {
        content: 'a',
        lastRecognisedWord: { index: 0, word: 'a', isFinalRecognised: true },
        recognisedWords: [{ index: 0, word: 'a' }],
        transcriptType: 'final',
        groups: [{ index: 0, final: { transcriptType: 'final', content: 'a' } }]
      },
      formState: formStates.READING_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  store.dispatch(speechRecognitionActions.finalUpdated('b'));

  await store.whenComplete(() => {
    const transcript = selectors.transcript(store.getState());
    expect(transcript).toMatchObject({
      content: 'a',
      groups: [
        { index: 0, final: { content: 'a', transcriptType: 'final' } },
        {
          index: 1,
          final: [
            {
              content: 'b',
              lastRecognisedWord: {
                index: 0,
                isFinalRecognised: true,
                word: 'a'
              },
              recognisedWords: [{ index: 1, word: 'b' }],
              type: 'final'
            }
          ]
        }
      ],
      lastRecognisedWord: { index: 0, isFinalRecognised: true, word: 'a' },
      recognisedWords: [{ index: 1, word: 'b' }],
      transcript: {
        content: 'b',
        lastRecognisedWord: { index: 0, isFinalRecognised: true, word: 'a' },
        recognisedWords: [{ index: 1, word: 'b' }],
        type: 'final'
      },
      transcriptType: 'final'
    });
  });
});

test(`[redux-logic] finalUpdated, finishReading invoked, formStatus will become REVIEW_STATE  `, async () => {
  const initialState = {
    [key]: {
      words: [{ index: 0, word: 'a' }],
      formState: formStates.READING_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  store.dispatch(speechRecognitionActions.finalUpdated('a'));

  await store.whenComplete(() => {
    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.REVIEW_STATE);
  });
});

test(`[redux-logic] interimUpdated, finishReading invoked, formStatus will become REVIEW_STATE, latest interim words will become final`, async () => {
  const initialState = {
    [key]: {
      words: [{ index: 0, word: 'a' }],
      formState: formStates.READING_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  store.dispatch(speechRecognitionActions.interimUpdated('a'));

  await store.whenComplete(() => {
    const formState = selectors.formState(store.getState());
    expect(formState).toEqual(formStates.REVIEW_STATE);

    const words = selectors.words(store.getState());
    expect(words).toMatchObject([
      {
        index: 0,
        word: 'a',
        isInterimRecognised: true,
        isFinalRecognised: true
      }
    ]);
  });
});

test(`[redux-logic] skipWord invoked `, async () => {
  const initialState = {
    [key]: {
      words: [
        { index: 0, word: 'a', isInterimRecognised: true },
        { index: 1, word: 'b' }
      ],
      formState: formStates.READING_STATE
    }
  };

  const store = createMockStore({
    initialState,
    reducer,
    logic
  });

  store.dispatch(actions.skipWord());

  await store.whenComplete(() => {
    const words = selectors.words(store.getState());
    expect(words).toEqual([
      {
        index: 0,
        word: 'a',
        isInterimRecognised: true,
        isFinalRecognised: true
      },
      { index: 1, word: 'b', isFinalRecognised: true, isNotRecognisedCount: 1 }
    ]);
  });
});
