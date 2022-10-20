import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  const getFeedbackItems = async () => {
    const response = await fetch('feedbackItems').catch(e => console.warn(e));

    if (response.ok) {
      const feedbackData = await response.json();
      setFeedbackItems(feedbackData);
    } else {
      console.warn(Promise.reject(response));
    }
  };

  const addFeedbackItem = async newFeedbackItem => {
    const response = await fetch('addFeedbackItem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFeedbackItem),
    }).catch(e => console.warn(e));

    if (response.ok) {
      const feedbackData = await response.json();
      setFeedbackItems([...feedbackItems, feedbackData]);
    } else {
      console.warn(Promise.reject(response));
    }
  };

  const deleteFeedbackItem = async deleteID => {
    const response = await fetch('deleteFeedbackItem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: deleteID }),
    }).catch(e => console.warn(e));

    if (response.ok) {
      const feedbackData = await response.json();
      const feedbackDataId = feedbackData._id;
      setFeedbackItems(feedbackItems.filter(item => item._id !== feedbackDataId));
    } else {
      console.warn(Promise.reject(response));
    }
  };

  const setFeedbackEditItems = (item, edit) => setFeedbackEdit({ item, edit: edit });

  const updateFeedbackItem = async updateItem => {
    const response = await fetch('updateFeedbackItem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateItem),
    });

    if (response.ok) {
      const feedbackData = await response.json();
      const feedbackDataId = feedbackData._id;

      setFeedbackItems(
        feedbackItems.map(feedbackItem =>
          feedbackItem._id === feedbackDataId
            ? Object.assign({}, feedbackItem, {
                rating: feedbackData.rating,
                text: feedbackData.text,
              })
            : feedbackItem,
        ),
      );

      setFeedbackEdit({ item: {}, edit: false });
    } else {
      console.warn(Promise.reject(response));
    }
  };

  useEffect(
    /* istanbul ignore next */
    () => getFeedbackItems(),
    [],
  );

  return (
    <FeedbackContext.Provider
      value={{
        feedbackEdit,
        feedbackItems,
        addFeedbackItem,
        deleteFeedbackItem,
        setFeedbackEditItems,
        updateFeedbackItem,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

FeedbackProvider.propTypes = {
  children: PropTypes.node,
};
