/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Message } from 'semantic-ui-react';

const InputField = ({
  field: { name, value },
  form: { touched, errors, setFieldValue, setFieldTouched },
  // eslint-disable-next-line no-unused-vars
  children: _,
  ...props
}) => {
  const isError = touched[name] && !!errors[name];

  const setTouched = () => {
    if (!touched[name]) {
      setFieldTouched(name, true);
    }
  };

  return (
    <>
      <Form.Input
        error={isError}
        onChange={(_, { value }) => {
          setFieldValue(name, value);
          setTouched();
        }}
        value={value}
        onBlur={() => setTouched()}
        {...props}
      />

      {isError && <Message error content={errors[name]} />}
    </>
  );
};

export default InputField;
