import React, { useContext } from 'react';
import { history } from '../../../index';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AppBar, Button, Toolbar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faTag, faUser } from '@fortawesome/fontawesome-free-solid';

import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

export const Navbar = ({ children }) => {
  const pathName = history.location.pathname;
  const currentPage = pathName.slice(pathName.indexOf('place/') + 6, pathName.length);

  const { darkMode } = useContext(DarkLightModeContext);

  return (
    <>
      <FooterBar darkMode={darkMode}>
        <Toolbar>
          <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            <StyledLink to='/housing-marketplace/explore'>
              <FooterBarButton
                darkMode={darkMode}
                currentPage={currentPage}
                page='explore'
                startIcon={<FontAwesomeIcon color='grey' icon={faCompass} />}
              >
                Explore
              </FooterBarButton>
            </StyledLink>
            <StyledLink to='/housing-marketplace/offers'>
              <FooterBarButton
                currentPage={currentPage}
                page='offers'
                startIcon={<FontAwesomeIcon color='grey' icon={faTag} />}
              >
                Offers
              </FooterBarButton>
            </StyledLink>
            <StyledLink to='/housing-marketplace/profile'>
              <FooterBarButton
                currentPage={currentPage}
                page='profile'
                startIcon={<FontAwesomeIcon color='grey' icon={faUser} />}
              >
                Profile
              </FooterBarButton>
            </StyledLink>
          </div>
        </Toolbar>
      </FooterBar>
      {children}
    </>
  );
};

const FooterBar = styled(AppBar)(({ darkMode }) => ({
  backgroundColor: darkMode ? '#1c1c1c' : 'white',
  overflow: 'hidden',
  position: 'fixed',
  bottom: 0,
  top: '90%',
}));

const FooterBarButton = styled(Button)(({ darkMode, currentPage, page }) => [
  {
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
    color: currentPage === page ? '#5a5a5a' : 'grey',
    fontWeight: currentPage === page ? 'bold' : 'normal',
    svg: {
      path: {
        fill: currentPage === page ? '#5a5a5a' : 'grey',
      },
    },
  },
]);

const StyledLink = styled(Link)({
  textDecoration: 'none',
  margin: 15,
  padding: 2,
});
