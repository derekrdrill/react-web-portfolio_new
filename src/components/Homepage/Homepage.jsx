import React from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import { Container, Row, Col } from 'react-bootstrap';
import homepagePhoto from '../../assets/homepagePhoto.jpeg';
import qcLogo from '../../assets/crown-white.png';

export const Homepage = ({ id }) => (
  <HomepageContainer id={id}>
    <HomepageContentContainer>
      <Row>
        <Col sm={{ span: 12, order: 'last' }} lg={{ span: 8, order: 'first' }} className='my-5 py-4 my-lg-0 py-lg-0'>
          <Row>
            <Col sm={12} lg={9}>
              <QCLogo src={qcLogo} alt='qc-logo' className='d-block d-lg-none' />
              <HomePageText variant='h2' component='h1'>
                Welcome from the Queen City
              </HomePageText>
            </Col>
            <Col sm={{ span: 9, offset: 4 }} lg={{ span: 3, offset: 0 }} className='d-none d-lg-block'>
              <QCLogo src={qcLogo} alt='qc-logo' />
            </Col>
          </Row>
          <HomePageText variant='h4' component='h1'>
            I'm Derek! A passionate web developer and the G.O.A.T. dog-dad of the Greater Charlotte Metro area
          </HomePageText>
          <HomePageText variant='h6' component='h1'>
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

const HomepageContainer = styled.div({
  backgroundColor: '#030200',
  height: '100vh',
});

const HomepageContentContainer = styled(Container)({
  paddingTop: '12%',
  paddingBottom: '30%',
});

const HomePageText = styled(Typography)({
  marginBottom: 15,
  fontFamily: 'Roboto Slab',
  color: 'white',
});

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
