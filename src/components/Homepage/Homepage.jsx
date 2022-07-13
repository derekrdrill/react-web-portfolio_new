import React, { useContext } from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import { Container, Row, Col } from 'react-bootstrap';

import { DarkLightModeContext } from '../DarkLightMode/context/DarkLightModeContext';

import homepagePhoto from '../../assets/homepagePhoto.jpeg';
import qcLogoWhite from '../../assets/crown-white.png';
import qcLogoBlue from '../../assets/crown-blue.png';

export const Homepage = ({ id }) => {
  const { darkMode } = useContext(DarkLightModeContext);

  return (
    <HomepageContainer id={id} darkMode={darkMode}>
      <HomepageContentContainer>
        <Row>
          <Col sm={{ span: 12, order: 'last' }} lg={{ span: 8, order: 'first' }} className='my-5 py-4 my-lg-0 py-lg-0'>
            <Row>
              <Col sm={12} lg={9}>
                <QCLogo src={darkMode ? qcLogoWhite : qcLogoBlue} alt='qc-logo' className='d-block d-lg-none' />
                <HomePageText darkMode={darkMode} variant='h2' component='h1'>
                  Welcome from the Queen City
                </HomePageText>
              </Col>
              <Col sm={{ span: 9, offset: 4 }} lg={{ span: 3, offset: 0 }} className='d-none d-lg-block'>
                <QCLogo src={darkMode ? qcLogoWhite : qcLogoBlue} alt='qc-logo' />
              </Col>
            </Row>
            <HomePageText darkMode={darkMode} variant='h4' component='h1'>
              I'm Derek! A passionate web developer and the G.O.A.T. dog-dad of the Greater Charlotte Metro area
            </HomePageText>
            <HomePageText darkMode={darkMode} variant='h6' component='h1'>
              I strive to elegantly code user-friendly web apps that utilize ReactJS, Material UI and Styled-Components
            </HomePageText>
          </Col>
          <Col xs={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 0 }} className='my-5 py-5 my-lg-0 py-lg-0'>
            <HomePageImage src={homepagePhoto} alt='Me and George' />
          </Col>
        </Row>
      </HomepageContentContainer>
    </HomepageContainer>
  );
};

const HomepageContainer = styled.div(({ darkMode }) => ({
  backgroundColor: darkMode ? '#030200' : 'whitesmoke',
  height: '100vh',
}));

const HomepageContentContainer = styled(Container)({
  paddingTop: '12%',
  paddingBottom: '30%',
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
