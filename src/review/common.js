import Enumerable from 'linq';

export const calculateTotalWordCount = words => words.length;

export const calculateReadingSpeed = words => {
  if (words.length <= 1) {
    return 0;
  }

  const firstWordTime = Enumerable.from(words)
    .where(x => x.time !== undefined)
    .first();
  const lastWordTime = Enumerable.from(words)
    .where(x => x.time !== undefined)
    .last();
  var ttw = calculateTotalWordCount(words);

  var result = Math.round(
    (calculateTotalWordCount(words) * 60 * 1000) /
      (lastWordTime.time - firstWordTime.time)
  );

  console.log({ lastWordTime, firstWordTime, ttw, result });

  return result;
};

const dirtyCalculateRecognisedWords = words => {
  return Enumerable.from(words)
    .where(x => !('isNotRecognisedCount' in x))
    .select(x => x.word)
    .distinct()
    .orderBy(x => x)
    .toArray();
};

export const calculateRecognisedWords = words => {
  return removeDuplicateWithCapitalLetters(
    Enumerable.from(dirtyCalculateRecognisedWords(words))
      .except(dirtyCalculateNotRecognisedWords(words))
      .toArray()
  );
};

const dirtyCalculateNotRecognisedWords = words => {
  return Enumerable.from(words)
    .where(x => x.isNotRecognisedCount > 0)
    .select(x => x.word)
    .distinct()
    .orderBy(x => x)
    .toArray();
};

export const calculateUniqueWords = words => {
  return Enumerable.from(words)
    .select(x => x.word)
    .distinct()
    .orderBy(x => x)
    .toArray();
};

const removeDuplicateWithCapitalLetters = words => {
  const lowCaseWords = Enumerable.from(words)
    .where(x => x.toLowerCase() === x)
    .toDictionary(x => x);

  return Enumerable.from(words)
    .where(
      x => x.toLowerCase() === x || !lowCaseWords.contains(x.toLowerCase())
    )
    .toArray();
};

export const calculateNotRecognisedWords = words => {
  return removeDuplicateWithCapitalLetters(
    Enumerable.from(dirtyCalculateNotRecognisedWords(words)).toArray()
  );
};

export const calculateTime = words => {
  return Enumerable.from(words)
    .where(x => x.time !== null)
    .orderBy(x => x.index)
    .last().time;
};

export const calculateRecognisedWordsPercent = words => {
  return (
    (calculateRecognisedWords(words).length /
      calculateUniqueWords(words).length) *
    100
  );
};
