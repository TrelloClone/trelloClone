import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { createNewList } from '../store/board';

import TextField from '@mui/material/TextField';


const ListTitle = (props) => {
  const {
    board, input
  } = props;

  const [listTitle, setListTitle] = useState(input);
  const handleListTitle = (event) => {
    setListTitle(event.target.value);
  };

  return (
    <TextField
      id="outlined-basic" 
      variant="outlined"
      size="small"
      value={listTitle}
      onChange={handleListTitle}
    /> 
  )
}

const mapState = (state) => {
  return {
    board: state.board,
  }
}

const mapDispatch = (dispatch) => {
  return {
    createNewList: (board, listTitle) => dispatch(createNewList(board, listTitle))
  }
}

export default connect(mapState, mapDispatch)(ListTitle);

