import React, { useContext, useEffect, useState } from 'react';
import { history } from '../../../index';
import styled, { createGlobalStyle } from 'styled-components';
import { Grid, Typography } from '@mui/material';

import { ListingItem } from './ListingItem';
import { LoaderSpinner } from '../../LoaderSpinner/LoaderSpinner';

import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

const Category = () => {
  const pathName = history.location.pathname;
  const listingType = pathName.slice(-4, pathName.length);

  const { darkMode } = useContext(DarkLightModeContext);

  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchListings = React.useCallback(async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/get-listings/${listingType}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    ).catch(e => console.warn(e));

    if (response.ok) {
      const { listings } = await response.json();
      setListings(listings);
    }
  }, [listingType]);

  useEffect(
    /* istanbul ignore next */
    () => {
      fetchListings();
      setLoading(false);
    },
    [fetchListings],
  );

  return (
    <>
      <PageBodyStyle darkMode={darkMode} />
      <MainContainer>
        <TitleContainer>
          <Typography component='h6' variant='h4'>
            Listings for {listingType === 'sell' ? 'sale' : listingType}
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
    </>
  );
};

export default Category;

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
});

const TitleContainer = styled.div({
  padding: '10px 0',
});
