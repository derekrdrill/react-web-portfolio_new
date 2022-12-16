import axios from 'axios';

const COCKTAIL_FILTER_URL = process.env.REACT_APP_COCKTAIL_FILTER_URL;
const COCKTAIL_SEARCH_URL = process.env.REACT_APP_COCKTAIL_SEARCH_URL;
const COCKTAIL_INGREDIENTS_LIST_URL = process.env.REACT_APP_COCKTAIL_INGREDIENTS_LIST_URL;
const COCKTAIL_KEY = process.env.REACT_APP_COCKTAIL_KEY;
const COCKTAIL_HOST = process.env.REACT_APP_COCKTAIL_HOST;

export const getAllIngredients = cocktailDispatch => {
  const options = {
    method: 'GET',
    url: COCKTAIL_INGREDIENTS_LIST_URL,
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
        cocktails: response.data.drinks,
      });
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const getSearchOptions = (searchType, cocktails, ingredients) =>
  searchType === 'name' && cocktails.length > 0
    ? cocktails.map(option => option.strDrink).sort()
    : searchType === 'ingredients' && ingredients.length > 0
    ? ingredients.map(option => option.strIngredient1).sort()
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
  } else {
    axios
      .request(options)
      .then(function (response) {
        cocktailDispatch({
          type: 'SET_SEARCH_RESULTS',
          searchResults: response.data.drinks,
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }
};

export const getCocktailsByIngredient = async (selectedIngredients, cocktailDispatch) => {
  const formattedIngredients = selectedIngredients.map(ingredient => ingredient.replace(/ /g, '_'));
  const ingredientsString = await formattedIngredients.join(',');

  const options1 = {
    method: 'GET',
    url: COCKTAIL_FILTER_URL,
    params: { i: ingredientsString },
    headers: {
      'X-RapidAPI-Key': COCKTAIL_KEY,
      'X-RapidAPI-Host': COCKTAIL_HOST,
    },
  };

  axios
    .request(options1)
    .then(function (response) {
      let newReturnedData = [];

      response.data.drinks.forEach(async drink => {
        const options2 = {
          method: 'GET',
          url: COCKTAIL_SEARCH_URL,
          params: { s: drink.strDrink },
          headers: {
            'X-RapidAPI-Key': COCKTAIL_KEY,
            'X-RapidAPI-Host': COCKTAIL_HOST,
          },
        };

        await axios
          .request(options2)
          .then(function (response) {
            console.log(response);

            newReturnedData = [...newReturnedData, ...response.data.drinks];
          })
          .catch(function (error) {
            console.error(error);
          });

        cocktailDispatch({
          type: 'SET_SEARCH_RESULTS',
          searchResults: newReturnedData,
        });
      });
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const handleSearchBarChange = async (cocktailDispatch, searchData, searchType) => {
  if (searchType === 'name') {
    getCocktailByName(searchData, cocktailDispatch);
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
    type: 'SET_SELECTED_INGREDIENTS',
    selectedIngredients: [],
  });
};
