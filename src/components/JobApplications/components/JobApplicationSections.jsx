import React from 'react';
import styled from 'styled-components';
import { DynamicFormInputs } from '../../DynamicFormInputs/DynamicFormInputs';
import { DynamicList } from '../../DynamicList/DynamicList';
import { Grid, Typography } from '@mui/material';

export const JobApplicationSection = ({ section }) => {
  const inputs = <DynamicFormInputs inputs={section.inputs} />;

  return (
    <JobAppSectionContainer container>
      <Grid item xs={12}>
        <JobAppSectionHeader variant='h4'>{section.title}</JobAppSectionHeader>
      </Grid>
      <Grid item xs={12}>
        <JobAppSectionHeader variant='subtitle1' component='span'>
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

const JobAppSectionHeader = styled(Typography)({
  paddingBottom: 10,
});
