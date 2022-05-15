import React from 'react';
import { history } from '../../../index';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import { Card } from '../../Card/Card';

export const Profile = () => {
  const token = sessionStorage.getItem('token');
  !token && history.push('/housing-marketplace/auth');

  const email = sessionStorage.getItem('email');
  const firstName = sessionStorage.getItem('firstName');
  const lastName = sessionStorage.getItem('lastName');

  return (
    <MainContainer>
      <TitleContainer>
        <Typography component='h6' variant='h4'>
          My Profile
        </Typography>
      </TitleContainer>
      <Typography component='h6' variant='h6'>
        Personal Details
      </Typography>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Card backgroundColor='gainsboro' spacing={false}>
            <Typography component='h6' variant='subtitle1'>
              {`${firstName} ${lastName}`}
            </Typography>
            <Typography component='h6' variant='subtitle2'>
              {email}
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </MainContainer>
  );
};

const MainContainer = styled.div({
  padding: 20,
});

const TitleContainer = styled.div({
  padding: '10px 0',
});

