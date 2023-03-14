export const nbaEverythingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading,
      };
    case 'SET_NBA_TEAMS':
      return {
        ...state,
        nbaTeams: action.nbaTeams,
      };
    case 'SET_SELECTED_NBA_TEAM':
      return {
        ...state,
        selectedNBATeam: action.selectedNBATeam,
      };
    case 'SET_SELECTED_NBA_TEAM_TOTALS':
      return {
        ...state,
        selectedNBATeamTotals: action.selectedNBATeamTotals,
      };
    case 'SET_SELECTED_NBA_TEAM_PLAYER_STATS':
      return {
        ...state,
        selectedNBATeamPlayerStats: action.selectedNBATeamPlayerStats,
      };
    case 'SET_SELECTED_NBA_TEAM_GAME_DATA':
      return {
        ...state,
        selectedNBATeamGameData: action.selectedNBATeamGameData,
      };
    case 'SET_SELECTED_NBA_GAME_DETAIL_DATA':
      return {
        ...state,
        selectedNBAGameDetailData: action.selectedNBAGameDetailData,
      };
    case 'SET_SELECTED_NBA_SEASON':
      return {
        ...state,
        selectedNBASeason: action.selectedNBASeason,
      };
    case 'SET_HOME_SCORE_LOGO':
      return {
        ...state,
        homeScoreLogo: action.homeScoreLogo,
      };
    case 'SET_LOGO_TYPE':
      return {
        ...state,
        logoType: action.logoType,
      };
    case 'SET_NBA_EVERYTHING_LOADING':
      return {
        ...state,
        nbaEverythingLoading: action.nbaEverythingLoading,
      };
    default:
      return state;
  }
};
