const router = require('express').Router();
const { models: { Board, User, List, Card, Workspace }} = require('../db');

// api/boards/...

router.get('/:userId/lists', async (req, res, next) => {
  const userId = req.params.userId;
  const boardTitle = 'board1'; // req.body

  try {
    const userBoard = await Board.findAll({
      include: {
        model: User,
        where: {
          id: userId
        }
      }
    });

    res.send(userBoard);
  } catch(err) {
    next(err);
  }
});

// Get a board and its contents
router.get('/:boardId', async (req, res, next) => {
  const boardId = req.params.boardId;

  try {
    const board = await Board.findOne({
      where: {
        id: boardId
      },
      include: {
        model: List,
        include: Card
      }
    });

    res.send(board);
  } catch (err) {
    next(err)
  }
});

// Create a board for a user
router.post('/newBoard/:userId/:workspaceId', async (req, res, next) => {
  const userId = req.params.userId;
  const workspaceId = req.params.workspaceId;

  try {
    const newBoard = await Board.create(req.body)
    const currUser = await User.findOne({
      where: {
        id: userId
      }
    });
    const currWorkspace = await Workspace.findOne({
      where: {
        id: workspaceId
      }
    });
    await newBoard.addUsers(currUser);
    await currWorkspace.addBoards(newBoard);

    const updatedWorkspace = await Workspace.findOne({
      where: {
        id: workspaceId
      },
      include: Board
    });

    res.send(updatedWorkspace);
  } catch (err) {
    next(err);
  }
})

module.exports = router;
