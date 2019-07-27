import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Form, Button } from 'semantic-ui-react';
import { Formik, Field } from 'formik';

import { formStates, actions } from '../actions';
import { selectors } from '../reducer';

import { changePasswordSchema } from 'common/validationSchema';
import InputField from 'common/Components/InputField';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const formState = useSelector(state => selectors.formState(state));

  const loading = formState == formStates.LOADING_STATE;
  return (
    <Formik
      initialValues={{
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
      }}
      validationSchema={changePasswordSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        dispatch(actions.changePassword(values));
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
          <Field
            type='password'
            name='oldPassword'
            placeholder='Old Password'
            component={InputField}
          />

          <Field
            type='password'
            name='newPassword'
            placeholder='New Password'
            component={InputField}
          />

          <Field
            type='password'
            name='newPasswordConfirm'
            placeholder='Confirm New Password'
            component={InputField}
          />

          <Button primary size='large' type='submit'>
            Update Password
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePassword;
