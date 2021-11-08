import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { createNewCard } from '../store/board';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import ClickAwayListener from '@mui/material/ClickAwayListener';


const AddACard = (props) => {
  const {
    currList, user, board,
    createNewCard
  } = props;
  
  const [cardTitle, setCardTitle] = useState('');
  const handleCardTitle = (event) => {
    setCardTitle(event.target.value);
  }

  const [addCard, setAddCard] = useState(false);
  const handleAddCard = () => {
    console.log('At handleAddCard, cardTitle:', cardTitle);
    setAddCard((prev) => !prev);
    //Add a new card to the list, title only
    if(cardTitle !== '') {
      console.log('cardTitle not empty');
      createNewCard(currList, cardTitle, user, board);
    } 
    
    setCardTitle('');
  }


  // console.log('AddACard, currList:', currList);


  if(!addCard) {
    return (
      <div>
        <Button onClick={handleAddCard}>Add a card</Button>
      </div>
    )
  }


  return (
        
    <div>
      <div>
        <ClickAwayListener onClickAway={handleAddCard}> 
          <TextField
            id="card-title"
            multiline
            maxRows={4}
            placeholder="Enter card title..."
            value={cardTitle}
            onChange={handleCardTitle}
          />
        </ClickAwayListener>
      </div>
      <Button variant="contained" onClick={handleAddCard}>Add a card</Button>
      

      
    </div>
    
  )
}

const mapDispatch = (dispatch) => {
  return {
    createNewCard: (currList, cardTitle, user, board) => dispatch(createNewCard(currList, cardTitle, user, board))
  }
}

export default connect(null, mapDispatch)(AddACard);