import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { history } from '../../../index';
import GoogleMapReact from 'google-map-react';
import Slider from 'react-slick';
import { BasicModal } from '../../Modals/BasicModal';
import { DynamicFormInputs } from '../../DynamicFormInputs/DynamicFormInputs';
import { Button, Chip, Icon, Grid, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/fontawesome-free-regular';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const ListingInfo = () => {
  const pathName = history.location.pathname;
  const listingID = pathName.slice(pathName.indexOf('listing/') + 8, pathName.length);
  const [listingInfo, setListingInfo] = useState({});
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState('');

  const discountedPrice = listingInfo.discountedPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? '';
  const discount =
    (listingInfo.regularPrice - listingInfo.discountedPrice)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? 0;

  const toggleContactModalOpen = () => setContactModalOpen(!contactModalOpen);

  const getListingInfo = async () => {
    const response =
      listingInfo &&
      (await axios
        .get(`../../get-listing-info/${listingID}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .catch(e => console.warn(e)));

    if (response.status === 200) {
      const listingData = response.data.listingInfo[0];

      setListingInfo(listingData);
    }
  };

  const getContactInfo = async () => {
    const response = await axios
      .get(`../../get-contact-info/${listingInfo.userID}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .catch(e => console.warn(e));

    if (response.status === 200) {
      setContactInfo(response.data.userData);
    }
  };

  useEffect(() => {
    getListingInfo();
  }, []);

  useEffect(() => {
    if (listingInfo.userID) {
      getContactInfo();
    }
  }, [listingInfo]);

  return (
    <>
      {listingInfo.imageUrls && (
        <ImagesContainer container>
          <Grid
            item
            xs={12}
            md={listingInfo.imageUrls.length > 1 ? 12 : 6}
            lg={listingInfo.imageUrls.length > 3 ? 12 : listingInfo.imageUrls.length > 1 ? 9 : 5}
            xl={
              listingInfo.imageUrls.length > 3
                ? 12
                : listingInfo.imageUrls.length > 2
                ? 9
                : listingInfo.imageUrls.length > 1
                ? 6
                : 3
            }
          >
            <ListingImagesSlider
              arrows={false}
              autoplay
              autoplaySpeed={2500}
              dots
              infinite
              pauseOnHover
              responsive={[
                {
                  breakpoint: 1575,
                  settings: {
                    slidesToShow: listingInfo.imageUrls.length < 3 ? listingInfo.imageUrls.length : 3,
                  },
                },
                {
                  breakpoint: 1100,
                  settings: {
                    centerMode: listingInfo.imageUrls.length > 2 ? true : false,
                    centerPadding: 100,
                    slidesToShow: listingInfo.imageUrls.length < 2 ? listingInfo.imageUrls.length : 2,
                  },
                },
                {
                  breakpoint: 945,
                  settings: {
                    slidesToShow: listingInfo.imageUrls.length < 2 ? listingInfo.imageUrls.length : 2,
                  },
                },
                {
                  breakpoint: 600,
                  settings: {
                    fade: true,
                    slidesToShow: 1,
                    speed: 1000,
                  },
                },
              ]}
              speed={500}
              slidesToShow={listingInfo.imageUrls.length < 4 ? listingInfo.imageUrls.length : 4}
              slidesToScroll={1}
            >
              {listingInfo.imageUrls.map((imageUrl, key) => (
                <ListingImage key={key} src={imageUrl} />
              ))}
            </ListingImagesSlider>
          </Grid>
        </ImagesContainer>
      )}
      <MainContainer>
        <BasicModal handleClose={toggleContactModalOpen} open={contactModalOpen}>
          <Grid container>
            <Grid item xs={12}>
              <Typography component='h4' variant='h5'>
                Contact {`${contactInfo.firstName} ${contactInfo.lastName}`}
                <DynamicFormInputs
                  inputs={[
                    {
                      id: 'contactMessage',
                      label: 'Message',
                      variant: 'outlined',
                      xs: 12,
                      fullWidth: true,
                      multiline: true,
                      minRows: 3,
                    },
                  ]}
                />
              </Typography>
            </Grid>
          </Grid>
        </BasicModal>
        <TitleContainer>
          <Typography component='h3' variant='h4'>
            {listingInfo.name} - ${discountedPrice}
          </Typography>
        </TitleContainer>
        <Typography component='p' variant='h6'>
          {listingInfo.location}
        </Typography>
        <ChipContainer>
          <LisitingTypeChip label={`For ${listingInfo.type}`} />
          <LisitingDiscountChip label={`$${discount} discount`} />
        </ChipContainer>
        <DetailsContainer>
          <Typography variant='body1' component='p'>
            {listingInfo.bedrooms} {`Bedroom${listingInfo.bedrooms > 1 ? 's' : ''}`}
          </Typography>
          <Typography variant='body1' component='p'>
            {listingInfo.bathrooms} {`Bathroom${listingInfo.bathrooms > 1 ? 's' : ''}`}
          </Typography>
          <Typography variant='body1' component='p'>
            Parking
            <ListingDetailsIcon icon={listingInfo.parking ? faThumbsUp : faThumbsDown} />
          </Typography>
          <Typography variant='body1' component='p'>
            Pets
            <ListingDetailsIcon icon={listingInfo.pets ? faThumbsUp : faThumbsDown} />
          </Typography>
          <Typography variant='body1' component='p'>
            Furnished
            <ListingDetailsIcon icon={listingInfo.furnished ? faThumbsUp : faThumbsDown} />
          </Typography>
        </DetailsContainer>
        <Typography component='h5' variant='h5'>
          Location
        </Typography>
        {listingInfo.longitude && listingInfo.latitude && (
          <MapContainer>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_MAPS_TOKEN,
                language: 'en',
              }}
              defaultCenter={{ lat: listingInfo.latitude, lng: listingInfo.longitude }}
              center={{ lat: listingInfo.latitude, lng: listingInfo.longitude }}
              defaultZoom={13}
              options={{ minZoom: 9, styles: [{ stylers: [{ saturation: 50 }, { gamma: 0.5 }] }] }}
            >
              <MapLocationIcon color='primary' lat={listingInfo.latitude} lng={listingInfo.longitude}>
                <LocationOnIcon />
              </MapLocationIcon>
            </GoogleMapReact>
          </MapContainer>
        )}
        <Button onClick={toggleContactModalOpen} variant='outlined'>
          Contact {listingInfo.type === 'rent' ? 'Landlord' : 'Seller'}
        </Button>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div({
  padding: 20,
  marginBottom: 100,
});

const ImagesContainer = styled(Grid)({
  marginBottom: 20,
});

const ListingImagesSlider = styled(Slider)({
  ':active': {
    cursor: 'grabbing',
  },
  cursor: 'grab',
});

const ListingImage = styled.img({
  height: 210,
});

const TitleContainer = styled.div({
  padding: '10px 0',
});

const ChipContainer = styled.div({
  display: 'flex',
  columnGap: 10,
});

const DetailsContainer = styled.div({
  margin: '15px 0',
});

const MapContainer = styled.div({
  height: 350,
  margin: '10px 0',
});

const ListingDetailsIcon = styled(FontAwesomeIcon)({
  padding: '0 5px',
});

const MapLocationIcon = styled(Icon)({
  '&.MuiIcon-root': {
    height: 35,
  },
  '.MuiSvgIcon-root': {
    transform: 'scale(1.8)',
  },
});

const LisitingTypeChip = styled(Chip)({
  '&.MuiChip-root': {
    backgroundColor: '#26e583',
    color: 'beige',
  },
});

const LisitingDiscountChip = styled(Chip)({
  '&.MuiChip-root': {
    backgroundColor: '#4d3536',
    color: 'beige',
  },
});
