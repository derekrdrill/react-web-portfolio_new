export const userAuthenticationReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER':
      return {
        ...state,
        isRegistering: true,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isRegistering: false,
      };
    case 'SIGNED_IN':
      return {
        ...state,
        signedIn: true,
        isRegistering: false,
      };
    default:
      return state;
  }
};
