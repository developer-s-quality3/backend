'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Work extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Episode, GenreType }) {
      // define association here
      this.hasMany(Episode, { foreignKey: 'workId', as: 'episode' });

      this.hasMany(GenreType, { foreignKey: 'workId', as: 'genreType' });
      //////
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }
  }
  Work.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ['regular', 'application', 'declined', 'pending'],
        defaultValue: 'pending',
      },
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
