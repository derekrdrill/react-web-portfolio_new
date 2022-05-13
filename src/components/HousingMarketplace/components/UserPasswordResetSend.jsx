import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { DynamicFormInputs } from '../../DynamicFormInputs/DynamicFormInputs';
import { UserAuthenticationContext } from '../context/UserAuthenticationContext';
import { AlertContext } from '../../Alert/context/AlertContext';
import { Button, Typography } from '@mui/material';

export const UserPasswordResetSend = () => {
  const { alertDispatch } = useContext(AlertContext);
  const { userAuthenticationDispatch } = useContext(UserAuthenticationContext);
  const [email, setEmail] = useState('');
  const handleEmailChange = e => setEmail(e.currentTarget.value);

  const handleAlert = (msg, title, type) => {
    alertDispatch({
      type: 'SET_ALERT',
      fadeOut: false,
      payload: { msg: msg, title: title, type: type },
    });

    setTimeout(() => alertDispatch({ type: 'FADE_ALERT', fadeOut: true }), 2000);
    setTimeout(() => alertDispatch({ type: 'REMOVE_ALERT' }), 2400);
  };

  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const handleSendEmail = async () => {
    if (validateEmail(email)) {
      const response = await fetch(`../forgot-password/${email}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).catch(e => console.warn(e));

      if (response.ok) {
        const { userFound } = await response.json();

        if (userFound) {
          userAuthenticationDispatch({ type: 'SIGN_IN' });
          handleAlert('Password reset instructions have been sent', 'Check your email', 'success');
        } else {
          handleAlert('There is not an account associated with the email provided', 'No account found', 'error');
        }
      } else {
        console.warn(Promise.reject(response));
      }
    } else {
      handleAlert('Please provide a valid email', 'Invalid email provided', 'error');
    }
  };

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
        <Button disabled={!email} color='info' fullWidth onClick={handleSendEmail} variant='contained'>
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
