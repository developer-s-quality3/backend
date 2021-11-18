const {
  User,
  UserTypeChange,
  Work,
  Episode,
  EpisodeImage,
  Genre,
  GenreType,
} = require('../models');
const bcrypt = require('bcrypt');

const updateUser = async (req, res) => {
  let { gender, birthDate, name, phoneNumber, password } = req.body;
  birthDate = new Date(birthDate);

  //TODO: hook으로 변경해야함
  password = await bcrypt.hash(password, 10);

  try {
    const user = await User.update(
      { password, gender, birthDate, name, phoneNumber },
      { where: { id: req.user.userId } }
    );

    return res.send(user);
    // do something
  } catch (error) {
    throw new Error(error.message);
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
    if (!req.body.datas) return res.status(400).send('invalid datas');
    const parsedData = JSON.parse(req.body.datas);

    if (!parsedData.authorName || !parsedData.description)
      return res.status(400).send('need authorName, description');
    console.log(parsedData);

    let avatarUrl = 'Not provided';

    // if (!req.file) return res.status(400).send('avatarUrl is required');

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

  if (!req.file) return res.status(400).send('workThumbnail is required');

  try {
    const work = await Work.create({
      userId,
      title,
      workThumbnail: req.file.location,
      workDescription,
      status: 'application',
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

// common router
const getAllWorks = async (req, res) => {
  try {
    const works = await Work.findAll({
      include: [
        { model: User, as: 'user' },
        { model: GenreType, as: 'genreType' },
      ],
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

// common router
const readAllGenre = async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.send(genres);
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
  readAllGenre,
};
