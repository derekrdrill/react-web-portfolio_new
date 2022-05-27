import React, { useContext, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button, ButtonGroup, Grid, InputLabel, TextField, Typography } from '@mui/material';
import { AlertContext } from '../../Alert/context/AlertContext';
import { AlertComponent as Alert } from '../../Alert/components/AlertComponent';
import { handleAlert } from '../../Alert/context/AlertActions';
import { DynamicList } from '../../DynamicList/DynamicList';
import { LoaderSpinner } from '../../LoaderSpinner/LoaderSpinner';

const formDataDefaults = {
  bathrooms: 1,
  bedrooms: 1,
  discountedPrice: 0,
  furnished: false,
  images: [],
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
  const { alertDispatch } = useContext(AlertContext);
  const username = sessionStorage.getItem('username');
  const [loading, setLoading] = useState(false);
  const [geoLocationEnabled, setGeoLocationEnabled] = useState(true);

  const [formData, setFormData] = useState(formDataDefaults);

  const {
    bathrooms,
    bedrooms,
    discountedPrice,
    furnished,
    images,
    latitude,
    longitude,
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

      setLoading(false);
      setFormData(formDataDefaults);
      handleAlert('New listing added', 'Success', 'success', alertDispatch);
    }
  };

  return (
    <MainContainer>
      {loading && <LoaderSpinner open={true} />}
      <AlertContainer>
        <Alert />
      </AlertContainer>
      <TitleContainer>
        <Typography component='h6' variant='h4'>
          Create a Listing
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
        <Grid item xs={7} sm={6} md={2} xl={1} style={{ marginTop: '-10px' }}>
          <InputLabel shrink>Rent or Sell</InputLabel>
          <ButtonGroup fullWidth>
            <SelectorButton
              size='small'
              selected={type === 'rent'}
              onClick={() => handleButtonGroupChange('type', 'rent')}
            >
              Rent
            </SelectorButton>
            <SelectorButton
              size='small'
              selected={type === 'sell'}
              onClick={() => handleButtonGroupChange('type', 'sale')}
            >
              Sell
            </SelectorButton>
          </ButtonGroup>
        </Grid>
        <Grid item xs={7} sm={6} md={2} xl={1} style={{ marginTop: '-10px' }}>
          <InputLabel shrink>Parking Spot</InputLabel>
          <ButtonGroup fullWidth>
            <SelectorButton size='small' selected={parking} onClick={() => handleButtonGroupChange('parking', true)}>
              Yes
            </SelectorButton>
            <SelectorButton size='small' selected={!parking} onClick={() => handleButtonGroupChange('parking', false)}>
              No
            </SelectorButton>
          </ButtonGroup>
        </Grid>
        <Grid item xs={7} sm={6} md={2} xl={1} style={{ marginTop: '-10px' }}>
          <InputLabel shrink>Furnished</InputLabel>
          <ButtonGroup fullWidth>
            <SelectorButton
              size='small'
              selected={furnished}
              onClick={() => handleButtonGroupChange('furnished', true)}
            >
              Yes
            </SelectorButton>
            <SelectorButton
              size='small'
              selected={!furnished}
              onClick={() => handleButtonGroupChange('furnished', false)}
            >
              No
            </SelectorButton>
          </ButtonGroup>
        </Grid>
        {type === 'rent' && (
          <Grid item xs={7} sm={6} md={2} xl={1} style={{ marginTop: '-10px' }}>
            <InputLabel shrink>Pets Allowed</InputLabel>
            <ButtonGroup fullWidth>
              <SelectorButton size='small' selected={pets} onClick={() => handleButtonGroupChange('pets', true)}>
                Yes
              </SelectorButton>
              <SelectorButton size='small' selected={!pets} onClick={() => handleButtonGroupChange('pets', false)}>
                No
              </SelectorButton>
            </ButtonGroup>
          </Grid>
        )}
        <Grid item xs={7} sm={6} md={2} xl={1} style={{ marginTop: '-10px' }}>
          <InputLabel shrink>Offer</InputLabel>
          <ButtonGroup fullWidth>
            <SelectorButton size='small' selected={offer} onClick={() => handleButtonGroupChange('offer', true)}>
              Yes
            </SelectorButton>
            <SelectorButton size='small' selected={!offer} onClick={() => handleButtonGroupChange('offer', false)}>
              No
            </SelectorButton>
          </ButtonGroup>
        </Grid>
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
          <Grid container>
            <Grid item xs={12} sm={6} md={3}>
              <InputLabel>Upload images</InputLabel>
              <InputLabel shrink>First image will be the cover (max of 5)</InputLabel>
              <DynamicList
                addColor='forestgreen'
                removeColor='maroon'
                children={
                  <FileUploadField
                    disabled={!name || !location || !regularPrice || !discountedPrice}
                    inputProps={{ accept: '.jpg, .png, .jpeg' }}
                    onChange={handleImageUpload}
                    size='small'
                    type='file'
                    variant='filled'
                  />
                }
                maxRows={5}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={5} xl={3}>
          <Button
            color='info'
            disabled={!name || !location || !regularPrice || !discountedPrice}
            fullWidth
            onClick={handleCreateListing}
            variant='contained'
          >
            Create Listing
          </Button>
        </Grid>
      </Grid>
    </MainContainer>
  );
};

const MainContainer = styled.div({
  padding: '20px 20px 100px 20px',
});

const TitleContainer = styled.div({
  padding: '10px 0',
});

const AlertContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
});

const SelectorButton = styled(Button)(({ selected }) => [
  selected && {
    ':hover': {
      backgroundColor: 'navy',
      color: 'white',
    },
    backgroundColor: 'navy',
    color: 'white',
  },
]);

const FileUploadField = styled(TextField)(({ disabled }) => [
  disabled && {
    pointerEvents: 'none',
  },
]);
