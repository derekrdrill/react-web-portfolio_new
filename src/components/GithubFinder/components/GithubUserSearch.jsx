import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';

import { AlertContext } from '../../Alert/context/AlertContext';
import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';
import { GithubContext } from '../context/GithubContext';

import { AlertComponent as Alert } from '../../Alert/components/AlertComponent';
import { GithubUserSearchClear } from './GithubUserSearchClear';
import { searchUsers } from '../context/GithubActions';

export const handleChange = (e, githubDispatch, handleClearUsers, searchInput, setText) => {
  let textValue = e.currentTarget.value;

  if (!textValue) {
    handleClearUsers(githubDispatch, searchInput, setText);
    textValue = null;
  } else {
    setText(textValue);
  }

  return textValue;
};

export const handleClearUsers = (githubDispatch, searchInput, setText) => {
  githubDispatch({ type: 'CLEAR_USERS' });
  setText('');
  searchInput.current.focus();

  return null;
};

export const GithubUserSearch = () => {
  const searchInput = useRef(null);
  const [text, setText] = useState('');
  const { alertDispatch } = React.useContext(AlertContext);
  const { darkMode } = React.useContext(DarkLightModeContext);
  const { githubDispatch } = React.useContext(GithubContext);

  const handleEnterKeyPress = e => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (text === '') {
      const alertMsg = 'You must enter something for the search to fire 🔥';
      const alertTitle = 'Empty Search';
      const alertType = 'error';

      alertDispatch({
        type: 'SET_ALERT',
        fadeOut: false,
        payload: { msg: alertMsg, title: alertTitle, type: alertType },
      });

      setTimeout(() => alertDispatch({ type: 'FADE_ALERT', fadeOut: true }), 2000);
      setTimeout(() => alertDispatch({ type: 'REMOVE_ALERT' }), 2400);
    } else {
      githubDispatch({ type: 'SET_LOADING' });
      const users = await searchUsers(text);
      githubDispatch({ type: 'GET_USERS', payload: users });
    }
  };

  return (
    <GithubUserSearchContainer>
      <SearchInputContainer>
        <SearchInput
          darkMode={darkMode}
          fullWidth
          inputRef={searchInput}
          label='Search for a GitHub user by name or username'
          onChange={
            /* istanbul ignore next */
            e => {
              handleChange(e, githubDispatch, handleClearUsers, searchInput, setText);
            }
          }
          onKeyDown={handleEnterKeyPress}
          value={text}
          variant={darkMode ? 'filled' : 'outlined'}
        />
        <GithubUserSearchClear
          githubDispatch={githubDispatch}
          handleClearUsers={handleClearUsers}
          searchInput={searchInput}
          setText={setText}
          text={text}
        />
        <SearchButton onClick={handleSubmit} variant='contained'>
          Search
        </SearchButton>
      </SearchInputContainer>
      <AlertContainer>
        <Alert />
      </AlertContainer>
    </GithubUserSearchContainer>
  );
};

const GithubUserSearchContainer = styled.div({
  margin: '200px 0px 0px 20px',
});

const SearchInputContainer = styled.div({
  display: 'flex',
  justifyContent: 'flex-start',
});

const AlertContainer = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 10,
  transform: 'translateX(-15px)',
});

const SearchInput = styled(TextField)(({ darkMode }) => ({
  '&.MuiFormControl-root': {
    ':hover': {
      backgroundColor: darkMode ? '#607080' : 'grey',
    },
    backgroundColor: darkMode ? '#4f5c69' : 'lightgrey',
  },
  '.MuiInputBase-root': {
    borderRadius: 0,
    color: darkMode ? '#75baff' : 'black',
  },
  '.MuiInputLabel-root': {
    color: darkMode ? '#75baff' : 'black',
  },
  '.Mui-focused': {
    '&.MuiInputBase-root': {
      backgroundColor: 'white',
      color: darkMode ? '#75baff' : 'black',
    },
  },
}));

const SearchButton = styled(Button)({
  borderRadius: 0,
  transform: 'translateX(-15px)',
});
