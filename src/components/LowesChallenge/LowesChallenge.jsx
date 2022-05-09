import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Grid,
  Modal,
} from '@mui/material';

const originalData = [
  { id: 1, name: 'Shivarsh', age: 21 },
  { id: 2, name: 'Simran', age: 22 },
  { id: 3, name: 'Aakash', age: 23 },
];

export const LowesChallenge = () => {
  const [tableData, setTableData] = useState(originalData);
  const [updateRow, setUpdateRow] = useState([{ id: 0, name: '', age: '' }]);
  const [updateOrCreate, setUpdateOrCreate] = useState('create');
  const [modalOpen, setModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [updateAge, setUpdateAge] = useState('');
  const [updateID, setUpdateID] = useState('');

  const handleDelete = e => {
    let deleteID = e.target.id;

    setTableData(tableData.filter(item => item.id != deleteID));
  };

  const handleSetUpdate = e => {
    let updateID = Number(e.target.id);

    setUpdateOrCreate('update');
    setUpdateRow(tableData.filter(item => item.id === updateID));
    setUpdateID(updateID || 0);
    setModalOpen(true);
  };

  const handleSetCreate = () => {
    setModalOpen(true);
    setUpdateOrCreate('create');
  };

  const handleSetUpdateRecord = e => {
    let key = e.target.id;
    let value = e.target.value || '';

    if (key === 'name') {
      setUpdateName(value);
    } else {
      setUpdateAge(value);
    }
  };

  const handleSetNewRecord = e => {
    let key = e.target.id;
    let value = e.target.value || '';

    if (key === 'name') {
      setNewName(value);
    } else {
      setNewAge(value);
    }
  };

  const handleAddNewRecord = () => {
    let ids = tableData.map(record => {
      return record.id;
    });
    let maxID;
    let newID;

    if (tableData.length === 0) {
      newID = 1;
    } else {
      maxID = Math.max(...ids);
      newID = maxID + 1;
    }

    setTableData([...tableData, { id: newID, name: newName, age: newAge }]);

    setModalOpen(false);
  };

  const handleUpdateRecord = () => {
    let objIndex = tableData.findIndex(obj => obj.id == updateID);

    tableData[objIndex].name = updateName;
    tableData[objIndex].age = updateAge;

    setModalOpen(false);
  };

  const handleSetModalClose = () => setModalOpen(false);

  useEffect(() => {
    setUpdateName(updateRow[0].name || '');
    setUpdateAge(updateRow[0].age || 0);
  }, [updateRow]);

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Button id={row.id} onClick={handleSetUpdate} color='warning' variant='contained'>
                        Update
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button id={row.id} onClick={handleDelete} color='error' variant='contained'>
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateNewContainer container>
        <Button onClick={handleSetCreate} variant='contained' fullWidth>
          Create New
        </Button>
      </CreateNewContainer>
      <Modal open={modalOpen}>
        <ModalContentContainer>
          <ModalInputsContainer container spacing={2} justifyContent='center'>
            {updateOrCreate === 'create' ? (
              <>
                <Grid item>
                  <TextField id='name' placeholder='Enter Name' label='Enter Name' onChange={handleSetNewRecord} />
                </Grid>
                <Grid item>
                  <TextField id='age' placeholder='Enter Age' label='Enter Age' onChange={handleSetNewRecord} />
                </Grid>
              </>
            ) : (
              <>
                <Grid item>
                  <TextField
                    id='name'
                    placeholder='Enter Name'
                    label='Enter Name'
                    value={updateName}
                    onChange={handleSetUpdateRecord}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id='age'
                    placeholder='Enter Age'
                    label='Enter Age'
                    value={updateAge}
                    onChange={handleSetUpdateRecord}
                  />
                </Grid>
              </>
            )}
          </ModalInputsContainer>
          <Grid container spacing={2} justifyContent='center'>
            <Grid item>
              <Button color='error' variant='contained' onClick={handleSetModalClose}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                color='success'
                variant='contained'
                onClick={updateOrCreate === 'create' ? handleAddNewRecord : handleUpdateRecord}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </ModalContentContainer>
      </Modal>
    </div>
  );
};

const CreateNewContainer = styled(Grid)({
  margin: 5,
});

const ModalContentContainer = styled.div({
  backgroundColor: 'white',
  marginLeft: '32%',
  marginTop: '18%',
  maxWidth: '35%',
  padding: 30,
  borderRadius: 5,
  border: '1px solid black',
});

const ModalInputsContainer = styled(Grid)({
  marginBottom: '2%',
});
