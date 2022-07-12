import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { ShowHideIcon } from '../ShowHideIcon/ShowHideIcon';

// TODO: condense this all to one style using emotion

// import { css } from '@emotion/react';

const FormInput = ({ input, onChange }) => {
  const [selectValue, setSelectValue] = useState('');
  const [passwordHidden, setPasswordHidden] = useState(true);
  const selectChange = event => setSelectValue(event.target.value);
  const handleSetPasswordHidden = () => setPasswordHidden(!passwordHidden);

  return (
    <Grid item xs={input.xs} sm={input.sm} md={input.md}>
      {input.select ? (
        <FormControl fullWidth>
          <InputLabel>{input.label}</InputLabel>
          <StyledSelect
            id={input.id}
            label={input.label}
            value={selectValue}
            variant={input.variant}
            fullWidth={input.fullWidth || true}
            onChange={selectChange}
            color={input.color || 'secondary'}
            inputbackgroundcolor={input.inputBackgroundColor}
            inputborderradius={input.inputborderRadius}
            inputpaddingbottom={input.inputPaddingBottom}
            inputfontfamily={input.fontFamily || input.inputFontFamily}
            labelcolor={input.labelColor}
            labelfontfamily={input.fontFamily || input.labelFontFamily}
          >
            {input.selectOptions.map(option => (
              <MenuItem key={option.id} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
      ) : (
        <StyledTextField
          id={input.id}
          label={input.label}
          variant={input.variant}
          fullWidth={input.fullWidth || true}
          multiline={input.multiline}
          minRows={input.multiline && input.minRows}
          maxRows={input.multiline && input.maxRows}
          onChange={onChange}
          size={input.size || 'medium'}
          type={input.type === 'password' ? (passwordHidden ? 'password' : 'text') : input.type}
          color={input.color || 'secondary'}
          inputbackgroundcolor={input.inputBackgroundColor}
          inputborderradius={input.inputborderRadius}
          inputpaddingbottom={input.inputPaddingBottom}
          inputfontfamily={input.fontFamily || input.inputFontFamily}
          labelcolor={input.labelColor}
          labelfontfamily={input.fontFamily || input.labelFontFamily}
          InputProps={{
            endAdornment: input.type === 'password' && <ShowHideIcon onClick={handleSetPasswordHidden} />,
          }}
        />
      )}
    </Grid>
  );
};

export const DynamicFormInputs = ({ inputs, onChange }) => (
  <Grid container spacing={2}>
    {inputs.map(input => (
      <FormInput key={input.id} input={input} onChange={onChange} />
    ))}
  </Grid>
);

// TODO: condense this all to one style using emotion

// const styledInput = css(({
//     inputbackgroundcolor,
//     inputborderradius,
//     inputpaddingbottom,
//     inputfontfamily,
//     labelfontfamily,
//     labelcolor
// }) => ({
//     paddingBottom: inputpaddingbottom,
//     '.MuiInputBase-root': {
//         backgroundColor: inputbackgroundcolor,
//         borderRadius: inputborderradius,
//         fontFamily: inputfontfamily,
//     },
//     '.MuiInputLabel-root': {
//         color: labelcolor,
//         fontFamily: labelfontfamily,
//     },
// }));

const StyledTextField = styled(TextField)(
  ({ inputbackgroundcolor, inputborderradius, inputpaddingbottom, inputfontfamily, labelfontfamily, labelcolor }) => ({
    paddingBottom: inputpaddingbottom,
    '.MuiInputBase-root': {
      backgroundColor: inputbackgroundcolor,
      borderRadius: inputborderradius,
      fontFamily: inputfontfamily,
    },
    '.MuiInputLabel-root': {
      color: labelcolor,
      fontFamily: labelfontfamily,
    },
  }),
);

const StyledSelect = styled(Select)(
  ({ inputbackgroundcolor, inputborderradius, inputpaddingbottom, inputfontfamily, labelfontfamily, labelcolor }) => ({
    paddingBottom: inputpaddingbottom,
    '.MuiInputBase-root': {
      backgroundColor: inputbackgroundcolor,
      borderRadius: inputborderradius,
      fontFamily: inputfontfamily,
    },
    '.MuiInputLabel-root': {
      color: labelcolor,
      fontFamily: labelfontfamily,
    },
  }),
);
