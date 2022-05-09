import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Grid, TextField, Typography, Button } from '@mui/material';
import { DynamicList } from '../../DynamicList/DynamicList';
import { BASIC_JOB_APP_INPUTS } from '../constants/BASIC_JOB_APP_INPUTS';
import { DynamicFormInputs } from '../../DynamicFormInputs/DynamicFormInputs';

export const BasicJobApplication = () => (
  <JobAppContainer container spacing={2}>
    <JobAppTitleContainer container>
      <Grid item xs={12}>
        <Typography variant='h4'>Application for Employment</Typography>
      </Grid>
    </JobAppTitleContainer>
    <FileUploadContainer item xs={12}>
      <DynamicList
        title='Upload supporting documents'
        addColor='forestgreen'
        removeColor='maroon'
        children={<TextField type='file' />}
      />
    </FileUploadContainer>
    <DynamicFormInputs inputs={BASIC_JOB_APP_INPUTS} />
    <Grid container justifyContent='flex-end'>
      <Link to='/app-complete'>
        <SubmitButton size='large' color='info' variant='contained'>
          Submit Application
        </SubmitButton>
      </Link>
    </Grid>
  </JobAppContainer>
);

const JobAppContainer = styled(Grid)({
  transform: 'translateY(50px)',
  marginLeft: '9%',
  width: '80%',
  textAlign: 'center',
  padding: 60,
  borderRadius: 10,
  border: '1px solid lightgrey',
  backgroundColor: '#F5F5F5',
  boxShadow: '5px 3px 3px grey',
});

const JobAppTitleContainer = styled(Grid)({
  marginBottom: 30,
});

const SubmitButton = styled(Button)({
  marginTop: 50,
});

const FileUploadContainer = styled(Grid)({
  borderRadius: 6,
  border: '1px dashed gainsboro',
  background: '#FAFAFA',
  boxShadow: '1px 1px 2px grey',
  padding: 20,
  margin: '0 100px 40px 100px',
});
