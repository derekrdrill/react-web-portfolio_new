import React, { createContext, useReducer } from 'react';
import { alertReducer } from './AlertReducer';

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const initialState = {
    alert: null,
    fadeOut: false,
  };

  const [state, alertDispatch] = useReducer(alertReducer, initialState);

  return <AlertContext.Provider value={{ ...state, alertDispatch }}>{children}</AlertContext.Provider>;
};
