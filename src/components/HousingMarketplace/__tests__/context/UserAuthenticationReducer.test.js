import { userAuthenticationReducer } from '../../context/userAuthenticationReducer';

describe('userAuthenticationReducer tests', () => {
  it('handles userAuthenticationReducer', () => {
    expect(userAuthenticationReducer({}, { type: '' })).toEqual({});

    expect(userAuthenticationReducer({}, { type: 'REGISTER' })).toEqual({ isRegistering: true });

    expect(userAuthenticationReducer({}, { type: 'FORGOT_PASSWORD' })).toEqual({
      forgotPassword: true,
    });

    expect(userAuthenticationReducer({}, { type: 'PASSWORD_RESET' })).toEqual({
      passwordIsReset: true,
    });

    expect(userAuthenticationReducer({}, { type: 'SIGN_IN' })).toEqual({
      isRegistering: false,
      forgotPassword: false,
    });

    expect(userAuthenticationReducer({}, { type: 'SIGNED_IN' })).toEqual({
      signedIn: true,
      isRegistering: false,
      forgotPassword: false,
    });
  });
});
