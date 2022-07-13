export const darkLightModeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DARK_MODE':
      return {
        ...state,
        darkMode: action.darkMode,
      };
    default:
      return state;
  }
};
