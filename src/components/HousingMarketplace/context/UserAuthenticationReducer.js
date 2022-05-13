export const userAuthenticationReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER':
      return {
        ...state,
        isRegistering: true,
        signedIn: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        signedIn: true,
        isRegistering: false,
      };
    default:
      return state;
  }
};
