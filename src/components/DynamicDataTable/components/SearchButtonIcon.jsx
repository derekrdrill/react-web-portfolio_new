import React from 'react';
import PropTypes from 'prop-types';

import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';

export const SearchButtonIcon = ({ filtersDisplay }) =>
  filtersDisplay ? <SearchOffIcon className='search-off' /> : <SearchIcon className='search-on' />;

SearchButtonIcon.propTypes = {
  filtersDisplay: PropTypes.bool,
};
