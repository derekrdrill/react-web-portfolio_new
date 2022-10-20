import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import { userAuthenticationReducer } from './UserAuthenticationReducer';

export const UserAuthenticationContext = createContext();

const UserAuthenticationProvider = ({ children }) => {
  const initialState = {
    signedIn: false,
    isRegistering: false,
    forgotPassword: false,
    passwordIsReset: false,
  };

  const [state, userAuthenticationDispatch] = useReducer(userAuthenticationReducer, initialState);

  return (
    <UserAuthenticationContext.Provider
      value={{
        userAuthenticationDispatch,
        ...state,
      }}
    >
      {children}
    </UserAuthenticationContext.Provider>
  );
};

UserAuthenticationProvider.propTypes = {
  children: PropTypes.node,
};

export default UserAuthenticationProvider;
