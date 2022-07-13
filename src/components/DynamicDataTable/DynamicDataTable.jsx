import React, { useContext, useState, useEffect } from 'react';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltDown, faLongArrowAltUp } from '@fortawesome/fontawesome-free-solid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

import { DarkLightModeContext } from '../DarkLightMode/context/DarkLightModeContext';

import { MessageModal } from '../Modals/MessageModal';
import { LoaderSpinner } from '../LoaderSpinner/LoaderSpinner';

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
  const { darkMode } = useContext(DarkLightModeContext);

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
                        {allRowsSelected ? 'Deselect all' : 'Select all'}
                      </TableToolsText>
                    </Grid>
                    <Grid container>
                      <Checkbox color={checkAllColor} onChange={handleCheckAllRows} checked={allRowsSelected} />
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <Grid container justifyContent='center'>
                      <TableToolsText variant='subtitle2' component='h1'>
                        {filtersDisplay ? 'Hide filters' : 'Show filters'}
                      </TableToolsText>
                    </Grid>
                    <Grid container justifyContent='center'>
                      <SearchButton
                        darkMode={darkMode}
                        children={filtersDisplay ? <SearchOffIcon /> : <SearchIcon />}
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
                      <ResetButton darkMode={darkMode} children={<RotateLeftIcon />} onClick={handleTableReset} />
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
                    <TableHeadCellText id={header.headerID} component='h1' variant='body1' onClick={handleTableSort}>
                      {header.headerName}
                      &nbsp;
                      {header.headerID === sortColumn ? (
                        sortType === 'asc' ? (
                          <FontAwesomeIcon icon={faLongArrowAltDown} />
                        ) : sortType === 'desc' ? (
                          <FontAwesomeIcon icon={faLongArrowAltUp} />
                        ) : null
                      ) : null}
                    </TableHeadCellText>
                  </Grid>
                  <Grid container>
                    {filtersDisplay && <FilterInput id={header.headerID} className='filter' onChange={handleFilter} />}
                  </Grid>
                </TableHeadCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBodyStyled darkMode={darkMode}>
            {dataRows
              .filter(dataRow => dataRow[filterColumn].toUpperCase().startsWith(filterValue))
              .map(dataRow => {
                let rowIsSelected = checkedRows.includes(dataRow._id);
                let isEditing = dataRow._id === editingID;

                return (
                  <TableBodyRow
                    key={dataRow._id}
                    darkMode={darkMode}
                    selected={rowIsSelected}
                    selectedcolor={selectedRowColor}
                    selectedfontcolor={selectedRowFontColor}
                    tablebodycolor={tableBodyColor}
                  >
                    <TableCell>
                      <Checkbox
                        id={dataRow._id}
                        color={darkMode ? 'primary' : checkOneColor}
                        onChange={handleCheckOneRow}
                        checked={rowIsSelected}
                      />
                      <RemoveRecordIcon
                        className='edit-delete-icon'
                        id={dataRow._id}
                        darkMode={darkMode}
                        children={<DeleteForeverIcon />}
                        onClick={handleSetDeleteRow}
                      />
                      {editingID != dataRow._id ? (
                        <EditRecordIcon
                          className='edit-delete-icon'
                          id={dataRow._id}
                          darkMode={darkMode}
                          children={<DriveFileRenameOutlineIcon />}
                          onClick={handleEditRow}
                        />
                      ) : (
                        <SaveRecordIcon id={dataRow._id} children={<SaveIcon />} onClick={handleSaveEdits} />
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
                            isediting={isEditing}
                            disabled={!isEditing}
                            onChange={handleRowInputChange}
                          />
                        </TableCell>
                      ))}
                  </TableBodyRow>
                );
              })}
          </TableBodyStyled>
        </Table>
      </TableContainerStyled>
      <Button color={deleteSelectedButtonColor || 'warning'} variant='contained' onClick={handleDeleteModalOpen}>
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
                        ${!deleteRowID ? (checkedRows.length < 2 ? 'selected record' : 'selected records') : ''}?
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

const TableHolder = styled.div({
  width: '86%',
  marginLeft: '7%',
});

const TableContainerStyled = styled(TableContainer)({
  backgroundColor: 'white',
  borderRadius: 3,
  boxShadow: '5px 10px 25px 1px grey',
  height: 550,
  marginBottom: 15,
});

const TableHeadCell = styled(TableCell)(({ darkMode }) => ({
  backgroundColor: darkMode ? '#292929' : 'gainsboro',
  borderLeft: 'dashed gray 1px',
}));

const TableToolsCell = styled(TableCell)(({ darkMode }) => ({
  backgroundColor: darkMode ? '#3d3d3d' : 'lightgrey',
}));

const TableHeadCellText = styled(Typography)({
  cursor: 'pointer',
  ':hover': {
    opacity: 0.6,
  },
});

const TableBodyStyled = styled(TableBody)(({ darkMode }) => ({
  backgroundColor: darkMode ? 'darkgrey' : 'white',
}));

const TableBodyRow = styled(TableRow)(({ darkMode, selectedfontcolor, selectedcolor, tablebodycolor }) => ({
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
}));

const TableBodyCellInput = styled.input(({ darkMode, isediting }) => ({
  backgroundColor: isediting ? 'white' : 'transparent',
  border: isediting ? '1px grey solid' : 'none',
  borderRadius: 2,
  color: darkMode ? 'black' : 'inherit',
}));

const TableToolsText = styled(Typography)({
  fontSize: 8,
});

const SelectedRowsText = styled(Typography)({
  transform: 'translateY(1px)',
});

const FilterInput = styled.input({
  height: 21,
});

const SearchButton = styled(IconButton)(({ darkMode }) => ({
  svg: {
    path: {
      fill: darkMode ? 'grey' : 'inherit',
    },
  },
  transform: 'translateY(1px)',
}));

const ResetButton = styled(IconButton)(({ darkMode }) => ({
  svg: {
    path: {
      fill: darkMode ? 'grey' : 'inherit',
    },
  },
}));

const RemoveRecordIcon = styled(IconButton)(({ darkMode }) => ({
  color: darkMode ? '#1a1a1a' : '#B22222',
  cursor: 'pointer',
  ':hover': {
    color: darkMode ? '#121212' : '#800000',
  },
}));

const EditRecordIcon = styled(IconButton)(({ darkMode }) => ({
  color: darkMode ? '#1a1a1a' : '#2B7494',
  cursor: 'pointer',
  ':hover': {
    color: darkMode ? '#1a1a1a' : '#3C99DC',
  },
}));

const SaveRecordIcon = styled(IconButton)({
  color: 'forestgreen',
  cursor: 'pointer',
  ':hover': {
    color: 'green',
  },
});
