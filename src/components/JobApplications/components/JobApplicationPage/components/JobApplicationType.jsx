import React from 'react';
import PropTypes from 'prop-types';

import { BasicJobApplication } from '../../BasicJobApplication/BasicJobApplication';
import { AdvancedJobApplication } from '../../AdvancedJobApplication/AdvancedJobApplication';
import { MultiPageJobApplication } from '../../MultiPageJobApplication/MultiPageJobApplication';

export const JobApplicationType = ({ appType }) =>
  appType === 'basic' ? (
    <BasicJobApplication />
  ) : appType === 'advanced' ? (
    <AdvancedJobApplication />
  ) : (
    <MultiPageJobApplication />
  );

JobApplicationType.propTypes = {
  appType: PropTypes.string,
};
