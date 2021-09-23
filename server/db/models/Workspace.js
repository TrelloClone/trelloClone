const Sequelize = require('sequelize')
const db = require('../db');

const Workspace = db.define('workspace', {
  title: {
    type: Sequelize.STRING 
  }
});

module.exports = Workspace;