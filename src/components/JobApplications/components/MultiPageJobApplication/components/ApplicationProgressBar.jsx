import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from '../../../../ProgressBar/ProgressBar';

export const ApplicationProgressBar = ({ page, maxPage, progress }) =>
  page <= maxPage && <ProgressBar progress={progress} page={page} />;

ApplicationProgressBar.propTypes = {
  maxPage: PropTypes.number,
  page: PropTypes.number,
  progress: PropTypes.number,
};
