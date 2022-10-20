import React, { useContext, useEffect, useState } from 'react';
import $ from 'jquery';
import axios from 'axios';
import { history } from '../../../index';
import styled, { createGlobalStyle } from 'styled-components';
import { Button, ButtonGroup, Grid, IconButton, InputLabel, TextField, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/fontawesome-free-solid';

import { AlertComponent as Alert } from '../../Alert/components/AlertComponent';
import { DynamicList } from '../../DynamicList/DynamicList';
import { LoaderSpinner } from '../../LoaderSpinner/LoaderSpinner';

import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';
import { AlertContext } from '../../Alert/context/AlertContext';
import { handleAlert } from '../../Alert/context/AlertActions';

const formDataDefaults = {
  bathrooms: 1,
  bedrooms: 1,
  discountedPrice: 0,
  furnished: false,
  images: [],
  imageUrls: [],
  latitude: 0,
  longitude: 0,
  location: '',
  name: '',
  offer: false,
  parking: true,
  pets: false,
  regularPrice: 0,
  type: 'rent',
};

export const CreateListing = () => {
  const username = sessionStorage.getItem('username');
  const isEditing = localStorage.getItem('isEditing');

  const pathName = history.location.pathname;
  const listingID = pathName.substring(pathName.indexOf('update-listing/') + 15, pathName.length);

  const { darkMode } = useContext(DarkLightModeContext);
  const { alertDispatch } = useContext(AlertContext);

  const [loading, setLoading] = useState(false);
  const [geoLocationEnabled] = useState(true);
  const [formData, setFormData] = useState(formDataDefaults);

  const {
    bathrooms,
    bedrooms,
    discountedPrice,
    furnished,
    images,
    imageUrls,
    location,
    name,
    offer,
    parking,
    pets,
    regularPrice,
    type,
  } = formData;

  const handleFormInputChange = (e, item) => {
    const value = e.currentTarget.value;
    setFormData({ ...formData, [item]: value });
  };

  const handleGeoLocation = async () => {
    if (geoLocationEnabled && location) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.REACT_APP_GOOGLE_GEOCODE_TOKEN}`,
      ).catch(e => console.warn(e));

      const { results } = await response.json();

      setFormData({
        ...formData,
        longitude: results[0].geometry.location.lng,
        latitude: results[0].geometry.location.lat,
      });
    }
  };

  const handleButtonGroupChange = (item, value) => {
    setFormData({ ...formData, [item]: value });
  };

  const handleImageUpload = e => {
    if (e.target.files) {
      const imageFile = e.target.files[0];
      setFormData({ ...formData, images: [...images, imageFile] });
    }
  };

  const handleCreateListing = async () => {
    setLoading(true);
    const imageData = new FormData();
    Object.values(formData.images).forEach(image => {
      imageData.append('uploadImages', image);
    });

    const uploadImagesResponse = await axios
      .post('../../upload-images', imageData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .catch(e => console.warn(e));

    const { data } = uploadImagesResponse;

    if (data.uploadSuccess) {
      const insertFormDataResponse = await axios
        .post(
          `../../create-listing`,
          { formData, username: username, images: data.filePaths },
          {
            headers: { 'Content-Type': 'application/json' },
          },
        )
        .catch(e => console.warn(e));

      if (insertFormDataResponse.status !== 200) {
        console.log('error');
      }

      $('input[type=file]').val('');
      setLoading(false);
      setFormData(formDataDefaults);
      handleAlert('New listing added', 'Success', 'success', alertDispatch);
    }
  };

  const handleUpdateListing = async () => {
    setLoading(true);

    const imageData = new FormData();
    Object.values(formData.images).forEach(image => {
      imageData.append('uploadImages', image);
    });

    const uploadImagesResponse = await axios
      .post('../../upload-images', imageData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .catch(e => console.warn(e));

    const { data } = uploadImagesResponse;

    if (data.uploadSuccess) {
      const response = await axios
        .post(
          `../../update-listing`,
          {
            formData,
            images: data.filePaths,
          },
          {
            headers: { 'Content-Type': 'application/json' },
          },
        )
        .catch(e => console.warn(e));

      if (response.status !== 200) {
        console.log('error');
      } else {
        setFormData({ ...formData, imageUrls: [...imageUrls, ...data.filePaths], images: [] });
        handleAlert(response.data.message, 'Success', 'success', alertDispatch);
        $('input[type=file]').val('');
      }

      setLoading(false);
    }
  };

  const removeCurrentImage = e => {
    let imageUrlsArray = imageUrls;
    let index = imageUrlsArray.indexOf(e.currentTarget.id);

    if (index !== -1) {
      imageUrlsArray.splice(index, 1);
    }

    setFormData({ ...formData, imageUrls: imageUrlsArray });
  };

  const loadListing = React.useCallback(async () => {
    setLoading(true);

    const response = await axios
      .get(`../../get-listing-info/${listingID}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .catch(e => console.warn(e));

    if (response.status === 200) {
      const listingData = response.data.listingInfo[0];

      setFormData({ ...formData, ...listingData });
      setLoading(false);
    }
  }, [formData, listingID]);

  useEffect(() => {
    if (isEditing === 'true') {
      loadListing();
    }
  }, [isEditing, loadListing]);

  return (
    <>
      <PageBodyStyle darkMode={darkMode} />
      <MainContainer>
        {loading && <LoaderSpinner open={true} />}
        <TitleContainer>
          <Typography component='h6' variant='h4'>
            {`${isEditing === 'true' ? 'Update' : 'Create'} a listing`}
          </Typography>
        </TitleContainer>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label='Listing Name'
              value={name}
              onChange={e => {
                handleFormInputChange(e, 'name');
              }}
              size='small'
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label='Listing Address'
              multiline
              maxRows={3}
              value={location}
              onBlur={e => {
                handleGeoLocation(e);
              }}
              onChange={e => {
                handleFormInputChange(e, 'location');
              }}
            />
          </Grid>
          <Grid item xs={4} md={1}>
            <TextField
              fullWidth
              label='Bedrooms'
              value={bedrooms}
              onChange={e => {
                handleFormInputChange(e, 'bedrooms');
              }}
              size='small'
              type='number'
            />
          </Grid>
          <Grid item xs={4} md={1}>
            <TextField
              fullWidth
              label='Bathrooms'
              value={bathrooms}
              onChange={e => {
                handleFormInputChange(e, 'bathrooms');
              }}
              size='small'
              type='number'
            />
          </Grid>
          <ButtonGroupGridItem item xs={7} sm={6} md={2} xl={1}>
            <InputLabel shrink>Rent or Sell</InputLabel>
            <ButtonGroup fullWidth>
              <SelectorButton
                darkMode={darkMode}
                size='small'
                selected={type === 'rent'}
                onClick={
                  /* istanbul ignore next */
                  () => handleButtonGroupChange('type', 'rent')
                }
              >
                Rent
              </SelectorButton>
              <SelectorButton
                darkMode={darkMode}
                size='small'
                selected={type === 'sell'}
                onClick={
                  /* istanbul ignore next */
                  () => handleButtonGroupChange('type', 'sell')
                }
              >
                Sell
              </SelectorButton>
            </ButtonGroup>
          </ButtonGroupGridItem>
          <ButtonGroupGridItem item xs={7} sm={6} md={2} xl={1}>
            <InputLabel shrink>Parking Spot</InputLabel>
            <ButtonGroup fullWidth>
              <SelectorButton
                darkMode={darkMode}
                size='small'
                selected={parking}
                onClick={
                  /* istanbul ignore next */
                  () => handleButtonGroupChange('parking', true)
                }
              >
                Yes
              </SelectorButton>
              <SelectorButton
                darkMode={darkMode}
                size='small'
                selected={!parking}
                onClick={
                  /* istanbul ignore next */
                  () => handleButtonGroupChange('parking', false)
                }
              >
                No
              </SelectorButton>
            </ButtonGroup>
          </ButtonGroupGridItem>
          <ButtonGroupGridItem item xs={7} sm={6} md={2} xl={1}>
            <InputLabel shrink>Furnished</InputLabel>
            <ButtonGroup fullWidth>
              <SelectorButton
                darkMode={darkMode}
                size='small'
                selected={furnished}
                onClick={
                  /* istanbul ignore next */
                  () => handleButtonGroupChange('furnished', true)
                }
              >
                Yes
              </SelectorButton>
              <SelectorButton
                darkMode={darkMode}
                size='small'
                selected={!furnished}
                onClick={
                  /* istanbul ignore next */
                  () => handleButtonGroupChange('furnished', false)
                }
              >
                No
              </SelectorButton>
            </ButtonGroup>
          </ButtonGroupGridItem>
          {type === 'rent' && (
            <ButtonGroupGridItem item xs={7} sm={6} md={2} xl={1}>
              <InputLabel shrink>Pets Allowed</InputLabel>
              <ButtonGroup fullWidth>
                <SelectorButton
                  darkMode={darkMode}
                  size='small'
                  selected={pets}
                  onClick={
                    /* istanbul ignore next */
                    () => handleButtonGroupChange('pets', true)
                  }
                >
                  Yes
                </SelectorButton>
                <SelectorButton
                  darkMode={darkMode}
                  size='small'
                  selected={!pets}
                  onClick={
                    /* istanbul ignore next */
                    () => handleButtonGroupChange('pets', false)
                  }
                >
                  No
                </SelectorButton>
              </ButtonGroup>
            </ButtonGroupGridItem>
          )}
          {type === 'sell' && (
            <ButtonGroupGridItem item xs={7} sm={6} md={2} xl={1}>
              <InputLabel shrink>Offer</InputLabel>
              <ButtonGroup fullWidth>
                <SelectorButton
                  darkMode={darkMode}
                  size='small'
                  selected={offer}
                  onClick={
                    /* istanbul ignore next */
                    () => handleButtonGroupChange('offer', true)
                  }
                >
                  Yes
                </SelectorButton>
                <SelectorButton
                  darkMode={darkMode}
                  size='small'
                  selected={!offer}
                  onClick={
                    /* istanbul ignore next */
                    () => handleButtonGroupChange('offer', false)
                  }
                >
                  No
                </SelectorButton>
              </ButtonGroup>
            </ButtonGroupGridItem>
          )}
          <Grid item xs={12} sm={8} md={5} lg={6}>
            <TextField
              fullWidth
              label='Regular Price'
              value={regularPrice}
              onChange={e => {
                handleFormInputChange(e, 'regularPrice');
              }}
              size='small'
            />
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6}>
            <TextField
              fullWidth
              label='Discounted Price'
              value={discountedPrice}
              onChange={e => {
                handleFormInputChange(e, 'discountedPrice');
              }}
              size='small'
            />
          </Grid>
          <Grid item xs={12}>
            <ListingImagesContainer
              container
              justifyContent={{ xs: 'flex-start', md: 'space-between' }}
              spacing={2}
            >
              <Grid item xs={12} sm={6}>
                <InputLabel>{`Upload${isEditing === 'true' ? ' new ' : ' '}images`}</InputLabel>
                <InputLabel shrink>First image will be the cover (max of 5)</InputLabel>
                <ImagesContainer container darkMode={darkMode}>
                  <Grid item xs={6} xl={4}>
                    <DynamicList
                      addColor='forestgreen'
                      removeColor='maroon'
                      maxRows={5}
                      maxHeight={225}
                    >
                      <FileUploadField
                        disabled={!name || !location || !regularPrice || !discountedPrice}
                        inputProps={{ accept: '.jpg, .png, .jpeg' }}
                        onChange={handleImageUpload}
                        size='small'
                        type='file'
                        variant='filled'
                      />
                    </DynamicList>
                  </Grid>
                </ImagesContainer>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                {isEditing === 'true' && (
                  <>
                    <InputLabel>Current images</InputLabel>
                    <InputLabel shrink>You can delete existing images from here</InputLabel>
                    <ImagesContainer container darkMode={darkMode} justifyContent='flex-start'>
                      {imageUrls.length > 0 &&
                        imageUrls.map((img, imgCount) => (
                          <CurrentImageContainer key={imgCount}>
                            <CurrentImage src={img} />
                            <DeleteCurrentImageIcon
                              id={img}
                              onClick={
                                /* istanbul ignore next */
                                e => {
                                  removeCurrentImage(e);
                                }
                              }
                              size='small'
                            >
                              <FontAwesomeIcon icon={faTrash} color='red' />
                            </DeleteCurrentImageIcon>
                          </CurrentImageContainer>
                        ))}
                    </ImagesContainer>
                  </>
                )}
              </Grid>
            </ListingImagesContainer>
          </Grid>
        </Grid>
        <CreateListingButtonMainContainer container spacing={2}>
          <Grid item order={{ md: isEditing === 'true' ? 2 : 1, xl: 1 }} xs={12} md={6}>
            <Grid container>
              <Grid item xs={12} xl={6}>
                <CreateListingButton
                  color='info'
                  darkMode={darkMode}
                  disabled={!name || !location || !regularPrice || !discountedPrice}
                  fullWidth
                  onClick={isEditing === 'true' ? handleUpdateListing : handleCreateListing}
                  variant={'contained'}
                >
                  {`${isEditing === 'true' ? 'Update' : 'Create'} Listing`}
                </CreateListingButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item order={{ md: isEditing === 'true' ? 1 : 2, xl: 2 }} xs={12} md={6} xl={12}>
            <Grid container justifyContent={isEditing === 'true' ? 'flex-start' : 'flex-end'}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <Alert />
              </Grid>
            </Grid>
          </Grid>
        </CreateListingButtonMainContainer>
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
    '.MuiInputBase-root': {
      backgroundColor: darkMode && '#474747',
      color: darkMode && '#CCCCCC',
    },
    '.MuiInputLabel-root': {
      color: darkMode && 'white',
    },
  },
}));

export const CreateListingButtonMainContainer = styled(Grid)({ marginTop: 2 });

const MainContainer = styled.div({
  padding: '20px 20px 100px 20px',
});

const TitleContainer = styled.div({
  padding: '10px 0',
});

const ButtonGroupGridItem = styled(Grid)({
  marginTop: -12,
});

const SelectorButton = styled(Button)(({ darkMode, selected }) => [
  {
    ':hover': {
      backgroundColor: darkMode && 'lightgrey',
      color: darkMode && 'beige',
    },
    backgroundColor: darkMode && 'grey',
    color: darkMode && 'beige',
  },
  selected && {
    ':hover': {
      backgroundColor: darkMode ? '#1632a2' : '#002feb',
      color: 'white',
    },
    backgroundColor: darkMode ? '#1632a2' : '#002feb',
    color: 'white',
  },
]);

const ListingImagesContainer = styled(Grid)({
  height: 260,
});

const FileUploadField = styled(TextField)(({ disabled }) => [
  disabled && {
    pointerEvents: 'none',
  },
  {
    '.MuiInputBase-input': {
      cursor: 'pointer',
    },
  },
]);

const CreateListingButton = styled(Button)(({ darkMode }) => ({
  '&.Mui-disabled': {
    backgroundColor: darkMode && '#6b9ab3',
  },
  margin: '10px 0',
}));

const ImagesContainer = styled(Grid)(({ darkMode }) => ({
  backgroundColor: darkMode ? '#303030' : '#fafafa',
  borderRadius: 5,
  maxHeight: 200,
  overflowY: 'auto',
  padding: 10,
}));

const CurrentImageContainer = styled.div({
  ':hover': {
    '.MuiIconButton-root': { display: 'block' },
    img: { opacity: 0.7 },
  },
  position: 'relative',
});

const CurrentImage = styled.img({
  ':hover': { svg: { display: 'block' } },
  height: 105,
  width: 145,
  borderRadius: 10,
  padding: 4,
});

const DeleteCurrentImageIcon = styled(IconButton)({
  ':hover': {
    svg: { color: '#7f0606' },
  },
  display: 'none',
  position: 'absolute',
  right: 5,
  top: 5,
});
