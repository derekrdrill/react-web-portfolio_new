import React, { useEffect, useState } from 'react';
import { history } from '../../../index';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import { ListingItem } from './ListingItem';
import { LoaderSpinner } from '../../LoaderSpinner/LoaderSpinner';

export const Offer = () => {
  const token = sessionStorage.getItem('token');
  !token && history.push('./auth');

  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    const response = await fetch(`../../get-listings-with-offers`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).catch(e => console.warn(e));

    if (response.ok) {
      const { listings } = await response.json();
      setListings(listings);
    }
  };

  useEffect(() => {
    fetchListings();
    setLoading(false);
  }, []);

  return (
    <MainContainer>
      <TitleContainer>
        <Typography component='h6' variant='h4'>
          Offers
        </Typography>
      </TitleContainer>
      {loading ? (
        <LoaderSpinner open />
      ) : listings && listings.length > 0 ? (
        <Grid container spacing={3}>
          {listings.map(listing => (
            <ListingItem key={listing._id} listing={listing} />
          ))}
        </Grid>
      ) : (
        <Typography paragraph>There are no current offers</Typography>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div({
  padding: 20,
});

const TitleContainer = styled.div({
  padding: '10px 0',
});
