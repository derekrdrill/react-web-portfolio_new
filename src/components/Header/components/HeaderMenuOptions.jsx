import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import styled from 'styled-components';

// TODO: revisit condensing the two types of links with css instead of styled components
// import { css } from '@emotion/react';

export const HeaderMenuOptions = ({ menuTitle, menuIcon, mainTo, secondaryTo, headerType }) => {
  return headerType === 'main' ? (
    <StyledScrollLink activeClass='active' to={mainTo} spy={true} offset={-70} duration={500}>
      {menuTitle}
      {menuIcon}
    </StyledScrollLink>
  ) : (
    <StyledRouterLink to={secondaryTo}>
      {menuTitle}
      {menuIcon}
    </StyledRouterLink>
  );
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

const StyledScrollLink = styled(ScrollLink)({
  color: 'royalblue',
  textDecoration: 'none',
  cursor: 'pointer',
  backgroundImage: 'linear-gradient(royalblue, royalblue)',
  backgroundSize: '0% 0.1em',
  backgroundPositionY: '100%',
  backgroundPositionX: '100%',
  backgroundRepeat: 'no-repeat',
  margin: 15,
  padding: 2,
  transition: 'background-size 0.2s ease-in-out',
  textTransform: 'uppercase',
  svg: {
    transform: 'translate(3px, -2px)',
    width: 17,
    height: 17,
  },
  ':hover': {
    backgroundSize: '100% 0.1em',
    backgroundPositionX: '0%',
  },
});

const StyledRouterLink = styled(RouterLink)({
  color: 'royalblue',
  textDecoration: 'none',
  cursor: 'pointer',
  backgroundImage: 'linear-gradient(royalblue, royalblue)',
  backgroundSize: '0% 0.1em',
  backgroundPositionY: '100%',
  backgroundPositionX: '100%',
  backgroundRepeat: 'no-repeat',
  margin: 15,
  padding: 2,
  transition: 'background-size 0.2s ease-in-out',
  textTransform: 'uppercase',
  svg: {
    transform: 'translate(3px, -2px)',
    width: 17,
    height: 17,
  },
  ':hover': {
    backgroundSize: '100% 0.1em',
    backgroundPositionX: '0%',
  },
});
