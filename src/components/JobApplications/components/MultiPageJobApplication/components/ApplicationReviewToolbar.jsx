import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconButton, Toolbar } from '@mui/material';

import { DarkLightModeContext } from '../../../../DarkLightMode/context/DarkLightModeContext';

import { ApplicationReviewToolbarIcon } from './ApplicationReviewToolbarIcon';

export const ApplicationReviewToolbar = ({ editMode, maxPage, page, toggleEditMode }) => {
  const { darkMode } = React.useContext(DarkLightModeContext);

  return (
    page === maxPage && (
      <StyledToolbar darkMode={darkMode}>
        <EditIcon onClick={toggleEditMode}>
          <ApplicationReviewToolbarIcon editMode={editMode} />
        </EditIcon>
      </StyledToolbar>
    )
  );
};

ApplicationReviewToolbar.propTypes = {
  editMode: PropTypes.bool,
  maxPage: PropTypes.number,
  page: PropTypes.number,
  toggleEditMode: PropTypes.func,
};

export const StyledToolbar = styled(Toolbar)(({ darkMode }) => ({
  backgroundColor: darkMode ? 'grey' : 'gainsboro',
}));

export const EditIcon = styled(IconButton)({
  path: {
    fill: 'darkslategrey',
    borderRadius: 5,
  },
});
