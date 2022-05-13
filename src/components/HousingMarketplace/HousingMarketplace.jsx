import React from 'react';
import { history } from '../../index';
import { Navbar } from './components/Navbar';

export const HousingMarketplace = () => {
  const token = sessionStorage.getItem('token');

  !token && history.push('/housing-marketplace/auth');

  return (
    <Navbar>
      <h6>Logged in</h6>
    </Navbar>
  );
};
