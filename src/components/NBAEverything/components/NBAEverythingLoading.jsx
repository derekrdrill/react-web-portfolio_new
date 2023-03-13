import React from 'react';
import styled from 'styled-components';
import { Alert, CircularProgress, Grid, Typography } from '@mui/material';

const NBAEverythingLoading = () => (
  <NBAEverythingLoadingContainer>
    <Grid item xs={12}>
      <NBAEverythingLoadingAlert severity='info'>
        <Grid container>
          <NBAEverythingLoadingSpinner />
          <Typography variant='h6' color='black'>
            Loading...
          </Typography>
        </Grid>
      </NBAEverythingLoadingAlert>
    </Grid>
  </NBAEverythingLoadingContainer>
);

export default NBAEverythingLoading;

export const NBAEverythingLoadingContainer = styled(Grid)({
  backgroundColor: 'gray',
  bottom: 0,
  height: '100%',
  left: 0,
  opacity: 0.7,
  overflow: 'hidden',
  position: 'fixed',
  right: 0,
  top: 80,
  zIndex: 1,
});

export const NBAEverythingLoadingAlert = styled(Alert)({
  '.MuiAlert-icon': {
    display: 'none',
  },
  '.MuiAlert-message': {
    overflow: 'hidden',
  },
  opacity: 0.8,
  position: 'absolute',
  right: 20,
  top: 10,
  width: '35%',
  zIndex: '2 !important',
});

export const NBAEverythingLoadingSpinner = styled(CircularProgress)({
  marginRight: 20,
});
