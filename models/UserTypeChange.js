const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const UserTypeChange = sequelize.define('user_type_change', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
  thumbnailUrl: {
    type: Sequelize.STRING,
  },
  businesslicenseImgUrl: {
    type: Sequelize.STRING,
  },
  businesslicenseNumber: {
    type: Sequelize.CHAR(50),
  },
  introduction: {
    type: Sequelize.CHAR(255),
  },
  companyName: {
    type: Sequelize.CHAR(50),
  },
  penName: {
    type: Sequelize.CHAR(50),
  },
  status: {
    type: Sequelize.ENUM('approved', 'pending', 'declined'),
    defaultValue: 'pending',
  },
  reason: {
    type: Sequelize.CHAR(255),
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

module.exports = UserTypeChange;
