import { createLogic } from 'redux-logic';
import produce from 'immer';
import Enumerable from 'linq';

import { actionTypes, actions } from './actions';

import { selectors } from './reducer';

import * as queryHelper from 'common/queryHelper';
import { errorMessages } from 'common/errorMessages';
import { selectors as settingsSelectors } from 'settings/reducer';
import { calculateTotalPages } from 'common/common';

export const loadReadingList = createLogic({
  type: actionTypes.LOAD,

  processOptions: {
    dispatchReturn: true
  },

  async process({ getState, action }, dispatch, done) {
    const user = settingsSelectors.user(getState());
    const isLoaded = settingsSelectors.isLoaded(getState());

    if (!user || !isLoaded) {
      done();
      return;
    }

    const { pageId } = action.payload;

    const pages = selectors.pages(getState());
    const pageSize = selectors.pageSize(getState());

    var updatedPages = pages;
    for (;;) {
      const page = Enumerable.from(updatedPages).firstOrDefault(
        x => x.pageId == pageId
      );

      const lastPage = Enumerable.from(updatedPages).lastOrDefault();

      if (page && lastPage && page.pageId == pageId) {
        dispatch(
          actions.pagesUpdated({
            pages: updatedPages,
            messages: page.messages,
            activePage: page.pageId,
            totalPages: calculateTotalPages(lastPage)
          })
        );
        done();
        return;
      }

      const response = await queryHelper.getReadingMessagesByAuthor({
        authorId: user.id,
        pageSize: pageSize,
        nextToken: lastPage ? lastPage.nextToken : null
      });

      if (!response) {
        dispatch(actions.error(errorMessages.readingMessagesWasNotFound));
        done();
        return;
      }

      updatedPages = produce(updatedPages, draft => {
        draft.push({
          messages: response.messages,
          pageId: lastPage ? lastPage.pageId + 1 : 1,
          nextToken: response.nextToken
        });
      });
    }
  }
});

export default [loadReadingList];
