import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/fontawesome-free-solid';

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
                  {searchResult.youtubeData && (
                    <CocktailVideoTutorialLinkContainer item xs={12}>
                      <CocktailVideoTutorialLink
                        href={searchResult.youtubeData.url}
                        target='_blank'
                        rel='noreferrer'
                      >
                        <CocktailVideoTutorial
                          className='youtube-img'
                          src={searchResult.youtubeData.bestThumbnail.url}
                        />
                        <CocktailVideoTutorialPlayButton icon={faPlayCircle} />
                        <CocktailVideoTutorialTitleContainer className='youtube-title'>
                          <CocktailVideoTutorialText variant='body1'>
                            {searchResult.youtubeData.title}
                          </CocktailVideoTutorialText>
                          <CocktailVideoTutorialText variant='subtitle2'>
                            {searchResult.youtubeData.duration}
                          </CocktailVideoTutorialText>
                        </CocktailVideoTutorialTitleContainer>
                      </CocktailVideoTutorialLink>
                    </CocktailVideoTutorialLinkContainer>
                  )}
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

export const CocktailVideoTutorial = styled.img({
  height: 215,
  width: 315,
});

export const CocktailVideoTutorialLinkContainer = styled(Grid)({
  ':hover': {
    '.youtube-img': {
      opacity: 0.4,
    },
    '.youtube-title': {
      visibility: 'visible',
    },
  },
  height: 215,
  transform: 'translateY(20px)',
  width: 315,
});

export const CocktailVideoTutorialLink = styled.a({
  cursor: 'pointer',
  textDecoration: 'none',
  zIndex: 2,
});

export const CocktailVideoTutorialText = styled(Typography)({
  color: 'white',
  fontWeigt: 'bold',
  zIndex: 0,
});

export const CocktailVideoTutorialTitleContainer = styled.div({
  maxWidth: 300,
  transform: 'translate(10px, -250px)',
  visibility: 'hidden',
});

export const CocktailVideoTutorialPlayButton = styled(FontAwesomeIcon)({
  color: 'red',
  height: 30,
  transform: 'translate(145px, -130px)',
  width: 30,
});
