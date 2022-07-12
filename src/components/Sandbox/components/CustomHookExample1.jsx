import React from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { List, ListItem, Typography } from '@mui/material';

export const CustomHookExample1Return = ({ loading, data }) =>
  loading ? (
    <Typography className='loading' component='h4' variant='h4'>
      Loading...
    </Typography>
  ) : (
    <List className='list'>
      {data.map(item => (
        <ListItem key={item.id}>{item.title}</ListItem>
      ))}
    </List>
  );

export const CustomHookExample1 = () => {
  const { data, loading } = useFetch('https://jsonplaceholder.typicode.com/posts', {});

  return <CustomHookExample1Return loading={loading} data={data} />;
};
