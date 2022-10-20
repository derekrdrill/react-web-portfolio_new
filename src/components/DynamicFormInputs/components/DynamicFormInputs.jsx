import React from 'react';
import PropTypes from 'prop-types';
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

DynamicFormInputs.propTypes = {
  inputs: PropTypes.array,
  form: PropTypes.object,
  setForm: PropTypes.func,
};
