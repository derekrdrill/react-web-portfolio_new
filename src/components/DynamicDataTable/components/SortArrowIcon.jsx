import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltDown, faLongArrowAltUp } from '@fortawesome/fontawesome-free-solid';

export const SortArrowIcon = ({ headerID, sortColumn, sortType }) =>
  headerID === sortColumn ? (
    sortType === 'asc' ? (
      <FontAwesomeIcon className='arrow-down' icon={faLongArrowAltDown} />
    ) : sortType === 'desc' ? (
      <FontAwesomeIcon className='arrow-up' icon={faLongArrowAltUp} />
    ) : null
  ) : null;

SortArrowIcon.propTypes = {};
