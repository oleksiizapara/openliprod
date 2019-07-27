import React from 'react';
import PropTypes from 'prop-types';
import useReactRouter from 'use-react-router';

import { Message, Segment, Button, Form } from 'semantic-ui-react';

import { Formik } from 'formik';

import { Auth } from 'aws-amplify';

import { signUpConfirmSchema } from 'common/validationSchema';

const SignUpConfirm = ({ email }) => {
  const { history } = useReactRouter();

  return (
    <Formik
      initialValues={{
        email: email,
        code: ''
      }}
      validationSchema={signUpConfirmSchema}
      onSubmit={async (values, actions) => {
        try {
          await Auth.confirmSignUp(values.email, values.code);
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
              error={!!errors.email && touched.email}
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

            <Button fluid size='large' type='submit'>
              Sign Up Confirm
            </Button>

            {!!errors.response && <Message error content={errors.response} />}
          </Segment>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpConfirm;

SignUpConfirm.propTypes = {
  email: PropTypes.string
};
