import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltDown, faLongArrowAltUp } from '@fortawesome/fontawesome-free-solid';

export const SortArrowIcon = ({ headerID, sortColumn, sortType }) =>
  headerID === sortColumn ? (
    sortType === 'asc' ? (
      <FontAwesomeIcon className='arrow-up' icon={faLongArrowAltUp} />
    ) : sortType === 'desc' ? (
      <FontAwesomeIcon className='arrow-down' icon={faLongArrowAltDown} />
    ) : null
  ) : null;

SortArrowIcon.propTypes = {
  headerID: PropTypes.string,
  sortColumn: PropTypes.string,
  sortType: PropTypes.string,
};
