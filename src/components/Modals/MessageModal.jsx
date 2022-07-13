import React, { useContext } from 'react';
import styled from 'styled-components';
import { Button, Typography, Modal } from '@mui/material';
import { Container, Row, Col } from 'react-bootstrap';

import { DarkLightModeContext } from '../DarkLightMode/context/DarkLightModeContext';

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
  const { darkMode } = useContext(DarkLightModeContext);

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
          <ModalButtonCol xs={6}>
            <Button
              color={darkMode ? 'secondary' : cancelButtonColor || 'error'}
              variant='contained'
              onClick={onClose}
              fullWidth
            >
              {cancelButtonText}
            </Button>
          </ModalButtonCol>
          <ModalButtonCol xs={6}>
            <Button
              color={darkMode ? 'primary' : confirmButtonColor || 'success'}
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

const ModalContainer = styled(Container)(({ darkMode }) => ({
  'h1, h2, h3, h4, h5, h6, p': {
    color: darkMode && 'black',
  },
  backgroundColor: darkMode ? 'grey' : 'white',
  marginLeft: '32%',
  marginTop: '18%',
  maxWidth: '35%',
  padding: 30,
  borderRadius: 5,
}));

const ModalRow = styled(Row)({
  padding: 10,
});

const ModalButtonCol = styled(Col)({
  textAlign: 'center',
});
