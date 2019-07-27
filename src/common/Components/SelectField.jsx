/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Message } from 'semantic-ui-react';

const SelectField = ({
  field: { name, value },
  form: { touched, errors, submitCount, setFieldValue, setFieldTouched },
  options,
  // eslint-disable-next-line no-unused-vars
  children: _,
  ...props
}) => {
  const isError = !!errors[name] && (touched[name] || submitCount > 0);

  const setTouched = () => {
    if (!touched[name]) {
      setFieldTouched(name, true);
    }
  };

  return (
    <>
      <Form.Select
        options={options}
        value={value}
        onChange={(_, { value }) => setFieldValue(name, value)}
        onBlur={() => setTouched()}
        error={isError}
        {...props}
      />

      {isError && <Message error content={errors[name]} />}
    </>
  );
};

export default SelectField;
