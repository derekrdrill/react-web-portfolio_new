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
        <Typography component='h5'>Upload supporting documents</Typography>
        <FileUploadScrollContainer container darkMode={darkMode}>
          <DynamicList
            addColor='forestgreen'
            removeColor='maroon'
            children={<FileUpload darkMode={darkMode} type='file' />}
          />
        </FileUploadScrollContainer>
      </FileUploadContainer>
      <DynamicFormInputs inputs={BASIC_JOB_APP_INPUTS} form={form} setForm={setForm} />
      <Grid container justifyContent='flex-end'>
        <Grid item xs={12} md={6} lg={4}>
          <Link to='/app-complete'>
            <SubmitButton color='info' fullWidth size='large' variant='contained'>
              Submit Application
            </SubmitButton>
          </Link>
        </Grid>
      </Grid>
    </JobAppContainer>
  );
};

const JobAppContainer = styled(Grid)(({ darkMode }) => ({
  backgroundColor: darkMode ? '#303030' : '#F5F5F5',
  border: darkMode ? 'none' : '1px solid lightgrey',
  borderRadius: 10,
  boxShadow: darkMode ? '5px 3px 3px lightgrey' : '5px 3px 3px grey',
  marginLeft: '9%',
  marginTop: 25,
  padding: 60,
  textAlign: 'center',
  width: '80%',
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
  background: darkMode ? '#808080' : '#FAFAFA',
  border: darkMode ? 'none' : '1px dashed gainsboro',
  borderRadius: 6,
  boxShadow: darkMode ? '3px 2px 5px lightgrey' : '1px 1px 2px grey',
  marginBottom: 30,
  padding: 20,
}));

const FileUploadScrollContainer = styled(Grid)(({ darkMode }) => ({
  backgroundColor: darkMode ? '#8a8a8a' : '#f7f7f7',
  borderRadius: 5,
  marginTop: 20,
  maxHeight: 250,
  overflowY: 'auto',
  padding: 10,
}));

const FileUpload = styled(TextField)(({ darkMode }) => ({
  '.MuiInputBase-root': {
    backgroundColor: darkMode ? '#c7c7c7' : 'beige',
  },
}));
