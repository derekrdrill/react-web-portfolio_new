import React, { useEffect, useState } from 'react';
import { history } from '../../../index';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import { ListingItem } from './ListingItem';
import { LoaderSpinner } from '../../LoaderSpinner/LoaderSpinner';

export const Category = () => {
  const pathName = history.location.pathname;
  const listingType = pathName.slice(-4, pathName.length);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    const response = await fetch(`../../get-listings/${listingType}`, {
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
          Listings for {listingType}
        </Typography>
      </TitleContainer>
      {loading ? (
        <LoaderSpinner open />
      ) : listings && listings.length > 0 ? (
        <Grid container>
          {listings.map(listing => (
            <ListingItem key={listing._id} listing={listing} />
          ))}
        </Grid>
      ) : (
        <Typography paragraph>No listings for {listingType}</Typography>
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
