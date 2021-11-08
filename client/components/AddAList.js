import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { createNewList } from '../store/board';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ClickAwayListener from '@mui/material/ClickAwayListener';

export const AddAList = (props) => {
  const {
    createNewList, board,
  } = props;

  const [newList, setNewList] = useState(false);
  const handleNewList = () => {
    setNewList((prev) => !prev);
  }

  const [listTitle, setListTitle] = useState('');
  const handleListTitle = (event) => {
    setListTitle(event.target.value);
  }


  // console.log('AddAList, listTitle:', listTitle);

  return (
    <div>
      {
        newList ?
        <div>
          <ClickAwayListener onClickAway={handleNewList}>
            <TextField 
              id="outlined-basic" 
              variant="outlined" 
              placeholder="Enter list title..."
              value={listTitle}
              onChange={handleListTitle} 
            />
          </ClickAwayListener>
          <div>
            <Button 
              variant="contained" 
              onClick={() => createNewList(board, listTitle)} 
            >
              Add list
            </Button>
          </div>
        </div> :
        <Button variant="outlined" onClick={handleNewList}>New List</Button>
      }
      
      
    </div>
  )
}

const mapState = (state) => {
  return {
    board: state.board
  }
}

const mapDispatch = (dispatch) => {
  return {
    createNewList: (board, listTitle) => dispatch(createNewList(board, listTitle))
  }
}

export default connect(mapState, mapDispatch)(AddAList);