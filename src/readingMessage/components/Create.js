import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Form from './Form';
import { Formik } from 'formik';

import { selectors } from '../reducer';
import { actions, formStates } from '../actions';
import { createOrEditReadingMessageSchema } from 'common/validationSchema';
import { Message } from 'semantic-ui-react';

const Create = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.create());
    return () => dispatch(actions.toDefault());
  }, [dispatch]);

  const id = useSelector(state => selectors.id(state));

  const readingMessage = useSelector(state => selectors.readingMessage(state));
  const formState = useSelector(state => selectors.formState(state));
  const error = useSelector(state => selectors.error(state));

  const loading =
    formState == formStates.DEFAULT_STATE ||
    formState == formStates.LOADING_STATE ||
    formState == formStates.PUBLISHING_STATE;

  switch (formState) {
    case formStates.PUBLISHED_STATE:
      return <Redirect to={{ pathname: `/reading/${id}` }} />;
    case formStates.ERROR_STATE:
      return <Message error content={error} />;
    default:
      return (
        <Formik
          enableReinitialize
          render={props => <Form {...props} loading={loading} />}
          initialValues={readingMessage}
          validationSchema={createOrEditReadingMessageSchema}
          onSubmit={values => {
            dispatch(actions.publish(values));
          }}
        />
      );
  }
};

export default Create;
