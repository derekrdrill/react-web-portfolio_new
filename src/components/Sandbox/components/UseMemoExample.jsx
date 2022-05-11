import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { SettingsInputComponent } from '@mui/icons-material';

export const UseMemoExample = () => {
  const [number, setNumber] = useState(1);
  const [count, setCount] = useState(0);
  const renders = useRef(1);

  const handleSetNumber = e => setNumber(e.currentTarget.value);

  const getSqRt = number => {
    for (let i = 0; i < 10000; i++) {
      console.log(i);
    }

    console.log('Expensive function called');
    return Math.sqrt(number);
  };

  const sqRt = useMemo(() => getSqRt(number), [number]);

  const handleReRenderClick = () => {
    setCount(prevCount => {
      console.log(prevCount + 1);
      return prevCount + 1;
    });
  };

  useEffect(() => {
    renders.current = renders.current + 1;
  });

  return (
    <div>
      <TextField label='Number' onChange={handleSetNumber} type='number' />
      <Typography paragraph>Renders: {renders.current}</Typography>
      <Typography paragraph>Square Root of Number is {sqRt}</Typography>
      <Button onClick={handleReRenderClick} variant='contained'>
        Re-render
      </Button>
    </div>
  );
};
