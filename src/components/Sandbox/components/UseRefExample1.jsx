import React, { useRef } from 'react';
import { Button, TextField } from '@mui/material';

export const UseRefExample1 = () => {
  const inputRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(inputRef.current.value);
  };

  return (
    <>
      <div>
        <TextField label='Input' placeholder='Type something...' inputRef={inputRef} />
      </div>
      <Button onClick={handleSubmit} variant='contained'>
        Submit
      </Button>
    </>
  );
};
