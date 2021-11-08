'use strict'

const {
  db, 
  models: {User, Workspace, Board, List, Card, Comment, Guest} 
} = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ 
      username: 'cody',
      password: '123', 
      email: 'cody@email.com'
    }),
    User.create({ 
      username: 'murphy',
      password: '123',
      email: 'murphy@email.com'
    }),
    User.create({
      username: 'ben',
      password: '123',
      email: 'ben@email.com',
    })
  ]);

  const workspaces = await Promise.all([
    Workspace.create({ title: 'wkspce1', owner: users[0].dataValues.id }),
    Workspace.create({ title: 'wkspce2', owner: users[1].dataValues.id }),
    Workspace.create({ title: 'wkspce3', owner: users[2].dataValues.id }),
  ]);

  const boards = await Promise.all([
    Board.create({ title: 'board1', description: 'a board' }),
    Board.create({ title: 'board2' }),
    Board.create({ title: 'board1', description: 'same name board' }),
    Board.create({ title: 'board3', description: 'a board3'}),
  ]);

  const lists = await Promise.all([
    List.create({ title: 'list1'}),
    List.create({ title: 'list2'}),
    List.create({ title: 'list3'})
  ]);

  const cards = await Promise.all([
    Card.create({
      title: 'task1',
      creator: 'cody',
      description: 'card1'
    }),
    Card.create({
      title: 'task2',
      creator: 'cody',
      description: 'card2'
    }),
    Card.create({
      title: 'task3',
      creator: 'murphy',
      description: 'card3'
    }),
    Card.create({
      title: 'task4',
      creator: 'murphy',
      description: 'card4'
    }),
    Card.create({
      title: 'taskk',
      creator: 'murphy',
      description: 'murphy task'
    })
  ]);

  const comments = await Promise.all([
    Comment.create({ content: 'a comment, this task is due tomorrow' }),
    Comment.create({ content: 'update this task please' }),
    Comment.create({ content: 'hellooooo' }),
    Comment.create({ content: 'comment4' }),
  ]);

  const guests = await Promise.all([
    Guest.create({
      username: 'guest1',
      email: 'guest1@email.com',
    }),
    Guest.create({
      username: 'guest2',
      email: 'guest2@email.com'
    }),
    Guest.create({
      username: 'guest3',
      email: 'guest3@email.com'
    }),
    Guest.create({
      username: 'guest4',
      email: 'guest4@email.com'
    })
  ]);

  await users[0].addBoards([boards[0]]);
  await users[1].addBoards([boards[1]]);
  await boards[0].addUsers([users[1]]); 
  await users[2].addBoards([boards[2]]);

  await workspaces[0].addUsers([users[0], users[1]]);
  await workspaces[0].addBoards([boards[0]]);
  await workspaces[1].addUsers([users[1]]);
  await workspaces[1].addBoards([boards[1], boards[2]]);
  await workspaces[2].addUsers([users[0], users[2]]);
  await workspaces[2].addBoards([boards[3]]);

  await boards[0].addLists([lists[0], lists[1], lists[2]]);
  await boards[0].addGuests([guests[0], guests[1], guests[2]]);
  await boards[1].addLists([lists[1], lists[2]]);
  await boards[1].addGuests([guests[1], guests[2], guests[3]]);

  await lists[0].addCards([cards[0], cards[1]]);
  await lists[1].addCards([cards[2], cards[4]]);
  await lists[2].addCards([cards[3]]);

  await cards[0].addComments([comments[0], comments[1]]);
  await cards[1].addComments([comments[3], comments[2], comments[0]]);
  await cards[2].addComments([comments[1]]);
  await cards[3].addComments([comments[2], comments[0]]);

  await users[0].addComments([comments[0], comments[1]]);
  await users[1].addComments([comments[3], comments[2]]);
  
  console.log('seeded data successfully');

  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
