import React from 'react';
import styled from 'styled-components';
import { Grid, Typography, Button } from '@mui/material';
import { CONNECT_TYPES } from '../constants/CONNECT_TYPES';
import { CONNECT_FORM_INPUTS } from '../constants/CONNECT_FORM_INPUTS';
import { DynamicFormInputs } from '../../DynamicFormInputs/DynamicFormInputs';
import bitmojiWaterCooler from '../../../assets/bitmoji_waterCooler.png';

export const ConnectWithMe = ({ id }) => {
  const connectTypes = CONNECT_TYPES;
  return (
    <ContactPageContainer id={id} container>
      <TitleContainer item xs={12}>
        <TitleText variant='h3' component='h2'>
          LET'S CONNECT
        </TitleText>
        <DescriptionText variant='h6' component='p'>
          Fire up an email, check out my LinkedIn, see this project in Github or send me a message right here!
        </DescriptionText>
      </TitleContainer>
      <ConnectTypeContainer item xs={12} lg={4}>
        <Grid container>
          {connectTypes.map(connect => (
            <Grid key={connect.id} item xs={4} lg={12}>
              <Grid container justifyContent='center'>
                <StyledLink href={connect.href} target={connect.target}>
                  {connect.icon}
                </StyledLink>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </ConnectTypeContainer>
      <DirectConnectContainer item xs={12} lg={8}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={5}>
            <DynamicFormInputs inputs={CONNECT_FORM_INPUTS[0].inputs} />
          </Grid>
          <Grid item xs={12} lg={7}>
            <DynamicFormInputs inputs={CONNECT_FORM_INPUTS[1].inputs} />
          </Grid>
        </Grid>
        <Grid container justifyContent='flex-end'>
          <Button variant='contained' color='warning'>
            Send
          </Button>
        </Grid>
      </DirectConnectContainer>
      <Grid item xs={12}>
        <Grid container justifyContent={{ xs: 'flex-start', lg: 'flex-end' }}>
          <StyledBitmojiImage src={bitmojiWaterCooler} />
        </Grid>
      </Grid>
    </ContactPageContainer>
  );
};

const ContactPageContainer = styled(Grid)({
  backgroundColor: '#030200',
  paddingTop: '0.5%',
  height: '105vh',
});

const ConnectTypeContainer = styled(Grid)({
  transform: 'translateY(-10px)',
});

const TitleContainer = styled(Grid)({
  paddingRight: '2%',
  display: 'block',
  textAlign: 'right',
});

const TitleText = styled(Typography)({
  fontFamily: 'Shizuru',
  color: 'beige',
  marginBottom: 10,
});

const DescriptionText = styled(Typography)({
  fontFamily: 'Kufam',
  color: 'beige',
});

const StyledLink = styled.a({
  svg: {
    width: 110,
    height: 150,
    color: 'beige',
    path: {
      fill: '#36454F',
    },
    ':hover': {
      path: {
        fill: '#367993',
      },
    },
  },
});

const DirectConnectContainer = styled(Grid)({
  padding: '2% 2% 0 2%',
});

const StyledBitmojiImage = styled.img({
  width: 225,
  height: 240,
  transform: 'translateY(-65px)',
});
