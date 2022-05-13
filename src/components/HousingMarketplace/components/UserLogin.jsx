import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { DynamicFormInputs } from '../../DynamicFormInputs/DynamicFormInputs';
import { Button, Typography } from '@mui/material';
import { UserAuthenticationContext } from '../context/UserAuthenticationContext';
import { UserRegister } from './UserRegister';
import { AlertContext } from '../../Alert/context/AlertContext';
import { AlertComponent as Alert } from '../../Alert/components/AlertComponent';
import { USER_LOGIN_INPUTS } from '../constants/USER_LOGIN_INPUTS';

export const UserLogin = () => {
  const { isRegistering, userAuthenticationDispatch } = useContext(UserAuthenticationContext);
  const { alertDispatch } = useContext(AlertContext);
  const [signInItem, setSignInItem] = useState({});

  const handleAlert = msg => {
    alertDispatch({
      type: 'SET_ALERT',
      fadeOut: false,
      payload: { msg: msg, title: 'Sign-in error', type: 'error' },
    });

    setTimeout(() => alertDispatch({ type: 'FADE_ALERT', fadeOut: true }), 2000);
    setTimeout(() => alertDispatch({ type: 'REMOVE_ALERT' }), 2400);
  };

  const handleSetSignIn = e => {
    const itemID = e.currentTarget.id;
    const itemValue = e.currentTarget.value;

    setSignInItem({ ...signInItem, [itemID]: itemValue });
  };

  const handleSignIn = async () => {
    const { username, password } = signInItem;

    const response = await fetch(`sign-in/${username}/${password}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).catch(e => console.warn(e));

    if (response.ok) {
      const { userNameExists, passwordMatch } = await response.json();

      if (!userNameExists) {
        handleAlert('Username does not exist');
      } else {
        if (!passwordMatch) {
          handleAlert('Password does not match');
        } else {
          userAuthenticationDispatch({ type: 'SIGNED_IN' });
        }
      }
    }
  };

  const handlesetIsRegistering = () => userAuthenticationDispatch({ type: 'REGISTER' });

  const handleBackToSignIn = () => userAuthenticationDispatch({ type: 'SIGN_IN' });

  return (
    <>
      {isRegistering && <Button onClick={handleBackToSignIn}>Back to sign in</Button>}
      <UserLoginContainer isRegistering={isRegistering}>
        {isRegistering ? (
          <UserRegister />
        ) : (
          <>
            <LoginTextContainer>
              <LoginText component='h4' variant='h4'>
                User sign-in
              </LoginText>
            </LoginTextContainer>
            <DynamicFormInputs inputs={USER_LOGIN_INPUTS} onChange={handleSetSignIn} />
            <ButtonContainer>
              <Button fullWidth onClick={handleSignIn} variant='outlined'>
                Sign in
              </Button>
            </ButtonContainer>
            <Button>Forgot password?</Button>
            <Typography paragraph>
              Not a member?
              <Button onClick={handlesetIsRegistering}>Sign up now</Button>
            </Typography>
          </>
        )}
      </UserLoginContainer>
      <AlertContainer>
        <Alert />
      </AlertContainer>
    </>
  );
};

const AlertContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
});

const UserLoginContainer = styled.div(({ isRegistering }) => [
  {
    margin: '10% 26% 0px 26%',
    textAlign: 'center',
  },
  isRegistering && {
    marginTop: '1%',
  },
]);

const ButtonContainer = styled.div({
  margin: 10,
});

const LoginTextContainer = styled.div({
  marginTop: '100px',
});

const LoginText = styled(Typography)({
  margin: '10px 0',
});
