import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Grid, Typography, Button } from '@mui/material';

import { AlertComponent as Alert } from '../../Alert/components/AlertComponent';
import { DynamicFormInputs } from '../../DynamicFormInputs/DynamicFormInputs';

import { AlertContext } from '../../Alert/context/AlertContext';
import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

import { handleAlert } from '../../Alert/context/AlertActions';
import { formInputsGenerator } from '../../../utils/formInputsGenerator';

import { CONNECT_TYPES } from '../constants/CONNECT_TYPES';
import { CONNECT_FORM_INPUTS } from '../constants/CONNECT_FORM_INPUTS';
import bitmojiWaterCooler from '../../../assets/bitmoji_waterCooler.png';

export const ConnectWithMe = ({ id }) => {
  const connectTypes = CONNECT_TYPES;

  const { alertDispatch } = useContext(AlertContext);
  const { darkMode } = useContext(DarkLightModeContext);

  const [form1, setForm1] = useState(formInputsGenerator(CONNECT_FORM_INPUTS[0].inputs));
  const [form2, setForm2] = useState(formInputsGenerator(CONNECT_FORM_INPUTS[1].inputs));

  const handleMessageSend = async () => {
    const { firstName, lastName, email, phone } = form1;
    const { message } = form2;

    if (firstName && lastName && email && message) {
      const response = await fetch(`../send-email/${email}/${firstName}/${lastName}/${message}/${phone}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).catch(e => console.warn(e));

      if (response.ok) {
        const messageData = await response.json();
        handleAlert(messageData.message, 'Email sent', 'success', alertDispatch);

        setForm1({ firstName: '', lastName: '', email: '', phone: '' });
        setForm2({ message: '' });
      }
    } else {
      handleAlert(
        'You must enter a first name, last name, email and message',
        'Message cannot send',
        'error',
        alertDispatch,
      );
    }
  };

  return (
    <ContactPageContainer id={id} darkMode={darkMode} container>
      <TitleContainer item xs={12}>
        <TitleText darkMode={darkMode} variant='h3' component='h2'>
          LET'S CONNECT
        </TitleText>
        <DescriptionText darkMode={darkMode} variant='h6' component='p'>
          Fire up an email, check out my LinkedIn, see this project in Github or send me a message right here!
        </DescriptionText>
      </TitleContainer>
      <ConnectTypeContainer item xs={12} lg={4}>
        <Grid container>
          {connectTypes.map(connect => (
            <Grid key={connect.id} item xs={4} lg={12}>
              <Grid container justifyContent='center'>
                <StyledLink href={connect.href} target={connect.target} darkMode={darkMode}>
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
            <DynamicFormInputs inputs={CONNECT_FORM_INPUTS[0].inputs} form={form1} setForm={setForm1} />
          </Grid>
          <Grid item xs={12} lg={7}>
            <DynamicFormInputs inputs={CONNECT_FORM_INPUTS[1].inputs} form={form2} setForm={setForm2} />
          </Grid>
        </Grid>
        <Grid container justifyContent='space-between'>
          <div>
            <Alert />
          </div>
          <div>
            <Button variant='contained' color='warning' onClick={handleMessageSend}>
              Send
            </Button>
          </div>
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

const ContactPageContainer = styled(Grid)(({ darkMode }) => ({
  backgroundColor: darkMode ? '#030200' : 'whitesmoke',
  paddingTop: '0.5%',
  height: '105vh',
}));

const ConnectTypeContainer = styled(Grid)({
  transform: 'translateY(-10px)',
});

const TitleContainer = styled(Grid)({
  paddingRight: '2%',
  display: 'block',
  textAlign: 'right',
});

const TitleText = styled(Typography)(({ darkMode }) => ({
  fontFamily: 'Shizuru',
  fontWeight: darkMode ? 'normal' : 'bold',
  color: darkMode ? 'beige' : '#759CC9',
  marginBottom: 10,
}));

const DescriptionText = styled(Typography)(({ darkMode }) => ({
  fontFamily: 'Kufam',
  color: darkMode ? 'beige' : '#759CC9',
}));

const StyledLink = styled.a(({ darkMode }) => ({
  svg: {
    width: 110,
    height: 150,
    color: 'beige',
    path: {
      fill: darkMode ? '#36454F' : '#66abc7',
    },
    ':hover': {
      path: {
        fill: darkMode ? '#367993' : '#8fc2d6',
      },
    },
  },
}));

const DirectConnectContainer = styled(Grid)({
  padding: '2% 2% 0 2%',
});

const StyledBitmojiImage = styled.img({
  width: 225,
  height: 240,
  transform: 'translateY(-65px)',
});
