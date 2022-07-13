import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Button, Typography } from '@mui/material';

import { DynamicFormInputs } from '../../DynamicFormInputs/DynamicFormInputs';

import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';
import { UserAuthenticationContext } from '../context/UserAuthenticationContext';
import { AlertContext } from '../../Alert/context/AlertContext';
import { allFieldsFilled, handleSubmit } from '../context/UserAuthenticationActions';
import { formInputsGenerator } from '../../../utils/formInputsGenerator';

import { USER_REGISTER_INPUTS } from '../constants/USER_REGISTER_INPUTS';

export const UserRegister = () => {
  const { darkMode } = useContext(DarkLightModeContext);
  const { userAuthenticationDispatch } = useContext(UserAuthenticationContext);
  const { alertDispatch } = useContext(AlertContext);

  const [form, setForm] = useState(formInputsGenerator(USER_REGISTER_INPUTS));

  return (
    <>
      <RegisterText darkMode={darkMode} component='h4' variant='h4'>
        Sign up
      </RegisterText>
      <RegisterText darkMode={darkMode} component='p' variant='p'>
        Fill in all information below to sign up today!
      </RegisterText>
      <DynamicFormInputs inputs={USER_REGISTER_INPUTS} form={form} setForm={setForm} />
      <ButtonContainer>
        <Button
          disabled={allFieldsFilled(form)}
          color='info'
          fullWidth
          onClick={() => handleSubmit(form, alertDispatch, userAuthenticationDispatch)}
          variant='contained'
        >
          Submit
        </Button>
      </ButtonContainer>
    </>
  );
};

const RegisterText = styled(Typography)(({ darkMode }) => ({
  margin: '10px 0',
  color: darkMode && 'beige',
}));

const ButtonContainer = styled.div({
  margin: 10,
});
