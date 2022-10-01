import React from 'react';
import styled from 'styled-components';
import { FeedbackContext } from '../context/FeedbackContext';

export const getAverage = feedbackItems =>
  feedbackItems.reduce((acc, current) => {
    return acc + current.rating;
  }, 0) / feedbackItems.length;

export const getAverageFixed = feedbackItems =>
  isNaN(getAverage(feedbackItems))
    ? 0
    : getAverage(feedbackItems) % 1 > 0
    ? getAverage(feedbackItems).toFixed(1)
    : getAverage(feedbackItems);

export const FeedbackStats = () => {
  const { feedbackItems } = React.useContext(FeedbackContext);

  return (
    <FeedbackStatsDiv>
      <h4>{feedbackItems.length} reviews</h4>
      <h4>Average rating: {getAverageFixed(feedbackItems)}</h4>
    </FeedbackStatsDiv>
  );
};

const FeedbackStatsDiv = styled.div({
  alignItems: 'center',
  color: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  margin: '20px 30px',
});
