import React from 'react';
import styled from 'styled-components';
import { Autocomplete, Grid, InputLabel, TextField, Typography } from '@mui/material';

import { NBAEverythingContext } from '../context/NBAEverythingContext';
import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

import {
  getNBASeasons,
  getTeams,
  getTeamGameDataByTeamAndSeason,
  setSelectedNBASeason,
  setSelectedNBATeam,
} from '../context/NBAEverythingActions';

const NBAEverythingSearch = () => {
  const { darkMode } = React.useContext(DarkLightModeContext);
  const { nbaTeams, nbaEverythingDispatch, selectedNBASeason, selectedNBATeam } =
    React.useContext(NBAEverythingContext);

  React.useEffect(() => {
    getTeams(nbaEverythingDispatch);
  }, [nbaEverythingDispatch]);

  React.useEffect(() => {
    getTeamGameDataByTeamAndSeason(
      nbaEverythingDispatch,
      selectedNBATeam.id,
      selectedNBASeason.year,
    );
  }, [nbaEverythingDispatch, selectedNBASeason, selectedNBATeam]);

  return (
    <NBAEverythingSearchRootContainer container>
      <Grid item xs={1} />
      <NBAEverythingAutocompleteContainer item xs={12} md={4}>
        <InputLabel>
          <Typography
            color={darkMode ? 'AppWorkspace' : 'MenuText'}
            component='span'
            variant='label'
          >
            Select team
          </Typography>
        </InputLabel>
        <Autocomplete
          defaultValue={{ full_name: 'Atlanta Hawks', id: 1 }}
          disableClearable
          freeSolo
          fullWidth
          getOptionLabel={option => `${option.full_name}`}
          onChange={(e, selectedNBATeam) => {
            setSelectedNBATeam(nbaEverythingDispatch, selectedNBATeam);
          }}
          options={nbaTeams}
          renderInput={({ inputProps, ...params }) => (
            <SearchInput
              {...params}
              darkMode={darkMode}
              // label='Select a team'
              variant={darkMode ? 'filled' : 'outlined'}
              inputProps={{ ...inputProps, readOnly: true }}
            />
          )}
          value={selectedNBATeam}
        />
      </NBAEverythingAutocompleteContainer>
      <Grid item xs={1} />
      <NBAEverythingAutocompleteContainer item xs={12} md={4}>
        <Typography color={darkMode ? 'AppWorkspace' : 'MenuText'} component='span' variant='label'>
          Select season
        </Typography>
        <Autocomplete
          defaultValue={{ display_year: '2022-2023' }}
          disableClearable
          freeSolo
          fullWidth
          getOptionLabel={option => `${option.display_year}`}
          onChange={(e, selectedNBASeason) => {
            setSelectedNBASeason(nbaEverythingDispatch, selectedNBASeason);
          }}
          options={getNBASeasons()}
          renderInput={({ inputProps, ...params }) => (
            <SearchInput
              {...params}
              darkMode={darkMode}
              variant={darkMode ? 'filled' : 'outlined'}
              inputProps={{ ...inputProps, readOnly: true }}
            />
          )}
          value={selectedNBASeason}
        />
      </NBAEverythingAutocompleteContainer>
    </NBAEverythingSearchRootContainer>
  );
};

export default NBAEverythingSearch;

export const NBAEverythingSearchRootContainer = styled(Grid)({
  marginTop: 20,
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
    fontSize: 12,
    height: darkMode ? 48 : 42,
    padding: '0px 5px !important',
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
