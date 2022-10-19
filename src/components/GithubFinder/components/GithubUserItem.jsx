import React from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import { GithubContext } from '../context/GithubContext';
import { getUserAndRepos } from '../context/GithubActions';

export const GithubUserItem = ({ user: { login, avatar_url } }) => {
  const { githubDispatch } = React.useContext(GithubContext);

  const handleGetUser = async () => {
    githubDispatch({ type: 'SET_LOADING' });

    const user = await getUserAndRepos(login);
    githubDispatch({ type: 'GET_USER_AND_REPOS', payload: user });
  };

  return (
    <UserItemContainer>
      <UserImage src={avatar_url} />
      <div>
        <Typography variant='subtitle1' component='h6'>
          {login}
        </Typography>
        <ProfileLink onClick={handleGetUser}>
          <Typography variant='subtitle2' component='h6'>
            View Profile
          </Typography>
        </ProfileLink>
      </div>
    </UserItemContainer>
  );
};

const UserItemContainer = styled.div({
  borderRadius: 10,
  boxShadow: '2px 1px 10px #121326',
  display: 'flex',
  justifyContent: 'space-around',
  margin: 10,
  padding: 5,
});

const UserImage = styled.img({
  borderRadius: 50,
  width: 65,
  height: 65,
});

const ProfileLink = styled.a({
  ':hover': {
    color: '#858585',
    h6: {
      color: '#858585',
    },
  },
  color: '#9c9c9c',
  cursor: 'pointer',
  h6: {
    color: '#9c9c9c',
  },
  textDecoration: 'none',
});
