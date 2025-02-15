import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link } from 'react-router-dom';

export const Project = ({ darkMode, project, isDisabled }) => (
  <ProjectLink
    isDisabled={isDisabled}
    target={project.externalSrc && '_blank'}
    to={project.externalSrc ? { pathname: project.to } : project.to}
  >
    <ProjectContentContainer
      darkMode={darkMode}
      isDisabled={isDisabled}
      item
      xs={12}
      md={11}
      lg={10}
    >
      <Grid container>
        <Grid item xs={12} sm={8} lg={9}>
          <ProjectCardText darkMode={darkMode} variant='h6' component='h2'>
            {project.title}
          </ProjectCardText>
          <ProjectCardText darkMode={darkMode} variant='subtitle2' component='p'>
            {project.description}
          </ProjectCardText>
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <Grid container justifyContent={{ xs: 'center', sm: 'flex-end' }}>
            <Grid item>
              <StyledIcon darkMode={darkMode} icon={project.icon} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {isDisabled && (
        <Typography color='red' variant='p'>
          Under construction
        </Typography>
      )}
    </ProjectContentContainer>
  </ProjectLink>
);

Project.propTypes = {
  darkMode: PropTypes.bool,
  project: PropTypes.object,
  isDisabled: PropTypes.bool,
};

const ProjectLink = styled(Link)(({ isDisabled }) => ({
  cursor: isDisabled ? 'not-allowed' : 'pointer',
  pointerEvents: isDisabled && 'none',
  textDecoration: 'none !important',
}));

const ProjectCardText = styled(Typography)(({ darkMode }) => ({
  color: darkMode ? 'beige' : '#a182ce',
  textDecoration: 'none !important',
}));

const ProjectContentContainer = styled(Grid)(({ darkMode, isDisabled }) => [
  !isDisabled && {
    ':hover': {
      backgroundColor: darkMode ? 'grey' : '#f0e5ff',
      boxShadow: darkMode ? '5px 3px 3px gainsboro' : '5px 3px 3px violet',
      '.MuiTypography-root': {
        color: darkMode ? 'white' : '#a182ce',
      },
      svg: {
        color: darkMode ? 'white' : '#9370c7',
      },
    },
  },
  {
    backgroundColor: darkMode ? '#333333' : '#c3c3c3',
    borderRadius: 10,
    boxShadow: darkMode ? '5px 3px 3px violet' : '5px 3px 3px #a970ff',
    marginBottom: 25,
    padding: 30,
    opacity: isDisabled && 0.5,
  },
]);

const StyledIcon = styled(FontAwesomeIcon)(({ darkMode }) => ({
  color: darkMode ? 'beige' : '#9370c7',
  height: 150,
  width: 75,
}));
