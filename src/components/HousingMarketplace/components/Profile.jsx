import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { history } from '../../../index';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import { Card } from '../../Card/Card';
import { ListingItem } from './ListingItem';
import HouseIcon from '@mui/icons-material/House';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const Profile = () => {
  const token = sessionStorage.getItem('token');
  !token && history.push('/housing-marketplace/auth');

  const email = sessionStorage.getItem('email');
  const firstName = sessionStorage.getItem('firstName');
  const lastName = sessionStorage.getItem('lastName');
  const username = sessionStorage.getItem('username');

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
    <MainContainer>
      <TitleContainer>
        <Typography component='h6' variant='h4'>
          My Profile
        </Typography>
      </TitleContainer>
      <Typography component='h6' variant='h6'>
        Personal Details
      </Typography>
      <PersonalDetailsContainer container>
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
        <Grid container style={{ height: 300, overflowY: 'auto', backgroundColor: '#fcfcfc' }}>
          {listings.map(listing => (
            <ListingItem key={listing._id} listing={listing} />
          ))}
        </Grid>
      </Grid>
    </MainContainer>
  );
};

const MainContainer = styled.div({
  padding: 20,
  marginBottom: 100,
});

const TitleContainer = styled.div({
  padding: '10px 0',
});

const PersonalDetailsContainer = styled(Grid)({
  margin: '30px 0',
});

const SellOrRentContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
});

const SellOrRentLink = styled(Link)({
  textDecoration: 'none',
});
