'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Work }) {
      // define association here

      this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      this.belongsTo(Work, { foreignKey: 'workId', as: 'work' });
    }
  }
  Like.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      workId: { type: DataTypes.INTEGER, allowNull: false },
      isLike: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Like',
    }
  );
  return Like;
};
