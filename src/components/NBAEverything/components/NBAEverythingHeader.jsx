import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';

import NBALogo from '../../../assets/nba.png';

const NBAEverythingHeader = () => (
  <Grid container>
    <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
      <Grid container justifyContent='space-around'>
        <NBALogoImage src={NBALogo} />
        <NBAEverythingTitleText variant='h2'>...everything</NBAEverythingTitleText>
      </Grid>
    </Grid>
  </Grid>
);

export default NBAEverythingHeader;

export const NBALogoImage = styled.img({
  height: 185,
  width: 235,
});

export const NBAEverythingTitleText = styled(Typography)({
  transform: 'translateY(45%)',
});
