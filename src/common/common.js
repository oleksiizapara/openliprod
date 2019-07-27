import produce from 'immer';
import Enumerable from 'linq';

export const readingMessagePrepareToSave = readingMessage => {
  return produce(readingMessage, draft => {
    delete draft.author;
  });
};

export const readingMessageHistoryPrepareToSave = history => {
  return produce(history, draft => {
    draft.words.forEach(word => {
      delete word.viewWord;
      delete word.preWord;
      delete word.afterWord;
      delete word.isInterimRecognised;
      delete word.isFinalRecognised;
    });
  });
};

export const calculateTotalPages = page => {
  return page.nextToken ? page.pageId + 1 : page.pageId;
};

export const createReadingMessageProgresses = readingMessageHistories => {
  return Enumerable.from(readingMessageHistories)
    .orderByDescending(x => x.time)
    .groupBy(x => x.readingMessageId)
    .select((x, i) => {
      const latestHistory = x.last();
      return {
        readingMessageId: latestHistory.readingMessageId,
        orderId: i,
        readingMessageTitle: latestHistory.title,
        time: latestHistory.time,
        readingMessageProgressUnits: x
          .select(y => {
            return {
              readingMessageId: y.readingMessageId,
              time: y.time,
              readingSpeed: y.readingSpeed,
              totalWords: y.totalWords,
              uniqueWords: y.uniqueWords,
              recognisedWords: y.recognisedWords,
              notRecognisedWords: y.notRecognisedWords,
              recognisedWordsPercent: y.recognisedWordsPercent
            };
          })
          .toArray()
      };
    })
    .toArray();
};

export const assertErrors = response => {
  if (response && response.errors && response.errors.length > 0) {
    throw new Error(response.errors.join('\n'));
  }

  return response;
};
