export const handleAlert = (msg, title, type, alertDispatch) => {
  alertDispatch({
    type: 'SET_ALERT',
    fadeOut: false,
    payload: { msg: msg, title: title, type: type },
  });

  setTimeout(() => alertDispatch({ type: 'FADE_ALERT', fadeOut: true }), 2000);
  setTimeout(() => alertDispatch({ type: 'REMOVE_ALERT' }), 2400);
};
