const Sequelize = require('sequelize');
const db = require('../db');

const Event = db.define('event', {
  startTime: {
    type: Sequelize.DATE
  },
  endTime: {
    type: Sequelize.DATE
  },
  description: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  }
})

module.exports = Event;