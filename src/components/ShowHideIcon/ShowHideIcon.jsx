import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { EyeIcon } from './components/EyeIcon';

export const ShowHideIcon = ({ onClick }) => {
  const [locked, setLocked] = useState(true);
  const handleSetLocked = () => setLocked(!locked);

  return (
    <EyeIcon
      locked={locked}
      onClick={
        /* istanbul ignore next */
        () => {
          handleSetLocked();
          onClick && onClick();
        }
      }
    />
  );
};

ShowHideIcon.propTypes = {
  onClick: PropTypes.func,
};


