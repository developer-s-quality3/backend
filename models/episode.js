'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Episode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Work, EpisodeImage }) {
      // define association here
      this.hasMany(EpisodeImage, {
        foreignKey: 'episodeId',
        as: 'episodeImages',
      });
      ////////
      this.belongsTo(Work, { foreignKey: 'workId', as: 'work' });
    }
  }
  Episode.init(
    {
      workId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      episodeName: {
        type: DataTypes.CHAR,
        allowNull: false,
      },
      episodeOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      episodeDescription: {
        type: DataTypes.CHAR,
        allowNull: false,
      },
      episodeStatus: {
        type: DataTypes.ENUM,
        values: ['approved', 'declined', 'pending'],
        defaultValue: 'pending',
      },
      episodeThumbnailUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Episode',
    }
  );
  return Episode;
};
