import {
  splitTextOnWords,
  recogniseWords,
  validateRecognisedWords,
  getTooltipWordIndex,
  calculateNotRecognisedWords,
  isEditable,
  finalizeWords,
  filterRecognisedWordIndexes
} from '../common';

describe.each([
  ['', []],
  ['1', [{ index: 0, word: '1', viewWord: '1', afterWord: '', preWord: '' }]],
  ['a', [{ index: 0, word: 'a', viewWord: 'a', afterWord: '', preWord: '' }]],
  [
    'a ',
    [{ index: 0, word: 'a', viewWord: 'a ', afterWord: ' ', preWord: '' }]
  ],
  [
    'a. ',
    [{ index: 0, word: 'a', viewWord: 'a. ', afterWord: '. ', preWord: '' }]
  ],
  [
    'a.b',
    [
      { index: 0, word: 'a', viewWord: 'a.', afterWord: '.', preWord: '' },
      { index: 1, word: 'b', viewWord: 'b', afterWord: '', preWord: '' }
    ]
  ],
  [
    'a-b',
    [
      { index: 0, word: 'a', viewWord: 'a-', afterWord: '-', preWord: '' },
      { index: 1, word: 'b', viewWord: 'b', afterWord: '', preWord: '' }
    ]
  ],
  ['.a', [{ index: 0, word: 'a', viewWord: '.a', afterWord: '', preWord: '.' }]]
])('', (text, expectedWords) => {
  test(`[reading common.js].splitTextOnWords '${text}'`, () => {
    const words = splitTextOnWords(text);
    expect(words).toEqual(expectedWords);
  });
});

describe.each([
  [[{ index: 0, word: 'a' }], [{ index: 0, word: 'b' }], [-1]],
  [[{ index: 0, word: 'a' }], [{ index: 0, word: 'a' }], [0]],
  [[{ index: 0, word: 'a' }], [{ index: 0, word: 'A' }], [0]],
  [[{ index: 0, word: 'A' }], [{ index: 0, word: 'a' }], [0]],
  [
    [{ index: 0, word: 'a' }, { index: 1, word: 'a' }],
    [{ index: 0, word: 'a' }],
    [0, -1]
  ],
  [
    [{ index: 0, word: 'a' }, { index: 1, word: 'b' }],
    [{ index: 0, word: 'a' }],
    [0, -1]
  ],
  [
    [{ index: 0, word: 'b' }, { index: 1, word: 'a' }],
    [{ index: 0, word: 'a' }],
    [-1, 0]
  ],
  [
    [{ index: 0, word: 'a' }, { index: 1, word: 'b' }, { index: 2, word: 'c' }],
    [{ index: 0, word: 'b' }, { index: 1, word: 'c' }],
    [-1, 0, 1]
  ],
  [
    [{ index: 0, word: 'c' }, { index: 1, word: 'b' }, { index: 2, word: 'a' }],
    [{ index: 0, word: 'a' }, { index: 1, word: 'b' }],
    [-1, 1, 0]
  ]
])('', (words, possibleRecognisedWords, expectedRecognisedWordIndexes) => {
  test(`[reading common.js].recogniseWords '${words}'`, () => {
    const recognisedWordIndexes = recogniseWords(
      words,
      possibleRecognisedWords
    );
    expect(recognisedWordIndexes).toEqual(expectedRecognisedWordIndexes);
  });
});

describe.each([
  [[], []],
  [[0], [0]],
  [[-1], [-1]],
  [[1], [1]],
  [[0, 1], [0, 1]],
  [[0, -1], [0, -1]],
  [[0, -1, -1], [0, -1, -1]],
  [[0, 1, -1], [0, 1, -1]],
  [[0, -1, 1], [0, -1, 1]],
  [[-1, 0, 1], [-1, 0, 1]],
  [[-1, 1, 2], [-1, 1, 2]],
  [[-1, 2, 1], [-1, -1, -1]],
  [[1, 1, 2], [-1, -1, -1]],
  [[-1, 1, 2, 3], [-1, 1, 2, 3]]
])('bla bla', (recognisedWords, expectedValidatedWords) => {
  test(`[reading common.js].validateRecognisedWords ${JSON.stringify(
    recognisedWords
  )} ${JSON.stringify(expectedValidatedWords)}`, () => {
    const validatedWords = validateRecognisedWords(recognisedWords);
    expect(validatedWords).toEqual(expectedValidatedWords);
  });
});

describe.each([
  [[], -1],
  [[{ index: 0, word: 'e' }], 0],
  [[{ index: 0, word: 'e', isFinalRecognised: true }], 0],
  [
    [{ index: 0, word: 'e', isFinalRecognised: true }, { index: 1, word: 'e' }],
    0
  ],
  [
    [
      { index: 0, word: 'e', isFinalRecognised: true },
      { index: 1, word: 'e', isInterimRecognised: true }
    ],
    0
  ],
  [
    [
      { index: 0, word: 'e', isFinalRecognised: true },
      { index: 1, word: 'e', isInterimRecognised: true },
      { index: 2, word: 'e', isFinalRecognised: true },
      { index: 3, word: 'e' }
    ],
    2
  ],
  [
    [
      { index: 0, word: 'e', isFinalRecognised: true },
      { index: 1, word: 'e', isInterimRecognised: true },
      { index: 2, word: 'e', isFinalRecognised: true },
      { index: 3, word: 'e', isInterimRecognised: true }
    ],
    2
  ]
])(`[redux-logic] getTooltipWordIndex`, (words, expectedIndex) => {
  test(`[redux-logic] getTooltipWordIndex ${JSON.stringify(
    words
  )} expectedIndex = ${expectedIndex}`, () => {
    const index = getTooltipWordIndex(words);
    expect(index).toEqual(expectedIndex);
  });
});

describe.each([
  [[], [], []],
  [[], [-1], []],
  [[{ word: 'a', index: 0 }], [-1], [0]],

  [[{ word: 'a', index: 99 }], [-1], [99]],

  [[{ word: 'a', index: 2 }], [2], []]
])(
  `[redux-logic] calculateNotRecognisedWords`,
  (words, recognisedWordIndexes, notRecognisedWordIndexes) => {
    test(`[redux-logic] calculateNotRecognisedWords words : ${JSON.stringify(
      words
    )}`, () => {
      const calculatedNotRecognisedWordIndexes = calculateNotRecognisedWords(
        words,
        recognisedWordIndexes
      );
      expect(calculatedNotRecognisedWordIndexes).toEqual(
        notRecognisedWordIndexes
      );
    });
  }
);

describe.each([
  [undefined, undefined, false],
  [{ authorId: 'uniqueId' }, undefined, false],
  [{ authorId: 'uniqueId' }, { id: 'uniqueId' }, true]
])(
  `[redux-logic] isEditable reading Message`,
  (readingMessage, user, expectedResult) => {
    test(`[redux-logic] IsEditable message: ${JSON.stringify(
      readingMessage
    )}, user: ${JSON.stringify(user)}`, () => {
      const result = isEditable(readingMessage, user);
      expect(result).toEqual(expectedResult);
    });
  }
);

describe.each([
  [
    [
      { word: 'a', index: 0 },
      { word: 'b', index: 1, isInterimRecognised: true }
    ],
    [
      { word: 'a', index: 0, isNotRecognisedCount: 1 },
      {
        word: 'b',
        index: 1,
        isInterimRecognised: true,
        isFinalRecognised: true
      }
    ]
  ],
  [
    [
      { word: 'a', index: 0, isNotRecognisedCount: 1 },
      { word: 'b', index: 1, isInterimRecognised: true }
    ],
    [
      { word: 'a', index: 0, isNotRecognisedCount: 2 },
      {
        word: 'b',
        index: 1,
        isInterimRecognised: true,
        isFinalRecognised: true
      }
    ]
  ],
  [[], []],
  [[{ word: 'a', index: 0 }], [{ word: 'a', index: 0 }]],
  [
    [{ word: 'a', index: 0, isInterimRecognised: true }],
    [
      {
        word: 'a',
        index: 0,
        isInterimRecognised: true,
        isFinalRecognised: true
      }
    ]
  ]
])(`[redux-logic] finalizeWords test`, (words, expectedResult) => {
  test(`[redux-logic] finalizeWords words: ${JSON.stringify(words)}`, () => {
    const result = finalizeWords(words);
    expect(result).toEqual(expectedResult);
  });
});

describe.each([
  [[0], [{ index: 0 }], [0]],
  [[], [], []],
  [[0, -1], [{ index: 0 }], [0]],
  [
    [-1, 1, 2, 3, -1],
    [{ index: 0 }, { index: 1 }, { index: 2 }, { index: 3 }],
    [-1, 1, 2, 3]
  ]
])(
  '',
  (
    rawRecogniseWordIndexes,
    transcriptWords,
    expectedFilteredRawRecogniseWordIndexes
  ) => {
    test(`[reading common.js] filterRecognisedWords ${JSON.stringify(
      rawRecogniseWordIndexes
    )} ${JSON.stringify(transcriptWords)}`, () => {
      const filteredRawRecogniseWordIndexes = filterRecognisedWordIndexes(
        rawRecogniseWordIndexes,
        transcriptWords
      );
      expect(filteredRawRecogniseWordIndexes).toEqual(
        expectedFilteredRawRecogniseWordIndexes
      );
    });
  }
);
