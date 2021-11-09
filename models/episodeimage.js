'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EpisodeImage extends Model {
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
  EpisodeImage.init(
    {
      episodeId: { type: DataTypes.INTEGER, allowNull: false },
      imageOrder: { type: DataTypes.INTEGER, allowNull: false },
      imageUrl: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'EpisodeImage',
    }
  );
  return EpisodeImage;
};
