import React, { useState } from 'react';
import styled from 'styled-components';
import { Typography, Button, Grid } from '@mui/material';

import { DynamicFormInputs } from '../../DynamicFormInputs/components/DynamicFormInputs';
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
      setForm({ firstName: '', lastName: '', email: '', phone: '' });
    }, 1000);
  };

  return (
    <>
      <TitleContainer container justifyContent='center'>
        <Typography variant='h6' component='h1'>
          Please fill in your information below
        </Typography>
      </TitleContainer>
      <Grid container justifyContent='center'>
        <Grid item xs={10} md={8} lg={6} xl={4}>
          <DynamicFormInputs inputs={LEAD_INFO_INPUTS} form={form} setForm={setForm} />
          <ButtonContainer container justifyContent={{ xs: 'center', sm: 'flex-end' }}>
            <Grid item xs={12} sm={4}>
              <Button
                disabled={form.firstName === '' || form.lastName === '' || form.email === '' || form.phone === ''}
                fullWidth
                onClick={postApi}
                variant={'contained'}
              >
                Submit
              </Button>
            </Grid>
          </ButtonContainer>
        </Grid>
      </Grid>
      <LoaderSpinner open={loading} />
    </>
  );
};

const TitleContainer = styled(Grid)({ padding: '2% 0' });
const ButtonContainer = styled(Grid)({ paddingTop: '4%' });
