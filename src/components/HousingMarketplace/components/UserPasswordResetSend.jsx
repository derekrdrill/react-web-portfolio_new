import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { DynamicFormInputs } from '../../DynamicFormInputs/DynamicFormInputs';
import { UserAuthenticationContext } from '../context/UserAuthenticationContext';
import { handleSendResetEmail } from '../context/UserAuthenticationActions';
import { AlertContext } from '../../Alert/context/AlertContext';
import { Button, Typography } from '@mui/material';

export const UserPasswordResetSend = () => {
  const { alertDispatch } = useContext(AlertContext);
  const { userAuthenticationDispatch } = useContext(UserAuthenticationContext);
  const [email, setEmail] = useState('');
  const handleEmailChange = e => setEmail(e.currentTarget.value);

  return (
    <>
      <ResetEmailText component='p' variant='p'>
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

const ResetEmailText = styled(Typography)({
  margin: '10px 0',
});

const ButtonContainer = styled.div({
  margin: 10,
});
