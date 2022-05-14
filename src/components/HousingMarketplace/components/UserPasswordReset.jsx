import React, { useContext, useState } from 'react';
import { history } from '../../../index';
import styled from 'styled-components';
import { Button, Typography } from '@mui/material';
import { DynamicFormInputs } from '../../DynamicFormInputs/DynamicFormInputs';
import { UserAuthenticationContext } from '../context/UserAuthenticationContext';
import { AlertContext } from '../../Alert/context/AlertContext';
import { AlertComponent as Alert } from '../../Alert/components/AlertComponent';

export const UserPasswordReset = () => {
  const pathName = history.location.pathname;
  const id = pathName.slice(pathName.indexOf('/id=') + 4, pathName.length);

  const { passwordIsReset, userAuthenticationDispatch } = useContext(UserAuthenticationContext);
  const { alertDispatch } = useContext(AlertContext);
  const [passwords, setPasswords] = useState({ password: '', confirmPassword: '' });

  const handleInputChange = e => {
    const itemID = e.currentTarget.id;
    const itemValue = e.currentTarget.value;

    setPasswords({ ...passwords, [itemID]: itemValue });
  };

  const handleAlert = (msg, title, type) => {
    alertDispatch({
      type: 'SET_ALERT',
      fadeOut: false,
      payload: { msg: msg, title: title, type: type },
    });

    setTimeout(() => alertDispatch({ type: 'FADE_ALERT', fadeOut: true }), 2000);
    setTimeout(() => alertDispatch({ type: 'REMOVE_ALERT' }), 2400);
  };

  const handlePasswordReset = async () => {
    if (passwords.password === passwords.confirmPassword) {
      const response = await fetch(`../../../../../../updatePassword/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, password: passwords.password }),
      }).catch(e => console.warn(e));

      if (response.ok) {
        const { msg } = await response.json();

        if (msg) {
          userAuthenticationDispatch({ type: 'PASSWORD_RESET' });
          handleAlert(msg, 'Success', 'success');
        }
      }
    } else {
      handleAlert('Passwords do not match', '', 'error');
    }
  };

  return (
    <UserPasswordResetContainer>
      {passwordIsReset ? (
        <Typography paragraph>
          Your password has been reset successfully. Click <a href='/housing-marketplace/auth'>here</a> to sign in
        </Typography>
      ) : (
        <>
          <TextContainer>
            <Typography component='h6' variant='h6'>
              Reset password below
            </Typography>
          </TextContainer>
          <DynamicFormInputs
            inputs={[
              {
                id: 'password',
                label: 'New Password',
                variant: 'outlined',
                xs: 12,
                fullWidth: true,
                type: 'password',
              },
              {
                id: 'confirmPassword',
                label: 'Confirm New Password',
                variant: 'outlined',
                xs: 12,
                fullWidth: true,
                type: 'password',
              },
            ]}
            onChange={handleInputChange}
          />
          <ButtonContainer>
            <Button
              disabled={!passwords.password || !passwords.confirmPassword}
              fullWidth
              onClick={handlePasswordReset}
              variant='contained'
            >
              Reset password
            </Button>
          </ButtonContainer>
        </>
      )}
      <AlertContainer>
        <Alert />
      </AlertContainer>
    </UserPasswordResetContainer>
  );
};

const AlertContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
});

const UserPasswordResetContainer = styled.div({
  margin: '10% 26% 0px 26%',
  textAlign: 'center',
});

const TextContainer = styled.div({
  margin: '100px 0px 20px 0px',
});

const ButtonContainer = styled.div({
  margin: 10,
});
