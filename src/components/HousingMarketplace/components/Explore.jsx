import React from 'react';
import { history } from '../../../index';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import rentCategoryImg from '../../../assets/rentCategoryImage.jpeg';
import sellCategoryImg from '../../../assets/sellCategoryImage.jpeg';

export const Explore = () => {
  const token = sessionStorage.getItem('token');

  !token && history.push('/housing-marketplace/auth');

  return (
    <MainContainer>
      <TitleContainer>
        <Typography component='h6' variant='h4'>
          Explore
        </Typography>
      </TitleContainer>
      <div>
        <Typography paragraph>Listings</Typography>
        <Grid container spacing={1}>
          <Grid item xs={6} md={4}>
            <Link to='/housing-marketplace/category/rent'>
              <CategoryImage src={rentCategoryImg} alt='rent' />
            </Link>
            <CategoryTitle paragraph>For rent</CategoryTitle>
          </Grid>
          <Grid item xs={6} md={4}>
            <Link to='/housing-marketplace/category/sale'>
              <CategoryImage src={sellCategoryImg} alt='sale' />
            </Link>
            <CategoryTitle paragraph>For sale</CategoryTitle>
          </Grid>
        </Grid>
      </div>
    </MainContainer>
  );
};

const MainContainer = styled.div({
  padding: 20,
});

const TitleContainer = styled.div({
  padding: '10px 0',
});

const CategoryImage = styled.img({
  ':hover': {
    opacity: 0.8,
  },
  height: '90%',
  width: '100%',
  borderRadius: 15,
});

const CategoryTitle = styled(Typography)({
  marginTop: 10,
});
