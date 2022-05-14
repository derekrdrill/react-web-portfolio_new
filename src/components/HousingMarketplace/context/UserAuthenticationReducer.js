export const userAuthenticationReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER':
      return {
        ...state,
        isRegistering: true,
      };
    case 'FORGOT_PASSWORD':
      return {
        ...state,
        forgotPassword: true,
      };
    case 'PASSWORD_RESET':
      return {
        ...state,
        passwordIsReset: true,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isRegistering: false,
        forgotPassword: false,
      };
    case 'SIGNED_IN':
      return {
        ...state,
        signedIn: true,
        isRegistering: false,
        forgotPassword: false,
      };
    default:
      return state;
  }
};
