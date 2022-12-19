import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';

import { CocktailContext } from '../../Cocktail/context/CocktailContext';

import CocktailData from './CocktailData';
import { LoaderSpinner } from '../../LoaderSpinner/LoaderSpinner';

const CocktailDetail = () => {
  const { searchResults, searchResultsLength, loading } = React.useContext(CocktailContext);

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
            <CocktailData
              key={searchResultKey}
              searchResult={searchResult}
              searchResultKey={searchResultKey}
            />
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

