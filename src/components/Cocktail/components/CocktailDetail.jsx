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
        <Grid item xs={2} lg={2} />
        <Grid item xs={10} lg={3}>
          <CocktailImage src={searchResult.strDrinkThumb} />
        </Grid>
        <Grid item xs={2} lg={1} />
        <Grid item xs={8} lg={4}>
          <Typography variant='h3'>{searchResult.strDrink}</Typography>
          <br />
          <Typography variant='h5'>Ingredients</Typography>
          <ul>
            {Object.keys(searchResult)
              .filter(result => result.includes('strIngredient'))
              .map(
                (ingredient, ingredientKey) =>
                  searchResult[ingredient] && (
                    <li key={`${searchResult.idDrink}${ingredientKey}`}>
                      <Typography variant='body1'>
                        {`${searchResult[`strMeasure${ingredientKey + 1}`] ?? ''} ${
                          searchResult[ingredient]
                        }`}
                      </Typography>
                    </li>
                  ),
              )}
          </ul>
          <Typography variant='h5'>Instructions</Typography>
          <Typography variant='body2'>{searchResult.strInstructions}</Typography>
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
  height: 300,
  width: 350,
});
