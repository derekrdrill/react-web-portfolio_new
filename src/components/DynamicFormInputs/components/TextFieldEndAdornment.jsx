import React from 'react';
import PropTypes from 'prop-types';

import { ShowHideIcon } from '../../ShowHideIcon/ShowHideIcon';

export const handleSetPasswordHidden = (passwordHidden, setPasswordHidden) => {
  setPasswordHidden(!passwordHidden);
  return !passwordHidden;
};

export const TextFieldEndAdornment = ({ passwordHidden, setPasswordHidden, type }) =>
  type === 'password' && (
    <ShowHideIcon
      onClick={
        /* istanbul ignore next */
        () => handleSetPasswordHidden(passwordHidden, setPasswordHidden)
      }
    />
  );

TextFieldEndAdornment.propTypes = {
  passwordHidden: PropTypes.bool,
  setPasswordHidden: PropTypes.func,
  type: PropTypes.string,
};
