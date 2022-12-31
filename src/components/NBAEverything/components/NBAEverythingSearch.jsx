import React from 'react';
import styled from 'styled-components';
import { Autocomplete, Grid, TextField } from '@mui/material';
import PropTypes from 'prop-types';

import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

const NBAEverythingSearch = () => {
  const { darkMode } = React.useContext(DarkLightModeContext);

  return (
    <NBAEverythingSearchRootContainer container>
      <Grid item xs={1} />
      <NBAEverythingAutocompleteContainer item xs={12} md={4}>
        <Autocomplete
          freeSolo
          fullWidth
          //   onChange={(e, searchData) => {
          //     handleSearchBarChange(
          //       alertDispatch,
          //       cocktailDispatch,
          //       searchData,
          //       searchType,
          //       cocktails,
          //     );
          //   }}
          //   options={getSearchOptions(searchType, cocktails, ingredients)}
          options={['Hawks', 'Heats', 'Hornets']}
          defaultValue={'Hawks'}
          renderInput={params => (
            <SearchInput
              {...params}
              darkMode={darkMode}
              label='Select a team'
              variant={darkMode ? 'filled' : 'outlined'}
            />
          )}
          //   value={selectedIngredients}
        />
      </NBAEverythingAutocompleteContainer>
      <Grid item xs={1} />
      <NBAEverythingAutocompleteContainer item xs={12} md={4}>
        <Autocomplete
          freeSolo
          fullWidth
          //   onChange={(e, searchData) => {
          //     handleSearchBarChange(
          //       alertDispatch,
          //       cocktailDispatch,
          //       searchData,
          //       searchType,
          //       cocktails,
          //     );
          //   }}
          //   options={getSearchOptions(searchType, cocktails, ingredients)}
          options={['2022-2023', '2021-2022', '2020-2021']}
          defaultValue={'2022-2023'}
          renderInput={params => (
            <SearchInput
              {...params}
              darkMode={darkMode}
              label='Select a season'
              variant={darkMode ? 'filled' : 'outlined'}
            />
          )}
          //   value={selectedIngredients}
        />
      </NBAEverythingAutocompleteContainer>
    </NBAEverythingSearchRootContainer>
  );
};

NBAEverythingSearch.propTypes = {};

export default NBAEverythingSearch;

export const NBAEverythingSearchRootContainer = styled(Grid)({
  marginTop: 45,
});

export const NBAEverythingAutocompleteContainer = styled(Grid)({
  padding: 10,
});

const SearchInput = styled(TextField)(({ darkMode }) => ({
  '&.MuiFormControl-root': {
    ':hover': {
      backgroundColor: darkMode ? '#607080' : 'lightgrey',
    },
    backgroundColor: darkMode ? '#607080' : 'gainsboro',
    borderRadius: 10,
  },
  '.MuiInputBase-root': {
    borderRadius: 10,
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
