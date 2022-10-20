import React from 'react';
import PropTypes from 'prop-types';
import FileViewer from 'react-file-viewer';
import styled from 'styled-components';
import { Button, Modal } from '@mui/material';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/fontawesome-free-solid';
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons';

export const FileQuickView = ({ fileType, filePath, onlineLink, open, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <FileQuickViewContainer fluid>
      <FileQuickViewToolbar>
        <Col xs={1} className='mt-1'>
          <Button color='error' variant='text' onClick={onClose}>
            EXIT
          </Button>
        </Col>
        <Col xs={{ span: 1, offset: 10 }}>
          <UtilityButtons href={filePath} download>
            <FontAwesomeIcon icon={faDownload} />
          </UtilityButtons>
          <UtilityButtons href={onlineLink} target='_blank'>
            <FontAwesomeIcon icon={faGoogleDrive} />
          </UtilityButtons>
        </Col>
      </FileQuickViewToolbar>
      <Row>
        <FileViewer fileType={fileType} filePath={filePath} />
      </Row>
    </FileQuickViewContainer>
  </Modal>
);

FileQuickView.propTypes = {
  filePath: PropTypes.string,
  fileType: PropTypes.string,
  onClose: PropTypes.func,
  onlineLink: PropTypes.string,
  open: PropTypes.bool,
};

const FileQuickViewContainer = styled(Container)({
  height: '85%',
  width: '55%',
  overflow: 'auto',
  border: '1px solid black',
  borderRadius: 3,
  transform: 'translateY(5vh)',
  backdropFilter: 'blur(10px)',
  canvas: {
    width: '92%',
    marginLeft: '4%',
  },
});

const FileQuickViewToolbar = styled(Row)({
  backgroundColor: 'gainsboro',
  position: 'sticky',
  top: 0,
  zIndex: 1,
});

const UtilityButtons = styled.a({
  padding: 8,
});
