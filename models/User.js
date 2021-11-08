const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');
const bcrypt = require('bcrypt');

const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userType: {
      type: Sequelize.ENUM('user', 'creator', 'company', 'admin'),
      defaultValue: 'user',
    },
    name: {
      type: Sequelize.CHAR(50),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: Sequelize.CHAR(20),
      allowNull: true,
    },
    companyContact: {
      type: Sequelize.CHAR(50),
      allowNull: true,
    },
    accessToken: {
      type: Sequelize.CHAR(100),
      allowNull: true,
    },
    refreshToken: {
      type: Sequelize.CHAR(100),
      allowNull: true,
    },
    birthDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    gender: {
      type: Sequelize.ENUM('man', 'woman', 'none'),
      defaultValue: 'none',
    },
    sinceDate: {
      type: Sequelize.DATE,
    },
    penName: {
      type: Sequelize.CHAR(20),
    },
    writerApproveDate: {
      type: Sequelize.DATE,
    },
    writerIntro: {
      type: Sequelize.CHAR(255),
    },
    writerProfile: {
      type: Sequelize.CHAR(255),
    },
    companyName: {
      type: Sequelize.CHAR(50),
    },
    companyNum: {
      type: Sequelize.CHAR(20),
    },
    companyApproveDate: {
      type: Sequelize.DATE,
    },
    companyProfile: {
      type: Sequelize.CHAR(255),
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    hooks: {
      afterCreate: (record) => {
        delete record.dataValues.password;
      },
      afterUpdate: (record) => {
        delete record.dataValues.password;
      },
    },
    scopes: {
      withoutPassword: {
        attributes: { exclude: ['password'] },
      },
    },
  }
);

User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

module.exports = User;
