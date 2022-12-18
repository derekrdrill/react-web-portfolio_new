export const cocktailReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_TYPE':
      return {
        ...state,
        searchType: action.searchType,
      };
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: action.searchResults,
      };
    case 'SET_SEARCH_RESULTS_LENGTH':
      return {
        ...state,
        searchResultsLength: action.searchResultsLength,
      };
    case 'SET_SELECTED_INGREDIENTS':
      return {
        ...state,
        selectedIngredients: action.selectedIngredients,
      };
    case 'SET_COCKTAILS':
      return {
        ...state,
        cocktails: action.cocktails,
      };
    case 'SET_GLASSES':
      return {
        ...state,
        glasses: action.glasses,
      };
    case 'SET_INGREDIENTS':
      return {
        ...state,
        ingredients: action.ingredients,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};
