import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const FilterInput = ({ filtersDisplay, handleFilter, headerID }) =>
  filtersDisplay && <StyledInput id={headerID} className='filter' onChange={handleFilter} />;

FilterInput.propTypes = {
  filtersDisplay: PropTypes.bool,
  handleFilter: PropTypes.func,
  headerID: PropTypes.string,
};

const StyledInput = styled.input({
  height: 21,
});
