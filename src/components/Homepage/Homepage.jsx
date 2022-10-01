import React, { useContext } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Grid, Typography } from '@mui/material';

import { DarkLightModeContext } from '../DarkLightMode/context/DarkLightModeContext';

import homepagePhoto from '../../assets/homepagePhoto.jpeg';
import qcLogoWhite from '../../assets/crown-white.png';
import qcLogoBlue from '../../assets/crown-blue.png';

export const Homepage = ({ id }) => {
  const { darkMode } = useContext(DarkLightModeContext);

  return (
    <>
      <PageBodyStyle darkMode={darkMode} />
      <HomepageContainer id={id} container darkMode={darkMode} justifyContent={{ xs: 'center', md: 'flex-start' }}>
        <Grid item order={{ xs: 2, md: 1 }} xs={12} md={9}>
          <Grid container justifyContent={{ xs: 'center', sm: 'flex-start' }}>
            <Grid item xs={12} sm={9} md={7} lg={6} xl={5}>
              <Grid container display={{ xs: 'block', md: 'none' }}>
                <QCLogo alt='qc-logo' src={darkMode ? qcLogoWhite : qcLogoBlue} />
              </Grid>
              <HomePageText darkMode={darkMode} variant='h2' component='h1'>
                Welcome from the Queen City
              </HomePageText>
            </Grid>
            <Grid item sm={9} md={5} lg={6} xl={7} display={{ xs: 'none', md: 'block' }}>
              <QCLogo src={darkMode ? qcLogoWhite : qcLogoBlue} alt='qc-logo' />
            </Grid>
            <Grid item xs={12} justifyContent={{ xs: 'center', sm: 'flex-start' }}>
              <HomePageText darkMode={darkMode} variant='h4' component='h1'>
                I'm Derek! A passionate web developer and the G.O.A.T. dog-dad of the Greater Charlotte Metro area
              </HomePageText>
              <HomePageText darkMode={darkMode} variant='h6' component='h1'>
                I strive to elegantly code user-friendly web apps that utilize React, Material UI and Styled-Components
                in the front-end, and MongoDB and ExpressJS in the back-end
              </HomePageText>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={3} order={{ xs: 1, md: 2 }} style={{ paddingBottom: 50 }}>
          <HomePageImage src={homepagePhoto} alt='Me and George' />
        </Grid>
      </HomepageContainer>
    </>
  );
};

const PageBodyStyle = createGlobalStyle(({ darkMode }) => ({
  body: {
    backgroundColor: darkMode ? '#030200' : 'whitesmoke',
  },
}));

const HomepageContainer = styled(Grid)({
  padding: '200px 50px 500px 50px',
});


const HomePageText = styled(Typography)(({ darkMode }) => ({
  marginBottom: 15,
  fontFamily: 'Roboto Slab',
  color: darkMode ? 'white' : '#759CC9',
}));

const HomePageImage = styled.img({
  width: 325,
  height: 350,
  borderRadius: 250,
  border: '2px royalblue dotted',
});

const QCLogo = styled.img({
  marginBottom: 10,
  width: 150,
  height: 100,
});
