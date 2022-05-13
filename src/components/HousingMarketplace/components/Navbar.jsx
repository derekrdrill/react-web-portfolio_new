import React from 'react';
import styled from 'styled-components';
import { AppBar, Button, Toolbar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faTag, faUser } from '@fortawesome/fontawesome-free-solid';

export const Navbar = ({ children }) => {
  return (
    <>
      {children}
      <FooterBar>
        <Toolbar>
          <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            <FooterBarButton startIcon={<FontAwesomeIcon color='grey' icon={faCompass} />}>Explore</FooterBarButton>
            <FooterBarButton startIcon={<FontAwesomeIcon color='grey' icon={faTag} />}>Offer</FooterBarButton>
            <FooterBarButton startIcon={<FontAwesomeIcon color='grey' icon={faUser} />}>Profile</FooterBarButton>
          </div>
        </Toolbar>
      </FooterBar>
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
