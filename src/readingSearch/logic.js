import { createLogic } from 'redux-logic';
import produce from 'immer';
import Enumerable from 'linq';

import { actionTypes, actions } from './actions';

import { selectors } from './reducer';

import * as queryHelper from 'common/queryHelper';
import { errorMessages } from 'common/errorMessages';
import { calculateTotalPages } from 'common/common';

const search = createLogic({
  type: actionTypes.SEARCH,

  processOptions: {
    dispatchReturn: true
  },

  latest: true,

  async process({ getState, action }, dispatch, done) {
    const { searchText } = action.payload;

    const pageSize = selectors.pageSize(getState());

    const response = await queryHelper.getSearchMessages({
      searchText: searchText,
      pageSize: pageSize,
      nextToken: null
    });

    if (!response) {
      dispatch(actions.error(errorMessages.readingMessagesSearchIsNotWorking));
      done();
      return;
    }

    const page = {
      pageId: 1,
      messages: response.messages,
      nextToken: response.nextToken,
      searchText: searchText
    };

    dispatch(
      actions.pagesUpdated({
        pages: [page],
        messages: page.messages,
        activePage: page.pageId,
        totalPages: calculateTotalPages(page)
      })
    );
    done();
  }
});

const changePage = createLogic({
  type: actionTypes.CHANGE_PAGE,

  processOptions: {
    dispatchReturn: true
  },

  async process({ getState, action }, dispatch, done) {
    const { pageId } = action.payload;

    const pages = selectors.pages(getState());
    const pageSize = selectors.pageSize(getState());

    var updatedPages = pages;
    for (;;) {
      const page = Enumerable.from(updatedPages).firstOrDefault(
        x => x.pageId == pageId
      );

      const lastPage = Enumerable.from(updatedPages).last();

      if (page && page.pageId == pageId) {
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

      const response = await queryHelper.getSearchMessages({
        searchText: lastPage.searchText,
        pageSize: pageSize,
        nextToken: lastPage.nextToken
      });

      if (!response) {
        dispatch(
          actions.error(errorMessages.readingMessagesSearchIsNotWorking)
        );
        done();
        return;
      }

      updatedPages = produce(updatedPages, draft => {
        draft.push({
          pageId: lastPage.pageId + 1,
          messages: response.messages,
          nextToken: response.nextToken,
          searchText: lastPage.searchText
        });
      });
    }
  }
});

export default [search, changePage];
