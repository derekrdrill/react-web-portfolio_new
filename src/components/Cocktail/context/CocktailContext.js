import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import { cocktailReducer } from './CocktailReducer';

export const CocktailContext = createContext();

const CocktailProvider = ({ children }) => {
  const initialState = {
    advancedSearch: false,
    cocktails: [],
    ingredients: [],
    loading: false,
    searchResults: null,
    searchResultsLength: 0,
    searchType: 'name',
    selectedIngredients: [],
  };

  const [state, cocktailDispatch] = useReducer(cocktailReducer, initialState);

  return (
    <CocktailContext.Provider
      value={{
        cocktailDispatch,
        ...state,
      }}
    >
      {children}
    </CocktailContext.Provider>
  );
};

CocktailProvider.propTypes = {
  children: PropTypes.node,
};

export default CocktailProvider;
