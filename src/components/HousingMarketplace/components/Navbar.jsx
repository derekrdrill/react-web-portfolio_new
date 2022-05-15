import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AppBar, Button, Toolbar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faTag, faUser } from '@fortawesome/fontawesome-free-solid';

export const Navbar = ({ children }) => {
  return (
    <>
      <FooterBar>
        <Toolbar>
          <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            <StyledLink to='/housing-marketplace/explore'>
              <FooterBarButton startIcon={<FontAwesomeIcon color='grey' icon={faCompass} />}>Explore</FooterBarButton>
            </StyledLink>
            <StyledLink to='/housing-marketplace/offer'>
              <FooterBarButton startIcon={<FontAwesomeIcon color='grey' icon={faTag} />}>Offer</FooterBarButton>
            </StyledLink>
            <StyledLink to='/housing-marketplace/profile'>
              <FooterBarButton startIcon={<FontAwesomeIcon color='grey' icon={faUser} />}>Profile</FooterBarButton>
            </StyledLink>
          </div>
        </Toolbar>
      </FooterBar>
      {children}
    </>
  );
};

const FooterBar = styled(AppBar)({
  backgroundColor: 'white',
  overflow: 'hidden',
  position: 'fixed',
  bottom: 0,
  top: '90%',
});

const FooterBarButton = styled(Button)({
  ':hover': {
    background: 'none',
    color: '#5a5a5a',
    fontWeight: 'bold',
    svg: {
      path: {
        fill: '#5a5a5a',
      },
    },
  },
  color: 'grey',
});

const StyledLink = styled(Link)({
  textDecoration: 'none',
  margin: 15,
  padding: 2,
});
