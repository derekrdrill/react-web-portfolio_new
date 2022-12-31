import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

import NBAEverythingHeader from './NBAEverythingHeader';
import NBAEverythingSearch from './NBAEverythingSearch';

import PropTypes from 'prop-types';

const NBAEverything = () => {
  const { darkMode } = React.useContext(DarkLightModeContext);

  return (
    <div>
      <PageStyle darkMode={darkMode} />
      <NBAEverythingHeader />
      <NBAEverythingSearch />
    </div>
  );
};

NBAEverything.propTypes = {};

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
