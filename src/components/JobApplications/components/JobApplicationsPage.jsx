import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { Select, InputLabel, MenuItem, FormControl, Typography } from '@mui/material';
import { BasicJobApplication } from './BasicJobApplication';
import { AdvancedJobApplication } from './AdvancedJobApplication';
import { MultiPageJobApplication } from './MultiPageJobApplication';
import { LoaderSpinner } from '../../LoaderSpinner/LoaderSpinner';

export const JobApplicationType = ({ appType }) =>
  appType === 'basic' ? (
    <BasicJobApplication />
  ) : appType === 'advanced' ? (
    <AdvancedJobApplication />
  ) : (
    <MultiPageJobApplication />
  );


export const JobApplicationsPage = () => {
  const [appType, setAppType] = useState('basic');
  const [loading, setLoading] = useState(null);

  const handleAppTypeChange = e => {
    setLoading(true);
    setTimeout(() => {
      setAppType(e.target.value);
      setLoading(null);
    }, 600);
  };

  return (
    <Container fluid>
      <JobApplicationsSelectRow>
        <Col xs={4} className='py-2'>
          <FormControl fullWidth>
            <InputLabel>
              <JobApplicationSelectLabelText variant='h6' component='label'>
                Select one
              </JobApplicationSelectLabelText>
            </InputLabel>
            <JobApplicationSelect value={appType} label='Select one' variant='standard' onChange={handleAppTypeChange}>
              <MenuItem value='basic'>Basic</MenuItem>
              <MenuItem value='advanced'>Advanced</MenuItem>
              <MenuItem value='multi-page'>Mulit-Page</MenuItem>
            </JobApplicationSelect>
          </FormControl>
        </Col>
      </JobApplicationsSelectRow>
      <Row>
        <JobApplicationType appType={appType} />
      </Row>
      <LoaderSpinner open={loading} />
    </Container>
  );
};

const JobApplicationsSelectRow = styled(Row)({
  backgroundColor: 'grey',
  position: '-webkit-sticky',
  position: 'sticky',
  top: 80,
  zIndex: 100,
});

const JobApplicationSelect = styled(Select)({
  backgroundColor: 'gainsboro',
  padding: 5,
  borderRadius: 5,
  marginLeft: 10,
});

const JobApplicationSelectLabelText = styled(Typography)({
  color: 'beige',
});
