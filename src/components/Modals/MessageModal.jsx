import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Typography, Modal } from '@mui/material';
import { Container, Row, Col } from 'react-bootstrap';

import { DarkLightModeContext } from '../DarkLightMode/context/DarkLightModeContext';

export const getCancelButtonColor = (cancelButtonColor, darkMode) =>
  darkMode ? 'secondary' : cancelButtonColor || 'error';

export const getConfirmButtonColor = (confirmButtonColor, darkMode) =>
  darkMode ? 'primary' : confirmButtonColor || 'success';

export const MessageModal = ({
  open,
  onClose,
  onSubmit,
  title,
  body,
  cancelButtonText,
  confirmButtonText,
  cancelButtonColor,
  confirmButtonColor,
}) => {
  const { darkMode } = React.useContext(DarkLightModeContext);

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer darkMode={darkMode}>
        <ModalRow>
          <Typography variant='h6' component='h1' className='text-center'>
            {title}
          </Typography>
        </ModalRow>
        <ModalRow>
          <Typography variant='body1' component='p' className='text-center'>
            {body}
          </Typography>
        </ModalRow>
        <ModalRow>
          <ModalButtonCol xs={6} sm={{ span: 3, offset: 3 }}>
            <Button
              color={getCancelButtonColor(cancelButtonColor, darkMode)}
              variant='contained'
              onClick={onClose}
              fullWidth
            >
              {cancelButtonText}
            </Button>
          </ModalButtonCol>
          <ModalButtonCol xs={6} sm={{ span: 3 }}>
            <Button
              color={getConfirmButtonColor(confirmButtonColor, darkMode)}
              variant='contained'
              onClick={onSubmit}
              fullWidth
            >
              {confirmButtonText}
            </Button>
          </ModalButtonCol>
        </ModalRow>
      </ModalContainer>
    </Modal>
  );
};

MessageModal.propTypes = {
  body: PropTypes.string,
  cancelButtonColor: PropTypes.string,
  cancelButtonText: PropTypes.string,
  confirmButtonColor: PropTypes.string,
  confirmButtonText: PropTypes.string,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
};

export const ModalContainer = styled(Container)(({ darkMode }) => ({
  'h1, h2, h3, h4, h5, h6, p': {
    color: darkMode && 'black',
  },
  backgroundColor: darkMode ? 'grey' : 'white',
  marginTop: 220,
  padding: 20,
  borderRadius: 5,
  maxWidth: 800,
}));

export const ModalRow = styled(Row)({
  padding: 10,
});

export const ModalButtonCol = styled(Col)({
  textAlign: 'center',
});
