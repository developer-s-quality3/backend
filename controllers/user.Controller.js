const {
  User,
  UserTypeChange,
  Work,
  Episode,
  EpisodeImage,
} = require('../models');

const updateUser = async (req, res) => {
  try {
    // do something
  } catch (error) {
    // throw an error
  }
};

const readUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.user.email },
    });
    return res.send({ success: true, user: user });
  } catch (error) {
    // throw an error
    throw new Error(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    // do something
  } catch (error) {
    // throw an error
  }
};

const applyWriter = async (req, res) => {
  try {
    const parsedData = JSON.parse(req.body.datas);

    let avatarUrl = 'Not provided';

    if (req.file) avatarUrl = req.file.location;

    const userTypeChange = await UserTypeChange.create({
      userId: req.user.userId,
      avatarUrl,
      authorDescription: parsedData.description,
      authorName: parsedData.authorName,
    });

    res.send(userTypeChange);
  } catch (error) {
    throw new Error(error.message);
  }
};

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

const getEpisodeImages = async (req, res) => {};

const applyCompany = async (req, res) => {
  try {
    const parsedData = JSON.parse(req.body.datas);

    let businesslicenseImgUrl = 'Not provided';

    if (req.file) businesslicenseImgUrl = req.file.location;

    const userTypeChange = await UserTypeChange.create({
      userId: req.user.userId,
      businesslicenseImgUrl,
      companyName: parsedData.companyName,
      businesslicenseNumber: parsedData.businessLicenseNum,
    });

    return res.send(userTypeChange);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  readUser,
  updateUser,
  deleteUser,
  applyWriter,
  applyCompany,
  createWork,
  getAllWorks,
  createEpisode,
  uploadEpisodeImages,
};
