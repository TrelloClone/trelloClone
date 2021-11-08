import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { updateCardDescription } from '../store/board';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';

const Card = (props) => {
  const {
    card,
    board,
    updateCardDescription,
  } = props;
  
  const [cardTitle, setCardTitle] = useState('');
  const handleCardTitle = (event) => {
    setCardTitle(event.target.value);
  }
  const [cardDescription, setCardDescription] = useState('');
  const handleCardDescription = (event) => {
    setCardDescription(event.target.value);
  }
  const submitCardDescription = (card) => {
    // console.log('submitCardDescription, cardDescription:', cardDescription);
    // console.log('submitCardDescription, card:', card);
    updateCardDescription(card, cardDescription, board);
  }

  const [open, setOpen] = useState(false);
  const handleOpen = (card) => {
    // console.log('handleOpen, card', card);
    setOpen(true);
    setCardDescription(card.description);
    setCardTitle(card.title);
  }
  const handleClose = () => setOpen(false);

  
  // console.log('Card, card:', card);


  return (
    <div>
      <Button onClick={() => handleOpen(card)}>{card.title}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            padding: 4,
          }} 
        >
          <TextField
            id="card-title"
            multiline
            maxRows={4}
            value={cardTitle}
            onChange={handleCardTitle}
            variant="standard"
          />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Description
          </Typography>
          <TextField
            id="card-description"
            multiline
            rows={4}
            fullWidth
            value={cardDescription}
            onChange={handleCardDescription}
          />
          <Button 
            variant="contained"
            onClick={() => submitCardDescription(card)}
          >
            Save Description
          </Button>
        </Box>
      </Modal>
    </div>
  )
}

const mapDispatch = (dispatch) => {
  return {
    updateCardDescription: (card, cardDescription, board) => dispatch(updateCardDescription(card, cardDescription, board)),
  }
}

export default connect(null, mapDispatch)(Card);