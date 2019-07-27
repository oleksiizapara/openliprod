import Enumerable from 'linq';
import produce from 'immer';
import uuid from 'uuid/v4';

import { actionTypes as speechRecognitionActionTypes } from 'speechRecognition/actions';
import { transcriptTypes } from './actions';

export const splitTextOnWords = text => {
  if (text) {
    var viewWords = text.match(/[\w]+[^\w]*/g);
    const words = viewWords.map((rawViewWord, index) => {
      const word = rawViewWord.match(/[\w]+/g)[0];
      const preWord = index === 0 ? text.substring(0, text.indexOf(word)) : '';
      const afterWord = rawViewWord.substring(word.length, rawViewWord.length);
      const viewWord = preWord + rawViewWord;
      return {
        index: index,
        viewWord: viewWord,
        preWord: preWord,
        word: word,
        afterWord: afterWord
      };
    });

    return words;
  }

  return [];
};

export const recogniseWords = (words, possibleRecognisedWords) => {
  const possibleRecognisedWordDictionary = Enumerable.from(
    possibleRecognisedWords
  )
    .groupBy('$.word', '$', (key, group) => {
      return {
        recognisedWord: key.toLowerCase(),
        words: group.orderByDescending('$.index').toArray()
      };
    })
    .toDictionary('$.recognisedWord', '$.words');

  const tempList = Enumerable.from(words).select(x => {
    const recognisedWords = possibleRecognisedWordDictionary.get(
      x.word.toLowerCase()
    );
    const recognisedWord = recognisedWords ? recognisedWords.pop() : '';
    return {
      word: x,
      recognisedWords: recognisedWords,
      recognisedWord: recognisedWord
    };
  });

  var recWords = [];
  Enumerable.from(tempList).forEach(x => {
    if (x.recognisedWord) {
      recWords = [...recWords, x.recognisedWord.index];
    } else {
      recWords = [...recWords, -1];
    }
  });

  return recWords;
};

export const filterRecognisedWordIndexes = (
  rawRecogniseWordIndexes,
  transcriptWords
) => {
  if (transcriptWords.length === 0) {
    return rawRecogniseWordIndexes;
  }

  const maxTranscriptWordIndex = Enumerable.from(transcriptWords).max(
    x => x.index
  );
  const tailTrimmedRecognisedWordIndexes = Enumerable.from(
    rawRecogniseWordIndexes
  )
    .reverse()
    .skipWhile(x => x === -1)
    .reverse();

  if (
    maxTranscriptWordIndex === tailTrimmedRecognisedWordIndexes.lastOrDefault()
  ) {
    return tailTrimmedRecognisedWordIndexes.toArray();
  }

  return rawRecogniseWordIndexes;
};

export const validateRecognisedWords = recognisedWords => {
  const startedRecognisedWords = Enumerable.from(recognisedWords).takeWhile(
    x => x !== -1
  );
  const isStartedWithRecognisedWords =
    startedRecognisedWords.count() > 0 &&
    startedRecognisedWords.all(x => x !== -1);

  const unrecognisedWordsCount = Enumerable.from(recognisedWords)
    .where(x => x === -1)
    .count();

  const allUnrecognisedWords = Enumerable.from(recognisedWords)
    // eslint-disable-next-line no-unused-vars
    .select(x => -1)
    .toArray();

  const allRecognisedWords = Enumerable.from(recognisedWords)
    .where(x => x !== -1)
    .toArray();

  if (
    recognisedWords.length > 0 &&
    (unrecognisedWordsCount === 0 ||
      recognisedWords.length / unrecognisedWordsCount >= 3 ||
      isStartedWithRecognisedWords)
  ) {
    for (var i = 0; i < allRecognisedWords.length - 1; i++) {
      if (allRecognisedWords[i + 1] <= allRecognisedWords[i]) {
        return allUnrecognisedWords;
      }
    }

    return recognisedWords;
  }

  return allUnrecognisedWords;
};

export const getTooltipWordIndex = words => {
  var index = words.length > 0 ? 0 : -1;

  for (var i = 0; i < words.length; i++) {
    if (
      'isFinalRecognised' in words[i] &&
      words[i].isFinalRecognised === true
    ) {
      index = i;
    }
  }

  return index;
};

export const calculateNotRecognisedWords = (words, recognisedWordIndexes) => {
  return words.length > 0 &&
    recognisedWordIndexes.length > 0 &&
    recognisedWordIndexes[0] === -1
    ? [words[0].index]
    : [];
};

export const updateTranscript = (
  action,
  transcript,
  lastRecognisedWord,
  recognisedWords
) => {
  var newTranscript = undefined;
  if (action.type === speechRecognitionActionTypes.FINAL_UPDATED) {
    newTranscript = {
      type: transcriptTypes.final,
      content: action.payload.finalTranscript,
      lastRecognisedWord,
      recognisedWords,
      key: uuid()
    };
  }
  if (action.type === speechRecognitionActionTypes.INTERIM_UPDATED) {
    newTranscript = {
      type: transcriptTypes.interim,
      content: action.payload.interimTranscript,
      lastRecognisedWord,
      recognisedWords,
      key: uuid()
    };
  }

  if (transcript && newTranscript && newTranscript.content !== '') {
    const updatedTranscript = produce(transcript, draft => {
      addTranscriptToGroup(newTranscript, draft.groups);
      draft.transcript = newTranscript;
      draft.lastRecognisedWord = lastRecognisedWord;
      draft.recognisedWords = recognisedWords;
    });
    return updatedTranscript;
  }

  return undefined;
};

export const addTranscriptToGroup = (newTranscript, groups) => {
  if (
    newTranscript.type === transcriptTypes.interim &&
    (groups.length === 0 || groups[groups.length - 1].final)
  ) {
    groups.push({ index: groups.length, interim: [newTranscript] });
  } else if (newTranscript.type === transcriptTypes.interim) {
    groups[groups.length - 1].interim.push(newTranscript);
  } else if (
    newTranscript.type === transcriptTypes.final &&
    !groups[groups.length - 1].final
  ) {
    groups[groups.length - 1].final = newTranscript;
  } else if (newTranscript.type === transcriptTypes.final) {
    groups.push({ index: groups.length, final: [newTranscript] });
  }

  return groups;
};

export const isEditable = (readingMessage, user) => {
  return !!(readingMessage && user && readingMessage.authorId == user.id);
};

export const finalizeWords = words => {
  return produce(words, draft => {
    const draftEnumerable = Enumerable.from(draft);

    draftEnumerable
      .where(x => x.isInterimRecognised && !x.isFinalRecognised)
      .toArray()
      .forEach(x => {
        x.isFinalRecognised = true;
      });

    const lastFinalRecognised = draftEnumerable.lastOrDefault(
      x => x.isFinalRecognised
    );
    if (lastFinalRecognised) {
      draftEnumerable
        .where(
          x => x.index <= lastFinalRecognised.index && !x.isFinalRecognised
        )
        .forEach(x => {
          x.isNotRecognisedCount = !x.isNotRecognisedCount
            ? 1
            : x.isNotRecognisedCount + 1;
        });
    }
  });
};

export const calculateLastRecognisedWord = words =>
  Enumerable.from(words).lastOrDefault(x => x.isFinalRecognised);

export const calculateSkipWord = words => {
  const lastRecognisedWord = calculateLastRecognisedWord(words);

  return produce(words, draft => {
    if (lastRecognisedWord && lastRecognisedWord.index + 1 < words.length) {
      draft[lastRecognisedWord.index + 1].isFinalRecognised = true;

      if (!draft[lastRecognisedWord.index + 1].isNotRecognisedCount) {
        draft[lastRecognisedWord.index + 1].isNotRecognisedCount = 1;
      } else {
        draft[lastRecognisedWord.index + 1].isNotRecognisedCount++;
      }
    }
  });
};

export const isFinishedReading = words => {
  const latestWord = Enumerable.from(words).lastOrDefault();
  return (
    latestWord &&
    (latestWord.isInterimRecognised || latestWord.isFinalRecognised)
  );
};
