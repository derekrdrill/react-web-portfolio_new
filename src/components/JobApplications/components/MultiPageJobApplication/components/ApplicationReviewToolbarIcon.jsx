import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faLock } from '@fortawesome/fontawesome-free-solid';

export const ApplicationReviewToolbarIcon = ({ editMode }) => (
  <FontAwesomeIcon icon={editMode ? faLock : faPenSquare} />
);

ApplicationReviewToolbarIcon.propTypes = {
  editMode: PropTypes.bool,
};
