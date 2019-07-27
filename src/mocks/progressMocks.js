import { formStates } from 'progress/actions';

export const loadingMock = {
  formState: formStates.LOADING_STATE
};

export const errorMock = {
  formState: formStates.ERROR_STATE,
  error: 'Review module does not working'
};

export const defaultMock = {
  formState: formStates.LOADED_STATE,
  error: '',
  readingMessageProgresses: [
    {
      orderId: 0,
      readingMessageId: 'testReadingMessageId',
      readingMessageTitle: 'Sample Title',
      readingMessageProgressUnits: [
        {
          readingMessageId: 'testReadingMessageId',
          time: 1564041987191 - 5 * 3600 * 1000,
          readingSpeed: 100,
          totalWords: 90,
          uniqueWords: ['uniqueWords1', 'uniqueWords2'],
          recognisedWords: ['recognisedWords1', 'recognisedWords2'],
          notRecognisedWords: ['notRecognisedWords1', 'notRecognisedWords2'],
          recognisedWordsPercent: 80
        },
        {
          readingMessageId: 'testReadingMessageId',
          time: 1564041987191 - 2 * 3600 * 1000,
          readingSpeed: 80,
          totalWords: 90,
          uniqueWords: ['uniqueWords3', 'uniqueWords4'],
          recognisedWords: ['recognisedWords3', 'recognisedWords4'],
          notRecognisedWords: ['notRecognisedWords3', 'notRecognisedWords4'],
          recognisedWordsPercent: 70
        }
      ],
      time: 1564041987191 - 2 * 3600
    },
    {
      orderId: 1,
      readingMessageId: 'testReadingMessageId',
      readingMessageTitle: 'Sample Title 2',
      readingMessageProgressUnits: [
        {
          readingMessageId: 'testReadingMessageId',
          time: 1564041987191 - 5 * 3600 * 1000,
          readingSpeed: 100,
          totalWords: 90,
          uniqueWords: ['uniqueWords1', 'uniqueWords2'],
          recognisedWords: ['recognisedWords1', 'recognisedWords2'],
          notRecognisedWords: ['notRecognisedWords1', 'notRecognisedWords2'],
          recognisedWordsPercent: 80
        },
        {
          readingMessageId: 'testReadingMessageId',
          time: 1564041987191 - 2 * 3600 * 1000,
          readingSpeed: 80,
          totalWords: 90,
          uniqueWords: ['uniqueWords3', 'uniqueWords4'],
          recognisedWords: ['recognisedWords3', 'recognisedWords4'],
          notRecognisedWords: ['notRecognisedWords3', 'notRecognisedWords4'],
          recognisedWordsPercent: 70
        }
      ],
      time: 1564041987191 - 1 * 3600
    }
  ],
  isCalculated: true,
  createdAt: '1564041987191',
  updatedAt: '1564041987191'
};
