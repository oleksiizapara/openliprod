import {
  calculateTotalWordCount,
  calculateReadingSpeed,
  calculateRecognisedWords,
  calculateNotRecognisedWords
} from '../common';

describe.each([[[], 0], [[{}], 1]])('', (words, wordCount) => {
  test(`Calculate Total Word Count, words: ${JSON.stringify(
    words
  )}, totalLength: ${wordCount}`, () => {
    const calculatedTotalWordCount = calculateTotalWordCount(words);

    expect(calculatedTotalWordCount).toEqual(wordCount);
  });
});

describe.each([
  [[{ time: 1000 }], 0],
  [[{ time: 1000 }, { time: 3000 }], 60],
  [[{ time: 1000 }, { time: 4500 }], 34],
  [[{ time: 1000 }, { time: 2000 }, { time: 4000 }], 60],
  [[{ time: 1000 }, { time: 2000 }, { time: 4000 }, {}], 60],
  [
    [
      {
        index: 0,
        viewWord: 'First, ',
        preWord: '',
        word: 'First',
        afterWord: ', ',
        isNotRecognisedCount: 14
      },
      {
        index: 1,
        viewWord: 'I ',
        preWord: '',
        word: 'I',
        afterWord: ' ',
        isInterimRecognised: true,
        time: 1568163064934,
        isFinalRecognised: true
      },
      {
        index: 2,
        viewWord: 'wake ',
        preWord: '',
        word: 'wake',
        afterWord: ' ',
        isInterimRecognised: true,
        time: 1568163064934,
        isFinalRecognised: true
      },
      {
        index: 3,
        viewWord: 'up. ',
        preWord: '',
        word: 'up',
        afterWord: '. ',
        isInterimRecognised: true,
        time: 1568163064934,
        isFinalRecognised: true
      },
      {
        index: 4,
        viewWord: 'Then, ',
        preWord: '',
        word: 'Then',
        afterWord: ', ',
        isFinalRecognised: true,
        time: 1568163069471
      },
      {
        index: 5,
        viewWord: 'I ',
        preWord: '',
        word: 'I',
        afterWord: ' ',
        isInterimRecognised: true,
        time: 1568163066691,
        isFinalRecognised: true
      },
      {
        index: 6,
        viewWord: 'get ',
        preWord: '',
        word: 'get',
        afterWord: ' ',
        isFinalRecognised: true,
        time: 1568163069471
      },
      {
        index: 7,
        viewWord: 'dressed. ',
        preWord: '',
        word: 'dressed',
        afterWord: '. ',
        isFinalRecognised: true,
        time: 1568163069471
      },
      {
        index: 8,
        viewWord: 'I ',
        preWord: '',
        word: 'I',
        afterWord: ' ',
        isNotRecognisedCount: 2,
        isInterimRecognised: true,
        time: 1568163071262,
        isFinalRecognised: true
      },
      {
        index: 9,
        viewWord: 'walk ',
        preWord: '',
        word: 'walk',
        afterWord: ' ',
        isInterimRecognised: true,
        time: 1568163071550,
        isFinalRecognised: true
      },
      {
        index: 10,
        viewWord: 'to ',
        preWord: '',
        word: 'to',
        afterWord: ' ',
        isInterimRecognised: true,
        time: 1568163071724,
        isFinalRecognised: true
      },
      {
        index: 11,
        viewWord: 'school. ',
        preWord: '',
        word: 'school',
        afterWord: '. ',
        isInterimRecognised: true,
        time: 1568163071999,
        isFinalRecognised: true
      },
      {
        index: 12,
        viewWord: 'I ',
        preWord: '',
        word: 'I',
        afterWord: ' ',
        isInterimRecognised: true,
        time: 1568163073501,
        isFinalRecognised: true
      },
      {
        index: 13,
        viewWord: 'do ',
        preWord: '',
        word: 'do',
        afterWord: ' ',
        isInterimRecognised: true,
        time: 1568163074046,
        isFinalRecognised: true
      }
    ],
    80
  ]
])('', (words, readingSpeed) => {
  test(`calculate Reading Speed, words: ${JSON.stringify(
    words
  )}, totalLength: ${readingSpeed}`, () => {
    const calculatedReadingSpeed = calculateReadingSpeed(words);

    expect(calculatedReadingSpeed).toEqual(readingSpeed);
  });
});

describe.each([
  [[{ word: 'a' }, { word: 'A' }], ['a']],
  [[], []],
  [[{ word: 'a' }], ['a']],
  [[{ word: 'a' }, { word: 'a' }], ['a']],
  [[{ word: 'b' }, { word: 'a' }], ['a', 'b']],
  [[{ word: 'a', isNotRecognisedCount: 1 }], []],
  [[{ word: 'a' }, { word: 'a', isNotRecognisedCount: 1 }], []]
])('', (words, recognisedWords) => {
  test(`calculate Recognised Words, words: ${JSON.stringify(words)}`, () => {
    const calculatedRecognisedWords = calculateRecognisedWords(words);

    expect(calculatedRecognisedWords).toEqual(recognisedWords);
  });
});

describe.each([
  [
    [
      { word: 'a', isNotRecognisedCount: 1 },
      { word: 'A', isNotRecognisedCount: 1 }
    ],
    ['a']
  ],
  [[], []],
  [[{ word: 'a' }], []],
  [[{ word: 'a', isNotRecognisedCount: 1 }], ['a']],
  [
    [
      { word: 'a', isNotRecognisedCount: 1 },
      { word: 'a', isNotRecognisedCount: 1 }
    ],
    ['a']
  ],
  [
    [
      { word: 'b', isNotRecognisedCount: 1 },
      { word: 'a', isNotRecognisedCount: 1 }
    ],
    ['a', 'b']
  ],
  [[{ word: 'a' }, { word: 'a', isNotRecognisedCount: 1 }], ['a']]
])('', (words, notRecognisedWords) => {
  test(`calculate Recognised Words, words: ${JSON.stringify(words)}`, () => {
    const calculatedNotRecognisedWords = calculateNotRecognisedWords(words);

    expect(calculatedNotRecognisedWords).toEqual(notRecognisedWords);
  });
});
