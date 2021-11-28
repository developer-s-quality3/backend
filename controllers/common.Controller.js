const {
  User,
  View,
  Work,
  Episode,
  EpisodeImage,
  Genre,
  GenreType,
  Like,
  Sequelize,
} = require('../models');

// 홈
const getAllWorksForHome = async (req, res) => {
  try {
    const works = await Work.findAll({
      where: {
        status: 'regular',
      },
      include: [
        {
          model: Like,
          as: 'like',
          // attributes: {
          //   include: [
          //     [Sequelize.fn('COUNT', Sequelize.col('workId')), 'likedCounts'],
          //   ],
          //   where: {
          //     isLike: true,
          //   },
          // },
          // where: [{ isLike: true }],
        },
      ],
    });
    return res.send(works);
  } catch (error) {
    throw new Error(error.message);
  }
};

// 전체만화
const getAllWorks = async (req, res) => {
  try {
    const works = await Work.findAll({
      where: {
        status: 'regular',
      },
      include: [
        { model: User, as: 'user', attributes: ['authorName'] },
        {
          model: GenreType,
          as: 'genreType',
          attributes: ['id'],
          include: [{ model: Genre, as: 'genre', attributes: ['id', 'name'] }],
        },
      ],
      attributes: ['id', 'title', 'workThumbnail'],
    });
    return res.send(works);
  } catch (error) {
    throw new Error(error.message);
  }
};

const readAllGenre = async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.send(genres);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getEpisodes = async (req, res) => {
  const { workId } = req.params;

  try {
    const work = await Work.findOne({
      where: { id: workId },
      include: [
        { model: Episode, as: 'episode' },
        {
          model: User,
          as: 'user',
          attributes: ['authorName', 'authorDescription', 'authorAvatar'],
        },
        {
          model: GenreType,
          as: 'genreType',
          attributes: ['id'],
          include: [{ model: Genre, as: 'genre', attributes: ['id', 'name'] }],
        },
      ],
    });

    return res.send(work);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getEpisodeImages = async (req, res) => {
  const { episodeId } = req.params;

  try {
    const episodeImages = await EpisodeImage.findAll({ where: { episodeId } });

    if (!episodeImages.length)
      return res.status(400).send('에피소드 이미지가 없습니다');

    const view = await View.findOrCreate({
      where: {
        episodeId,
      },
      defaults: {
        episodeId,
      },
    });

    let count = view[0].views;

    const counted = await view[0].update({ views: count + 1 });

    return res.send({ episodeImages, count: counted });
  } catch (error) {
    throw new Error(error.message);
  }
};

// 작품의 좋아요 가져오기
const getLikeCountsForWork = async (req, res) => {
  const { workId } = req.params;
  let userLikeStatus = false;

  try {
    if (req.user) {
      // console.log(req.user);
      userLikeStatus = await Like.findOne({
        where: { workId, userId: req.user.userId },
      });
    }
    const likeCounts = await Like.findAll({
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('workId')), 'likedCounts'],
      ],
      where: { workId, isLike: true },
      raw: true,
    });

    return res.send({ likeCounts: likeCounts[0].likedCounts, userLikeStatus });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllWorks,
  readAllGenre,
  getEpisodes,
  getEpisodeImages,
  getLikeCountsForWork,
  getAllWorksForHome,
};
