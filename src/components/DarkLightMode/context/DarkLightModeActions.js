export const handleSetDarkMode = (darkMode, darkLightModeDispatch) => {
  localStorage.setItem('darkMode', JSON.stringify(!darkMode));

  darkLightModeDispatch({
    type: 'SET_DARK_MODE',
    darkMode: !darkMode,
  });
};
