import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';

import { CocktailContext } from '../../Cocktail/context/CocktailContext';

const CocktailDetail = () => {
  const { searchResults } = React.useContext(CocktailContext);

  return (
    searchResults &&
    searchResults.map((searchResult, searchResultKey) => (
      <CocktailDetailContainer key={searchResultKey} container>
        <Grid item xs={1} sm={3} md={2} />
        <Grid item xs={10} sm={8} md={3}>
          <CocktailImage src={searchResult.strDrinkThumb} />
        </Grid>
        <Grid item xs={1} sm={2} md={2} />
        <Grid item xs={11} md={4}>
          <Typography
            variant='h3'
            sx={{
              textAlign: {
                xs: 'center',
                md: 'left',
              },
            }}
          >
            {searchResult.strDrink}
          </Typography>
          <br />
          <Typography
            variant='h5'
            sx={{
              textAlign: {
                xs: 'center',
                md: 'left',
              },
            }}
          >
            Ingredients
          </Typography>
          {/* <ul> */}
          {Object.keys(searchResult)
            .filter(result => result.includes('strIngredient'))
            .map(
              (ingredient, ingredientKey) =>
                searchResult[ingredient] && (
                  <Typography
                    key={`${searchResult.idDrink}${ingredientKey}`}
                    variant='subtitle2'
                    sx={{
                      textAlign: {
                        xs: 'center',
                        md: 'left',
                      },
                    }}
                  >
                    {`${searchResult[`strMeasure${ingredientKey + 1}`] ?? ''} ${
                      searchResult[ingredient]
                    }`}
                  </Typography>
                ),
            )}
          <br />
          <Typography
            variant='h5'
            sx={{
              textAlign: {
                xs: 'center',
                md: 'left',
              },
            }}
          >
            Instructions
          </Typography>
          <Typography
            variant='body2'
            sx={{
              textAlign: {
                xs: 'center',
                md: 'left',
              },
            }}
          >
            {searchResult.strInstructions}
          </Typography>
        </Grid>
      </CocktailDetailContainer>
    ))
  );
};

export default CocktailDetail;

export const CocktailDetailContainer = styled(Grid)({
  marginBottom: 150,
  position: 'relative',
  top: 125,
});

export const CocktailImage = styled.img({
  borderRadius: 30,
  height: 275,
  width: 320,
});
