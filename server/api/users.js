const router = require('express').Router()
const { models: { User, Workspace, Board }} = require('../db')
module.exports = router

// api/users/...

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
});

router.get('/:userId/workspace', async(req, res, next) => {
  const userId = req.params.userId;
  // const workspaceId = req.params.workspaceId;

  try {
    const userWorkspace = await Workspace.findAll({
      where: {
        owner: userId
      },
      include: {
        model: Board
      }
    });

    res.send(userWorkspace);
  } catch (err) {
    next(err);
  }
});


