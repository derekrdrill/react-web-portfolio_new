import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import { listingsReducer } from './ListingsReducer';

export const ListingsContext = createContext();

const ListingsProvider = ({ children }) => {
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

ListingsProvider.propTypes = {
  children: PropTypes.node,
};

export default ListingsProvider;
