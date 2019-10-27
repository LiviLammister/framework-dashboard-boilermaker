const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  vote: {
    type: Sequelize.ENUM('angular', 'ember', 'react', 'vue')
  },
  sessionID: {
    type: Sequelize.STRING
  }
})

module.exports = User
