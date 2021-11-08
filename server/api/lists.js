const router = require('express').Router();
const { models: { List, Card, Board }} = require('../db');

// api/lists/...

// All lists
router.get('/', async (req, res, next) => {
  try {
    const lists = await List.findAll();

    res.send(lists);
  } catch (err) {
    next(err);
  }
});

// All lists and their cards
router.get('/cards', async (req, res, next) => {
  try {
    const lists = await List.findAll({
      include: Card
    });

    res.send(lists);
  } catch (err) {
    next(err);
  }
});

// Add a new card to a list
router.post('/:listId/newCard', async (req, res, next) => {
  const listId = req.params.listId;

  try {
    const list = await List.findOne({
      where: {
        id: listId
      },
    });

    const newCard = await Card.create(req.body);
    await list.addCards(newCard);
    
    // not really needed, leave here for now
    const updatedList = await List.findOne({
      where: {
        id: listId
      },
      include: Card
    });

    res.send(updatedList);
  } catch (err) {
    next(err);
  }
});

// Add a new list to a board
router.post('/newList/:boardId', async (req, res, next) => {
  const boardId = req.params.boardId;

  try {
    const newList = await List.create(req.body);
    const currBoard = await Board.findOne({
      where: {
        id: boardId
      }
    });
    await currBoard.addLists(newList);
    

    const updatedBoard = await Board.findOne({
      where: {
        id: boardId
      },
      include: List
    });

    res.send(updatedBoard);
  } catch (err) {
    next(err);
  }
})

module.exports = router;