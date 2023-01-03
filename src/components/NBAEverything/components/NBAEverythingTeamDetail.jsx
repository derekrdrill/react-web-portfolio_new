import React from 'react';
import styled from 'styled-components';
import { Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/fontawesome-free-solid';

import { NBAEverythingContext } from '../context/NBAEverythingContext';
import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

import NBAEverythingTeamDetailScores from './NBAEverythingTeamDetailScores';
import NBAEverythingTeamDetailStats from './NBAEverythingTeamDetailStats';

import {
  getSelectedTeamAndPlayerTotalsAndStats,
  setLogoType,
} from '../context/NBAEverythingActions';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const NBA_EVERYTHING_LOGOS_LOCATION = process.env.REACT_APP_NBA_EVERYTHING_LOGOS_LOCATION;

const NBAEverythingTeamDetail = () => {
  const { darkMode } = React.useContext(DarkLightModeContext);
  const {
    logoType,
    nbaEverythingDispatch,
    selectedNBASeason,
    selectedNBATeam,
    selectedNBATeamGameData,
    selectedNBATeamTotals,
  } = React.useContext(NBAEverythingContext);

  const arenaNameFormatted = `${selectedNBATeam.arena.name.replaceAll(' ', '+').toLowerCase()}+${
    selectedNBATeam.name
  }`;

  const fullNameFormattedLogo = selectedNBATeam.full_name.replaceAll('_', '').replace(/\s/g, '');
  const fullNameFormattedStubHub = selectedNBATeam.full_name.replaceAll(' ', '-').toLowerCase();

  const logos = [
    {
      src: `${BACKEND_URL}${NBA_EVERYTHING_LOGOS_LOCATION}${fullNameFormattedLogo}.png`,
    },
    {
      src: `${BACKEND_URL}${NBA_EVERYTHING_LOGOS_LOCATION}${fullNameFormattedLogo}Retro.png`,
    },
  ];

  React.useEffect(() => {
    getSelectedTeamAndPlayerTotalsAndStats(
      nbaEverythingDispatch,
      selectedNBATeam.id,
      selectedNBASeason.year,
    );
  }, [nbaEverythingDispatch, selectedNBASeason, selectedNBATeam]);

  return (
    <TeamDetailRootContainer container darkMode={darkMode} spacing={2}>
      <Grid item xs={1} />
      <Grid item xs={12} sm={5} md={2}>
        <TeamLogoContainer container darkMode={darkMode}>
          <TeamLogo
            darkMode={darkMode}
            src={logoType === 'current' ? logos[0].src : logos[1].src}
          />
        </TeamLogoContainer>
        <TeamLogoToggleButtonsContainer container justifyContent='center'>
          <ToggleButtonGroup
            color='primary'
            onChange={e => {
              setLogoType(nbaEverythingDispatch, e.target.value);
            }}
            size='small'
            value={logoType}
          >
            <TeamLogoToggleButton darkMode={darkMode} value='current'>
              Current
            </TeamLogoToggleButton>
            <TeamLogoToggleButton darkMode={darkMode} value='retro'>
              Retro
            </TeamLogoToggleButton>
          </ToggleButtonGroup>
        </TeamLogoToggleButtonsContainer>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography variant='h4'>{selectedNBATeam.full_name}</Typography>
        <Typography variant='body1'>{selectedNBATeam.arena.name}</Typography>
        <Typography variant='body2'>
          <a
            href={`https://google.com/maps/search/${arenaNameFormatted}`}
            rel='noreferrer'
            target='_blank'
          >
            <FontAwesomeIcon icon={faMapPin} />
          </a>
          {` ${selectedNBATeam.arena.address}`}
        </Typography>
        <Typography variant='body2'>
          <strong>Capacity:</strong>
          {` ${(selectedNBATeam.arena.capacity / 1000)
            .toFixed(3)
            .toString()
            .replaceAll('.', ',')} - `}
          <a
            href={`https://www.stubhub.com/${
              fullNameFormattedStubHub === 'la-clippers'
                ? 'los-angeles-clippers'
                : fullNameFormattedStubHub
            }-tickets`}
            target='_blank'
            rel='noreferrer'
          >
            See tickets on StubHub
          </a>
        </Typography>
      </Grid>
      <Grid item xs={12} md={1}>
        <Grid container>
          <NBAEverythingTeamDetailStats
            statType='W-L'
            statData={`${selectedNBATeamGameData.wins} - ${selectedNBATeamGameData.losses}`}
          />
          <NBAEverythingTeamDetailStats
            statType='PPG'
            statData={selectedNBATeamGameData.ppg && selectedNBATeamGameData.ppg.toFixed(2)}
          />
          <NBAEverythingTeamDetailStats
            statType='APG'
            statData={selectedNBATeamTotals.apg ? selectedNBATeamTotals.apg : '0'}
          />
          <NBAEverythingTeamDetailStats
            statType='RPG'
            statData={selectedNBATeamTotals.rpg ? selectedNBATeamTotals.rpg : '0'}
          />
          <NBAEverythingTeamDetailStats
            statType='SPG'
            statData={selectedNBATeamTotals.spg ? selectedNBATeamTotals.spg : '0'}
          />
          <NBAEverythingTeamDetailStats
            statType='BPG'
            statData={selectedNBATeamTotals.bpg ? selectedNBATeamTotals.bpg : '0'}
          />
        </Grid>
      </Grid>
      <NBAEverythingTeamDetailScores logos={logos} />
    </TeamDetailRootContainer>
  );
};

export default NBAEverythingTeamDetail;

export const TeamDetailRootContainer = styled(Grid)({
  paddingTop: 25,
});

export const TeamLogo = styled.img(({ darkMode }) => ({
  display: 'block',
  margin: '0 auto',
  maxHeight: 110,
  maxWidth: 150,
  padding: 0,
  transform: darkMode && 'translateY(20px)',
}));

export const TeamLogoContainer = styled(Grid)(({ darkMode }) => ({
  backgroundColor: darkMode && '#363636',
  borderRadius: 5,
  height: 155,
}));

export const TeamLogoToggleButtonsContainer = styled(Grid)({
  padding: 15,
});

export const TeamLogoToggleButton = styled(ToggleButton)({
  '&&.MuiToggleButton-root': {
    ':hover': {
      backgroundColor: 'rgba(122, 122, 122, 0.39)',
    },
    '&.Mui-selected': {
      ':hover': {
        backgroundColor: '#1b3265',
      },
      backgroundColor: '#0e1a34',
    },
    backgroundColor: 'rgba(23, 23, 23, 0.39)',
    borderRadius: 20,
    color: 'beige',
    padding: '3px 12px',
  },
});
