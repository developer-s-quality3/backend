const {
  User,
  UserTypeChange,
  Work,
  Episode,
  EpisodeImage,
} = require('../models');

const createWork = async (req, res) => {
  const parsedData = JSON.parse(req.body.workInfo);

  const { userId, title, workDescription } = parsedData;

  try {
    const work = await Work.create({
      userId,
      title,
      workThumbnail: req.file.location,
      workDescription,
      status: 'application',
    });
    return res.send(work);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllWorks = async (req, res) => {
  try {
    const works = await Work.findAll({
      include: [{ model: User, as: 'user' }],
    });
    return res.send(works);
  } catch (error) {
    throw new Error(error.message);
  }
};

const createEpisode = async (req, res) => {
  const parsedData = JSON.parse(req.body.episodeInfo);

  const { workId, episodeName, episodeOrder, episodeDescription } = parsedData;
  const { episodeThumbnail, episodeImages } = req.files;

  try {
    const episode = await Episode.create({
      workId,
      episodeName,
      episodeOrder,
      episodeDescription,
      episodeThumbnailUrl: episodeThumbnail[0].location,
    });

    const episodeImagesDatas = episodeImages.map((file) => {
      return {
        episodeId: episode.id,
        imageOrder: file.originalname.split('.')[0].split('_')[1],
        imageUrl: file.location,
      };
    });

    const uploadedEpisodeImages = await EpisodeImage.bulkCreate(
      episodeImagesDatas
    );
    return res.send(uploadedEpisodeImages);
  } catch (error) {
    throw new Error(error.message);
  }
};

const uploadEpisodeImages = async (req, res) => {
  const parsedData = JSON.parse(req.body.episodeImagesInfo);
  console.log(req.files);
  const episodeImagesUrl = req.files.map((file) => file.location);

  try {
    // const episodesImages = await EpisodeImage.create({});
    res.send('test');
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  uploadEpisodeImages,
  createEpisode,
  getAllWorks,
  createWork,
};
