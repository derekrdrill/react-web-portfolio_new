import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed } from '@fortawesome/fontawesome-free-solid';

export const ListingItem = ({ listing }) => {
  const { bathrooms, bedrooms, discountedPrice, imageUrls, location, name, offer, regularPrice, type } = listing;

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <ListingImage src={imageUrls[0]} alt={name} />
        </Grid>
        <Grid item xs={8}>
          <Typography component='h6' variant='subtitle2'>
            {location}
          </Typography>
          <ListingTitle component='h6' variant='subtitle1'>
            {name}
          </ListingTitle>
          <ListingPrice component='h6' variant='subtitle1'>
            ${offer ? discountedPrice : regularPrice}
            {type === 'rent' && ' / month'}
          </ListingPrice>
          <Grid container>
            <ListingStatNumbersContainer item>
              <FontAwesomeIcon icon={faBed} />
              <ListingStatNumbers component='span' variant='subtitle2'>
                {bedrooms}
              </ListingStatNumbers>
            </ListingStatNumbersContainer>
            <ListingStatNumbersContainer item>
              <FontAwesomeIcon icon={faBath} />
              <ListingStatNumbers component='span' variant='subtitle2'>
                {bathrooms}
              </ListingStatNumbers>
            </ListingStatNumbersContainer>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const ListingTitle = styled(Typography)({
  fontWeight: 'bold',
});

const ListingImage = styled.img({
  borderRadius: 15,
  height: '100%',
  width: '100%',
});

const ListingPrice = styled(Typography)({
  color: '#04de39',
  fontWeight: 'bold',
});

const ListingStatNumbers = styled(Typography)({
  marginLeft: 4,
});

const ListingStatNumbersContainer = styled(Grid)({
  margin: '0 5px',
});
