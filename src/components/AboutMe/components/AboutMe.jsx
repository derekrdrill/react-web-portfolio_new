import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { Typography, List, ListItem } from '@mui/material';
import { ABOUT_ME_TEXT } from '../constants/ABOUT_ME_TEXT';
import bitmojiChillinWithBirds from '../../../assets/bitmoji_chillinWithBirds1.png';

export const AboutMe = ({ id }) => (
  <AboutMeContainer id={id} fluid>
    <Row>
      <Col className='py-3'>
        <AboutMeTitle variant='h3' component='h1' className='text-center'>
          ABOUT ME
        </AboutMeTitle>
      </Col>
    </Row>
    <Row>
      <AboutMeTextContainer xs={{ span: 10, order: 'last', offset: 1 }} lg={{ span: 5, order: 'first', offset: 1 }}>
        <AboutMeText variant='subtitle1' component='p'>
          {ABOUT_ME_TEXT[1].text}
        </AboutMeText>
        <AboutMeText variant='subtitle1' component='p'>
          {ABOUT_ME_TEXT[2].text}
        </AboutMeText>
        <List style={{ color: 'white' }}>
          <AboutMeListItem>{ABOUT_ME_TEXT[3].text}</AboutMeListItem>
          <AboutMeListItem>{ABOUT_ME_TEXT[4].text}</AboutMeListItem>
          <AboutMeListItem>{ABOUT_ME_TEXT[5].text}</AboutMeListItem>
          <AboutMeListItem>{ABOUT_ME_TEXT[6].text}</AboutMeListItem>
        </List>
        <AboutMeText variant='subtitle1' component='p'>
          {ABOUT_ME_TEXT[7].text}
        </AboutMeText>
        <AboutMeText variant='subtitle1' component='p'>
          {ABOUT_ME_TEXT[8].text}
        </AboutMeText>
        <AboutMeText variant='subtitle1' component='p'>
          {ABOUT_ME_TEXT[9].text}
        </AboutMeText>
      </AboutMeTextContainer>
      <AboutMeBitmojiContainer xs={12} lg={6}>
        <img src={bitmojiChillinWithBirds} alt='Chillin with birds' />
      </AboutMeBitmojiContainer>
    </Row>
  </AboutMeContainer>
);

const AboutMeContainer = styled(Container)({
  backgroundColor: '#030200',
  height: '100vh',
  paddingTop: '1%',
});

const AboutMeTitle = styled(Typography)({
  fontFamily: 'Shizuru',
  color: 'gainsboro',
});

const AboutMeTextContainer = styled(Col)({
  padding: 40,
  height: 550,
  overflowY: 'auto',
  border: '1px dashed #383838',
  borderRadius: 2,
  backgroundColor: '#303030',
});

const AboutMeBitmojiContainer = styled(Col)({
  textAlign: 'center',
  paddingTop: 75,
  paddingBottom: 20,
});

const AboutMeText = styled(Typography)({
  fontFamily: 'Kufam',
  // color: '#b8f1ff',
  color: 'gainsboro',
  marginBottom: 15,
});

const AboutMeListItem = styled(ListItem)({
  fontFamily: 'Kufam',
  color: 'gainsboro',
});
