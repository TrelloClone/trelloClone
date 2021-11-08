import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import { getWorkspace } from '../store/workspace';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Display user's workspace (boards, etc.)
const Workspace = props => {
  const { user, getWorkspace, workspace } = props
  const boards = workspace.boards;
  console.log('Workspace, props:', props);

  useEffect(() => {
    getWorkspace(user.id);
  }, [])

  // const displayWorkspace = (userId) => {
  //   const workspace = getWorkspace(userId);
  //   console.log('displayWorkspace, workspace:', workspace);
  // } 

  // console.log('Workspace, workspace:', workspace);

  if(Object.keys(workspace).length === 0) {
    // console.log('workspace is empty');
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );
  }

  // console.log('Workspace, user.username:', user.username);


  return (
    <div>
        <Typography  variant="h3" >
          Welcome, {user.username}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            padding: 1,
            margin: 1,
            bgcolor: 'background.paper',
            height: 100,
          }}
        >
          {
            boards.map((board) => {
              return (
                <Box key={board.id} sx={{ padding: 1, bgcolor: 'grey.300' }}>
                  <Link to={`/board/${board.id}`}>{board.title}</Link>
                </Box>
              )
            })
          }
          
        </Box>   
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.auth,
    workspace: state.workspace
  }
}

const mapDispatch = (dispatch) => {
  return {
    getWorkspace: (userId) => dispatch(getWorkspace(userId)),
  }
}

export default connect(mapState, mapDispatch)(Workspace)
