import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';

import { CocktailContext } from '../../Cocktail/context/CocktailContext';
import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

import { LoaderSpinner } from '../../LoaderSpinner/LoaderSpinner';

const CocktailDetail = () => {
  const { searchResults, searchResultsLength, loading } = React.useContext(CocktailContext);
  const { darkMode } = React.useContext(DarkLightModeContext);

  return (
    <>
      {loading && <LoaderSpinner open />}
      {!loading && searchResults && searchResults.length > 0 && (
        <CocktailDetailContainer container rowSpacing={2}>
          <Grid item xs={1} md={2} />
          <Grid item xs={10}>
            <Typography variant='h5'>
              {`${searchResultsLength} ${searchResultsLength === 1 ? 'drink' : 'drinks'} listed`}
            </Typography>
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={12} />
          {searchResults.map((searchResult, searchResultKey) => (
            <>
              <CocktailResultsContainer key={searchResultKey} container rowSpacing={4}>
                <Grid item xs={1} md={2} />
                <Grid item xs={11} md={3}>
                  <CocktailImage src={searchResult.strDrinkThumb} />
                </Grid>
                <Grid item xs={1} sm={1} />
                <Grid item xs={10} md={5}>
                  <Typography variant='h3'>{searchResult.strDrink}</Typography>
                  <br />
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant='h5'>Ingredients</Typography>
                      {Object.keys(searchResult)
                        .filter(result => result.includes('strIngredient'))
                        .map(
                          (ingredient, ingredientKey) =>
                            searchResult[ingredient] && (
                              <Typography
                                key={`${searchResult.idDrink}${ingredientKey}`}
                                variant='subtitle2'
                              >
                                {`${searchResult[`strMeasure${ingredientKey + 1}`] ?? ''} ${
                                  searchResult[ingredient]
                                }`}
                              </Typography>
                            ),
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant='h5'>Glass</Typography>
                      <Typography variant='subtitle2'>{searchResult.strGlass}</Typography>
                    </Grid>
                  </Grid>
                  <br />
                  <Typography variant='h5'>Instructions</Typography>
                  <Typography variant='body2'>{searchResult.strInstructions}</Typography>
                </Grid>
                <Grid xs={1} />
                <Grid xs={1} />
                <CocktailResultsDivider
                  item
                  xs={10}
                  darkMode={darkMode}
                  lastItem={searchResultKey + 1 === searchResultsLength}
                />
                <Grid xs={1} />
              </CocktailResultsContainer>
            </>
          ))}
        </CocktailDetailContainer>
      )}
    </>
  );
};

export default CocktailDetail;

export const CocktailDetailContainer = styled(Grid)({
  marginBottom: 150,
  position: 'relative',
  top: 100,
});

export const CocktailImage = styled.img({
  borderRadius: 30,
  height: 275,
  width: 320,
});

export const CocktailResultsContainer = styled(Grid)({
  padding: '40px 0',
});

export const CocktailResultsDivider = styled(Grid)(({ darkMode, lastItem }) => ({
  borderBottom: !lastItem && `solid 1px ${darkMode ? 'gainsboro' : 'grey'}`,
  margin: '0 30px',
  padding: '50px 0',
}));
