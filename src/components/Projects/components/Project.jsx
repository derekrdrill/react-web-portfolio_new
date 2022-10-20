import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { history } from '../../../index';

export const Project = ({ darkMode, project, setLoading }) => {
  const handleClick = to => {
    setLoading(true);
    setTimeout(() => {
      setLoading(null);
      history.push(to);
    }, 2500);
  };

  return (
    <ProjectContentContainer
      darkMode={darkMode}
      item
      xs={12}
      md={11}
      lg={10}
      onClick={
        /* istanbul ignore next */
        () => handleClick(project.to)
      }
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
    </ProjectContentContainer>
  );
};

Project.propTypes = {
  darkMode: PropTypes.bool,
  project: PropTypes.object,
  setLoading: PropTypes.func,
};

const ProjectCardText = styled(Typography)(({ darkMode }) => ({
  color: darkMode ? 'beige' : '#a182ce',
}));

const ProjectContentContainer = styled(Grid)(({ darkMode }) => ({
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
  backgroundColor: darkMode ? '#333333' : '#c3c3c3',
  borderRadius: 10,
  boxShadow: darkMode ? '5px 3px 3px violet' : '5px 3px 3px #a970ff',
  cursor: 'pointer',
  marginBottom: 25,
  padding: 30,
}));

const StyledIcon = styled(FontAwesomeIcon)(({ darkMode }) => ({
  color: darkMode ? 'beige' : '#9370c7',
  height: 150,
  width: 75,
}));
