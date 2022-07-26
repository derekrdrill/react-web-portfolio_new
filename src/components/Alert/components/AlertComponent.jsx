import React, { useContext } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Alert, AlertTitle } from '@mui/material';
import { AlertContext } from '../context/AlertContext';
import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

export const AlertComponent = () => {
  const { alert, fadeOut } = useContext(AlertContext);
  const { darkMode } = useContext(DarkLightModeContext);

  return (
    alert && (
      <StyledAlert darkMode={darkMode} severity={alert.type} $fadeOut={fadeOut}>
        <AlertTitle>{alert.title}</AlertTitle>
        {alert.msg}
      </StyledAlert>
    )
  );
};

const fadeOut = keyframes({
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
});

const StyledAlert = styled(Alert)`
  animation-name: ${props =>
    props.$fadeOut
      ? css`
          ${fadeOut}
        `
      : 'none'};
  animation-duration: 500ms;
  animation-direction: linear;
`;