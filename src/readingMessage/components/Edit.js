import React, { useEffect } from 'react';
import useReactRouter from 'use-react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Form from './Form';
import { Formik } from 'formik';

import { Message } from 'semantic-ui-react';

import { selectors } from '../reducer';
import { actions, formStates } from '../actions';
import { createOrEditReadingMessageSchema } from 'common/validationSchema';
import logger from 'common/logger';

const Edit = () => {
  const dispatch = useDispatch();

  const { match } = useReactRouter();

  useEffect(() => {
    dispatch(actions.load(match.params.id));
    return () => dispatch(actions.toDefault());
  }, [dispatch, match.params.id]);

  const id = useSelector(state => selectors.id(state));

  const readingMessage = useSelector(state => selectors.readingMessage(state));
  const formState = useSelector(state => selectors.formState(state));
  const error = useSelector(state => selectors.error(state));

  const loading =
    formState == formStates.DEFAULT_STATE ||
    formState == formStates.LOADING_STATE ||
    formState == formStates.PUBLISHING_STATE;

  logger.debug({ loading, readingMessage, formState });

  switch (formState) {
    case formStates.PUBLISHED_STATE:
      return <Redirect to={{ pathname: `/reading/${id}` }} />;
    case formStates.DELETED_STATE:
      return <Redirect to={{ pathname: `/` }} />;
    case formStates.ERROR_STATE:
      return <Message error content={error} />;
    default:
      return (
        <Formik
          enableReinitialize
          render={props => (
            <Form {...props} loading={loading} readingMessageId={id} />
          )}
          initialValues={readingMessage}
          validationSchema={createOrEditReadingMessageSchema}
          onSubmit={values => {
            dispatch(actions.publish(values));
          }}
        />
      );
  }
};

export default Edit;
