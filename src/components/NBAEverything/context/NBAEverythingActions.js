import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const NBA_EVERYTHING_LOGOS_LOCATION = process.env.REACT_APP_NBA_EVERYTHING_LOGOS_LOCATION;

const nbaSeasons = [
  { year: 2000, display_year: '2000-2001' },
  { year: 2001, display_year: '2001-2002' },
  { year: 2002, display_year: '2002-2003' },
  { year: 2003, display_year: '2003-2004' },
  { year: 2004, display_year: '2004-2005' },
  { year: 2005, display_year: '2005-2006' },
  { year: 2006, display_year: '2006-2007' },
  { year: 2007, display_year: '2007-2008' },
  { year: 2008, display_year: '2008-2009' },
  { year: 2009, display_year: '2009-2010' },
  { year: 2010, display_year: '2010-2011' },
  { year: 2011, display_year: '2011-2012' },
  { year: 2012, display_year: '2012-2013' },
  { year: 2013, display_year: '2013-2014' },
  { year: 2014, display_year: '2014-2015' },
  { year: 2015, display_year: '2015-2016' },
  { year: 2016, display_year: '2016-2017' },
  { year: 2017, display_year: '2017-2018' },
  { year: 2018, display_year: '2018-2019' },
  { year: 2019, display_year: '2019-2020' },
  { year: 2020, display_year: '2020-2021' },
  { year: 2021, display_year: '2021-2022' },
  { year: 2022, display_year: '2022-2023' },
];

export const getNBASeasons = () =>
  nbaSeasons.sort((a, b) => (a.year < b.year ? 1 : a.year > b.year ? -1 : 0));

export const getTeams = async nbaEverythingDispatch => {
  const teamsOptions = {
    method: 'GET',
    url: `${process.env.REACT_APP_BACKEND_URL}/get-all-teams`,
  };

  const teamsRequest = await axios.request(teamsOptions).then(async response => response);
  const teams = await teamsRequest.data;

  await nbaEverythingDispatch({
    type: 'SET_NBA_TEAMS',
    nbaTeams: teams,
  });
};

export const getSelectedTeamAndPlayerTotalsAndStats = async (
  nbaEverythingDispatch,
  teamID,
  season,
) => {
  const totalsAndStatsDataOptions = {
    method: 'GET',
    url: `${process.env.REACT_APP_BACKEND_URL}/get-player-and-team-totals-by-team-and-season/${teamID}/${season}`,
  };

  const totalsAndStatsRequest = await axios
    .request(totalsAndStatsDataOptions)
    .then(async response => response);

  const totalsAndStats = await totalsAndStatsRequest.data;
  console.log(totalsAndStats);

  nbaEverythingDispatch({
    type: 'SET_SELECTED_NBA_TEAM_TOTALS',
    selectedNBATeamTotals: {
      apg: totalsAndStats.apg,
      rpg: totalsAndStats.rpg,
      spg: totalsAndStats.spg,
      bpg: totalsAndStats.bpg,
    },
  });

  nbaEverythingDispatch({
    type: 'SET_SELECTED_NBA_TEAM_PLAYER_STATS',
    selectedNBATeamPlayerStats: await totalsAndStats.playerData,
  });
};

export const getTeamGameDataByTeamAndSeason = async (nbaEverythingDispatch, teamID, season) => {
  const teamGameDataOptions = {
    method: 'GET',
    url: `${process.env.REACT_APP_BACKEND_URL}/get-team-game-data-by-team-and-season/${teamID}/${season}`,
  };

  const teamGameDataRequest = await axios
    .request(teamGameDataOptions)
    .then(async response => response);

  const teamGameData = await teamGameDataRequest.data;

  nbaEverythingDispatch({
    type: 'SET_SELECTED_NBA_TEAM_GAME_DATA',
    selectedNBATeamGameData: await teamGameData,
  });
};

export const setLogoType = async (nbaEverythingDispatch, logoType) => {
  await nbaEverythingDispatch({
    type: 'SET_LOGO_TYPE',
    logoType: logoType,
  });
};

export const setSelectedNBATeam = async (nbaEverythingDispatch, selectedNBATeam) => {
  await nbaEverythingDispatch({
    type: 'SET_LOGO_TYPE',
    logoType: 'current',
  });

  await nbaEverythingDispatch({
    type: 'SET_SELECTED_NBA_TEAM',
    selectedNBATeam: selectedNBATeam,
  });
};

export const setSelectedNBASeason = async (nbaEverythingDispatch, selectedNBASeason) => {
  await nbaEverythingDispatch({
    type: 'SET_SELECTED_NBA_SEASON',
    selectedNBASeason: selectedNBASeason,
  });
};

export const setScoreLogo = (selectedTeamName, scoreName, currentLogo, retroLogo, logoType) =>
  logoType === 'current'
    ? selectedTeamName === scoreName
      ? currentLogo
      : `${BACKEND_URL}${NBA_EVERYTHING_LOGOS_LOCATION}${scoreName.replaceAll(' ', '')}.png`
    : selectedTeamName === scoreName
    ? retroLogo
    : `${BACKEND_URL}${NBA_EVERYTHING_LOGOS_LOCATION}${scoreName.replaceAll(' ', '')}Retro.png`;


