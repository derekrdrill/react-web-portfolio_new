import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FeedbackList } from './components/FeedbackList';
import { FeedbackStats } from './components/FeebackStats';
import { FeedbackForm } from './components/FeedbackForm';
import { FeedbackProvider } from './context/FeedbackContext';

export const Feedback = () => (
  <>
    <PageBodyStyle />
    <FeedbackProvider>
      <AppContainer>
        <FeedbackForm />
        <FeedbackStats />
        <FeedbackList />
      </AppContainer>
    </FeedbackProvider>
  </>
);

const PageBodyStyle = createGlobalStyle({
  body: {
    backgroundColor: '#202142',
    padding: 20,
  },
  'h1, h2, h3, h4, h5, h6, p': {
    fontFamily: 'Trebuchet MS, sans-serif',
    fontWeight: 'bold',
  },
});

const AppContainer = styled.div({
  maxWidth: 1100,
  margin: 'auto',
  padding: '0 20px',
});
