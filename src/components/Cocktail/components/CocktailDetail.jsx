import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';

import { CocktailContext } from '../../Cocktail/context/CocktailContext';

const CocktailDetail = () => {
  const { searchResults, searchResultsLength } = React.useContext(CocktailContext);

  console.log(searchResultsLength);

  return (
    searchResults && (
      <CocktailDetailContainer container>
        <Grid item xs={2} />
        <Grid item xs={10}>
          <Typography variant='h3'>{searchResultsLength} drinks listed</Typography>
        </Grid>
        {searchResults.map((searchResult, searchResultKey) => (
          <CocktailResultsContainer key={searchResultKey} container>
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
                  <Grid container>
                    <Grid item xs={6}>
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
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant='h5'
                        sx={{
                          textAlign: {
                            xs: 'center',
                            md: 'left',
                          },
                        }}
                      >
                        Glass
                      </Typography>
                      <Typography
                        variant='subtitle2'
                        sx={{
                          textAlign: {
                            xs: 'center',
                            md: 'left',
                          },
                        }}
                      >
                        {searchResult.strGlass}
                      </Typography>
                    </Grid>
                  </Grid>
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
          </CocktailResultsContainer>
        ))}
      </CocktailDetailContainer>
    )
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

export const CocktailResultsContainer = styled(Grid)({
  margin: '50px 0',
});
