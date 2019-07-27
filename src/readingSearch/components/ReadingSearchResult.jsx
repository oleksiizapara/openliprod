import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Loader, Message, Pagination, Segment } from 'semantic-ui-react';

import { formStates, actions } from '../actions';
import { selectors } from '../reducer';
import { selectors as settingsSelectors } from 'settings/reducer';

import ReadingMessage from 'common/Components/ReadingMessage';

const ReadingSearchResult = () => {
  const dispatch = useDispatch();
  const formState = useSelector(state => selectors.formState(state));
  const messages = useSelector(state => selectors.messages(state));
  const error = useSelector(state => selectors.error(state));
  const activePage = useSelector(state => selectors.activePage(state));
  const totalPages = useSelector(state => selectors.totalPages(state));

  const isLoaded = useSelector(state => settingsSelectors.isLoaded(state));
  useEffect(() => {
    return () => dispatch(actions.toDefault());
  }, [dispatch, isLoaded]);

  switch (formState) {
    case formStates.DEFAULT_STATE:
    case formStates.LOADING_STATE:
      return <Loader />;
    case formStates.ERROR_STATE:
      return <Message>{error}</Message>;
    default:
      return (
        <>
          {messages.map(message => (
            <ReadingMessage key={message.id} message={message} />
          ))}

          {totalPages > 1 && (
            <Segment basic textAlign='center'>
              <Pagination
                activePage={activePage}
                totalPages={totalPages}
                onPageChange={(_, { activePage }) => {
                  dispatch(actions.changePage(activePage));
                }}
              />
            </Segment>
          )}
        </>
      );
  }
};

export default ReadingSearchResult;
