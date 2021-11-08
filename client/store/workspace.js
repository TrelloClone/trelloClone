import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_WORKSPACE = 'GET_WORKSPACE';


/**
 * ACTION CREATORS
 */
const _getWorkspace = (workspace) => {
  return {
    type: GET_WORKSPACE,
    workspace
  }
};


/**
 * THUNK CREATORS
 */
export const getWorkspace = (userId) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/users/${userId}/workspace`);
    const workspace = response.data[0];

    dispatch(_getWorkspace(workspace));
  }
}

export const createNewBoard = (userId, workspaceId, boardTitle) => {
  return async (dispatch) => {
    const updatedWorkspace = await axios.post(`/api/boards/newBoard/${userId}/${workspaceId}`, {
      title: boardTitle
    });
    console.log('createNewBoard, updatedWorkspace:', updatedWorkspace);
    
    const response = await axios.get(`/api/users/${userId}/workspace`);
    const workspace = response.data[0];

    dispatch(_getWorkspace(workspace));
  }
}


const initialState = {};

export default function workspaceReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WORKSPACE: {
      return action.workspace;
    }
    default: {
      return state;
    }
  }
}
