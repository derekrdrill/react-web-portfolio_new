import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Button, Grid, Modal, Typography } from '@mui/material/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFilePdf } from '@fortawesome/fontawesome-free-solid';
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons';

import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

import resume from '../../../assets/Resume_DRD.pdf';

const resumeOnlineLink = process.env.REACT_APP_RESUME_LINK;

export const MoreOptionsModal = ({ open, handleModalClose, quickViewOpen }) => {
  const { darkMode } = React.useContext(DarkLightModeContext);

  return (
    <Modal open={open} onClose={handleModalClose}>
      <StyledBox container darkMode={darkMode} spacing={2}>
        <Grid container>
          <Grid item xs={12}>
            <ModalTypography darkMode={darkMode} variant='h6' component='h2'>
              Resume options
            </ModalTypography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <ModalTypography darkMode={darkMode} sx={{ mt: 2 }}>
                  Select one of the following:
                </ModalTypography>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <StyledLink href={resume} download>
                  <Button color='info' fullWidth variant='outlined'>
                    Download PDF
                    <ResumeOptionsButtonIcon icon={faFilePdf} />
                  </Button>
                </StyledLink>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <StyledLink href={resumeOnlineLink} target='_blank'>
                  <Button color='info' fullWidth variant='outlined'>
                    Open Google Doc
                    <ResumeOptionsButtonIcon icon={faGoogleDrive} />
                  </Button>
                </StyledLink>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Button color='info' fullWidth variant='outlined' onClick={quickViewOpen}>
                  Quick View
                  <ResumeOptionsButtonIcon icon={faEye} />
                </Button>
              </Grid>
              <Grid item xs={12} md={12} lg={2}>
                <Button color='error' fullWidth variant='contained' onClick={handleModalClose}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </StyledBox>
    </Modal>
  );
};

MoreOptionsModal.propTypes = {
  handleModalClose: PropTypes.func,
  open: PropTypes.bool,
  quickViewOpen: PropTypes.func,
};

export const StyledBox = styled(Box)(({ darkMode }) => ({
  backgroundColor: darkMode ? '#545454' : 'white',
  marginLeft: '22%',
  marginTop: '18%',
  maxWidth: '60%',
  padding: 20,
  borderRadius: 5,
}));

export const ResumeOptionsButtonIcon = styled(FontAwesomeIcon)({
  marginLeft: 5,
});

export const StyledLink = styled.a({
  textDecoration: 'none',
});

export const ModalTypography = styled(Typography)(({ darkMode }) => ({
  color: darkMode && '#c4c4c4',
}));
