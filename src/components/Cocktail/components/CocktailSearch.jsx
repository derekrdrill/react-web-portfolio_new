import React from 'react';
import styled from 'styled-components';
import {
  Autocomplete,
  Grid,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/fontawesome-free-solid';

import { AlertContext } from '../../Alert/context/AlertContext';
import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';
import { CocktailContext } from '../../Cocktail/context/CocktailContext';

import { AlertComponent as Alert } from '../../Alert/components/AlertComponent';

import {
  getAllCocktails,
  getAllIngredients,
  getCocktailsByIngredient,
  getSearchOptions,
  handleSearchBarChange,
  setSearchType,
} from '../context/CocktailActions';

const CocktailSearch = () => {
  const { alertDispatch } = React.useContext(AlertContext);

  const {
    cocktailDispatch,
    cocktails,
    ingredients,
    searchResults,
    searchType,
    selectedIngredients,
  } = React.useContext(CocktailContext);

  const { darkMode } = React.useContext(DarkLightModeContext);

  React.useEffect(() => {
    getAllCocktails(cocktailDispatch);
    getAllIngredients(cocktailDispatch);
  }, [cocktailDispatch]);

  return (
    <Grid container>
      <Grid item xs={1} md={2} />
      <CocktailSearchBarGridItem item xs={10} md={8}>
        <CocktailSearchBarContainer>
          <CocktailSearchBar darkMode={darkMode}>
            <InputLabel id='demo-simple-select-label'>Search by...</InputLabel>
            <Select
              value={searchType}
              label='Search by...'
              onChange={e => {
                setSearchType(e, cocktailDispatch, searchType);
              }}
              variant={darkMode ? 'outlined' : 'filled'}
            >
              <MenuItem value='name'>Drink Name</MenuItem>
              <MenuItem value='ingredients'>Ingredients</MenuItem>
            </Select>
          </CocktailSearchBar>
          {searchType === 'name' && (
            <Autocomplete
              freeSolo
              fullWidth
              onChange={(e, searchData) => {
                handleSearchBarChange(cocktailDispatch, searchData, searchType);
              }}
              options={getSearchOptions(searchType, cocktails, ingredients)}
              renderInput={params => (
                <SearchInput
                  {...params}
                  darkMode={darkMode}
                  label='Search by a drink name'
                  variant='filled'
                />
              )}
              value={searchResults ? searchResults[0].strDrink : ''}
            />
          )}
          {searchType == 'ingredients' && (
            <Autocomplete
              freeSolo
              fullWidth
              multiple
              onChange={(e, searchData) => {
                handleSearchBarChange(cocktailDispatch, searchData, searchType);
              }}
              options={getSearchOptions(searchType, cocktails, ingredients)}
              defaultValue={[]}
              renderInput={params => (
                <SearchInput
                  {...params}
                  darkMode={darkMode}
                  label='Select up to 3 ingredients'
                  inputProps={{ ...params.inputProps, maxLength: 3 }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <SearchInputIconButton
                        onClick={() => {
                          getCocktailsByIngredient(
                            selectedIngredients,
                            cocktailDispatch,
                            alertDispatch,
                          );
                        }}
                      >
                        <FontAwesomeIcon icon={faSearch} />
                      </SearchInputIconButton>
                    ),
                  }}
                  variant='filled'
                />
              )}
              value={selectedIngredients}
            />
          )}
        </CocktailSearchBarContainer>
        <AlertContainer>
          <Alert />
        </AlertContainer>
      </CocktailSearchBarGridItem>
    </Grid>
  );
};

CocktailSearch.propTypes = {};

export default CocktailSearch;

const CocktailSearchBarContainer = styled.div({
  display: 'flex',
  justifyContent: 'flex-start',
});

const CocktailSearchBarGridItem = styled(Grid)({
  position: 'relative',
  top: 75,
});

const CocktailSearchBar = styled(FormControl)(({ darkMode }) => ({
  '.MuiInputBase-root': { color: darkMode && 'beige' },
  '.MuiFormLabel-root': {
    color: darkMode && 'beige',
  },
  '.MuiSvgIcon-root': { fill: darkMode && 'beige' },
  backgroundColor: darkMode ? '#414141' : 'white',
  width: 225,
}));

const AlertContainer = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 10,
});

const SearchInput = styled(TextField)(({ darkMode }) => ({
  '&.MuiFormControl-root': {
    ':hover': {
      backgroundColor: darkMode ? '#607080' : 'lightgrey',
    },
    backgroundColor: darkMode ? '#607080' : 'white',
  },
  '.MuiInputBase-root': {
    borderRadius: 0,
    color: darkMode ? '#75baff' : 'black',
  },
  '.MuiInputLabel-root': {
    color: darkMode ? 'beige' : 'royalblue',
  },
  '.Mui-focused': {
    color: darkMode ? 'beige' : 'black',
    '&.MuiInputBase-root': {
      backgroundColor: darkMode ? '#75baff' : 'white',
    },
  },
  '.MuiChip-label': {
    color: darkMode && 'white',
  },
}));

const SearchInputIconButton = styled(IconButton)({
  transform: 'translateY(-10px)',
});
