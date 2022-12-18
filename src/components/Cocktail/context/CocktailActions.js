import axios from 'axios';

import { handleAlert } from '../../Alert/context/AlertActions';

const COCKTAIL_SEARCH_URL = process.env.REACT_APP_COCKTAIL_SEARCH_URL;
const COCKTAIL_LIST_URL = process.env.REACT_APP_COCKTAIL_LIST_URL;
const COCKTAIL_KEY = process.env.REACT_APP_COCKTAIL_KEY;
const COCKTAIL_HOST = process.env.REACT_APP_COCKTAIL_HOST;

export const getAllCocktails = async cocktailDispatch => {
  const options = {
    method: 'GET',
    url: COCKTAIL_SEARCH_URL,
    params: { s: '' },
    headers: {
      'X-RapidAPI-Key': COCKTAIL_KEY,
      'X-RapidAPI-Host': COCKTAIL_HOST,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      cocktailDispatch({
        type: 'SET_COCKTAILS',
        cocktails: response.data.drinks.filter(drink => !drink.strDrink.includes('1-900-FUK')),
      });
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const getAllGlasses = async cocktailDispatch => {
  const options = {
    method: 'GET',
    url: COCKTAIL_LIST_URL,
    params: { g: 'list' },
    headers: {
      'X-RapidAPI-Key': COCKTAIL_KEY,
      'X-RapidAPI-Host': COCKTAIL_HOST,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      cocktailDispatch({
        type: 'SET_GLASSES',
        glasses: response.data.drinks,
      });
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const getAllIngredients = cocktailDispatch => {
  const options = {
    method: 'GET',
    url: COCKTAIL_LIST_URL,
    params: { i: 'list' },
    headers: {
      'X-RapidAPI-Key': COCKTAIL_KEY,
      'X-RapidAPI-Host': COCKTAIL_HOST,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      cocktailDispatch({
        type: 'SET_INGREDIENTS',
        ingredients: response.data.drinks,
      });
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const getSearchOptions = (searchType, cocktails, ingredients, glasses) =>
  searchType === 'name' && cocktails.length > 0
    ? cocktails.map(option => option.strDrink).sort()
    : searchType === 'ingredients' && ingredients.length > 0
    ? ingredients.map(option => option.strIngredient1).sort()
    : searchType === 'glass' && glasses.length > 0
    ? glasses.map(option => option.strGlass).sort()
    : [];

export const getCocktailByName = async (name, cocktailDispatch) => {
  const options = {
    method: 'GET',
    url: COCKTAIL_SEARCH_URL,
    params: { s: name },
    headers: {
      'X-RapidAPI-Key': COCKTAIL_KEY,
      'X-RapidAPI-Host': COCKTAIL_HOST,
    },
  };

  if (!name) {
    cocktailDispatch({
      type: 'SET_SEARCH_RESULTS',
      searchResults: null,
    });

    cocktailDispatch({
      type: 'SET_SEARCH_RESULTS_LENGTH',
      searchResultsLength: 0,
    });
  } else {
    axios
      .request(options)
      .then(function (response) {
        const drinks = response.data.drinks;

        cocktailDispatch({
          type: 'SET_SEARCH_RESULTS',
          searchResults: drinks,
        });

        cocktailDispatch({
          type: 'SET_SEARCH_RESULTS_LENGTH',
          searchResultsLength: drinks.length,
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }
};

export const getCocktailsByIngredientOrGlass = async (
  alertDispatch,
  cocktailDispatch,
  cocktails,
  searchType,
  selectedIngredients,
  searchData,
) => {
  let newCocktails = [];
  let newCocktailsNoDups = [];

  await cocktails.forEach(cocktail => {
    if (searchType === 'ingredients') {
      let foundIngredients = [];

      selectedIngredients.forEach(selectedIngredient => {
        for (let i = 1; i <= 15; i++) {
          let ingredient =
            cocktail[`strIngredient${i}`] && cocktail[`strIngredient${i}`].toUpperCase();

          if (ingredient && ingredient.includes(selectedIngredient.toUpperCase())) {
            foundIngredients = [...foundIngredients, ...[ingredient]];
          }
        }
      });

      if (foundIngredients.length >= selectedIngredients.length) {
        let fullMatch = false;

        foundIngredients.forEach(foundIngredient => {
          selectedIngredients.forEach(selectedIngredient => {
            if (foundIngredient.includes(selectedIngredient.toUpperCase())) {
              fullMatch = true;
            } else {
              fullMatch = false;
            }
          });
        });

        if (fullMatch) {
          newCocktails = [...newCocktails, ...[cocktail]];
        }
      }
    } else {
      if (searchData === cocktail.strGlass) {
        newCocktails = [...newCocktails, ...[cocktail]];
      }
    }
  });

  newCocktailsNoDups = newCocktails.filter(
    (v, i, a) => a.findIndex(v2 => JSON.stringify(v) === JSON.stringify(v2)) === i,
  );

  if (newCocktailsNoDups.length > 0) {
    cocktailDispatch({
      type: 'SET_SEARCH_RESULTS',
      searchResults: newCocktailsNoDups.sort((a, b) =>
        a.strDrink < b.strDrink ? -1 : a.strDrink > b.strDrink ? 1 : 0,
      ),
    });

    cocktailDispatch({
      type: 'SET_SEARCH_RESULTS_LENGTH',
      searchResultsLength: newCocktailsNoDups.length,
    });
  } else {
    if (searchData) {
      handleAlert('No drinks found with those indredients', 'Try again', 'warning', alertDispatch);
    }

    cocktailDispatch({
      type: 'SET_SEARCH_RESULTS',
      searchResults: [],
    });

    cocktailDispatch({
      type: 'SET_SEARCH_RESULTS_LENGTH',
      searchResultsLength: 0,
    });
  }
};

export const handleSearchBarChange = async (
  alertDispatch,
  cocktailDispatch,
  searchData,
  searchType,
  cocktails,
) => {
  if (searchType === 'name') {
    getCocktailByName(searchData, cocktailDispatch);
  } else if (searchType === 'glass') {
    getCocktailsByIngredientOrGlass(
      alertDispatch,
      cocktailDispatch,
      cocktails,
      searchType,
      null,
      searchData,
    );
  } else {
    let newSearchData =
      searchData.length > 3
        ? searchData.filter((searchItem, searchItemKey) => searchItemKey !== 2)
        : searchData;

    cocktailDispatch({
      type: 'SET_SELECTED_INGREDIENTS',
      selectedIngredients: newSearchData,
    });
  }
};

export const setSearchType = (e, cocktailDispatch) => {
  cocktailDispatch({
    type: 'SET_SEARCH_TYPE',
    searchType: e.target.value,
  });

  cocktailDispatch({
    type: 'SET_SEARCH_RESULTS',
    searchResults: null,
  });

  cocktailDispatch({
    type: 'SET_SEARCH_RESULTS_LENGTH',
    searchResultsLength: 0,
  });

  cocktailDispatch({
    type: 'SET_SELECTED_INGREDIENTS',
    selectedIngredients: [],
  });
};
