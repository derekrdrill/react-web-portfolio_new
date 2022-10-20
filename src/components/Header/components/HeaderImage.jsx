import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { HeaderImageContainer } from './HeaderImageContainer';

import bitmojiThinking from '../../../assets/bitmoji_thinking.png';

export const HeaderImage = ({ currentRoute, homeClick }) => (
  <HeaderImageContainer condition={currentRoute === '/'}>
    <StyledHeaderImage
      src={bitmojiThinking}
      alt='home'
      onClick={currentRoute !== '/' ? homeClick : null}
    />
  </HeaderImageContainer>
);

HeaderImage.propTypes = {
  currentRoute: PropTypes.string,
  homeClick: PropTypes.func,
};

const StyledHeaderImage = styled.img({
  height: 65,
  top: 10,
  left: 10,
  cursor: 'pointer',
  ':hover': {
    opacity: 0.8,
  },
});
