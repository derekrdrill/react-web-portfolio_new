import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Button, Typography } from '@mui/material';

import { DynamicFormInputs } from '../../DynamicFormInputs/DynamicFormInputs';
import { UserAuthenticationContext } from '../context/UserAuthenticationContext';

import { AlertContext } from '../../Alert/context/AlertContext';
import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';
import { handleSendResetEmail } from '../context/UserAuthenticationActions';

export const UserPasswordResetSend = () => {
  const { darkMode } = useContext(DarkLightModeContext);
  const { alertDispatch } = useContext(AlertContext);
  const { userAuthenticationDispatch } = useContext(UserAuthenticationContext);

  const [email, setEmail] = useState('');
  const handleEmailChange = e => setEmail(e.currentTarget.value);

  return (
    <>
      <ResetEmailText darkMode={darkMode} component='p' variant='p'>
        Enter a valid email below to receieve password reset instructions
      </ResetEmailText>
      <DynamicFormInputs
        inputs={[{ id: 'email', label: 'Email', variant: 'outlined', xs: 12, fullWidth: true }]}
        onChange={handleEmailChange}
      />
      <ButtonContainer>
        <Button
          disabled={!email}
          color='info'
          fullWidth
          onClick={() => handleSendResetEmail(email, alertDispatch, userAuthenticationDispatch)}
          variant='contained'
        >
          Send Reset Email
        </Button>
      </ButtonContainer>
    </>
  );
};

const ResetEmailText = styled(Typography)(({ darkMode }) => ({
  margin: '10px 0',
  color: darkMode && 'beige',
}));

const ButtonContainer = styled.div({
  margin: 10,
});
