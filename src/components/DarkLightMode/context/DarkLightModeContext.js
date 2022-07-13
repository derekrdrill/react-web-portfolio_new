import React, { createContext, useReducer } from 'react';
import { darkLightModeReducer } from './DarkLightModeReducer';

export const DarkLightModeContext = createContext();

export const DarkLightModeProvider = ({ children }) => {
  const initialState = {
    darkMode: true,
  };

  const [state, darkLightModeDispatch] = useReducer(darkLightModeReducer, initialState);

  return (
    <DarkLightModeContext.Provider value={{ ...state, darkLightModeDispatch }}>
      {children}
    </DarkLightModeContext.Provider>
  );
};
