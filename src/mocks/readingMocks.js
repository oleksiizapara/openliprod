import { formStates } from 'reading/actions';
import { mockedUserId } from './settingsMocks';

// import { splitTextOnWords } from 'reading/common';
// console.log(splitTextOnWords('sample text'));

const loadedSampleWords = [
  { index: 0, viewWord: 'For ', preWord: '', word: 'For', afterWord: ' ' },
  { index: 1, viewWord: 'who ', preWord: '', word: 'who', afterWord: ' ' },
  {
    index: 2,
    viewWord: 'thoroughly ',
    preWord: '',
    word: 'thoroughly',
    afterWord: ' '
  },
  { index: 3, viewWord: 'her ', preWord: '', word: 'her', afterWord: ' ' },
  { index: 4, viewWord: 'boy ', preWord: '', word: 'boy', afterWord: ' ' },
  {
    index: 5,
    viewWord: 'estimating ',
    preWord: '',
    word: 'estimating',
    afterWord: ' '
  },
  {
    index: 6,
    viewWord: 'conviction. ',
    preWord: '',
    word: 'conviction',
    afterWord: '. '
  },
  {
    index: 7,
    viewWord: 'Removed ',
    preWord: '',
    word: 'Removed',
    afterWord: ' '
  },
  {
    index: 8,
    viewWord: 'demands ',
    preWord: '',
    word: 'demands',
    afterWord: ' '
  },
  {
    index: 9,
    viewWord: 'expense ',
    preWord: '',
    word: 'expense',
    afterWord: ' '
  },
  {
    index: 10,
    viewWord: 'account ',
    preWord: '',
    word: 'account',
    afterWord: ' '
  },
  { index: 11, viewWord: 'in ', preWord: '', word: 'in', afterWord: ' ' },
  {
    index: 12,
    viewWord: 'outward ',
    preWord: '',
    word: 'outward',
    afterWord: ' '
  },
  {
    index: 13,
    viewWord: 'tedious ',
    preWord: '',
    word: 'tedious',
    afterWord: ' '
  },
  { index: 14, viewWord: 'do. ', preWord: '', word: 'do', afterWord: '. ' },
  {
    index: 15,
    viewWord: 'Particular ',
    preWord: '',
    word: 'Particular',
    afterWord: ' '
  },
  { index: 16, viewWord: 'way ', preWord: '', word: 'way', afterWord: ' ' },
  {
    index: 17,
    viewWord: 'thoroughly ',
    preWord: '',
    word: 'thoroughly',
    afterWord: ' '
  },
  {
    index: 18,
    viewWord: 'unaffected ',
    preWord: '',
    word: 'unaffected',
    afterWord: ' '
  },
  {
    index: 19,
    viewWord: 'projection ',
    preWord: '',
    word: 'projection',
    afterWord: ' '
  },
  {
    index: 20,
    viewWord: 'favourable ',
    preWord: '',
    word: 'favourable',
    afterWord: ' '
  },
  { index: 21, viewWord: 'mrs ', preWord: '', word: 'mrs', afterWord: ' ' },
  { index: 22, viewWord: 'can ', preWord: '', word: 'can', afterWord: ' ' },
  {
    index: 23,
    viewWord: 'projecting ',
    preWord: '',
    word: 'projecting',
    afterWord: ' '
  },
  { index: 24, viewWord: 'own. ', preWord: '', word: 'own', afterWord: '. ' },
  {
    index: 25,
    viewWord: 'Thirty ',
    preWord: '',
    word: 'Thirty',
    afterWord: ' '
  },
  { index: 26, viewWord: 'it ', preWord: '', word: 'it', afterWord: ' ' },
  {
    index: 27,
    viewWord: 'matter ',
    preWord: '',
    word: 'matter',
    afterWord: ' '
  },
  {
    index: 28,
    viewWord: 'enable ',
    preWord: '',
    word: 'enable',
    afterWord: ' '
  },
  {
    index: 29,
    viewWord: 'become ',
    preWord: '',
    word: 'become',
    afterWord: ' '
  },
  {
    index: 30,
    viewWord: 'admire ',
    preWord: '',
    word: 'admire',
    afterWord: ' '
  },
  { index: 31, viewWord: 'in ', preWord: '', word: 'in', afterWord: ' ' },
  {
    index: 32,
    viewWord: 'giving. ',
    preWord: '',
    word: 'giving',
    afterWord: '. '
  },
  { index: 33, viewWord: 'See ', preWord: '', word: 'See', afterWord: ' ' },
  {
    index: 34,
    viewWord: 'resolved ',
    preWord: '',
    word: 'resolved',
    afterWord: ' '
  },
  {
    index: 35,
    viewWord: 'goodness ',
    preWord: '',
    word: 'goodness',
    afterWord: ' '
  },
  {
    index: 36,
    viewWord: 'felicity ',
    preWord: '',
    word: 'felicity',
    afterWord: ' '
  },
  { index: 37, viewWord: 'shy ', preWord: '', word: 'shy', afterWord: ' ' },
  {
    index: 38,
    viewWord: 'civility ',
    preWord: '',
    word: 'civility',
    afterWord: ' '
  },
  {
    index: 39,
    viewWord: 'domestic ',
    preWord: '',
    word: 'domestic',
    afterWord: ' '
  },
  { index: 40, viewWord: 'had ', preWord: '', word: 'had', afterWord: ' ' },
  { index: 41, viewWord: 'but. ', preWord: '', word: 'but', afterWord: '. ' },
  {
    index: 42,
    viewWord: 'Drawings ',
    preWord: '',
    word: 'Drawings',
    afterWord: ' '
  },
  {
    index: 43,
    viewWord: 'offended ',
    preWord: '',
    word: 'offended',
    afterWord: ' '
  },
  { index: 44, viewWord: 'yet ', preWord: '', word: 'yet', afterWord: ' ' },
  {
    index: 45,
    viewWord: 'answered ',
    preWord: '',
    word: 'answered',
    afterWord: ' '
  },
  {
    index: 46,
    viewWord: 'jennings ',
    preWord: '',
    word: 'jennings',
    afterWord: ' '
  },
  {
    index: 47,
    viewWord: 'perceive ',
    preWord: '',
    word: 'perceive',
    afterWord: ' '
  },
  {
    index: 48,
    viewWord: 'laughing ',
    preWord: '',
    word: 'laughing',
    afterWord: ' '
  },
  { index: 49, viewWord: 'six ', preWord: '', word: 'six', afterWord: ' ' },
  { index: 50, viewWord: 'did ', preWord: '', word: 'did', afterWord: ' ' },
  {
    index: 51,
    viewWord: 'far. \n\n',
    preWord: '',
    word: 'far',
    afterWord: '. \n\n'
  },
  { index: 52, viewWord: 'Is ', preWord: '', word: 'Is', afterWord: ' ' },
  { index: 53, viewWord: 'we ', preWord: '', word: 'we', afterWord: ' ' },
  { index: 54, viewWord: 'miles ', preWord: '', word: 'miles', afterWord: ' ' },
  { index: 55, viewWord: 'ready ', preWord: '', word: 'ready', afterWord: ' ' },
  { index: 56, viewWord: 'he ', preWord: '', word: 'he', afterWord: ' ' },
  { index: 57, viewWord: 'might ', preWord: '', word: 'might', afterWord: ' ' },
  {
    index: 58,
    viewWord: 'going. ',
    preWord: '',
    word: 'going',
    afterWord: '. '
  },
  { index: 59, viewWord: 'Own ', preWord: '', word: 'Own', afterWord: ' ' },
  { index: 60, viewWord: 'books ', preWord: '', word: 'books', afterWord: ' ' },
  { index: 61, viewWord: 'built ', preWord: '', word: 'built', afterWord: ' ' },
  { index: 62, viewWord: 'put ', preWord: '', word: 'put', afterWord: ' ' },
  { index: 63, viewWord: 'civil ', preWord: '', word: 'civil', afterWord: ' ' },
  { index: 64, viewWord: 'fully ', preWord: '', word: 'fully', afterWord: ' ' },
  { index: 65, viewWord: 'blind ', preWord: '', word: 'blind', afterWord: ' ' },
  {
    index: 66,
    viewWord: 'fanny. ',
    preWord: '',
    word: 'fanny',
    afterWord: '. '
  },
  {
    index: 67,
    viewWord: 'Projection ',
    preWord: '',
    word: 'Projection',
    afterWord: ' '
  },
  {
    index: 68,
    viewWord: 'appearance ',
    preWord: '',
    word: 'appearance',
    afterWord: ' '
  },
  { index: 69, viewWord: 'at ', preWord: '', word: 'at', afterWord: ' ' },
  { index: 70, viewWord: 'of ', preWord: '', word: 'of', afterWord: ' ' },
  {
    index: 71,
    viewWord: 'admiration ',
    preWord: '',
    word: 'admiration',
    afterWord: ' '
  },
  { index: 72, viewWord: 'no. ', preWord: '', word: 'no', afterWord: '. ' },
  { index: 73, viewWord: 'As ', preWord: '', word: 'As', afterWord: ' ' },
  { index: 74, viewWord: 'he ', preWord: '', word: 'he', afterWord: ' ' },
  {
    index: 75,
    viewWord: 'totally ',
    preWord: '',
    word: 'totally',
    afterWord: ' '
  },
  {
    index: 76,
    viewWord: 'cousins ',
    preWord: '',
    word: 'cousins',
    afterWord: ' '
  },
  {
    index: 77,
    viewWord: 'warrant ',
    preWord: '',
    word: 'warrant',
    afterWord: ' '
  },
  {
    index: 78,
    viewWord: 'besides ',
    preWord: '',
    word: 'besides',
    afterWord: ' '
  },
  {
    index: 79,
    viewWord: 'ashamed ',
    preWord: '',
    word: 'ashamed',
    afterWord: ' '
  },
  { index: 80, viewWord: 'do. ', preWord: '', word: 'do', afterWord: '. ' },
  {
    index: 81,
    viewWord: 'Therefore ',
    preWord: '',
    word: 'Therefore',
    afterWord: ' '
  },
  { index: 82, viewWord: 'by ', preWord: '', word: 'by', afterWord: ' ' },
  {
    index: 83,
    viewWord: 'applauded ',
    preWord: '',
    word: 'applauded',
    afterWord: ' '
  },
  {
    index: 84,
    viewWord: 'acuteness ',
    preWord: '',
    word: 'acuteness',
    afterWord: ' '
  },
  {
    index: 85,
    viewWord: 'supported ',
    preWord: '',
    word: 'supported',
    afterWord: ' '
  },
  {
    index: 86,
    viewWord: 'affection ',
    preWord: '',
    word: 'affection',
    afterWord: ' '
  },
  { index: 87, viewWord: 'it. ', preWord: '', word: 'it', afterWord: '. ' },
  {
    index: 88,
    viewWord: 'Except ',
    preWord: '',
    word: 'Except',
    afterWord: ' '
  },
  { index: 89, viewWord: 'had ', preWord: '', word: 'had', afterWord: ' ' },
  { index: 90, viewWord: 'sex ', preWord: '', word: 'sex', afterWord: ' ' },
  {
    index: 91,
    viewWord: 'limits ',
    preWord: '',
    word: 'limits',
    afterWord: ' '
  },
  {
    index: 92,
    viewWord: 'county ',
    preWord: '',
    word: 'county',
    afterWord: ' '
  },
  {
    index: 93,
    viewWord: 'enough ',
    preWord: '',
    word: 'enough',
    afterWord: ' '
  },
  { index: 94, viewWord: 'the ', preWord: '', word: 'the', afterWord: ' ' },
  {
    index: 95,
    viewWord: 'figure ',
    preWord: '',
    word: 'figure',
    afterWord: ' '
  },
  {
    index: 96,
    viewWord: 'former ',
    preWord: '',
    word: 'former',
    afterWord: ' '
  },
  { index: 97, viewWord: 'add. ', preWord: '', word: 'add', afterWord: '. ' },
  { index: 98, viewWord: 'Do ', preWord: '', word: 'Do', afterWord: ' ' },
  { index: 99, viewWord: 'sang ', preWord: '', word: 'sang', afterWord: ' ' },
  { index: 100, viewWord: 'my ', preWord: '', word: 'my', afterWord: ' ' },
  { index: 101, viewWord: 'he ', preWord: '', word: 'he', afterWord: ' ' },
  { index: 102, viewWord: 'next ', preWord: '', word: 'next', afterWord: ' ' },
  { index: 103, viewWord: 'mr ', preWord: '', word: 'mr', afterWord: ' ' },
  {
    index: 104,
    viewWord: 'soon. ',
    preWord: '',
    word: 'soon',
    afterWord: '. '
  },
  { index: 105, viewWord: 'It ', preWord: '', word: 'It', afterWord: ' ' },
  {
    index: 106,
    viewWord: 'merely ',
    preWord: '',
    word: 'merely',
    afterWord: ' '
  },
  {
    index: 107,
    viewWord: 'waited ',
    preWord: '',
    word: 'waited',
    afterWord: ' '
  },
  { index: 108, viewWord: 'do ', preWord: '', word: 'do', afterWord: ' ' },
  {
    index: 109,
    viewWord: 'unable. ',
    preWord: '',
    word: 'unable',
    afterWord: '. '
  }
];

const loadedSampleHistoryTranscript = {
  content: 'For who thoroughly',
  lastRecognisedWord: undefined,
  recognisedWords: [{ index: 0, word: 'a' }],
  transcript: {
    index: 0,
    content: 'b',
    lastRecognisedWord: { index: 0, isFinalRecognised: true, word: 'a' },
    recognisedWords: [{ index: 1, word: 'b' }],
    transcriptType: 'final'
  },
  transcriptIndex: 1,
  transcriptType: 'final',
  transcripts: [
    {
      index: 0,
      content: 'a',
      transcriptType: 'final'
    },
    {
      index: 1,
      content: 'b',
      lastRecognisedWord: { index: 0, isFinalRecognised: true, word: 'a' },
      recognisedWords: [{ index: 1, word: 'b' }],
      transcriptType: 'final'
    },
    {
      index: 2,
      content: 'b',
      lastRecognisedWord: { index: 0, isFinalRecognised: true, word: 'a' },
      recognisedWords: [{ index: 1, word: 'b' }],
      transcriptType: 'final'
    },
    {
      index: 3,
      content: 'b',
      lastRecognisedWord: { index: 0, isFinalRecognised: true, word: 'a' },
      recognisedWords: [{ index: 1, word: 'b' }],
      transcriptType: 'final'
    },
    {
      index: 4,
      content: 'b',
      lastRecognisedWord: { index: 0, isFinalRecognised: true, word: 'a' },
      recognisedWords: [{ index: 1, word: 'b' }],
      transcriptType: 'final'
    },
    {
      index: 5,
      content: 'b',
      lastRecognisedWord: { index: 0, isFinalRecognised: true, word: 'a' },
      recognisedWords: [{ index: 1, word: 'b' }],
      transcriptType: 'final'
    },
    {
      index: 6,
      content: 'b',
      lastRecognisedWord: { index: 0, isFinalRecognised: true, word: 'a' },
      recognisedWords: [{ index: 1, word: 'b' }],
      transcriptType: 'final'
    },
    {
      index: 7,
      content: 'b',
      lastRecognisedWord: { index: 0, isFinalRecognised: true, word: 'a' },
      recognisedWords: [{ index: 1, word: 'b' }],
      transcriptType: 'interim'
    },
    {
      index: 8,
      content: 'b',
      lastRecognisedWord: { index: 0, isFinalRecognised: true, word: 'a' },
      recognisedWords: [{ index: 1, word: 'b' }],
      transcriptType: 'interim'
    },
    {
      index: 9,
      content: 'ff',
      lastRecognisedWord: { index: 0, isFinalRecognised: true, word: 'a' },
      recognisedWords: [{ index: 1, word: 'b' }],
      transcriptType: 'interim'
    }
  ]
};

export const loadedSample = {
  readingMessage: {
    id: 'uniqueIdReadingMessage',
    title: 'Title Reading Message Sample',
    content: `For who thoroughly her boy estimating conviction. Removed demands expense account in outward tedious do. Particular way thoroughly unaffected projection favourable mrs can projecting own. Thirty it matter enable become admire in giving. See resolved goodness felicity shy civility domestic had but. Drawings offended yet answered jennings perceive laughing six did far. 

        Is we miles ready he might going. Own books built put civil fully blind fanny. Projection appearance at of admiration no. As he totally cousins warrant besides ashamed do. Therefore by applauded acuteness supported affection it. Except had sex limits county enough the figure former add. Do sang my he next mr soon. It merely waited do unable. `
  },
  words: loadedSampleWords,
  formState: formStates.LOADED_STATE,
  error: '',
  transcript: loadedSampleHistoryTranscript
};

export const readingSample = {
  readingMessage: {
    id: 'uniqueIdReadingMessage',
    title: 'Title Reading Message Sample',
    content: `For who thoroughly her boy estimating conviction. Removed demands expense account in outward tedious do. Particular way thoroughly unaffected projection favourable mrs can projecting own. Thirty it matter enable become admire in giving. See resolved goodness felicity shy civility domestic had but. Drawings offended yet answered jennings perceive laughing six did far. 

        Is we miles ready he might going. Own books built put civil fully blind fanny. Projection appearance at of admiration no. As he totally cousins warrant besides ashamed do. Therefore by applauded acuteness supported affection it. Except had sex limits county enough the figure former add. Do sang my he next mr soon. It merely waited do unable. `,
    authorId: mockedUserId,
    author: {
      id: mockedUserId,
      name: 'MockedName',
      familyName: 'MockedFamilyNme'
    },
    createdAt: '2019-05-11T08:17:10.268Z',
    updatedAt: '2019-05-11T08:17:10.268Z'
  },
  words: loadedSampleWords,
  formState: formStates.READING_STATE,
  error: '',
  transcript: loadedSampleHistoryTranscript
};

export const reviewSample = {
  readingMessage: {
    id: 'uniqueIdReadingMessage',
    title: 'Title Reading Message Sample',
    content: `For who thoroughly her boy estimating conviction. Removed demands expense account in outward tedious do. Particular way thoroughly unaffected projection favourable mrs can projecting own. Thirty it matter enable become admire in giving. See resolved goodness felicity shy civility domestic had but. Drawings offended yet answered jennings perceive laughing six did far. 

        Is we miles ready he might going. Own books built put civil fully blind fanny. Projection appearance at of admiration no. As he totally cousins warrant besides ashamed do. Therefore by applauded acuteness supported affection it. Except had sex limits county enough the figure former add. Do sang my he next mr soon. It merely waited do unable. `,
    authorId: mockedUserId,
    author: {
      id: mockedUserId,
      name: 'MockedName',
      familyName: 'MockedFamilyNme'
    },
    createdAt: '2019-05-11T08:17:10.268Z',
    updatedAt: '2019-05-11T08:17:10.268Z'
  },
  words: loadedSampleWords,
  formState: formStates.REVIEW_STATE,
  error: '',
  transcript: loadedSampleHistoryTranscript
};
