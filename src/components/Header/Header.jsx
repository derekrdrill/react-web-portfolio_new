import React, { useState } from 'react';
import { AppBar as HeaderBar, Toolbar } from '@mui/material';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';
import bitmojiThinking from '../../assets/bitmoji_thinking.png';
import HeaderMenu from './components/HeaderMenu';
import { MoreOptions } from './components/MoreOptions';
import { MORE_OPTIONS } from './constants/MORE_OPTIONS';
import { LoaderSpinner } from '../LoaderSpinner/LoaderSpinner';
import { history } from '../../index';

export const Header = ({ children }) => {
  const currentRoute = history.location.pathname;
  const [loading, setLoading] = useState(null);

  const homeClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(null);
      history.push('/');
    }, 1200);
  };

  const DynamicHeaderImageWrapper = ({ condition, wrapper, children }) => (condition ? wrapper(children) : children);

  const HeaderImage = () => (
    <DynamicHeaderImageWrapper
      condition={currentRoute === '/'}
      wrapper={children => <ScrollLink to='home'>{children}</ScrollLink>}
    >
      <StyledHeaderImage src={bitmojiThinking} alt='home' onClick={currentRoute !== '/' ? homeClick : null} />
    </DynamicHeaderImageWrapper>
  );
  return (
    <div>
      <HeaderBar>
        <HeaderToolBar>
          <HeaderImage />
          <HeaderMenu headerType={currentRoute === '/' ? 'main' : 'secondary'} />
          <MoreOptions moreOptions={MORE_OPTIONS} />
        </HeaderToolBar>
      </HeaderBar>
      <StyledChildContainer>{children}</StyledChildContainer>
      <LoaderSpinner open={loading} />
    </div>
  );
};

const HeaderToolBar = styled(Toolbar)({
  backgroundColor: '#030200;',
  height: 80,
});

const StyledHeaderImage = styled.img({
  height: 65,
  top: 10,
  left: 10,
  cursor: 'pointer',
  ':hover': {
    opacity: 0.8,
  },
});

const StyledChildContainer = styled.div({
  marginTop: 80,
});
