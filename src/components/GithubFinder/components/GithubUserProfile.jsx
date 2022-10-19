import React from 'react';
import styled from 'styled-components';
import { Button, Grid } from '@mui/material';

import { GithubContext } from '../context/GithubContext';

import { GithubUserProfileMiddle } from './GithubUserProfileMiddle';
import { GithubUserProfileTop } from './GithubUserProfileTop';
import { GithubUserRepos } from './GithubUserRepos';

export const GithubUserProfile = () => {
  const { githubDispatch } = React.useContext(GithubContext);

  const handleClearUser = () => {
    githubDispatch({ type: 'SET_LOADING' });
    githubDispatch({ type: 'CLEAR_USER' });
  };

  return (
    <Grid item>
      <BackButtonContainer>
        <Button color='secondary' onClick={handleClearUser}>
          Back to user results
        </Button>
      </BackButtonContainer>
      <MainContainer container>
        <GithubUserProfileTop />
        <GithubUserProfileMiddle />
        <GithubUserRepos />
      </MainContainer>
    </Grid>
  );
};

const BackButtonContainer = styled.div({
  display: 'flex',
  justifyContent: 'flex-start',
});

const MainContainer = styled(Grid)({
  marginTop: 50,
  padding: '0 50px',
});
