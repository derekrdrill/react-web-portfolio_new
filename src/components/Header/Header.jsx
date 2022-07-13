import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { AppBar, Toolbar } from '@mui/material';

import HeaderMenu from './components/HeaderMenu';
import { MoreOptions } from './components/MoreOptions';
import { LoaderSpinner } from '../LoaderSpinner/LoaderSpinner';

import { DarkLightModeContext } from '../DarkLightMode/context/DarkLightModeContext';

import { MORE_OPTIONS } from './constants/MORE_OPTIONS';
import bitmojiThinking from '../../assets/bitmoji_thinking.png';
import { history } from '../../index';

export const Header = ({ children }) => {
  const currentRoute = history.location.pathname;

  const { darkMode } = useContext(DarkLightModeContext);

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
      <AppBar elevation={0}>
        <HeaderToolBar darkMode={darkMode}>
          <HeaderImage />
          <HeaderMenu headerType={currentRoute === '/' ? 'main' : 'secondary'} />
          <MoreOptions moreOptions={MORE_OPTIONS} />
        </HeaderToolBar>
      </AppBar>
      <StyledChildContainer>{children}</StyledChildContainer>
      <LoaderSpinner open={loading} />
    </div>
  );
};

// const HeaderBar = styled(AppBar)({
//   '.MuiPaper-root': {
//     boxShadow: 'none',
//   },
// });

const HeaderToolBar = styled(Toolbar)(({ darkMode }) => ({
  backgroundColor: darkMode ? '#030200' : 'whitesmoke',
  height: 80,
}));

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
