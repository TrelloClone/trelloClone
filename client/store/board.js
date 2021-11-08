import axios from 'axios'


// Functions used for below
const sortListsAndCards = (board) => {
  const sortedLists = board.lists.sort((list1, list2) => {
    return list1.id - list2.id;
  });
  
  sortedLists.forEach((list) => {
    list.cards.sort((card1, card2) => {
      return card1.id - card2.id;
    })
  });

}

/**
 * ACTION TYPES
 */
const GET_BOARD = 'GET_BOARD';

/**
 * ACTION CREATORS
 */
const _getBoard = (board) => {
  return {
    type: GET_BOARD,
    board
  }
};


/**
 * THUNK CREATORS
 */
export const getBoard = (boardId) => {
  return async (dispatch) => {
    const { data: board } = await axios.get(`/api/boards/${boardId}`);
    
    if(board) {
      sortListsAndCards(board);
    }
    
    console.log('getBoard thunk, board:', board);
    dispatch(_getBoard(board));
  }
}

export const updateCardDescription = (card, cardDescription, board) => {
  return async (dispatch) => {
    const cardId = card.id;
    // console.log('updateCardDescription, cardId:', cardId);
    const cardUpdated = await axios.put(`/api/cards/${cardId}/description`, {description: cardDescription});
    // console.log('cardUpdated:', cardUpdated);

    const boardId = board.id;
    const { data: updatedBoard } = await axios.get(`/api/boards/${boardId}`);
    sortListsAndCards(updatedBoard);
    // console.log('updateCardDescription, updatedBoard:', updatedBoard);
    dispatch(_getBoard(updatedBoard));
  }
}

export const createNewCard = (list, cardTitle, user, board) => {
  return async (dispatch) => {
    const listId = list.id;
    const updatedList = await axios.post(`/api/lists/${listId}/newCard`, {
      title: cardTitle,
      creator: user.username
    });
    console.log('createNewCard, updatedList:', updatedList);

    const boardId = board.id;
    const { data: updatedBoard } = await axios.get(`/api/boards/${boardId}`);
    sortListsAndCards(updatedBoard);
    console.log('createNewCard, updatedBoard:', updatedBoard);
    dispatch(_getBoard(updatedBoard));
  }

}

export const createNewList = (board, listTitle) => {
  return async (dispatch) => {
    const newList = await axios.post(`/api/lists/newList/${board.id}`, { title: listTitle });
    console.log('createNewList, newList:', newList);

    const boardId = board.id;
    const { data: updatedBoard } = await axios.get(`/api/boards/${boardId}`);
    sortListsAndCards(updatedBoard);
    console.log('createNewCard, updatedBoard:', updatedBoard);
    dispatch(_getBoard(updatedBoard));
  }
}

const initialState = {};

export default function boardReducer(state = initialState, action) {
  switch(action.type) {
    case GET_BOARD: {
      return action.board;
    }
    default: {
      return state;
    }
  }
}
