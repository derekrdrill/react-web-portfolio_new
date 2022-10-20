import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';

import { AlertContext } from '../../Alert/context/AlertContext';
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
  const { githubDispatch } = React.useContext(GithubContext);
  const { alertDispatch } = React.useContext(AlertContext);

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
          fullWidth
          label='Type a user name'
          onChange={
            /* istanbul ignore next */
            e => {
              handleChange(e, githubDispatch, handleClearUsers, searchInput, setText);
            }
          }
          inputRef={searchInput}
          value={text}
          variant='outlined'
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

const SearchInput = styled(TextField)({
  '&.MuiFormControl-root': {
    ':hover': {
      backgroundColor: '#607080',
    },
    backgroundColor: '#4f5c69',
  },
  '.MuiInputBase-root': {
    borderRadius: 0,
    color: '#75baff',
  },
  '.MuiInputLabel-root': {
    color: '#75baff',
  },
  '.Mui-focused': {
    color: '#bddeff',
    '&.MuiInputBase-root': {
      backgroundColor: '#607080',
    },
  },
});

const SearchButton = styled(Button)({
  borderRadius: 0,
  transform: 'translateX(-15px)',
});
