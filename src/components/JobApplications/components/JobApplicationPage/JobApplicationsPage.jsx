import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';

import { JobApplicationType } from './components/JobApplicationType';
import { LoaderSpinner } from '../../../LoaderSpinner/LoaderSpinner';

import { DarkLightModeContext } from '../../../DarkLightMode/context/DarkLightModeContext';

export const JobApplicationsPage = () => {
  const { darkMode } = React.useContext(DarkLightModeContext);

  const [appType, setAppType] = useState('basic');
  const [loading, setLoading] = useState(null);

  const handleAppTypeChange = e => {
    setLoading(true);
    setTimeout(() => {
      setAppType(e.target.value);
      setLoading(null);
    }, 600);
  };

  return (
    <>
      <PageBodyStyle darkMode={darkMode} />
      <JobApplicationsSelectRow darkMode={darkMode} container>
        <Grid item xs={12} md={6} lg={4}>
          <FormControl fullWidth>
            <InputLabel>
              <JobApplicationSelectLabelText darkMode={darkMode} variant='h6' component='label'>
                Select one
              </JobApplicationSelectLabelText>
            </InputLabel>
            <JobApplicationSelect
              label='Select one'
              onChange={handleAppTypeChange}
              value={appType}
              variant='standard'
            >
              <MenuItem value='basic'>Basic</MenuItem>
              <MenuItem value='advanced'>Advanced</MenuItem>
              <MenuItem value='multi-page'>Mulit-Page</MenuItem>
            </JobApplicationSelect>
          </FormControl>
        </Grid>
      </JobApplicationsSelectRow>
      <Grid container>
        <Grid item xs={12}>
          <JobApplicationType appType={appType} />
        </Grid>
      </Grid>
      <LoaderSpinner open={loading} />
    </>
  );
};

export const PageBodyStyle = createGlobalStyle(({ darkMode }) => ({
  body: {
    backgroundColor: darkMode ? '#5c5c5c' : 'white',
  },
}));

export const JobApplicationsSelectRow = styled(Grid)(({ darkMode }) => ({
  backgroundColor: darkMode ? 'grey' : 'whitesmoke',
  borderTop: darkMode ? 'none' : '1px dashed #759CC9',
  padding: '20px 5px',
  position: 'sticky',
  top: 80,
  zIndex: 2,
}));

export const JobApplicationSelect = styled(Select)({
  backgroundColor: 'gainsboro',
  padding: 5,
  borderRadius: 5,
  marginLeft: 10,
});

export const JobApplicationSelectLabelText = styled(Typography)(({ darkMode }) => ({
  color: darkMode ? 'beige' : '#759CC9',
}));
