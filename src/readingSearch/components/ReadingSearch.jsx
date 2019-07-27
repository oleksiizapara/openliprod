import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Message, Form, Icon } from 'semantic-ui-react';
import { Formik } from 'formik';

import { formStates, actions } from '../actions';
import { selectors } from '../reducer';

import ReadingSearchResult from './ReadingSearchResult';
import { readingSearchSchema } from 'common/validationSchema';

const ReadingSearch = () => {
  const dispatch = useDispatch();
  const formState = useSelector(state => selectors.formState(state));

  const loading = formState === formStates.LOADING_STATE;

  return (
    <>
      <Formik
        initialValues={{ searchText: '' }}
        validationSchema={readingSearchSchema}
        onSubmit={(values, onSubmitActions) => {
          dispatch(actions.search(values.searchText));
          onSubmitActions.setSubmitting(false);
        }}
      >
        {({
          isSubmitting,
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isValid,
          submitForm
        }) => (
          <Form error={!isValid} onSubmit={handleSubmit}>
            <Form.Input
              loading={isSubmitting || loading}
              icon={<Icon name='search' link onClick={() => submitForm()} />}
              name='searchText'
              placeholder='Search...'
              error={!!errors.searchText && touched.searchText}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.searchText}
            />

            {!!errors.searchText && touched.searchText && (
              <Message error content={errors.searchText} />
            )}
          </Form>
        )}
      </Formik>

      <ReadingSearchResult />
    </>
  );
};

export default ReadingSearch;
