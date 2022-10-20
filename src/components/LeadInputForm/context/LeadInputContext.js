import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import { leadInputReducer } from './LeadInputReducer';

export const LeadInputContext = createContext();

const LeadInputProvider = ({ children }) => {
  const initialState = {
    page: 'form',
    tooltipOpen: false,
  };

  const [state, leadInputDispatch] = useReducer(leadInputReducer, initialState);

  return (
    <LeadInputContext.Provider value={{ leadInputDispatch, ...state }}>
      {children}
    </LeadInputContext.Provider>
  );
};

LeadInputProvider.propTypes = {
  children: PropTypes.node,
};

export default LeadInputProvider;


