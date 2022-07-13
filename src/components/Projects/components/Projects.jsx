import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoaderSpinner } from '../../LoaderSpinner/LoaderSpinner';
import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

import { PROJECTS } from '../constants/PROJECTS';
import bitmojiLaptop from '../../../assets/bitmoji_laptop.png';
import { history } from '../../../index';

const Project = ({ darkMode, project, setLoading }) => {
  const handleClick = to => {
    setLoading(true);
    setTimeout(() => {
      setLoading(null);
      history.push(to);
    }, 2500);
  };

  return (
    <ProjectContentContainer darkMode={darkMode} item xs={10} onClick={() => handleClick(project.to)}>
      <Grid container>
        <Grid item xs={6}>
          <ProjectCardText darkMode={darkMode} variant='h6' component='h2'>
            {project.title}
          </ProjectCardText>
          <ProjectCardText darkMode={darkMode} variant='subtitle2' component='p'>
            {project.description}
          </ProjectCardText>
        </Grid>
        <Grid item xs={6}>
          <StyledIcon darkMode={darkMode} icon={project.icon} />
        </Grid>
      </Grid>
    </ProjectContentContainer>
  );
};

export const Projects = ({ id }) => {
  const projectsTitle = 'P,R,O,J,E,C,T,S'.split(',');

  const { darkMode } = useContext(DarkLightModeContext);

  const [loading, setLoading] = useState(false);

  return (
    <ProjectsContainer darkMode={darkMode} id={id}>
      <Grid container justifyContent='center'>
        <StyledBitmojiImage src={bitmojiLaptop} />
      </Grid>
      <Grid container>
        <Grid item xs={1} sm={1}>
          <Grid container>
            {projectsTitle.map((letter, letterCount) => (
              <Grid key={letterCount} item xs={1} sm={12}>
                <ProjectsTitleText variant='h3' component='h1'>
                  {letter}
                </ProjectsTitleText>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={11}>
          <Grid container>
            <TitleContainer item xs={12}>
              <TextFont variant='subtitle1' component='h3'>
                Personal work to display knowledge of building React web apps
              </TextFont>
            </TitleContainer>
            <Grid item xs={12}>
              <Grid container>
                {PROJECTS.map(project => (
                  <Grid key={project.id} item xs={12} lg={6}>
                    <Project darkMode={darkMode} project={project} setLoading={setLoading} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <LoaderSpinner open={loading} />
    </ProjectsContainer>
  );
};

const ProjectsContainer = styled.div(({ darkMode }) => ({
  backgroundColor: darkMode ? '#030200' : 'whitesmoke',
  paddingLeft: 100,
  paddingRight: 50,
  height: '100vh',
}));

const TitleContainer = styled(Grid)({
  padding: 10,
});

const ProjectsTitleText = styled(Typography)(({ darkMode }) => ({
  fontFamily: 'Shizuru',
  fontWeight: darkMode ? 'normal' : 'bold',
  color: '#B39BD8',
}));

const TextFont = styled(Typography)({
  fontFamily: 'Kufam',
  color: '#B39BD8',
});

const ProjectContentContainer = styled(Grid)(({ darkMode }) => ({
  marginBottom: 25,
  paddingTop: 35,
  paddingLeft: 40,
  backgroundColor: darkMode ? '#333333' : '#c3c3c3',
  borderRadius: 10,
  boxShadow: darkMode ? '5px 3px 3px violet' : '5px 3px 3px #a970ff',
  cursor: 'pointer',
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
}));

const ProjectCardText = styled(Typography)(({ darkMode }) => ({
  color: darkMode ? 'beige' : '#a182ce',
}));

const StyledIcon = styled(FontAwesomeIcon)(({ darkMode }) => ({
  width: 100,
  height: 200,
  transform: 'translate(75px, -40px)',
  color: darkMode ? 'beige' : '#9370c7',
}));

const StyledBitmojiImage = styled.img({
  width: 120,
  height: 120,
});
