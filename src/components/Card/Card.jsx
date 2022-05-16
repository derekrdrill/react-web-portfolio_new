import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Card = ({
  backgroundColor,
  children,
  darkMode,
  hoverBackgroundcolor,
  hoverable,
  onClick,
  spacing,
  textColor,
}) => (
  <StyledDiv
    backgroundColor={backgroundColor}
    darkMode={darkMode}
    hoverBackgroundcolor={hoverBackgroundcolor}
    hoverable={hoverable}
    onClick={onClick}
    spacing={spacing}
    textColor={textColor}
  >
    {children}
  </StyledDiv>
);

Card.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node,
  darkMode: PropTypes.bool,
  hoverBackgroundcolor: PropTypes.string,
  hoverable: PropTypes.bool,
  padding: PropTypes.bool,
  spacing: PropTypes.bool,
  textColor: PropTypes.string,
};

Card.defaultProps = {
  darkMode: false,
  padding: true,
};

const StyledDiv = styled.div(({ backgroundColor, darkMode, hoverBackgroundcolor, hoverable, spacing, textColor }) => ({
  '.MuiInputBase-root': {
    backgroundColor: darkMode ? '#404040' : backgroundColor ? backgroundColor : '#FFF',
    color: darkMode ? '#fff' : textColor ? textColor : '#333',
  },
  ':hover': {
    backgroundColor: hoverBackgroundcolor && hoverBackgroundcolor,
  },
  backgroundColor: darkMode ? '#404040' : backgroundColor ? backgroundColor : '#FFF',
  color: darkMode ? '#fff' : textColor ? textColor : '#333',
  borderRadius: 15,
  padding: spacing ? '40px 50px' : 10,
  margin: spacing ? '20px 25px' : 2,
  position: 'relative',
  cursor: hoverable && 'pointer',
}));
