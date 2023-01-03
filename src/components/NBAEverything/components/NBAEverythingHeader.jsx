import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';

import NBALogo from '../../../assets/nba.png';

const NBAEverythingHeader = () => (
  <Grid container>
    <Grid item xs={11} sm={9} md={6} lg={4} xl={3}>
      <Grid container justifyContent='space-around'>
        <NBALogoImage src={NBALogo} />
        <NBAEverythingTitleText variant='h3'>...everything</NBAEverythingTitleText>
      </Grid>
    </Grid>
  </Grid>
);

export default NBAEverythingHeader;

export const NBAEverythingTitleText = styled(Typography)({
  transform: 'translateY(39%)',
});

export const NBALogoImage = styled.img({
  height: 105,
  width: 155,
});


