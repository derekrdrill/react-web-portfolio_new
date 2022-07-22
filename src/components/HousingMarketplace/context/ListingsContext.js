import React, { createContext, useReducer } from 'react';
import { listingsReducer } from './ListingsReducer';

export const ListingsContext = createContext();

export const ListingsProvider = ({ children }) => {
  const initialState = {
    isConfirmingDelete: false,
    isDeleting: false,
    isEditing: false,
    deleteComplete: false,
    modalName: '',
    modalLocation: '',
  };

  const [state, listingsDispatch] = useReducer(listingsReducer, initialState);

  return (
    <ListingsContext.Provider
      value={{
        listingsDispatch,
        ...state,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
};
