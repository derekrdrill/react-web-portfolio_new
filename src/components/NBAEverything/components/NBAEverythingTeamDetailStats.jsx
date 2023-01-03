import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';

const NBAEverythingTeamDetailStats = ({ statType, statData }) => (
  <StatGridItem item xs={2} md={12}>
    <Typography variant='h6' sx={{ textAlign: { xs: 'center', md: 'left' } }}>
      {statType}
    </Typography>
    <Typography variant='body2' sx={{ textAlign: { xs: 'center', md: 'left' } }}>
      {statData}
    </Typography>
  </StatGridItem>
);

NBAEverythingTeamDetailStats.propTypes = {
  statType: PropTypes.string,
  statData: PropTypes.string,
};

export default NBAEverythingTeamDetailStats;

const StatGridItem = styled(Grid)({
  padding: 6,
});
