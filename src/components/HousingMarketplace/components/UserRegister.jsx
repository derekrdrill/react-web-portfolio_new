import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Button, Typography } from '@mui/material';
import { DynamicFormInputs } from '../../DynamicFormInputs/DynamicFormInputs';
import { UserAuthenticationContext } from '../context/UserAuthenticationContext';
import { allFieldsFilled, handleSubmit } from '../context/UserAuthenticationActions';
import { AlertContext } from '../../Alert/context/AlertContext';
import { USER_REGISTER_INPUTS } from '../constants/USER_REGISTER_INPUTS';

export const UserRegister = () => {
  const { userAuthenticationDispatch } = useContext(UserAuthenticationContext);
  const { alertDispatch } = useContext(AlertContext);
  const [userItem, setUserItem] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleUserItemChange = e => {
    const itemID = e.currentTarget.id;
    const itemValue = e.currentTarget.value;

    setUserItem({ ...userItem, [itemID]: itemValue });
  };

  return (
    <>
      <RegisterText component='h4' variant='h4'>
        Sign up
      </RegisterText>
      <RegisterText component='p' variant='p'>
        Fill in all information below to sign up today!
      </RegisterText>
      <DynamicFormInputs inputs={USER_REGISTER_INPUTS} onChange={handleUserItemChange} />
      <ButtonContainer>
        <Button
          disabled={allFieldsFilled(userItem)}
          color='info'
          fullWidth
          onClick={() => handleSubmit(userItem, alertDispatch, userAuthenticationDispatch)}
          variant='contained'
        >
          Submit
        </Button>
      </ButtonContainer>
    </>
  );
};

const RegisterText = styled(Typography)({
  margin: '10px 0',
});

const ButtonContainer = styled.div({
  margin: 10,
});
