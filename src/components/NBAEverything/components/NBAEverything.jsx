import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';
import { NBAEverythingContext } from '../../NBAEverything/context/NBAEverythingContext';

import NBAEverythingHeader from './NBAEverythingHeader';
import NBAEverythingSearch from './NBAEverythingSearch';
import NBAEverythingTeamDetail from './NBAEverythingTeamDetail';

import { getSelectedTeamAndPlayerTotalsAndStats } from '../context/NBAEverythingActions';

const NBAEverything = () => {
  const { darkMode } = React.useContext(DarkLightModeContext);

  const { nbaEverythingDispatch, selectedNBASeason, selectedNBATeam } =
    React.useContext(NBAEverythingContext);

  React.useEffect(() => {
    getSelectedTeamAndPlayerTotalsAndStats(
      nbaEverythingDispatch,
      selectedNBATeam.id,
      selectedNBASeason.year,
    );
  }, [nbaEverythingDispatch, selectedNBASeason, selectedNBATeam]);

  return (
    <div>
      <PageStyle darkMode={darkMode} />
      <NBAEverythingHeader />
      <NBAEverythingSearch />
      <NBAEverythingTeamDetail />
    </div>
  );
};

export default NBAEverything;

const PageStyle = createGlobalStyle(({ darkMode }) => ({
  body: {
    backgroundColor: darkMode ? '#030200' : 'whitesmoke',
  },
  'h1, h2, h3, h4, h5, h6, p': {
    fontFamily: 'Trebuchet MS, sans-serif',
    fontWeight: 'bold',
    color: darkMode ? 'beige' : '#464646',
  },
}));
