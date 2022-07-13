export const handleSetDarkMode = (darkMode, darkLightModeDispatch) => {
  // localStorage.removeItem('darkMode');
  localStorage.setItem('darkMode', JSON.stringify(!darkMode));

  darkLightModeDispatch({
    type: 'SET_DARK_MODE',
    darkMode: !darkMode,
  });
};
