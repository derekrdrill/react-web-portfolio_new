import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Modal } from '@mui/material';

import { DarkLightModeContext } from '../DarkLightMode/context/DarkLightModeContext';

export const BasicModal = ({
  backdropOpacity,
  buttonVariant,
  cancelButtonText,
  children,
  exitButtonText,
  handleClose,
  handleSubmit,
  hideBackdrop,
  isActionButtonsHidden,
  isBoxShadowHidden,
  marginLeft,
  marginRight,
  marginTop,
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
      <ModalContainer
        darkMode={darkMode}
        isBoxShadowHidden={isBoxShadowHidden}
        marginLeft={marginLeft}
        marginRight={marginRight}
        marginTop={marginTop}
      >
        <ExitButtonContainer>
          <ExitButton color='error' onClick={handleClose} size='small' variant='contained'>
            {exitButtonText ?? 'x'}
          </ExitButton>
        </ExitButtonContainer>
        <ContentContainer>{children}</ContentContainer>
        {!isActionButtonsHidden && (
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
        )}
      </ModalContainer>
    </Modal>
  );
};

BasicModal.propTypes = {
  backdropOpacity: PropTypes.number,
  buttonVariant: PropTypes.string,
  cancelButtonText: PropTypes.string,
  children: PropTypes.node,
  exitButtonText: PropTypes.string,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
  hideBackdrop: PropTypes.bool,
  isActionButtonsHidden: PropTypes.bool,
  isBoxShadowHidden: PropTypes.bool,
  marginLeft: PropTypes.string || PropTypes.number,
  marginRight: PropTypes.string || PropTypes.number,
  marginTop: PropTypes.string || PropTypes.number,
  open: PropTypes.bool,
  submitButtonText: PropTypes.string,
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

export const ExitButton = styled(Button)({
  minWidth: '35px !important',
});

export const ModalContainer = styled.div(
  ({ darkMode, isBoxShadowHidden, marginLeft, marginRight, marginTop }) => ({
    'h1, h2, h3, h4, h5, h6, p': {
      color: darkMode && 'black',
    },
    backgroundColor: darkMode ? '#8c8c8c' : 'white',
    marginLeft: marginLeft ? marginLeft : '15%',
    marginRight: marginRight ? marginRight : '15%',
    marginTop: marginTop ? marginTop : 150,
    padding: 15,
    borderRadius: 5,
    boxShadow: !isBoxShadowHidden && `4px 4px 8px ${darkMode ? '#6b6b6b' : '#545454'}`,
  }),
);
