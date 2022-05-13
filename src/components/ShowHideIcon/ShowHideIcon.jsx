import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/fontawesome-free-solid';

export const ShowHideIcon = ({ onClick }) => {
  const [locked, setLocked] = useState(true);
  const handleSetLocked = () => setLocked(!locked);

  return (
    <StyledEyeIcon
      icon={locked ? faEye : faEyeSlash}
      onClick={() => {
        handleSetLocked();
        onClick && onClick();
      }}
    />
  );
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
