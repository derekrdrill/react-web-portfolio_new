import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Typography } from '@mui/material';
import { DynamicFormInputs } from '../../DynamicFormInputs/DynamicFormInputs';
import { USER_REGISTER_INPUTS } from '../constants/USER_REGISTER_INPUTS';

const validateUserItem = async userItem => {
  const { email, username, password, confirmPassword } = userItem;

  if (password !== confirmPassword) {
    return 'Passwords do not match';
  } else {
    const response = await fetch(`checkForUser/${email}/${username}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).catch(e => console.warn(e));

    if (response.ok) {
      const { msg } = await response.json();

      if (msg) {
        return msg;
      }
    }
  }

  return null;
};

const addUserItem = async userItem => {
  const response = await fetch('addUser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userItem),
  }).catch(e => console.warn(e));

  if (!response.ok) {
    console.warn(Promise.reject(response));
  }
};

export const UserRegister = () => {
  const [userItem, setUserItem] = useState({});

  const handleUserItemChange = e => {
    const itemID = e.currentTarget.id;
    const itemValue = e.currentTarget.value;

    setUserItem({ ...userItem, [itemID]: itemValue });
  };

  const handleSubmit = async () => {
    const validationMsg = await validateUserItem(userItem);
    console.log(userItem);

    if (validationMsg) {
      alert(validationMsg);
    } else {
      const { firstName, lastName, email, username, password } = userItem;

      addUserItem({
        firstName: firstName,
        lastName: lastName,
        email: email,
        userName: username,
        password: password,
      });
    }
  };

  console.log(userItem);

  return (
    <UserRegisterContainer>
      <RegisterTextContainer>
        <RegisterText component='h4' variant='h4'>
          Sign up
        </RegisterText>
        <RegisterText component='p' variant='p'>
          Fill in all information below to sign up today!
        </RegisterText>
      </RegisterTextContainer>
      <DynamicFormInputs inputs={USER_REGISTER_INPUTS} onChange={handleUserItemChange} />
      <ButtonContainer>
        <Button color='info' fullWidth onClick={handleSubmit} variant='contained'>
          Submit
        </Button>
      </ButtonContainer>
    </UserRegisterContainer>
  );
};

const UserRegisterContainer = styled.div({
  margin: '10% 26% 0px 26%',
  textAlign: 'center',
});

const RegisterTextContainer = styled.div({
  marginTop: '100px',
});

const RegisterText = styled(Typography)({
  margin: '10px 0',
});

const ButtonContainer = styled.div({
  margin: 10,
});
