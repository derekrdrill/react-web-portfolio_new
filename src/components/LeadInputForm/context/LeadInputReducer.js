export const leadInputReducer = (state, action) => {
  switch (action.type) {
    case 'SWITCH_PAGES':
      return {
        ...state,
        page: action.payload.page,
        tooltipOpen: action.payload.tooltipOpen,
      };
    case 'TOGGLE_TOOLTIP':
      return {
        ...state,
        tooltipOpen: action.payload,
      };
    default:
      return state;
  }
};
