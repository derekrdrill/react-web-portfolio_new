import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faLock, faChevronLeft, faChevronRight } from '@fortawesome/fontawesome-free-solid';
import { JobApplicationSection } from './JobApplicationSections';
import { Breadcrumb } from '../../Breadcrumb/Breadcrumb';
import { Button, IconButton, Grid, Typography, Toolbar } from '@mui/material';
import { ProgressBar } from '../../ProgressBar/ProgressBar';
import { ADVANCED_JOB_APP_INPUTS } from '../constants/ADVANCED_JOB_APP_INPUTS';

const AppLandingPage = ({ goForward }) => (
  <Grid container>
    <Grid item md={8}>
      <Typography variant='h4' component='h1'>
        Application for Employment
      </Typography>
      <Typography variant='subtitle1' component='h1'>
        Please carefully read and complete the following 8 section application
      </Typography>
      <Typography variant='subtitle1' component='h1'>
        <i>
          You can cancel at any time but will not be able to submit this application until all questions are answered
        </i>
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <StartApplicationButton variant='contained' onClick={goForward}>
        Click here to begin the application
      </StartApplicationButton>
    </Grid>
  </Grid>
);
const JobAppInputs = ({ editMode, toggleEditMode, page, maxPage }) => (
  <AdvancedAppInputsContainer item xs={12} editing={editMode} page={page} maxpage={maxPage}>
    {page === maxPage && <ReviewJobAppToolbar editMode={editMode} toggleEditMode={toggleEditMode} />}
    {ADVANCED_JOB_APP_INPUTS.map(section => (
      <JobApplicationSectionContainer
        item
        key={section.id}
        xs={12}
        page={page}
        sectionid={section.id}
        maxpage={maxPage}
      >
        <JobApplicationSection section={section} />
      </JobApplicationSectionContainer>
    ))}
  </AdvancedAppInputsContainer>
);
const NavigationButtons = ({ page, maxPage, goBackward, goForward }) => (
  <Grid container>
    <Grid item xs={6}>
      <StyledButton onClick={goBackward}>
        <FontAwesomeIcon icon={faChevronLeft} />
        {`\u00A0\u00A0BACK TO ${page > 1 ? ADVANCED_JOB_APP_INPUTS[page - 2].title : 'LANDING PAGE'}`}
      </StyledButton>
    </Grid>
    <Grid item xs={6}>
      <Grid container justifyContent='flex-end'>
        {page === maxPage ? (
          <StyledLink to='/app-complete'>
            <StyledButton>
              {`${'SUBMIT APPLICATION'}\u00A0\u00A0`}
              <FontAwesomeIcon icon={faChevronRight} />
            </StyledButton>
          </StyledLink>
        ) : (
          <StyledButton onClick={goForward}>
            {`${page < maxPage - 1 ? `GO TO ${ADVANCED_JOB_APP_INPUTS[page].title}` : 'GO TO REVIEW'}
                            \u00A0\u00A0`}
            <FontAwesomeIcon icon={faChevronRight} />
          </StyledButton>
        )}
      </Grid>
    </Grid>
  </Grid>
);
const ReviewJobAppToolbar = ({ editMode, toggleEditMode }) => (
  <StyledToolbar>
    <EditIcon onClick={toggleEditMode}>
      <FontAwesomeIcon icon={editMode ? faLock : faPenSquare} />
    </EditIcon>
  </StyledToolbar>
);
export const MultiPageJobApplication = () => {
  const [progress, setProgress] = useState(0);
  const [page, setPage] = useState(0);
  const maxPage = 8;

  const goForward = () => {
    if (page < maxPage) {
      setPage(page + 1);
      setProgress(((page + 1) / maxPage) * 100);
    } else {
      setPage(maxPage + 1);
    }
  };

  const goBackward = () => {
    setPage(page - 1);
    setProgress(((page - 1) / maxPage) * 100);
  };

  const setPageByBreadcrumb = e => {
    let breadcrumbPage = Number(e.target.id);
    setPage(breadcrumbPage);
    setProgress((breadcrumbPage / maxPage) * 100);
  };

  const [editMode, setEditMode] = useState(null);
  const toggleEditMode = () => setEditMode(!editMode ? 'true' : null);

  return (
    <div>
      <PageBodyStyle page={page} maxpage={maxPage} />
      {page <= maxPage && <ProgressBar progress={progress} page={page} />}
      {page >= 1 && page <= maxPage && (
        <div>
          <Breadcrumb
            breadcrumbs={ADVANCED_JOB_APP_INPUTS}
            breadcrumbClick={setPageByBreadcrumb}
            page={page}
            maxPage={maxPage}
            separator='|'
            endCrumb={'Review'}
          />
          <NavigationButtons page={page} maxPage={maxPage} goBackward={goBackward} goForward={goForward} />
        </div>
      )}
      <ApplicationContainer container page={page} maxpage={maxPage}>
        {page < 1 ? (
          <AppLandingPage goForward={goForward} />
        ) : (
          <JobAppInputs editMode={editMode} toggleEditMode={toggleEditMode} page={page} maxPage={maxPage} />
        )}
      </ApplicationContainer>
    </div>
  );
};

const PageBodyStyle = createGlobalStyle(({ page }) => [
  page < 1 && {
    body: {
      backgroundImage: 'linear-gradient(to right, #851e38 , #e68fa4)',
    },
    'h1, h2, h3, h4, h5, h6': {
      color: 'beige',
    },
  },
]);

const ApplicationContainer = styled(Grid)(({ page, maxpage }) => ({
  paddingTop: page < 1 ? 200 : page === maxpage ? 30 : 75,
  paddingLeft: page < 1 && 40,
}));

const StartApplicationButton = styled(Button)({
  backgroundColor: '#357960',
  ':hover': {
    backgroundColor: '#4dcb9d',
  },
});

const AdvancedAppInputsContainer = styled(Grid)(({ page, maxpage, editing }) => [
  page === maxpage && {
    border: '1px solid lightgrey',
    borderRadius: 5,
    backgroundColor: '#F5F5F5',
    boxShadow: '5px 3px 3px grey',
    margin: '10px 30px 10px 30px',
    '.MuiButton-root': {
      pointerEvents: !editing && 'none',
      color: !editing && 'lightgrey',
    },
    '.MuiInputBase-input, .MuiInputBase-root': {
      backgroundColor: !editing && 'gainsboro',
      pointerEvents: !editing && 'none',
    },
  },
]);

const JobApplicationSectionContainer = styled(Grid)(({ page, sectionid, maxpage }) => [
  page < maxpage && {
    display: page !== sectionid && 'none',
  },
]);

const StyledToolbar = styled(Toolbar)({
  backgroundColor: 'gainsboro',
});

const EditIcon = styled(IconButton)({
  path: {
    fill: 'darkslategrey',
    borderRadius: 5,
  },
});

const StyledButton = styled(Button)({
  marginTop: 15,
});

const StyledLink = styled(Link)({
  textDecoration: 'none',
});
