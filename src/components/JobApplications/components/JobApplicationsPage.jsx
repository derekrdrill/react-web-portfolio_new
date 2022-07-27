import React, { useContext, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { Select, InputLabel, MenuItem, FormControl, Typography } from '@mui/material';

import { BasicJobApplication } from './BasicJobApplication';
import { AdvancedJobApplication } from './AdvancedJobApplication';
import { MultiPageJobApplication } from './MultiPageJobApplication';
import { LoaderSpinner } from '../../LoaderSpinner/LoaderSpinner';

import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

export const JobApplicationType = ({ appType }) =>
  appType === 'basic' ? (
    <BasicJobApplication />
  ) : appType === 'advanced' ? (
    <AdvancedJobApplication />
  ) : (
    <MultiPageJobApplication />
  );

export const JobApplicationsPage = () => {
  const { darkMode } = useContext(DarkLightModeContext);

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
    <>
      <PageBodyStyle appType={appType} darkMode={darkMode} />
      <Container fluid>
        <JobApplicationsSelectRow darkMode={darkMode}>
          <Col xs={4} className='py-2'>
            <FormControl fullWidth>
              <InputLabel>
                <JobApplicationSelectLabelText darkMode={darkMode} variant='h6' component='label'>
                  Select one
                </JobApplicationSelectLabelText>
              </InputLabel>
              <JobApplicationSelect
                value={appType}
                label='Select one'
                variant='standard'
                onChange={handleAppTypeChange}
              >
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
    </>
  );
};

const PageBodyStyle = createGlobalStyle(({ appType, darkMode }) => ({
  body: {
    backgroundColor: darkMode ? '#5c5c5c' : 'white',
  },
}));

const JobApplicationsSelectRow = styled(Row)(({ darkMode }) => ({
  backgroundColor: darkMode ? 'grey' : 'whitesmoke',
  borderTop: darkMode ? 'none' : '1px dashed #759CC9',
  position: '-webkit-sticky',
  position: 'sticky',
  top: 80,
  zIndex: 2,
}));

const JobApplicationSelect = styled(Select)({
  backgroundColor: 'gainsboro',
  padding: 5,
  borderRadius: 5,
  marginLeft: 10,
});

const JobApplicationSelectLabelText = styled(Typography)(({ darkMode }) => ({
  color: darkMode ? 'beige' : '#759CC9',
}));
