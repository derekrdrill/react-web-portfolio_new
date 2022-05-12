import { useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const getLocalStorageValue = (key, initialValue) => {
    const itemFromStorage = localStorage.getItem(key);

    return itemFromStorage ? '' : initialValue;
  };

  const setValue = value => {
    // check if func
    const valueToStore = value instanceof Function ? value(localStorageValue) : value;

    // set state
    setLocalStorageValue(value);

    //set local storage
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  const [localStorageValue, setLocalStorageValue] = useState(() => getLocalStorageValue(key, initialValue));

  return [localStorageValue, setValue];
};
