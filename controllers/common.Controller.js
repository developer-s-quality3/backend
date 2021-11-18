const {
  User,
  UserTypeChange,
  Work,
  Episode,
  EpisodeImage,
  Genre,
} = require('../models');

const getEpisodes = async (req, res) => {
  const { workId } = req.params;

  try {
    const episodes = await Episode.findAll({
      include: [{ model: EpisodeImage, as: 'episodeImages' }],
      where: { workId },
    });
    return res.send(episodes);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getEpisodeImages = async (req, res) => {
  const { episodeId } = req.params;

  try {
    const episodeImages = await EpisodeImage.findAll({ where: { episodeId } });
    return res.send(episodeImages);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getEpisodes,
  getEpisodeImages,
};
