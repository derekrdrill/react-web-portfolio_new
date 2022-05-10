import React, { useState } from 'react';
import { ToDo } from './ToDo';
import { Button } from '@mui/material';

export const UseRefExample3 = () => {
  const [showToDo, setShowToDo] = useState(true);
  const handleSetShowToDo = () => setShowToDo(!showToDo);

  return (
    <div>
      {showToDo && <ToDo />}
      <Button onClick={handleSetShowToDo} variant='contained'>
        Toggle To Do
      </Button>
    </div>
  );
};
