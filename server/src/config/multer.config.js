// import multer from "multer";
// import { ApiError } from "../lib/class.lib.js";

const multer = require("multer");
const {UPLOADS_FILES_PATH} = require('../constants')
const {ApiError} = require('../lib/class.lib')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_FILES_PATH);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const fileFilter = (_req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/heic" ||
    file.mimetype === "image/HEIC" ||
    file.mimetype === "image/JPG" ||
    file.mimetype === "image/JPEG" ||
    file.mimetype === "image/PNG" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "text/csv"
  ) {
    cb(null, true);
  } else {
    cb(new ApiError(406, "Please upload a PNG/JPEG/JPG/HEIC or CSV file"));
  }
};

const uploads = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
});

module.exports = uploads
