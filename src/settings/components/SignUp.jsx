import React from 'react';
import PropTypes from 'prop-types';

import { Message, Segment, Button, Form } from 'semantic-ui-react';

import { Formik } from 'formik';

import { signUpSchema } from 'common/validationSchema';

import { Auth } from 'aws-amplify';

const SignUp = ({ showNextStep }) => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        passwordConfirm: '',
        name: '',
        familyName: ''
      }}
      validationSchema={signUpSchema}
      onSubmit={async (values, actions) => {
        const { password, email, name, familyName } = values;

        try {
          await Auth.signUp({
            username: email,
            password,
            attributes: {
              email,
              name,
              family_name: familyName
            }
          });
          showNextStep(email);
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
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name='password'
              error={!!errors.password && touched.password}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />

            {!!errors.password && touched.password && (
              <Message error content={errors.password} />
            )}

            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Confirm Password'
              type='password'
              name='passwordConfirm'
              error={!!errors.passwordConfirm && touched.passwordConfirm}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.passwordConfirm}
            />

            {!!errors.passwordConfirm && touched.passwordConfirm && (
              <Message error content={errors.passwordConfirm} />
            )}

            <Form.Input
              fluid
              name='name'
              placeholder='Name'
              error={!!errors.name && touched.name}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />

            {!!errors.name && touched.name && (
              <Message error content={errors.name} />
            )}

            <Form.Input
              fluid
              name='familyName'
              placeholder='Family Name'
              error={!!errors.familyName && touched.familyName}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.familyName}
            />

            {!!errors.familyName && touched.familyName && (
              <Message error content={errors.familyName} />
            )}

            <Button fluid size='large'>
              Sign Up
            </Button>

            {!!errors.response && <Message error content={errors.response} />}
          </Segment>
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;

SignUp.propTypes = {
  showNextStep: PropTypes.func
};
