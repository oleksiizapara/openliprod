import { actionTypes, actions } from './actions';

import { createLogic } from 'redux-logic';

import * as queryHelper from 'common/queryHelper';
import * as mutationHelper from 'common/mutationHelper';

import { errorMessages } from 'common/errorMessages';

const loadingReadingMessage = createLogic({
  type: actionTypes.LOAD,
  latest: true,

  processOptions: {
    dispatchReturn: true
  },

  async process({ action }, dispatch, done) {
    const { id } = action.payload;

    const readingMessage = await queryHelper.getReadingMessage(id);

    if (!readingMessage) {
      dispatch(actions.error(errorMessages.readingMessageWasNotFound));
      done();
      return;
    }

    dispatch(actions.updated(readingMessage));
    dispatch(actions.loaded());
    done();
  }
});

const publishReadingMessage = createLogic({
  type: actionTypes.PUBLISH,
  latest: true,

  processOptions: {
    dispatchReturn: true
  },

  async process({ action }, dispatch, done) {
    const { readingMessage } = action.payload;

    if (readingMessage.id !== '') {
      const newReadingMessage = await mutationHelper.updateReadingMessage(
        readingMessage
      );

      if (!newReadingMessage) {
        dispatch(actions.error(errorMessages.readingMessageWasNotUpdated));
        done();
        return;
      }

      dispatch(actions.published(newReadingMessage));
      done();
    } else {
      const newReadingMessage = await mutationHelper.createReadingMessage(
        readingMessage
      );

      if (!newReadingMessage) {
        dispatch(actions.error(errorMessages.readingMessageWasNotCreated));
        done();
        return;
      }

      dispatch(actions.published(newReadingMessage));
      done();
    }
  }
});

const deleteReadingMessage = createLogic({
  type: actionTypes.DELETE,
  latest: true,

  processOptions: {
    dispatchReturn: true
  },

  async process({ action }, dispatch, done) {
    const { id } = action.payload;

    const response = await mutationHelper.deleteReadingMessage(id);

    if (!response) {
      dispatch(actions.error(errorMessages.readingMessageWasNotDeleted));
      done();
      return;
    }

    dispatch(actions.deleted());
    done();
  }
});

export default [
  loadingReadingMessage,
  publishReadingMessage,
  deleteReadingMessage
];
