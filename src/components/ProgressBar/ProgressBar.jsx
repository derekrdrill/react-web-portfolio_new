import React from 'react';
import styled from 'styled-components';
import { LinearProgress, Grid, Typography } from '@mui/material';

export const ProgressBar = ({ progress, percentageDecimals }) => (
  <StyledProgressBarContainer container>
    <Grid item xs={11}>
      <StyledProgressBar variant='determinate' value={progress || 0} progress={progress || 0} />
    </Grid>
    <ProgressPercentageContainer item xs={1} progress={progress || 0}>
      <Grid container justifyContent='center'>
        <ProgressPercentage variant='subtitle1' component='h6'>
          {progress.toFixed(percentageDecimals || 2)}%
        </ProgressPercentage>
      </Grid>
    </ProgressPercentageContainer>
  </StyledProgressBarContainer>
);

const StyledProgressBarContainer = styled(Grid)({
  marginTop: -5,
});

const StyledProgressBar = styled(LinearProgress)(({ progress }) => ({
  '&.MuiLinearProgress-root': {
    padding: 15,
    backgroundColor: progress < 100 ? '#c4accd' : '#00e60f',
  },
  '.MuiLinearProgress-bar': {
    backgroundColor: progress < 100 ? '#a800d6' : '#31b800',
  },
}));

const ProgressPercentageContainer = styled(Grid)(({ progress }) => ({
  backgroundColor: progress < 100 ? 'gainsboro' : '#31b800',
}));

const ProgressPercentage = styled(Typography)({
  marginTop: 4,
  color: 'black',
});
