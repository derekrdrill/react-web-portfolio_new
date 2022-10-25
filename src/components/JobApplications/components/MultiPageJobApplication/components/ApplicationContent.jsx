import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Grid, Typography } from '@mui/material';

import { DarkLightModeContext } from '../../../../DarkLightMode/context/DarkLightModeContext';

import { JobApplicationSection } from '../../Common/JobApplicationSections';
import { ApplicationReviewToolbar } from './ApplicationReviewToolbar';

export const ApplicationContent = ({
  editMode,
  goForward,
  inputs,
  maxPage,
  page,
  toggleEditMode,
}) => {
  const { darkMode } = React.useContext(DarkLightModeContext);

  return (
    <ApplicationContentGrid container page={page} maxpage={maxPage}>
      {page < 1 ? (
        <Grid container className='landing-page'>
          <Grid item md={8}>
            <Typography variant='h4' component='h1'>
              Application for Employment
            </Typography>
            <Typography variant='subtitle1' component='h1'>
              Please carefully read and complete the following 8 section application
            </Typography>
            <Typography variant='subtitle1' component='h1'>
              <i>
                You can cancel at any time but will not be able to submit this application until all
                questions are answered
              </i>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <StartApplicationButton variant='contained' onClick={goForward}>
              Click here to begin the application
            </StartApplicationButton>
          </Grid>
        </Grid>
      ) : (
        <AdvancedAppInputsContainer
          className='app-inputs'
          darkMode={darkMode}
          item
          xs={12}
          $editing={editMode}
          page={page}
          maxpage={maxPage}
        >
          <ApplicationReviewToolbar
            editMode={editMode}
            maxPage={maxPage}
            page={page}
            toggleEditMode={toggleEditMode}
          />
          {inputs.map(section => (
            <JobApplicationSectionContainer
              key={section.id}
              $isOnLastPage={maxPage === page}
              $isOnPage={section.id === page}
            >
              <JobApplicationSection section={section} />
            </JobApplicationSectionContainer>
          ))}
        </AdvancedAppInputsContainer>
      )}
    </ApplicationContentGrid>
  );
};

ApplicationContent.propTypes = {
  editMode: PropTypes.bool,
  goForward: PropTypes.func,
  inputs: PropTypes.array,
  maxPage: PropTypes.number,
  page: PropTypes.number,
  toggleEditMode: PropTypes.func,
};

export const ApplicationContentGrid = styled(Grid)(({ page, maxpage }) => ({
  paddingTop: page < 1 ? 200 : page === maxpage ? 30 : 0,
  paddingLeft: page < 1 ? 40 : page === maxpage ? '5%' : '1%',
  paddingRight: page === maxpage && '5%',
}));

export const AdvancedAppInputsContainer = styled(Grid)(({ darkMode, page, maxpage, $editing }) => [
  page === maxpage && {
    borderColor: darkMode ? 'transparent' : 'lightgrey',
    borderRadius: 5,
    backgroundColor: darkMode ? '#2e2e2e' : '#F5F5F5',
    boxShadow: '5px 3px 3px grey',
    margin: '10px 30px 10px 30px',
    '.MuiButton-root': {
      pointerEvents: !$editing && 'none',
      color: !$editing && 'lightgrey',
    },
    '.MuiInputBase-input, .MuiInputBase-root': {
      backgroundColor: !$editing && (darkMode ? 'darkgrey' : 'gainsboro'),
      pointerEvents: !$editing && 'none',
    },
  },
]);

export const JobApplicationSectionContainer = styled(Grid)(({ $isOnPage, $isOnLastPage }) => ({
  display: $isOnPage || $isOnLastPage ? 'inline-block' : 'none',
}));

export const StartApplicationButton = styled(Button)({
  backgroundColor: '#357960',
  ':hover': {
    backgroundColor: '#4dcb9d',
  },
});
