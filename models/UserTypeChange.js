'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTypeChange extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserTypeChange.init(
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      avatarUrl: {
        type: DataTypes.STRING,
      },
      authorName: {
        type: DataTypes.CHAR(50),
      },
      authorDescription: {
        type: DataTypes.CHAR(255),
      },
      companyName: {
        type: DataTypes.CHAR(50),
      },
      businesslicenseImgUrl: {
        type: DataTypes.STRING,
      },
      businesslicenseNumber: {
        type: DataTypes.CHAR(50),
      },
      status: {
        type: DataTypes.ENUM,
        values: ['approved', 'pending', 'declined'],
        defaultValue: 'pending',
      },
      reason: {
        type: DataTypes.CHAR(255),
      },
    },
    {
      sequelize,
      modelName: 'UserTypeChange',
    }
  );
  return UserTypeChange;
};
