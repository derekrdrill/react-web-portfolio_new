import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Grid } from '@mui/material';

import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';
import { NBAEverythingContext } from '../../NBAEverything/context/NBAEverythingContext';

import NBAEverythingGameDetailModal from './NBAEverythingGameDetailModal';
import NBAEverythingHeader from './NBAEverythingHeader';
import NBAEverythingLoading from './NBAEverythingLoading';
import NBAEverythingPlayerDataTable from './NBAEverythingPlayerDataTable';
import NBAEverythingSearch from './NBAEverythingSearch';
import NBAEverythingTeamDetail from './NBAEverythingTeamDetail';

import { getSelectedTeamAndPlayerTotalsAndStats } from '../context/NBAEverythingActions';

const NBAEverything = () => {
  const { darkMode } = React.useContext(DarkLightModeContext);

  const { nbaEverythingDispatch, nbaEverythingLoading, selectedNBASeason, selectedNBATeam } =
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
      {nbaEverythingLoading && <NBAEverythingLoading />}
      <NBAEverythingMainContainer container>
        <NBAEverythingHeader />
        <NBAEverythingSearch />
        <NBAEverythingTeamDetail />
        {!nbaEverythingLoading && <NBAEverythingPlayerDataTable />}
        <NBAEverythingGameDetailModal />
      </NBAEverythingMainContainer>
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

export const NBAEverythingMainContainer = styled(Grid)({
  margin: 0,
  overflowY: 'hidden',
  position: 'absolute',
  top: 80,
  zIndex: 0,
});
