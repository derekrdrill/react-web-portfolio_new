import React, { useState } from 'react';
import $ from 'jquery';
import styled, { createGlobalStyle } from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { Typography, Button } from '@mui/material';
import { DynamicFormInputs } from '../../DynamicFormInputs/DynamicFormInputs';
import { LoaderSpinner } from '../../LoaderSpinner/LoaderSpinner';
import { LEAD_INFO_INPUTS } from '../constants/LEAD_INFO_INPUTS';
import { addLeadInput } from '../context/LeadInputActions';

export const LeadInputForm = () => {
  const [leads, setLeads] = useState({});
  const [loading, setLoading] = useState(null);

  const updateLeadsObject = e => {
    let key = e.target.id;
    let value = e.target.value;
    let updatedValue = { [key]: value };

    setLeads(leads => ({
      ...leads,
      ...updatedValue,
    }));
  };

  const postApi = async () => {
    setLoading(true);
    setTimeout(() => {
      addLeadInput(leads);
      setLoading(null);
      $('input').val('');
    }, 1000);
  };

  return (
    <div>
      <PageBodyStyle />
      <Container>
        <Row>
          <Col xs={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 3 }} className='mt-5'>
            <Typography variant='h6' component='h1'>
              Please fill in your information below
            </Typography>
          </Col>
        </Row>
        <InputsRow>
          <Col xs={{ span: 12 }} lg={{ span: 6, offset: 3 }}>
            <DynamicFormInputs inputs={LEAD_INFO_INPUTS} onChange={updateLeadsObject} />
          </Col>
        </InputsRow>
        <SubmitButtonRow>
          <Col xs={{ span: 12 }} lg={{ span: 1, offset: 8 }}>
            <Button onClick={postApi} variant='contained' fullWidth>
              Submit
            </Button>
          </Col>
        </SubmitButtonRow>
        <LoaderSpinner open={loading} />
      </Container>
    </div>
  );
};

const PageBodyStyle = createGlobalStyle({
  body: {
    backgroundColor: 'tan',
  },
});

const InputsRow = styled(Row)({
  marginTop: '5%',
});

const SubmitButtonRow = styled(Row)({
  marginTop: '5%',
});
