import React, { useContext, useState } from 'react';
import { history } from '../../../index';
import styled, { createGlobalStyle } from 'styled-components';
import { Button, Typography } from '@mui/material';
import { DynamicFormInputs } from '../../DynamicFormInputs/components/DynamicFormInputs';
import { UserRegister } from './UserRegister';
import { UserPasswordResetSend } from './UserPasswordResetSend';
import { AlertComponent as Alert } from '../../Alert/components/AlertComponent';

import { UserAuthenticationContext } from '../context/UserAuthenticationContext';
import { AlertContext } from '../../Alert/context/AlertContext';
import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';
import { handleAlert } from '../../Alert/context/AlertActions';
import { formInputsGenerator } from '../../../utils/formInputsGenerator';

import { USER_LOGIN_INPUTS } from '../constants/USER_LOGIN_INPUTS';

export const UserLogin = () => {
  const { isRegistering, forgotPassword, userAuthenticationDispatch } = useContext(UserAuthenticationContext);
  const { alertDispatch } = useContext(AlertContext);
  const { darkMode } = useContext(DarkLightModeContext);

  const [form, setForm] = useState(formInputsGenerator(USER_LOGIN_INPUTS));

  const allFieldsFilled = form.username && form.password;

  const handleSignIn = async () => {
    const { username, password } = form;

    const response = await fetch(`../sign-in/${username}/${password}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).catch(e => console.warn(e));

    if (response.ok) {
      const { userNameExists, passwordMatch, token, userReturnData } = await response.json();
      const { username, firstName, lastName, email } = userReturnData;

      if (!userNameExists) {
        handleAlert('Username does not exist', 'Sign in error', 'error', alertDispatch);
      } else {
        if (!passwordMatch) {
          handleAlert('Password does not match', 'Sign in error', 'error', alertDispatch);
        } else {
          userAuthenticationDispatch({ type: 'SIGNED_IN' });
          sessionStorage.setItem('token', JSON.stringify(token));
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('firstName', firstName);
          sessionStorage.setItem('lastName', lastName);
          history.push('/housing-marketplace/explore');
        }
      }
    }
  };

  const handleForgotPassword = () => userAuthenticationDispatch({ type: 'FORGOT_PASSWORD' });

  const handlesetIsRegistering = () => userAuthenticationDispatch({ type: 'REGISTER' });

  const handleBackToSignIn = () => userAuthenticationDispatch({ type: 'SIGN_IN' });

  return (
    <>
      <PageBodyStyle darkMode={darkMode} />
      {(isRegistering || forgotPassword) && <Button onClick={handleBackToSignIn}>Back to sign in</Button>}
      <UserLoginContainer isRegistering={isRegistering}>
        {isRegistering ? (
          <UserRegister />
        ) : forgotPassword ? (
          <UserPasswordResetSend />
        ) : (
          <>
            <LoginTextContainer>
              <LoginText darkMode={darkMode} component='h4' variant='h4'>
                User sign-in
              </LoginText>
            </LoginTextContainer>
            <DynamicFormInputs inputs={USER_LOGIN_INPUTS} form={form} setForm={setForm} />
            <ButtonContainer>
              <Button
                disabled={!allFieldsFilled}
                fullWidth
                onClick={handleSignIn}
                variant={darkMode ? 'contained' : 'outlined'}
              >
                Sign in
              </Button>
            </ButtonContainer>
            <Button onClick={handleForgotPassword}>Forgot password?</Button>
            <NotAMemberText darkMode={darkMode} paragraph>
              Not a member?
              <Button onClick={handlesetIsRegistering}>Sign up now</Button>
            </NotAMemberText>
          </>
        )}
      </UserLoginContainer>
      <AlertContainer>
        <Alert />
      </AlertContainer>
    </>
  );
};

const PageBodyStyle = createGlobalStyle(({ darkMode }) => ({
  body: {
    backgroundColor: darkMode && '#292929',
  },
}));

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

const LoginText = styled(Typography)(({ darkMode }) => ({
  margin: '10px 0',
  color: darkMode ? 'beige' : 'inherit',
}));

const NotAMemberText = styled(Typography)(({ darkMode }) => ({
  color: darkMode ? 'beige' : 'inherit',
}));
