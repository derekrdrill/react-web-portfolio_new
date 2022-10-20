import React from 'react';
import styled from 'styled-components';
import { Button, Modal } from '@mui/material';

import { DarkLightModeContext } from '../DarkLightMode/context/DarkLightModeContext';

export const BasicModal = ({
  backdropOpacity,
  buttonVariant,
  cancelButtonText,
  children,
  handleClose,
  handleSubmit,
  hideBackdrop,
  open,
  submitButtonText,
}) => {
  const { darkMode } = React.useContext(DarkLightModeContext);

  return (
    <Modal
      hideBackdrop={hideBackdrop}
      onClose={handleClose}
      open={open}
      BackdropProps={{ style: { opacity: backdropOpacity ?? 0.9 } }}
    >
      <ModalContainer darkMode={darkMode}>
        <ExitButtonContainer>
          <Button color='error' onClick={handleClose} size='small' variant='contained'>
            X
          </Button>
        </ExitButtonContainer>
        <ContentContainer>{children}</ContentContainer>
        <ActionButtonsContainer>
          <ButtonContainer>
            <CancelButton fullWidth onClick={handleClose} variant={buttonVariant ?? 'contained'}>
              {cancelButtonText ?? 'Cancel'}
            </CancelButton>
          </ButtonContainer>
          <ButtonContainer>
            <Button
              color='info'
              fullWidth
              onClick={
                /* istanbul ignore next */
                () => {
                  handleSubmit();
                  handleClose();
                }
              }
              variant={buttonVariant ?? 'contained'}
            >
              {submitButtonText ?? 'Submit'}
            </Button>
          </ButtonContainer>
        </ActionButtonsContainer>
      </ModalContainer>
    </Modal>
  );
};

export const ActionButtonsContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-around',
});

const ButtonContainer = styled.div({
  width: 185,
  maxWidth: 185,
});

export const CancelButton = styled(Button)(({ variant }) => ({
  '&.MuiButton-root': {
    ':hover': {
      backgroundColor: variant === 'outlined' ? '#f0f0f0' : '#424242',
    },
    backgroundColor: variant === 'outlined' ? 'transparent' : '#696969',
    borderColor: variant === 'outlined' ? 'grey' : 'transparent',
    color: variant === 'outlined' ? 'grey' : 'white',
  },
}));

export const ContentContainer = styled.div({
  padding: 30,
  display: 'flex',
  justifyContent: 'center',
});

export const ExitButtonContainer = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
});

export const ModalContainer = styled.div(({ darkMode }) => ({
  'h1, h2, h3, h4, h5, h6, p': {
    color: darkMode && 'black',
  },
  backgroundColor: darkMode ? 'grey' : 'white',
  marginLeft: '25%',
  marginTop: '18%',
  maxWidth: '50%',
  padding: 15,
  borderRadius: 5,
}));
