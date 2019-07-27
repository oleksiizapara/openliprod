import React, { useState } from 'react';

import CenteredLayout from 'layout/CenteredLayout';
import RecoveryPasswordConfirm from './RecoveryPasswordConfirm';
import RecoveryPassword from './RecoveryPassword';

const RecoveryPasswordPage = () => {
  const [isConfirm, setIsConfirm] = useState(false);
  const [email, setEmail] = useState(false);

  const showNextStep = email => {
    setEmail(email);
    setIsConfirm(true);
  };

  return (
    <CenteredLayout>
      {!isConfirm ? (
        <RecoveryPassword showNextStep={showNextStep} />
      ) : (
        <RecoveryPasswordConfirm email={email} />
      )}
    </CenteredLayout>
  );
};

export default RecoveryPasswordPage;
