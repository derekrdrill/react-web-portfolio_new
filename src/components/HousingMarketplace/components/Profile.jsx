import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import { history } from '../../../index';
import { Grid, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HouseIcon from '@mui/icons-material/House';

import { Card } from '../../Card/Card';
import { ListingItem } from './ListingItem';

import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

export const Profile = () => {
  const token = sessionStorage.getItem('token');
  !token && history.push('/housing-marketplace/auth');

  const email = sessionStorage.getItem('email');
  const firstName = sessionStorage.getItem('firstName');
  const lastName = sessionStorage.getItem('lastName');
  const username = sessionStorage.getItem('username');

  const { darkMode } = useContext(DarkLightModeContext);

  const [listings, setListings] = useState([]);

  const getUserListings = async () => {
    const response = await axios
      .get(`../../get-listing-info-by-user/${username}`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .catch(e => console.warn(e));

    if (response.status === 200) {
      const { data } = response;
      const listings = data.listings;
      setListings(listings);
    }
  };

  useEffect(() => {
    getUserListings();
  }, []);

  return (
    <>
      <PageBodyStyle darkMode={darkMode} />
      <MainContainer>
        <TitleContainer>
          <Typography component='h6' variant='h4'>
            My Profile
          </Typography>
        </TitleContainer>
        <Typography component='h6' variant='h6'>
          Personal Details
        </Typography>
        <PersonalDetailsContainer darkMode={darkMode} container>
          <Grid item xs={12} md={6}>
            <Card backgroundColor='gainsboro' hasSpacing={false}>
              <Typography component='h6' variant='subtitle1'>
                {`${firstName} ${lastName}`}
              </Typography>
              <Typography component='h6' variant='subtitle2'>
                {email}
              </Typography>
            </Card>
          </Grid>
        </PersonalDetailsContainer>
        <Grid container>
          <Grid item xs={12} md={3} xl={2}>
            <SellOrRentLink to='./create-listing'>
              <Card backgroundColor='gainsboro' hoverable hoverBackgroundcolor='lightgrey' spacing={false}>
                <SellOrRentContainer>
                  <HouseIcon />
                  <Typography component='span' variant='subtitle1'>
                    Sell or rent your home
                  </Typography>
                  <ArrowForwardIosIcon />
                </SellOrRentContainer>
              </Card>
            </SellOrRentLink>
          </Grid>
        </Grid>
        <Grid container style={{ paddingTop: 30 }}>
          <Grid item xs={12}>
            <Typography component='h6' variant='subtitle1'>
              Your listings
            </Typography>
          </Grid>
          <Grid container style={{ height: 300, overflowY: 'auto' }}>
            {listings.map(listing => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          </Grid>
        </Grid>
      </MainContainer>
    </>
  );
};

const PageBodyStyle = createGlobalStyle(({ darkMode }) => ({
  body: {
    backgroundColor: darkMode && '#292929',
    'h1, h2, h3, h4, h5, h6, p': {
      color: darkMode && 'beige',
    },
  },
}));

const MainContainer = styled.div({
  padding: 20,
  marginBottom: 100,
});

const TitleContainer = styled.div({
  padding: '10px 0',
});

const PersonalDetailsContainer = styled(Grid)(({ darkMode }) => ({
  margin: '30px 0',
  'h1, h2, h3, h4 h5, h6': {
    color: 'black',
  },
}));

const SellOrRentContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
});

const SellOrRentLink = styled(Link)({
  textDecoration: 'none',
});
