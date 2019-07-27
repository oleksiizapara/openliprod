import { createLogic } from 'redux-logic';
import produce from 'immer';
import Enumerable from 'linq';

import { actionTypes, actions } from './actions';

import { selectors } from './reducer';
import { selectors as settingsSelectors } from 'settings/reducer';

import * as queryHelper from 'common/queryHelper';
import * as mutationHelper from 'common/mutationHelper';
import { errorMessages } from 'common/errorMessages';
import { createReadingMessageProgresses, assertErrors } from 'common/common';
import { API, Analytics } from 'aws-amplify';
import { graphqlOperation } from 'aws-amplify';
import * as customQueries from 'graphql_custom/queries';
import * as customMutations from 'graphql_custom/mutations';
import logger from 'common/logger';

const load = createLogic({
  type: actionTypes.LOAD,

  processOptions: {
    dispatchReturn: true
  },

  latest: true,

  async process({ getState }, dispatch, done) {
    dispatch(actions.calculate());
    done();
    return;
  }
});

const calculate = createLogic({
  type: actionTypes.CALCULATE,

  processOptions: {
    dispatchReturn: true
  },

  latest: true,

  async process({ getState }, dispatch, done) {
    try {
      const user = settingsSelectors.user(getState());

      const historyResponse = assertErrors(
        await API.graphql(
          graphqlOperation(customQueries.listReadingMessageHistorys, {
            filter: { authorId: { eq: user.id } }
          })
        )
      );
      const readingMessageHistories =
        historyResponse.data.listReadingMessageHistorys.items;
      if (
        readingMessageHistories === null ||
        !Enumerable.from(readingMessageHistories).any()
      ) {
        dispatch(actions.error(errorMessages.progressDidNotReadAnyText));
        done();
        return;
      }

      const progressResponse = assertErrors(
        await API.graphql(
          graphqlOperation(customQueries.listProgresss, {
            filter: { authorId: { eq: user.id } }
          })
        )
      );
      const listProgresses = progressResponse.data.listProgresss.items;

      if (listProgresses != null && Enumerable.from(listProgresses).any()) {
        var latestProgress = Enumerable.from(listProgresses)
          .orderBy(x => x.time)
          .last();
        var latestHistory = Enumerable.from(readingMessageHistories)
          .orderBy(x => x.time)
          .last();
        if (latestProgress.time >= latestHistory.time) {
          dispatch(actions.calculated(latestProgress));
          done();
          return;
        }

        var readingMessageProgresses = createReadingMessageProgresses(
          readingMessageHistories
        );

        const updateResponse = assertErrors(
          await API.graphql(
            graphqlOperation(customMutations.updateProgress, {
              input: {
                id: latestProgress.id,
                readingMessageProgresses: readingMessageProgresses,
                time: Enumerable.from(readingMessageProgresses)
                  .orderBy(x => x.time)
                  .last().time,
                isCalculated: true
              }
            })
          )
        );
        const updatedProgress = updateResponse.data.updateProgress;

        dispatch(actions.calculated(updatedProgress));
        done();
        return;
      } else {
        var readingMessageProgresses = createReadingMessageProgresses(
          readingMessageHistories
        );

        const createResponse = assertErrors(
          await API.graphql(
            graphqlOperation(customMutations.createProgress, {
              input: {
                readingMessageProgresses: readingMessageProgresses,
                isCalculated: true
              }
            })
          )
        );
        const createdProgress = createResponse.data.createProgress;

        dispatch(actions.calculated(createdProgress));
        done();
        return;
      }
    } catch (e) {
      Analytics.record({
        name: '[Progress] Calculating logic',
        data: e,
        attributes: {
          error: e.message
        }
      });
      logger.debug('[Progress] Calculating logic', e);

      dispatch(actions.error(errorMessages.progressIsNotWorking));
      done();
      return;
    }
  }
});

export default [load, calculate];
