import React, { useState } from 'react';
import { EyeIcon } from './components/EyeIcon';

export const ShowHideIcon = ({ onClick }) => {
  const [locked, setLocked] = useState(true);
  const handleSetLocked = () => setLocked(!locked);

  return (
    <EyeIcon
      locked={locked}
      onClick={() => {
        handleSetLocked();
        onClick && onClick();
      }}
    />
  );
};


