'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_type_changes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
        allowNull: true,
      },
      penName: {
        type: Sequelize.CHAR(50),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('aprroved', 'pending', 'declined'),
        defaultValue: 'pending',
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_type_changes');
  },
};
