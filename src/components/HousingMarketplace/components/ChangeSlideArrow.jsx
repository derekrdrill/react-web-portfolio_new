import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/fontawesome-free-regular';

export const ChangeSlideArrow = ({ arrowType, darkMode }) => (
  <QuickLinksSliderButton
    darkMode={darkMode}
    className={`slick-arrow ${arrowType === 'next' ? 'slick-next' : 'slick-prev'}`}
    icon={arrowType === 'next' ? faArrowAltCircleRight : faArrowAltCircleLeft}
  />
);

ChangeSlideArrow.propTypes = {
  arrowType: PropTypes.string,
  currentSlide: PropTypes.number,
  darkMode: PropTypes.bool,
  slideCount: PropTypes.number,
};

const QuickLinksSliderButton = styled(FontAwesomeIcon)(({ darkMode }) => ({
  ':hover': {
    path: {
      fill: darkMode ? 'gainsboro' : '#878787',
    },
  },
  path: {
    fill: darkMode ? 'lightgrey' : 'black',
  },
}));
