const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const config = require('../../config');

let storage = new GridFsStorage({
  url: config.mongoDBUrl,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "images",
      filename: `${Date.now()}-${file.originalname}`
    };
  }
});

let uploadFiles = multer({ storage: storage }).single("file");
let uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;