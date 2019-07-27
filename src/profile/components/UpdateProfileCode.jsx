import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Form, Button } from 'semantic-ui-react';
import { Formik, Field } from 'formik';

import { formStates, actions } from '../actions';
import { selectors } from '../reducer';

import { updateProfileCodeSchema } from 'common/validationSchema';
import InputField from 'common/Components/InputField';

const UpdateProfileCode = () => {
  const dispatch = useDispatch();
  const formState = useSelector(state => selectors.formState(state));

  const loading = formState == formStates.LOADING_STATE;
  return (
    <Formik
      initialValues={{ code: '' }}
      validationSchema={updateProfileCodeSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        dispatch(actions.updateProfileCode(values));
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, handleSubmit, isValid }) => (
        <Form
          error={!isValid}
          onSubmit={handleSubmit}
          loading={isSubmitting || loading}
        >
          <Field name='code' placeholder='Code' component={InputField} />

          <Button primary size='large' type='submit'>
            Verify Email
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateProfileCode;
