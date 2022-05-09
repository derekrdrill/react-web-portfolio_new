import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { GithubUsersContainer } from './GithubUsersContainer';
import { GithubUserSearch } from './GithubUserSearch';
import { GithubProvider } from '../context/GithubContext';
import { AlertProvider } from '../../Alert/context/AlertContext';

export const GithubFinder = ({}) => {
  return (
    <GithubProvider>
      <AlertProvider>
        <PageStyle />
        <GithubUserSearch />
        <GithubUsersContainer />
      </AlertProvider>
    </GithubProvider>
  );
};

const PageStyle = createGlobalStyle({
  body: {
    backgroundColor: '#202142',
  },
  'h1, h2, h3, h4, h5, h6, p': {
    fontFamily: 'Trebuchet MS, sans-serif',
    fontWeight: 'bold',
    color: 'beige',
  },
});
