'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class View extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Episode }) {
      // define association here
      this.belongsTo(Episode, { foreignKey: 'episodeId', as: 'episode' });
    }
  }
  View.init(
    {
      episodeId: { type: DataTypes.INTEGER, allowNull: false },
      views: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      sequelize,
      modelName: 'View',
    }
  );
  return View;
};
