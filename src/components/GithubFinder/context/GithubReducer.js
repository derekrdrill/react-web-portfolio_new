export const githubReducer = (state, action) => {
  switch (action.type) {
    case 'CLEAR_USERS':
      return {
        ...state,
        users: [],
        user: null,
      };
    case 'CLEAR_USER':
      return {
        ...state,
        loading: false,
        user: null,
      };
    case 'GET_REPOS':
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        user: null,
        loading: false,
      };
    case 'GET_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
