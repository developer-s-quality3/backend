'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Work extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Work.init(
    {
      title: {
        type: DataTypes.CHAR,
        allowNull: false,
      },
      workThumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      workDescription: {
        type: DataTypes.CHAR,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Work',
    }
  );
  return Work;
};
