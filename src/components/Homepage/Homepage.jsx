import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import { Grid, Typography } from '@mui/material';

import { DarkLightModeContext } from '../DarkLightMode/context/DarkLightModeContext';

import meNGeorge from '../../assets/meNGeorge.jpg';
import qcLogoBlue from '../../assets/crown-blue.png';
import qcLogoWhite from '../../assets/crown-white.png';

export const getQCLogo = (darkMode, qcLogoWhite, qcLogoBlue) =>
  darkMode ? qcLogoWhite : qcLogoBlue;

const Homepage = ({ id }) => {
  const { darkMode } = React.useContext(DarkLightModeContext);

  return (
    <>
      <PageBodyStyle darkMode={darkMode} />
      <HomepageContainer
        id={id}
        container
        darkMode={darkMode}
        justifyContent={{ xs: 'center', md: 'flex-start' }}
      >
        <Grid item order={{ xs: 2, md: 1 }} xs={12} md={9}>
          <Grid container justifyContent={{ xs: 'center', sm: 'flex-start' }}>
            <Grid item xs={12} sm={9} md={7} lg={6} xl={5}>
              <Grid container display={{ xs: 'block', md: 'none' }}>
                <QCLogo alt='qc-logo' src={getQCLogo(darkMode, qcLogoWhite, qcLogoBlue)} />
              </Grid>
              <HomePageText darkMode={darkMode} variant='h2' component='h1'>
                {`Welcome from the Queen City`}
              </HomePageText>
              <br />
            </Grid>
            <Grid item sm={9} md={5} lg={6} xl={7} display={{ xs: 'none', md: 'block' }}>
              <QCLogo src={getQCLogo(darkMode, qcLogoWhite, qcLogoBlue)} alt='qc-logo' />
            </Grid>
            <Grid item xs={12} justifyContent={{ xs: 'center', sm: 'flex-start' }}>
              <HomePageText darkMode={darkMode} variant='h4' component='h1'>
                {`I'm Derek! A passionate web developer and the G.O.A.T. dog-dad of the Greater
                Charlotte Metro area`}
              </HomePageText>
              <br />
              <HomePageText darkMode={darkMode} variant='h6' component='h1'>
                {`I strive to elegantly code user-friendly web apps that utilize React, Material UI
                  and Styled-Components in the front-end, and MongoDB and ExpressJS in the back-end`}
              </HomePageText>
            </Grid>
          </Grid>
        </Grid>
        <HomePageImageContainer item md={3} order={{ xs: 1, md: 2 }}>
          <HomePageImage src={meNGeorge} alt='Me and George' />
        </HomePageImageContainer>
      </HomepageContainer>
    </>
  );
};

Homepage.propTypes = {
  id: PropTypes.string,
};

export default Homepage;

export const PageBodyStyle = createGlobalStyle(({ darkMode }) => ({
  body: {
    backgroundColor: darkMode ? '#030200' : 'whitesmoke',
  },
}));

export const HomepageContainer = styled(Grid)({
  padding: '15% 50px 20% 50px',
});

export const HomePageText = styled(Typography)(({ darkMode }) => ({
  margin: 10,
  fontFamily: 'Roboto Slab',
  color: darkMode ? 'white' : '#759CC9',
}));

export const HomePageImage = styled.img({
  width: 325,
  height: 350,
  borderRadius: 250,
  border: '2px royalblue dotted',
});

export const HomePageImageContainer = styled(Grid)({
  paddingBottom: 50,
});

export const QCLogo = styled.img({
  marginBottom: 10,
  width: 150,
  height: 100,
});