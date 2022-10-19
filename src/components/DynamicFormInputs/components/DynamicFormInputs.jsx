import React from 'react';
import { Grid } from '@mui/material';
import { FormInput } from './FormInput';

export const DynamicFormInputs = ({ inputs, form, setForm }) => (
  <Grid container spacing={2}>
    {inputs.map(input => {
      let value = form[input.id];

      return <FormInput key={input.id} form={form} input={input} setForm={setForm} value={value} />;
    })}
  </Grid>
);
