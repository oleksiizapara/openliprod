import { formStates } from 'review/actions';

export const loadingMock = {
  formState: formStates.LOADING_STATE
};

export const errorMock = {
  formState: formStates.ERROR_STATE,
  error: 'Review module does not working'
};

export const loadedMock = {
  formState: formStates.LOADED_STATE,
  error: '',

  words: [],
  readingMessageId: 'uniqueId',
  totalWords: 100,
  readingSpeed: 90,
  recognisedWords: [
    'spill',
    'underline',
    'implicit',
    'pleasant',
    'thick',
    'surprise',
    'ban',
    'progressive',
    'orgy',
    'mine',
    'mention',
    'session',
    'can',
    'reactor',
    'damage',
    'response',
    'nationalist',
    'remain',
    'triangle',
    'science',
    'aspect',
    'Koran',
    'rotten',
    'corner',
    'break',
    'heir',
    'false',
    'retiree',
    'economist',
    'exercise'
  ],
  notRecognisedWords: [
    'spill',
    'underline',
    'implicit',
    'pleasant',
    'thick',
    'surprise',
    'ban',
    'progressive',
    'orgy',
    'mine',
    'mention',
    'session',
    'can',
    'reactor',
    'damage',
    'response',
    'nationalist',
    'remain',
    'triangle',
    'science',
    'aspect',
    'Koran',
    'rotten',
    'corner',
    'break',
    'heir',
    'false',
    'retiree',
    'economist',
    'exercise'
  ]
};
