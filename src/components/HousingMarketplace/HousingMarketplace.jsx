import React, { useContext } from 'react';
import { UserAuthenticationContext } from './context/UserAuthenticationContext';
import { UserLogin } from './components/UserLogin';

export const HousingMarketplace = () => {
  const { signedIn } = useContext(UserAuthenticationContext);

  return (
    <>
      {!signedIn ? (
        <UserLogin />
      ) : (
        <>
          <h6>Logged in</h6>
        </>
      )}
    </>
  );
};
