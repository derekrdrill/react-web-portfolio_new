import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

export const GithubUserSearchClear = ({ githubDispatch, handleClearUsers, searchInput, setText, text }) =>
  text && (
    <ClearSearch
      className='search'
      onClick={
        /* istanbul ignore next */
        () => {
          handleClearUsers(githubDispatch, searchInput, setText);
        }
      }
    />
  );

GithubUserSearchClear.propTypes = {
  githubDispatch: PropTypes.func,
  handleClearUsers: PropTypes.func,
  searchInput: PropTypes.node,
  setText: PropTypes.func,
  text: PropTypes.string,
};

export const ClearSearch = styled(FaTimes)({
  ':hover': {
    fill: '#cb1515',
  },
  cursor: 'pointer',
  fill: '#4e0909',
  marginTop: 20,
  transform: 'translateX(-25px)',
});
