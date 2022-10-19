import React from 'react';
import { DynamicDataTable } from '../../DynamicDataTable/components/DynamicDataTable';

export const headers = [
  { headerID: 'firstName', headerName: 'First Name' },
  { headerID: 'lastName', headerName: 'Last Name' },
  { headerID: 'email', headerName: 'Email' },
  { headerID: 'phone', headerName: 'Phone Number' },
];

const getLeadsAPICall = 'http://localhost:3001/leadInput';
const deleteLeadsAPICall = 'http://localhost:3001/deleteLeadInput';
const editLeadsAPICall = 'http://localhost:3001/replaceLeadInput';

export const LeadInputDataTable = () => (
  <DynamicDataTable
    checkAllColor='primary'
    checkOneColor='secondary'
    deleteDataRowsAPICall={deleteLeadsAPICall}
    deleteDataRowNameItems={['firstName', ' ', 'lastName']}
    editDataRowsAPICall={editLeadsAPICall}
    getDataRowsAPICall={getLeadsAPICall}
    headers={headers}
    size='small'
  />
);
