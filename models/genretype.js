'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GenreType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Genre, Work }) {
      // define association here
      this.belongsTo(Genre, { foreignKey: 'genreId', as: 'genre' });
      this.belongsTo(Work, { foreignKey: 'workId', as: 'work' });
    }
  }
  GenreType.init(
    {
      genreId: DataTypes.INTEGER,
      workId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'GenreType',
    }
  );
  return GenreType;
};
