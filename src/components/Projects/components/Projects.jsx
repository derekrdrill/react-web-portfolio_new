import React, { useState, useContext } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
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
    <ProjectContentContainer darkMode={darkMode} item xs={12} md={11} lg={10} onClick={() => handleClick(project.to)}>
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

export const Projects = ({ id }) => {
  const projectsTitle = 'P,R,O,J,E,C,T,S'.split(',');

  const { darkMode } = useContext(DarkLightModeContext);

  const [loading, setLoading] = useState(false);

  return (
    <>
      <PageBodyStyle darkMode={darkMode} />
      <ProjectsContainer darkMode={darkMode} id={id}>
        <Grid container justifyContent='center'>
          <StyledBitmojiImage src={bitmojiLaptop} />
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={1}>
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
                    <Grid key={project.id} item xs={12} md={6}>
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
    </>
  );
};

const PageBodyStyle = createGlobalStyle(({ darkMode }) => ({
  body: {
    backgroundColor: darkMode ? '#030200' : 'whitesmoke',
  },
}));

const ProjectsContainer = styled.div(({ darkMode }) => ({
  padding: '35px 50px 200px 50px',
  borderTop: '2px solid transparent',
  borderImage: darkMode
    ? 'linear-gradient(to right, rgba(248, 184, 255, 1), skyblue, gainsboro)'
    : 'linear-gradient(to right, rgba(176, 52, 197, 1), rgba(86, 206, 210, 1))',
  borderImageSlice: 1,
}));

const TitleContainer = styled(Grid)({
  padding: 10,
});

const ProjectsTitleText = styled(Typography)(({ darkMode }) => ({
  color: '#B39BD8',
  fontFamily: 'Shizuru',
  fontWeight: darkMode ? 'normal' : 'bold',
}));

const TextFont = styled(Typography)({
  color: '#B39BD8',
  fontFamily: 'Kufam',
});

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

const ProjectCardText = styled(Typography)(({ darkMode }) => ({
  color: darkMode ? 'beige' : '#a182ce',
}));

const StyledIcon = styled(FontAwesomeIcon)(({ darkMode }) => ({
  color: darkMode ? 'beige' : '#9370c7',
  height: 150,
  width: 75,
}));

const StyledBitmojiImage = styled.img({
  height: 120,
  width: 120,
});
