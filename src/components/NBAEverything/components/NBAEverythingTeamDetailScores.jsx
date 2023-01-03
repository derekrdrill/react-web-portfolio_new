import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';

import { NBAEverythingContext } from '../context/NBAEverythingContext';
import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

import { setScoreLogo } from '../context/NBAEverythingActions';

const NBAEverythingTeamDetailScores = ({ logos }) => {
  const { darkMode } = React.useContext(DarkLightModeContext);
  const { logoType, nbaEverythingDispatch, selectedNBATeam, selectedNBATeamGameData } =
    React.useContext(NBAEverythingContext);

  return (
    <NBAEverythingTeamDetailScoresRootContainer item xs={12} md={5} lg={4}>
      <Typography variant='h6'>Game Scores</Typography>
      <GameScoresContainer container darkMode={darkMode} justifyContent='space-between'>
        {selectedNBATeamGameData &&
          selectedNBATeamGameData.teamGameData &&
          selectedNBATeamGameData.teamGameData.length > 0 &&
          selectedNBATeamGameData.teamGameData.map(game => (
            <GameScoreContainer key={game.id} item xs={6} lg={4} xl={3}>
              <GameScoreLogoContainer container>
                <Grid item xs={3}>
                  <Grid container justifyContent='center'>
                    <GameScoreLogo
                      src={setScoreLogo(
                        selectedNBATeam.full_name,
                        game.visitor_team.full_name,
                        logos[0].src,
                        logos[1].src,
                        logoType,
                        nbaEverythingDispatch,
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={2}>
                  <GameScoreText
                    darkMode={darkMode}
                    variant='subtitle2'
                    result={
                      selectedNBATeam.full_name === game.visitor_team.full_name && game.win
                        ? 'win'
                        : selectedNBATeam.full_name === game.visitor_team.full_name && !game.win
                        ? 'loss'
                        : null
                    }
                  >
                    {game.visitor_team.abbreviation}
                  </GameScoreText>
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={2}>
                  <GameScoreText
                    darkMode={darkMode}
                    result={
                      selectedNBATeam.full_name === game.visitor_team.full_name && game.win
                        ? 'win'
                        : selectedNBATeam.full_name === game.visitor_team.full_name && !game.win
                        ? 'loss'
                        : null
                    }
                    variant='subtitle2'
                  >
                    {game.visitor_team_score}
                  </GameScoreText>
                </Grid>
              </GameScoreLogoContainer>
              <GameScoreLogoContainer container>
                <Grid item xs={3}>
                  <Grid container justifyContent='center'>
                    <GameScoreLogo
                      src={setScoreLogo(
                        selectedNBATeam.full_name,
                        game.home_team.full_name,
                        logos[0].src,
                        logos[1].src,
                        logoType,
                        nbaEverythingDispatch,
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={2}>
                  <GameScoreText
                    darkMode={darkMode}
                    variant='subtitle2'
                    result={
                      selectedNBATeam.full_name === game.home_team.full_name && game.win
                        ? 'win'
                        : selectedNBATeam.full_name === game.home_team.full_name && !game.win
                        ? 'loss'
                        : null
                    }
                  >
                    {game.home_team.abbreviation}
                  </GameScoreText>
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={2}>
                  <GameScoreText
                    darkMode={darkMode}
                    variant='subtitle2'
                    result={
                      selectedNBATeam.full_name === game.home_team.full_name && game.win
                        ? 'win'
                        : selectedNBATeam.full_name === game.home_team.full_name && !game.win
                        ? 'loss'
                        : null
                    }
                  >
                    {game.home_team_score}
                  </GameScoreText>
                </Grid>
              </GameScoreLogoContainer>
            </GameScoreContainer>
          ))}
      </GameScoresContainer>
    </NBAEverythingTeamDetailScoresRootContainer>
  );
};

NBAEverythingTeamDetailScores.propTypes = {
  logos: PropTypes.array,
};

export default NBAEverythingTeamDetailScores;

const NBAEverythingTeamDetailScoresRootContainer = styled(Grid)({
  padding: '0px 9px',
});

const GameScoreContainer = styled(Grid)({
  borderBottom: '1px dotted black',
  borderRight: '1px dotted black',
  padding: 10,
});

const GameScoresContainer = styled(Grid)(({ darkMode }) => ({
  backgroundColor: darkMode ? '#757575' : '#f0f0e0',
  border: '1px dotted black',
  height: 300,
  marginBottom: 10,
  overflowY: 'scroll',
}));

const GameScoreLogo = styled.img({
  borderRadius: 5,
  margin: '2px auto',
  maxHeight: 44,
  minHeight: 25,
  padding: 0,
  maxWidth: 40,
});

const GameScoreLogoContainer = styled(Grid)({
  height: 50,
});

const GameScoreText = styled(Typography)(({ darkMode, result }) => ({
  color:
    result === 'win'
      ? darkMode
        ? '#10bd00'
        : 'forestgreen'
      : result === 'loss'
      ? darkMode
        ? '#8f0000'
        : 'red'
      : 'inherit',
}));




