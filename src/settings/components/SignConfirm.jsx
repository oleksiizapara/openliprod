import React from 'react';
import {
  Grid,
  Header,
  Message,
  Segment,
  Button,
  Form
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { Formik } from 'formik';
import useReactRouter from 'use-react-router';

import { signUpConfirmSchema } from 'common/validationSchema';

import { Auth } from 'aws-amplify';

const SignConfirm = () => {
  const { history } = useReactRouter();

  return (
    <div className='login-form'>
      <style>
        {`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
      `}
      </style>
      <Grid
        textAlign='center'
        style={{ height: '100%' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' textAlign='center'>
            OpenLI
          </Header>

          <Formik
            initialValues={{ email: '', authenticationCode: '' }}
            validationSchema={signUpConfirmSchema}
            onSubmit={async (values, actions) => {
              try {
                await Auth.confirmSignUp(
                  values.email,
                  values.authenticationCode
                );
                history.push('/');
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
                    iconPosition='left'
                    placeholder='Authentication Code'
                    name='authenticationCode'
                    error={!!errors.authenticationCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.authenticationCode}
                  />

                  {!!errors.authenticationCode &&
                    touched.authenticationCode && (
                      <Message error content={errors.authenticationCode} />
                    )}

                  <Button fluid size='large'>
                    Confirm Email
                  </Button>

                  {!!errors.response && (
                    <Message error content={errors.response} />
                  )}
                </Segment>
              </Form>
            )}
          </Formik>

          <Message>
            <Link to='/'>Home page</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default SignConfirm;
