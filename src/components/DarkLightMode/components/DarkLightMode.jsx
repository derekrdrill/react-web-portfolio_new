import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { DarkLightModeContext } from '../context/DarkLightModeContext';
import { handleSetDarkMode } from '../context/DarkLightModeActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/fontawesome-free-solid';

export const DarkLightMode = () => {
  const { darkMode, darkLightModeDispatch } = useContext(DarkLightModeContext);

  const callSetHandleDarkMode = () => {
    handleSetDarkMode(darkMode, darkLightModeDispatch);
  };

  useEffect(() => {
    let currentDarkMode = localStorage.getItem('darkMode') === 'true' ? true : false;
    handleSetDarkMode(!currentDarkMode, darkLightModeDispatch);
  }, []);

  return <DarkLightModeIcon darkMode={darkMode} icon={darkMode ? faSun : faMoon} onClick={callSetHandleDarkMode} />;
};

const DarkLightModeIcon = styled(FontAwesomeIcon)(({ darkMode }) => ({
  ':hover': {
    path: {
      fill: darkMode ? '#DDDDDD' : '#759CC9',
    },
  },
  cursor: 'pointer',
  path: {
    fill: darkMode ? '#AAAAAA' : '#759CC9',
  },
}));
