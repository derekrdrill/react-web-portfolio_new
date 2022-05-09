import React from 'react';
import styled from 'styled-components';
import { Box, Button, Modal, Typography } from '@mui/material/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFilePdf } from '@fortawesome/fontawesome-free-solid';
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons';
import resume from '../../../assets/Resume_DRD.pdf';

export const MoreOptionsModal = ({ open, handleModalClose, quickViewOpen }) => (
  <Modal open={open} onClose={handleModalClose}>
    <StyledBox>
      <Typography variant='h6' component='h2'>
        Resume options
      </Typography>
      <Typography sx={{ mt: 2 }}>Select one of the following:</Typography>
      <StyledLink href={resume} download>
        <ResumeOptionButtons>
          Download a Copy
          <ResumeOptionsButtonIcon icon={faFilePdf} />
        </ResumeOptionButtons>
      </StyledLink>
      <StyledLink
        href='https://docs.google.com/document/d/1qJIlaZflsm-oBC34z5-z2aLWVnZJJZkz/edit?usp=sharing&ouid=111233393235096509511&rtpof=true&sd=true'
        target='_blank'
      >
        <ResumeOptionButtons>
          Go to Google Doc
          <ResumeOptionsButtonIcon icon={faGoogleDrive} />
        </ResumeOptionButtons>
      </StyledLink>
      <ResumeOptionButtons onClick={quickViewOpen}>
        Quick View
        <ResumeOptionsButtonIcon icon={faEye} />
      </ResumeOptionButtons>
      <ResumeOptionButtons cancelbutton='true' onClick={handleModalClose}>
        Cancel
      </ResumeOptionButtons>
    </StyledBox>
  </Modal>
);

const StyledBox = styled(Box)({
  backgroundColor: 'white',
  marginLeft: '25%',
  marginTop: '18%',
  maxWidth: '50%',
  padding: 20,
  borderRadius: 5,
});

const ResumeOptionButtons = styled(Button)(({ cancelbutton }) => ({
  backgroundColor: cancelbutton ? 'gainsboro' : '#311b92',
  color: cancelbutton ? 'black' : 'white',
  marginRight: 4,
  marginTop: 5,
  ':hover': {
    backgroundColor: cancelbutton ? 'gray' : '#6200ea',
  },
}));

const ResumeOptionsButtonIcon = styled(FontAwesomeIcon)({
  marginLeft: 5,
});

const StyledLink = styled.a({
  textDecoration: 'none',
});
