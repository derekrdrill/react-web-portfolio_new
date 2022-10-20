import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/fontawesome-free-solid';

export const EyeIcon = ({ locked, onClick }) => (
  <StyledEyeIcon icon={locked ? faEye : faEyeSlash} onClick={onClick} />
);

EyeIcon.propTypes = {
  locked: PropTypes.bool,
  onClick: PropTypes.func,
};

const StyledEyeIcon = styled(FontAwesomeIcon)({
  ':hover': {
    path: {
      fill: '#453f3d',
    },
  },
  cursor: 'pointer',
  height: 24,
  path: {
    fill: 'grey',
  },
});
