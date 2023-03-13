import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Link, Typography } from '@mui/material';

import { NBAEverythingContext } from '../context/NBAEverythingContext';
import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

import { getGameDetailDataByGameAndTeamID, setScoreLogo } from '../context/NBAEverythingActions';

const NBAEverythingTeamDetailScores = ({ logos }) => {
  const { darkMode } = React.useContext(DarkLightModeContext);
  const { logoType, nbaEverythingDispatch, selectedNBATeam, selectedNBATeamGameData } =
    React.useContext(NBAEverythingContext);

  const convertGameDateFromLongToShort = date => {
    const newDate = new Date(date);

    const dayNum = newDate.getDate();
    const monthNum = newDate.getMonth() + 1;
    const yearNum = newDate.getFullYear().toString();

    const dd = `${dayNum < 10 ? '0' : ''}${dayNum}`;
    const mm = `${monthNum < 10 ? '0' : ''}${monthNum}`;
    const yy = yearNum.substring(2, yearNum.length);

    return `${mm}/${dd}/${yy}`;
  };

  return (
    <NBAEverythingTeamDetailScoresRootContainer item xs={12} md={5} lg={4}>
      <Typography variant='h6'>Game Scores</Typography>
      <GameScoresContainer container darkMode={darkMode}>
        {selectedNBATeamGameData &&
          selectedNBATeamGameData.teamGameData &&
          selectedNBATeamGameData.teamGameData.length > 0 &&
          selectedNBATeamGameData.teamGameData.map(game => (
            <GameScoreContainer key={game.id} darkMode={darkMode} item xs={6} lg={4} xl={3}>
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
              <Grid container justifyContent='space-between'>
                <Typography fontSize={11} variant='subtitle2' color='CaptionText'>
                  {convertGameDateFromLongToShort(game.date)}
                </Typography>
                <Typography fontSize={11} variant='subtitle2' color='CaptionText'>
                  {game.status}
                </Typography>
              </Grid>
              <Grid container justifyContent='center'>
                <Link
                  onClick={() => getGameDetailDataByGameAndTeamID(game.id, nbaEverythingDispatch)}
                >
                  <Typography
                    color={darkMode ? 'aqua' : 'navy'}
                    fontSize={11}
                    sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                    variant='subtitle2'
                  >
                    Game Detail
                  </Typography>
                </Link>
              </Grid>
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

const GameScoreContainer = styled(Grid)(({ darkMode }) => ({
  borderBottom: '1px solid black',
  borderRight: `1px solid ${darkMode ? '#696969' : 'gainsboro'}`,
  padding: 10,
}));

const GameScoresContainer = styled(Grid)(({ darkMode }) => ({
  backgroundColor: darkMode ? '#757575' : '#f0f0e0',
  border: `1px solid ${darkMode ? 'black' : 'beige'}`,
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




