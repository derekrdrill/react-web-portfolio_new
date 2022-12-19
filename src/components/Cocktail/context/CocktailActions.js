import axios from 'axios';

import { handleAlert } from '../../Alert/context/AlertActions';

const COCKTAIL_SEARCH_URL = process.env.REACT_APP_COCKTAIL_SEARCH_URL;
const COCKTAIL_LIST_URL = process.env.REACT_APP_COCKTAIL_LIST_URL;
const COCKTAIL_KEY = process.env.REACT_APP_COCKTAIL_KEY;
const COCKTAIL_HOST = process.env.REACT_APP_COCKTAIL_HOST;
const YOUTUBE_API_URL = process.env.REACT_APP_YOUTUBE_API_URL;
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const YOUTUBE_API_HOST = process.env.REACT_APP_YOUTUBE_API_HOST;

export const getAllCocktailNames = async cocktailDispatch => {
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

export const getCocktailsWithYoutubeData = async (cocktail, cocktailDispatch) => {
  cocktailDispatch({
    type: 'SET_LOADING',
    loading: true,
  });

  const cocktailSearchString = cocktail.strDrink
    .replace(/\s+/g, '-')
    .toLowerCase()
    .split('.')
    .join('');

  const youtubeQueryString = `how-to-make-a-${cocktailSearchString}-${
    cocktail.strCategory === 'Shot' ? 'shot' : 'cocktail'
  }`;

  const options = {
    method: 'GET',
    url: YOUTUBE_API_URL,
    params: { q: youtubeQueryString },
    headers: {
      'X-RapidAPI-Key': YOUTUBE_API_KEY,
      'X-RapidAPI-Host': YOUTUBE_API_HOST,
    },
  };

  const result = await axios(options).catch(e => console.log(e));

  cocktail.youtubeData = result.data.items[0];

  cocktailDispatch({
    type: 'SET_LOADING',
    loading: false,
  });

  return result.data.items[0];
};

export const getCocktailsByIngredient = (cocktails, selectedIngredients) =>
  cocktails.filter(cocktail => {
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
        return cocktail;
      }
    }
  });

export const getCocktailsByGlass = async (cocktails, searchData) =>
  cocktails.filter(cocktail => searchData === cocktail.strGlass);

export const getCocktailsByName = async (cocktails, searchData) =>
  cocktails.filter(cocktail => searchData === cocktail.strDrink);

export const getCocktails = async (
  alertDispatch,
  cocktailDispatch,
  cocktails,
  searchType,
  selectedIngredients,
  searchData,
) => {
  const newCocktails =
    searchType === 'ingredients'
      ? await getCocktailsByIngredient(cocktails, selectedIngredients)
      : searchType === 'name'
      ? await getCocktailsByName(cocktails, searchData)
      : await getCocktailsByGlass(cocktails, searchData);

  await newCocktails.forEach(async (cocktail, cocktailIndex, searchResults) => {
    const youtubeData = await getCocktailsWithYoutubeData(
      cocktail,
      cocktailDispatch,
      searchResults,
    );

    cocktail.youtubeData = youtubeData;

    newCocktails[cocktailIndex] = cocktail;
  });

  const newCocktailsNoDups = newCocktails.filter(
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
  searchResults,
) => {
  if (searchType === 'name' || searchType === 'glass') {
    getCocktails(
      alertDispatch,
      cocktailDispatch,
      cocktails,
      searchType,
      null,
      searchData,
      searchResults,
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
