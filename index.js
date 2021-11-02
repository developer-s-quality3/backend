const app = require('./app');

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

/**
 * 15mb <
 * multer - aws s3 bucket -> http://이미지1번.jpg ** utils // handling img upload/download
 * email - ???
 *
 * python - django,
 * ruby on rails - rails
 * java - spring boot
 * nodejs - nestjs
 *
 * api document
 * swagger ///
 */
