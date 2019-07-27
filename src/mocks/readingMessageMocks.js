import { formStates } from 'readingMessage/actions';
import { mockedUserId } from './settingsMocks';

export const loadedSampleMessage = {
  id: 'uniqueIdReadingMessage',
  readingMessage: {
    id: 'uniqueIdReadingMessage',
    title: 'Title Reading Message Sample',
    content: `For who thoroughly her boy estimating conviction. Removed demands expense account in outward tedious do. Particular way thoroughly unaffected projection favourable mrs can projecting own. Thirty it matter enable become admire in giving. See resolved goodness felicity shy civility domestic had but. Drawings offended yet answered jennings perceive laughing six did far. 

        Is we miles ready he might going. Own books built put civil fully blind fanny. Projection appearance at of admiration no. As he totally cousins warrant besides ashamed do. Therefore by applauded acuteness supported affection it. Except had sex limits county enough the figure former add. Do sang my he next mr soon. It merely waited do unable. `
  },
  formState: formStates.LOADED_STATE,
  error: ''
};

export const loadingSampleMessage = {
  id: '',
  readingMessage: {
    id: '',
    title: '',
    content: ''
  },
  formState: formStates.LOADING_STATE,
  error: ''
};

export const createSampleMessage = {
  id: '',
  readingMessage: {
    id: '',
    title: '',
    content: '',
    authorId: mockedUserId
  },
  formState: formStates.LOADED_STATE,
  error: ''
};

export const errorSampleMessage = {
  id: '',
  readingMessage: {
    id: '',
    title: '',
    content: ''
  },
  formState: formStates.ERROR_STATE,
  error: 'We got an error'
};
