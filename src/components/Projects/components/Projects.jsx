import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import { PROJECTS } from '../constants/PROJECTS';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bitmojiLaptop from '../../../assets/bitmoji_laptop.png';
import { LoaderSpinner } from '../../LoaderSpinner/LoaderSpinner';
import { history } from '../../../index';

const Project = ({ project, setLoading }) => {
  const handleClick = to => {
    setLoading(true);
    setTimeout(() => {
      setLoading(null);
      history.push(to);
    }, 2500);
  };

  return (
    <ProjectContentContainer item xs={10} onClick={() => handleClick(project.to)}>
      <Grid container>
        <Grid item xs={6}>
          <ProjectCardText variant='h6' component='h2'>
            {project.title}
          </ProjectCardText>
          <ProjectCardText variant='subtitle2' component='p'>
            {project.description}
          </ProjectCardText>
        </Grid>
        <Grid item xs={6}>
          <StyledIcon icon={project.icon} />
        </Grid>
      </Grid>
    </ProjectContentContainer>
  );
};

export const Projects = ({ id }) => {
  const projectsTitle = 'P,R,O,J,E,C,T,S'.split(',');

  const [loading, setLoading] = useState(false);

  return (
    <ProjectsContainer id={id}>
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
                    <Project project={project} setLoading={setLoading} />
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

const ProjectsContainer = styled.div({
  backgroundColor: '#030200',
  paddingLeft: 100,
  paddingRight: 50,
  height: '100vh',
});

const TitleContainer = styled(Grid)({
  padding: 10,
});

const ProjectsTitleText = styled(Typography)({
  fontFamily: 'Shizuru',
  color: '#B39BD8',
});

const TextFont = styled(Typography)({
  fontFamily: 'Kufam',
  color: '#B39BD8',
});

const ProjectContentContainer = styled(Grid)({
  marginBottom: 25,
  paddingTop: 35,
  paddingLeft: 40,
  backgroundColor: '#333333',
  borderRadius: 10,
  boxShadow: '5px 3px 3px violet',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: 'grey',
    boxShadow: '5px 3px 3px gainsboro',
    '.MuiTypography-root': {
      color: 'white',
    },
    svg: {
      color: 'white',
    },
  },
});

const ProjectLink = styled(Link)({
  textDecoration: 'none',
});

const ProjectCardText = styled(Typography)({
  color: 'beige',
});

const StyledIcon = styled(FontAwesomeIcon)({
  width: 100,
  height: 200,
  transform: 'translate(75px, -40px)',
  color: 'beige',
});

const StyledBitmojiImage = styled.img({
  width: 120,
  height: 120,
});
