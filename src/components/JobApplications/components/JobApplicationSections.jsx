import React, { useContext } from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';

import { DynamicFormInputs } from '../../DynamicFormInputs/DynamicFormInputs';
import { DynamicList } from '../../DynamicList/DynamicList';

import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

export const JobApplicationSection = ({ section }) => {
  const { darkMode } = useContext(DarkLightModeContext);

  const inputs = <DynamicFormInputs inputs={section.inputs} />;

  return (
    <JobAppSectionContainer container>
      <Grid item xs={12}>
        <JobAppSectionHeader darkMode={darkMode} variant='h4'>
          {section.title}
        </JobAppSectionHeader>
      </Grid>
      <Grid item xs={12}>
        <JobAppSectionHeader darkMode={darkMode} variant='subtitle1' component='span'>
          {section.instructions}
        </JobAppSectionHeader>
      </Grid>
      {section.dynamicList ? <DynamicList children={inputs} /> : inputs}
    </JobAppSectionContainer>
  );
};

const JobAppSectionContainer = styled(Grid)({
  padding: 20,
});

const JobAppSectionHeader = styled(Typography)(({ darkMode }) => ({
  color: darkMode ? '#fafafa' : 'inherit',
  paddingBottom: 10,
}));
