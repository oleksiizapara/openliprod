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
  [[{ time: 1000 }, { time: 2000 }, { time: 4000 }, {}], 80]
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
