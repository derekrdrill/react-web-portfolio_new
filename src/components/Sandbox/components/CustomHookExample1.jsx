import React from 'react';
import { useFetch } from '../../../hooks/useFetch';

import { CustomHookExample1Element } from './CustomHookExample1Element';

export const CustomHookExample1 = () => {
  const { data, loading } = useFetch('https://jsonplaceholder.typicode.com/posts', {});

  return <CustomHookExample1Element loading={loading} data={data} />;
};
