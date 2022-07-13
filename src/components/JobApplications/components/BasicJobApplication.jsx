import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Grid, TextField, Typography, Button } from '@mui/material';
import { DynamicList } from '../../DynamicList/DynamicList';
import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

import { formInputsGenerator } from '../../../utils/formInputsGenerator';

import { BASIC_JOB_APP_INPUTS } from '../constants/BASIC_JOB_APP_INPUTS';
import { DynamicFormInputs } from '../../DynamicFormInputs/DynamicFormInputs';

export const BasicJobApplication = () => {
  const { darkMode } = useContext(DarkLightModeContext);
  const [form, setForm] = useState(formInputsGenerator(BASIC_JOB_APP_INPUTS));

  return (
    <JobAppContainer darkMode={darkMode} container spacing={2}>
      <JobAppTitleContainer container>
        <Grid item xs={12}>
          <JobAppTitleText darkMode={darkMode} variant='h4'>
            Application for Employment
          </JobAppTitleText>
        </Grid>
      </JobAppTitleContainer>
      <FileUploadContainer darkMode={darkMode} item xs={12}>
        <DynamicList
          title='Upload supporting documents'
          addColor='forestgreen'
          removeColor='maroon'
          children={<TextField type='file' />}
        />
      </FileUploadContainer>
      <DynamicFormInputs inputs={BASIC_JOB_APP_INPUTS} form={form} setForm={setForm} />
      <Grid container justifyContent='flex-end'>
        <Link to='/app-complete'>
          <SubmitButton size='large' color='info' variant='contained'>
            Submit Application
          </SubmitButton>
        </Link>
      </Grid>
    </JobAppContainer>
  );
};

const JobAppContainer = styled(Grid)(({ darkMode }) => ({
  transform: 'translateY(50px)',
  marginLeft: '9%',
  width: '80%',
  textAlign: 'center',
  padding: 60,
  borderRadius: 10,
  border: darkMode ? 'none' : '1px solid lightgrey',
  backgroundColor: darkMode ? '#303030' : '#F5F5F5',
  boxShadow: darkMode ? '5px 3px 3px lightgrey' : '5px 3px 3px grey',
}));

const JobAppTitleContainer = styled(Grid)({
  marginBottom: 30,
});

const JobAppTitleText = styled(Typography)(({ darkMode }) => ({
  color: darkMode ? 'beige' : 'inherit',
}));

const SubmitButton = styled(Button)({
  marginTop: 50,
});

const FileUploadContainer = styled(Grid)(({ darkMode }) => ({
  'h1,h2,h3,h4,h5,h6': {
    color: darkMode ? '#E8DED1' : 'inherit',
  },
  borderRadius: 6,
  border: darkMode ? 'none' : '1px dashed gainsboro',
  background: darkMode ? '#808080' : '#FAFAFA',
  boxShadow: darkMode ? '3px 2px 5px lightgrey' : '1px 1px 2px grey',
  padding: 20,
  margin: '0 100px 40px 100px',
}));
