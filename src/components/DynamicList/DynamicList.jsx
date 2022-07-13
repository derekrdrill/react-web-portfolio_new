import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Grid, Typography, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/fontawesome-free-solid';

import { DarkLightModeContext } from '../DarkLightMode/context/DarkLightModeContext';

export const DynamicList = props => {
  const { darkMode } = useContext(DarkLightModeContext);

  const maxRows = props.maxRows || 5;
  const minRows = props.minRows || 1;
  const [rowCount, setRowCount] = useState([{ id: minRows }]);

  const addRow = () => {
    const rowArr = rowCount.map(row => row.id);
    const rowArrSort = rowArr.sort((a, b) => a - b);
    const rowArrLen = rowArr.length;
    const newRowID = rowArrSort[rowArrLen - 1] + 1;
    setRowCount([...rowCount, { id: newRowID }]);
  };

  const removeRow = id => setRowCount(rowCount.filter(row => row.id !== id));

  return (
    <Grid container justifyContent='center'>
      <DynamicListTitle variant='h6'>{props.title}</DynamicListTitle>
      {rowCount.map(row => (
        <DynamicListContainer key={row.id} container>
          <Grid item xs={12} sm={10} md={11}>
            {props.children}
          </Grid>
          <Grid item xs={12} sm={2} md={1}>
            <DynamicListButton
              darkMode={darkMode}
              onClick={addRow}
              disabled={rowCount.length === maxRows}
              iconcolor={props.addColor}
            >
              <FontAwesomeIcon icon={faPlus} />
            </DynamicListButton>
            <DynamicListButton
              onClick={() => removeRow(row.id)}
              darkMode={darkMode}
              disabled={rowCount.length === minRows}
              iconcolor={props.removeColor}
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

const DynamicListTitle = styled(Typography)({
  marginBottom: 10,
});

const DynamicListButton = styled(Button)(({ darkMode, iconcolor }) => ({
  color: darkMode ? '#3b3b3b' : iconcolor || '#1976d2',
}));

const DynamicListContainer = styled(Grid)({
  marginBottom: 20,
});
