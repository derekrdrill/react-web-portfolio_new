import React, { useContext } from 'react';
import { Navbar } from './components/Navbar';
import { UserAuthenticationContext } from './context/UserAuthenticationContext';
import { UserLogin } from './components/UserLogin';

export const HousingMarketplace = () => {
  const { signedIn } = useContext(UserAuthenticationContext);

  return (
    <>
      {!signedIn ? (
        <UserLogin />
      ) : (
        <Navbar>
          <h6>Logged in</h6>
        </Navbar>
      )}
    </>
  );
};
