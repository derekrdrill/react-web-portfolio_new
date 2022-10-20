import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Grid, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/fontawesome-free-solid';

import { DarkLightModeContext } from '../DarkLightMode/context/DarkLightModeContext';

export const addRow = (rowCount, setRowCount) => {
  const rowArr = rowCount.map(row => row.id);
  const rowArrSort = rowArr.sort((a, b) => a - b);
  const rowArrLen = rowArr.length;
  const newRowID = rowArrSort[rowArrLen - 1] + 1;
  setRowCount([...rowCount, { id: newRowID }]);

  return [...rowCount, { id: newRowID }];
};

export const removeRow = (id, rowCount, setRowCount) => {
  let newRowCount = rowCount.filter(row => row.id !== id);
  setRowCount(newRowCount);
  return newRowCount;
};

export const DynamicList = ({ addColor, children, maxRows, minRows, removeColor, title }) => {
  const { darkMode } = React.useContext(DarkLightModeContext);
  const [rowCount, setRowCount] = useState([{ id: minRows }]);

  return (
    <Grid container justifyContent='center'>
      <DynamicListTitle variant='h6'>{title}</DynamicListTitle>
      {rowCount.map(row => (
        <DynamicListContainer key={row.id} container>
          <Grid item xs={12} sm={10} md={11}>
            {children}
          </Grid>
          <Grid item xs={12} sm={2} md={1}>
            <DynamicListButton
              darkMode={darkMode}
              onClick={
                /* istanbul ignore next */
                () => addRow(rowCount, setRowCount)
              }
              disabled={rowCount.length === (maxRows || 5)}
              iconcolor={addColor}
            >
              <FontAwesomeIcon icon={faPlus} />
            </DynamicListButton>
            <DynamicListButton
              onClick={
                /* istanbul ignore next */
                () => removeRow(row.id, rowCount, setRowCount)
              }
              darkMode={darkMode}
              disabled={rowCount.length === (minRows || 1)}
              iconcolor={removeColor}
            >
              <FontAwesomeIcon icon={faTrash} />
            </DynamicListButton>
          </Grid>
          <hr />
        </DynamicListContainer>
      ))}
    </Grid>
  );
};

DynamicList.propTypes = {
  addColor: PropTypes.string,
  children: PropTypes.node,
  maxRows: PropTypes.number,
  minRows: PropTypes.number,
  removeColor: PropTypes.string,
  title: PropTypes.string,
};

export const DynamicListTitle = styled(Typography)({
  marginBottom: 10,
});

export const DynamicListButton = styled(Button)(({ darkMode, iconcolor }) => ({
  ':hover': {
    color: darkMode && '#b9c7d4',
  },
  '&.Mui-disabled': {
    color: darkMode && '#4d4d4d',
  },
  color: darkMode ? '#879eb5' : iconcolor || '#1976d2',
}));

export const DynamicListContainer = styled(Grid)({
  marginBottom: 20,
});
