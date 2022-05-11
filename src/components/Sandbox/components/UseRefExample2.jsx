import React, { useEffect, useRef, useState } from 'react';
import { TextField, Typography } from '@mui/material';

export const UseRefExample2 = () => {
  const [inputText, setInputText] = useState('');
  const renders = useRef(1);
  const prevText = useRef('');
  const handleSetInpuText = e => setInputText(e.currentTarget.value);

  useEffect(() => {
    renders.current = renders.current + 1;
    prevText.current = inputText;
  }, [inputText]);

  return (
    <>
      <Typography component='h2' variant='h5'>
        Renders: {renders.current}
      </Typography>
      <Typography component='h2' variant='h6'>
        Previous Text: {prevText.current}
      </Typography>
      <div>
        <TextField label='Input' onChange={handleSetInpuText} placeholder='Type something...' value={inputText} />
      </div>
    </>
  );
};
