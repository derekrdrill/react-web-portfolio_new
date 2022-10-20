import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, Typography } from '@mui/material';

export const CustomHookExample1Element = ({ loading, data }) =>
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

CustomHookExample1Element.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.object,
};
