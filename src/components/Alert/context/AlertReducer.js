export const alertReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALERT':
      return {
        ...state,
        alert: action.payload,
        fadeOut: action.fadeOut,
      };
    case 'FADE_ALERT':
      return {
        ...state,
        fadeOut: action.fadeOut,
      };
    case 'REMOVE_ALERT':
      return {
        ...state,
        alert: null,
        fadeOut: false,
      };
    default:
      return state;
  }
};
