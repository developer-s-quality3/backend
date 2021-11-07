const uploadEpisodes = (req, res) => {
  // console.log(req.files);

  const imgLocations = req.files.map((data) => data.location);

  res.send({ success: true, data: imgLocations });
};

module.exports = {
  uploadEpisodes,
};
