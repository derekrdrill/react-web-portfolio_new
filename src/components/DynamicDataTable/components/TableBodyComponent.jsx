import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Checkbox, IconButton, TableBody, TableCell, TableRow } from '@mui/material';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SaveIcon from '@mui/icons-material/Save';

export const TableBodyComponent = ({
  checkOneColor,
  checkedRows,
  darkMode,
  dataRows,
  editingID,
  filterColumn,
  filterValue,
  handleCheckOneRow,
  handleEditRow,
  handleRowInputChange,
  handleSaveEdits,
  handleSetDeleteRow,
  selectedRowColor,
  selectedRowFontColor,
  tableBodyColor,
}) => {
  return (
    <TableBodyStyled darkMode={darkMode}>
      {dataRows
        .filter(dataRow => dataRow[filterColumn].toUpperCase().startsWith(filterValue))
        .map(dataRow => (
          <TableBodyRow
            key={dataRow._id}
            darkMode={darkMode}
            selected={checkedRows.includes(dataRow._id)}
            selectedcolor={selectedRowColor}
            selectedfontcolor={selectedRowFontColor}
            tablebodycolor={tableBodyColor}
          >
            <TableCell>
              <Checkbox
                id={dataRow._id}
                color={darkMode ? 'primary' : checkOneColor}
                onChange={handleCheckOneRow}
                checked={checkedRows.includes(dataRow._id)}
              />
              <RemoveRecordIcon
                className='edit-delete-icon'
                id={dataRow._id}
                darkMode={darkMode}
                onClick={handleSetDeleteRow}
              >
                <DeleteForeverIcon />
              </RemoveRecordIcon>
              {editingID != dataRow._id ? (
                <EditRecordIcon
                  className='edit-delete-icon'
                  id={dataRow._id}
                  darkMode={darkMode}
                  onClick={handleEditRow}
                >
                  <DriveFileRenameOutlineIcon />
                </EditRecordIcon>
              ) : (
                <SaveRecordIcon id={dataRow._id} onClick={handleSaveEdits}>
                  <SaveIcon />
                </SaveRecordIcon>
              )}
            </TableCell>
            {Object.entries(dataRow)
              .slice(1)
              .map(dataRowInfo => (
                <TableCell key={dataRowInfo[0]}>
                  <TableBodyCellInput
                    id={dataRowInfo[0]}
                    darkMode={darkMode}
                    value={dataRowInfo[1]}
                    isediting={dataRow._id === editingID}
                    disabled={dataRow._id !== editingID}
                    onChange={handleRowInputChange}
                  />
                </TableCell>
              ))}
          </TableBodyRow>
        ))}
    </TableBodyStyled>
  );
};

TableBodyComponent.propTypes = {
  checkOneColor: PropTypes.string,
  checkedRows: PropTypes.array,
  darkMode: PropTypes.bool,
  dataRows: PropTypes.array,
  editingID: PropTypes.string,
  filterColumn: PropTypes.string,
  filterValue: PropTypes.string,
  handleCheckOneRow: PropTypes.func,
  handleEditRow: PropTypes.func,
  handleRowInputChange: PropTypes.func,
  handleSaveEdits: PropTypes.func,
  handleSetDeleteRow: PropTypes.func,
  selectedRowColor: PropTypes.string,
  selectedRowFontColor: PropTypes.string,
  tableBodyColor: PropTypes.string,
};

export const EditRecordIcon = styled(IconButton)(({ darkMode }) => ({
  color: darkMode ? '#1a1a1a' : '#2B7494',
  cursor: 'pointer',
  ':hover': {
    color: darkMode ? '#1a1a1a' : '#3C99DC',
  },
}));

export const RemoveRecordIcon = styled(IconButton)(({ darkMode }) => ({
  color: darkMode ? '#1a1a1a' : '#B22222',
  cursor: 'pointer',
  ':hover': {
    color: darkMode ? '#121212' : '#800000',
  },
}));

export const SaveRecordIcon = styled(IconButton)({
  color: 'forestgreen',
  cursor: 'pointer',
  ':hover': {
    color: 'green',
  },
});

export const TableBodyRow = styled(TableRow)(
  ({ darkMode, selectedfontcolor, selectedcolor, tablebodycolor }) => ({
    '&.Mui-selected': {
      backgroundColor: darkMode ? '#222d49' : selectedcolor,
      td: {
        input: {
          color: darkMode ? 'gainsboro' : selectedfontcolor,
        },
        '.edit-delete-icon': {
          ':hover': {
            svg: {
              color: darkMode ? 'lightgrey' : 'inherit',
            },
          },
          svg: {
            color: darkMode ? 'grey' : 'inherit',
          },
        },
      },
      ':hover': {
        backgroundColor: darkMode ? '#222d49' : selectedcolor,
      },
    },
    ':hover': {
      opacity: darkMode ? 0.9 : 0.8,
    },
    backgroundColor: darkMode ? 'grey' : tablebodycolor,
  }),
);

export const TableBodyCellInput = styled.input(({ darkMode, isediting }) => ({
  backgroundColor: isediting ? 'white' : 'transparent',
  border: isediting ? '1px grey solid' : 'none',
  borderRadius: 2,
  color: darkMode ? 'black' : 'inherit',
}));

export const TableBodyStyled = styled(TableBody)(({ darkMode }) => ({
  backgroundColor: darkMode ? 'darkgrey' : 'white',
}));
