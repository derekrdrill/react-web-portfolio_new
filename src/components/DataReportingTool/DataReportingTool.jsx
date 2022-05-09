import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import {
  Select,
  InputLabel,
  FormControl,
  Typography,
  MenuItem,
  List,
  ListItem,
  IconButton,
  Grid,
  Button,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltDown, faLongArrowAltUp } from '@fortawesome/fontawesome-free-solid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { DynamicDataTable } from '../DynamicDataTable/DynamicDataTable';

const DynamicColumnsList = ({ columns, initialList = false, buttonClick }) => (
  <ColumnsListContainer>
    <ColumnsList>
      {columns.map(column => (
        <ColumnsListItem key={column.id} draggable='true'>
          <Grid container>
            <Grid item xs={10} order={{ xs: 1, lg: initialList ? 1 : 2 }}>
              <Grid container justifyContent={{ xs: 'flex-start', lg: initialList ? 'flex-start' : 'flex-end' }}>
                <Typography variant='subtitle1' component='h3'>
                  {column.columnName || ''}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={2} order={{ xs: 2, lg: initialList ? 2 : 1 }}>
              <Grid container justifyContent={{ xs: 'flex-end', lg: initialList ? 'flex-end' : 'flex-start' }}>
                <IconButton
                  id={column.id}
                  color={initialList ? 'success' : 'error'}
                  children={initialList ? <AddCircleIcon /> : <RemoveCircleIcon />}
                  onClick={e => buttonClick(e, initialList)}
                  variant='contained'
                />
              </Grid>
            </Grid>
          </Grid>
        </ColumnsListItem>
      ))}
    </ColumnsList>
  </ColumnsListContainer>
);
const MoveAllColumnsButton = ({ children, endIcon, onClick }) => (
  <Button children={children} color='secondary' endIcon={endIcon} fullWidth onClick={onClick} variant='contained' />
);
export const DataReportingTool = () => {
  const [dataSet, setDataSet] = useState('Select One');
  const [collections, setCollections] = useState([]);
  const [collectionKeys, setCollectionKeys] = useState([]);
  const [availableColumns, setAvailableColumns] = useState([]);
  const [associatedColumns, setAssociatedColumns] = useState([]);
  const [sortedColumns, setSortedColumns] = useState([]);

  const handleGetAllCollections = () => {
    fetch('http://localhost:3001/listCollections')
      .then(response => response.json())
      .then(json => setCollections(json));
  };

  const handleGetCollectionKeys = () => {
    fetch(`http://localhost:3001/listCollectionKeys/${dataSet}`)
      .then(response => response.json())
      .then(json => setCollectionKeys(json));
  };

  const handleColumnState = (e, initialList) => {
    let columnID = Number(e.currentTarget.id);
    let columns = initialList ? availableColumns : associatedColumns;
    let columnObject = columns.find(column => column.id === columnID);

    if (initialList) {
      setAvailableColumns(availableColumns.filter(column => column.id !== columnID));
      setAssociatedColumns([...associatedColumns, columnObject]);
    } else {
      setAssociatedColumns(associatedColumns.filter(column => column.id !== columnID));
      setAvailableColumns([...availableColumns, columnObject]);
    }
  };

  const handleAssociateAll = () => {
    if (availableColumns.length > 0) {
      setAssociatedColumns(associatedColumns.concat(availableColumns));
      setAvailableColumns([]);
    }
  };

  const handleDeassociateAll = () => {
    if (associatedColumns.length > 0) {
      setAvailableColumns(availableColumns.concat(associatedColumns));
      setAssociatedColumns([]);
    }
  };

  useEffect(() => handleGetAllCollections(), []);
  useEffect(() => handleGetCollectionKeys(), [dataSet]);
  useEffect(() => setAvailableColumns(collectionKeys), [collectionKeys]);

  return (
    <div>
      <PageBodyStyle />
      <DataSetSelectContainer container>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>
              <Typography variant='subtitle1' component='label'>
                Select dataset
              </Typography>
            </InputLabel>
            <DataSetSelect
              label={dataSet}
              variant='standard'
              onChange={e => setDataSet(e.target.value)}
              value={dataSet ?? ''}
            >
              {collections.map(collection => (
                <MenuItem key={collection.name} value={collection.name}>
                  {collection.name}
                </MenuItem>
              ))}
              {/* <MenuItem value='leadData'>Lead Data</MenuItem> */}
            </DataSetSelect>
          </FormControl>
        </Grid>
      </DataSetSelectContainer>
      <ColumnsSelectContainer container>
        <Grid item xs={12} lg={5}>
          <Typography variant='h5' component='h2'>
            Available Columns
          </Typography>
          <DynamicColumnsList columns={availableColumns} buttonClick={handleColumnState} initialList />
        </Grid>
        <MoveAllColumnsButtonContainer item xs={12} lg={2}>
          <Grid container justifyContent='center' spacing={{ xs: 1, lg: 2 }}>
            <Grid item xs={6} lg={7} order={{ xs: 2, lg: 1 }}>
              <Grid item display={{ xs: 'none', lg: 'block' }}>
                <MoveAllColumnsButton children='>' onClick={handleAssociateAll} />
              </Grid>
              <Grid item display={{ xs: 'block', lg: 'none' }}>
                <MoveAllColumnsButton
                  children='ASSOCIATE ALL'
                  endIcon={<FontAwesomeIcon icon={faLongArrowAltDown} />}
                  onClick={handleAssociateAll}
                />
              </Grid>
            </Grid>
            <Grid item xs={6} lg={7} order={{ xs: 1, lg: 2 }}>
              <Grid item display={{ xs: 'none', lg: 'block' }}>
                <MoveAllColumnsButton children='<' onClick={handleDeassociateAll} />
              </Grid>
              <Grid item display={{ xs: 'block', lg: 'none' }}>
                <MoveAllColumnsButton
                  children='DEASSOCIATE ALL'
                  endIcon={<FontAwesomeIcon icon={faLongArrowAltUp} />}
                  onClick={handleDeassociateAll}
                />
              </Grid>
            </Grid>
          </Grid>
        </MoveAllColumnsButtonContainer>
        <Grid item xs={12} lg={5}>
          <Typography variant='h5' component='h2'>
            Associated Columns
          </Typography>
          <DynamicColumnsList columns={associatedColumns} buttonClick={handleColumnState} />
        </Grid>
      </ColumnsSelectContainer>
      <hr />
      <Grid container justifyContent='center'>
        <Grid item xs={12} lg={4}>
          <Button color='info' variant='contained' children={'Create Report'} fullWidth />
        </Grid>
      </Grid>
    </div>
  );
};

const PageBodyStyle = createGlobalStyle({
  body: {
    backgroundColor: '#228881',
  },
});

const DataSetSelectContainer = styled(Grid)({
  backgroundColor: 'grey',
  position: '-webkit-sticky',
  position: 'sticky',
  top: 80,
  padding: '10px 0 15px 0',
  zIndex: 100,
});

const DataSetSelect = styled(Select)({
  backgroundColor: 'gainsboro',
  paddingLeft: 10,
  borderRadius: 5,
  marginLeft: 10,
});

const ColumnsSelectContainer = styled(Grid)({
  padding: 20,
});

const ColumnsListContainer = styled.div({
  height: 250,
  overflowY: 'auto',
  overflowX: 'none',
  border: '1px solid grey',
  borderRadius: 5,
  boxShadow: '0 0 3px darkslategray',
  backgroundColor: '#EDE9E1',
});

const ColumnsList = styled(List)({
  padding: 0,
});

const ColumnsListItem = styled(ListItem)({
  backgroundColor: 'darkgrey',
  borderBottom: '1px dashed grey',
  cursor: 'all-scroll',
  padding: 10,
});

const MoveAllColumnsButtonContainer = styled(Grid)({
  margin: '7% 0 4% 0',
});
