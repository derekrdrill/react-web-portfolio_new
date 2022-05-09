import React from 'react';
import styled from 'styled-components';
import { Button, Typography, Modal } from '@mui/material';
import { Container, Row, Col } from 'react-bootstrap';

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
}) => (
  <Modal open={open} onClose={onClose}>
    <ModalContainer>
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
          <Button color={cancelButtonColor || 'error'} variant='contained' onClick={onClose} fullWidth>
            {cancelButtonText}
          </Button>
        </ModalButtonCol>
        <ModalButtonCol xs={6}>
          <Button color={confirmButtonColor || 'success'} variant='contained' onClick={onSubmit} fullWidth>
            {confirmButtonText}
          </Button>
        </ModalButtonCol>
      </ModalRow>
    </ModalContainer>
  </Modal>
);

const ModalContainer = styled(Container)({
  backgroundColor: 'white',
  marginLeft: '32%',
  marginTop: '18%',
  maxWidth: '35%',
  padding: 30,
  borderRadius: 5,
});

const ModalRow = styled(Row)({
  padding: 10,
});

const ModalButtonCol = styled(Col)({
  textAlign: 'center',
});
