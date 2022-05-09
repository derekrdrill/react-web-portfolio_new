import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Card = ({ children, darkMode }) => <StyledDiv darkMode={darkMode}>{children}</StyledDiv>;

Card.propTypes = {
  children: PropTypes.node,
  darkMode: PropTypes.bool,
};

Card.defaultProps = {
  darkMode: false,
};

const StyledDiv = styled.div(({ darkMode }) => ({
  '.MuiInputBase-root': {
    backgroundColor: darkMode ? '#404040' : '#FFF',
    color: darkMode ? '#c7c7c7' : '#333',
  },
  backgroundColor: darkMode ? '#333' : '#fff',
  color: darkMode ? '#fff' : '#333',
  borderRadius: 15,
  padding: '40px 50px',
  margin: '20px 25px',
  position: 'relative',
}));
