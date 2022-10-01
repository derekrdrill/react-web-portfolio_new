import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faLock, faChevronLeft, faChevronRight } from '@fortawesome/fontawesome-free-solid';
import { Button, IconButton, Grid, Typography, Toolbar } from '@mui/material';

import { JobApplicationSection } from './JobApplicationSections';
import { Breadcrumb as BreadcrumbComponent } from '../../Breadcrumb/Breadcrumb';
import { ProgressBar as ProgressBarComponent } from '../../ProgressBar/ProgressBar';

import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

import { ADVANCED_JOB_APP_INPUTS } from '../constants/ADVANCED_JOB_APP_INPUTS';

export const ProgressBar = ({ page, maxPage, progress }) =>
  page <= maxPage && <ProgressBarComponent progress={progress} page={page} />;

export const Breadcrumb = ({
  breadcrumbs,
  breadcrumbClick,
  darkMode,
  endCrumb,
  goBackward,
  goForward,
  maxPage,
  page,
  separator,
}) =>
  page >= 1 &&
  page <= maxPage && (
    <>
      <Grid container display={{ xs: 'none', sm: 'block' }}>
        <BreadcrumbComponent
          breadcrumbs={breadcrumbs}
          breadcrumbClick={breadcrumbClick}
          page={page}
          maxPage={maxPage}
          separator={separator}
          endCrumb={endCrumb}
        />
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          <StyledButton darkMode={darkMode} onClick={goBackward}>
            <FontAwesomeIcon icon={faChevronLeft} />
            <BackToButtonTitle page={page} inputs={ADVANCED_JOB_APP_INPUTS} />
          </StyledButton>
        </Grid>
        <Grid item xs={6}>
          <Grid container justifyContent='flex-end'>
            <ForwardOrSubmitButton
              darkMode={darkMode}
              goForward={goForward}
              inputs={ADVANCED_JOB_APP_INPUTS}
              maxPage={maxPage}
              page={page}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );

export const BackToButtonTitle = ({ page, inputs }) =>
  `\u00A0\u00A0BACK TO ${page > 1 ? inputs[page - 2].title : 'LANDING PAGE'}`;

export const ForwardButtonTitle = ({ page, maxPage, inputs }) =>
  `${page < maxPage - 1 ? `GO TO ${inputs[page].title}` : 'GO TO REVIEW'}\u00A0\u00A0`;

export const ForwardOrSubmitButton = ({ darkMode, page, maxPage, inputs, goForward }) =>
  page === maxPage ? (
    <StyledLink to='/app-complete'>
      <StyledButton darkMode={darkMode}>
        {`${'SUBMIT APPLICATION'}\u00A0\u00A0`}
        <FontAwesomeIcon icon={faChevronRight} />
      </StyledButton>
    </StyledLink>
  ) : (
    <StyledButton darkMode={darkMode} onClick={goForward}>
      <ForwardButtonTitle inputs={inputs} maxPage={maxPage} page={page} />
      <FontAwesomeIcon icon={faChevronRight} />
    </StyledButton>
  );

export const ApplicationContainer = ({ darkMode, inputs, page, maxPage, goForward, editMode, toggleEditMode }) => (
  <ApplicationContainerGrid container page={page} maxpage={maxPage}>
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
              You can cancel at any time but will not be able to submit this application until all questions are
              answered
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
        editing={editMode}
        page={page}
        maxpage={maxPage}
      >
        <ReviewJobAppToolbar
          darkMode={darkMode}
          editMode={editMode}
          toggleEditMode={toggleEditMode}
          page={page}
          maxPage={maxPage}
        />
        {inputs.map(section => {
          return (
            <JobApplicationSectionContainer
              container
              key={section.id}
              page={page}
              sectionid={section.id}
              maxpage={maxPage}
            >
              <JobApplicationSection section={section} />
            </JobApplicationSectionContainer>
          );
        })}
      </AdvancedAppInputsContainer>
    )}
  </ApplicationContainerGrid>
);

export const ReviewJobAppToolbar = ({ darkMode, page, maxPage, editMode, toggleEditMode }) =>
  page === maxPage && (
    <StyledToolbar darkMode={darkMode}>
      <EditIcon onClick={toggleEditMode}>
        <ReviewJobAppToolbarIcon editMode={editMode} />
      </EditIcon>
    </StyledToolbar>
  );

export const ReviewJobAppToolbarIcon = ({ editMode }) => <FontAwesomeIcon icon={editMode ? faLock : faPenSquare} />;

export const MultiPageJobApplication = () => {
  const { darkMode } = useContext(DarkLightModeContext);

  const [editMode, setEditMode] = useState(null);
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

  const toggleEditMode = () => setEditMode(!editMode ? 'true' : null);

  return (
    <div>
      <PageBodyStyle darkMode={darkMode} page={page} maxpage={maxPage} />
      <ProgressBar page={page} maxPage={maxPage} progress={progress} />
      <Breadcrumb
        breadcrumbs={ADVANCED_JOB_APP_INPUTS}
        breadcrumbClick={setPageByBreadcrumb}
        endCrumb={'Review'}
        darkMode={darkMode}
        goBackward={goBackward}
        goForward={goForward}
        maxPage={maxPage}
        page={page}
        separator={'|'}
      />
      <ApplicationContainer
        darkMode={darkMode}
        inputs={ADVANCED_JOB_APP_INPUTS}
        page={page}
        maxPage={maxPage}
        goForward={goForward}
        editMode={editMode}
        toggleEditMode={toggleEditMode}
      />
    </div>
  );
};

export const PageBodyStyle = createGlobalStyle(({ darkMode, page }) => [
  page < 1 && {
    body: {
      backgroundImage: 'linear-gradient(to right, #851e38 , #e68fa4)',
    },
    'h1, h2, h3, h4, h5, h6': {
      color: 'beige',
    },
  },
  page >= 1 && {
    backgroundColor: darkMode ? 'black' : 'white',
  },
]);

export const ApplicationContainerGrid = styled(Grid)(({ page, maxpage }) => ({
  paddingTop: page < 1 ? 200 : page === maxpage ? 30 : 75,
  paddingLeft: page < 1 && 40,
}));

const StartApplicationButton = styled(Button)({
  backgroundColor: '#357960',
  ':hover': {
    backgroundColor: '#4dcb9d',
  },
});

export const AdvancedAppInputsContainer = styled(Grid)(({ darkMode, page, maxpage, editing }) => [
  page === maxpage && {
    borderColor: darkMode ? 'transparent' : 'lightgrey',
    borderRadius: 5,
    backgroundColor: darkMode ? '#2e2e2e' : '#F5F5F5',
    boxShadow: '5px 3px 3px grey',
    margin: '10px 30px 10px 30px',
    '.MuiButton-root': {
      pointerEvents: !editing && 'none',
      color: !editing && 'lightgrey',
    },
    '.MuiInputBase-input, .MuiInputBase-root': {
      backgroundColor: !editing && (darkMode ? 'darkgrey' : 'gainsboro'),
      pointerEvents: !editing && 'none',
    },
  },
]);

export const JobApplicationSectionContainer = styled(Grid)(({ page, sectionid, maxpage }) => [
  {
    display: 'none',
  },
  page === sectionid && {
    display: 'inline-block',
  },
  page === maxpage && {
    display: 'inline-block',
  },
]);

const StyledToolbar = styled(Toolbar)(({ darkMode }) => ({
  backgroundColor: darkMode ? 'grey' : 'gainsboro',
}));

const EditIcon = styled(IconButton)({
  path: {
    fill: 'darkslategrey',
    borderRadius: 5,
  },
});

const StyledButton = styled(Button)(({ darkMode }) => ({
  ':hover': {
    color: darkMode && 'white',
  },
  color: darkMode && '#cfcfcf',
  marginTop: 15,
}));

const StyledLink = styled(Link)({
  textDecoration: 'none',
});
