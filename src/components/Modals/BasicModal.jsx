import React from 'react';
import styled from 'styled-components';
import { Button, Modal } from '@mui/material';

export const BasicModal = ({ cancelButtonText, children, handleClose, handleSubmit, open, submitButtonText }) => (
  <Modal onClose={handleClose} open={open}>
    <ModalContainer>
      <ExitButtonContainer>
        <Button color='error' onClick={handleClose} size='small' variant='contained'>
          X
        </Button>
      </ExitButtonContainer>
      <ContentContainer>{children}</ContentContainer>
      <ActionButtonsContainer>
        <ButtonContainer>
          <CancelButton fullWidth onClick={handleClose} variant='contained'>
            {cancelButtonText ?? 'Cancel'}
          </CancelButton>
        </ButtonContainer>
        <ButtonContainer>
          <Button
            color='info'
            fullWidth
            onClick={() => {
              handleSubmit();
              handleClose();
            }}
            variant='contained'
          >
            {submitButtonText ?? 'Submit'}
          </Button>
        </ButtonContainer>
      </ActionButtonsContainer>
    </ModalContainer>
  </Modal>
);

const ModalContainer = styled.div({
  backgroundColor: 'white',
  marginLeft: '25%',
  marginTop: '18%',
  maxWidth: '50%',
  padding: 15,
  borderRadius: 5,
});

const ActionButtonsContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-around',
});

const ButtonContainer = styled.div({
  width: 185,
  maxWidth: 185,
});

const CancelButton = styled(Button)({
  '&.MuiButton-root': {
    ':hover': {
      backgroundColor: '#424242',
    },
    backgroundColor: '#696969',
  },
});

const ContentContainer = styled.div({
  padding: 30,
  display: 'flex',
  justifyContent: 'center',
});

const ExitButtonContainer = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
});
