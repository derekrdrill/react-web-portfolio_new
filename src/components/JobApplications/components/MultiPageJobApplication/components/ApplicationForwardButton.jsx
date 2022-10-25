import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/fontawesome-free-solid';

import { DarkLightModeContext } from '../../../../DarkLightMode/context/DarkLightModeContext';

export const getForwardButtonTitle = (inputs, maxPage, page) =>
  `${page < maxPage - 1 ? inputs[page].title : 'REVIEW'}\u00A0\u00A0`;

export const ApplicationForwardButton = ({ page, maxPage, inputs, goForward }) => {
  const { darkMode } = React.useContext(DarkLightModeContext);

  return page === maxPage ? (
    <StyledLink to='/app-complete'>
      <StyledButton color='success' variant='contained' darkMode={darkMode}>
        {`${'SUBMIT APPLICATION'}\u00A0\u00A0`}
        <FontAwesomeIcon icon={faChevronRight} />
      </StyledButton>
    </StyledLink>
  ) : (
    <StyledButton color='info' darkMode={darkMode} onClick={goForward}>
      {getForwardButtonTitle(inputs, maxPage, page)}
      <FontAwesomeIcon icon={faChevronRight} />
    </StyledButton>
  );
};

ApplicationForwardButton.propTypes = {
  goForward: PropTypes.func,
  inputs: PropTypes.array,
  maxPage: PropTypes.number,
  page: PropTypes.number,
};

export const StyledButton = styled(Button)(({ darkMode }) => ({
  ':hover': {
    color: darkMode && 'white',
  },
  marginTop: 15,
}));

export const StyledLink = styled(Link)({
  textDecoration: 'none',
});
