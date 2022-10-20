import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';

import { ApplicationBackButton } from './ApplicationBackButton';
import { ApplicationForwardButton } from './ApplicationForwardButton';

export const ApplicationButtons = ({ goBackward, goForward, inputs, maxPage, page }) => (
  <Grid container>
    <Grid item xs={6}>
      <ApplicationBackButton inputs={inputs} goBackward={goBackward} page={page} />
    </Grid>
    <Grid item xs={6}>
      <Grid container justifyContent='flex-end'>
        <ApplicationForwardButton
          goForward={goForward}
          inputs={inputs}
          maxPage={maxPage}
          page={page}
        />
      </Grid>
    </Grid>
  </Grid>
);

ApplicationButtons.propTypes = {
  goBackward: PropTypes.func,
  goForward: PropTypes.func,
  inputs: PropTypes.array,
  maxPage: PropTypes.number,
  page: PropTypes.number,
};
