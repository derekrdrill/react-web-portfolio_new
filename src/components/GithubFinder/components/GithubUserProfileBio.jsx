import React from 'react';

import { GithubContext } from '../context/GithubContext';

export const GithubUserProfileBio = () => {
  const {
    user: { bio },
  } = React.useContext(GithubContext);

  return bio ? (
    <span className='bio'>{bio}</span>
  ) : (
    <>
      N/A
      <span className='default-bio'>
        'Creative, analytical and passionate React Developer with a demonstrated history of
        delivering effective solutions.'
      </span>
    </>
  );
};
