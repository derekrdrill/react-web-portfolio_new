import { handleAlert } from '../../Alert/context/AlertActions';

export const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const allFieldsFilled = fields => {
  const allFieldsFilled = Object.values(fields).every(field => field !== null && field !== '');

  return !allFieldsFilled;
};

export const addUserItem = async (userItem, alertDispatch, userAuthenticationDispatch) => {
  const response = await fetch('../addUser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userItem),
  }).catch(e => console.warn(e));

  if (!response.ok) {
    console.warn(Promise.reject(response));
  } else {
    const { email } = await response.json();

    const msg = `An account has been created under the email of ${email}`;

    userAuthenticationDispatch({ type: 'SIGN_IN' });
    handleAlert(msg, 'Successful sign-up', 'success', alertDispatch);
  }
};

export const validateUserItem = async userItem => {
  const { email, username, password, confirmPassword } = userItem;

  if (password !== confirmPassword) {
    return 'Passwords do not match';
  } else if (!validateEmail(email)) {
    return 'Email entered is not valid';
  } else {
    const response = await fetch(`../checkForUser/${email}/${username}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).catch(e => console.warn(e));

    if (response.ok) {
      const { msg } = await response.json();

      if (msg) {
        return msg;
      }
    }
  }

  return null;
};

export const handleSubmit = async (userItem, alertDispatch, userAuthenticationDispatch) => {
  const validationMsg = await validateUserItem(userItem);

  if (validationMsg) {
    handleAlert(validationMsg, 'Sign-up error', 'error', alertDispatch);
  } else {
    const { firstName, lastName, email, username, password } = userItem;

    addUserItem(
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        userName: username,
        password: password,
      },
      alertDispatch,
      userAuthenticationDispatch,
    );
  }
};

export const handleSendResetEmail = async (email, alertDispatch, userAuthenticationDispatch) => {
  if (validateEmail(email)) {
    const response = await fetch(`../forgot-password/${email}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).catch(e => console.warn(e));

    if (response.ok) {
      const { userFound } = await response.json();

      if (userFound) {
        userAuthenticationDispatch({ type: 'SIGN_IN' });
        handleAlert('Password reset instructions have been sent', 'Check your email', 'success', alertDispatch);
      } else {
        handleAlert(
          'There is not an account associated with the email provided',
          'No account found',
          'error',
          alertDispatch,
        );
      }
    } else {
      console.warn(Promise.reject(response));
    }
  } else {
    handleAlert('Please provide a valid email', 'Invalid email provided', 'error', alertDispatch);
  }
};
