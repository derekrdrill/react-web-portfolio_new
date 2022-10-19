import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import {
  TableContainer,
  Table,
  TableBody,
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

export const getFiltersLabel = filtersDisplay => (filtersDisplay ? 'Hide filters' : 'Show filters');

export const DynamicDataTable = ({
  checkAllColor,
  checkOneColor,
  getDataRowsAPICall,
  deleteDataRowsAPICall,
  deleteDataRowNameItems,
  deleteSelectedButtonColor,
  editDataRowsAPICall,
  headers,
  selectedRowColor = 'lightcoral',
  selectedRowFontColor = 'white',
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

  const handleGetDataRowsAPICall = () => {
    fetch(getDataRowsAPICall)
      .then(response => response.json())
      .then(json => {
        setDataRows(json);
        setDataRowsKeys(Object.keys(json[0]));
      });
  };

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
        let sortItemA = a[columnID].toUpperCase();
        let sortItemB = b[columnID].toUpperCase();

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

  const handleSaveEdits = () => {
    if (editingRow) {
      setEditAlertOpen(true);
    }

    handleEditDataRowsAPICall();
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

  useEffect(() => handleGetDataRowsAPICall(), []);

  return (
    <TableHolder>
      <TableContainerStyled>
        <Table size={size} stickyHeader={stickyHeader}>
          <TableHead>
            <TableRow>
              <TableToolsCell darkMode={darkMode}>
                <Grid container>
                  <Grid item xs={3}>
                    <Grid container>
                      <TableToolsText variant='subtitle2' component='h1'>
                        {getSelectRowsLabel(allRowsSelected)}
                      </TableToolsText>
                    </Grid>
                    <Grid container>
                      <Checkbox
                        color={checkAllColor}
                        onChange={handleCheckAllRows}
                        checked={allRowsSelected}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <Grid container justifyContent='center'>
                      <TableToolsText variant='subtitle2' component='h1'>
                        {getFiltersLabel(filtersDisplay)}
                      </TableToolsText>
                    </Grid>
                    <Grid container justifyContent='center'>
                      <SearchButton
                        darkMode={darkMode}
                        children={<SearchButtonIcon filtersDisplay={filtersDisplay} />}
                        onClick={() => setFilterDisplay(!filtersDisplay)}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <Grid container justifyContent='center'>
                      <TableToolsText variant='subtitle2' component='h1'>
                        Reset Table
                      </TableToolsText>
                    </Grid>
                    <Grid container justifyContent='center'>
                      <ResetButton
                        darkMode={darkMode}
                        children={<RotateLeftIcon />}
                        onClick={handleTableReset}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <Grid container justifyContent='center'>
                      <TableToolsText variant='subtitle2' component='h1'>
                        Selected
                      </TableToolsText>
                    </Grid>
                    <Grid container justifyContent='center'>
                      <SelectedRowsText variant='h6' component='h1'>
                        {checkedRows.length}
                      </SelectedRowsText>
                    </Grid>
                  </Grid>
                </Grid>
              </TableToolsCell>
              {headers.map(header => (
                <TableHeadCell darkMode={darkMode} key={header.headerID}>
                  <Grid container>
                    <TableHeadCellText
                      id={header.headerID}
                      component='h1'
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
                </TableHeadCell>
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
            selectedRowColor={selectedRowColor}
            selectedRowFontColor={selectedRowFontColor}
            tableBodyColor={tableBodyColor}
          />
        </Table>
      </TableContainerStyled>
      <Button
        color={deleteSelectedButtonColor || 'warning'}
        variant='contained'
        onClick={handleDeleteModalOpen}
      >
        Delete Selected
      </Button>
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

export const TableHolder = styled.div({
  width: '86%',
  marginLeft: '7%',
});

export const TableContainerStyled = styled(TableContainer)({
  backgroundColor: 'white',
  borderRadius: 3,
  boxShadow: '5px 10px 25px 1px grey',
  height: 550,
  marginBottom: 15,
});

export const TableHeadCell = styled(TableCell)(({ darkMode }) => ({
  backgroundColor: darkMode ? '#292929' : 'gainsboro',
  borderLeft: 'dashed gray 1px',
}));

export const TableToolsCell = styled(TableCell)(({ darkMode }) => ({
  backgroundColor: darkMode ? '#3d3d3d' : 'lightgrey',
}));

export const TableHeadCellText = styled(Typography)({
  cursor: 'pointer',
  ':hover': {
    opacity: 0.6,
  },
});

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
