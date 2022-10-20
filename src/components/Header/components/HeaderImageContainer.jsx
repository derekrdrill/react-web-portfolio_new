import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import PropTypes from 'prop-types';

export const HeaderImageContainer = ({ children, condition }) =>
  condition ? <ScrollLink to='home'>{children}</ScrollLink> : children;

HeaderImageContainer.propTypes = {
  children: PropTypes.node,
  condition: PropTypes.bool,
};
