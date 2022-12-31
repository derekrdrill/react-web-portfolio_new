import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import { nbaEverythingReducer } from './NBAEverythingReducer';

export const NBAEverythingContext = createContext();

const NBAEverythingProvider = ({ children }) => {
  const initialState = {
    nbaTeams: [],
    selectedNBASeason: { display_year: '2022-2023', year: 2022 },
    selectedNBATeam: { full_name: 'Atlanta Hawks', id: 1 },
  };

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
