import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { GithubUsersContainer } from './GithubUsersContainer';
import { GithubUserSearch } from './GithubUserSearch';
import { AlertProvider } from '../../Alert/context/AlertContext';
import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

const GithubFinder = () => {
  const { darkMode } = React.useContext(DarkLightModeContext);

  return (
    <AlertProvider>
      <PageStyle darkMode={darkMode} />
      <GithubUserSearch />
      <GithubUsersContainer />
    </AlertProvider>
  );
};

export default GithubFinder;

const PageStyle = createGlobalStyle(({ darkMode }) => ({
  body: {
    backgroundColor: darkMode ? '#202142' : 'beige',
  },
  'h1, h2, h3, h4, h5, h6, p': {
    fontFamily: 'Trebuchet MS, sans-serif',
    fontWeight: 'bold',
    color: darkMode ? 'beige' : '#464646',
  },
}));
