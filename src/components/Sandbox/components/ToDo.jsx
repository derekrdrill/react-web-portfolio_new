import React, { useEffect, useState, useRef } from 'react';
import { Typography } from '@mui/material';

export const ToDoTitle = ({ loading, toDo }) => (loading ? 'Loading...' : toDo.title);

export const ToDo = () => {
  const [loading, setLoading] = useState(false);
  const [toDo, setToDo] = useState({});

  const isMounted = useRef(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(res => res.json())
      .then(data => {
        if (isMounted.current) {
          setTimeout(() => {
            setToDo(data);
            setLoading(false);
          }, 3000);
        }
      });

    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  return (
    <Typography variant='h6' component='h6'>
      <ToDoTitle loading={loading} toDo={toDo} />
    </Typography>
  );
};
