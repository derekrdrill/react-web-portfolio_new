import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/fontawesome-free-solid';

import { DarkLightModeContext } from '../../../../DarkLightMode/context/DarkLightModeContext';

export const getBackButtonTitle = (inputs, page) =>
  `\u00A0\u00A0${page > 1 ? inputs[page - 2].title : 'LANDING PAGE'}`;

export const ApplicationBackButton = ({ goBackward, inputs, page }) => {
  const { darkMode } = React.useContext(DarkLightModeContext);

  return (
    <StyledButton color='info' darkMode={darkMode} onClick={goBackward}>
      <FontAwesomeIcon icon={faChevronLeft} />
      {getBackButtonTitle(inputs, page)}
    </StyledButton>
  );
};

ApplicationBackButton.propTypes = {
  goBackward: PropTypes.func,
  inputs: PropTypes.array,
  page: PropTypes.number,
};

export const StyledButton = styled(Button)(({ darkMode }) => ({
  ':hover': {
    color: darkMode && 'white',
  },
  marginTop: 15,
}));
