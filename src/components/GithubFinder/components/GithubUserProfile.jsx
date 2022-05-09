import React, { useContext } from 'react';
import styled from 'styled-components';
import { Button, Chip, Grid, Typography } from '@mui/material';
import { GithubUserRepos } from './GithubUserRepos';
import { GithubContext } from '../context/GithubContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faUsers, faUserFriends, faProjectDiagram } from '@fortawesome/fontawesome-free-solid';

const TopSection = ({ avatar_url, bio, blog, hireable, html_url, location, login, name, twitter_username, type }) => (
  <Grid container spacing={1}>
    <Grid item sm={12} md={3} xl={2}>
      <ProfileImage src={avatar_url} />
      <ProfileNames component='h6' variant='subtitle1'>
        {name}
      </ProfileNames>
      <ProfileNames component='h6' variant='subtitle2'>
        {login}
      </ProfileNames>
    </Grid>
    <Grid item sm={12} md={9} xl={10}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography component='h4' variant='h5'>
            {name}
          </Typography>
          <ChipsContainer>
            {type && <Chip label={type} color='success' variant='outlined' size='small' />}
            {hireable && <Chip label='Hireable' color='secondary' variant='outlined' size='small' />}
          </ChipsContainer>
        </Grid>
        <Grid item xs={12}>
          <Typography component='p' variant='subtitle1'>
            {bio ? (
              bio
            ) : (
              <>
                N/A
                <span style={{ visibility: 'hidden' }}>
                  'Creative, analytical and passionate React Developer with a demonstrated history of delivering
                  effective solutions.'
                </span>
              </>
            )}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button size='large' color='info' variant='outlined' href={html_url} target='_blank'>
            Visit Profile
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <Typography component='h6' variant='subtitle2'>
                Location
              </Typography>
              <Typography component='h6' variant='subtitle1'>
                {location}
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: { xs: 'block', lg: 'none' } }}>
              <hr />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography component='h6' variant='subtitle2'>
                Website
              </Typography>
              <Typography component='h6' variant='subtitle1'>
                {blog ?? 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: { xs: 'block', lg: 'none' } }}>
              <hr />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography component='h6' variant='subtitle2'>
                Twitter
              </Typography>
              <Typography component='h6' variant='subtitle1'>
                {twitter_username ?? 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: { xs: 'block', lg: 'none' } }}>
              <hr />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

const MiddleSection = ({ followers, following, public_gists, public_repos }) => {
  const data = [
    { id: 1, title: 'Followers', value: followers, icon: faUsers },
    { id: 2, title: 'Following', value: following, icon: faUserFriends },
    { id: 3, title: 'Public Repos', value: public_repos, icon: faProjectDiagram },
    { id: 4, title: 'Public Gists', value: public_gists, icon: faStore },
  ];

  return (
    <Grid container justifyContent={{ md: 'center', lg: 'flex-start' }}>
      {data.map(item => (
        <MiddleSectionItem key={item.id} item xs={12} md={6} lg={3}>
          <Grid container>
            <Grid item xs={10}>
              <Typography component='h6' variant='subtitle2'>
                {item.title}
              </Typography>
              <Typography component='h5' variant='h5'>
                {item.value}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <FontAwesomeIcon color='lightgrey' icon={item.icon} style={{ height: '1.5em', width: '1.5em' }} />
            </Grid>
          </Grid>
        </MiddleSectionItem>
      ))}
    </Grid>
  );
};

export const GithubUserProfile = () => {
  const {
    githubDispatch,
    user: {
      avatar_url,
      bio,
      blog,
      followers,
      following,
      hireable,
      html_url,
      location,
      login,
      name,
      public_gists,
      public_repos,
      twitter_username,
      type,
    },
  } = useContext(GithubContext);

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
        <TopSection
          avatar_url={avatar_url}
          bio={bio}
          blog={blog}
          hireable={hireable}
          html_url={html_url}
          location={location}
          login={login}
          name={name}
          twitter_username={twitter_username}
          type={type}
        />
        <MiddleSection
          followers={followers}
          following={following}
          public_gists={public_gists}
          public_repos={public_repos}
        />
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

const ChipsContainer = styled.div({
  display: 'grid',
  gridGap: 10,
  gridTemplateColumns: '100px 100px',
});

const ProfileImage = styled.img({
  background: 'black',
  maxHeight: 189,
  maxWidth: 189,
  opacity: 0.7,
});

const ProfileNames = styled(Typography)({
  color: 'beige',
  transform: 'translate(10px, -50px)',
});

const MiddleSectionItem = styled(Grid)({
  borderRadius: 10,
  boxShadow: '2px 1px 10px #121326',
  padding: 15,
});
