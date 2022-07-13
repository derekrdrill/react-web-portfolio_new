import React, { useState } from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { Typography, Button } from '@mui/material';

import { DynamicFormInputs } from '../../DynamicFormInputs/DynamicFormInputs';
import { LoaderSpinner } from '../../LoaderSpinner/LoaderSpinner';

import { addLeadInput } from '../context/LeadInputActions';
import { formInputsGenerator } from '../../../utils/formInputsGenerator';

import { LEAD_INFO_INPUTS } from '../constants/LEAD_INFO_INPUTS';

export const LeadInputForm = () => {
  const [loading, setLoading] = useState(null);
  const [form, setForm] = useState(formInputsGenerator(LEAD_INFO_INPUTS));

  const postApi = async () => {
    setLoading(true);
    setTimeout(() => {
      addLeadInput(form);
      setLoading(null);
      // $('input').val('');
      setForm({ firstName: '', lastName: '', email: '', phone: '' });
    }, 1000);
  };

  return (
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
          <DynamicFormInputs inputs={LEAD_INFO_INPUTS} form={form} setForm={setForm} />
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
  );
};


const InputsRow = styled(Row)({
  marginTop: '5%',
});

const SubmitButtonRow = styled(Row)({
  marginTop: '5%',
});
