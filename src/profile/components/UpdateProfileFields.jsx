import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Form, Button } from 'semantic-ui-react';
import { Formik, Field } from 'formik';

import { formStates, actions } from '../actions';
import { selectors } from '../reducer';

import { selectors as settingsSelectors } from 'settings/reducer';

import { updateProfileSchema } from 'common/validationSchema';
import InputField from 'common/Components/InputField';

const UpdateProfileFields = () => {
  const dispatch = useDispatch();
  const formState = useSelector(state => selectors.formState(state));
  const user = useSelector(state => settingsSelectors.user(state));

  const loading = formState == formStates.LOADING_STATE;
  return (
    <Formik
      enableReinitialize
      initialValues={user}
      validationSchema={updateProfileSchema}
      onSubmit={(values, onSubmitActions) => {
        dispatch(actions.updateProfile(values));
        onSubmitActions.setSubmitting(false);
      }}
    >
      {({ isSubmitting, handleSubmit, isValid }) => (
        <Form
          error={!isValid}
          onSubmit={handleSubmit}
          loading={isSubmitting || loading}
        >
          <Field name='email' placeholder='Email' component={InputField} />

          <Field name='name' placeholder='First Name' component={InputField} />

          <Field
            name='familyName'
            placeholder='Family Name'
            component={InputField}
          />

          <Button primary size='large' type='submit'>
            Update Profile
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateProfileFields;
