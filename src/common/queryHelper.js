import * as customQueries from 'graphql_custom/queries';

import { graphqlOperation, Analytics, API } from 'aws-amplify';
import logger from './logger';

const assertErrors = response => {
  if (response && response.errors && response.errors.length > 0) {
    throw new Error(response.errors.join('\n'));
  }
};

export const getUser = async username => {
  try {
    const response = await API.graphql(
      graphqlOperation(customQueries.getUser, { id: username })
    );
    assertErrors(response);
    return response.data.getUser;
  } catch (e) {
    Analytics.record({
      name: 'GetUserError',
      attributes: {
        error: e.message
      }
    });
    logger.debug('GetUserError', e);
  }
};

export const getReadingMessage = async id => {
  try {
    const response = await API.graphql(
      graphqlOperation(customQueries.getReadingMessage, { id: id })
    );
    assertErrors(response);
    return response.data.getReadingMessage;
  } catch (e) {
    Analytics.record({
      name: 'getReadingMessageError',
      attributes: {
        error: e.message
      }
    });
    logger.debug('getReadingMessageError', e);
  }
};

export const getReadingMessagesByAuthor = async ({
  authorId,
  nextToken,
  pageSize
}) => {
  try {
    const response = await API.graphql(
      graphqlOperation(customQueries.getReadingMessagesByAuthor, {
        authorId,
        nextToken,
        pageSize
      })
    );
    assertErrors(response);
    const {
      data: { listReadingMessages: data }
    } = response;
    return {
      nextToken: data.nextToken,
      messages: data.items
    };
  } catch (e) {
    Analytics.record({
      name: 'getReadingMessageByAuthorError',
      attributes: {
        error: e.message
      }
    });
    logger.debug('getReadingMessageByAuthorError', e);
  }
};

export const getSearchMessages = async ({
  searchText,
  nextToken,
  pageSize
}) => {
  try {
    const response = await API.graphql(
      graphqlOperation(customQueries.getSearchMessages, {
        searchText,
        nextToken,
        pageSize
      })
    );
    assertErrors(response);
    const {
      data: { listReadingMessages: data }
    } = response;
    return {
      nextToken: data.nextToken,
      messages: data.items
    };
  } catch (e) {
    Analytics.record({
      name: 'getSearchMessagesError',
      attributes: {
        error: e.message
      }
    });
    logger.debug('getSearchMessagesError', e);
  }
};

export const getProgress = async id => {
  try {
    const response = await API.graphql(
      graphqlOperation(customQueries.getProgress, { id: id })
    );
    assertErrors(response);
    const {
      data: { getProgress: data }
    } = response;

    return response.data.getProgress;
  } catch (e) {
    Analytics.record({
      name: 'getProgressError',
      attributes: {
        error: e.message
      }
    });
    logger.debug('getProgressError', e);
  }
};

export const listReadingMessageHistorys = async authorId => {
  try {
    const response = await API.graphql(
      graphqlOperation(customQueries.listReadingMessageHistorys, {
        filter: { authorId: { eq: authorId } }
      })
    );
    assertErrors(response);
    const {
      data: { listReadingMessageHistorys: data }
    } = response;

    return response.data.listReadingMessageHistorys.items;
  } catch (e) {
    Analytics.record({
      name: 'listReadingMessageHistorysError',
      attributes: {
        error: e.message
      }
    });
    logger.debug('listReadingMessageHistorysError', e);
  }
};
