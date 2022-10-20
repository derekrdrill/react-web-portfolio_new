import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, IconButton, List, ListItem, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export const getColumnName = columnName => columnName ?? '';
export const getIconButtonColor = initialList => (initialList ? 'success' : 'error');
export const getIconButtonChildren = initialList => (initialList ? <AddCircleIcon /> : <RemoveCircleIcon />);
export const getFirstGridItemOrderLG = initialList => (initialList ? 1 : 2);
export const getSecondGridItemOrderLG = initialList => (initialList ? 2 : 1);
export const getFirstGridContainerJustifyLG = initialList => (initialList ? 'flex-start' : 'flex-end');
export const getSecondGridContainerJustifyLG = initialList => (initialList ? 'flex-end' : 'flex-start');

export const DynamicColumnsList = ({ columns, initialList = false, buttonClick }) => (
  <ColumnsListContainer>
    <ColumnsList>
      {columns.map(column => (
        <ColumnsListItem key={column.id} draggable='true'>
          <Grid container>
            <Grid item xs={10} order={{ xs: 1, lg: getFirstGridItemOrderLG(initialList) }}>
              <Grid
                container
                justifyContent={{
                  xs: 'flex-start',
                  lg: getFirstGridContainerJustifyLG(initialList),
                }}
              >
                <Typography variant='subtitle1' component='h3'>
                  {getColumnName(column.columnName)}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={2} order={{ xs: 2, lg: getSecondGridItemOrderLG(initialList) }}>
              <Grid
                container
                justifyContent={{
                  xs: 'flex-end',
                  lg: getSecondGridContainerJustifyLG(initialList),
                }}
              >
                <IconButton
                  id={column.id}
                  color={getIconButtonColor(initialList)}
                  onClick={
                    /* istanbul ignore next */
                    e => buttonClick(e, initialList)
                  }
                  variant='contained'
                >
                  {getIconButtonChildren(initialList)}
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </ColumnsListItem>
      ))}
    </ColumnsList>
  </ColumnsListContainer>
);

DynamicColumnsList.propTypes = {};

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
