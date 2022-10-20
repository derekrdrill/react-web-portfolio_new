import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

import { TextFieldEndAdornment } from '../components/TextFieldEndAdornment';

export const getVariant = (darkMode, variant) => (darkMode ? 'filled' : variant);
export const getTextFieldType = (passwordHidden, type) =>
  type === 'password' ? (passwordHidden ? 'password' : 'text') : type;

// TODO: condense this all to one style using emotion

// import { css } from '@emotion/react';

export const FormInput = ({ input, form, setForm, value }) => {
  const { darkMode } = React.useContext(DarkLightModeContext);

  const [selectValue, setSelectValue] = useState('');
  const [passwordHidden, setPasswordHidden] = useState(true);

  const selectChange = event => setSelectValue(event.target.value);

  const handleInputChange = (e, setForm) => {
    let id = e.currentTarget.id;
    setForm({ ...form, [id]: e.currentTarget.value });
  };

  return (
    <Grid item xs={input.xs} sm={input.sm} md={input.md}>
      {input.select ? (
        <FormControl className='select' fullWidth>
          <StyledSelectLabel darkMode={darkMode} labelcolor={input.labelColor}>
            {input.label}
          </StyledSelectLabel>
          <StyledSelect
            id={input.id}
            darkMode={darkMode}
            label={input.label}
            value={selectValue}
            variant={getVariant(darkMode, input.variant)}
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
          className='text'
          id={input.id}
          darkMode={darkMode}
          label={input.label}
          placeholder={input.placeholder}
          variant={getVariant(darkMode, input.variant)}
          fullWidth={input.fullWidth || true}
          multiline={input.multiline}
          minRows={input.minRows}
          maxRows={input.maxRows}
          onChange={
            /* istanbul ignore next */
            e => handleInputChange(e, setForm)
          }
          value={value}
          size={input.size || 'medium'}
          type={getTextFieldType(passwordHidden, input.type)}
          color={input.color || 'secondary'}
          inputbackgroundcolor={input.inputBackgroundColor}
          inputborderradius={input.inputborderRadius}
          inputpaddingbottom={input.inputPaddingBottom}
          inputfontfamily={input.fontFamily || input.inputFontFamily}
          labelcolor={input.labelColor}
          labelfontfamily={input.fontFamily || input.labelFontFamily}
          InputProps={{
            endAdornment: (
              <TextFieldEndAdornment
                passwordHidden={passwordHidden}
                setPasswordHidden={setPasswordHidden}
                type={input.type}
              />
            ),
          }}
        />
      )}
    </Grid>
  );
};

FormInput.propTypes = {
  form: PropTypes.object,
  input: PropTypes.object,
  setForm: PropTypes.func,
  value: PropTypes.string,
};

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

export const StyledTextField = styled(TextField)(
  ({
    darkMode,
    inputbackgroundcolor,
    inputborderradius,
    inputpaddingbottom,
    inputfontfamily,
    labelfontfamily,
    labelcolor,
  }) => ({
    paddingBottom: inputpaddingbottom,
    '.MuiInputBase-root': {
      backgroundColor: darkMode ? '#474747' : inputbackgroundcolor,
      borderRadius: inputborderradius,
      color: darkMode ? 'beige' : 'inherit',
      fontFamily: inputfontfamily,
    },
    '.MuiInputLabel-root': {
      color: darkMode ? 'white' : labelcolor,
      fontFamily: labelfontfamily,
    },
  }),
);

export const StyledSelectLabel = styled(InputLabel)(({ darkMode, labelcolor }) => ({
  color: darkMode ? 'white' : labelcolor,
}));

export const StyledSelect = styled(Select)(
  ({
    darkMode,
    inputbackgroundcolor,
    inputborderradius,
    inputpaddingbottom,
    inputfontfamily,
    labelfontfamily,
    labelcolor,
  }) => ({
    paddingBottom: inputpaddingbottom,
    '&.MuiInputBase-root': {
      backgroundColor: darkMode ? '#474747' : inputbackgroundcolor,
      borderRadius: inputborderradius,
      color: darkMode ? 'beige' : 'inherit',
      fontFamily: inputfontfamily,
    },
    '.MuiInputLabel-root': {
      color: darkMode ? 'beige' : labelcolor,
      fontFamily: labelfontfamily,
    },
  }),
);
