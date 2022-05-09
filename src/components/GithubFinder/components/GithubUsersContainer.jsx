import React, { useContext } from 'react';
import styled from 'styled-components';
import { Grid } from '@mui/material';
import { GithubUserItem } from './GithubUserItem';
import { GithubUserProfile } from './GithubUserProfile';
import { GithubContext } from '../context/GithubContext';
import { LoaderSpinner } from '../../LoaderSpinner/LoaderSpinner';

export const GithubUsersContainer = () => {
  const { loading, user, users } = useContext(GithubContext);

  return (
    <MainContainer container>
      {loading && <LoaderSpinner open={true} />}
      {!loading &&
        !user &&
        users.map(user => (
          <Grid key={user.id} item xs={12} sm={6} md={4} lg={3}>
            <GithubUserItem user={user} />
          </Grid>
        ))}
      {!loading && user && <GithubUserProfile />}
    </MainContainer>
  );
};

const MainContainer = styled(Grid)({
  padding: 15,
});
