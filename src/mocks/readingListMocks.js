import { formStates } from 'readingList/actions';
import { mockedUserId, mockedAuthor } from './settingsMocks';
import readingMessageAccess from 'common/readingMessageAccess';

const sampleMessage = id => {
  return {
    id: id,
    title: 'Title Reading Message Sample',
    content: `For who thoroughly her boy estimating conviction. Removed demands expense account in outward tedious do. Particular way thoroughly unaffected projection favourable mrs can projecting own. Thirty it matter enable become admire in giving. See resolved goodness felicity shy civility domestic had but. Drawings offended yet answered jennings perceive laughing six did far. 

        Is we miles ready he might going. Own books built put civil fully blind fanny. Projection appearance at of admiration no. As he totally cousins warrant besides ashamed do. Therefore by applauded acuteness supported affection it. Except had sex limits county enough the figure former add. Do sang my he next mr soon. It merely waited do unable. `,

    authorId: mockedUserId,
    author: mockedAuthor,
    createdAt: '2019-05-11T08:17:10.268Z',
    updatedAt: '2019-05-11T08:17:10.268Z',
    access: readingMessageAccess.PUBLIC
  };
};

export const defaultMock = {
  formState: formStates.LOADED_STATE,
  messages: [
    sampleMessage(1),
    sampleMessage(2),
    sampleMessage(3),
    sampleMessage(4)
  ],
  error: undefined,
  activePage: 1,
  totalPages: 10
};
