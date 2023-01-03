import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import { nbaEverythingReducer } from './NBAEverythingReducer';

export const NBAEverythingContext = createContext();

const NBAEverythingProvider = ({ children }) => {
  const initialState = {
    logoType: 'current',
    homeScoreLogo: '',
    visitorScoreLogo: '',
    nbaTeams: [],
    selectedNBASeason: { display_year: '2022-2023', year: 2022 },
    selectedNBATeam: {
      name: 'Hawks',
      full_name: 'Atlanta Hawks',
      id: 1,
      arena: {
        name: 'State Farm Arena',
        address: '1 State Farm Dr, Atlanta, GA 30303',
        capacity: 21000,
      },
    },
    selectedNBATeamGameData: {},
    selectedNBATeamTotals: {},
    selectedNBATeamPlayerStats: {},
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
