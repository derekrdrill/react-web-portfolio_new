import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import { Grid, IconButton, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBath,
  faBed,
  faParking,
  faPaw,
  faPencilAlt,
  faTrash,
} from '@fortawesome/fontawesome-free-solid';

import { BasicModal as Modal } from '../../Modals/BasicModal';

import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';
import { AlertContext } from '../../Alert/context/AlertContext';
import { ListingsContext } from '../context/ListingsContext';

import { handleAlert } from '../../Alert/context/AlertActions';

import { history } from '../../../index';

export const goToListingItemPage = id => {
  history.push(`/housing-marketplace/listing/${id}`);
};

export const deleteListingItem = async (id, alertDispatch, listingsDispatch) => {
  listingsDispatch({
    type: 'SET_IS_DELETING',
    deleteComplete: false,
    isDeleting: true,
  });

  const response = await axios
    .post(
      `${process.env.REACT_APP_BACKEND_URL}/delete-listing`,
      { id: id },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    .catch(e => console.warn(e));

  if (response.status !== 200) {
    console.log('error');

    listingsDispatch({
      type: 'SET_IS_DELETING',
      deleteComplete: true,
      isDeleting: false,
    });
  } else {
    listingsDispatch({
      type: 'SET_IS_DELETING',
      deleteComplete: true,
      isDeleting: false,
    });

    handleAlert(`${response.data} deleted`, 'Success', 'success', alertDispatch);
  }
};

export const toggleIsConfirmingDelete = (isConfirmingDelete, listingsDispatch, name, location) => {
  listingsDispatch({
    type: 'SET_IS_CONFIRMING_DELETE',
    isConfirmingDelete: !isConfirmingDelete,
    modalName: name,
    modalLocation: location,
  });
};

export const ListingItem = ({ listing, profile }) => {
  const token = sessionStorage.getItem('token');
  !token && history.push('./auth');

  const { darkMode } = useContext(DarkLightModeContext);
  const { alertDispatch } = useContext(AlertContext);
  const { isConfirmingDelete, listingsDispatch, modalLocation, modalName } =
    useContext(ListingsContext);

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

  const price = (offer ? discountedPrice : regularPrice)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <>
      <LisitingItemContainer
        darkMode={darkMode}
        item
        xs={12}
        md={6}
        lg={4}
        onClick={
          /* istanbul ignore next */
          () => {
            goToListingItemPage(_id);
          }
        }
      >
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
          {profile && (
            <Grid item xs={1}>
              <IconButton
                onClick={
                  /* istanbul ignore next */
                  e => {
                    e.stopPropagation();
                    toggleIsConfirmingDelete(isConfirmingDelete, listingsDispatch, name, location);
                  }
                }
              >
                <ListingDeleteIcon color={darkMode ? '#d10000' : 'red'} icon={faTrash} size='sm' />
              </IconButton>
              <br />
              <IconButton
                onClick={
                  /* istanbul ignore next */
                  e => {
                    e.stopPropagation();
                    localStorage.setItem('isEditing', 'true');
                    history.push(`/housing-marketplace/update-listing/${_id}`);
                  }
                }
              >
                <ListingEditIcon
                  color={darkMode ? '#a8a8a8' : '#8f8f8f'}
                  darkMode={darkMode}
                  icon={faPencilAlt}
                  size='sm'
                />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </LisitingItemContainer>
      <Modal
        backdropOpacity={0.6}
        buttonVariant={darkMode ? 'contained' : 'outlined'}
        handleClose={
          /* istanbul ignore next */
          () => {
            toggleIsConfirmingDelete(isConfirmingDelete, listingsDispatch, '', '');
          }
        }
        handleSubmit={
          /* istanbul ignore next */
          () => {
            deleteListingItem(_id, alertDispatch, listingsDispatch);
          }
        }
        open={isConfirmingDelete}
      >
        <Grid container>
          <Grid item xs={12}>
            <Typography component='h4' variant='h5' align='center'>
              Confirm the deletion of:
            </Typography>
            <ModalListingName component='h5' variant='h6' align='center'>
              {modalName}
            </ModalListingName>
            <Typography component='p' variant='body1' align='center'>
              {modalLocation}
            </Typography>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

ListingItem.propTypes = {
  listing: PropTypes.object,
  profile: PropTypes.object,
};

const LisitingItemContainer = styled(Grid)(({ darkMode }) => ({
  ':hover': {
    backgroundColor: darkMode ? '#3d3e4c' : '#ebf0f7',
  },
  borderRadius: 5,
  cursor: 'pointer',
  padding: 15,
  minHeight: 150,
  maxHeight: 200,
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

const ListingEditIcon = styled(FontAwesomeIcon)(({ darkMode }) => ({
  ':hover': {
    path: {
      fill: darkMode ? '#808080' : '#4a4a4a',
    },
  },
}));

const ModalListingName = styled(Typography)({
  fontWeight: 'bold',
});
