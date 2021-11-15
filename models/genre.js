'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ GenreType }) {
      // define association here
      this.hasMany(GenreType, { foreignKey: 'genreId', as: 'genreType' });
    }
  }
  Genre.init(
    {
      name: { type: DataTypes.CHAR, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Genre',
    }
  );
  return Genre;
};
