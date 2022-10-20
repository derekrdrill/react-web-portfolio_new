import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

export const MoveAllColumnsButton = ({ children, endIcon, onClick }) => (
  <Button color='secondary' endIcon={endIcon} fullWidth onClick={onClick} variant='contained'>
    {children}
  </Button>
);

MoveAllColumnsButton.propTypes = {
  children: PropTypes.node,
  endIcon: PropTypes.node,
  onClick: PropTypes.func,
};
