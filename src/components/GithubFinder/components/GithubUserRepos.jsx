import React from 'react';
import styled from 'styled-components';
import { Chip, Grid, Tooltip, Typography } from '@mui/material';

import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';
import { GithubContext } from '../context/GithubContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLink,
  faDatabase,
  faEye,
  faInfo,
  faStar,
  faUtensils,
} from '@fortawesome/fontawesome-free-solid';

export const GithubUserRepos = () => {
  const { darkMode } = React.useContext(DarkLightModeContext);
  const { repos } = React.useContext(GithubContext);

  return (
    <Grid container>
      <GithubReposContainer item xs={12}>
        <TopReposTitleContainer container>
          <TopReposTitle component='h5' variant='h5'>
            Top Repositories
          </TopReposTitle>
        </TopReposTitleContainer>
        {repos.map((repo, repoKey) => {
          const repoInfo = [
            { id: 'size', value: `${repo.size} kb`, color: 'secondary', icon: faDatabase },
            { id: 'watchers', value: repo.watchers, color: 'info', icon: faEye },
            {
              id: 'stargazers_count',
              value: repo.stargazers_count,
              color: 'success',
              icon: faStar,
            },
            { id: 'open_issues', value: repo.open_issues, color: 'error', icon: faInfo },
            { id: 'forks_count', value: repo.forks_count, color: 'warning', icon: faUtensils },
          ];

          return (
            <RepoContainer container key={repoKey} darkMode={darkMode} rowSpacing={2}>
              <CopyLink href={repo.html_url} rel='noreferrer' target='_blank'>
                <CopyLinkIcon icon={faLink} color={darkMode ? 'white' : 'black'} />
              </CopyLink>
              <RepoNameTitle component='h6' variant='subtitle1'>
                {repo.name}
              </RepoNameTitle>
              <Grid item xs={12}>
                <Typography component='h6' variant='subtitle2'>
                  {repo.bio}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <RepoStatsChipsContainer>
                  {repoInfo.map(item => (
                    <Tooltip key={item.id} title={`${item.id}: ${item.value}`}>
                      <RepoStatsChip
                        label={item.value}
                        color={item.color}
                        icon={<FontAwesomeIcon icon={item.icon} />}
                        variant={darkMode ? 'outlined' : 'filled'}
                        size='small'
                      />
                    </Tooltip>
                  ))}
                </RepoStatsChipsContainer>
              </Grid>
            </RepoContainer>
          );
        })}
      </GithubReposContainer>
    </Grid>
  );
};

const GithubReposContainer = styled(Grid)({
  padding: 35,
});

const RepoContainer = styled(Grid)(({ darkMode }) => ({
  ':hover': {
    backgroundColor: darkMode && '#373975',
    boxShadow: !darkMode && '2px 1px 10px royalblue',
  },
  boxShadow: '2px 1px 10px #121326',
  borderRadius: 10,
  padding: 35,
  marginBottom: 40,
}));

const RepoStatsChip = styled(Chip)({
  '&&.MuiChip-root': {
    margin: 5,
    minWidth: 90,
    padding: '12px 0px 12px 5px',
  },
});

const CopyLink = styled.a({
  marginRight: 10,
});

const CopyLinkIcon = styled(FontAwesomeIcon)({
  marginTop: 8,
});

const TopReposTitleContainer = styled(Grid)({
  marginBottom: 40,
});

const TopReposTitle = styled(Typography)({
  fontWeight: 'bold',
});

const RepoNameTitle = styled(Typography)({
  marginLeft: 5,
});

const RepoStatsChipsContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
});
