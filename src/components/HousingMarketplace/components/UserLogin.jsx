import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { DynamicFormInputs } from '../../DynamicFormInputs/DynamicFormInputs';
import { Button, Typography } from '@mui/material';
import { UserAuthenticationContext } from '../context/UserAuthenticationContext';
import { USER_LOGIN_INPUTS } from '../constants/USER_LOGIN_INPUTS';
import { UserRegister } from './UserRegister';

export const UserLogin = () => {
  const { isRegistering, userAuthenticationDispatch } = useContext(UserAuthenticationContext);
  const [signInItem, setSignInItem] = useState({});

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
        alert('Username does not exist');
      } else {
        if (!passwordMatch) {
          alert('Password does not match');
        } else {
          userAuthenticationDispatch({ type: 'SIGN_IN' });
        }
      }
    }
  };

  const handlesetIsRegistering = () => userAuthenticationDispatch({ type: 'REGISTER' });

  return (
    <UserLoginContainer>
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
  );
};

const UserLoginContainer = styled.div({
  margin: '10% 26% 0px 26%',
  textAlign: 'center',
});

const ButtonContainer = styled.div({
  margin: 10,
});

const LoginTextContainer = styled.div({
  marginTop: '100px',
});

const LoginText = styled(Typography)({
  margin: '10px 0',
});
