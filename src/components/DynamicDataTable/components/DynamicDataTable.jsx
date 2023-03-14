import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import styled from 'styled-components';
import {
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  Typography,
  IconButton,
  Grid,
  Alert,
  Snackbar,
} from '@mui/material';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

import { TableBodyComponent } from './TableBodyComponent';
import { FilterInput } from './FilterInput';
import { SearchButtonIcon } from './SearchButtonIcon';
import { SortArrowIcon } from './SortArrowIcon';
import { MessageModal } from '../../Modals/MessageModal';
import { LoaderSpinner } from '../../LoaderSpinner/LoaderSpinner';

export const getSelectRowsLabel = allRowsSelected =>
  allRowsSelected ? 'Deselect all' : 'Select all';

export const getFiltersLabel = filtersDisplay => (filtersDisplay ? 'No filters' : 'Filters');

export const DynamicDataTable = ({
  checkAllColor,
  checkOneColor,
  deleteDataRowsAPICall,
  deleteDataRowNameItems,
  deleteSelectedButtonColor,
  editDataRowsAPICall,
  getDataRowsAPICall,
  isDeletable,
  isEditable,
  isFilterable,
  isResetable,
  headers,
  loadedDataRows,
  selectedRowColor = 'lightcoral',
  selectedRowFontColor = 'black',
  size,
  stickyHeader = true,
  tableBodyColor = 'beige',
}) => {
  const { darkMode } = React.useContext(DarkLightModeContext);

  const [allRowsSelected, setAllRowsSelected] = useState(false);
  const [checkedRows, setCheckRows] = useState([]);
  const [dataRows, setDataRows] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteRowID, setDeleteRowID] = useState(null);
  const [dataRowsKeys, setDataRowsKeys] = useState([]);
  const [dataRowDeleteName, setDataRowDeleteName] = useState('');
  const [editAlertOpen, setEditAlertOpen] = useState(false);
  const [filterColumn, setFilterColunmn] = useState(headers[0].headerID);
  const [filtersDisplay, setFilterDisplay] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [editingID, setEditingID] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortType, setSortType] = useState(null);

  const handleGetDataRowsAPICall = React.useCallback(() => {
    fetch(getDataRowsAPICall)
      .then(response => response.json())
      .then(json => {
        setDataRows(json);
        setDataRowsKeys(Object.keys(json[0]));
      });
  }, [getDataRowsAPICall]);

  const handleDeleteDataRowsAPICall = deleteRowID => {
    fetch(`${deleteDataRowsAPICall}/${deleteRowID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  };

  const handleEditDataRowsAPICall = () => {
    fetch(`${editDataRowsAPICall}`, {
      method: 'POST',
      body: JSON.stringify(editingRow),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  const handleDeleteModalOpen = () => setDeleteModalOpen(true);

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
    setDeleteRowID(null);
  };

  const handleTableReset = () => {
    setAllRowsSelected(false);
    setCheckRows([]);
    setDataRows([]);
    setEditingID(null);
    setEditingRow(null);
    setFilterColunmn(headers[0].headerID);
    setFilterDisplay(false);
    setFilterValue('');
    setSortColumn(null);
    setSortType(null);
    $('.filter').val('');

    handleGetDataRowsAPICall();
  };

  const handleTableSort = e => {
    let columnID = e.currentTarget.id;

    const sortColumn = () => {
      dataRows.sort((a, b) => {
        let isANumber = typeof a[columnID] === 'number';
        let sortItemA = isANumber ? a[columnID] : a[columnID].toUpperCase();
        let sortItemB = isANumber ? b[columnID] : b[columnID].toUpperCase();

        if (sortType === 'asc') {
          return sortItemA > sortItemB ? -1 : 1;
        } else {
          return sortItemA < sortItemB ? -1 : 1;
        }
      });
    };

    setSortColumn(columnID);
    setSortType(sortType === 'asc' ? 'desc' : 'asc');
    sortColumn();
  };

  const handleFilter = e => {
    setFilterColunmn(e.currentTarget.id);
    setFilterValue(e.target.value.toUpperCase());
  };

  const handleCheckOneRow = e => {
    let checkedRowID = e.target.id;
    let checked = e.target.checked;

    if (checked) {
      setCheckRows([...checkedRows, checkedRowID]);

      setAllRowsSelected(checkedRows.length === dataRows.length - 1);
    } else {
      setCheckRows(checkedRows.filter(arrID => arrID != checkedRowID));
      setAllRowsSelected(false);
    }
  };

  const handleCheckAllRows = e => {
    if (e.target.checked) {
      setCheckRows(dataRows.map(dataRow => dataRow._id));
      setAllRowsSelected(true);
    } else {
      setCheckRows([]);
      setAllRowsSelected(false);
    }
  };

  const handleRowInputChange = e => {
    let editColumn = e.target.id;
    let editColumnValue = e.target.value;
    let editRowIndex = dataRows.findIndex(dataRow => dataRow._id === editingID);
    let newArr = [...dataRows];

    newArr[editRowIndex][editColumn] = editColumnValue;
    setEditingRow(newArr[editRowIndex]);
    setDataRows(newArr);
  };

  const handleEditRow = e => {
    setEditingID(e.currentTarget.id);
  };

  const handleSaveEdits = async () => {
    if (editingRow) {
      await handleEditDataRowsAPICall();
      setEditAlertOpen(true);
      setEditingID(null);
    }

    setEditingID(null);
  };

  const handleEditAlertClose = () => {
    setEditAlertOpen(false);
  };

  const handleSetDeleteRow = e => {
    let pendingDeleteRow = dataRows.find(dataRow => dataRow._id === e.currentTarget.id);
    let formattedDeleteRowName = ``;

    deleteDataRowNameItems.forEach(deleteRowItem => {
      if (dataRowsKeys.includes(deleteRowItem)) {
        formattedDeleteRowName += `${pendingDeleteRow[deleteRowItem]}`;
      } else {
        formattedDeleteRowName += `${deleteRowItem}`;
      }
    });

    setDataRowDeleteName(formattedDeleteRowName);
    setDeleteRowID(e.currentTarget.id);
    handleDeleteModalOpen();
  };

  const handleDeleteSelectedRows = () => {
    handleDeleteModalClose();
    setLoading(true);

    const deleteFromDataRows = deleteRow => {
      let rowIDIndex = dataRows.findIndex(dataRow => dataRow._id === deleteRow);
      let removeDataRow = dataRows.splice(rowIDIndex, 1)[0];

      setDataRows(dataRows.filter(dataRow => dataRow != removeDataRow));

      handleDeleteDataRowsAPICall(deleteRow);
    };

    setTimeout(() => {
      setLoading(false);

      if (deleteRowID) {
        deleteFromDataRows(deleteRowID);
        return false;
      }

      checkedRows.map(checkedRow => {
        deleteFromDataRows(checkedRow);
      });
    }, 1000);
  };

  useEffect(
    /* istanbul ignore next */
    () => handleGetDataRowsAPICall(),
    [handleGetDataRowsAPICall],
  );

  useEffect(() => {
    if (loadedDataRows && loadedDataRows.length > 0) {
      setDataRows(loadedDataRows);
    }
  }, [loadedDataRows]);

  return (
    <TableHolder>
      <TableContainerStyled>
        <TableStyled darkMode={darkMode} size={size} stickyHeader={stickyHeader}>
          <TableHead>
            <TableRow>
              {(isDeletable || isEditable || isFilterable || isResetable) && (
                <TableToolsCell darkMode={darkMode}>
                  <Grid container>
                    {isDeletable && (
                      <Grid item xs={12} md={3}>
                        <Grid container display={{ xs: 'none', lg: 'inline-block' }}>
                          <TableToolsText variant='body2' component='h1'>
                            {getSelectRowsLabel(allRowsSelected)}
                          </TableToolsText>
                        </Grid>
                        <Grid container>
                          <CheckboxStyled
                            checked={allRowsSelected}
                            color={checkAllColor}
                            darkMode={darkMode}
                            onChange={handleCheckAllRows}
                          />
                        </Grid>
                      </Grid>
                    )}
                    {isFilterable && (
                      <Grid item xs={12} md={3}>
                        <Grid
                          container
                          justifyContent='center'
                          display={{ xs: 'none', lg: 'inline-block' }}
                        >
                          <TableToolsText variant='body2' component='h1' textAlign='center'>
                            {getFiltersLabel(filtersDisplay)}
                          </TableToolsText>
                        </Grid>
                        <Grid container justifyContent='center'>
                          <SearchButton
                            darkMode={darkMode}
                            onClick={
                              /* istanbul ignore next */
                              () => setFilterDisplay(!filtersDisplay)
                            }
                          >
                            <SearchButtonIcon filtersDisplay={filtersDisplay} />
                          </SearchButton>
                        </Grid>
                      </Grid>
                    )}
                    {isResetable && (
                      <Grid item xs={12} md={3}>
                        <Grid
                          container
                          justifyContent='center'
                          display={{ xs: 'none', lg: 'inline-block' }}
                        >
                          <TableToolsText variant='body2' component='h1' textAlign='center'>
                            Reset
                          </TableToolsText>
                        </Grid>
                        <Grid container justifyContent='center'>
                          <ResetButton darkMode={darkMode} onClick={handleTableReset}>
                            <RotateLeftIcon />
                          </ResetButton>
                        </Grid>
                      </Grid>
                    )}
                    {isDeletable && (
                      <Grid item xs={12} md={3}>
                        <Grid
                          container
                          justifyContent='center'
                          display={{ xs: 'none', lg: 'inline-block' }}
                        >
                          <TableToolsText variant='subtitle2' component='h1' textAlign='center'>
                            Selected
                          </TableToolsText>
                        </Grid>
                        <Grid container justifyContent='center'>
                          <SelectedRowsText variant='h6' component='h1'>
                            {checkedRows.length}
                          </SelectedRowsText>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </TableToolsCell>
              )}
              {headers.map(header => (
                <TableCellStyled key={header.headerID} darkMode={darkMode}>
                  <Grid container>
                    <TableHeadCellText
                      id={header.headerID}
                      component='h1'
                      darkMode={darkMode}
                      variant='body1'
                      onClick={handleTableSort}
                    >
                      {header.headerName}
                      &nbsp;
                      <SortArrowIcon
                        headerID={header.headerID}
                        sortColumn={sortColumn}
                        sortType={sortType}
                      />
                    </TableHeadCellText>
                  </Grid>
                  <Grid container>
                    <FilterInput
                      filtersDisplay={filtersDisplay}
                      handleFilter={handleFilter}
                      headerID={header.headerID}
                    />
                  </Grid>
                </TableCellStyled>
              ))}
            </TableRow>
          </TableHead>
          <TableBodyComponent
            checkOneColor={checkOneColor}
            checkedRows={checkedRows}
            darkMode={darkMode}
            dataRows={dataRows}
            editingID={editingID}
            filterColumn={filterColumn}
            filterValue={filterValue}
            handleCheckOneRow={handleCheckOneRow}
            handleEditRow={handleEditRow}
            handleRowInputChange={handleRowInputChange}
            handleSaveEdits={handleSaveEdits}
            handleSetDeleteRow={handleSetDeleteRow}
            isDeletable={isDeletable}
            isEditable={isEditable}
            isFilterable={isFilterable}
            selectedRowColor={selectedRowColor}
            selectedRowFontColor={selectedRowFontColor}
            tableBodyColor={tableBodyColor}
          />
        </TableStyled>
      </TableContainerStyled>
      {isDeletable && (
        <Button
          color={deleteSelectedButtonColor || 'warning'}
          variant='contained'
          onClick={handleDeleteModalOpen}
        >
          Delete Selected
        </Button>
      )}
      <MessageModal
        open={deleteModalOpen}
        onClose={handleDeleteModalClose}
        onSubmit={handleDeleteSelectedRows}
        title='Confirm Delete'
        body={`
                    Are you sure you want to delete 
                        ${deleteRowID ? dataRowDeleteName : 'the ' + checkedRows.length}
                        ${
                          !deleteRowID
                            ? checkedRows.length < 2
                              ? 'selected record'
                              : 'selected records'
                            : ''
                        }?
                `}
        cancelButtonText='Nevermind'
        confirmButtonText='Yup, see ya'
      />
      <Snackbar
        open={editAlertOpen}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleEditAlertClose}
      >
        <Alert severity='success'>Record Updated</Alert>
      </Snackbar>
      <LoaderSpinner open={loading} />
    </TableHolder>
  );
};

DynamicDataTable.propTypes = {
  checkAllColor: PropTypes.string,
  checkOneColor: PropTypes.string,
  getDataRowsAPICall: PropTypes.func,
  deleteDataRowsAPICall: PropTypes.func,
  deleteDataRowNameItems: PropTypes.func,
  deleteSelectedButtonColor: PropTypes.string,
  editDataRowsAPICall: PropTypes.func,
  headers: PropTypes.array,
  isDeletable: PropTypes.bool,
  isEditable: PropTypes.bool,
  isFilterable: PropTypes.bool,
  isResetable: PropTypes.bool,
  loadedDataRows: PropTypes.array,
  selectedRowColor: PropTypes.string,
  selectedRowFontColor: PropTypes.string,
  size: PropTypes.string,
  stickyHeader: PropTypes.bool,
  tableBodyColor: PropTypes.string,
};

export const CheckboxStyled = styled(Checkbox)(({ darkMode }) => ({
  svg: { color: darkMode && 'grey' },
}));

export const TableStyled = styled(Table)(({ darkMode }) => ({
  th: {
    backgroundColor: darkMode ? '#060619' : 'white',
  },
}));

export const TableHolder = styled.div({
  width: '90%',
  marginLeft: '5%',
});

export const TableContainerStyled = styled(TableContainer)({
  backgroundColor: 'white',
  borderRadius: 3,
  boxShadow: '5px 10px 25px 1px grey',
  height: 550,
  marginBottom: 15,
});

export const TableHeadStyled = styled(TableHead)(({ darkMode }) => ({
  backgroundColor: darkMode ? '#292929' : 'gainsboro',
  borderLeft: 'dashed gray 1px',
}));

export const TableCellStyled = styled(TableCell)(({ darkMode }) => ({
  backgroundColor: darkMode ? '#3d3d3d' : 'gainsboro',
}));

export const TableToolsCell = styled(TableCell)(({ darkMode }) => ({
  backgroundColor: darkMode ? '#3d3d3d' : 'lightgrey',
  width: 325,
}));

export const TableHeadCellText = styled(Typography)(({ darkMode }) => ({
  color: darkMode && 'beige !important',
  cursor: 'pointer',
  textDecoration: 'underline',
  ':hover': {
    opacity: 0.6,
  },
}));

export const TableToolsText = styled(Typography)({
  fontSize: 8,
});

export const SelectedRowsText = styled(Typography)({
  transform: 'translateY(1px)',
});

export const SearchButton = styled(IconButton)(({ darkMode }) => ({
  svg: {
    path: {
      fill: darkMode ? 'grey' : 'inherit',
    },
  },
  transform: 'translateY(1px)',
}));

export const ResetButton = styled(IconButton)(({ darkMode }) => ({
  svg: {
    path: {
      fill: darkMode ? 'grey' : 'inherit',
    },
  },
}));
