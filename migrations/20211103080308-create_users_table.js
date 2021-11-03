'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      kakaoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      kakaoToken: {
        type: Sequelize.CHAR(60),
        allowNull: true,
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('users');
  },
};
