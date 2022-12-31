import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import { nbaEverythingReducer } from './NBAEverythingReducer';

export const NBAEverythingContext = createContext();

const NBAEverythingProvider = ({ children }) => {
  const initialState = {};

  const [state, nbaEverythingDispatch] = useReducer(nbaEverythingReducer, initialState);

  return (
    <NBAEverythingContext.Provider
      value={{
        nbaEverythingDispatch,
        ...state,
      }}
    >
      {children}
    </NBAEverythingContext.Provider>
  );
};

NBAEverythingProvider.propTypes = {
  children: PropTypes.node,
};

export default NBAEverythingProvider;
