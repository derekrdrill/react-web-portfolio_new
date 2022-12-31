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
    case 'SET_SELECTED_NBA_SEASON':
      return {
        ...state,
        selectedNBASeason: action.selectedNBASeason,
      };
    default:
      return state;
  }
};
