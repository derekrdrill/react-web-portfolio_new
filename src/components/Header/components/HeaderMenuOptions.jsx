import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import styled from 'styled-components';

import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

// TODO: revisit condensing the two types of links with css instead of styled components
// import { css } from '@emotion/react';

export const HeaderMenuOptions = ({
  menuTitle,
  menuIcon,
  mainTo,
  secondaryTo,
  headerType,
  menuType,
}) => {
  const { darkMode } = React.useContext(DarkLightModeContext);

  return headerType === 'main' ? (
    <StyledScrollLink
      activeClass='active'
      darkMode={darkMode}
      duration={500}
      menuType={menuType}
      offset={-70}
      spy={true}
      to={mainTo}
    >
      {menuTitle}
      {menuIcon}
    </StyledScrollLink>
  ) : (
    <StyledRouterLink darkMode={darkMode} menuType={menuType} to={secondaryTo}>
      {menuTitle}
      {menuIcon}
    </StyledRouterLink>
  );
};

HeaderMenuOptions.propTypes = {
  menuTitle: PropTypes.string,
  menuIcon: PropTypes.node,
  mainTo: PropTypes.string,
  secondaryTo: PropTypes.string,
  headerType: PropTypes.string,
  menuType: PropTypes.string,
};

// TODO: revisit condensing the two types of links with css instead of styled components

// const styledLink = () => css({
//     color: 'royalblue',
//     textDecoration: 'none',
//     cursor: 'pointer',
//     backgroundImage: 'linear-gradient(royalblue, royalblue)',
//     backgroundSize: '0% 0.1em',
//     backgroundPositionY: '100%',
//     backgroundPositionX: '100%',
//     backgroundRepeat: 'no-repeat',
//     margin: 15,
//     padding: 2,
//     transition: 'background-size 0.2s ease-in-out',
//     textTransform: 'uppercase',
//     svg: {
//         transform: 'translate(3px, -2px)',
//         width: 17,
//         height: 17,
//     },
//     ':hover': {
//         backgroundSize: '100% 0.1em',
//         backgroundPositionX: '0%',
//     },
// });

export const StyledScrollLink = styled(ScrollLink)(({ darkMode, menuType }) => ({
  backgroundImage:
    menuType === 'list'
      ? 'linear-gradient(#212121, #212121)'
      : !darkMode
      ? 'linear-gradient(darkslategray, darkslategray)'
      : 'linear-gradient(royalblue, royalblue)',
  backgroundPositionY: '100%',
  backgroundPositionX: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '0% 0.1em',
  color:
    menuType === 'list'
      ? darkMode
        ? '#212121'
        : 'darkslategray'
      : !darkMode
      ? 'darkslategray'
      : 'royalblue',
  cursor: 'pointer',
  margin: menuType === 'main' && 15,
  padding: menuType === 'list' ? 20 : 8,
  textDecoration: 'none',
  textTransform: 'uppercase',
  transition: 'background-size 0.2s ease-in-out',
  width: '100%',
  ':hover': {
    backgroundColor: menuType === 'list' && 'lightblue',
    backgroundSize: '100% 0.1em',
    backgroundPositionX: '0%',
    color:
      menuType === 'list'
        ? darkMode
          ? '#212121'
          : 'darkslategray'
        : !darkMode
        ? 'darkslategray'
        : 'royalblue',
  },
  svg: {
    transform: 'translate(3px, -2px)',
    width: 17,
    height: 17,
  },
}));

export const StyledRouterLink = styled(RouterLink)(({ darkMode, menuType }) => ({
  backgroundImage:
    menuType === 'list'
      ? 'linear-gradient(#212121, #212121)'
      : !darkMode
      ? 'linear-gradient(darkslategray, darkslategray)'
      : 'linear-gradient(royalblue, royalblue)',
  backgroundPositionY: '100%',
  backgroundPositionX: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '0% 0.1em',
  color:
    menuType === 'list'
      ? darkMode
        ? '#212121'
        : 'darkslategray'
      : !darkMode
      ? 'darkslategray'
      : 'royalblue',
  cursor: 'pointer',
  margin: menuType === 'main' && 15,
  padding: menuType === 'list' ? 20 : 8,
  textDecoration: 'none',
  textTransform: 'uppercase',
  transition: 'background-size 0.2s ease-in-out',
  width: '100%',
  svg: {
    transform: 'translate(3px, -2px)',
    width: 17,
    height: 17,
  },
  ':hover': {
    backgroundColor: menuType === 'list' && 'lightblue',
    backgroundSize: '100% 0.1em',
    backgroundPositionX: '0%',
    color:
      menuType === 'list'
        ? darkMode
          ? '#212121'
          : 'darkslategray'
        : !darkMode
        ? 'darkslategray'
        : 'royalblue',
  },
}));
