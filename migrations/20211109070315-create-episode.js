'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Episodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      workId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      episodeName: {
        type: Sequelize.CHAR,
        allowNull: false,
      },
      episodeOrder: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      episodeDescription: {
        type: Sequelize.CHAR,
        allowNull: false,
      },
      episodeStatus: {
        type: Sequelize.ENUM,
        values: ['approved', 'declined', 'pending'],
        defaultValue: 'pending',
      },
      episodeThumbnailUrl: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('Episodes');
  },
};
