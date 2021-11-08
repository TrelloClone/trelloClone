import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import { getBoard } from '../store/board';
import { getWorkspace, createNewBoard } from '../store/workspace';
import Card from './Card';
import AddACard from './AddACard';
import ListTitle from './ListTitle';
import AddAList from './AddAList';

import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



const Board = (props) => {
  const { 
    board, getBoard, createNewBoard,
    user, workspace, getWorkspace,
  } = props;
  const boards = workspace.boards;

  const boardId = props.match.params.boardId;
  useEffect(() => {
    console.log('Board, useEffect');
    getBoard(boardId);
    getWorkspace(user.id);
  }, []);

  const [addBoard, setAddBoard] = useState(false);
  const openAddBoard = () => {
    setAddBoard(true);
  }
  const closeAddBoard = () => {
    setAddBoard(false);
  }

  const [boardTitle, setBoardTitle] = useState('');
  const handleBoardTitle = (event) => {
    setBoardTitle(event.target.value);
  }

  

  // console.log('Board, boards:', boards);


  if(!board.id || !boards) {
    console.log('!board.id || !boards');
    return (
      <div>
        <h4>Loading boards...</h4>
      </div>
    );
  }

  return (
    
    <div className="board">
    {/* // <Box
    //   sx={{
    //     display: "grid",
    //     gridAutoColumns: "1fr",
    //   }}
    // > */}
      <Typography variant="h4">
        My Board
      </Typography> 

      <Button variant="outlined" onClick={openAddBoard}>New Board</Button>
      <Modal
        open={addBoard}
        onClose={closeAddBoard}
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
            variant="outlined"
            value={boardTitle}
            onChange={handleBoardTitle}
            placeholder="Add board title"
          />
          <div>
            <Button 
              variant="contained"
              onClick={() => createNewBoard(user.id, workspace.id, boardTitle)}
            >
              Create board
            </Button>
          </div>
          
        </Box>
      </Modal>

      
      <Stack
        spacing={2}
        direction="row"
      >
        {
          boards.map((board) => {
            return (
              <Button key={board.id} onClick={() => getBoard(board.id)} >{board.title}</Button>
            )
          })
        }
      </Stack>
      
      <AddAList />
      
      <Stack
        spacing={2}
        direction="row"
        sx={{
          backgroundColor: 'orange',
    
        }}
      
      >
        
        {
          board.lists.map((list) => {
            return (
              <Stack
                key={list.id}
                sx={{
                  bgcolor: "grey.400",
                  boxSizing: "border-box",
                  flexShrink: 0,
                }}
                spacing={1}
              >
                
                <ListTitle input={list.title}/>
                {
                  list.cards.map((card) => {
                    // console.log('list.cards.map, card:', card);
                    return (
                      <div key={card.id}>
                        <Card card={card} board={board}/>
                      </div>
                    )
                  })
                }
                
                <AddACard  currList={list} user={user} board={board} />
              </Stack>
              
            )
          })
        }
      
      </Stack>
    {/* </Box> */}
    </div>
    
  );
}

const mapState = (state) => {
  return {
    board: state.board,
    user: state.auth,
    workspace: state.workspace
  }
};

const mapDispatch = (dispatch) => {
  return {
    getBoard: (boardId) => dispatch(getBoard(boardId)),
    getWorkspace: (userId) => dispatch(getWorkspace(userId)),
    createNewBoard: (userId, workspaceId, boardTitle) => dispatch(createNewBoard(userId, workspaceId, boardTitle)), 
  }
}

export default connect(mapState, mapDispatch)(Board);
