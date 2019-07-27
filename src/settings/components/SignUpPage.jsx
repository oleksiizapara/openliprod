import React, { useState } from 'react';
import CenteredLayout from 'layout/CenteredLayout';
import SignUp from './SignUp';
import SignUpConfirm from './SignUpConfirm';

const SignUpPage = () => {
  const [isConfirm, setIsConfirm] = useState(false);
  const [email, setEmail] = useState(false);

  const showNextStep = email => {
    setEmail(email);
    setIsConfirm(true);
  };

  return (
    <CenteredLayout>
      {!isConfirm ? (
        <SignUp showNextStep={showNextStep} />
      ) : (
        <SignUpConfirm email={email} />
      )}
    </CenteredLayout>
  );
};

export default SignUpPage;
