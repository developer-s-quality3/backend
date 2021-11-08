const requireUser = (req, res, next) => {
  if (!req.user) {
    return res.status(403).send({ success: false, message: 'user invalid' });
  }

  return next();
};

module.exports = {
  requireUser,
};
