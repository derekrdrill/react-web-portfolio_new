import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

export const MoveAllColumnsButton = ({ children, endIcon, onClick }) => (
  <Button children={children} color='secondary' endIcon={endIcon} fullWidth onClick={onClick} variant='contained' />
);
