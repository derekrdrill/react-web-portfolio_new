import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { AppBar, Button, Grid, List, Toolbar } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

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
  const [smallMenuIsOpen, setSmallMenuIsOpen] = useState(false);

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
      <AppBar
        elevation={0}
        style={{
          backgroundColor: 'transparent',
          // borderBottom: '1px solid linear-gradient(to right, royalblue, skyblue)',
        }}
        // style={{
        //   borderBottom: darkMode
        //     ? 'linear-gradient(to right, royalblue, skyblue)'
        //     : 'linear-gradient(to right, darkblue, teal)',
        // }}
      >
        <Grid container style={{ height: 80 }}>
          <Grid item xs={12} style={{ display: 'block', zIndex: 5 }}>
            <HeaderToolBar
              darkMode={darkMode}
              // style={{
              //   borderBottom: '5px solid transparent',
              //   // borderImage: 'linear-gradient(0.25turn, rgba(255,249,34), rgba(255,0,128), rgba(56,2,155,0))',
              //   borderImage: 'linear-gradient(0.25turn, rgba(100, 72, 254, 1), royalblue, skyblue)',
              //   borderImageSlice: 1,
              //   width: '100%',
              // }}
            >
              <Grid container justifyContent='space-between'>
                <HeaderImage />
                <Grid display={{ xs: 'none', md: 'block' }} item style={{ paddingTop: 20 }}>
                  <HeaderMenu headerType={currentRoute === '/' ? 'main' : 'secondary'} menuType='main' />
                </Grid>
                <Grid display={{ xs: 'block', md: 'none' }} item style={{ paddingTop: 20 }}>
                  <Button
                    endIcon={smallMenuIsOpen ? <CancelPresentationIcon /> : <KeyboardDoubleArrowDownIcon />}
                    onClick={() => {
                      setSmallMenuIsOpen(!smallMenuIsOpen);
                    }}
                    style={{ color: darkMode ? 'grey' : 'slategray' }}
                  >
                    {`${smallMenuIsOpen ? 'Close' : 'Open'} page list`}
                  </Button>
                </Grid>
                <Grid item style={{ paddingTop: 10 }}>
                  <MoreOptions moreOptions={MORE_OPTIONS} />
                </Grid>
              </Grid>
            </HeaderToolBar>
            {/* <PageDivider darkMode={darkMode} /> */}
          </Grid>
          <HeaderMenuListItem darkMode={darkMode} item smallMenuIsOpen={smallMenuIsOpen} xs={12}>
            <List>
              <HeaderMenu headerType={currentRoute === '/' ? 'main' : 'secondary'} menuType='list' />
            </List>
          </HeaderMenuListItem>
        </Grid>
      </AppBar>
      <StyledChildContainer>{children}</StyledChildContainer>
      <LoaderSpinner open={loading} />
    </div>
  );
};

const HeaderMenuListItem = styled(Grid)(({ darkMode, smallMenuIsOpen }) => ({
  backgroundColor: darkMode ? '#616161' : 'beige',
  boxShadow: '0 4px 2px -2px darkgray',
  transform: smallMenuIsOpen ? 'translateY(0)' : 'translateY(-150%)',
  transition: 'all 0.7s ease-out',
  visibility: smallMenuIsOpen ? 'visible' : 'hidden',
  '@media screen and (min-width: 899px)': {
    opacity: 0.4,
    transform: 'translateY(-150%)',
    visibility: 'hidden',
  },
}));

const PageDivider = styled.hr(({ darkMode }) => ({
  background: darkMode ? 'linear-gradient(to right, royalblue, skyblue)' : 'linear-gradient(to right, darkblue, teal)',
  margin: 0,
  minHeight: 5,
  padding: 0,
}));

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
