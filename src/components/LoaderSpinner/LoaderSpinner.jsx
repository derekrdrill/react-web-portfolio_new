import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import { Modal } from '@mui/material';
import { Container, Row, Col } from 'react-bootstrap';

import bitmojiLoading from '../../assets/bitmoji_loading.png';

export const LoaderSpinner = ({ open }) => (
  <Modal open={open} disableAutoFocus>
    <Container>
      <Row>
        <Col xs={{ span: 9, offset: 2 }} lg={{ span: 3, offset: 5 }}>
          <SpinningColumn>
            <BitmojiImage src={bitmojiLoading} />
          </SpinningColumn>
        </Col>
      </Row>
    </Container>
  </Modal>
);

LoaderSpinner.propTypes = {
  open: PropTypes.bool,
};

const spinning = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(3600deg)' },
});

const BitmojiImage = styled.img({
  height: '27vh',
  width: '25vh',
});

const SpinningColumn = styled.div({
  textAlign: 'center',
  animationName: css`
    ${spinning}
  `,
  animationDuration: '17s',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'linear',
  marginTop: '70%',
  border: '1px gold gold',
  borderRadius: 50,
  zIndex: 1,
  backgroundColor: 'goldenrod',
});
