import { readingMessagePrepareToSave } from 'common/common';

test(`[common-common] readingMessagePrepareToSave `, async () => {
  const readingMessageSample = { id: 'SampleId', author: { id: 'otherId' } };

  const savingReadingMessage = readingMessagePrepareToSave(
    readingMessageSample
  );

  expect(savingReadingMessage).toEqual({
    id: 'SampleId'
  });
});
