const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'webtoon3-1',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    Key: function (req, file, cb) {
      cb(null, 'epis' + '/' + file.filename);
    },
  }),
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error('File types must be png/jpg/jpeg'));
    }
    cb(undefined, true);
  },
  limits: { fileSize: 100000000 }, // In bytes: 2000000 bytes = 2 MB
});

module.exports = upload;
