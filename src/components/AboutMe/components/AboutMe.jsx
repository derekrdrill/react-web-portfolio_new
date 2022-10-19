import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { Typography, List, ListItem } from '@mui/material';

import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

import { ABOUT_ME_TEXT } from '../constants/ABOUT_ME_TEXT';
import bitmojiChillinWithBirds from '../../../assets/bitmoji_chillinWithBirds1.png';

export const AboutMe = ({ id }) => {
  // test change

  const { darkMode } = React.useContext(DarkLightModeContext);

  return (
    <>
      <PageBodyStyle darkMode={darkMode} />
      <AboutMeContainer darkMode={darkMode} id={id} fluid>
        <Row>
          <Col className='py-3'>
            <AboutMeTitle className='text-center' component='h1' darkMode={darkMode} variant='h3'>
              ABOUT ME
            </AboutMeTitle>
          </Col>
        </Row>
        <Row>
          <AboutMeTextContainer
            darkMode={darkMode}
            xs={{ span: 10, order: 'last', offset: 1 }}
            lg={{ span: 5, order: 'first', offset: 1 }}
          >
            <AboutMeText darkMode={darkMode} variant='subtitle1' component='p'>
              {ABOUT_ME_TEXT[1].text}
            </AboutMeText>
            <AboutMeText darkMode={darkMode} variant='subtitle1' component='p'>
              {ABOUT_ME_TEXT[2].text}
            </AboutMeText>
            <List style={{ color: 'white' }}>
              <AboutMeListItem darkMode={darkMode}>{ABOUT_ME_TEXT[3].text}</AboutMeListItem>
              <AboutMeListItem darkMode={darkMode}>{ABOUT_ME_TEXT[4].text}</AboutMeListItem>
              <AboutMeListItem darkMode={darkMode}>{ABOUT_ME_TEXT[5].text}</AboutMeListItem>
              <AboutMeListItem darkMode={darkMode}>{ABOUT_ME_TEXT[6].text}</AboutMeListItem>
            </List>
            <AboutMeText darkMode={darkMode} variant='subtitle1' component='p'>
              {ABOUT_ME_TEXT[7].text}
            </AboutMeText>
            <AboutMeText darkMode={darkMode} variant='subtitle1' component='p'>
              {ABOUT_ME_TEXT[8].text}
            </AboutMeText>
            <AboutMeText darkMode={darkMode} variant='subtitle1' component='p'>
              {ABOUT_ME_TEXT[9].text}
            </AboutMeText>
          </AboutMeTextContainer>
          <AboutMeBitmojiContainer xs={12} lg={6}>
            <img src={bitmojiChillinWithBirds} alt='Chillin with birds' />
          </AboutMeBitmojiContainer>
        </Row>
      </AboutMeContainer>
    </>
  );
};

const PageBodyStyle = createGlobalStyle(({ darkMode }) => ({
  body: {
    backgroundColor: darkMode ? '#030200' : 'whitesmoke',
  },
}));

export const AboutMeContainer = styled(Container)(({ darkMode }) => ({
  padding: '30px 50px 200px 50px',
  borderTop: '2px solid transparent',
  borderImage: darkMode
    ? 'linear-gradient(to right, rgba(248, 184, 255, 1), skyblue, gainsboro)'
    : 'linear-gradient(to right, rgba(176, 52, 197, 1), rgba(86, 206, 210, 1))',
  borderImageSlice: 1,
}));

export const AboutMeTitle = styled(Typography)(({ darkMode }) => ({
  fontFamily: 'Shizuru',
  fontWeight: darkMode ? 'normal' : 'bold',
  color: darkMode ? 'gainsboro' : 'darkslategray',
}));

export const AboutMeTextContainer = styled(Col)(({ darkMode }) => ({
  padding: 40,
  height: 550,
  overflowY: 'auto',
  border: '1px dashed #383838',
  borderRadius: 2,
  backgroundColor: darkMode ? '#303030' : '#eee5c1',
}));

export const AboutMeBitmojiContainer = styled(Col)({
  textAlign: 'center',
  paddingTop: 75,
  paddingBottom: 20,
});

export const AboutMeText = styled(Typography)(({ darkMode }) => ({
  fontFamily: 'Kufam',
  color: darkMode ? 'gainsboro' : '#333333',
  marginBottom: 15,
}));

export const AboutMeListItem = styled(ListItem)(({ darkMode }) => ({
  fontFamily: 'Kufam',
  color: darkMode ? 'gainsboro' : '#333333',
}));
