import React from 'react';
import PropTypes from 'prop-types';
import useReactRouter from 'use-react-router';

import { Message, Segment, Button, Form } from 'semantic-ui-react';

import { Formik } from 'formik';
import { Auth } from 'aws-amplify';

import { recoveryPasswordConfirmSchema } from 'common/validationSchema';

const RecoveryPasswordConfirm = ({ email }) => {
  const { history } = useReactRouter();

  return (
    <Formik
      initialValues={{
        email: email,
        code: '',
        newPassword: '',
        newPasswordConfirm: ''
      }}
      validationSchema={recoveryPasswordConfirmSchema}
      onSubmit={async (values, actions) => {
        try {
          await Auth.forgotPasswordSubmit(
            values.email,
            values.code,
            values.newPassword
          );
          history.push('/sign_in');
        } catch (errors) {
          actions.setErrors({ response: errors.message });
        } finally {
          actions.setSubmitting(false);
        }
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
        isValid
      }) => (
        <Form
          size='large'
          error={!isValid}
          onSubmit={handleSubmit}
          loading={isSubmitting}
        >
          <Segment stacked>
            <Form.Input
              fluid
              readOnly
              name='email'
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              error={!!errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />

            {!!errors.email && touched.email && (
              <Message error content={errors.email} />
            )}

            <Form.Input
              fluid
              name='code'
              iconPosition='left'
              placeholder='Code'
              error={!!errors.code && touched.code}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.code}
            />

            {!!errors.code && touched.code && (
              <Message error content={errors.code} />
            )}

            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='New Password'
              type='password'
              name='newPassword'
              error={!!errors.newPassword && touched.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.newPassword}
            />

            {!!errors.newPassword && touched.newPassword && (
              <Message error content={errors.newPassword} />
            )}

            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Confirm New Password'
              type='password'
              name='newPasswordConfirm'
              error={!!errors.newPasswordConfirm && touched.newPasswordConfirm}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.newPasswordConfirm}
            />

            {!!errors.newPasswordConfirm && touched.newPasswordConfirm && (
              <Message error content={errors.newPasswordConfirm} />
            )}

            <Button fluid size='large' type='submit'>
              Recovery Password Confirm
            </Button>

            {!!errors.response && <Message error content={errors.response} />}
          </Segment>
        </Form>
      )}
    </Formik>
  );
};

RecoveryPasswordConfirm.propTypes = {
  email: PropTypes.string
};

export default RecoveryPasswordConfirm;
