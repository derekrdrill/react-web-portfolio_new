import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Grid, Typography, Button } from '@mui/material';

import { JobApplicationSection } from './JobApplicationSections';

import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

import { ADVANCED_JOB_APP_INPUTS } from '../constants/ADVANCED_JOB_APP_INPUTS';
import headerLogo from '../../../assets/header-logo.png';

export const AdvancedJobApplication = () => {
  const { darkMode } = useContext(DarkLightModeContext);

  return (
    <JobAppContainer item darkMode={darkMode}>
      <JobAppHeaderContainer container darkMode={darkMode}>
        <JobAppImageContainer item xs={12} md={3}>
          <Grid container justifyContent={{ xs: 'center', sm: 'flex-start' }}>
            <img src={headerLogo} />
          </Grid>
        </JobAppImageContainer>
        <JobAppTitleContainer item xs={12} md={9}>
          <Grid container justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
            <Typography textAlign={{ xs: 'center' }} variant='h3'>
              Application for Employment
            </Typography>
          </Grid>
        </JobAppTitleContainer>
        <JobAppInstructionsContainer container justifyContent='center'>
          <Typography component='span' textAlign={{ xs: 'center' }} variant='h6'>
            Please carefully read and answer all questions below. You will not be able to submit this application until
            all questions are answered.
          </Typography>
        </JobAppInstructionsContainer>
      </JobAppHeaderContainer>
      <div style={{ borderRight: '1px dashed black', borderLeft: '1px dashed black' }}>
        {ADVANCED_JOB_APP_INPUTS.map(section => (
          <JobApplicationSection key={section.id} section={section} />
        ))}
        <Grid container justifyContent='flex-end'>
          <JobAppSubmitButtonContainer item>
            <Link to='/app-complete'>
              <Button size='large' color='info' variant='contained'>
                Submit Application
              </Button>
            </Link>
          </JobAppSubmitButtonContainer>
        </Grid>
      </div>
    </JobAppContainer>
  );
};

const JobAppContainer = styled(Grid)(({ darkMode }) => ({
  borderRadius: 5,
  border: '1px solid lightgrey',
  backgroundColor: darkMode ? '#5c5c5c' : '#F5F5F5',
  boxShadow: '5px 3px 3px grey',
}));

const JobAppTitleContainer = styled(Grid)({
  padding: '30px 0',
});

const JobAppHeaderContainer = styled(Grid)(({ darkMode }) => ({
  backgroundColor: darkMode ? 'darkgrey' : 'gainsboro',
  borderRadius: '5px 5px 0 0',
  padding: 10,
}));

const JobAppSubmitButtonContainer = styled(Grid)({
  padding: 10,
});

const JobAppImageContainer = Grid;
const JobAppInstructionsContainer = Grid;
