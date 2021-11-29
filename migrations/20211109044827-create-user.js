'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userType: {
        type: Sequelize.ENUM,
        values: ['user', 'author', 'company', 'admin'],
        defaultValue: 'user',
      },
      name: {
        type: Sequelize.CHAR,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.CHAR,
      },
      companyContact: {
        type: Sequelize.CHAR,
      },
      birthDate: {
        type: Sequelize.DATE,
      },
      gender: {
        type: Sequelize.ENUM,
        values: ['man', 'woman', 'none'],
        defaultValue: 'none',
      },
      authorName: {
        type: Sequelize.CHAR,
      },
      authorApprovedDate: {
        type: Sequelize.DATE,
      },
      authorDescription: {
        type: Sequelize.CHAR,
      },
      authorAvatar: {
        type: Sequelize.STRING,
      },
      authorBanner: {
        type: Sequelize.STRING,
      },
      companyName: {
        type: Sequelize.CHAR,
      },
      companyLicenseNumber: {
        type: Sequelize.CHAR,
      },
      companyApprovedDate: {
        type: Sequelize.DATE,
      },
      companyImageUrl: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Users');
  },
};
