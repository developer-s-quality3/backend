const {
  User,
  UserTypeChange,
  Work,
  Episode,
  EpisodeImage,
  Genre,
} = require('../models');

// user type change application
const getAllApplication = async (req, res) => {
  // DESC ASC
  const { date, pending, approved, declined } = req.query;
  try {
    const applications = await UserTypeChange.findAll(
      { where: { status: 'pending' } },
      {
        order: [['updatedAt', 'DESC']],
      }
    );
    return res.send(applications);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getOneApplication = async (req, res) => {
  const { applicationId } = req.params;

  try {
    const application = await UserTypeChange.findByPk(applicationId);
    console.log(application);

    if (!application)
      return res.status(400).send('상태 변경 신청서를 찾을 수 없습니다');

    const userAppliedWork = await Work.findOne({
      where: { status: 'application', userId: application.userId },
      include: [{ model: Episode, as: 'episode' }],
    });

    if (!userAppliedWork)
      return res.status(400).send('신청한 작품을 찾을 수 없습니다');

    const episodeImages = await EpisodeImage.findAll({
      where: { episodeId: userAppliedWork.episode[0].id },
    });
    // console.log(episodeImages);

    return res.send({
      applicationId: application.id,
      userAppliedWork,
      episodeImages,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateApplication = async (req, res) => {
  // const { applicationId } = req.params;

  // is userId necessary?
  const { status, userId, reason, applicationId } = req.body; // status = 'approved' || 'declined'

  if (status !== 'approved' && status !== 'declined')
    return res.status(400).send('status must be either approved || declined');

  try {
    const application = await UserTypeChange.findOne({
      where: {
        userId: userId,
        id: applicationId,
      },
    });
    if (!application) return res.status(400).send('wrong application infos');

    // TODO: status가 approve 일땐 반려사유 없어도됨
    application.status = status;
    application.reason = '';

    if (reason && status == 'declined') {
      application.reason = reason;
      await application.save();
      return res.send(application);
    }

    const saved = await application.save();

    const applicant = await User.findOne({
      where: { id: application.userId },
      include: [{ model: Work, as: 'work' }],
    });

    // update work status to 'regular'
    const appliedWork = await Work.findByPk(applicant.work[0].id);

    appliedWork.status = 'regular';
    await appliedWork.save();

    // update episode status to 'approved'
    const appliedEpisode = await Episode.findOne({
      where: { workId: appliedWork.id },
    });

    appliedEpisode.episodeStatus = 'approved';
    await appliedEpisode.save();

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    today = mm + '-' + dd + '-' + yyyy;

    applicant.authorName = application.authorName;
    applicant.authorDescription = application.authorDescription;
    applicant.authorAvatar = application.avatarUrl;
    applicant.authorApprovedDate = today;
    applicant.userType = 'author';

    await applicant.save();

    const work = await Work.findOne();

    return res.send({ saved, applicant });
  } catch (error) {
    throw new Error(error.message);
  }
};

// episode application
const getApplicantsWorks = async (req, res) => {
  const { userId } = req.params;

  try {
    const userWork = await User.findOne({
      where: {
        id: userId,
      },
      include: [{ model: Work, as: 'work', where: { status: 'regular' } }],
    });
    if (!userWork) return res.send('검토중인 작품이 없습니다');

    const episode = await Episode.findOne({
      where: {
        workId: userWork.work[0].id,
        episodeStatus: 'pending',
      },
      include: [
        {
          model: EpisodeImage,
          as: 'episodeImages',
        },
      ],
    });

    if (!episode) return res.send('검토중인 에피소드가 없습니다');

    return res.send({ userWork, episode });
  } catch (error) {
    throw new Error(error.message);
  }
};

// Genre
const createGenre = async (req, res) => {
  const { genreName } = req.body;

  if (!genreName) return res.status(400).send('invalid genreName');

  try {
    const genre = await Genre.create({ name: genreName });
    return res.send(genre);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateGenre = async (req, res) => {
  const { genreName, genreId } = req.body;
  if (!genreName) return res.status(400).send('invalid genreName');

  try {
    const genre = await Genre.update(
      { name: genreName },
      { where: { id: genreId } }
    );
    return res.send(genre);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteGenre = async (req, res) => {
  const { genreId } = req.params;

  try {
    const deletedGenre = await Genre.destroy({ where: { id: genreId } });
    if (!deletedGenre) return res.send('invalid genreId or nothing to delete');
    return res.sendStatus(200);
  } catch (error) {
    throw new Error(error.message);
  }
};

// get all applied episodes
const getAppliedEpisodes = async (req, res) => {
  try {
    const appliedEpisodes = await Work.findAll({
      where: { status: 'regular' },
      include: [
        {
          model: Episode,
          as: 'episode',
          // attributes:[],
          where: { episodeStatus: 'pending' },
        },
        {
          model: User,
          as: 'user',
          where: { userType: 'author' },
        },
      ],
    });

    return res.send(appliedEpisodes);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getOneAppliedEpisode = async (req, res) => {
  const { episodeId } = req.params;
  try {
    const appliedEpisode = await Episode.findOne({
      where: { id: episodeId },
      include: [
        {
          model: EpisodeImage,
          as: 'episodeImages',
          attributes: ['imageUrl', 'imageOrder'],
        },
        {
          model: Work,
          as: 'work',
          attributes: ['id', 'workThumbnail', 'title', 'workDescription'],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['authorName', 'authorDescription'],
            },
          ],
        },
      ],
    });
    if (!appliedEpisode)
      return res.status(400).send('에피소드를 찾을 수 없습니다');

    return res.send(appliedEpisode);
  } catch (error) {
    throw new Error(error.message);
  }
};

// update applied episodes
const updateAppliedEpisodes = async (req, res) => {
  const { episodeStatus, episodeId } = req.body;
  if (episodeStatus !== 'approved' && episodeStatus !== 'declined')
    return res.status(400).send('status must be either approved || declined');
  try {
    const episode = await Episode.update(
      { episodeStatus },
      { where: { id: episodeId } }
    );
    if (!episode[0])
      return res.status(400).send('에피소드 상태 변경에 문제가 있습니다');
    return res.send(episode);
  } catch (error) {
    throw new Error(error.message);
  }
};

// notice

module.exports = {
  getAllApplication,
  getOneApplication,
  updateApplication,
  getApplicantsWorks,
  createGenre,
  updateGenre,
  deleteGenre,
  getAppliedEpisodes,
  getOneAppliedEpisode,
  updateAppliedEpisodes,
};

/**
 * 유저상태변환신청 라우터와 작가에피승인 신청 라우터 확실히 구분하기
 * 전체만화에 카운트, 조회수 달아서 보내주기
 * 작가홈-> 배너, 썸네일 및 작가설명 수정
 *
 */
