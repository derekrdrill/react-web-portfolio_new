import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';

import { AlertProvider } from '../../Alert/context/AlertContext';
import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

import CocktailDetail from './CocktailDetail';
import CocktailSearch from './CocktailSearch';

const Cocktail = () => {
  const { darkMode } = React.useContext(DarkLightModeContext);

  return (
    <AlertProvider>
      <PageStyle darkMode={darkMode} />
      <CocktailSearch />
      <CocktailDetail />
    </AlertProvider>
  );
};

Cocktail.propTypes = {};

export default Cocktail;

const PageStyle = createGlobalStyle(({ darkMode }) => ({
  body: {
    backgroundColor: darkMode ? '#1B0008' : '#FBAF93',
  },
  'h1, h2, h3, h4, h5, h6, p': {
    fontFamily: 'Trebuchet MS, sans-serif',
    fontWeight: 'bold',
    color: darkMode ? 'beige' : '#464646',
  },
}));
