import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Typography } from '@mui/material';
import { Card } from '../../Card/Card';
import { BasicModal } from '../../Modals/BasicModal';
import { FeedbackContext } from '../context/FeedbackContext';
import { FaTimes, FaEdit } from 'react-icons/fa';

export const FeedbackItem = ({ bgColorNumDisplay, id, rating, text }) => {
  const { deleteFeedbackItem, setFeedbackEditItems } = React.useContext(FeedbackContext);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <Card>
      <NumberDisplay bgColor={bgColorNumDisplay}>
        <Typography variant='subtitle' component='h6'>
          {rating}
        </Typography>
      </NumberDisplay>
      <ActionButtonsDisplay>
        <ActionsButtonContainer>
          <Button
            color='secondary'
            fullWidth
            onClick={() =>
              setFeedbackEditItems(
                {
                  id: id,
                  text: text,
                  rating: rating,
                },
                true,
              )
            }
          >
            <FaEdit color='purple' />
          </Button>
        </ActionsButtonContainer>
        <ActionsButtonContainer>
          <Button color='secondary' fullWidth onClick={handleModalOpen}>
            <FaTimes color='purple' />
          </Button>
        </ActionsButtonContainer>
      </ActionButtonsDisplay>
      <TextDisplay>
        <Typography variant='subtitle1' component='p'>
          {text}
        </Typography>
      </TextDisplay>
      <BasicModal
        cancelButtonText='I changed my mind'
        handleClose={handleModalClose}
        handleSubmit={() => deleteFeedbackItem(id)}
        open={modalOpen}
        submitButtonText='Yes, delete it'
      >
        <Typography paragraph>Are you sure you want to delete this feedback record?</Typography>
      </BasicModal>
    </Card>
  );
};

FeedbackItem.propTypes = {
  bgColorNumDisplay: PropTypes.string,
  id: PropTypes.string,
  rating: PropTypes.number,
  text: PropTypes.string,
};

export const NumberDisplay = styled.div(({ bgColor }) => ({
  position: 'relative',
  background: '#f4f4f4',
  width: 50,
  height: 50,
  padding: 4,
  textAlign: 'center',
  borderRadius: '50%',
  fontSize: 30,
  border: '1px #eee solid',
  transition: '0.3s',
  color: '#FFF',
  backgroundColor: bgColor,
  transform: 'translate(-60px, -50px)',
  '.MuiTypography-root': {
    paddingTop: 12,
  },
}));

const ActionsButtonContainer = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  maxWidth: 50,
});

const ActionButtonsDisplay = styled.div({
  position: 'absolute',
  top: 10,
  right: 1,
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  display: 'flex',
  justifyContent: 'flex-end',
});

const TextDisplay = styled.div({
  transform: 'translate(0px, -40px)',
});
