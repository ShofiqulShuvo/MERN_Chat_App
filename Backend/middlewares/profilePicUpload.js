const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// upload setup for diskstorage using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadFolder = __dirname + `/../uploads/images/`;
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const extName = path.extname(file.originalname);

    const fileName = uuidv4() + Date.now() + extName;

    cb(null, fileName);
  },
});

// creating multer upload object
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req, file, cb) => {
    const fileType = ["image/jpeg", "image/jpg", "image/png"];

    if (fileType.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only jpeg, jpg or png image allowed for upload"));
    }
  },
});

// middleware
const profilePicUpload = (req, res, next) => {
  upload.single("picture")(req, res, (err) => {
    if (err) {
      res.status(500).json({
        name: "multer err",
        message: err.message,
        stack: err.stack,
      });
    } else {
      next();
    }
  });
};

module.exports = profilePicUpload;
