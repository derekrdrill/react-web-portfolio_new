import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';

import derekBroken from '../../assets/derekBroken.png';

const ErrorFallback = () => {
  return (
    <ErrorFallbackContainer container>
      <Grid item xs={12}>
        <Typography variant='h5' textAlign='center'>
          Uh oh.. looks like something broke 😭💔
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent='center'>
          <ErrorFallbackImage src={derekBroken} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='body1' textAlign='center'>
          This has been logged, and is actively being fixed
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='body1' textAlign='center'>
          Until then, try <a href='/'>going home</a> and continue browsing
        </Typography>
      </Grid>
    </ErrorFallbackContainer>
  );
};

ErrorFallback.propTypes = {
  children: PropTypes.node,
};

export default ErrorFallback;

export const ErrorFallbackContainer = styled(Grid)({
  backgroundColor: 'azure',
  height: '100vh',
  paddingTop: 50,
});

export const ErrorFallbackImage = styled.img({
  borderRadius: 100,
});
