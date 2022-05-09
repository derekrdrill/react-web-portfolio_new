import React, { useRef, useState, useContext } from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import { AlertComponent as Alert } from '../../Alert/components/AlertComponent';
import { GithubContext } from '../context/GithubContext';
import { AlertContext } from '../../Alert/context/AlertContext';
import { searchUsers } from '../context/GithubActions';

export const GithubUserSearch = () => {
  const searchInput = useRef(null);
  const [text, setText] = useState('');
  const { githubDispatch } = useContext(GithubContext);
  const { alertDispatch } = useContext(AlertContext);

  const handleChange = e => {
    let textValue = e.currentTarget.value;

    if (!textValue) {
      handleClearUsers();
    } else {
      setText(textValue);
    }
  };

  const handleClearUsers = () => {
    githubDispatch({ type: 'CLEAR_USERS' });
    setText('');
    searchInput.current.focus();
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (text === '') {
      const alertMsg = 'You must enter something for the search to fire 🔥';
      const alertTitle = 'Empty Search';
      const alertType = 'error';

      alertDispatch({
        type: 'SET_ALERT',
        fadeOut: false,
        payload: { alertMsg, alertTitle, alertType },
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
          onChange={handleChange}
          inputRef={searchInput}
          value={text}
          variant='outlined'
        />
        {text && <ClearSearch onClick={handleClearUsers} />}
        <SearchButton onClick={handleSubmit} variant='contained'>
          Search
        </SearchButton>
      </SearchInputContainer>
      <AlertContainer>
        <Alert />
      </AlertContainer>
    </GithubUserSearchContainer>
  );
};;;

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

const ClearSearch = styled(FaTimes)({
  ':hover': {
    fill: '#cb1515',
  },
  cursor: 'pointer',
  fill: '#4e0909',
  marginTop: 20,
  transform: 'translateX(-25px)',
});
