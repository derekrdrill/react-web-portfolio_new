import React, { useState } from 'react';
import { history } from '../../../index';
import styled from 'styled-components';
import { Button, Typography } from '@mui/material';
import { DynamicFormInputs } from '../../DynamicFormInputs/DynamicFormInputs';

export const UserPasswordReset = () => {
  const pathName = history.location.pathname;
  const id = pathName.slice(pathName.indexOf('/id=') + 4, pathName.length);

  const [passwords, setPasswords] = useState({ password: '', confirmPassword: '' });

  const handleInputChange = e => {
    const itemID = e.currentTarget.id;
    const itemValue = e.currentTarget.value;

    setPasswords({ ...passwords, [itemID]: itemValue });
  };

  console.log(passwords);

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
          //   return msg;
          console.log(msg);
        }
      }
    } else {
      alert('passwords dont match!!');
    }
  };

  return (
    <UserPasswordResetContainer>
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
        <Button fullWidth onClick={handlePasswordReset} variant='contained'>
          Reset password
        </Button>
      </ButtonContainer>
    </UserPasswordResetContainer>
  );
};

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
