const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const createError = require("http-errors");

const multerObjectMaker = (
  subFolder = "images",
  mimeTypes = ["image/jpeg", "image/jpg", "image/png"],
  maxSize = 1024 * 1024,
  errorMessege = "Unsuported Format"
) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = `${__dirname}/../public/uploads/${subFolder}`;

      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const fileExt = path.extname(file.originalname);

      const fileName = uuidv4() + "-" + Date.now() + fileExt;

      cb(null, fileName);
    },
  });

  const upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
      if (mimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(500, errorMessege));
      }
    },
  });

  return upload;
};

module.exports = multerObjectMaker;
