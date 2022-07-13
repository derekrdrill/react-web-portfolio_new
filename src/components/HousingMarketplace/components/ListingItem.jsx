import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { history } from '../../../index';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faParking, faPaw, faPencilAlt, faTrash } from '@fortawesome/fontawesome-free-solid';

import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

export const ListingItem = ({ listing }) => {
  const token = sessionStorage.getItem('token');
  !token && history.push('./auth');

  const { darkMode } = useContext(DarkLightModeContext);

  const {
    _id,
    bathrooms,
    bedrooms,
    discountedPrice,
    imageUrls,
    location,
    name,
    offer,
    parking,
    pets,
    regularPrice,
    type,
  } = listing;

  const price = (offer ? discountedPrice : regularPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <LisitingItemContainer darkMode={darkMode} item xs={12} md={6} lg={4}>
      <ListItemLink to={`/housing-marketplace/listing/${_id}`}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <ListingImage
              src={
                imageUrls
                  ? imageUrls[0]
                  : 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg'
              }
              alt={name}
            />
          </Grid>
          <Grid item xs={7}>
            <Typography component='h6' variant='subtitle2'>
              {location}
            </Typography>
            <ListingTitle component='h6' variant='subtitle1'>
              {name}
            </ListingTitle>
            <ListingPrice component='h6' variant='subtitle1'>
              ${price}
              {type === 'rent' && ' / month'}
            </ListingPrice>
            <Grid container>
              <ListingStatNumbersContainer item>
                <FontAwesomeIcon icon={faBed} color={darkMode && 'beige'} />
                <ListingStatNumbers darkMode={darkMode} component='span' variant='subtitle2'>
                  {bedrooms}
                </ListingStatNumbers>
              </ListingStatNumbersContainer>
              <ListingStatNumbersContainer item>
                <FontAwesomeIcon icon={faBath} color={darkMode && 'beige'} />
                <ListingStatNumbers darkMode={darkMode} component='span' variant='subtitle2'>
                  {bathrooms}
                </ListingStatNumbers>
              </ListingStatNumbersContainer>
              <ListingStatNumbersContainer item>
                {parking && <FontAwesomeIcon icon={faParking} color={darkMode && 'beige'} />}
              </ListingStatNumbersContainer>
              <ListingStatNumbersContainer item>
                {pets && <FontAwesomeIcon icon={faPaw} color={darkMode && 'beige'} />}
              </ListingStatNumbersContainer>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <ListingDeleteIcon color='red' icon={faTrash} onClick={() => console.log('hey')} />
            <br />
            <ListingEditIcon color='#8f8f8f' icon={faPencilAlt} onClick={() => console.log('hey')} />
          </Grid>
        </Grid>
      </ListItemLink>
    </LisitingItemContainer>
  );
};

const ListItemLink = styled(Link)({
  ':hover': {
    color: '#404040',
  },
  textDecoration: 'none',
  color: '#404040',
});

const LisitingItemContainer = styled(Grid)(({ darkMode }) => ({
  ':hover': {
    backgroundColor: darkMode ? '#3d3e4c' : '#ebf0f7',
  },
  borderRadius: 5,
  cursor: 'pointer',
  padding: 15,
}));

const ListingTitle = styled(Typography)({
  fontWeight: 'bold',
});

const ListingImage = styled.img({
  borderRadius: 15,
  maxHeight: '95%',
  maxWidth: '95%',
});

const ListingPrice = styled(Typography)({
  color: '#04de39',
  fontWeight: 'bold',
});

const ListingStatNumbers = styled(Typography)(({ darkMode }) => ({
  marginLeft: 4,
  color: darkMode && 'beige',
}));

const ListingStatNumbersContainer = styled(Grid)({
  margin: '0 5px',
});

const ListingDeleteIcon = styled(FontAwesomeIcon)({
  ':hover': {
    path: {
      fill: '#ad0031',
    },
  },
});

const ListingEditIcon = styled(FontAwesomeIcon)({
  ':hover': {
    path: {
      fill: '#4a4a4a',
    },
  },
});
