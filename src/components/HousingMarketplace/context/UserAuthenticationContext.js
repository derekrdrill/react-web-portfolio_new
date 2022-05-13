import React, { createContext, useReducer } from 'react';
import { userAuthenticationReducer } from './UserAuthenticationReducer';

export const UserAuthenticationContext = createContext();

export const UserAuthenticationProvider = ({ children }) => {
  const initialState = {
    signedIn: false,
    isRegistering: false,
    forgotPassword: false,
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
