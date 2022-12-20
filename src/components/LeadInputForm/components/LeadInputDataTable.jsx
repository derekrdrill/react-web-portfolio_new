import React from 'react';
import { DynamicDataTable } from '../../DynamicDataTable/components/DynamicDataTable';

export const headers = [
  { headerID: 'firstName', headerName: 'First Name' },
  { headerID: 'lastName', headerName: 'Last Name' },
  { headerID: 'email', headerName: 'Email' },
  { headerID: 'phone', headerName: 'Phone Number' },
];

const getLeadsAPICall = `${
  process.env.REACT_APP_BACKEND_URL ?? process.env.REACT_APP_BACKEND_URL_TESTING
}/leadInput`;

const deleteLeadsAPICall = `${
  process.env.REACT_APP_BACKEND_URL ?? process.env.REACT_APP_BACKEND_URL_TESTING
}/deleteLeadInput`;

const editLeadsAPICall = `${
  process.env.REACT_APP_BACKEND_URL ?? process.env.REACT_APP_BACKEND_URL_TESTING
}/replaceLeadInput`;

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
