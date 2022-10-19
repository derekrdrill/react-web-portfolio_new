import React from 'react';
import { FeedbackContext } from '../context/FeedbackContext';
import { FeedbackItem } from './FeedbackItem';

export const FeedbackList = () => {
  const { feedbackItems } = React.useContext(FeedbackContext);

  return (
    <>
      {feedbackItems &&
        feedbackItems.map(feedbackItem => (
          <FeedbackItem
            bgColorNumDisplay='#FF77BC'
            id={feedbackItem._id}
            key={feedbackItem._id}
            rating={feedbackItem.rating}
            text={feedbackItem.text}
          />
        ))}
    </>
  );
};
