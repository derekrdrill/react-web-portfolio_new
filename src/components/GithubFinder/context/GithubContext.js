import React, { createContext, useReducer } from 'react';
import { githubReducer } from './GithubReducer';

export const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const initialState = {
    loading: false,
    repos: [],
    user: null,
    users: [],
  };

  const [state, githubDispatch] = useReducer(githubReducer, initialState);

  return (
    <GithubContext.Provider
      value={{
        githubDispatch,
        ...state,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
