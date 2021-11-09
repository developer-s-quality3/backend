'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserTypeChanges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      avatarUrl: {
        type: Sequelize.STRING,
      },
      businesslicenseImgUrl: {
        type: Sequelize.STRING,
      },
      businesslicenseNumber: {
        type: Sequelize.CHAR,
      },
      authorDescription: {
        type: Sequelize.CHAR,
      },
      companyName: {
        type: Sequelize.CHAR,
      },
      authorName: {
        type: Sequelize.CHAR,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['approved', 'pending', 'declined'],
        defaultValue: 'pending',
      },
      reason: {
        type: Sequelize.CHAR,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserTypeChanges');
  },
};
