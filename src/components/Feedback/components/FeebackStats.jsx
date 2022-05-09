import React, { useContext } from 'react';
import styled from 'styled-components';
import { FeedbackContext } from '../context/FeedbackContext';

export const FeedbackStats = () => {
  const { feedbackItems } = useContext(FeedbackContext);

  let average =
    feedbackItems.reduce((acc, current) => {
      return acc + current.rating;
    }, 0) / feedbackItems.length;

  return (
    <FeedbackStatsDiv>
      <h4>{feedbackItems.length} reviews</h4>
      <h4>Average rating: {isNaN(average) ? 0 : average % 1 > 0 ? average.toFixed(1) : average}</h4>
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
