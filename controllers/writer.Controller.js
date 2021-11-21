const { User, Work, Episode, EpisodeImage, GenreType } = require('../models');

const createWork = async (req, res) => {
  const parsedData = JSON.parse(req.body.workInfo);

  const { userId, title, workDescription } = parsedData;

  console.log(req.files);

  try {
    const work = await Work.create({
      userId,
      title,
      workThumbnail: req.file.location,
      workDescription,
      status: 'pending',
    });
    const genreType = await GenreType.create({
      genreId: parsedData.genreId,
      workId: work.id,
    });
    return res.send({ work, genreType });
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

// 작품id, 작품제목
const getWorksForCreateEpisode = async (req, res) => {
  const { userId } = req.user;

  try {
    const works = await Work.findAll({
      where: { userId },
      attributes: ['id', 'title'],
    });
    return res.send(works);
  } catch (error) {
    throw new Error(error.message);
  }
};
// episodeOrder => auto_increment
const createEpisode = async (req, res) => {
  const parsedData = JSON.parse(req.body.episodeInfo);

  const { workId, episodeName, episodeDescription } = parsedData;
  const { episodeThumbnail, episodeImages } = req.files;

  try {
    const episode = await Episode.create({
      workId,
      episodeName,
      episodeOrder: 1,
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
  getWorksForCreateEpisode,
};
