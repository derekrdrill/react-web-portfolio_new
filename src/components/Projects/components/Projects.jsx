import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import { Grid, Typography } from '@mui/material';

import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

import { Project } from './Project';
import { LoaderSpinner } from '../../LoaderSpinner/LoaderSpinner';

import { PROJECTS } from '../constants/PROJECTS';
import bitmojiLaptop from '../../../assets/bitmoji_laptop.png';

const Projects = ({ id }) => {
  const projectsTitle = 'P,R,O,J,E,C,T,S'.split(',');

  const { darkMode } = React.useContext(DarkLightModeContext);

  const [loading, setLoading] = useState(false);

  return (
    <>
      <PageBodyStyle darkMode={darkMode} />
      <ProjectsContainer id={id} darkMode={darkMode}>
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

Projects.propTypes = {
  id: PropTypes.string,
};

export default Projects;

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

const ProjectsTitleText = styled(Typography)(({ darkMode }) => ({
  color: '#B39BD8',
  fontFamily: 'Shizuru',
  fontWeight: darkMode ? 'normal' : 'bold',
}));

const StyledBitmojiImage = styled.img({
  height: 120,
  width: 120,
});

const TextFont = styled(Typography)({
  color: '#B39BD8',
  fontFamily: 'Kufam',
});

const TitleContainer = styled(Grid)({
  padding: 10,
});
