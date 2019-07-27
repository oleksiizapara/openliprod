import React from 'react';
import { useDispatch } from 'react-redux';

import { Message, Segment, Button, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { Formik } from 'formik';
import useReactRouter from 'use-react-router';

import { signInSchema } from 'common/validationSchema';

import { Auth } from 'aws-amplify';

import { actions as settingsActions } from 'settings/actions';
import CenteredLayout from 'layout/CenteredLayout';

const SignInPage = () => {
  const { history } = useReactRouter();
  const dispatch = useDispatch();

  return (
    <CenteredLayout>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={signInSchema}
        onSubmit={async (values, actions) => {
          try {
            await Auth.signIn(values.email, values.password);
            history.push('/');
            dispatch(settingsActions.userFetch());
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

              <Button fluid size='large' type='submit'>
                Login
              </Button>

              {!!errors.response && <Message error content={errors.response} />}
            </Segment>
          </Form>
        )}
      </Formik>

      <Message>
        New to us? <Link to='/sign_up'>Sign Up</Link>
      </Message>

      <Message>
        <Link to='/recovery_password'>Forgot Password?</Link>
      </Message>
    </CenteredLayout>
  );
};

export default SignInPage;
