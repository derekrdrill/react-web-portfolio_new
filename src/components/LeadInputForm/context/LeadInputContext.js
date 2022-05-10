import React, { createContext, useReducer } from 'react';
import { leadInputReducer } from './LeadInputReducer';

export const LeadInputContext = createContext();

export const LeadInputProvider = ({ children }) => {
  const initialState = {
    page: 'form',
    tooltipOpen: false,
  };

  const [state, leadInputDispatch] = useReducer(leadInputReducer, initialState);

  return <LeadInputContext.Provider value={{ leadInputDispatch, ...state }}>{children}</LeadInputContext.Provider>;
};
