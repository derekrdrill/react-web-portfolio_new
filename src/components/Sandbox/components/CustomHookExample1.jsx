import React from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { List, ListItem, Typography } from '@mui/material';

export const CustomHookExample1 = () => {
  const { data, loading } = useFetch('https://jsonplaceholder.typicode.com/posts', {});

  if (loading) {
    return (
      <Typography component='h4' variant='h4'>
        Loading...
      </Typography>
    );
  }

  return (
    <List>
      {data.map(item => (
        <ListItem key={item.id}>{item.title}</ListItem>
      ))}
    </List>
  );
};
