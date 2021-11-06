const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const Session = sequelize.define(
  'session',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    valid: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Session;
